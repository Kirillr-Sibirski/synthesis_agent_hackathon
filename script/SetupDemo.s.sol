// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";

import {YieldTreasury} from "src/YieldTreasury.sol";
import {DelegationAuthorizer} from "src/DelegationAuthorizer.sol";
import {MockERC20} from "src/mocks/MockERC20.sol";

contract SetupDemoScript is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address treasuryAddr = vm.envAddress("TREASURY_ADDRESS");
        address authorizerAddr = vm.envAddress("AUTHORIZER_ADDRESS");
        address assetAddr = vm.envAddress("WSTETH_ADDRESS");
        address executor = vm.envAddress("DEMO_EXECUTOR");
        address recipient = vm.envAddress("DEMO_RECIPIENT");

        bytes32 opsBudget = keccak256("OPS_BUDGET");
        bytes4 selector = YieldTreasury.spendFromBudget.selector;
        bytes32 ruleId = keccak256(abi.encode(executor, opsBudget, recipient, selector));

        vm.startBroadcast(deployerKey);

        YieldTreasury treasury = YieldTreasury(treasuryAddr);
        DelegationAuthorizer authorizer = DelegationAuthorizer(authorizerAddr);
        MockERC20 asset = MockERC20(assetAddr);

        asset.mint(msg.sender, 100 ether);
        asset.approve(treasuryAddr, type(uint256).max);
        treasury.deposit(100 ether);

        asset.mint(treasuryAddr, 20 ether);
        treasury.configureBudget(opsBudget, bytes32(0), 10 ether, true, "ops");

        DelegationAuthorizer.Rule memory rule = DelegationAuthorizer.Rule({
            active: true,
            executor: executor,
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
