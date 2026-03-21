// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";

import {WstETHYieldTreasury} from "src/WstETHYieldTreasury.sol";
import {DelegationAuthorizer} from "src/DelegationAuthorizer.sol";
import {IWstETH} from "src/interfaces/IWstETH.sol";

contract SetupLiveWstETHDemoScript is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address treasuryAddr = vm.envAddress("TREASURY_ADDRESS");
        address authorizerAddr = vm.envAddress("AUTHORIZER_ADDRESS");
        address assetAddr = vm.envAddress("WSTETH_ADDRESS");
        address manager = vm.envAddress("MANAGER_ADDRESS");
        address executor = vm.envAddress("EXECUTOR_ADDRESS");
        address treasuryExecutor = vm.envOr("TREASURY_EXECUTOR_ADDRESS", executor);
        address recipient = vm.envAddress("RECIPIENT_ADDRESS");

        uint256 principalDepositWstETH = vm.envOr("PRINCIPAL_DEPOSIT_WSTETH", uint256(100 ether));
        uint256 optionalYieldTopUpWstETH = vm.envOr("YIELD_TOPUP_WSTETH", uint256(0));
        uint128 budgetAllocationWstETH = uint128(vm.envOr("BUDGET_ALLOCATION_WSTETH", uint256(10 ether)));
        uint128 ruleMaxAmountWstETH = uint128(vm.envOr("RULE_MAX_AMOUNT_WSTETH", uint256(10 ether)));

        bytes32 opsBudget = keccak256("OPS_BUDGET");
        bytes4 selector = WstETHYieldTreasury.spendFromBudget.selector;
        bytes32 ruleId = keccak256(abi.encode(treasuryExecutor, opsBudget, recipient, selector));

        vm.startBroadcast(deployerKey);

        WstETHYieldTreasury treasury = WstETHYieldTreasury(treasuryAddr);
        DelegationAuthorizer authorizer = DelegationAuthorizer(authorizerAddr);
        IWstETH asset = IWstETH(assetAddr);

        if (principalDepositWstETH > 0) {
            asset.approve(treasuryAddr, principalDepositWstETH);
            treasury.deposit(principalDepositWstETH);
        }

        if (optionalYieldTopUpWstETH > 0) {
            bool ok = asset.transfer(treasuryAddr, optionalYieldTopUpWstETH);
            require(ok, "yield top-up transfer failed");
        }

        require(
            treasury.availableYieldInWstETH() >= budgetAllocationWstETH,
            "insufficient spendable yield: wait for accrual or top up treasury"
        );

        treasury.configureBudget(opsBudget, bytes32(0), manager, budgetAllocationWstETH, true, "ops");

        DelegationAuthorizer.Rule memory rule = DelegationAuthorizer.Rule({
            active: true,
            executor: treasuryExecutor,
            budgetId: opsBudget,
            recipient: recipient,
            selector: selector,
            maxAmount: ruleMaxAmountWstETH,
            validAfter: 0,
            validUntil: 0
        });

        authorizer.setRule(ruleId, rule);

        vm.stopBroadcast();
    }
}
