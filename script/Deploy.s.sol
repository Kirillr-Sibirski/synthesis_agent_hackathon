// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";

import {YieldTreasury} from "src/YieldTreasury.sol";
import {DelegationAuthorizer} from "src/DelegationAuthorizer.sol";
import {ReceiptRegistry} from "src/ReceiptRegistry.sol";

contract DeployScript is Script {
    function run() external returns (YieldTreasury treasury, DelegationAuthorizer authorizer, ReceiptRegistry receipts) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address asset = vm.envAddress("WSTETH_ADDRESS");
        address owner = vm.envAddress("TREASURY_OWNER");

        vm.startBroadcast(deployerKey);

        treasury = new YieldTreasury(asset, owner);
        authorizer = new DelegationAuthorizer(owner);
        receipts = new ReceiptRegistry(address(treasury));

        if (owner == vm.addr(deployerKey)) {
            treasury.setAuthorizer(address(authorizer));
            treasury.setReceiptRegistry(address(receipts));
        }

        vm.stopBroadcast();
    }
}
