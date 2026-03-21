export const APP_NAME = 'Delegated Yield Treasury';
export const APP_TAGLINE =
  'Judge-ready dashboard for treasury status, budget state, receipt lookup, MetaMask proof, and readiness.';

export const CHAIN_IDS = {
  baseSepolia: 84532,
  base: 8453,
} as const;

export const CHAIN_NAMES = {
  baseSepolia: 'Base Sepolia',
  base: 'Base',
} as const;

export const DEMO = {
  treasury: {
    baseSepolia: '0xB38F8a149F95850cB5efF5fCE5621d36b8F8BBd0',
    baseMainnet: '',
  },
  asset: {
    baseSepolia: '0x623f9f72342a3c2518c880d8372de90eaef200cd',
    baseMainnet: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
  },
  receiptRegistry: {
    baseSepolia: '0xEa7E65954B7A057f739AdC103D3547b9D99aa7f6',
    baseMainnet: '',
  },
  authorizer: {
    baseSepolia: '0x4434F99f7655F94705217601706536Bd94273c2F',
    baseMainnet: '',
  },
  smartAccount: '0x08478FfC43E134ae9390720D41409B06f38fEB7d',
  owner: '0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948',
  budgetManager: '0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948',
  spendRecipient: '0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948',
  demoExecutor: '0x08478FfC43E134ae9390720D41409B06f38fEB7d',
  demoRecipient: '0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948',
  budgetId: '0xb3e0fae8b586325ab4a14d8c2d0ed544d80af3db3bc870137bebb448314c0224',
  taskId: '0xba5a17f3336b16502b047d09824b23157e58c70aa8def0d7feafd248069ac260',
  receiptHash: '0x1cc59ae0671f490688e89a8605546e8f964f2bca7509da1b172a1380642cff2f',
  evidenceHash: '0x9cad6cbd6d8a2868bf8282fdc13b4295d05d32b43e7473dc6ee7c26f415a314e',
  resultHash: '0xdcfc059f5d818dcb17f75ea830c13de5c1dfde08ccb3eccd980656cfb6b3c872',
  delegationHash: '0xf616d4ed127ec6359db5a59de22f0bd7b052f77aef89714e05b24f2581566071',
  deploymentTxHash: '0x198b435a11addf820c393d31d75fca27ffa274fb85098fede06b7c5858f8ce6e',
  spendTxHash: '0x56f401451d9a754b4c855c8e724685cf39590a40c229dbd6485c4cfd1a2c9b78',
  userOperationHash: '0xaf927c0b77b8a62994b92239d23c19215b78a171b2df39edd646d4eacfcad255',
  metadataURI: 'ipfs://metamask-delegation-spend-1',
  amountWstETH: '1000000000000000000',
  totalBudgetAllocatedWstETH: '10000000000000000000',
  remainingBudgetWstETH: '9000000000000000000',
  availableYieldWstETH: '25666666666666666667',
  recipientBalanceWstETH: '1000000000000000000',
  principalBaselineStETH: '100000000000000000000',
  totalBudgetSpentWstETH: '1000000000000000000',
} as const;

export const DEFAULT_QUERYABLE_HASHES = [
  { label: 'Receipt hash', hash: DEMO.receiptHash },
  { label: 'Budget ID', hash: DEMO.budgetId },
  { label: 'Task ID', hash: DEMO.taskId },
  { label: 'Evidence hash', hash: DEMO.evidenceHash },
  { label: 'Result hash', hash: DEMO.resultHash },
  { label: 'Delegation hash', hash: DEMO.delegationHash },
  { label: 'Deployment tx', hash: DEMO.deploymentTxHash },
  { label: 'Spend tx', hash: DEMO.spendTxHash },
  { label: 'User op hash', hash: DEMO.userOperationHash },
] as const;
