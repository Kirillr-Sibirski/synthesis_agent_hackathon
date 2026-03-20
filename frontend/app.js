import {
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  getAddress,
  http,
  keccak256,
  parseEther,
  toBytes,
  encodeFunctionData,
} from 'https://esm.sh/viem@2.38.5';
import { base, baseSepolia } from 'https://esm.sh/viem@2.38.5/chains';

const CHAINS = {
  base,
  baseSepolia,
};

const BUILTIN_CONFIG = {
  chains: {
    baseSepolia: {
      rpcUrl: 'https://sepolia.base.org',
      treasury: '0xB38F8a149F95850cB5efF5fCE5621d36b8F8BBd0',
      asset: '0x623f9f72342a3c2518c880d8372de90eaef200cd',
      receiptRegistry: '0xEa7E65954B7A057f739AdC103D3547b9D99aa7f6',
      authorizer: '0x4434F99f7655F94705217601706536Bd94273c2F',
    },
    base: {
      rpcUrl: '',
      treasury: '',
      asset: '0x7f39c581f595b53c5cb5bbd8f2c9a0e1b8d9d2b2',
      receiptRegistry: '',
      authorizer: '',
    },
  },
  actors: {
    budgetManager: '0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948',
    spendRecipient: '0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948',
    demoExecutor: '0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948',
    demoRecipient: '0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948',
    receiptHash: '0x1675e089e66f959833b06b6c503058d4fda53f62715d36d92176427095c95b0b',
  },
};

