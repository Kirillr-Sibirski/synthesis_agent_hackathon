// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IReceiptRegistry {
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
    ) external;
}
