// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";

import {YieldTreasury} from "src/YieldTreasury.sol";
import {DelegationAuthorizer} from "src/DelegationAuthorizer.sol";
import {ReceiptRegistry} from "src/ReceiptRegistry.sol";
import {MockERC20} from "src/mocks/MockERC20.sol";

contract YieldTreasuryTest is Test {
    MockERC20 internal asset;
    YieldTreasury internal treasury;
    DelegationAuthorizer internal authorizer;
    ReceiptRegistry internal receipts;

    address internal owner = address(0xA11CE);
    address internal depositor = address(0xBEEF);
    address internal executor = address(0xCAFE);
    address internal executor2 = address(0xCAFF);
    address internal recipient = address(0xD00D);
    address internal recipient2 = address(0xD11D);

    bytes32 internal constant OPS_BUDGET = keccak256("OPS_BUDGET");
    bytes32 internal constant RESEARCH_BUDGET = keccak256("RESEARCH_BUDGET");
    bytes32 internal constant CHILD_BUDGET = keccak256("CHILD_BUDGET");

    function setUp() external {
        asset = new MockERC20("Wrapped stETH", "wstETH", 18);

        vm.prank(owner);
        treasury = new YieldTreasury(address(asset), owner);

        vm.prank(owner);
        authorizer = new DelegationAuthorizer(owner);

        vm.prank(owner);
        receipts = new ReceiptRegistry(address(treasury));

        vm.prank(owner);
        treasury.setAuthorizer(address(authorizer));

        vm.prank(owner);
        treasury.setReceiptRegistry(address(receipts));

        asset.mint(depositor, 1_000 ether);
        vm.prank(depositor);
        asset.approve(address(treasury), type(uint256).max);
    }

    function testDepositSetsPrincipalBaseline() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);

        assertEq(treasury.principalBaseline(), 100 ether);
        assertEq(asset.balanceOf(address(treasury)), 100 ether);
        assertEq(treasury.availableYield(), 0);
    }

    function testAvailableYieldIgnoresPrincipal() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);
        asset.mint(address(treasury), 15 ether);

        assertEq(treasury.principalBaseline(), 100 ether);
        assertEq(asset.balanceOf(address(treasury)), 115 ether);
        assertEq(treasury.availableYield(), 15 ether);
    }

    function testCannotSpendWithoutAuthorization() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);
        asset.mint(address(treasury), 20 ether);

        vm.prank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), 10 ether, true, "ops");

        vm.prank(executor);
        vm.expectRevert(YieldTreasury.Unauthorized.selector);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            1 ether,
            keccak256("task-1"),
            keccak256("receipt-1"),
            keccak256("evidence-1"),
            keccak256("result-1"),
            "ipfs://receipt-1"
        );
    }

    function testCannotOverspendBudget() external {
        _seedTreasuryWithYield();
        _authorize(executor, OPS_BUDGET, recipient, 10 ether, treasury.spendFromBudget.selector);

        vm.prank(executor);
        vm.expectRevert(YieldTreasury.BudgetExceeded.selector);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            11 ether,
            keccak256("task-2"),
            keccak256("receipt-2"),
            keccak256("evidence-2"),
            keccak256("result-2"),
            "ipfs://receipt-2"
        );
    }

    function testCannotSpendPrincipal() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);
        asset.mint(address(treasury), 1 ether);

        vm.prank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), 1 ether, true, "ops");

        _authorize(executor, OPS_BUDGET, recipient, 1 ether, treasury.spendFromBudget.selector);

        // Simulate loss of liquid yield after budget reservation; remaining balance equals principal.
        asset.burn(address(treasury), 1 ether);

        vm.prank(executor);
        vm.expectRevert(YieldTreasury.PrincipalWouldBeTouched.selector);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            1 ether,
            keccak256("task-3"),
            keccak256("receipt-3"),
            keccak256("evidence-3"),
            keccak256("result-3"),
            "ipfs://receipt-3"
        );
    }

    function testSpendRecordsReceiptAndPreservesPrincipal() external {
        _seedTreasuryWithYield();
        _authorize(executor, OPS_BUDGET, recipient, 10 ether, treasury.spendFromBudget.selector);

        bytes32 receiptHash = keccak256("receipt-4");
        bytes32 taskId = keccak256("task-4");
        bytes32 evidenceHash = keccak256("evidence-4");
        bytes32 resultHash = keccak256("result-4");

        vm.prank(executor);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            3 ether,
            taskId,
            receiptHash,
            evidenceHash,
            resultHash,
            "ipfs://receipt-4"
        );

        assertEq(asset.balanceOf(recipient), 3 ether);
        assertEq(asset.balanceOf(address(treasury)), 117 ether);
        assertEq(treasury.principalBaseline(), 100 ether);
        assertEq(treasury.availableYield(), 17 ether);

        (
            bytes32 storedTaskId,
            address storedExecutor,
            address storedRecipient,
            uint256 storedAmount,
            bytes32 storedBudgetId,
            bytes32 storedEvidenceHash,
            bytes32 storedResultHash,
            string memory storedMetadata,
            uint64 timestamp
        ) = receipts.receipts(receiptHash);

        assertEq(storedTaskId, taskId);
        assertEq(storedExecutor, executor);
        assertEq(storedRecipient, recipient);
        assertEq(storedAmount, 3 ether);
        assertEq(storedBudgetId, OPS_BUDGET);
        assertEq(storedEvidenceHash, evidenceHash);
        assertEq(storedResultHash, resultHash);
        assertEq(storedMetadata, "ipfs://receipt-4");
        assertGt(timestamp, 0);
    }

    function testBudgetCanBeResizedButNotBelowSpent() external {
        _seedTreasuryWithYield();
        _authorize(executor, OPS_BUDGET, recipient, 10 ether, treasury.spendFromBudget.selector);

        vm.prank(executor);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            3 ether,
            keccak256("task-5"),
            keccak256("receipt-5"),
            keccak256("evidence-5"),
            keccak256("result-5"),
            "ipfs://receipt-5"
        );

        vm.prank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), 5 ether, true, "ops-resized");

        (uint128 allocated, uint128 spent,,,) = treasury.budgets(OPS_BUDGET);
        assertEq(uint256(allocated), 5 ether);
        assertEq(uint256(spent), 3 ether);

        vm.prank(owner);
        vm.expectRevert(YieldTreasury.BudgetExceeded.selector);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), 2 ether, true, "ops-too-small");
    }

    function testPrincipalBaselineCanSyncDown() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);
        asset.mint(address(treasury), 20 ether);

        assertEq(treasury.availableYield(), 20 ether);

        vm.prank(owner);
        treasury.syncPrincipalBaseline(90 ether);

        assertEq(treasury.principalBaseline(), 90 ether);
        assertEq(treasury.availableYield(), 30 ether);
    }

    function testCannotUseEmptyReceiptHash() external {
        _seedTreasuryWithYield();
        _authorize(executor, OPS_BUDGET, recipient, 10 ether, treasury.spendFromBudget.selector);

        vm.prank(executor);
        vm.expectRevert(YieldTreasury.EmptyReceiptHash.selector);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            1 ether,
            keccak256("task-empty-receipt"),
            bytes32(0),
            keccak256("evidence-empty"),
            keccak256("result-empty"),
            "ipfs://empty"
        );
    }

    function testDuplicateReceiptHashReverts() external {
        _seedTreasuryWithYield();
        _authorize(executor, OPS_BUDGET, recipient, 10 ether, treasury.spendFromBudget.selector);

        bytes32 receiptHash = keccak256("duplicate-receipt");

        vm.prank(executor);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            1 ether,
            keccak256("task-dup-1"),
            receiptHash,
            keccak256("evidence-dup-1"),
            keccak256("result-dup-1"),
            "ipfs://dup-1"
        );

        vm.prank(executor);
        vm.expectRevert(ReceiptRegistry.ReceiptAlreadyExists.selector);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            1 ether,
            keccak256("task-dup-2"),
            receiptHash,
            keccak256("evidence-dup-2"),
            keccak256("result-dup-2"),
            "ipfs://dup-2"
        );
    }

    function testInactiveBudgetCannotSpend() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);
        asset.mint(address(treasury), 20 ether);

        vm.prank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), 10 ether, false, "ops-inactive");

        _authorize(executor, OPS_BUDGET, recipient, 10 ether, treasury.spendFromBudget.selector);

        vm.prank(executor);
        vm.expectRevert(YieldTreasury.InactiveBudget.selector);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            1 ether,
            keccak256("task-inactive"),
            keccak256("receipt-inactive"),
            keccak256("evidence-inactive"),
            keccak256("result-inactive"),
            "ipfs://inactive"
        );
    }

    function testAuthorizationWindowExpiryBlocksSpend() external {
        _seedTreasuryWithYield();

        bytes32 ruleId = keccak256(
            abi.encode(executor, OPS_BUDGET, recipient, treasury.spendFromBudget.selector)
        );
        DelegationAuthorizer.Rule memory rule = DelegationAuthorizer.Rule({
            active: true,
            executor: executor,
            budgetId: OPS_BUDGET,
            recipient: recipient,
            selector: treasury.spendFromBudget.selector,
            maxAmount: 10 ether,
            validAfter: 0,
            validUntil: uint64(block.timestamp + 10)
        });

        vm.prank(owner);
        authorizer.setRule(ruleId, rule);

        vm.warp(block.timestamp + 11);

        vm.prank(executor);
        vm.expectRevert(YieldTreasury.Unauthorized.selector);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            1 ether,
            keccak256("task-expired"),
            keccak256("receipt-expired"),
            keccak256("evidence-expired"),
            keccak256("result-expired"),
            "ipfs://expired"
        );
    }

    function testWildcardRecipientRuleAllowsAnyRecipient() external {
        _seedTreasuryWithYield();

        bytes32 ruleId = keccak256(
            abi.encode(executor, OPS_BUDGET, address(0), treasury.spendFromBudget.selector)
        );
        DelegationAuthorizer.Rule memory rule = DelegationAuthorizer.Rule({
            active: true,
            executor: executor,
            budgetId: OPS_BUDGET,
            recipient: address(0),
            selector: treasury.spendFromBudget.selector,
            maxAmount: 10 ether,
            validAfter: 0,
            validUntil: 0
        });

        vm.prank(owner);
        authorizer.setRule(ruleId, rule);

        vm.prank(executor);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient2,
            2 ether,
            keccak256("task-any-recipient"),
            keccak256("receipt-any-recipient"),
            keccak256("evidence-any-recipient"),
            keccak256("result-any-recipient"),
            "ipfs://any-recipient"
        );

        assertEq(asset.balanceOf(recipient2), 2 ether);
    }

    function testWildcardSelectorRuleAllowsMatchingBudget() external {
        _seedTreasuryWithYield();

        bytes32 ruleId = keccak256(abi.encode(executor, OPS_BUDGET, recipient, bytes4(0)));
        DelegationAuthorizer.Rule memory rule = DelegationAuthorizer.Rule({
            active: true,
            executor: executor,
            budgetId: OPS_BUDGET,
            recipient: recipient,
            selector: bytes4(0),
            maxAmount: 10 ether,
            validAfter: 0,
            validUntil: 0
        });

        vm.prank(owner);
        authorizer.setRule(ruleId, rule);

        vm.prank(executor);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            2 ether,
            keccak256("task-any-selector"),
            keccak256("receipt-any-selector"),
            keccak256("evidence-any-selector"),
            keccak256("result-any-selector"),
            "ipfs://any-selector"
        );

        assertEq(asset.balanceOf(recipient), 2 ether);
    }

    function testMultipleBudgetsTrackIndependently() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);
        asset.mint(address(treasury), 30 ether);

        vm.startPrank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), 10 ether, true, "ops");
        treasury.configureBudget(RESEARCH_BUDGET, bytes32(0), 8 ether, true, "research");
        vm.stopPrank();

        _authorize(executor, OPS_BUDGET, recipient, 10 ether, treasury.spendFromBudget.selector);
        _authorize(executor2, RESEARCH_BUDGET, recipient2, 8 ether, treasury.spendFromBudget.selector);

        vm.prank(executor);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            3 ether,
            keccak256("task-ops"),
            keccak256("receipt-ops"),
            keccak256("evidence-ops"),
            keccak256("result-ops"),
            "ipfs://ops"
        );

        vm.prank(executor2);
        treasury.spendFromBudget(
            RESEARCH_BUDGET,
            recipient2,
            2 ether,
            keccak256("task-research"),
            keccak256("receipt-research"),
            keccak256("evidence-research"),
            keccak256("result-research"),
            "ipfs://research"
        );

        (uint128 opsAllocated, uint128 opsSpent,,,) = treasury.budgets(OPS_BUDGET);
        (uint128 researchAllocated, uint128 researchSpent,,,) = treasury.budgets(RESEARCH_BUDGET);

        assertEq(uint256(opsAllocated), 10 ether);
        assertEq(uint256(opsSpent), 3 ether);
        assertEq(uint256(researchAllocated), 8 ether);
        assertEq(uint256(researchSpent), 2 ether);
        assertEq(asset.balanceOf(recipient), 3 ether);
        assertEq(asset.balanceOf(recipient2), 2 ether);
    }

    function testParentBudgetCanBeAssigned() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);
        asset.mint(address(treasury), 30 ether);

        vm.startPrank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), 10 ether, true, "ops");
        treasury.configureBudget(CHILD_BUDGET, OPS_BUDGET, 4 ether, true, "child");
        vm.stopPrank();

        (,,, bytes32 parentBudgetId,) = treasury.budgets(CHILD_BUDGET);
        assertEq(parentBudgetId, OPS_BUDGET);
    }

    function testCannotCreateChildBudgetWithoutParent() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);
        asset.mint(address(treasury), 30 ether);

        vm.prank(owner);
        vm.expectRevert(YieldTreasury.ParentBudgetMissing.selector);
        treasury.configureBudget(CHILD_BUDGET, OPS_BUDGET, 4 ether, true, "child");
    }

    function testCannotAllocateChildAboveParent() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);
        asset.mint(address(treasury), 30 ether);

        vm.prank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), 5 ether, true, "ops");

        vm.prank(owner);
        vm.expectRevert(YieldTreasury.ParentBudgetExceeded.selector);
        treasury.configureBudget(CHILD_BUDGET, OPS_BUDGET, 6 ether, true, "child");
    }

    function testRevokedRuleBlocksSpend() external {
        _seedTreasuryWithYield();
        bytes32 ruleId = _authorize(executor, OPS_BUDGET, recipient, 10 ether, treasury.spendFromBudget.selector);

        vm.prank(owner);
        authorizer.revokeRule(ruleId);

        vm.prank(executor);
        vm.expectRevert(YieldTreasury.Unauthorized.selector);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            1 ether,
            keccak256("task-revoked"),
            keccak256("receipt-revoked"),
            keccak256("evidence-revoked"),
            keccak256("result-revoked"),
            "ipfs://revoked"
        );
    }

    function _seedTreasuryWithYield() internal {
        vm.prank(depositor);
        treasury.deposit(100 ether);
        asset.mint(address(treasury), 20 ether);

        vm.prank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), 10 ether, true, "ops");
    }

    function _authorize(
        address ruleExecutor,
        bytes32 budgetId,
        address ruleRecipient,
        uint128 maxAmount,
        bytes4 selector
    ) internal returns (bytes32 ruleId) {
        ruleId = keccak256(abi.encode(ruleExecutor, budgetId, ruleRecipient, selector));
        DelegationAuthorizer.Rule memory rule = DelegationAuthorizer.Rule({
            active: true,
            executor: ruleExecutor,
            budgetId: budgetId,
            recipient: ruleRecipient,
            selector: selector,
            maxAmount: maxAmount,
            validAfter: 0,
            validUntil: 0
        });

        vm.prank(owner);
        authorizer.setRule(ruleId, rule);
    }
}