let dashboardConfig = structuredClone(BUILTIN_CONFIG);

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
    name: 'owner',
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
    name: 'authorizer',
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
    name: 'availableYieldInStETH',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'currentPrincipalFloorWstETH',
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
    name: 'childBudgetReserved',
    stateMutability: 'view',
    inputs: [{ type: 'bytes32' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'directSpendableRemaining',
    stateMutability: 'view',
    inputs: [{ type: 'bytes32' }],
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
  {
    type: 'function',
    name: 'setAuthorizer',
    stateMutability: 'nonpayable',
    inputs: [{ type: 'address' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'setReceiptRegistry',
    stateMutability: 'nonpayable',
    inputs: [{ type: 'address' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'deposit',
    stateMutability: 'nonpayable',
    inputs: [{ type: 'uint256' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'configureBudget',
    stateMutability: 'nonpayable',
    inputs: [
      { type: 'bytes32' },
      { type: 'bytes32' },
      { type: 'address' },
      { type: 'uint128' },
      { type: 'bool' },
      { type: 'string' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'spendFromBudget',
    stateMutability: 'nonpayable',
    inputs: [
      { type: 'bytes32' },
      { type: 'address' },
      { type: 'uint128' },
      { type: 'bytes32' },
      { type: 'bytes32' },
      { type: 'bytes32' },
      { type: 'bytes32' },
      { type: 'string' },
    ],
    outputs: [],
  },
];

const ERC20_ABI = [
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      { type: 'address' },
      { type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    type: 'function',
    name: 'allowance',
    stateMutability: 'view',
    inputs: [
      { type: 'address' },
      { type: 'address' },
    ],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
];

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
];

const els = {};
for (const id of [
  'chainSelect',
  'rpcUrl',
  'treasuryAddress',
  'assetAddress',
  'receiptRegistryAddress',
  'authorizerAddress',
  'walletStatus',
  'expectedChainStatus',
  'sameNetworkStatus',
  'treasurySummary',
  'budgetLabel',
  'budgetId',
  'parentBudgetId',
  'budgetManager',
  'budgetAllocation',
  'budgetActive',
  'budgetInspection',
  'depositAmount',
  'spendAmount',
  'spendRecipient',
  'metadataUri',
  'receiptHash',
  'receiptInspection',
  'demoExecutor',
  'demoRecipient',
  'metamaskPreview',
  'artifactFile',
  'artifactJson',
  'artifactInspection',
  'roleSummary',
  'qualificationSummary',
  'activityLog',
]) {
  els[id] = document.getElementById(id);
}

let state = {
  account: null,
  walletClient: null,
  loadedArtifact: null,
};

function selectedChain() {
  return CHAINS[els.chainSelect.value];
}

function rpcUrl() {
  return els.rpcUrl.value.trim();
}

function publicClient() {
  const url = rpcUrl();
  if (!url) throw new Error('RPC URL is required.');
  return createPublicClient({ chain: selectedChain(), transport: http(url) });
}

function treasuryAddress() {
  return getAddress(els.treasuryAddress.value.trim());
}

function assetAddress() {
  return getAddress(els.assetAddress.value.trim());
}

function receiptRegistryAddress() {
  return getAddress(els.receiptRegistryAddress.value.trim());
}

function requireWallet() {
  if (!state.walletClient || !state.account) {
    throw new Error('Connect wallet first.');
  }
  return state.walletClient;
}

function log(message, detail) {
  const line = `[${new Date().toLocaleTimeString()}] ${message}`;
  const tail = detail ? `\n${typeof detail === 'string' ? detail : JSON.stringify(detail, null, 2)}` : '';
  els.activityLog.textContent = `${line}${tail}\n\n${els.activityLog.textContent}`.trim();
}

function chainPreset(chainKey) {
  return dashboardConfig.chains[chainKey] ?? BUILTIN_CONFIG.chains[chainKey];
}

function applyActorDefaults() {
  const actors = dashboardConfig.actors ?? BUILTIN_CONFIG.actors;
  els.budgetManager.value = actors.budgetManager ?? '';
  els.spendRecipient.value = actors.spendRecipient ?? '';
  els.demoExecutor.value = actors.demoExecutor ?? '';
  els.demoRecipient.value = actors.demoRecipient ?? '';
  els.receiptHash.value = actors.receiptHash ?? '';
}

async function loadDashboardConfig() {
  try {
    const response = await fetch('./config.json', { cache: 'no-store' });
    if (!response.ok) {
      if (response.status !== 404) {
        throw new Error(`config.json returned HTTP ${response.status}`);
      }
      return false;
    }

    const loaded = await response.json();
    dashboardConfig = {
      chains: {
        baseSepolia: {
          ...BUILTIN_CONFIG.chains.baseSepolia,
          ...(loaded.chains?.baseSepolia ?? {}),
        },
        base: {
          ...BUILTIN_CONFIG.chains.base,
          ...(loaded.chains?.base ?? {}),
        },
      },
      actors: {
        ...BUILTIN_CONFIG.actors,
        ...(loaded.actors ?? {}),
      },
    };
    log('Loaded frontend config from config.json.');
    return true;
  } catch (error) {
    log('Failed to load frontend config; using built-in defaults.', error?.message ?? String(error));
    return false;
  }
}

function setPanel(el, data) {
  el.classList.remove('empty');
  el.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
}

function asObject(value) {
  return value && typeof value === 'object' ? value : {};
}

function asAddressOrEmpty(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

function asBytes32OrEmpty(value) {
  return typeof value === 'string' && /^0x[0-9a-fA-F]{64}$/.test(value.trim()) ? value.trim() : '';
}

function summarizeArtifact(rawArtifact) {
  const artifact = asObject(rawArtifact);
  const network = asObject(artifact.network);
  const accounts = asObject(artifact.accounts);
  const spendIntent = asObject(artifact.treasurySpendIntent);
  const fallbackSpendIntent = asObject(artifact.spendIntent);
  const effectiveSpendIntent = Object.keys(spendIntent).length ? spendIntent : fallbackSpendIntent;
  const delegation = asObject(artifact.delegation);
  const delegationMessage = asObject(delegation.message);
  const caveats = Array.isArray(delegationMessage.caveats) ? delegationMessage.caveats : [];
  const deployReceipt = asObject(artifact.deployReceipt);
  const readiness = asObject(artifact.readiness);
  const summary = asObject(artifact.summary);
  const currentState = asObject(artifact.currentState);
  const inputs = asObject(artifact.inputs);

  const artifactKind =
    artifact.redemptions || artifact.redemptionTransactionHash
      ? 'live-flow output'
      : artifact.signature || delegation.signature
        ? 'signed delegation artifact'
        : Object.keys(summary).length && 'overallReadyForSameNetworkDemoSubmission' in summary
          ? 'final readiness report'
          : artifact.readiness || artifact.bundler || artifact.onchain
            ? 'preflight report'
            : Object.keys(inputs).length && (inputs.preflightPath || inputs.frontendValidationPath)
              ? 'final readiness report'
              : 'generic artifact';

  return {
    artifactKind,
    chain: {
      id: network.chainId ?? artifact.chainId ?? currentState.selectedChainId ?? currentState.expectedFinalChainId ?? null,
      name: network.chainName ?? artifact.chainName ?? currentState.selectedChain ?? currentState.expectedFinalChain ?? null,
    },
    treasury: effectiveSpendIntent.treasury ?? artifact.treasury ?? artifact.onchain?.treasuryAddress ?? null,
    smartAccount: accounts.delegatorSmartAccount ?? artifact.smartAccountAddress ?? null,
    owner: accounts.owner ?? null,
    redeemer: accounts.redeemer ?? accounts.executor ?? artifact.redeemer ?? null,
    recipient: accounts.recipient ?? effectiveSpendIntent.recipient ?? null,
    budgetId: effectiveSpendIntent.budgetId ?? null,
    selector: effectiveSpendIntent.selector ?? null,
    metadataURI: effectiveSpendIntent.metadataURI ?? null,
    receiptHash: effectiveSpendIntent.receiptHash ?? null,
    delegationManager: network.delegationManager ?? null,
    caveatCount: caveats.length,
    caveatEnforcers: caveats.map((caveat) => asObject(caveat).enforcer).filter(Boolean),
    smartAccountDeployed:
      artifact.smartAccountDeployed ?? artifact.onchain?.smartAccountDeployed ?? currentState.smartAccountDeployed ?? null,
    deployTransactionHash: deployReceipt.transactionHash ?? null,
    redemptionTransactionHash: artifact.redemptionTransactionHash ?? null,
    qualificationStatus:
      artifact.qualificationStatus
      ?? summary.overallReadyForSameNetworkDemoSubmission
      ?? summary.metaMaskFinalSameNetworkReady
      ?? readiness.readyForLiveRedemption
      ?? null,
    sameNetworkReady:
      readiness.readyForFinalSameNetworkRun
      ?? summary.overallReadyForSameNetworkDemoSubmission
      ?? summary.metaMaskFinalSameNetworkReady
      ?? null,
    remainingBlockers:
      Array.isArray(readiness.remainingBlockers) ? readiness.remainingBlockers
      : Array.isArray(artifact.blockers) ? artifact.blockers
      : [],
    nextSteps:
      Array.isArray(readiness.nextSteps) ? readiness.nextSteps
      : Array.isArray(artifact.nextActions) ? artifact.nextActions
      : [],
  };
}

function buildQualificationSummary() {
  const artifact = asObject(state.loadedArtifact);
  const readiness = asObject(artifact.readiness);
  const finalSummary = asObject(artifact.summary);
  const currentState = asObject(artifact.currentState);
  const chain = selectedChain();
  const remainingBlockers = Array.isArray(readiness.remainingBlockers)
    ? readiness.remainingBlockers
    : Array.isArray(artifact.blockers)
      ? artifact.blockers
      : [];
  const artifactSummary = summarizeArtifact(artifact);

  const summary = {
    chain: {
      id: chain.id,
      name: chain.name,
      sameNetworkTargetSelected: chain.id === base.id,
      artifactSelectedChain: currentState.selectedChain ?? artifactSummary.chain.name ?? null,
      artifactExpectedFinalChain: currentState.expectedFinalChain ?? null,
    },
    currentInputs: {
      treasury: els.treasuryAddress.value.trim() || null,
      asset: els.assetAddress.value.trim() || null,
      authorizer: els.authorizerAddress.value.trim() || null,
      receiptRegistry: els.receiptRegistryAddress.value.trim() || null,
      budgetId: els.budgetId.value.trim() || null,
      executor: els.demoExecutor.value.trim() || null,
      recipient: (els.demoRecipient.value.trim() || els.spendRecipient.value.trim()) || null,
    },
    artifactLoaded: Boolean(state.loadedArtifact),
    artifactKind: artifactSummary.artifactKind,
    readiness: {
      readyForLiveRedemption:
        readiness.readyForLiveRedemption
        ?? finalSummary.metaMaskFinalSameNetworkReady
        ?? null,
      readyForFinalSameNetworkRun:
        readiness.readyForFinalSameNetworkRun
        ?? finalSummary.overallReadyForSameNetworkDemoSubmission
        ?? finalSummary.metaMaskFinalSameNetworkReady
        ?? null,
      smartAccountDeployed:
        artifact.onchain?.smartAccountDeployed
        ?? artifact.smartAccountDeployed
        ?? currentState.smartAccountDeployed
        ?? null,
      bundlerReachable: artifact.bundler?.reachable ?? currentState.bundlerReachable ?? null,
      remainingBlockers,
    },
    honestTrackPosture:
      (readiness.readyForFinalSameNetworkRun === true || finalSummary.overallReadyForSameNetworkDemoSubmission === true)
        ? 'Final same-network sponsor run is selected and reported ready.'
        : chain.id === base.id
          ? 'Base mainnet is selected, but final sponsor proof is still incomplete.'
          : 'Still operating in prototype/testnet mode; not the final same-network thesis.',
    nextJudgeActions: remainingBlockers.length
      ? remainingBlockers
      : Array.isArray(artifact.nextActions) && artifact.nextActions.length
        ? artifact.nextActions
        : [
            'Load treasury state.',
            'Inspect the budget and role-separated summary.',
            'Load a signed-delegation, preflight, or final readiness artifact to connect MetaMask proof to the treasury flow.',
          ],
  };

  setPanel(els.qualificationSummary, summary);
  log('Built qualification summary.', summary);
}

function applyArtifactToForm(rawArtifact) {
  const artifact = asObject(rawArtifact);
  const network = asObject(artifact.network);
  const accounts = asObject(artifact.accounts);
  const spendIntent = asObject(artifact.treasurySpendIntent);
  const fallbackSpendIntent = asObject(artifact.spendIntent);
  const effectiveSpendIntent = Object.keys(spendIntent).length ? spendIntent : fallbackSpendIntent;
  const currentState = asObject(artifact.currentState);

  const artifactChainId = network.chainId ?? currentState.selectedChainId ?? null;
  if (artifactChainId === 8453) {
    els.chainSelect.value = 'base';
  } else if (artifactChainId === 84532) {
    els.chainSelect.value = 'baseSepolia';
  }

  const preset = chainPreset(els.chainSelect.value);
  els.rpcUrl.value = preset.rpcUrl || els.rpcUrl.value;
  els.treasuryAddress.value =
    asAddressOrEmpty(effectiveSpendIntent.treasury ?? artifact.treasury ?? artifact.onchain?.treasuryAddress)
    || els.treasuryAddress.value;
  els.budgetId.value = asBytes32OrEmpty(effectiveSpendIntent.budgetId) || els.budgetId.value;
  els.spendRecipient.value =
    asAddressOrEmpty(accounts.recipient ?? effectiveSpendIntent.recipient)
    || els.spendRecipient.value;
  els.demoRecipient.value =
    asAddressOrEmpty(accounts.recipient ?? effectiveSpendIntent.recipient)
    || els.demoRecipient.value;
  els.demoExecutor.value =
    asAddressOrEmpty(accounts.redeemer ?? accounts.executor)
    || els.demoExecutor.value;
  els.receiptHash.value = asBytes32OrEmpty(effectiveSpendIntent.receiptHash) || els.receiptHash.value;
  els.metadataUri.value =
    typeof effectiveSpendIntent.metadataURI === 'string' && effectiveSpendIntent.metadataURI.trim()
      ? effectiveSpendIntent.metadataURI.trim()
      : els.metadataUri.value;

  if (effectiveSpendIntent.amountWstETH || effectiveSpendIntent.amount) {
    const rawAmount = effectiveSpendIntent.amountWstETH ?? effectiveSpendIntent.amount;
    try {
      els.spendAmount.value = formatEther(BigInt(rawAmount));
    } catch {
      // leave current field value untouched if parsing fails
    }
  }

  updateExpectedChainStatus();
}

function bytes32FromText(text) {
  return keccak256(toBytes(text));
}

function normalizeOptionalBytes32(value) {
  const trimmed = value.trim();
  return trimmed ? trimmed : `0x${'0'.repeat(64)}`;
}

function updateExpectedChainStatus() {
  els.expectedChainStatus.textContent = `${selectedChain().name} (${selectedChain().id})`;
  els.sameNetworkStatus.textContent = els.chainSelect.value === 'base'
    ? 'Same-network target selected'
    : 'Prototype / not final same-network thesis';

  if (els.sameNetworkStatus) {
    els.sameNetworkStatus.classList.remove('ok', 'warn');
    els.sameNetworkStatus.classList.add(els.chainSelect.value === 'base' ? 'ok' : 'warn');
  }
}

function prefillDefaults() {
  const preset = chainPreset(els.chainSelect.value);
  els.rpcUrl.value = preset.rpcUrl;
  els.treasuryAddress.value = preset.treasury;
  els.assetAddress.value = preset.asset;
  els.receiptRegistryAddress.value = preset.receiptRegistry;
  els.authorizerAddress.value = preset.authorizer;
  updateExpectedChainStatus();
  log(`Prefilled ${selectedChain().name} defaults.`);
}

async function connectWallet() {
  if (!window.ethereum) throw new Error('MetaMask / injected wallet not found.');
  const walletClient = createWalletClient({
    chain: selectedChain(),
    transport: custom(window.ethereum),
  });
  const [account] = await walletClient.requestAddresses();
  state.walletClient = walletClient;
  state.account = getAddress(account);
  els.walletStatus.textContent = state.account;
  log('Wallet connected.', { account: state.account, chain: selectedChain().name });
}

async function switchChain() {
  if (!window.ethereum) throw new Error('MetaMask / injected wallet not found.');
  const chain = selectedChain();
  const hexChainId = `0x${chain.id.toString(16)}`;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainId }],
    });
    log(`Switched wallet to ${chain.name}.`);
  } catch (error) {
    if (error?.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: hexChainId,
            chainName: chain.name,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: rpcUrl() ? [rpcUrl()] : chain.rpcUrls.default.http,
            blockExplorerUrls: chain.blockExplorers?.default?.url
              ? [chain.blockExplorers.default.url]
              : [],
          },
        ],
      });
      log(`Added ${chain.name} to wallet.`);
      return;
    }
    throw error;
  }
}

async function loadTreasurySummary() {
  const client = publicClient();
  const treasury = treasuryAddress();
  const asset = assetAddress();

  const [owner, actualAsset, actualAuthorizer, actualReceiptRegistry, principalBaselineStETH, totalBudgetAllocated, availableYieldInWstETH, availableYieldInStETH, currentPrincipalFloorWstETH, unallocatedYieldInWstETH, treasuryAssetBalance] =
    await Promise.all([
      client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'owner' }),
      client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'asset' }),
      client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'authorizer' }),
      client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'receiptRegistry' }),
      client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'principalBaselineStETH' }),
      client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'totalBudgetAllocated' }),
      client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'availableYieldInWstETH' }),
      client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'availableYieldInStETH' }),
      client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'currentPrincipalFloorWstETH' }),
      client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'unallocatedYieldInWstETH' }),
      client.readContract({ address: asset, abi: ERC20_ABI, functionName: 'balanceOf', args: [treasury] }),
    ]);

  const summary = {
    chain: { id: selectedChain().id, name: selectedChain().name },
    treasury,
    owner,
    configuredAddresses: {
      assetInput: asset,
      assetOnTreasury: actualAsset,
      authorizer: actualAuthorizer,
      receiptRegistry: actualReceiptRegistry,
    },
    balances: {
      treasuryAssetBalance: treasuryAssetBalance.toString(),
      treasuryAssetBalanceFormatted: formatEther(treasuryAssetBalance),
      principalBaselineStETH: formatEther(principalBaselineStETH),
      currentPrincipalFloorWstETH: formatEther(currentPrincipalFloorWstETH),
      availableYieldInWstETH: formatEther(availableYieldInWstETH),
      availableYieldInStETH: formatEther(availableYieldInStETH),
      unallocatedYieldInWstETH: formatEther(unallocatedYieldInWstETH),
      totalBudgetAllocated: formatEther(totalBudgetAllocated),
    },
  };

  setPanel(els.treasurySummary, summary);
  log('Loaded treasury summary.', summary);
}

