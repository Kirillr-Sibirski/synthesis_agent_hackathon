# Base Mainnet Cutover Env Checklist

Generated at: 2026-03-22T07:22:40.154Z

This file is generated from `agent-artifacts/evidence/final/cutover-env-validation.json` so the final Base mainnet run has a human-readable env handoff tied to the same validator used by the readiness bundle.

## Overall status

- ready for Base mainnet cutover env: no
- expected final chain: `Base` (`8453`)
- expected canonical mainnet `wstETH`: `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452`
- source validation artifact: `agent-artifacts/evidence/final/cutover-env-validation.json`

## Missing checks → exact env values to fill

- `metaMaskChainIsBase`
  - METAMASK_CHAIN=base
- `frontendChainIsBase`
  - FRONTEND_CHAIN=base
- `rpcConfigured`
  - RPC_URL=<base-mainnet-rpc>
  - or BASE_MAINNET_RPC_URL=<base-mainnet-rpc>
- `bundlerConfigured`
  - BUNDLER_URL=<base-mainnet-bundler-endpoint>
- `executorKeyConfigured`
  - EXECUTOR_PRIVATE_KEY=<executor-private-key>
- `wstETHIsBaseMainnet`
  - WSTETH_ADDRESS=0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452
- `receiptRegistryConfigured`
  - RECEIPT_REGISTRY_ADDRESS=<base-mainnet-receipt-registry>
- `managerConfigured`
  - MANAGER_ADDRESS=<budget-manager-address>
- `executorConfigured`
  - EXECUTOR_ADDRESS=<executor-address>
- `recipientConfigured`
  - RECIPIENT_ADDRESS=<recipient-address>
- `frontendTreasuryConfigured`
  - FRONTEND_TREASURY_ADDRESS=<base-mainnet-treasury>
- `frontendAuthorizerConfigured`
  - FRONTEND_AUTHORIZER_ADDRESS=<base-mainnet-authorizer>
- `frontendReceiptRegistryConfigured`
  - FRONTEND_RECEIPT_REGISTRY_ADDRESS=<base-mainnet-receipt-registry>
- `frontendAssetConfigured`
  - FRONTEND_ASSET_ADDRESS=0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452
- `frontendAssetIsBaseMainnet`
  - FRONTEND_ASSET_ADDRESS=0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452
- `frontendBudgetManagerConfigured`
  - FRONTEND_BUDGET_MANAGER=<budget-manager-address>
- `frontendSpendRecipientConfigured`
  - FRONTEND_SPEND_RECIPIENT=<spend-recipient-address>
- `frontendDemoExecutorConfigured`
  - FRONTEND_DEMO_EXECUTOR=<executor-address>
- `frontendDemoRecipientConfigured`
  - FRONTEND_DEMO_RECIPIENT=<recipient-address>
- `frontendReceiptHashConfigured`
  - FRONTEND_RECEIPT_HASH=<final-receipt-hash>

## Role-separation snapshot

- backend distinct addresses currently seen: `1`
- backend fully separated: no
- frontend distinct addresses currently seen: `0`
- frontend fully separated: no

## Derived signer addresses

- derived from `PRIVATE_KEY`: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- derived from `EXECUTOR_PRIVATE_KEY`: `missing`

## Address consistency checks

- ownerMatchesPrivateKey: yes
- executorMatchesExecutorKey: unknown
- demoExecutorMatchesExecutorAddress: unknown
- demoRecipientMatchesRecipientAddress: unknown
- frontendBudgetManagerMatchesManagerAddress: unknown
- frontendSpendRecipientMatchesRecipientAddress: unknown
- frontendDemoExecutorMatchesExecutorAddress: unknown
- frontendDemoRecipientMatchesRecipientAddress: unknown

## Validator warnings

- none

## Recommended operator sequence

- Copy `.env.example` into local `.env` and fill every missing item above.
- Re-run:
  - `CUTOVER_ENV_VALIDATION_OUT=agent-artifacts/evidence/final/cutover-env-validation.json bun run final:validate-cutover-env`
- Once the env is green, write the dashboard config locally:
  - `FRONTEND_CHAIN=base bun run frontend:write-config`
- Then refresh the full same-network bundle:
  - `bun run final:refresh-readiness-bundle`
- Only attempt the live Base mainnet MetaMask deployment/redemption path after the cutover env validator, frontend validator, and same-network validator all agree.

