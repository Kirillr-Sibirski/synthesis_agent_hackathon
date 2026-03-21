// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";

import {YieldTreasury} from "src/YieldTreasury.sol";

contract DeployYieldTreasuryLiteScript is Script {
    function run() external returns (YieldTreasury treasury) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address asset = vm.envAddress("WSTETH_ADDRESS");
        address owner = vm.envAddress("TREASURY_OWNER");
        address authorizer = vm.envAddress("AUTHORIZER_ADDRESS");

        vm.startBroadcast(deployerKey);

        treasury = new YieldTreasury(asset, owner);

        if (owner == vm.addr(deployerKey)) {
            treasury.setAuthorizer(authorizer);
        }

        vm.stopBroadcast();
    }
}