async function deriveBudgetId() {
  const label = els.budgetLabel.value.trim();
  if (!label) throw new Error('Budget label is required.');
  els.budgetId.value = bytes32FromText(label);
  log('Derived budgetId from label.', { label, budgetId: els.budgetId.value });
}

async function inspectBudget() {
  const client = publicClient();
  const treasury = treasuryAddress();
  const budgetId = els.budgetId.value.trim();
  if (!budgetId) throw new Error('Budget ID is required.');

  const [budget, remainingBudget, directSpendableRemaining, childBudgetReserved] = await Promise.all([
    client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'budgets', args: [budgetId] }),
    client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'remainingBudget', args: [budgetId] }),
    client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'directSpendableRemaining', args: [budgetId] }),
    client.readContract({ address: treasury, abi: TREASURY_ABI, functionName: 'childBudgetReserved', args: [budgetId] }),
  ]);

  const view = {
    budgetId,
    allocated: formatEther(budget[0]),
    spent: formatEther(budget[1]),
    active: budget[2],
    parentBudgetId: budget[3],
    manager: budget[4],
    label: budget[5],
    remainingBudget: formatEther(remainingBudget),
    directSpendableRemaining: formatEther(directSpendableRemaining),
    childBudgetReserved: formatEther(childBudgetReserved),
  };

  setPanel(els.budgetInspection, view);
  log('Loaded budget inspection.', view);
}

