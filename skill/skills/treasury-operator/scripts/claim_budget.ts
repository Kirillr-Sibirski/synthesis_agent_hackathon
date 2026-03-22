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

const DEFAULT_AAP_TREASURY_ADDRESS = '0xe07402f1B072FB1Cc5651E763D2139c1218016C9' as const;
const DEFAULT_AAP_BUDGET_ID = '0xb3e0fae8b586325ab4a14d8c2d0ed544d80af3db3bc870137bebb448314c0224' as const;
const DEFAULT_AAP_AMOUNT_WSTETH = '0.000001' as const;

const chains = {
  base,
  'base-sepolia': baseSepolia,
} as const;

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

  const amountRaw = process.env.AAP_AMOUNT_WSTETH?.trim() || DEFAULT_AAP_AMOUNT_WSTETH;

  const budgetId = requireBytes32('AAP_BUDGET_ID', process.env.AAP_BUDGET_ID?.trim() || DEFAULT_AAP_BUDGET_ID);
  const recipient = getAddress(process.env.AAP_RECIPIENT_ADDRESS?.trim() || account.address);
  const treasuryAddress = getAddress(treasuryAddressRaw);
  const amountWstETH = parseUnits(amountRaw, 18);

  const nowIso = new Date().toISOString();
  const taskId = keccak256(stringToHex(`task:${taskText}`));
  const evidenceHash = keccak256(stringToHex(`evidence:${taskText}`));
  const resultHash = keccak256(stringToHex(`result:pending:${taskText}:${nowIso}`));
  const receiptHash = keccak256(stringToHex(`receipt:${budgetId}:${recipient}:${amountRaw}:${taskText}:${nowIso}`));
  const metadataURI = process.env.AAP_METADATA_URI?.trim() || `aap://task/${taskId}`;

  const transport = http(rpcUrl);
  const publicClient = createPublicClient({ chain, transport });
  const walletClient = createWalletClient({ account, chain, transport });

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
