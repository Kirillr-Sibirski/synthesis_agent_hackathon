// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IWstETH} from "src/interfaces/IWstETH.sol";
import {IReceiptRegistry} from "src/interfaces/IReceiptRegistry.sol";
import {IDelegationAuthorizer} from "src/interfaces/IDelegationAuthorizer.sol";

contract WstETHYieldTreasury {
    struct Budget {
        uint128 allocated;
        uint128 spent;
        bool active;
        bytes32 parentBudgetId;
        address manager;
        string label;
    }

    IWstETH public immutable asset;
    address public immutable owner;
    IReceiptRegistry public receiptRegistry;
    IDelegationAuthorizer public authorizer;

    uint256 public principalBaselineStETH;
    uint256 public totalBudgetAllocated; // root budgets only, denominated in wstETH

    mapping(bytes32 => Budget) public budgets;
    mapping(bytes32 => uint256) public childBudgetReserved;

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
    error ParentBudgetMissing();
    error ParentBudgetExceeded();
    error InvalidBudgetHierarchy();
    error BudgetManagerUnauthorized();
    error ChildBudgetReservationExceeded();

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
        principalBaselineStETH += asset.getStETHByWstETH(amountWstETH);
        emit Deposited(msg.sender, amountWstETH, principalBaselineStETH, asset.stEthPerToken());
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
        _configureBudget(budgetId, parentBudgetId, manager, allocated, active, label);
    }

    function configureChildBudgetAsManager(
        bytes32 parentBudgetId,
        bytes32 budgetId,
        address manager,
        uint128 allocated,
        bool active,
        string calldata label
    ) external {
        Budget storage parentBudget = budgets[parentBudgetId];
        if (msg.sender != owner && parentBudget.manager != msg.sender) {
            revert BudgetManagerUnauthorized();
        }
        _configureBudget(budgetId, parentBudgetId, manager, allocated, active, label);
    }

    function syncPrincipalBaselineStETH(uint256 newBaselineStETH) external {
        if (msg.sender != owner) revert OnlyOwner();
        uint256 currentStETHEquivalent = asset.getStETHByWstETH(asset.balanceOf(address(this)));
        if (newBaselineStETH > currentStETHEquivalent) revert InvalidBaseline();
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
        if (amountWstETH > directSpendableRemaining(budgetId)) revert ChildBudgetReservationExceeded();

        bytes4 selector = this.spendFromBudget.selector;
        bytes32 ruleId = address(authorizer) == address(0)
            ? bytes32(0)
            : authorizer.findMatchingRuleId(
                msg.sender, budgetId, recipient, amountWstETH, selector, uint64(block.timestamp)
            );
        if (ruleId == bytes32(0)) revert Unauthorized();

        uint256 balanceBefore = asset.balanceOf(address(this));
        uint256 principalFloorWstETHBefore = currentPrincipalFloorWstETH();
        if (balanceBefore < principalFloorWstETHBefore) revert PrincipalWouldBeTouched();
        uint256 liquidYieldBefore = balanceBefore - principalFloorWstETHBefore;
        if (amountWstETH > liquidYieldBefore) revert PrincipalWouldBeTouched();

        budget.spent += amountWstETH;

        bool ok = asset.transfer(recipient, amountWstETH);
        if (!ok) revert TransferFailed();

        uint256 balanceAfter = asset.balanceOf(address(this));
        uint256 principalFloorWstETHAfter = currentPrincipalFloorWstETH();
        if (balanceAfter < principalFloorWstETHAfter) revert PrincipalWouldBeTouched();

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
        uint256 currentStETHEquivalent = asset.getStETHByWstETH(asset.balanceOf(address(this)));
        if (currentStETHEquivalent <= principalBaselineStETH) return 0;
        return currentStETHEquivalent - principalBaselineStETH;
    }

    function currentPrincipalFloorWstETH() public view returns (uint256) {
        return asset.getWstETHByStETH(principalBaselineStETH);
    }

    function availableYieldInWstETH() public view returns (uint256) {
        uint256 balance = asset.balanceOf(address(this));
        uint256 principalFloorWstETH = currentPrincipalFloorWstETH();
        if (balance <= principalFloorWstETH) return 0;
        return balance - principalFloorWstETH;
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
        uint256 reservedForChildren = childBudgetReserved[budgetId];
        uint256 totalCommitted = uint256(budget.spent) + reservedForChildren;
        if (budget.allocated <= totalCommitted) return 0;
        return budget.allocated - totalCommitted;
    }

    function _configureBudget(
        bytes32 budgetId,
        bytes32 parentBudgetId,
        address manager,
        uint128 allocated,
        bool active,
        string calldata label
    ) internal {
        Budget storage current = budgets[budgetId];
        uint256 previousAllocated = current.allocated;
        bytes32 previousParentBudgetId = current.parentBudgetId;
        bool exists = _budgetExists(current);

        if (allocated < current.spent) revert BudgetExceeded();
        if (budgetId == parentBudgetId && parentBudgetId != bytes32(0)) revert InvalidBudgetHierarchy();
        if (exists && previousParentBudgetId != parentBudgetId) revert InvalidBudgetHierarchy();

        if (parentBudgetId == bytes32(0)) {
            if (uint256(current.spent) + childBudgetReserved[budgetId] > allocated) {
                revert ChildBudgetReservationExceeded();
            }
            totalBudgetAllocated = totalBudgetAllocated - previousAllocated + allocated;
            if (totalBudgetAllocated > availableYieldInWstETH()) revert PrincipalWouldBeTouched();
        } else {
            Budget storage parentBudget = budgets[parentBudgetId];
            if (!_budgetExists(parentBudget)) revert ParentBudgetMissing();

            uint256 updatedReservedForChildren =
                childBudgetReserved[parentBudgetId] - previousAllocated + allocated;
            if (uint256(parentBudget.spent) + updatedReservedForChildren > parentBudget.allocated) {
                revert ParentBudgetExceeded();
            }
            childBudgetReserved[parentBudgetId] = updatedReservedForChildren;
        }

        budgets[budgetId] = Budget({
            allocated: allocated,
            spent: current.spent,
            active: active,
            parentBudgetId: parentBudgetId,
            manager: manager,
            label: label
        });

        emit BudgetConfigured(budgetId, parentBudgetId, manager, label, allocated, active);
    }

    function _budgetExists(Budget storage budget) internal view returns (bool) {
        return budget.allocated != 0 || budget.spent != 0 || budget.active
            || budget.parentBudgetId != bytes32(0) || budget.manager != address(0)
            || bytes(budget.label).length != 0;
    }
}