async function writeContractAction(config, label) {
  const wallet = requireWallet();
  const hash = await wallet.writeContract({
    ...config,
    account: state.account,
    chain: selectedChain(),
  });
  log(`${label} submitted.`, { txHash: hash });
}

async function setAuthorizer() {
  await writeContractAction(
    {
      address: treasuryAddress(),
      abi: TREASURY_ABI,
      functionName: 'setAuthorizer',
      args: [getAddress(els.authorizerAddress.value.trim())],
    },
    'setAuthorizer',
  );
}

async function setReceiptRegistry() {
  await writeContractAction(
    {
      address: treasuryAddress(),
      abi: TREASURY_ABI,
      functionName: 'setReceiptRegistry',
      args: [getAddress(els.receiptRegistryAddress.value.trim())],
    },
    'setReceiptRegistry',
  );
}

async function configureBudget() {
  const budgetId = els.budgetId.value.trim();
  const parentBudgetId = normalizeOptionalBytes32(els.parentBudgetId.value);
  const manager = getAddress(els.budgetManager.value.trim());
  const allocated = parseEther(els.budgetAllocation.value.trim());
  const active = els.budgetActive.value === 'true';
  const label = els.budgetLabel.value.trim();

  await writeContractAction(
    {
      address: treasuryAddress(),
      abi: TREASURY_ABI,
      functionName: 'configureBudget',
      args: [budgetId, parentBudgetId, manager, allocated, active, label],
    },
    'configureBudget',
  );
}

