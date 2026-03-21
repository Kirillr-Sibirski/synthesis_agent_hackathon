module.exports.treasuryAbi = [
  {
    type: 'function',
    name: 'spendFromBudget',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'budgetId', type: 'bytes32' },
      { name: 'recipient', type: 'address' },
      { name: 'amountWstETH', type: 'uint128' },
      { name: 'taskId', type: 'bytes32' },
      { name: 'receiptHash', type: 'bytes32' },
      { name: 'evidenceHash', type: 'bytes32' },
      { name: 'resultHash', type: 'bytes32' },
      { name: 'metadataURI', type: 'string' },
    ],
    outputs: [],
  },
];
