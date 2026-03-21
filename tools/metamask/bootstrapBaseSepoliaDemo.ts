import 'dotenv/config';

import { encodeAbiParameters, getAddress, keccak256, maxUint256, parseAbi, parseEther, toBytes } from 'viem';

import { chain, getSmartAccount, publicClient, walletClient } from './utils.js';

const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS as `0x${string}` | undefined;
const AUTHORIZER_ADDRESS = process.env.AUTHORIZER_ADDRESS as `0x${string}` | undefined;
const WSTETH_ADDRESS = process.env.WSTETH_ADDRESS as `0x${string}` | undefined;
const MANAGER_ADDRESS = process.env.MANAGER_ADDRESS as `0x${string}` | undefined;
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS as `0x${string}` | undefined;
const TREASURY_EXECUTOR_ADDRESS = process.env.TREASURY_EXECUTOR_ADDRESS as `0x${string}` | undefined;

if (chain.id !== 84532) {
  throw new Error(`This bootstrap helper is only intended for Base Sepolia. Current chainId=${chain.id}.`);
}
if (!TREASURY_ADDRESS) throw new Error('Missing TREASURY_ADDRESS in .env');
if (!AUTHORIZER_ADDRESS) throw new Error('Missing AUTHORIZER_ADDRESS in .env');
if (!WSTETH_ADDRESS) throw new Error('Missing WSTETH_ADDRESS in .env');
if (!MANAGER_ADDRESS) throw new Error('Missing MANAGER_ADDRESS in .env');
if (!RECIPIENT_ADDRESS) throw new Error('Missing RECIPIENT_ADDRESS in .env');

const treasuryAbi = parseAbi([
  'function deposit(uint256 amountWstETH)',
  'function availableYieldInWstETH() view returns (uint256)',
  'function principalBaselineStETH() view returns (uint256)',
  'function budgets(bytes32) view returns (uint128 allocated, uint128 spent, bool active, bytes32 parentBudgetId, address manager, string label)',
  'function configureBudget(bytes32 budgetId, bytes32 parentBudgetId, address manager, uint128 allocated, bool active, string label)',
]);

const assetAbi = parseAbi([
  'function mint(address to, uint256 value)',
  'function approve(address spender, uint256 value) returns (bool)',
  'function balanceOf(address owner) view returns (uint256)',
  'function stEthPerToken() view returns (uint256)',
  'function setStEthPerToken(uint256 newValue)',
]);

const authorizerAbi = parseAbi([
  'function rules(bytes32) view returns (bool active, address executor, bytes32 budgetId, address recipient, bytes4 selector, uint128 maxAmount, uint64 validAfter, uint64 validUntil)',
  'function setRule((bool active, address executor, bytes32 budgetId, address recipient, bytes4 selector, uint128 maxAmount, uint64 validAfter, uint64 validUntil) rule)',
  'function setRule(bytes32 ruleId, (bool active, address executor, bytes32 budgetId, address recipient, bytes4 selector, uint128 maxAmount, uint64 validAfter, uint64 validUntil) rule)',
]);

const OWNER = getAddress(walletClient.account!.address);
const TREASURY = getAddress(TREASURY_ADDRESS);
const AUTHORIZER = getAddress(AUTHORIZER_ADDRESS);
const ASSET = getAddress(WSTETH_ADDRESS);
const MANAGER = getAddress(MANAGER_ADDRESS);
const RECIPIENT = getAddress(RECIPIENT_ADDRESS);

const OPS_BUDGET = keccak256(toBytes('OPS_BUDGET'));
const SPEND_SELECTOR = '0x7441041a';
const TARGET_PRINCIPAL = parseEther('100');
const TARGET_RATE = 1_200000000000000000n;
const TARGET_BUDGET = parseEther('10');
const TARGET_RULE_MAX = parseEther('10');
const ZERO_BYTES32 = `0x${'00'.repeat(32)}` as `0x${string}`;

async function wait(hash: `0x${string}`) {
  return publicClient.waitForTransactionReceipt({ hash });
}

