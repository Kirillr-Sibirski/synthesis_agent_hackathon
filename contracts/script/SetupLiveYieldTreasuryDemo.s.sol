// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";

import {YieldTreasury} from "src/YieldTreasury.sol";
import {DelegationAuthorizer} from "src/DelegationAuthorizer.sol";
import {IERC20} from "src/interfaces/IERC20.sol";

contract SetupLiveYieldTreasuryDemoScript is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address treasuryAddr = vm.envAddress("TREASURY_ADDRESS");
        address authorizerAddr = vm.envAddress("AUTHORIZER_ADDRESS");
        address assetAddr = vm.envAddress("WSTETH_ADDRESS");
        address manager = vm.envAddress("MANAGER_ADDRESS");
        address executor = vm.envAddress("EXECUTOR_ADDRESS");
        address treasuryExecutor = vm.envOr("TREASURY_EXECUTOR_ADDRESS", executor);
        address recipient = vm.envAddress("RECIPIENT_ADDRESS");

        uint256 principalDeposit = vm.envOr("PRINCIPAL_DEPOSIT_WSTETH", uint256(0));
        uint256 optionalYieldTopUp = vm.envOr("YIELD_TOPUP_WSTETH", uint256(0));
        uint128 budgetAllocation = uint128(vm.envOr("BUDGET_ALLOCATION_WSTETH", uint256(0)));
        uint128 ruleMaxAmount = uint128(vm.envOr("RULE_MAX_AMOUNT_WSTETH", uint256(0)));

        bytes32 opsBudget = keccak256("OPS_BUDGET");
        bytes4 selector = YieldTreasury.spendFromBudget.selector;
        bytes32 ruleId = keccak256(abi.encode(treasuryExecutor, opsBudget, recipient, selector));

        vm.startBroadcast(deployerKey);

        YieldTreasury treasury = YieldTreasury(treasuryAddr);
        DelegationAuthorizer authorizer = DelegationAuthorizer(authorizerAddr);
        IERC20 asset = IERC20(assetAddr);

        if (principalDeposit > 0) {
            bool approveOk = asset.approve(treasuryAddr, principalDeposit);
            require(approveOk, "approve failed");
            treasury.deposit(principalDeposit);
        }

        if (optionalYieldTopUp > 0) {
            bool transferOk = asset.transfer(treasuryAddr, optionalYieldTopUp);
            require(transferOk, "yield top-up transfer failed");
        }

        require(treasury.availableYield() >= budgetAllocation, "insufficient spendable yield");

        treasury.configureBudget(opsBudget, bytes32(0), manager, budgetAllocation, true, "ops");

        DelegationAuthorizer.Rule memory rule = DelegationAuthorizer.Rule({
            active: true,
            executor: treasuryExecutor,
            budgetId: opsBudget,
            recipient: recipient,
            selector: selector,
            maxAmount: ruleMaxAmount,
            validAfter: 0,
            validUntil: 0
        });

        authorizer.setRule(ruleId, rule);

        vm.stopBroadcast();
    }
}
