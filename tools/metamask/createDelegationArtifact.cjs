require('dotenv').config();

const {
  createDelegation,
  signDelegation,
  allowedTargets,
  allowedMethods,
  exactCalldata,
  redeemer,
  limitedCalls,
  timestamp,
} = require('@metamask/smart-accounts-kit');
const { keccak256, toBytes } = require('viem');
const { chain, ownerAccount, smartAccountsEnvironment } = require('./utils.cjs');
const { treasuryAbi } = require('./treasuryAbi.cjs');
const { encodeFunctionData } = require('viem');

const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS;
const DEMO_RECIPIENT = process.env.DEMO_RECIPIENT;
const DELEGATE_ADDRESS = process.env.EXECUTOR_ADDRESS || ownerAccount.address;
if (!TREASURY_ADDRESS) throw new Error('Missing TREASURY_ADDRESS in .env');
if (!DEMO_RECIPIENT) throw new Error('Missing DEMO_RECIPIENT in .env');

const budgetId = keccak256(toBytes('OPS_BUDGET'));
const taskId = keccak256(toBytes('metamask-delegation-task-1'));
const receiptHash = keccak256(toBytes('metamask-delegation-receipt-1'));
const evidenceHash = keccak256(toBytes('metamask-delegation-evidence-1'));
const resultHash = keccak256(toBytes('metamask-delegation-result-1'));
const calldata = encodeFunctionData({
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

async function main() {
  const delegation = createDelegation({
    delegate: DELEGATE_ADDRESS,
    delegator: ownerAccount.address,
    scope: {
      type: 'functionCall',
      allowedTargets: [TREASURY_ADDRESS],
      allowedMethods: ['0x' + calldata.slice(2, 10)],
      exactCalldata: [calldata],
      valueLte: 0n,
    },
    caveats: [
      allowedTargets({ targets: [TREASURY_ADDRESS] }),
      allowedMethods({ methods: ['0x' + calldata.slice(2, 10)] }),
      exactCalldata({ calldata }),
      redeemer({ redeemer: DELEGATE_ADDRESS }),
      limitedCalls({ limit: 1n }),
      timestamp({ afterThreshold: 0n, beforeThreshold: BigInt(Math.floor(Date.now() / 1000) + 86400) }),
    ],
  });

  const signedDelegation = await signDelegation({
    privateKey: process.env.PRIVATE_KEY,
    delegation,
    delegationManager: smartAccountsEnvironment.DelegationManager,
    chainId: chain.id,
  });

  console.log(JSON.stringify({
    owner: ownerAccount.address,
    delegate: DELEGATE_ADDRESS,
    delegationManager: smartAccountsEnvironment.DelegationManager,
    treasury: TREASURY_ADDRESS,
    calldata,
    signedDelegation,
  }, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
