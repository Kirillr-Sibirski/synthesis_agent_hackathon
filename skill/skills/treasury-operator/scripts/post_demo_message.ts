import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { createPublicClient, createWalletClient, encodeFunctionData, getAddress, http, parseAbi } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base, baseSepolia } from 'viem/chains';

const MESSAGE_BOARD_ABI = parseAbi([
  'function postMessage(address token, uint256 amount, string message) external',
  'function lastMessage() external view returns (address sender, address token, uint256 amount, string message, bytes32 messageHash, uint64 timestamp)',
]);

const ERC20_ABI = parseAbi([
  'function approve(address spender, uint256 value) external returns (bool)',
]);

const chains = {
  base,
  'base-sepolia': baseSepolia,
} as const;

type SupportedChain = keyof typeof chains;

function resolveChainKey(): SupportedChain {
  const raw = (process.env.AGENT_MESSAGE_CHAIN ?? process.env.METAMASK_CHAIN ?? 'base-sepolia').toLowerCase();
  if (!(raw in chains)) {
    throw new Error('Unsupported chain. Use AGENT_MESSAGE_CHAIN or METAMASK_CHAIN = base | base-sepolia.');
  }
  return raw as SupportedChain;
}

function resolveRpcUrl(chainKey: SupportedChain) {
  if (process.env.AGENT_MESSAGE_RPC_URL) return process.env.AGENT_MESSAGE_RPC_URL;
  if (process.env.RPC_URL) return process.env.RPC_URL;
  if (process.env.BASE_RPC_URL) return process.env.BASE_RPC_URL;
  if (chainKey === 'base' && process.env.BASE_MAINNET_RPC_URL) return process.env.BASE_MAINNET_RPC_URL;
  if (chainKey === 'base-sepolia' && process.env.BASE_SEPOLIA_RPC_URL) return process.env.BASE_SEPOLIA_RPC_URL;
  if (process.env.BASE_MAINNET_RPC_URL) return process.env.BASE_MAINNET_RPC_URL;
  if (process.env.BASE_SEPOLIA_RPC_URL) return process.env.BASE_SEPOLIA_RPC_URL;
  throw new Error('Missing RPC URL. Set AGENT_MESSAGE_RPC_URL, RPC_URL, or a Base RPC env var.');
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

async function main() {
  const chainKey = resolveChainKey();
  const chain = chains[chainKey];
  const rpcUrl = resolveRpcUrl(chainKey);
  const privateKey = await resolvePrivateKey();
  const account = privateKeyToAccount(privateKey);

  const addressRaw = process.env.AGENT_MESSAGE_BOARD_ADDRESS?.trim();
  if (!addressRaw) {
    throw new Error('Missing AGENT_MESSAGE_BOARD_ADDRESS.');
  }

  const message = process.argv.slice(2).join(' ').trim() || process.env.AGENT_DEMO_MESSAGE?.trim();
  if (!message) {
    throw new Error('Provide a message as CLI args or set AGENT_DEMO_MESSAGE.');
  }

  const boardAddress = getAddress(addressRaw);
  const tokenRaw = process.env.WSTETH_ADDRESS?.trim();
  if (!tokenRaw) {
    throw new Error('Missing WSTETH_ADDRESS.');
  }
  const amountRaw = process.env.AGENT_MESSAGE_AMOUNT_WEI?.trim();
  if (!amountRaw) {
    throw new Error('Missing AGENT_MESSAGE_AMOUNT_WEI.');
  }
  const amount = BigInt(amountRaw);
  if (amount <= 0n) {
    throw new Error('AGENT_MESSAGE_AMOUNT_WEI must be greater than 0.');
  }

  const tokenAddress = getAddress(tokenRaw);
  const transport = http(rpcUrl);

  const publicClient = createPublicClient({ chain, transport });
  const walletClient = createWalletClient({
    account,
    chain,
    transport,
  });

  const request = {
    abi: MESSAGE_BOARD_ABI,
    address: boardAddress,
    functionName: 'postMessage',
    args: [tokenAddress, amount, message],
    chain,
  } as const;

  if (process.env.DRY_RUN === 'true') {
    console.log(JSON.stringify({
      chainId: chain.id,
      boardAddress,
      sender: account.address,
      tokenAddress,
      amountWei: amount.toString(),
      message,
      approveCalldata: encodeFunctionData({
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [boardAddress, amount],
      }),
      calldata: encodeFunctionData(request),
      dryRun: true,
    }, null, 2));
    return;
  }

  const approvalHash = await (walletClient.writeContract as any)({
    abi: ERC20_ABI,
    address: tokenAddress,
    functionName: 'approve',
    args: [boardAddress, amount],
    chain,
  });
  await publicClient.waitForTransactionReceipt({ hash: approvalHash });

  const hash = await (walletClient.writeContract as any)(request);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  const [sender, storedToken, storedAmount, storedMessage, messageHash, timestamp] = await (publicClient.readContract as any)({
    abi: MESSAGE_BOARD_ABI,
    address: boardAddress,
    functionName: 'lastMessage',
    authorizationList: undefined,
  });

  console.log(JSON.stringify({
    chainId: chain.id,
    boardAddress,
    sender,
    tokenAddress: storedToken,
    amountWei: storedAmount.toString(),
    message: storedMessage,
    messageHash,
    timestamp: Number(timestamp),
    approvalTransactionHash: approvalHash,
    transactionHash: receipt.transactionHash,
    blockNumber: receipt.blockNumber.toString(),
  }, null, 2));
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
