// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {MockERC20} from "src/mocks/MockERC20.sol";

contract DeployMockAssetScript is Script {
    function run() external returns (MockERC20 asset) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);
        asset = new MockERC20("Wrapped stETH", "wstETH", 18);
        vm.stopBroadcast();
    }
}
