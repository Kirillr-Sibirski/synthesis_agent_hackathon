// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract AgentMessageBoard {
    struct Message {
        address sender;
        string message;
        bytes32 messageHash;
        uint64 timestamp;
    }

    Message public lastMessage;

    event MessagePosted(
        address indexed sender,
        bytes32 indexed messageHash,
        string message,
        uint64 timestamp
    );

    function postMessage(string calldata message) external {
        bytes32 messageHash = keccak256(bytes(message));
        uint64 nowTs = uint64(block.timestamp);

        lastMessage = Message({
            sender: msg.sender,
            message: message,
            messageHash: messageHash,
            timestamp: nowTs
        });

        emit MessagePosted(msg.sender, messageHash, message, nowTs);
    }
}
