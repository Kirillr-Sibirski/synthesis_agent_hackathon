// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test} from "forge-std/Test.sol";

import {AgentMessageBoard} from "src/AgentMessageBoard.sol";

contract AgentMessageBoardTest is Test {
    AgentMessageBoard internal board;
    address internal agent = address(0xA6137);

    function setUp() external {
        board = new AgentMessageBoard();
    }

    function testPostMessageStoresLatestMessage() external {
        vm.warp(1_710_000_000);

        vm.prank(agent);
        board.postMessage("hello treasury");

        (address sender, string memory message, bytes32 messageHash, uint64 timestamp) =
            board.lastMessage();

        assertEq(sender, agent);
        assertEq(message, "hello treasury");
        assertEq(messageHash, keccak256(bytes("hello treasury")));
        assertEq(timestamp, 1_710_000_000);
    }
}
