// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test} from "forge-std/Test.sol";

import {AgentMessageBoard} from "src/AgentMessageBoard.sol";
import {MockERC20} from "src/mocks/MockERC20.sol";

contract AgentMessageBoardTest is Test {
    AgentMessageBoard internal board;
    MockERC20 internal token;
    address internal agent = address(0xA6137);

    function setUp() external {
        board = new AgentMessageBoard();
        token = new MockERC20("Mock Token", "MOCK", 18);
        token.mint(agent, 10 ether);
    }

    function testPostMessageStoresLatestMessage() external {
        vm.warp(1_710_000_000);

        vm.startPrank(agent);
        token.approve(address(board), 1 ether);
        board.postMessage(address(token), 1 ether, "hello treasury");
        vm.stopPrank();

        (address sender, address postedToken, uint256 amount, string memory message, bytes32 messageHash, uint64 timestamp) =
            board.lastMessage();

        assertEq(sender, agent);
        assertEq(postedToken, address(token));
        assertEq(amount, 1 ether);
        assertEq(message, "hello treasury");
        assertEq(messageHash, keccak256(bytes("hello treasury")));
        assertEq(timestamp, 1_710_000_000);
        assertEq(token.balanceOf(address(board)), 1 ether);
    }
}
