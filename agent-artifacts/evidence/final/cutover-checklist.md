# Generated Same-Network Cutover Checklist

Generated at: 2026-03-22T07:22:44.408Z

This file is generated from the latest readiness artifacts so the final Base mainnet cutover can be executed and narrated honestly without re-reading raw JSON.

## Overall status

- overall ready for same-network demo/submission: no
- same network thesis currently satisfied: no
- compromises: `present`
- current honest tracks: `agentsWithReceiptsErc8004`, `bestUseOfDelegations`, `stEthAgentTreasury`, `synthesisOpenTrack`

## Final-chain state snapshot

- selected chain: `Base Sepolia` (`84532`)
- expected final chain: `Base` (`8453`)
- MetaMask smart account deployed: yes
- bundler reachable: no
- frontend Base treasury configured: yes
- frontend Base receipt registry configured: yes
- frontend Base authorizer configured: yes
- frontend role separation ready: yes
- backend role separation ready: no
- frontend role separation ready in env: no
- ERC-8004 registration tx: `0x2f1effd6a8b1f3375df0d9f8e0e44341c4a5fc7e7e785d09dcdb66ef2849f96b`

## Track qualification matrix

- **agentsWithReceiptsErc8004** — currently honest
- **bestUseOfDelegations** — currently honest
- **stEthAgentTreasury** — currently honest
- **letTheAgentCook** — not honest yet; blocker: Historical live proof is recorded, but the current local frontend cutover config is still incomplete for a fresh same-network rerun.
- **synthesisOpenTrack** — currently honest

## MetaMask preflight snapshot

- network: `Base Sepolia` (`84532`)
- final target network: `Base` (`8453`)
- final target chain currently selected: no
- configured `WSTETH_ADDRESS` in current MetaMask env: `0x623f9f72342a3c2518c880d8372de90eaef200cd`
- expected Base mainnet `wstETH`: `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452`
- configured address matches Base mainnet `wstETH`: no
- using expected mainnet `wstETH` on the selected chain: unknown
- smart account: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- executor: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- recipient: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- treasury deployed: yes
- smart account deployed: yes
- bundler reachable: no
- bundler chain matches selected network: no
- bundler ready for selected-network user operations: no
- ready for final same-network run: no
- note: selected chain is not Base mainnet yet, so treat any configured addresses as provisional until the chain is switched and the report is regenerated

## Frontend/demo snapshot

- config validation ready: no
- Base treasury present: yes
- Base asset present: yes
- Base receipt registry present: yes
- Base authorizer present: yes
- Base asset is real mainnet `wstETH`: yes
- budget manager present: yes
- spend recipient present: yes
- demo executor present: yes
- demo recipient present: yes
- receipt hash present: yes
- distinct frontend actor addresses: `3`

## Raw cutover-env snapshot

- ready for Base mainnet cutover env: no
- MetaMask chain set to Base: no
- frontend chain set to Base: no
- RPC configured: no
- bundler configured: no
- executor key configured: no
- real Base mainnet `wstETH` configured: no
- treasury configured: yes
- authorizer configured: yes
- receipt registry configured: no
- backend roles fully separated: no
- frontend roles fully separated in env: no

## Current blockers

- Selected chain is not Base mainnet yet; final same-network thesis is still unmet.
- Configured WSTETH_ADDRESS does not match the Base mainnet canonical wstETH address (0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452).
- Bundler is not reachable/usable yet.
- TREASURY_EXECUTOR_ADDRESS is not set; for the MetaMask path the treasury authorizer must allow the smart-account address as executor.
- Loaded MetaMask preflight artifact is not yet ready for the final same-network run.
- Frontend base treasury does not match the loaded MetaMask preflight treasury.
- Cutover env missing: metaMaskChainIsBase
- Cutover env missing: frontendChainIsBase
- Cutover env missing: rpcConfigured
- Cutover env missing: bundlerConfigured
- Cutover env missing: executorKeyConfigured
- Cutover env missing: wstETHIsBaseMainnet
- Cutover env missing: receiptRegistryConfigured
- Cutover env missing: managerConfigured
- Cutover env missing: executorConfigured
- Cutover env missing: recipientConfigured
- Cutover env missing: frontendTreasuryConfigured
- Cutover env missing: frontendAuthorizerConfigured
- Cutover env missing: frontendReceiptRegistryConfigured
- Cutover env missing: frontendAssetConfigured
- Cutover env missing: frontendAssetIsBaseMainnet
- Cutover env missing: frontendBudgetManagerConfigured
- Cutover env missing: frontendSpendRecipientConfigured
- Cutover env missing: frontendDemoExecutorConfigured
- Cutover env missing: frontendDemoRecipientConfigured
- Cutover env missing: frontendReceiptHashConfigured

## Next actions

- Finish the Base mainnet cutover env: chain selection, bundler, mainnet addresses, and distinct role wiring.
- Finish the MetaMask Base mainnet path: mainnet chain selection, bundler, smart-account deployment, delegation redemption, and spend proof.
- Finish the frontend Base mainnet demo config: treasury/authorizer/receipt registry/receipt hash plus distinct demo actors.

## Final proof collection reminder

The live Base mainnet run is already recorded in:
- `agent-artifacts/deployments/base-mainnet-metamask-live.md`

If we rerun the flow, update:
- final MetaMask/userOp/redemption tx hashes
- final treasury spend tx + receipt hash
- final role-separated frontend config inputs
- any submission media/title/UUID fields still marked pending in `submission/`