async function main() {
  const smartAccount = await getSmartAccount();
  const treasuryExecutor = getAddress(TREASURY_EXECUTOR_ADDRESS ?? smartAccount.address);
  const ruleId = keccak256(
    encodeAbiParameters(
      [
        { type: 'address' },
        { type: 'bytes32' },
        { type: 'address' },
        { type: 'bytes4' },
      ],
      [treasuryExecutor, OPS_BUDGET, RECIPIENT, SPEND_SELECTOR as `0x${string}`],
    ),
  );

  const actions: Array<Record<string, unknown>> = [];
  let nextNonce = await publicClient.getTransactionCount({
    address: OWNER,
    blockTag: 'pending',
  });

  async function writeContract(parameters: Parameters<typeof walletClient.writeContract>[0]) {
    const hash = await walletClient.writeContract({
      ...parameters,
      nonce: nextNonce,
    });
    nextNonce += 1;
    await wait(hash);
    return hash;
  }

  const principalBaseline = await publicClient.readContract({
    address: TREASURY,
    abi: treasuryAbi,
    functionName: 'principalBaselineStETH',
  });

  if (principalBaseline === 0n) {
    const ownerBalance = await publicClient.readContract({
      address: ASSET,
      abi: assetAbi,
      functionName: 'balanceOf',
      args: [OWNER],
    });

    if (ownerBalance < TARGET_PRINCIPAL) {
      const mintHash = await writeContract({
        address: ASSET,
        abi: assetAbi,
        functionName: 'mint',
        args: [OWNER, TARGET_PRINCIPAL - ownerBalance],
      });
      actions.push({ step: 'mintOwner', txHash: mintHash, amount: (TARGET_PRINCIPAL - ownerBalance).toString() });
    }

    const approveHash = await writeContract({
      address: ASSET,
      abi: assetAbi,
      functionName: 'approve',
      args: [TREASURY, maxUint256],
    });
    actions.push({ step: 'approveTreasury', txHash: approveHash });

    const depositHash = await writeContract({
      address: TREASURY,
      abi: treasuryAbi,
      functionName: 'deposit',
      args: [TARGET_PRINCIPAL],
    });
    actions.push({ step: 'depositPrincipal', txHash: depositHash, amount: TARGET_PRINCIPAL.toString() });
  }

  const currentRate = await publicClient.readContract({
    address: ASSET,
    abi: assetAbi,
    functionName: 'stEthPerToken',
  });

  if (currentRate < TARGET_RATE) {
    const rateHash = await writeContract({
      address: ASSET,
      abi: assetAbi,
      functionName: 'setStEthPerToken',
      args: [TARGET_RATE],
    });
    actions.push({ step: 'setStEthPerToken', txHash: rateHash, rate: TARGET_RATE.toString() });
  }

  let availableYield = await publicClient.readContract({
    address: TREASURY,
    abi: treasuryAbi,
    functionName: 'availableYieldInWstETH',
  });

  if (availableYield < TARGET_BUDGET) {
    const shortfall = TARGET_BUDGET - availableYield;
    const topUpHash = await writeContract({
      address: ASSET,
      abi: assetAbi,
      functionName: 'mint',
      args: [TREASURY, shortfall],
    });
    actions.push({ step: 'mintYieldTopUp', txHash: topUpHash, amount: shortfall.toString() });
    availableYield = await publicClient.readContract({
      address: TREASURY,
      abi: treasuryAbi,
      functionName: 'availableYieldInWstETH',
    });
  }

  const budget = await publicClient.readContract({
    address: TREASURY,
    abi: treasuryAbi,
    functionName: 'budgets',
    args: [OPS_BUDGET],
  });

  if (!budget[2] || budget[0] !== TARGET_BUDGET || getAddress(budget[4]) !== MANAGER) {
    const budgetHash = await writeContract({
      address: TREASURY,
      abi: treasuryAbi,
      functionName: 'configureBudget',
      args: [OPS_BUDGET, ZERO_BYTES32, MANAGER, BigInt(TARGET_BUDGET), true, 'ops'],
    });
    actions.push({ step: 'configureBudget', txHash: budgetHash, manager: MANAGER, allocation: TARGET_BUDGET.toString() });
  }

  const existingRule = await publicClient.readContract({
    address: AUTHORIZER,
    abi: authorizerAbi,
    functionName: 'rules',
    args: [ruleId],
  });

  if (
    !existingRule[0] ||
    getAddress(existingRule[1]) !== treasuryExecutor ||
    existingRule[2] !== OPS_BUDGET ||
    getAddress(existingRule[3]) !== RECIPIENT ||
    existingRule[4] !== SPEND_SELECTOR ||
    existingRule[5] !== TARGET_RULE_MAX
  ) {
    const ruleHash = await writeContract({
      address: AUTHORIZER,
      abi: authorizerAbi,
      functionName: 'setRule',
      args: [
        ruleId,
        {
          active: true,
          executor: treasuryExecutor,
          budgetId: OPS_BUDGET,
          recipient: RECIPIENT,
          selector: SPEND_SELECTOR,
          maxAmount: TARGET_RULE_MAX,
          validAfter: 0,
          validUntil: 0,
        },
      ],
    });
    actions.push({ step: 'setRule', txHash: ruleHash, ruleId, treasuryExecutor });
  }

  const finalBudget = await publicClient.readContract({
    address: TREASURY,
    abi: treasuryAbi,
    functionName: 'budgets',
    args: [OPS_BUDGET],
  });
  const finalYield = await publicClient.readContract({
    address: TREASURY,
    abi: treasuryAbi,
    functionName: 'availableYieldInWstETH',
  });

  console.log(
    JSON.stringify(
      {
        chainId: chain.id,
        owner: OWNER,
        smartAccount: smartAccount.address,
        treasuryExecutor,
        treasury: TREASURY,
        authorizer: AUTHORIZER,
        asset: ASSET,
        ruleId,
        actions,
        finalState: {
          availableYieldInWstETH: finalYield.toString(),
          budget: {
            allocated: finalBudget[0].toString(),
            spent: finalBudget[1].toString(),
            active: finalBudget[2],
            parentBudgetId: finalBudget[3],
            manager: finalBudget[4],
            label: finalBudget[5],
          },
        },
      },
      (_, value) => (typeof value === 'bigint' ? value.toString() : value),
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
