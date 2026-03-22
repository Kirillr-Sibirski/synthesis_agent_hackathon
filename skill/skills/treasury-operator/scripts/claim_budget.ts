import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  createPublicClient,
  createWalletClient,
  formatUnits,
  getAddress,
  http,
  keccak256,
  parseAbi,
  parseUnits,
  stringToHex,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base, baseSepolia } from 'viem/chains';

const TREASURY_ABI = parseAbi([
  'function spendFromBudget(bytes32 budgetId, address recipient, uint128 amountWstETH, bytes32 taskId, bytes32 receiptHash, bytes32 evidenceHash, bytes32 resultHash, string metadataURI) external',
]);
const FACTORY_EVENT_ABI = parseAbi([
  'event AllowanceAssigned(address indexed treasury, address indexed operator, address indexed agent, bytes32 budgetId, bytes32 ruleId, uint128 amountWstETH, string label)',
]);

const DEFAULT_AAP_TREASURY_ADDRESS = '0xe07402f1B072FB1Cc5651E763D2139c1218016C9' as const;
const DEFAULT_AAP_BUDGET_ID = '0xb3e0fae8b586325ab4a14d8c2d0ed544d80af3db3bc870137bebb448314c0224' as const;
const LOG_WINDOW = 10_000n;
const DEFAULT_ALLOWANCE_LOOKBACK_BLOCKS = 250_000n;

const chains = {
  base,
  'base-sepolia': baseSepolia,
} as const;

type AllowanceDiscoveryClient = {
  getBlockNumber: () => Promise<bigint>;
  getLogs: (args: {
    event: (typeof FACTORY_EVENT_ABI)[0];
    args: { agent: `0x${string}` };
    fromBlock: bigint;
    toBlock: bigint;
  }) => Promise<Array<{
    args: {
      treasury?: `0x${string}`;
      budgetId?: `0x${string}`;
      amountWstETH?: bigint;
      ruleId?: `0x${string}`;
      label?: string;
    };
    blockNumber?: bigint;
    logIndex?: number;
    transactionHash?: `0x${string}`;
  }>>;
};

type SupportedChain = keyof typeof chains;

function resolveChainKey(): SupportedChain {
  const raw = (process.env.AAP_CHAIN ?? process.env.AGENT_MESSAGE_CHAIN ?? process.env.METAMASK_CHAIN ?? 'base').toLowerCase();
  if (!(raw in chains)) {
    throw new Error('Unsupported chain. Use AAP_CHAIN, AGENT_MESSAGE_CHAIN, or METAMASK_CHAIN = base | base-sepolia.');
  }
  return raw as SupportedChain;
}

function resolveRpcUrl(chainKey: SupportedChain) {
  if (process.env.AAP_RPC_URL) return process.env.AAP_RPC_URL;
  if (process.env.AGENT_MESSAGE_RPC_URL) return process.env.AGENT_MESSAGE_RPC_URL;
  if (process.env.RPC_URL) return process.env.RPC_URL;
  if (process.env.BASE_RPC_URL) return process.env.BASE_RPC_URL;
  if (chainKey === 'base' && process.env.BASE_MAINNET_RPC_URL) return process.env.BASE_MAINNET_RPC_URL;
  if (chainKey === 'base-sepolia' && process.env.BASE_SEPOLIA_RPC_URL) return process.env.BASE_SEPOLIA_RPC_URL;
  throw new Error('Missing RPC URL. Set AAP_RPC_URL, AGENT_MESSAGE_RPC_URL, RPC_URL, or a Base RPC env var.');
}

async function resolvePrivateKey() {
  if (process.env.AGENT_PRIVATE_KEY) return process.env.AGENT_PRIVATE_KEY as `0x${string}`;

  const walletFile = process.env.AGENT_WALLET_FILE?.trim();
  if (!walletFile) {
    throw new Error('Missing AGENT_PRIVATE_KEY or AGENT_WALLET_FILE.');
  }

  const resolved = path.resolve(process.cwd(), walletFile);
  const raw = await readFile(resolved, 'utf8');
  const parsed = JSON.parse(raw) as { privateKey?: string };
  if (!parsed.privateKey) {
    throw new Error(`Wallet file ${resolved} does not contain privateKey.`);
  }

  return parsed.privateKey as `0x${string}`;
}

function requireBytes32(name: string, value: string | undefined) {
  if (!value || !/^0x[0-9a-fA-F]{64}$/.test(value)) {
    throw new Error(`Missing or invalid ${name}. Expected a 32-byte hex string.`);
  }
  return value as `0x${string}`;
}

function requireAmount(name: string, value: string | undefined) {
  const normalized = value?.trim();
  if (!normalized) {
    throw new Error(`Missing ${name}. The human must explicitly provide the wstETH amount to claim.`);
  }
  return normalized;
}

function parseLookbackBlocks() {
  const raw = process.env.AAP_ALLOWANCE_LOOKBACK_BLOCKS?.trim();
  if (!raw) return DEFAULT_ALLOWANCE_LOOKBACK_BLOCKS;

  try {
    return BigInt(raw);
  } catch {
    throw new Error('Invalid AAP_ALLOWANCE_LOOKBACK_BLOCKS. Expected an integer block count.');
  }
}

