# Public Evidence Pack

This file is generated from the latest public-safe repo artifacts so the judge-facing evidence index stays current without hand-edit drift.

No secrets, API keys, or local-only registration files are required to verify anything referenced here.

Generated at: 2026-03-21T23:25:19.622Z

## 1. Public repo

- Repo: `https://github.com/Kirillr-Sibirski/synthesis_agent_hackathon`

## 2. ERC-8004 / Synthesis identity evidence

The project has already completed Synthesis registration and recorded the resulting onchain identity-registration transaction.

- owner / operator address: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- registration tx: `0x2f1effd6a8b1f3375df0d9f8e0e44341c4a5fc7e7e785d09dcdb66ef2849f96b`
- public manifest draft: `submission/agent.json`
- public execution log draft: `submission/agent_log.json`
- judge-discovery mirrors can be refreshed to repo root and `.well-known/` with `bun run submission:refresh-public-agent-artifacts`

Private API credentials and registration state remain local-only in `submission/private-registration.json` and are intentionally excluded from git.

## 3. Live onchain treasury evidence

Latest repo-head-aligned deployment notes:
- `Memory/Deployments/base-mainnet-metamask-live.md`
- final same-network template: `Memory/Deployments/base-mainnet-cutover-template.md`
- earlier Sepolia archive proof: `Memory/Deployments/base-sepolia-metamask-live.md`

Strongest current public proof is now the live Base mainnet treasury + MetaMask flow recorded in `Memory/Deployments/base-mainnet-metamask-live.md`.

## 4. MetaMask Delegation Framework evidence

Public MetaMask workspace docs:
- `tools/metamask/README.md`
- `tools/metamask/STATUS.md`
- `Memory/ProjectDocs/metamask-integration-plan.md`

Latest generated preflight artifact:
- path: `artifacts/metamask/preflight-84532.json`
- selected chain: `Base Sepolia` (`84532`)
- final target chain: `Base` (`8453`)
- final target chain currently selected: `no`
- configured `WSTETH_ADDRESS` in current MetaMask env: `0x623f9f72342a3c2518c880d8372de90eaef200cd`
- configured address matches Base mainnet `wstETH`: `no`
- smart account: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- treasury deployed: `yes`
- smart account deployed: `yes`
- bundler reachable: `no`
- bundler chain matches selected network: `no`
- bundler ready for selected-network user operations: `no`
- ready for final same-network run: `no`

Honest blocker:
- live Base Sepolia delegation-backed execution is now proven; the remaining MetaMask upgrade is reproducing that proof on the final same-network Base mainnet target

## 5. Lido / `wstETH` same-network evidence

Public docs:
- `Memory/ProjectDocs/sponsor-compliance.md`
- `Memory/ProjectDocs/architecture.md`
- `Memory/ProjectDocs/role-separated-live-flow.md`

Latest cutover-env validation artifact:
- path: `artifacts/final/cutover-env-validation.json`
- Base mainnet env ready: `no`
- real Base mainnet `wstETH` configured: `no`
- treasury configured: `yes`
- authorizer configured: `yes`
- receipt registry configured: `no`
- backend roles fully separated: `no`
- frontend roles fully separated in env: `no`

Honest blocker:
- a real Base mainnet `wstETH` treasury deployment/env cutover still needs final live addresses, final role wiring, and proof collection

## 6. Frontend / Let-the-Agent-Cook evidence

Public frontend docs:
- `apps/web/README.md`
- `Memory/ProjectDocs/demo-flow.md`

Latest frontend validation artifact:
- path: `artifacts/frontend/validation.json`
- frontend same-network demo config ready: `no`
- Base treasury present: `no`
- Base receipt registry present: `no`
- Base authorizer present: `no`
- receipt hash present: `no`
- distinct frontend actor addresses: `1`

Honest blocker:
- the dashboard is real and judge-usable, but the final Base mainnet cutover config is still incomplete and still overlaps roles in the current local validation state

## 7. Latest validation snapshot

Latest generated readiness artifacts:
- final readiness: `artifacts/final/same-network-readiness.json`
- generated cutover env checklist: `artifacts/final/cutover-env-checklist.md`
- generated cutover checklist: `artifacts/final/cutover-checklist.md`

Current validation summary:
- last recorded forge test snapshot: `31/31 passing`
- web app verification: `bun run web:build passing`
- overall ready for same-network demo/submission: `no`
- current honest tracks: `Agents With Receipts — ERC-8004`, `Best Use of Delegations`, `stETH Agent Treasury`, `Synthesis Open Track`

Current same-network validator blockers:
- Selected chain is not Base mainnet yet; final same-network thesis is still unmet.
- Configured WSTETH_ADDRESS does not match the Base mainnet canonical wstETH address (0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452).
- Bundler is not reachable/usable yet.
- TREASURY_EXECUTOR_ADDRESS is not set; for the MetaMask path the treasury authorizer must allow the smart-account address as executor.
- Frontend missing: base.treasuryPresent
- Frontend missing: base.receiptRegistryPresent
- Frontend missing: base.authorizerPresent
- Frontend missing: actors.spendRecipientPresent
- Frontend missing: actors.receiptHashPresent
- Role overlap still present in frontend config: [{"address":"0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948","roles":["budgetManager","demoExecutor","demoRecipient"]}]
- Loaded MetaMask preflight artifact is not yet ready for the final same-network run.
- Frontend demoExecutor does not match the loaded MetaMask preflight treasury executor / smart-account caller.
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

## 8. Best honest track posture right now

### Strong now
- **Agents With Receipts — ERC-8004**
- **Best Use of Delegations**
- **stETH Agent Treasury**
- **Synthesis Open Track**

### Credible but still incomplete
- **Let the Agent Cook** — Historical live proof is recorded, but the current local frontend cutover config is still incomplete for a fresh same-network rerun.

## 9. Fastest remaining path to honest 3+ track qualification

- Finish the Base mainnet cutover env: chain selection, bundler, mainnet addresses, and distinct role wiring.
- Finish the MetaMask Base mainnet path: mainnet chain selection, bundler, smart-account deployment, delegation redemption, and spend proof.
- Finish the frontend Base mainnet demo config: treasury/authorizer/receipt registry/receipt hash plus distinct demo actors.

## 10. Final same-network handoff

Current handoff status:
- `Memory/Deployments/base-mainnet-cutover-template.md`

The latest generated handoff/checklists are here:
- `artifacts/final/cutover-env-checklist.md`
- `artifacts/final/cutover-checklist.md`
