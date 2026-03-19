// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {IERC20} from "src/interfaces/IERC20.sol";
import {IReceiptRegistry} from "src/interfaces/IReceiptRegistry.sol";
import {IDelegationAuthorizer} from "src/interfaces/IDelegationAuthorizer.sol";

contract YieldTreasury {
    struct Budget {
        uint128 allocated;
        uint128 spent;
        bool active;
        bytes32 parentBudgetId;
        string label;
    }

    IERC20 public immutable asset;
    address public immutable owner;
    IReceiptRegistry public receiptRegistry;
    IDelegationAuthorizer public authorizer;

    uint256 public principalBaseline;
    uint256 public totalBudgetAllocated;

    mapping(bytes32 => Budget) public budgets;

    event Deposited(address indexed from, uint256 amount, uint256 newPrincipalBaseline);
    event BudgetConfigured(
        bytes32 indexed budgetId,
        bytes32 indexed parentBudgetId,
        string label,
        uint128 allocated,
        bool active
    );
    event BudgetSpent(
        bytes32 indexed budgetId,
        bytes32 indexed receiptHash,
        bytes32 indexed taskId,
        address executor,
        address recipient,
        uint256 amount,
        bytes32 evidenceHash,
        bytes32 resultHash,
        string metadataURI
    );
    event ReceiptRegistryUpdated(address indexed receiptRegistry);
    event AuthorizerUpdated(address indexed authorizer);
    event PrincipalBaselineSynced(uint256 previousBaseline, uint256 newBaseline);

    error OnlyOwner();
    error ZeroAmount();
    error InactiveBudget();
    error BudgetExceeded();
    error Unauthorized();
    error TransferFailed();
    error PrincipalWouldBeTouched();
    error InvalidBaseline();
    error EmptyReceiptHash();
    error ParentBudgetMissing();
    error ParentBudgetExceeded();
    error InvalidBudgetHierarchy();

    constructor(address asset_, address owner_) {
        asset = IERC20(asset_);
        owner = owner_;
    }

    function setReceiptRegistry(address receiptRegistry_) external {
        if (msg.sender != owner) revert OnlyOwner();
        receiptRegistry = IReceiptRegistry(receiptRegistry_);
        emit ReceiptRegistryUpdated(receiptRegistry_);
    }

    function setAuthorizer(address authorizer_) external {
        if (msg.sender != owner) revert OnlyOwner();
        authorizer = IDelegationAuthorizer(authorizer_);
        emit AuthorizerUpdated(authorizer_);
    }

    function deposit(uint256 amount) external {
        if (amount == 0) revert ZeroAmount();
        bool ok = asset.transferFrom(msg.sender, address(this), amount);
        if (!ok) revert TransferFailed();
        principalBaseline += amount;
        emit Deposited(msg.sender, amount, principalBaseline);
    }

    function configureBudget(
        bytes32 budgetId,
        bytes32 parentBudgetId,
        uint128 allocated,
        bool active,
        string calldata label
    ) external {
        if (msg.sender != owner) revert OnlyOwner();
        _configureBudget(budgetId, parentBudgetId, allocated, active, label);
    }

    function syncPrincipalBaseline(uint256 newBaseline) external {
        if (msg.sender != owner) revert OnlyOwner();
        uint256 currentBalance = asset.balanceOf(address(this));
        if (newBaseline > currentBalance) revert InvalidBaseline();
        uint256 previous = principalBaseline;
        principalBaseline = newBaseline;
        if (totalBudgetAllocated > availableYield()) revert PrincipalWouldBeTouched();
        emit PrincipalBaselineSynced(previous, newBaseline);
    }

    function spendFromBudget(
        bytes32 budgetId,
        address recipient,
        uint128 amount,
        bytes32 taskId,
        bytes32 receiptHash,
        bytes32 evidenceHash,
        bytes32 resultHash,
        string calldata metadataURI
    ) external {
        if (amount == 0) revert ZeroAmount();
        if (receiptHash == bytes32(0)) revert EmptyReceiptHash();

        Budget storage budget = budgets[budgetId];
        if (!budget.active) revert InactiveBudget();
        if (uint256(budget.spent) + amount > budget.allocated) revert BudgetExceeded();

        bytes4 selector = this.spendFromBudget.selector;
        bool authorized = address(authorizer) != address(0)
            && authorizer.isAuthorized(
                msg.sender, budgetId, recipient, amount, selector, uint64(block.timestamp)
            );
        if (!authorized) revert Unauthorized();

        uint256 balanceBefore = asset.balanceOf(address(this));
        if (balanceBefore < principalBaseline) revert PrincipalWouldBeTouched();
        uint256 liquidYieldBefore = balanceBefore - principalBaseline;
        if (amount > liquidYieldBefore) revert PrincipalWouldBeTouched();

        budget.spent += amount;

        bool ok = asset.transfer(recipient, amount);
        if (!ok) revert TransferFailed();

        uint256 balanceAfter = asset.balanceOf(address(this));
        if (balanceAfter < principalBaseline) revert PrincipalWouldBeTouched();

        if (address(receiptRegistry) != address(0)) {
            receiptRegistry.registerReceipt(
                receiptHash,
                taskId,
                msg.sender,
                recipient,
                amount,
                budgetId,
                evidenceHash,
                resultHash,
                metadataURI
            );
        }

        emit BudgetSpent(
            budgetId,
            receiptHash,
            taskId,
            msg.sender,
            recipient,
            amount,
            evidenceHash,
            resultHash,
            metadataURI
        );
    }

    function totalSpent(bytes32 budgetId) external view returns (uint256) {
        return budgets[budgetId].spent;
    }

    function availableYield() public view returns (uint256) {
        uint256 balance = asset.balanceOf(address(this));
        if (balance <= principalBaseline) return 0;
        return balance - principalBaseline;
    }

    function unallocatedYield() external view returns (uint256) {
        uint256 yieldAvailable = availableYield();
        if (yieldAvailable <= totalBudgetAllocated) return 0;
        return yieldAvailable - totalBudgetAllocated;
    }

    function remainingBudget(bytes32 budgetId) external view returns (uint256) {
        Budget memory budget = budgets[budgetId];
        if (budget.allocated <= budget.spent) return 0;
        return budget.allocated - budget.spent;
    }

    function _configureBudget(
        bytes32 budgetId,
        bytes32 parentBudgetId,
        uint128 allocated,
        bool active,
        string calldata label
    ) internal {
        Budget storage current = budgets[budgetId];
        uint256 previousAllocated = current.allocated;

        if (allocated < current.spent) revert BudgetExceeded();
        if (budgetId == parentBudgetId && parentBudgetId != bytes32(0)) revert InvalidBudgetHierarchy();

        if (parentBudgetId != bytes32(0)) {
            Budget memory parent = budgets[parentBudgetId];
            if (parent.allocated == 0 && bytes(parent.label).length == 0) revert ParentBudgetMissing();
            if (allocated > parent.allocated) revert ParentBudgetExceeded();
        }

        totalBudgetAllocated = totalBudgetAllocated - previousAllocated + allocated;
        if (totalBudgetAllocated > availableYield()) revert PrincipalWouldBeTouched();

        budgets[budgetId] = Budget({
            allocated: allocated,
            spent: current.spent,
            active: active,
            parentBudgetId: parentBudgetId,
            label: label
        });
        emit BudgetConfigured(budgetId, parentBudgetId, label, allocated, active);
    }
}
