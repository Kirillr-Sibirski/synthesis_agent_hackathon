// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script} from "forge-std/Script.sol";
import {MockWstETH} from "src/mocks/MockWstETH.sol";

contract DeployMockWstETHScript is Script {
    function run() external returns (MockWstETH asset) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);
        asset = new MockWstETH("Wrapped stETH", "wstETH", 18, 1e18);
        vm.stopBroadcast();
    }
}
