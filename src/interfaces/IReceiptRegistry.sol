// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IReceiptRegistry {
    function registerReceipt(
        bytes32 receiptHash,
        bytes32 taskId,
        address executor,
        address recipient,
        uint256 amount,
        bytes32 budgetId,
        string calldata metadataURI
    ) external;
}