async function approveAsset() {
  const amount = parseEther(els.depositAmount.value.trim());
  await writeContractAction(
    {
      address: assetAddress(),
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [treasuryAddress(), amount],
    },
    'approve asset',
  );
}

async function depositPrincipal() {
  const amount = parseEther(els.depositAmount.value.trim());
  await writeContractAction(
    {
      address: treasuryAddress(),
      abi: TREASURY_ABI,
      functionName: 'deposit',
      args: [amount],
    },
    'deposit principal',
  );
}

function buildSpendPayload() {
  const budgetId = els.budgetId.value.trim();
  const recipient = getAddress(els.spendRecipient.value.trim());
  const amount = parseEther(els.spendAmount.value.trim());
  const metadataURI = els.metadataUri.value.trim();

  const taskId = bytes32FromText(`task:${budgetId}:${metadataURI}:${Date.now()}`);
  const receiptHash = bytes32FromText(`receipt:${budgetId}:${recipient}:${Date.now()}`);
  const evidenceHash = bytes32FromText(`evidence:${metadataURI}`);
  const resultHash = bytes32FromText(`result:${recipient}:${amount.toString()}`);

  return { budgetId, recipient, amount, taskId, receiptHash, evidenceHash, resultHash, metadataURI };
}

async function spendFromBudget() {
  const payload = buildSpendPayload();
  await writeContractAction(
    {
      address: treasuryAddress(),
      abi: TREASURY_ABI,
      functionName: 'spendFromBudget',
      args: [
        payload.budgetId,
        payload.recipient,
        payload.amount,
        payload.taskId,
        payload.receiptHash,
        payload.evidenceHash,
        payload.resultHash,
        payload.metadataURI,
      ],
    },
    'spendFromBudget',
  );
  els.receiptHash.value = payload.receiptHash;
}

