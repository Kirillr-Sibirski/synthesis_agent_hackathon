// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";

import {HackathonBaseWstETHTreasury} from "src/HackathonBaseWstETHTreasury.sol";

contract DeployHackathonBaseWstETHTreasuryScript is Script {
    function run() external returns (HackathonBaseWstETHTreasury treasury) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address asset = vm.envAddress("WSTETH_ADDRESS");
        address owner = vm.envAddress("TREASURY_OWNER");
        address authorizer = vm.envAddress("AUTHORIZER_ADDRESS");
        address receiptRegistry = vm.envAddress("RECEIPT_REGISTRY_ADDRESS");

        vm.startBroadcast(deployerKey);
        treasury = new HackathonBaseWstETHTreasury(asset, owner);
        treasury.setAuthorizer(authorizer);
        treasury.setReceiptRegistry(receiptRegistry);
        vm.stopBroadcast();

        console2.log("HackathonBaseWstETHTreasury:", address(treasury));
    }
}
