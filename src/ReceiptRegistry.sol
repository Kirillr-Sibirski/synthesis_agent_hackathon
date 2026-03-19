// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract ReceiptRegistry {
    struct Receipt {
        bytes32 taskId;
        address executor;
        address recipient;
        uint256 amount;
        bytes32 budgetId;
        string metadataURI;
        uint64 timestamp;
    }

    address public immutable treasury;
    mapping(bytes32 => Receipt) public receipts;

    event ReceiptRegistered(
        bytes32 indexed receiptHash,
        bytes32 indexed taskId,
        address indexed executor,
        address recipient,
        uint256 amount,
        bytes32 budgetId,
        string metadataURI,
        uint64 timestamp
    );

    error OnlyTreasury();
    error ReceiptAlreadyExists();

    constructor(address treasury_) {
        treasury = treasury_;
    }

    function registerReceipt(
        bytes32 receiptHash,
        bytes32 taskId,
        address executor,
        address recipient,
        uint256 amount,
        bytes32 budgetId,
        string calldata metadataURI
    ) external {
        if (msg.sender != treasury) revert OnlyTreasury();
        if (receipts[receiptHash].timestamp != 0) revert ReceiptAlreadyExists();

        uint64 nowTs = uint64(block.timestamp);
        receipts[receiptHash] = Receipt({
            taskId: taskId,
            executor: executor,
            recipient: recipient,
            amount: amount,
            budgetId: budgetId,
            metadataURI: metadataURI,
            timestamp: nowTs
        });

        emit ReceiptRegistered(
            receiptHash, taskId, executor, recipient, amount, budgetId, metadataURI, nowTs
        );
    }
}
