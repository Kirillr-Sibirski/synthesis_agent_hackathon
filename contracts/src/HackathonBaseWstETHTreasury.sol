// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IWstETH} from "src/interfaces/IWstETH.sol";
import {IReceiptRegistry} from "src/interfaces/IReceiptRegistry.sol";
import {IDelegationAuthorizer} from "src/interfaces/IDelegationAuthorizer.sol";

/// @notice Trimmed-for-demo Base treasury that keeps the repo's expected ABI
/// while enforcing yield-only spending in direct wstETH units.
contract HackathonBaseWstETHTreasury {
    struct Budget {
        uint128 allocated;
        uint128 spent;
        bool active;
        address manager;
        string label;
    }

    IWstETH public immutable asset;
    address public immutable owner;
    IReceiptRegistry public receiptRegistry;
    IDelegationAuthorizer public authorizer;

    uint256 public principalBaselineStETH;
    uint256 public totalBudgetAllocated;

    mapping(bytes32 => Budget) public budgets;

    event Deposited(
        address indexed from,
        uint256 wstETHAmount,
        uint256 newPrincipalBaselineStETH,
        uint256 stEthPerTokenSnapshot
    );
    event BudgetConfigured(
        bytes32 indexed budgetId,
        bytes32 indexed parentBudgetId,
        address indexed manager,
        string label,
        uint128 allocated,
        bool active
    );
    event BudgetSpent(
        bytes32 indexed budgetId,
        bytes32 indexed receiptHash,
        bytes32 indexed taskId,
        bytes32 ruleId,
        address executor,
        address recipient,
        uint256 amount,
        bytes32 evidenceHash,
        bytes32 resultHash,
        string metadataURI
    );
    event ReceiptRegistryUpdated(address indexed receiptRegistry);
    event AuthorizerUpdated(address indexed authorizer);
    event PrincipalBaselineSynced(uint256 previousBaselineStETH, uint256 newBaselineStETH);

    error OnlyOwner();
    error ZeroAmount();
    error InactiveBudget();
    error BudgetExceeded();
    error Unauthorized();
    error TransferFailed();
    error PrincipalWouldBeTouched();
    error InvalidBaseline();
    error EmptyReceiptHash();
    error InvalidBudgetHierarchy();

    constructor(address asset_, address owner_) {
        asset = IWstETH(asset_);
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

    function deposit(uint256 amountWstETH) external {
        if (amountWstETH == 0) revert ZeroAmount();
        bool ok = asset.transferFrom(msg.sender, address(this), amountWstETH);
        if (!ok) revert TransferFailed();
        principalBaselineStETH += amountWstETH;
        emit Deposited(msg.sender, amountWstETH, principalBaselineStETH, 1e18);
    }

    function configureBudget(
        bytes32 budgetId,
        bytes32 parentBudgetId,
        address manager,
        uint128 allocated,
        bool active,
        string calldata label
    ) external {
        if (msg.sender != owner) revert OnlyOwner();
        if (parentBudgetId != bytes32(0)) revert InvalidBudgetHierarchy();

        Budget storage current = budgets[budgetId];
        if (allocated < current.spent) revert BudgetExceeded();

        totalBudgetAllocated = totalBudgetAllocated - current.allocated + allocated;
        if (totalBudgetAllocated > availableYieldInWstETH()) revert PrincipalWouldBeTouched();

        budgets[budgetId] = Budget({
            allocated: allocated,
            spent: current.spent,
            active: active,
            manager: manager,
            label: label
        });

        emit BudgetConfigured(budgetId, parentBudgetId, manager, label, allocated, active);
    }

    function syncPrincipalBaselineStETH(uint256 newBaselineStETH) external {
        if (msg.sender != owner) revert OnlyOwner();
        uint256 currentBalance = asset.balanceOf(address(this));
        if (newBaselineStETH > currentBalance) revert InvalidBaseline();
        uint256 previous = principalBaselineStETH;
        principalBaselineStETH = newBaselineStETH;
        if (totalBudgetAllocated > availableYieldInWstETH()) revert PrincipalWouldBeTouched();
        emit PrincipalBaselineSynced(previous, newBaselineStETH);
    }

    function spendFromBudget(
        bytes32 budgetId,
        address recipient,
        uint128 amountWstETH,
        bytes32 taskId,
        bytes32 receiptHash,
        bytes32 evidenceHash,
        bytes32 resultHash,
        string calldata metadataURI
    ) external {
        if (amountWstETH == 0) revert ZeroAmount();
        if (receiptHash == bytes32(0)) revert EmptyReceiptHash();

        Budget storage budget = budgets[budgetId];
        if (!budget.active) revert InactiveBudget();
        if (uint256(budget.spent) + amountWstETH > budget.allocated) revert BudgetExceeded();

        bytes4 selector = this.spendFromBudget.selector;
        bytes32 ruleId = address(authorizer) == address(0)
            ? bytes32(0)
            : authorizer.findMatchingRuleId(
                msg.sender, budgetId, recipient, amountWstETH, selector, uint64(block.timestamp)
            );
        if (ruleId == bytes32(0)) revert Unauthorized();

        uint256 balanceBefore = asset.balanceOf(address(this));
        if (balanceBefore < principalBaselineStETH) revert PrincipalWouldBeTouched();
        if (amountWstETH > balanceBefore - principalBaselineStETH) revert PrincipalWouldBeTouched();

        budget.spent += amountWstETH;

        bool ok = asset.transfer(recipient, amountWstETH);
        if (!ok) revert TransferFailed();

        if (asset.balanceOf(address(this)) < principalBaselineStETH) revert PrincipalWouldBeTouched();

        if (address(receiptRegistry) != address(0)) {
            receiptRegistry.registerReceipt(
                receiptHash,
                taskId,
                ruleId,
                msg.sender,
                recipient,
                amountWstETH,
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
            ruleId,
            msg.sender,
            recipient,
            amountWstETH,
            evidenceHash,
            resultHash,
            metadataURI
        );
    }

    function availableYieldInStETH() public view returns (uint256) {
        return availableYieldInWstETH();
    }

    function currentPrincipalFloorWstETH() public view returns (uint256) {
        return principalBaselineStETH;
    }

    function availableYieldInWstETH() public view returns (uint256) {
        uint256 balance = asset.balanceOf(address(this));
        if (balance <= principalBaselineStETH) return 0;
        return balance - principalBaselineStETH;
    }

    function unallocatedYieldInWstETH() external view returns (uint256) {
        uint256 yieldAvailable = availableYieldInWstETH();
        if (yieldAvailable <= totalBudgetAllocated) return 0;
        return yieldAvailable - totalBudgetAllocated;
    }

    function remainingBudget(bytes32 budgetId) external view returns (uint256) {
        Budget memory budget = budgets[budgetId];
        if (budget.allocated <= budget.spent) return 0;
        return budget.allocated - budget.spent;
    }

    function directSpendableRemaining(bytes32 budgetId) public view returns (uint256) {
        Budget memory budget = budgets[budgetId];
        if (budget.allocated <= budget.spent) return 0;
        return budget.allocated - budget.spent;
    }
}
