// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";

import {WstETHYieldTreasury} from "src/WstETHYieldTreasury.sol";
import {ReceiptRegistry} from "src/ReceiptRegistry.sol";

contract DeployPatchedWstETHTreasuryScript is Script {
    function run() external returns (WstETHYieldTreasury treasury, ReceiptRegistry receipts) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address asset = vm.envAddress("WSTETH_ADDRESS");
        address owner = vm.envAddress("TREASURY_OWNER");
        address authorizer = vm.envAddress("AUTHORIZER_ADDRESS");

        vm.startBroadcast(deployerKey);

        treasury = new WstETHYieldTreasury(asset, owner);
        receipts = new ReceiptRegistry(address(treasury));

        if (owner == vm.addr(deployerKey)) {
            treasury.setAuthorizer(authorizer);
            treasury.setReceiptRegistry(address(receipts));
        }

        vm.stopBroadcast();
    }
}