async function loadReceipt() {
  const client = publicClient();
  const receiptHash = els.receiptHash.value.trim();
  if (!receiptHash) throw new Error('Receipt hash is required.');

  const receipt = await client.readContract({
    address: receiptRegistryAddress(),
    abi: RECEIPT_REGISTRY_ABI,
    functionName: 'receipts',
    args: [receiptHash],
  });

  const view = {
    receiptHash,
    taskId: receipt[0],
    ruleId: receipt[1],
    executor: receipt[2],
    recipient: receipt[3],
    amount: formatEther(receipt[4]),
    budgetId: receipt[5],
    evidenceHash: receipt[6],
    resultHash: receipt[7],
    metadataURI: receipt[8],
    timestamp: Number(receipt[9]),
    timestampISO: Number(receipt[9]) ? new Date(Number(receipt[9]) * 1000).toISOString() : null,
  };

  setPanel(els.receiptInspection, view);
  log('Loaded receipt.', view);
}

async function buildSpendIntent() {
  const budgetId = els.budgetId.value.trim();
  const recipient = getAddress((els.demoRecipient.value || els.spendRecipient.value).trim());
  const executor = getAddress(els.demoExecutor.value.trim());
  const amount = parseEther(els.spendAmount.value.trim());
  const metadataURI = els.metadataUri.value.trim();
  const taskId = bytes32FromText('metamask-delegation-task-1');
  const receiptHash = bytes32FromText('metamask-delegation-receipt-1');
  const evidenceHash = bytes32FromText('metamask-delegation-evidence-1');
  const resultHash = bytes32FromText('metamask-delegation-result-1');

  const calldata = encodeFunctionData({
    abi: TREASURY_ABI,
    functionName: 'spendFromBudget',
    args: [budgetId, recipient, amount, taskId, receiptHash, evidenceHash, resultHash, metadataURI],
  });

  const preview = {
    chain: { id: selectedChain().id, name: selectedChain().name },
    treasury: treasuryAddress(),
    executor,
    recipient,
    budgetId,
    selector: calldata.slice(0, 10),
    calldata,
    taskId,
    receiptHash,
    evidenceHash,
    resultHash,
    metadataURI,
    note:
      selectedChain().id === 8453
        ? 'This is aligned with the intended same-network Base mainnet story.'
        : 'This is still prototype/testnet mode, not the final same-network story.',
  };

  setPanel(els.metamaskPreview, preview);
  log('Built MetaMask delegation spend intent preview.', preview);
}

