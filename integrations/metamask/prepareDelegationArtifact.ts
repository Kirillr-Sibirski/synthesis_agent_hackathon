import 'dotenv/config';

import { encodeFunctionData, keccak256, toBytes } from 'viem';

import { getSmartAccount, ownerAccount, smartAccountsEnvironment } from './utils.js';
import { treasuryAbi } from './treasuryAbi.js';

const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS as `0x${string}` | undefined;
const DEMO_RECIPIENT = process.env.DEMO_RECIPIENT as `0x${string}` | undefined;
const DEMO_EXECUTOR = process.env.DEMO_EXECUTOR as `0x${string}` | undefined;
const BUNDLER_URL = process.env.BUNDLER_URL;

if (!TREASURY_ADDRESS) throw new Error('Missing TREASURY_ADDRESS in .env');
if (!DEMO_RECIPIENT) throw new Error('Missing DEMO_RECIPIENT in .env');
if (!DEMO_EXECUTOR) throw new Error('Missing DEMO_EXECUTOR in .env');

const treasuryAddress = TREASURY_ADDRESS;
const demoRecipient = DEMO_RECIPIENT;
const demoExecutor = DEMO_EXECUTOR;

async function main() {
  const smartAccount = await getSmartAccount();

  const budgetId = keccak256(toBytes('OPS_BUDGET'));
  const taskId = keccak256(toBytes('metamask-delegation-task-1'));
  const receiptHash = keccak256(toBytes('metamask-delegation-receipt-1'));
  const evidenceHash = keccak256(toBytes('metamask-delegation-evidence-1'));
  const resultHash = keccak256(toBytes('metamask-delegation-result-1'));
  const amountWstETH = 1_000000000000000000n;
  const metadataURI = 'ipfs://metamask-delegation-spend-1';

  const spendCallData = encodeFunctionData({
    abi: treasuryAbi,
    functionName: 'spendFromBudget',
    args: [
      budgetId,
      demoRecipient,
      amountWstETH,
      taskId,
      receiptHash,
      evidenceHash,
      resultHash,
      metadataURI,
    ],
  });
  const spendSelector = spendCallData.slice(0, 10);

  const artifact = {
    generatedAt: new Date().toISOString(),
    owner: ownerAccount.address,
    smartAccountAddress: smartAccount.address,
    delegationManager: smartAccountsEnvironment.DelegationManager,
    bundlerConfigured: Boolean(BUNDLER_URL),
    qualificationStatus: BUNDLER_URL
      ? 'Ready for bundler-backed deployment and live delegation redemption work.'
      : 'Preparation complete; live MetaMask smart-account deployment/redemption still blocked on missing BUNDLER_URL.',
    treasurySpendIntent: {
      treasury: treasuryAddress,
      treasuryExecutor: smartAccount.address,
      executor: demoExecutor,
      recipient: demoRecipient,
      budgetId,
      amountWstETH: amountWstETH.toString(),
      taskId,
      receiptHash,
      evidenceHash,
      resultHash,
      metadataURI,
      spendCallData,
    },
    delegationShape: {
      delegator: smartAccount.address,
      treasuryExecutor: smartAccount.address,
      delegate: demoExecutor,
      target: treasuryAddress,
      selector: spendSelector,
      description:
        'Delegate may redeem a MetaMask delegation that executes exactly one treasury spendFromBudget(...) call for the prepared OPS_BUDGET spend intent. The treasury authorizer must allow the smart-account address as executor because the treasury sees the DeleGator as msg.sender.',
      recommendedCaveats: [
        'Exact target = treasury address',
        'Exact calldata = prepared spendCallData or strictly-scoped equivalent',
        'Redeemer/executor = DEMO_EXECUTOR',
        'Call count = 1',
        'Native token value = 0',
      ],
      sponsorNativeEnforcers: {
        allowedTargets: smartAccountsEnvironment.caveatEnforcers.AllowedTargetsEnforcer,
        exactCalldata: smartAccountsEnvironment.caveatEnforcers.ExactCalldataEnforcer,
        redeemer: smartAccountsEnvironment.caveatEnforcers.RedeemerEnforcer,
        limitedCalls: smartAccountsEnvironment.caveatEnforcers.LimitedCallsEnforcer,
      },
    },
    nextLiveSteps: [
      'Fund/deploy the MetaMask smart account via bundler-backed user operation.',
      'Configure the treasury authorizer so TREASURY_EXECUTOR_ADDRESS equals the derived smart-account address.',
      'Sign the constrained delegation from the MetaMask smart account owner.',
      'Redeem the delegation through DelegationManager.',
      'Execute the treasury spend and record tx hashes in deployments/ and submission/.',
    ],
  };

  console.log(JSON.stringify(artifact, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
