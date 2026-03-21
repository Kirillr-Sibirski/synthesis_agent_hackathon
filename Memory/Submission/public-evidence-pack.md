# Public Evidence Pack

This file is generated from the latest public-safe repo artifacts so the judge-facing evidence index stays current without hand-edit drift.

No secrets, API keys, or local-only registration files are required to verify anything referenced here.

Generated at: 2026-03-21T19:17:41.823Z

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
- path: `artifacts/metamask/preflight-8453.json`
- selected chain: `Base` (`8453`)
- final target chain: `Base` (`8453`)
- final target chain currently selected: `yes`
- configured `WSTETH_ADDRESS` in current MetaMask env: `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452`
- configured address matches Base mainnet `wstETH`: `yes`
- smart account: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- treasury deployed: `yes`
- smart account deployed: `yes`
- bundler reachable: `yes`
- bundler chain matches selected network: `yes`
- bundler ready for selected-network user operations: `yes`
- ready for final same-network run: `yes`

Honest blocker:
- none; live Base mainnet MetaMask smart-account proof is already recorded in `Memory/Deployments/base-mainnet-metamask-live.md`

## 5. Lido / `wstETH` same-network evidence

Public docs:
- `Memory/ProjectDocs/sponsor-compliance.md`
- `Memory/ProjectDocs/architecture.md`
- `Memory/ProjectDocs/role-separated-live-flow.md`

Latest cutover-env validation artifact:
- path: `artifacts/final/cutover-env-validation.json`
- Base mainnet env ready: `yes`
- real Base mainnet `wstETH` configured: `yes`
- treasury configured: `yes`
- authorizer configured: `yes`
- receipt registry configured: `yes`
- backend roles fully separated: `yes`
- frontend roles fully separated in env: `yes`

Honest blocker:
- none; the live Base mainnet `wstETH` treasury env is configured and validated

## 6. Frontend / Let-the-Agent-Cook evidence

Public frontend docs:
- `apps/web/README.md`
- `Memory/ProjectDocs/demo-flow.md`

Latest frontend validation artifact:
- path: `artifacts/frontend/validation.json`
- frontend same-network demo config ready: `yes`
- Base treasury present: `yes`
- Base receipt registry present: `yes`
- Base authorizer present: `yes`
- receipt hash present: `yes`
- distinct frontend actor addresses: `3`

Honest blocker:
- none; the dashboard config validates against the live Base mainnet proof set

## 7. Latest validation snapshot

Latest generated readiness artifacts:
- final readiness: `artifacts/final/same-network-readiness.json`
- generated cutover env checklist: `artifacts/final/cutover-env-checklist.md`
- generated cutover checklist: `artifacts/final/cutover-checklist.md`

Current validation summary:
- last recorded forge test snapshot: `31/31 passing`
- web app verification: `bun run web:build passing`
- overall ready for same-network demo/submission: `yes`
- current honest tracks: `Agents With Receipts — ERC-8004`, `Best Use of Delegations`, `stETH Agent Treasury`, `Let the Agent Cook`, `Synthesis Open Track`

Current same-network validator blockers:
- none

## 8. Best honest track posture right now

### Strong now
- **Agents With Receipts — ERC-8004**
- **Best Use of Delegations**
- **stETH Agent Treasury**
- **Let the Agent Cook**
- **Synthesis Open Track**

### Credible but still incomplete
- none

## 9. Fastest remaining path to honest 3+ track qualification

- no next actions emitted by the validator

## 10. Final same-network handoff

Current handoff status:
- live run already recorded in `Memory/Deployments/base-mainnet-metamask-live.md`

The latest generated handoff/checklists are here:
- `artifacts/final/cutover-env-checklist.md`
- `artifacts/final/cutover-checklist.md`
