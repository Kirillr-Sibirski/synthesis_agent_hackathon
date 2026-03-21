import fs from 'node:fs/promises';
import path from 'node:path';

import {
  createPublicClient,
  formatEther,
  getAddress,
  http,
  isAddress,
  type Address,
  zeroAddress,
} from 'viem';
import { base, baseSepolia, type Chain } from 'viem/chains';

import { CHAIN_IDS, CHAIN_NAMES, DEFAULT_QUERYABLE_HASHES, DEMO } from '@/lib/constants';
import type { DashboardSnapshot, ReceiptLookupResult } from '@/lib/types';

type JsonRecord = Record<string, unknown>;
type ChainKey = 'base' | 'baseSepolia';

type FrontendConfig = {
  chains?: Partial<Record<ChainKey, {
    rpcUrl?: string;
    treasury?: string;
    asset?: string;
    receiptRegistry?: string;
    authorizer?: string;
  }>>;
  actors?: {
    budgetManager?: string;
    spendRecipient?: string;
    demoExecutor?: string;
    demoRecipient?: string;
    receiptHash?: string;
  };
};

type NormalizedFrontendConfig = {
  chains: Record<ChainKey, {
    rpcUrl: string;
    treasury: string;
    asset: string;
    receiptRegistry: string;
    authorizer: string;
  }>;
  actors: {
    budgetManager: string;
    spendRecipient: string;
    demoExecutor: string;
    demoRecipient: string;
    receiptHash: string;
  };
};

type LiveState = {
  treasuryAddress: string;
  assetAddress: string;
  receiptRegistryAddress: string;
  authorizerAddress: string;
  principalBaselineStETH: string | null;
  totalBudgetAllocatedWstETH: string | null;
  availableYieldWstETH: string | null;
  unallocatedYieldWstETH: string | null;
  remainingBudgetWstETH: string | null;
  recipientBalanceWstETH: string | null;
  budgetManager: string;
  budgetActive: boolean | null;
  budgetParentId: string | null;
  budgetAllocationWstETH: string | null;
  budgetSpentWstETH: string | null;
  receiptFound: boolean;
  receiptExecutor: string;
  receiptRecipient: string;
  receiptAmountWstETH: string | null;
  receiptBudgetId: string | null;
  receiptTaskId: string | null;
  receiptEvidenceHash: string | null;
  receiptResultHash: string | null;
  receiptMetadataURI: string | null;
  receiptTimestamp: string | null;
};

const repoRoot = path.resolve(process.cwd(), '..', '..');
const appRoot = process.cwd();
const ZERO_BYTES32 = `0x${'0'.repeat(64)}`;

const chains: Record<ChainKey, Chain> = {
  base,
  baseSepolia,
};

const paths = {
  config: path.join(appRoot, 'public/config.json'),
  preflight: path.join(repoRoot, 'artifacts/metamask/preflight-84532.json'),
  readiness: path.join(repoRoot, 'artifacts/final/same-network-readiness.json'),
  signedDelegation: path.join(repoRoot, 'artifacts/metamask/signed-delegation-84532.json'),
  liveProof: path.join(repoRoot, 'Memory/Deployments/base-sepolia-metamask-live.md'),
  evidencePack: path.join(repoRoot, 'Memory/Submission/public-evidence-pack.md'),
} as const;

const builtInConfig: NormalizedFrontendConfig = {
  chains: {
    base: {
      rpcUrl: 'https://mainnet.base.org',
      treasury: '',
      asset: DEMO.asset.baseMainnet,
      receiptRegistry: '',
      authorizer: '',
    },
    baseSepolia: {
      rpcUrl: 'https://sepolia.base.org',
      treasury: DEMO.treasury.baseSepolia,
      asset: DEMO.asset.baseSepolia,
      receiptRegistry: DEMO.receiptRegistry.baseSepolia,
      authorizer: DEMO.authorizer.baseSepolia,
    },
  },
  actors: {
    budgetManager: DEMO.budgetManager,
    spendRecipient: DEMO.spendRecipient,
    demoExecutor: DEMO.smartAccount,
    demoRecipient: DEMO.demoRecipient,
    receiptHash: DEMO.receiptHash,
  },
};