async function loadArtifactObject(rawArtifact) {
  state.loadedArtifact = asObject(rawArtifact);
  const summary = summarizeArtifact(rawArtifact);
  applyArtifactToForm(rawArtifact);
  setPanel(els.artifactInspection, summary);
  buildQualificationSummary();
  log('Loaded MetaMask artifact into dashboard.', summary);
}

async function loadArtifactFromJson() {
  const text = els.artifactJson.value.trim();
  if (!text) throw new Error('Paste artifact JSON first.');
  const artifact = JSON.parse(text);
  await loadArtifactObject(artifact);
}

async function loadArtifactFromFile() {
  const file = els.artifactFile.files?.[0];
  if (!file) throw new Error('Choose a JSON file first.');
  const text = await file.text();
  els.artifactJson.value = text;
  const artifact = JSON.parse(text);
  await loadArtifactObject(artifact);
}

async function buildRoleSummary() {
  let owner = null;
  try {
    if (els.treasuryAddress.value.trim() && els.rpcUrl.value.trim()) {
      owner = await publicClient().readContract({
        address: treasuryAddress(),
        abi: TREASURY_ABI,
        functionName: 'owner',
      });
    }
  } catch (error) {
    owner = null;
    log('Owner lookup for role summary failed; continuing with available inputs.', error?.message ?? String(error));
  }

  const manager = els.budgetManager.value.trim() || null;
  const executor = els.demoExecutor.value.trim() || null;
  const recipient = (els.demoRecipient.value.trim() || els.spendRecipient.value.trim()) || null;
  const artifactAccounts = state.loadedArtifact?.accounts ?? {};
  const roles = { owner, manager, executor, recipient };
  const normalized = Object.entries(roles)
    .filter(([, value]) => value)
    .map(([role, value]) => [role, getAddress(value)]);
  const uniqueAddresses = [...new Set(normalized.map(([, value]) => value))];
  const duplicateWarnings = [];

  for (const address of uniqueAddresses) {
    const matchingRoles = normalized.filter(([, value]) => value === address).map(([role]) => role);
    if (matchingRoles.length > 1) {
      duplicateWarnings.push({ address, roles: matchingRoles });
    }
  }

  const summary = {
    chain: {
      id: selectedChain().id,
      name: selectedChain().name,
      sameNetworkReady: selectedChain().id === base.id,
    },
    budgetId: els.budgetId.value.trim() || bytes32FromText(els.budgetLabel.value.trim() || 'OPS_BUDGET'),
    roles,
    distinctRoleAddresses: uniqueAddresses.length,
    fullySeparated:
      Boolean(owner && manager && executor && recipient) && uniqueAddresses.length === 4,
    duplicateWarnings,
    artifactLinked: Boolean(state.loadedArtifact),
    artifactAccounts: state.loadedArtifact
      ? {
          delegatorSmartAccount: artifactAccounts.delegatorSmartAccount ?? null,
          redeemer: artifactAccounts.redeemer ?? artifactAccounts.delegate ?? null,
          recipient: artifactAccounts.recipient ?? null,
        }
      : null,
    demoFlow: [
      'Show target chain and same-network status.',
      'Show treasury owner and budget manager split.',
      'Show executor and recipient roles.',
      'If loaded, show the MetaMask artifact linkage to the executor/redeemer path.',
      'Then demonstrate treasury summary, budget inspection, and receipt/proof flow.',
    ],
    note:
      uniqueAddresses.length === 4
        ? 'Owner / manager / executor / recipient are fully separated in the current dashboard state.'
        : 'Some demo roles still overlap in the current dashboard state.',
  };

  setPanel(els.roleSummary, summary);
  log('Built role-separated demo summary.', summary);
}

