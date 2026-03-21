// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";

import {WstETHYieldTreasury} from "src/WstETHYieldTreasury.sol";
import {DelegationAuthorizer} from "src/DelegationAuthorizer.sol";
import {MockWstETH} from "src/mocks/MockWstETH.sol";

contract SetupRoleSeparatedWstETHDemoScript is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address treasuryAddr = vm.envAddress("TREASURY_ADDRESS");
        address authorizerAddr = vm.envAddress("AUTHORIZER_ADDRESS");
        address assetAddr = vm.envAddress("WSTETH_ADDRESS");
        address manager = vm.envAddress("MANAGER_ADDRESS");
        address executor = vm.envAddress("EXECUTOR_ADDRESS");
        address treasuryExecutor = vm.envOr("TREASURY_EXECUTOR_ADDRESS", executor);
        address recipient = vm.envAddress("RECIPIENT_ADDRESS");

        bytes32 opsBudget = keccak256("OPS_BUDGET");
        bytes4 selector = WstETHYieldTreasury.spendFromBudget.selector;
        bytes32 ruleId = keccak256(abi.encode(treasuryExecutor, opsBudget, recipient, selector));

        vm.startBroadcast(deployerKey);

        WstETHYieldTreasury treasury = WstETHYieldTreasury(treasuryAddr);
        DelegationAuthorizer authorizer = DelegationAuthorizer(authorizerAddr);
        MockWstETH asset = MockWstETH(assetAddr);

        asset.mint(msg.sender, 100 ether);
        asset.approve(treasuryAddr, type(uint256).max);
        treasury.deposit(100 ether);

        asset.setStEthPerToken(1.2 ether);
        treasury.configureBudget(opsBudget, bytes32(0), manager, 10 ether, true, "ops");

        DelegationAuthorizer.Rule memory rule = DelegationAuthorizer.Rule({
            active: true,
            executor: treasuryExecutor,
            budgetId: opsBudget,
            recipient: recipient,
            selector: selector,
            maxAmount: 10 ether,
            validAfter: 0,
            validUntil: 0
        });

        authorizer.setRule(ruleId, rule);

        vm.stopBroadcast();
    }
}