const TREASURY_ABI = [
  {
    type: 'function',
    name: 'asset',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'address' }],
  },
  {
    type: 'function',
    name: 'authorizer',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'address' }],
  },
  {
    type: 'function',
    name: 'receiptRegistry',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'address' }],
  },
  {
    type: 'function',
    name: 'principalBaselineStETH',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'totalBudgetAllocated',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'availableYieldInWstETH',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'unallocatedYieldInWstETH',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'remainingBudget',
    stateMutability: 'view',
    inputs: [{ type: 'bytes32' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'budgets',
    stateMutability: 'view',
    inputs: [{ type: 'bytes32' }],
    outputs: [
      { type: 'uint128', name: 'allocated' },
      { type: 'uint128', name: 'spent' },
      { type: 'bool', name: 'active' },
      { type: 'bytes32', name: 'parentBudgetId' },
      { type: 'address', name: 'manager' },
      { type: 'string', name: 'label' },
    ],
  },
] as const;

const ERC20_ABI = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
] as const;

const RECEIPT_REGISTRY_ABI = [
  {
    type: 'function',
    name: 'receipts',
    stateMutability: 'view',
    inputs: [{ type: 'bytes32' }],
    outputs: [
      { type: 'bytes32', name: 'taskId' },
      { type: 'bytes32', name: 'ruleId' },
      { type: 'address', name: 'executor' },
      { type: 'address', name: 'recipient' },
      { type: 'uint256', name: 'amount' },
      { type: 'bytes32', name: 'budgetId' },
      { type: 'bytes32', name: 'evidenceHash' },
      { type: 'bytes32', name: 'resultHash' },
      { type: 'string', name: 'metadataURI' },
      { type: 'uint64', name: 'timestamp' },
    ],
  },
] as const;

const defaultPreflight: JsonRecord = {
  network: {
    chainId: CHAIN_IDS.baseSepolia,
    chainName: CHAIN_NAMES.baseSepolia,
    finalSameNetworkTarget: {
      chainId: CHAIN_IDS.base,
      chainName: CHAIN_NAMES.base,
      chainSelected: false,
      expectedWstETH: DEMO.asset.baseMainnet,
      configuredWstETH: DEMO.asset.baseSepolia,
      configuredWstETHMatchesBaseMainnet: false,
    },
  },
  accounts: {
    delegatorSmartAccount: DEMO.smartAccount,
    treasuryExecutor: DEMO.smartAccount,
    executor: DEMO.owner,
    recipient: DEMO.owner,
  },
  onchain: {
    smartAccountDeployed: true,
    treasuryAddress: DEMO.treasury.baseSepolia,
    treasuryDeployed: true,
  },
  bundler: {
    reachable: true,
    chainMatchesSelectedNetwork: true,
    readyForSelectedNetworkUserOps: true,
  },
  spendIntent: {
    selector: '0x7441041a',
    budgetId: DEMO.budgetId,
    taskId: DEMO.taskId,
    receiptHash: DEMO.receiptHash,
    evidenceHash: DEMO.evidenceHash,
    resultHash: DEMO.resultHash,
    metadataURI: DEMO.metadataURI,
    amountWstETH: DEMO.amountWstETH,
  },
  readiness: {
    readyForLiveRedemption: true,
    readyForFinalSameNetworkRun: false,
    remainingBlockers: [
      'Selected chain is not Base mainnet yet; final same-network thesis is still unmet.',
    ],
    nextSteps: [
      'Switch MetaMask integration env to Base mainnet (METAMASK_CHAIN=base) for the final same-network run.',
      'Record the resulting treasury spend tx hash and update Memory/Deployments/ and Memory/Submission/.',
    ],
  },
};

