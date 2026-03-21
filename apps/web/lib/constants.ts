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
    baseMainnet: '0xe07402f1B072FB1Cc5651E763D2139c1218016C9',
  },
  asset: {
    baseSepolia: '0x623f9f72342a3c2518c880d8372de90eaef200cd',
    baseMainnet: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
  },
  receiptRegistry: {
    baseSepolia: '0xEa7E65954B7A057f739AdC103D3547b9D99aa7f6',
    baseMainnet: '0xf5741a5d361706CA7cf9348db0fb899e8e7A86Cd',
  },
  authorizer: {
    baseSepolia: '0x4434F99f7655F94705217601706536Bd94273c2F',
    baseMainnet: '0x6367B12cee6105fCe90B4532c513605Fc061bF4D',
  },
  smartAccount: '0x08478FfC43E134ae9390720D41409B06f38fEB7d',
  owner: '0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948',
  budgetManager: '0x9Ce7984513e36786CC111b087BAD4b3E56E35322',
  spendRecipient: '0xC318e7fE96a302250CBaB69c6de2E8f476AB3671',
  demoExecutor: '0x08478FfC43E134ae9390720D41409B06f38fEB7d',
  demoRecipient: '0xC318e7fE96a302250CBaB69c6de2E8f476AB3671',
  budgetId: '0xb3e0fae8b586325ab4a14d8c2d0ed544d80af3db3bc870137bebb448314c0224',
  taskId: '0x950479decd884dc145e75de1402dbb73a7047388630a84fbdaaaad5b531e8be8',
  receiptHash: '0xe724aca208b8d52c3f5e564bd25361b8884887b6537c625a2f53d6d7e20b06ea',
  evidenceHash: '0x704eea78d0ed3f51d6feee5b5a66e5b0f6b97c47543ddfcac8a14a18be6c8c3c',
  resultHash: '0x5c189c3cd5a44b784f690735b4bd4593fb69170c7ab48147c320d01da66f984f',
  delegationHash: '',
  deploymentTxHash: '0xb414d2cf45d02578e2868a6656bf67b2fdc50d3d10de12bbd124fa4dfbec3393',
  spendTxHash: '0xb920f46d259fd8608d08c22fc5e8adfc2c1d10b0ee2168a1c27ee294b9d56504',
  userOperationHash: '',
  metadataURI: 'ipfs://metamask-delegation-spend-base-mainnet-1',
  amountWstETH: '1000000000000',
  totalBudgetAllocatedWstETH: '1500000000000',
  remainingBudgetWstETH: '500000000000',
  availableYieldWstETH: '1000000000000',
  recipientBalanceWstETH: '2000000000000',
  principalBaselineStETH: '0',
  totalBudgetSpentWstETH: '1000000000000',
} as const;

export const DEFAULT_QUERYABLE_HASHES = [
  { label: 'Receipt hash', hash: DEMO.receiptHash },
  { label: 'Budget ID', hash: DEMO.budgetId },
  { label: 'Task ID', hash: DEMO.taskId },
  { label: 'Evidence hash', hash: DEMO.evidenceHash },
  { label: 'Result hash', hash: DEMO.resultHash },
  { label: 'Delegation hash', hash: DEMO.delegationHash },
  { label: 'Treasury deployment tx', hash: DEMO.deploymentTxHash },
  { label: 'Spend tx', hash: DEMO.spendTxHash },
] as const;
