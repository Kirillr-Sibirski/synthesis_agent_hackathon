// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";

import {BaseWstETHYieldTreasury} from "src/BaseWstETHYieldTreasury.sol";

contract DeployBaseWstETHTreasuryScript is Script {
    function run() external returns (BaseWstETHYieldTreasury treasury) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address asset = vm.envAddress("WSTETH_ADDRESS");
        address owner = vm.envAddress("TREASURY_OWNER");
        address authorizer = vm.envAddress("AUTHORIZER_ADDRESS");
        address receiptRegistry = vm.envAddress("RECEIPT_REGISTRY_ADDRESS");

        vm.startBroadcast(deployerKey);
        treasury = new BaseWstETHYieldTreasury(asset, owner);
        treasury.setAuthorizer(authorizer);
        treasury.setReceiptRegistry(receiptRegistry);
        vm.stopBroadcast();

        console2.log("BaseWstETHYieldTreasury:", address(treasury));
    }
}