const defaultReadiness: JsonRecord = {
  summary: {
    metaMaskFinalSameNetworkReady: false,
    frontendFinalDemoConfigReady: false,
    cutoverEnvReady: false,
    erc8004PackagingReady: true,
    overallReadyForSameNetworkDemoSubmission: false,
    currentlyHonestTracks: ['agentsWithReceiptsErc8004', 'synthesisOpenTrack'],
  },
  trackQualification: {
    agentsWithReceiptsErc8004: { currentlyHonest: true, blockerIfAny: null },
    bestUseOfDelegations: {
      currentlyHonest: false,
      blockerIfAny: 'MetaMask smart-account deployment/redemption proof is still missing on the final same-network target.',
    },
    stEthAgentTreasury: {
      currentlyHonest: false,
      blockerIfAny: 'Real Base mainnet wstETH deployment/env path is not fully wired yet.',
    },
    letTheAgentCook: {
      currentlyHonest: false,
      blockerIfAny: 'Judge-ready frontend demo surface and/or public agent packaging still need final completion.',
    },
    synthesisOpenTrack: { currentlyHonest: true, blockerIfAny: null },
  },
  blockers: [
    'Selected chain is not Base mainnet yet; final same-network thesis is still unmet.',
  ],
  nextActions: [
    'Finish the Base mainnet cutover env: chain selection, bundler, mainnet addresses, and distinct role wiring.',
  ],
};

