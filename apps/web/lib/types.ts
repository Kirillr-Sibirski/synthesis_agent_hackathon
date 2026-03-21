export interface DashboardSnapshot {
  generatedAt: string;
  network: {
    chainId: number;
    chainName: string;
    finalChainId: number;
    finalChainName: string;
    finalChainSelected: boolean;
    bundlerReachable: boolean;
    bundlerChainMatches: boolean;
    readyForSelectedNetworkUserOps: boolean;
  };
  treasury: {
    treasuryAddress: string;
    assetAddress: string;
    receiptRegistryAddress: string;
    authorizerAddress: string;
    smartAccountAddress: string;
    treasuryExecutorAddress: string;
    principalBaselineStETH: string | null;
    totalBudgetAllocatedWstETH: string | null;
    availableYieldWstETH: string | null;
    unallocatedYieldWstETH: string | null;
    remainingBudgetWstETH: string | null;
    recipientBalanceWstETH: string | null;
    deploymentTxHash: string | null;
    spendTxHash: string | null;
    receiptRegistryExecutor: string | null;
  };
  budget: {
    label: string;
    budgetId: string;
    manager: string;
    active: boolean | null;
    parentBudgetId: string | null;
    allocationWstETH: string | null;
    spentWstETH: string | null;
    remainingWstETH: string | null;
    taskId: string;
    receiptHash: string;
    evidenceHash: string;
    resultHash: string;
    metadataURI: string;
    selector: string;
  };
  receipt: {
    lookupHash: string;
    found: boolean;
    source: string;
    executor: string;
    recipient: string;
    amountWstETH: string;
    budgetId: string;
    taskId: string;
    evidenceHash: string;
    resultHash: string;
    metadataURI: string;
    timestamp: string | null;
    txHash: string | null;
    relatedHashes: Array<{ label: string; hash: string }>;
  };
  proof: {
    qualificationStatus: string;
    liveProofHighlight: string;
    liveProofNote: string;
    liveProofTxs: Array<{ label: string; description: string; hash: string }>;
    preflight: Record<string, unknown>;
    signedDelegation: Record<string, unknown>;
  };
  readiness: {
    metaMaskFinalSameNetworkReady: boolean;
    frontendFinalDemoConfigReady: boolean;
    cutoverEnvReady: boolean;
    overallReadyForSameNetworkDemoSubmission: boolean;
    honestTracks: Array<{ key: string; label: string; honest: boolean; blocker: string | null }>;
    blockers: string[];
    nextActions: string[];
    currentPosture: string;
  };
}

export interface ReceiptLookupResult {
  found: boolean;
  query: string;
  source: string;
  label: string;
  hash: string;
  executor?: string;
  recipient?: string;
  amountWstETH?: string;
  budgetId?: string;
  taskId?: string;
  evidenceHash?: string;
  resultHash?: string;
  metadataURI?: string;
  timestamp?: string | null;
  txHash?: string | null;
  details: Array<{ label: string; value: string }>;
  relatedHashes: Array<{ label: string; hash: string }>;
}
