// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";

import {WstETHYieldTreasury} from "src/WstETHYieldTreasury.sol";
import {DelegationAuthorizer} from "src/DelegationAuthorizer.sol";
import {ReceiptRegistry} from "src/ReceiptRegistry.sol";
import {MockWstETH} from "src/mocks/MockWstETH.sol";

contract WstETHYieldTreasuryTest is Test {
    MockWstETH internal asset;
    WstETHYieldTreasury internal treasury;
    DelegationAuthorizer internal authorizer;
    ReceiptRegistry internal receipts;

    address internal owner = address(0xA11CE);
    address internal depositor = address(0xBEEF);
    address internal executor = address(0xCAFE);
    address internal recipient = address(0xD00D);
    address internal manager = address(0xABCD);

    bytes32 internal constant OPS_BUDGET = keccak256("OPS_BUDGET");
    bytes32 internal constant CHILD_BUDGET = keccak256("CHILD_BUDGET");

    function setUp() external {
        asset = new MockWstETH("Wrapped stETH", "wstETH", 18, 1e18);

        vm.prank(owner);
        treasury = new WstETHYieldTreasury(address(asset), owner);

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

    function testDepositTracksPrincipalInStETH() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);

        assertEq(treasury.principalBaselineStETH(), 100 ether);
        assertEq(asset.balanceOf(address(treasury)), 100 ether);
        assertEq(treasury.availableYieldInStETH(), 0);
        assertEq(treasury.availableYieldInWstETH(), 0);
    }

    function testYieldAccruesFromExchangeRateIncrease() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);

        vm.prank(owner);
        asset.setStEthPerToken(1.2 ether);

        assertEq(treasury.principalBaselineStETH(), 100 ether);
        assertEq(treasury.availableYieldInStETH(), 20 ether);
        assertEq(treasury.currentPrincipalFloorWstETH(), 83_333333333333333333);
        assertEq(treasury.availableYieldInWstETH(), 16_666666666666666667);
    }

    function testCannotAllocateBeyondRateDerivedYield() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);

        vm.prank(owner);
        asset.setStEthPerToken(1.2 ether);

        vm.prank(owner);
        vm.expectRevert(WstETHYieldTreasury.PrincipalWouldBeTouched.selector);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), address(0), 17 ether, true, "ops");
    }

    function testCanSpendRateDerivedYieldWithoutTouchingPrincipal() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);

        vm.prank(owner);
        asset.setStEthPerToken(1.2 ether);

        vm.prank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), manager, 10 ether, true, "ops");

        bytes32 ruleId = _authorize(executor, OPS_BUDGET, recipient, 10 ether);
        bytes32 receiptHash = keccak256("wsteth-receipt-1");

        vm.prank(executor);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            5 ether,
            keccak256("wsteth-task-1"),
            receiptHash,
            keccak256("wsteth-evidence-1"),
            keccak256("wsteth-result-1"),
            "ipfs://wsteth-1"
        );

        assertEq(asset.balanceOf(recipient), 5 ether);
        assertEq(asset.balanceOf(address(treasury)), 95 ether);
        assertEq(treasury.currentPrincipalFloorWstETH(), 83_333333333333333333);
        assertEq(treasury.availableYieldInWstETH(), 11_666666666666666667);

        (, bytes32 storedRuleId,,,,,,,,) = receipts.receipts(receiptHash);
        assertEq(storedRuleId, ruleId);
    }

    function testSlashLikeRateDropBlocksFurtherSpend() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);

        vm.prank(owner);
        asset.setStEthPerToken(1.2 ether);

        vm.prank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), manager, 5 ether, true, "ops");
        _authorize(executor, OPS_BUDGET, recipient, 5 ether);

        vm.prank(owner);
        asset.setStEthPerToken(1.0 ether);

        vm.prank(executor);
        vm.expectRevert(WstETHYieldTreasury.PrincipalWouldBeTouched.selector);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            1 ether,
            keccak256("wsteth-task-2"),
            keccak256("wsteth-receipt-2"),
            keccak256("wsteth-evidence-2"),
            keccak256("wsteth-result-2"),
            "ipfs://wsteth-2"
        );
    }

    function testManagerCanCreateChildBudgetUnderRateBasedRootBudget() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);

        vm.prank(owner);
        asset.setStEthPerToken(1.2 ether);

        vm.prank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), manager, 10 ether, true, "ops");

        vm.prank(manager);
        treasury.configureChildBudgetAsManager(
            OPS_BUDGET, CHILD_BUDGET, executor, 4 ether, true, "child"
        );

        assertEq(treasury.childBudgetReserved(OPS_BUDGET), 4 ether);
        assertEq(treasury.directSpendableRemaining(OPS_BUDGET), 6 ether);

        (uint128 allocated,, bool active, bytes32 parentBudgetId, address childManager,) =
            treasury.budgets(CHILD_BUDGET);
        assertEq(uint256(allocated), 4 ether);
        assertEq(parentBudgetId, OPS_BUDGET);
        assertEq(childManager, executor);
        assertTrue(active);
    }

    function testReceiptCapturesRuleIdUnderWstEthFlow() external {
        vm.prank(depositor);
        treasury.deposit(100 ether);

        vm.prank(owner);
        asset.setStEthPerToken(1.15 ether);

        vm.prank(owner);
        treasury.configureBudget(OPS_BUDGET, bytes32(0), manager, 8 ether, true, "ops");

        bytes32 ruleId = _authorize(executor, OPS_BUDGET, recipient, 8 ether);
        bytes32 receiptHash = keccak256("wsteth-receipt-3");

        vm.prank(executor);
        treasury.spendFromBudget(
            OPS_BUDGET,
            recipient,
            2 ether,
            keccak256("wsteth-task-3"),
            receiptHash,
            keccak256("wsteth-evidence-3"),
            keccak256("wsteth-result-3"),
            "ipfs://wsteth-3"
        );

        (, bytes32 storedRuleId,,,,,,,,) = receipts.receipts(receiptHash);
        assertEq(storedRuleId, ruleId);
    }

    function _authorize(address ruleExecutor, bytes32 budgetId, address ruleRecipient, uint128 maxAmount)
        internal
        returns (bytes32 ruleId)
    {
        ruleId = keccak256(
            abi.encode(ruleExecutor, budgetId, ruleRecipient, treasury.spendFromBudget.selector)
        );
        DelegationAuthorizer.Rule memory rule = DelegationAuthorizer.Rule({
            active: true,
            executor: ruleExecutor,
            budgetId: budgetId,
            recipient: ruleRecipient,
            selector: treasury.spendFromBudget.selector,
            maxAmount: maxAmount,
            validAfter: 0,
            validUntil: 0
        });

        vm.prank(owner);
        authorizer.setRule(ruleId, rule);
    }
}