async function discoverAssignedAllowance(
  publicClient: AllowanceDiscoveryClient,
  agent: `0x${string}`,
) {
  const latestBlock = await publicClient.getBlockNumber();
  const lookback = parseLookbackBlocks();
  const earliestBlock = latestBlock > lookback ? latestBlock - lookback : 0n;

  for (let toBlock = latestBlock; toBlock >= earliestBlock;) {
    const fromBlock = toBlock > LOG_WINDOW ? toBlock - LOG_WINDOW + 1n : 0n;
    const boundedFromBlock = fromBlock < earliestBlock ? earliestBlock : fromBlock;

    const logs = await publicClient.getLogs({
      event: FACTORY_EVENT_ABI[0],
      args: { agent },
      fromBlock: boundedFromBlock,
      toBlock,
    });

    if (logs.length) {
      const latest = [...logs].sort((left, right) => {
        if (left.blockNumber === right.blockNumber) {
          return Number((right.logIndex ?? 0) - (left.logIndex ?? 0));
        }
        return Number((right.blockNumber ?? 0n) - (left.blockNumber ?? 0n));
      })[0];

      const { treasury, budgetId, amountWstETH, ruleId, label } = latest.args;
      if (treasury && budgetId && amountWstETH !== undefined) {
        return {
          treasuryAddress: getAddress(treasury),
          budgetId,
          amountWstETH,
          ruleId,
          label: label ?? '',
          blockNumber: latest.blockNumber?.toString() ?? null,
          transactionHash: latest.transactionHash,
        };
      }
    }

    if (boundedFromBlock === 0n || boundedFromBlock === earliestBlock) break;
    toBlock = boundedFromBlock - 1n;
  }

  return null;
}

async function main() {
  const chainKey = resolveChainKey();
  const chain = chains[chainKey];
  const rpcUrl = resolveRpcUrl(chainKey);
  const privateKey = await resolvePrivateKey();
  const account = privateKeyToAccount(privateKey);

  const treasuryAddressRaw = process.env.AAP_TREASURY_ADDRESS?.trim() || DEFAULT_AAP_TREASURY_ADDRESS;

  const taskText = process.argv.slice(2).join(' ').trim() || process.env.AAP_TASK_TEXT?.trim();
  if (!taskText) {
    throw new Error('Provide a task description as CLI args or set AAP_TASK_TEXT.');
  }

  const amountRaw = requireAmount('AAP_AMOUNT_WSTETH', process.env.AAP_AMOUNT_WSTETH);
  const amountWstETH = parseUnits(amountRaw, 18);

  const transport = http(rpcUrl);
  const publicClient = createPublicClient({ chain, transport });
  const walletClient = createWalletClient({ account, chain, transport });

  const discoveredAllowance =
    process.env.AAP_TREASURY_ADDRESS?.trim() && process.env.AAP_BUDGET_ID?.trim()
      ? null
      : await discoverAssignedAllowance(publicClient, account.address);

  const treasuryAddress = getAddress(
    process.env.AAP_TREASURY_ADDRESS?.trim()
      || discoveredAllowance?.treasuryAddress
      || treasuryAddressRaw,
  );
  const budgetId = requireBytes32(
    'AAP_BUDGET_ID',
    process.env.AAP_BUDGET_ID?.trim()
      || discoveredAllowance?.budgetId
      || DEFAULT_AAP_BUDGET_ID,
  );
  const recipient = getAddress(process.env.AAP_RECIPIENT_ADDRESS?.trim() || account.address);
  const nowIso = new Date().toISOString();
  const taskId = keccak256(stringToHex(`task:${taskText}`));
  const evidenceHash = keccak256(stringToHex(`evidence:${taskText}`));
  const resultHash = keccak256(stringToHex(`result:pending:${taskText}:${nowIso}`));
  const receiptHash = keccak256(stringToHex(`receipt:${budgetId}:${recipient}:${amountRaw}:${taskText}:${nowIso}`));
  const metadataURI = process.env.AAP_METADATA_URI?.trim() || `aap://task/${taskId}`;

  const request = {
    abi: TREASURY_ABI,
    address: treasuryAddress,
    functionName: 'spendFromBudget',
    args: [budgetId, recipient, amountWstETH, taskId, receiptHash, evidenceHash, resultHash, metadataURI],
    chain,
  } as const;

  if (process.env.DRY_RUN === 'true') {
    console.log(JSON.stringify({
      chainId: chain.id,
      treasuryAddress,
      sender: account.address,
      recipient,
      budgetId,
      amountWstETH: amountRaw,
      discoveredAllowance,
      taskText,
      taskId,
      receiptHash,
      evidenceHash,
      resultHash,
      metadataURI,
      dryRun: true,
    }, null, 2));
    return;
  }

  const hash = await (walletClient.writeContract as any)(request);
  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log(JSON.stringify({
    chainId: chain.id,
    treasuryAddress,
    sender: account.address,
    recipient,
    budgetId,
    amountWstETH: formatUnits(amountWstETH, 18),
    discoveredAllowance,
    taskText,
    taskId,
    receiptHash,
    evidenceHash,
    resultHash,
    metadataURI,
    transactionHash: receipt.transactionHash,
    blockNumber: receipt.blockNumber.toString(),
  }, null, 2));
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
