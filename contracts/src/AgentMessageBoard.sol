// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IERC20} from "./interfaces/IERC20.sol";

contract AgentMessageBoard {
    struct Message {
        address sender;
        address token;
        uint256 amount;
        string message;
        bytes32 messageHash;
        uint64 timestamp;
    }

    Message public lastMessage;

    event MessagePosted(
        address indexed sender,
        address indexed token,
        bytes32 indexed messageHash,
        uint256 amount,
        string message,
        uint64 timestamp
    );

    error ZeroToken();
    error ZeroAmount();
    error TransferFailed();

    function postMessage(address token, uint256 amount, string calldata message) external {
        if (token == address(0)) revert ZeroToken();
        if (amount == 0) revert ZeroAmount();

        bool ok = IERC20(token).transferFrom(msg.sender, address(this), amount);
        if (!ok) revert TransferFailed();

        bytes32 messageHash = keccak256(bytes(message));
        uint64 nowTs = uint64(block.timestamp);

        lastMessage = Message({
            sender: msg.sender,
            token: token,
            amount: amount,
            message: message,
            messageHash: messageHash,
            timestamp: nowTs
        });

        emit MessagePosted(msg.sender, token, messageHash, amount, message, nowTs);
    }
}
