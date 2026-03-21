# Public Evidence Pack

This file is generated from the latest public-safe repo artifacts so the judge-facing evidence index stays current without hand-edit drift.

No secrets, API keys, or local-only registration files are required to verify anything referenced here.

Generated at: 2026-03-21T13:23:50.508Z

## 1. Public repo

- Repo: `https://github.com/Kirillr-Sibirski/synthesis_agent_hackathon`

## 2. ERC-8004 / Synthesis identity evidence

The project has already completed Synthesis registration and recorded the resulting onchain identity-registration transaction.

- owner / operator address: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- registration tx: `0x2f1effd6a8b1f3375df0d9f8e0e44341c4a5fc7e7e785d09dcdb66ef2849f96b`
- public manifest draft: `submission/agent.json`
- public execution log draft: `submission/agent_log.json`
- judge-discovery mirrors can be refreshed to repo root and `.well-known/` with `npm run submission:refresh-public-agent-artifacts`

Private API credentials and registration state remain local-only in `submission/private-registration.json` and are intentionally excluded from git.

## 3. Live onchain treasury evidence

Latest repo-head-aligned deployment notes:
- `deployments/base-sepolia-v2.md`
- `deployments/base-sepolia-wsteth-role-separated.md`
- final same-network template: `deployments/base-mainnet-cutover-template.md`

Strongest current public proof is still the Base Sepolia live treasury path plus the role-separated `wstETH` deployment scaffolding.

## 4. MetaMask Delegation Framework evidence

Public MetaMask workspace docs:
- `integrations/metamask/README.md`
- `integrations/metamask/STATUS.md`
- `docs/metamask-integration-plan.md`

Latest generated preflight artifact:
- path: `artifacts/metamask/preflight-8453.json`
- selected chain: `Base Sepolia` (`84532`)
- final target chain: `Base` (`8453`)
- final target chain currently selected: `no`
- configured `WSTETH_ADDRESS` in current MetaMask env: `0x623f9f72342a3c2518c880d8372de90eaef200cd`
- configured address matches Base mainnet `wstETH`: `no`
- smart account: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- treasury deployed: `yes`
- smart account deployed: `no`
- bundler reachable: `no`
- bundler chain matches selected network: `no`
- bundler ready for selected-network user operations: `no`
- ready for final same-network run: `no`

Honest blocker:
- live delegation-backed execution still needs bundler-backed smart-account deployment plus redemption proof on the final same-network target

## 5. Lido / `wstETH` same-network evidence

Public docs:
- `docs/sponsor-compliance.md`
- `docs/architecture.md`
- `docs/role-separated-live-flow.md`

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
- `frontend/README.md`
- `docs/demo-flow.md`

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
- generated cutover checklist: `artifacts/final/cutover-checklist.md`

Current validation summary:
- forge tests: `31/31 passing`
- frontend syntax: `node --check frontend/app.js passing`
- overall ready for same-network demo/submission: `no`
- current honest tracks: `Agents With Receipts — ERC-8004`, `Synthesis Open Track`

Current same-network validator blockers:
- Selected chain is not Base mainnet yet; final same-network thesis is still unmet.
- Configured WSTETH_ADDRESS does not match the Base mainnet canonical wstETH address (0x7f39c581f595b53c5cb5bbd8f2c9a0e1b8d9d2b2).
- Bundler is not reachable/usable yet.
- MetaMask smart account still needs onchain deployment via user operation.
- Frontend missing: base.treasuryPresent
- Frontend missing: base.receiptRegistryPresent
- Frontend missing: base.authorizerPresent
- Frontend missing: actors.spendRecipientPresent
- Frontend missing: actors.receiptHashPresent
- Role overlap still present in frontend config: [{"address":"0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948","roles":["budgetManager","demoExecutor","demoRecipient"]}]
- Loaded MetaMask preflight artifact is not yet ready for the final same-network run.
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
- **Synthesis Open Track**

### Credible but still incomplete
- **Best Use of Delegations** — MetaMask smart-account deployment/redemption proof is still missing on the final same-network target.
- **stETH Agent Treasury** — Real Base mainnet wstETH deployment/env path is not fully wired yet.
- **Let the Agent Cook** — Judge-ready frontend demo surface and/or public agent packaging still need final completion.

## 9. Fastest remaining path to honest 3+ track qualification

- Finish the Base mainnet cutover env: chain selection, bundler, mainnet addresses, and distinct role wiring.
- Finish the MetaMask Base mainnet path: mainnet chain selection, bundler, smart-account deployment, delegation redemption, and spend proof.
- Finish the frontend Base mainnet demo config: treasury/authorizer/receipt registry/receipt hash plus distinct demo actors.

## 10. Final same-network handoff

When the real Base mainnet run happens, record it in:
- `deployments/base-mainnet-cutover-template.md`

The latest generated handoff/checklist is here:
- `artifacts/final/cutover-checklist.md`