const defaultSignedDelegation: JsonRecord = {
  qualificationStatus:
    'Constrained MetaMask delegation artifact generated and signed offchain. Live onchain redemption still requires the final Base mainnet run.',
  network: {
    chainId: CHAIN_IDS.baseSepolia,
    chainName: CHAIN_NAMES.baseSepolia,
    delegationManager: '0xdb9B1e94B5b69Df7e401DDbedE43491141047dB3',
  },
  accounts: {
    owner: DEMO.owner,
    delegatorSmartAccount: DEMO.smartAccount,
    treasuryExecutor: DEMO.smartAccount,
    delegate: DEMO.owner,
    redeemer: DEMO.owner,
    recipient: DEMO.owner,
  },
  treasurySpendIntent: {
    treasury: DEMO.treasury.baseSepolia,
    budgetId: DEMO.budgetId,
    amountWstETH: DEMO.amountWstETH,
    taskId: DEMO.taskId,
    receiptHash: DEMO.receiptHash,
    evidenceHash: DEMO.evidenceHash,
    resultHash: DEMO.resultHash,
    metadataURI: DEMO.metadataURI,
  },
  delegationHash: DEMO.delegationHash,
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function asString(value: unknown, fallback = '—'): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function asOptionalString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function asBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function normalizeAddress(value: unknown): Address | null {
  if (typeof value !== 'string' || !value.trim() || !isAddress(value.trim())) return null;
  return getAddress(value.trim());
}

function normalizeBytes32(value: unknown): string | null {
  return typeof value === 'string' && /^0x[a-fA-F0-9]{64}$/.test(value.trim()) ? value.trim() : null;
}

function asWeiString(value: unknown): string | null {
  return typeof value === 'bigint' ? value.toString() : typeof value === 'string' && value.trim() ? value : null;
}

function humanTimestamp(value: unknown): string | null {
  if (typeof value === 'bigint') {
    return value === 0n ? null : new Date(Number(value) * 1000).toISOString();
  }

  if (typeof value === 'number') {
    return value === 0 ? null : new Date(value * 1000).toISOString();
  }

  return typeof value === 'string' && value.trim() ? value : null;
}

async function readJsonFile<T>(absolutePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(absolutePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function readTextFile(absolutePath: string, fallback: string): Promise<string> {
  try {
    return await fs.readFile(absolutePath, 'utf8');
  } catch {
    return fallback;
  }
}

async function readFrontendConfig(): Promise<NormalizedFrontendConfig> {
  const loaded = await readJsonFile<FrontendConfig>(paths.config, builtInConfig);

  return {
    chains: {
      base: {
        ...builtInConfig.chains.base,
        ...(loaded.chains?.base ?? {}),
      },
      baseSepolia: {
        ...builtInConfig.chains.baseSepolia,
        ...(loaded.chains?.baseSepolia ?? {}),
      },
    },
    actors: {
      ...builtInConfig.actors,
      ...(loaded.actors ?? {}),
    },
  };
}

function resolveSelectedChainKey(preflight: JsonRecord, config: NormalizedFrontendConfig): ChainKey {
  const envChain = (process.env.FRONTEND_CHAIN ?? '').trim();
  if (envChain === 'base' || envChain === 'baseSepolia') return envChain;

  const preflightChainId = Number(asRecord(preflight.network).chainId ?? 0);
  if (preflightChainId === CHAIN_IDS.base) return 'base';
  if (preflightChainId === CHAIN_IDS.baseSepolia) return 'baseSepolia';

  return config.chains.base.treasury ? 'base' : 'baseSepolia';
}

async function tryRead<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}

async function loadLiveState(params: {
  chainKey: ChainKey;
  config: NormalizedFrontendConfig;
  preflight: JsonRecord;
  budgetId: string;
  receiptHash: string;
  recipient: string;
}): Promise<LiveState | null> {
  const { chainKey, config, preflight, budgetId, receiptHash, recipient } = params;
  const chainConfig = config.chains[chainKey];
  const rpcUrl = chainConfig.rpcUrl?.trim();

  if (!rpcUrl) return null;

  const treasuryAddress =
    normalizeAddress(chainConfig.treasury) ??
    normalizeAddress(asRecord(preflight.onchain).treasuryAddress);

  if (!treasuryAddress) return null;

  const client = createPublicClient({
    chain: chains[chainKey],
    transport: http(rpcUrl),
  });

  const assetFromConfig = normalizeAddress(chainConfig.asset);
  const receiptRegistryFromConfig = normalizeAddress(chainConfig.receiptRegistry);
  const authorizerFromConfig = normalizeAddress(chainConfig.authorizer);
  const budgetIdArg = (normalizeBytes32(budgetId) ?? DEMO.budgetId) as `0x${string}`;
  const receiptHashArg = (normalizeBytes32(receiptHash) ?? DEMO.receiptHash) as `0x${string}`;
  const recipientAddress = normalizeAddress(recipient) ?? getAddress(DEMO.owner);

  const [
    asset,
    authorizer,
    receiptRegistry,
    principalBaseline,
    totalBudgetAllocated,
    availableYield,
    unallocatedYield,
    remainingBudget,
    budgetTuple,
  ] = await Promise.all([
    tryRead(() => client.readContract({ address: treasuryAddress, abi: TREASURY_ABI, functionName: 'asset' })),
    tryRead(() => client.readContract({ address: treasuryAddress, abi: TREASURY_ABI, functionName: 'authorizer' })),
    tryRead(() => client.readContract({ address: treasuryAddress, abi: TREASURY_ABI, functionName: 'receiptRegistry' })),
    tryRead(() => client.readContract({ address: treasuryAddress, abi: TREASURY_ABI, functionName: 'principalBaselineStETH' })),
    tryRead(() => client.readContract({ address: treasuryAddress, abi: TREASURY_ABI, functionName: 'totalBudgetAllocated' })),
    tryRead(() => client.readContract({ address: treasuryAddress, abi: TREASURY_ABI, functionName: 'availableYieldInWstETH' })),
    tryRead(() => client.readContract({ address: treasuryAddress, abi: TREASURY_ABI, functionName: 'unallocatedYieldInWstETH' })),
    tryRead(() => client.readContract({ address: treasuryAddress, abi: TREASURY_ABI, functionName: 'remainingBudget', args: [budgetIdArg] })),
    tryRead(() => client.readContract({ address: treasuryAddress, abi: TREASURY_ABI, functionName: 'budgets', args: [budgetIdArg] })),
  ]);

  const resolvedAsset = normalizeAddress(asset) ?? assetFromConfig;
  const resolvedReceiptRegistry = normalizeAddress(receiptRegistry) ?? receiptRegistryFromConfig;
  const resolvedAuthorizer = normalizeAddress(authorizer) ?? authorizerFromConfig;

  const [recipientBalance, receiptTuple] = await Promise.all([
    resolvedAsset
      ? tryRead(() => client.readContract({ address: resolvedAsset, abi: ERC20_ABI, functionName: 'balanceOf', args: [recipientAddress] }))
      : Promise.resolve(null),
    resolvedReceiptRegistry
      ? tryRead(() => client.readContract({ address: resolvedReceiptRegistry, abi: RECEIPT_REGISTRY_ABI, functionName: 'receipts', args: [receiptHashArg] }))
      : Promise.resolve(null),
  ]);

  const budget = Array.isArray(budgetTuple) ? budgetTuple : null;
  const receipt = Array.isArray(receiptTuple) ? receiptTuple : null;
  const receiptExecutor = receipt ? normalizeAddress(receipt[2]) : null;
  const receiptRecipient = receipt ? normalizeAddress(receipt[3]) : null;
  const receiptFound = Boolean(receiptExecutor && receiptRecipient && receiptRecipient !== zeroAddress);

  return {
    treasuryAddress,
    assetAddress: resolvedAsset ?? DEMO.asset.baseSepolia,
    receiptRegistryAddress: resolvedReceiptRegistry ?? DEMO.receiptRegistry.baseSepolia,
    authorizerAddress: resolvedAuthorizer ?? DEMO.authorizer.baseSepolia,
    principalBaselineStETH: asWeiString(principalBaseline),
    totalBudgetAllocatedWstETH: asWeiString(totalBudgetAllocated),
    availableYieldWstETH: asWeiString(availableYield),
    unallocatedYieldWstETH: asWeiString(unallocatedYield),
    remainingBudgetWstETH: asWeiString(remainingBudget),
    recipientBalanceWstETH: asWeiString(recipientBalance),
    budgetManager: budget ? asString(budget[4], DEMO.budgetManager) : DEMO.budgetManager,
    budgetActive: budget ? asBoolean(budget[2]) : null,
    budgetParentId: budget ? asOptionalString(budget[3]) : ZERO_BYTES32,
    budgetAllocationWstETH: budget ? asWeiString(budget[0]) : null,
    budgetSpentWstETH: budget ? asWeiString(budget[1]) : null,
    receiptFound,
    receiptExecutor: receiptExecutor ?? DEMO.smartAccount,
    receiptRecipient: receiptRecipient ?? DEMO.owner,
    receiptAmountWstETH: receipt ? asWeiString(receipt[4]) : null,
    receiptBudgetId: receipt ? asOptionalString(receipt[5]) : null,
    receiptTaskId: receipt ? asOptionalString(receipt[0]) : null,
    receiptEvidenceHash: receipt ? asOptionalString(receipt[6]) : null,
    receiptResultHash: receipt ? asOptionalString(receipt[7]) : null,
    receiptMetadataURI: receipt ? asOptionalString(receipt[8]) : null,
    receiptTimestamp: receipt ? humanTimestamp(receipt[9]) : null,
  };
}

function buildTrackSummary(readiness: JsonRecord): DashboardSnapshot['readiness']['honestTracks'] {
  const trackQualification = asRecord(readiness.trackQualification);
  const trackMeta = [
    ['agentsWithReceiptsErc8004', 'Agents With Receipts / ERC-8004'],
    ['bestUseOfDelegations', 'Best Use of Delegations'],
    ['stEthAgentTreasury', 'stETH Agent Treasury'],
    ['letTheAgentCook', 'Let the Agent Cook'],
    ['synthesisOpenTrack', 'Synthesis Open Track'],
  ] as const;

  return trackMeta.map(([key, label]) => {
    const track = asRecord(trackQualification[key]);
    return {
      key,
      label,
      honest: asBoolean(track.currentlyHonest) ?? false,
      blocker: asOptionalString(track.blockerIfAny),
    };
  });
}

function makeReceiptLookup(snapshot: DashboardSnapshot, query: string): ReceiptLookupResult {
  const normalized = query.trim().toLowerCase();
  const relatedHashMap = new Map(snapshot.receipt.relatedHashes.map((entry) => [entry.hash.toLowerCase(), entry.label]));

  const details = [
    { label: 'Receipt hash', value: snapshot.receipt.lookupHash },
    { label: 'Executor', value: snapshot.receipt.executor },
    { label: 'Recipient', value: snapshot.receipt.recipient },
    { label: 'Amount', value: `${snapshot.receipt.amountWstETH} wstETH` },
    { label: 'Budget ID', value: snapshot.receipt.budgetId },
    { label: 'Task ID', value: snapshot.receipt.taskId },
    { label: 'Evidence hash', value: snapshot.receipt.evidenceHash },
    { label: 'Result hash', value: snapshot.receipt.resultHash },
    { label: 'Metadata URI', value: snapshot.receipt.metadataURI },
    { label: 'Timestamp', value: snapshot.receipt.timestamp ?? '—' },
    { label: 'Transaction hash', value: snapshot.receipt.txHash ?? '—' },
  ];

  const match =
    normalized === snapshot.receipt.lookupHash.toLowerCase()
      ? snapshot.receipt.lookupHash
      : snapshot.receipt.relatedHashes.find((entry) => entry.hash.toLowerCase() === normalized)?.hash ?? null;

  if (!match) {
    return {
      found: false,
      query,
      source: 'dashboard',
      label: 'No matching receipt found',
      hash: query,
      details,
      relatedHashes: snapshot.receipt.relatedHashes,
    };
  }

  const sourceLabel = relatedHashMap.get(match.toLowerCase()) ?? 'Receipt lookup';

  return {
    found: true,
    query,
    source: sourceLabel,
    label: sourceLabel,
    hash: match,
    executor: snapshot.receipt.executor,
    recipient: snapshot.receipt.recipient,
    amountWstETH: snapshot.receipt.amountWstETH,
    budgetId: snapshot.receipt.budgetId,
    taskId: snapshot.receipt.taskId,
    evidenceHash: snapshot.receipt.evidenceHash,
    resultHash: snapshot.receipt.resultHash,
    metadataURI: snapshot.receipt.metadataURI,
    timestamp: snapshot.receipt.timestamp,
    txHash: snapshot.receipt.txHash,
    details,
    relatedHashes: snapshot.receipt.relatedHashes,
  };
}

export async function loadDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [config, preflight, readiness, signedDelegation, liveProofNote, evidencePack] = await Promise.all([
    readFrontendConfig(),
    readJsonFile(paths.preflight, defaultPreflight),
    readJsonFile(paths.readiness, defaultReadiness),
    readJsonFile(paths.signedDelegation, defaultSignedDelegation),
    readTextFile(paths.liveProof, 'Base Sepolia live proof note unavailable.'),
    readTextFile(paths.evidencePack, 'Public evidence pack unavailable.'),
  ]);

  const preflightRecord = asRecord(preflight);
  const readinessRecord = asRecord(readiness);
  const signedRecord = asRecord(signedDelegation);
  const network = asRecord(preflightRecord.network);
  const finalTarget = asRecord(network.finalSameNetworkTarget);
  const accounts = asRecord(preflightRecord.accounts);
  const onchain = asRecord(preflightRecord.onchain);
  const bundler = asRecord(preflightRecord.bundler);
  const spendIntent = asRecord(preflightRecord.spendIntent);
  const summary = asRecord(readinessRecord.summary);
  const trackSummary = buildTrackSummary(readinessRecord);
  const chainKey = resolveSelectedChainKey(preflightRecord, config);
  const chainConfig = config.chains[chainKey];
  const selectedChain = chains[chainKey];

  const receiptHash = normalizeBytes32(spendIntent.receiptHash) ?? normalizeBytes32(config.actors.receiptHash) ?? DEMO.receiptHash;
  const budgetId = normalizeBytes32(spendIntent.budgetId) ?? DEMO.budgetId;
  const recipient =
    normalizeAddress(config.actors.demoRecipient) ??
    normalizeAddress(config.actors.spendRecipient) ??
    normalizeAddress(accounts.recipient) ??
    getAddress(DEMO.owner);

  const liveState = await loadLiveState({
    chainKey,
    config,
    preflight: preflightRecord,
    budgetId,
    receiptHash,
    recipient,
  });

  const liveProofBody = liveProofNote.trim() || evidencePack.trim();
  const treasuryAddress = liveState?.treasuryAddress ?? normalizeAddress(chainConfig.treasury) ?? normalizeAddress(onchain.treasuryAddress) ?? DEMO.treasury.baseSepolia;
  const assetAddress = liveState?.assetAddress ?? normalizeAddress(chainConfig.asset) ?? DEMO.asset.baseSepolia;
  const receiptRegistryAddress = liveState?.receiptRegistryAddress ?? normalizeAddress(chainConfig.receiptRegistry) ?? DEMO.receiptRegistry.baseSepolia;
  const authorizerAddress = liveState?.authorizerAddress ?? normalizeAddress(chainConfig.authorizer) ?? DEMO.authorizer.baseSepolia;
  const treasuryExecutorAddress =
    normalizeAddress(accounts.treasuryExecutor) ??
    normalizeAddress(accounts.delegatorSmartAccount) ??
    normalizeAddress(config.actors.demoExecutor) ??
    DEMO.smartAccount;

  const blockers = asArray<string>(readinessRecord.blockers);
  const nextActions = asArray<string>(readinessRecord.nextActions);
  const overallReady = Boolean(summary.overallReadyForSameNetworkDemoSubmission);
  const liveMetaMaskProofComplete =
    Boolean(liveState?.receiptFound) &&
    Boolean(onchain.smartAccountDeployed) &&
    Boolean(bundler.readyForSelectedNetworkUserOps);
  const currentPosture = overallReady
    ? 'Same-network stack looks ready for the final judge flow.'
    : selectedChain.id === CHAIN_IDS.base
      ? 'Base mainnet is selected, but the final sponsor cutover still needs proof completion.'
      : 'Base Sepolia proof is live; Base mainnet cutover is still pending.';

  const snapshot: DashboardSnapshot = {
    generatedAt: new Date().toISOString(),
    network: {
      chainId: selectedChain.id,
      chainName: selectedChain.name,
      finalChainId: Number(finalTarget.chainId ?? CHAIN_IDS.base),
      finalChainName: asString(finalTarget.chainName, CHAIN_NAMES.base),
      finalChainSelected: selectedChain.id === CHAIN_IDS.base || Boolean(finalTarget.chainSelected),
      bundlerReachable: Boolean(bundler.reachable),
      bundlerChainMatches: Boolean(bundler.chainMatchesSelectedNetwork),
      readyForSelectedNetworkUserOps: Boolean(bundler.readyForSelectedNetworkUserOps),
    },
    treasury: {
      treasuryAddress,
      assetAddress,
      receiptRegistryAddress,
      authorizerAddress,
      smartAccountAddress:
        normalizeAddress(accounts.delegatorSmartAccount) ??
        normalizeAddress(accounts.treasuryExecutor) ??
        DEMO.smartAccount,
      treasuryExecutorAddress,
      principalBaselineStETH: liveState?.principalBaselineStETH ?? DEMO.principalBaselineStETH,
      totalBudgetAllocatedWstETH: liveState?.totalBudgetAllocatedWstETH ?? DEMO.totalBudgetAllocatedWstETH,
      availableYieldWstETH: liveState?.availableYieldWstETH ?? DEMO.availableYieldWstETH,
      unallocatedYieldWstETH: liveState?.unallocatedYieldWstETH ?? DEMO.availableYieldWstETH,
      remainingBudgetWstETH: liveState?.remainingBudgetWstETH ?? DEMO.remainingBudgetWstETH,
      recipientBalanceWstETH: liveState?.recipientBalanceWstETH ?? DEMO.recipientBalanceWstETH,
      deploymentTxHash: DEMO.deploymentTxHash,
      spendTxHash: DEMO.spendTxHash,
      receiptRegistryExecutor:
        liveState?.receiptFound && liveState.receiptExecutor !== zeroAddress
          ? liveState.receiptExecutor
          : treasuryExecutorAddress,
    },
    budget: {
      label: 'OPS_BUDGET',
      budgetId,
      manager: liveState?.budgetManager ?? config.actors.budgetManager ?? DEMO.budgetManager,
      active: liveState?.budgetActive ?? true,
      parentBudgetId: liveState?.budgetParentId ?? ZERO_BYTES32,
      allocationWstETH: liveState?.budgetAllocationWstETH ?? DEMO.totalBudgetAllocatedWstETH,
      spentWstETH: liveState?.budgetSpentWstETH ?? DEMO.totalBudgetSpentWstETH,
      remainingWstETH: liveState?.remainingBudgetWstETH ?? DEMO.remainingBudgetWstETH,
      taskId: normalizeBytes32(spendIntent.taskId) ?? DEMO.taskId,
      receiptHash,
      evidenceHash: normalizeBytes32(spendIntent.evidenceHash) ?? DEMO.evidenceHash,
      resultHash: normalizeBytes32(spendIntent.resultHash) ?? DEMO.resultHash,
      metadataURI: asString(spendIntent.metadataURI, DEMO.metadataURI),
      selector: asString(spendIntent.selector, '0x7441041a'),
    },
    receipt: {
      lookupHash: receiptHash,
      found: liveState?.receiptFound ?? true,
      source: liveState?.receiptFound ? 'Onchain receipt registry' : 'Live proof artifact',
      executor: liveState?.receiptExecutor ?? treasuryExecutorAddress,
      recipient: liveState?.receiptRecipient ?? recipient,
      amountWstETH: liveState?.receiptAmountWstETH ?? asString(spendIntent.amountWstETH, DEMO.amountWstETH),
      budgetId: liveState?.receiptBudgetId ?? budgetId,
      taskId: liveState?.receiptTaskId ?? normalizeBytes32(spendIntent.taskId) ?? DEMO.taskId,
      evidenceHash: liveState?.receiptEvidenceHash ?? normalizeBytes32(spendIntent.evidenceHash) ?? DEMO.evidenceHash,
      resultHash: liveState?.receiptResultHash ?? normalizeBytes32(spendIntent.resultHash) ?? DEMO.resultHash,
      metadataURI: liveState?.receiptMetadataURI ?? asString(spendIntent.metadataURI, DEMO.metadataURI),
      timestamp: liveState?.receiptTimestamp ?? null,
      txHash: DEMO.spendTxHash,
      relatedHashes: DEFAULT_QUERYABLE_HASHES.map((entry) => ({ ...entry })),
    },
    proof: {
      qualificationStatus: overallReady
        ? 'Same-network ready'
        : liveMetaMaskProofComplete
          ? 'Mainnet cutover pending'
          : 'Live proof in progress',
      liveProofHighlight:
        overallReady
          ? 'Base mainnet MetaMask deployment, delegation redemption, and receipt-backed spend are aligned for the final judge flow.'
          : liveMetaMaskProofComplete
            ? `${selectedChain.name} MetaMask smart-account deployment, delegation redemption, and receipt-backed treasury spend are live.`
            : 'The constrained MetaMask artifact exists, but the live smart-account execution proof still needs completion.',
      liveProofNote: liveProofBody,
      liveProofTxs: [
        {
          label: 'Smart-account deployment',
          description: 'User operation that deployed the MetaMask smart account.',
          hash: DEMO.deploymentTxHash,
        },
        {
          label: 'Delegation redemption + treasury spend',
          description: 'Receipt-backed treasury spend executed through the authorized smart account.',
          hash: DEMO.spendTxHash,
        },
      ],
      preflight: preflightRecord,
      signedDelegation: signedRecord,
    },
    readiness: {
      metaMaskFinalSameNetworkReady: Boolean(summary.metaMaskFinalSameNetworkReady),
      frontendFinalDemoConfigReady: Boolean(summary.frontendFinalDemoConfigReady),
      cutoverEnvReady: Boolean(summary.cutoverEnvReady),
      overallReadyForSameNetworkDemoSubmission: overallReady,
      honestTracks: trackSummary,
      blockers,
      nextActions,
      currentPosture,
    },
  };

  return snapshot;
}

export async function loadReceiptLookup(query: string): Promise<ReceiptLookupResult> {
  const snapshot = await loadDashboardSnapshot();
  return makeReceiptLookup(snapshot, query);
}

export function formatWstEth(value: string | null): string {
  if (!value) return '0.0';

  try {
    return formatEther(BigInt(value));
  } catch {
    return value;
  }
}
