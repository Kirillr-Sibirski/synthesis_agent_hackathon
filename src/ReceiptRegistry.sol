// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract ReceiptRegistry {
    struct Receipt {
        bytes32 taskId;
        bytes32 ruleId;
        address executor;
        address recipient;
        uint256 amount;
        bytes32 budgetId;
        bytes32 evidenceHash;
        bytes32 resultHash;
        string metadataURI;
        uint64 timestamp;
    }

    address public immutable treasury;
    mapping(bytes32 => Receipt) public receipts;

    event ReceiptRegistered(
        bytes32 indexed receiptHash,
        bytes32 indexed taskId,
        bytes32 indexed ruleId,
        address executor,
        address recipient,
        uint256 amount,
        bytes32 budgetId,
        bytes32 evidenceHash,
        bytes32 resultHash,
        string metadataURI,
        uint64 timestamp
    );

    error OnlyTreasury();
    error ReceiptAlreadyExists();
    error EmptyReceiptHash();

    constructor(address treasury_) {
        treasury = treasury_;
    }

    function registerReceipt(
        bytes32 receiptHash,
        bytes32 taskId,
        bytes32 ruleId,
        address executor,
        address recipient,
        uint256 amount,
        bytes32 budgetId,
        bytes32 evidenceHash,
        bytes32 resultHash,
        string calldata metadataURI
    ) external {
        if (msg.sender != treasury) revert OnlyTreasury();
        if (receiptHash == bytes32(0)) revert EmptyReceiptHash();
        if (receipts[receiptHash].timestamp != 0) revert ReceiptAlreadyExists();

        uint64 nowTs = uint64(block.timestamp);
        receipts[receiptHash] = Receipt({
            taskId: taskId,
            ruleId: ruleId,
            executor: executor,
            recipient: recipient,
            amount: amount,
            budgetId: budgetId,
            evidenceHash: evidenceHash,
            resultHash: resultHash,
            metadataURI: metadataURI,
            timestamp: nowTs
        });

        emit ReceiptRegistered(
            receiptHash,
            taskId,
            ruleId,
            executor,
            recipient,
            amount,
            budgetId,
            evidenceHash,
            resultHash,
            metadataURI,
            nowTs
        );
    }
}
