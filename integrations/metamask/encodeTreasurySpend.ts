import 'dotenv/config';

import { encodeFunctionData, keccak256, toBytes } from 'viem';
import { treasuryAbi } from './treasuryAbi.js';

const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS as `0x${string}` | undefined;
const DEMO_RECIPIENT = process.env.DEMO_RECIPIENT as `0x${string}` | undefined;

if (!TREASURY_ADDRESS) throw new Error('Missing TREASURY_ADDRESS in .env');
if (!DEMO_RECIPIENT) throw new Error('Missing DEMO_RECIPIENT in .env');

const budgetId = keccak256(toBytes('OPS_BUDGET'));
const taskId = keccak256(toBytes('metamask-delegation-task-1'));
const receiptHash = keccak256(toBytes('metamask-delegation-receipt-1'));
const evidenceHash = keccak256(toBytes('metamask-delegation-evidence-1'));
const resultHash = keccak256(toBytes('metamask-delegation-result-1'));

const data = encodeFunctionData({
  abi: treasuryAbi,
  functionName: 'spendFromBudget',
  args: [
    budgetId,
    DEMO_RECIPIENT,
    1000000000000000000n,
    taskId,
    receiptHash,
    evidenceHash,
    resultHash,
    'ipfs://metamask-delegation-spend-1',
  ],
});

console.log(JSON.stringify({
  treasury: TREASURY_ADDRESS,
  budgetId,
  taskId,
  receiptHash,
  evidenceHash,
  resultHash,
  data,
}, null, 2));