async function handle(action) {
  try {
    await action();
  } catch (error) {
    const message = error?.shortMessage || error?.message || String(error);
    log('Action failed.', message);
  }
}

document.getElementById('prefillPrototype').addEventListener('click', () => handle(prefillDefaults));
document.getElementById('connectWallet').addEventListener('click', () => handle(connectWallet));
document.getElementById('switchChain').addEventListener('click', () => handle(switchChain));
document.getElementById('loadTreasurySummary').addEventListener('click', () => handle(loadTreasurySummary));
document.getElementById('deriveBudgetId').addEventListener('click', () => handle(deriveBudgetId));
document.getElementById('inspectBudget').addEventListener('click', () => handle(inspectBudget));
document.getElementById('setAuthorizer').addEventListener('click', () => handle(setAuthorizer));
document.getElementById('setReceiptRegistry').addEventListener('click', () => handle(setReceiptRegistry));
document.getElementById('configureBudget').addEventListener('click', () => handle(configureBudget));
document.getElementById('approveAsset').addEventListener('click', () => handle(approveAsset));
document.getElementById('depositPrincipal').addEventListener('click', () => handle(depositPrincipal));
document.getElementById('spendFromBudget').addEventListener('click', () => handle(spendFromBudget));
document.getElementById('loadReceipt').addEventListener('click', () => handle(loadReceipt));
document.getElementById('buildSpendIntent').addEventListener('click', () => handle(buildSpendIntent));
document.getElementById('loadArtifactFile').addEventListener('click', () => handle(loadArtifactFromFile));
document.getElementById('loadArtifactJson').addEventListener('click', () => handle(loadArtifactFromJson));
document.getElementById('buildRoleSummary').addEventListener('click', () => handle(buildRoleSummary));
document.getElementById('buildQualificationSummary').addEventListener('click', () => handle(buildQualificationSummary));
els.chainSelect.addEventListener('change', () => {
  updateExpectedChainStatus();
  if (!els.rpcUrl.value.trim() || els.chainSelect.value === 'baseSepolia') {
    const preset = chainPreset(els.chainSelect.value);
    els.rpcUrl.value = preset.rpcUrl;
  }
});

async function initDashboard() {
  await loadDashboardConfig();
  prefillDefaults();
  applyActorDefaults();
  updateExpectedChainStatus();
  buildQualificationSummary();
  log('Dashboard ready. Serve frontend/ over HTTP for browser wallet access.');
}

initDashboard().catch((error) => {
  log('Dashboard init failed.', error?.message ?? String(error));
});
