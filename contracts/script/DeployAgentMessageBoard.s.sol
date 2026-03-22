// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";

import {AgentMessageBoard} from "src/AgentMessageBoard.sol";

contract DeployAgentMessageBoardScript is Script {
    function run() external returns (AgentMessageBoard board) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        board = new AgentMessageBoard();
        vm.stopBroadcast();

        console2.log("AgentMessageBoard:", address(board));
    }
}
