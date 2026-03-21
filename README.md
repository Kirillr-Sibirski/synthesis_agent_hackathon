# synthesis_agent_hackathon

Foundry-first build for a Synthesis hackathon project centered on a delegated yield treasury primitive for autonomous agents.

## Current direction

A principal-protected yield treasury where:
- users deposit a yield-bearing asset (planned: `wstETH`)
- only yield becomes spendable
- yield is split into named sub-budgets
- child budgets can be created under parent budgets without double-counting root allocation
- budget managers can create delegated child budgets
- executors act under constrained delegated authority
- every spend emits a structured receipt with evidence and result hashes

## Repo structure

- `src/` — Solidity contracts
- `test/` — Foundry test suite
- `script/` — deployment and demo scripts
- `docs/` — architecture, build plan, track mapping, deployment, demo flow
- `deployments/` — concrete onchain deployment records, including the final Base mainnet cutover template
- `env/` — local-only cutover env templates and final-run scaffolding
- `submission/` — submission drafts, metadata, agent manifest, execution log
- `integrations/` — sponsor-specific integration workspaces (for example MetaMask)
- `frontend/` — static wallet-connected dashboard for the judge demo flow, with optional local `config.json` support and an env-driven cutover helper for final deployment switching
- `Memory/` — hackathon notes, competition research, idea development
- `agent.json` / `agent_log.json` — root-level public-safe mirrors for judge / DevSpot-style discovery
- `.well-known/agent.json` / `.well-known/agent_log.json` — optional discovery mirrors generated from the same public-safe submission sources
- `foundry.toml` — Foundry config

## Current contracts

- `YieldTreasury.sol`
- `WstETHYieldTreasury.sol` — Lido-shaped treasury using real `wstETH` exchange-rate semantics
- `DelegationAuthorizer.sol`
- `ReceiptRegistry.sol`
- `MockERC20.sol` (testing/demo asset)
- `MockWstETH.sol` (rate-based `wstETH` test asset)

## Current status

- Foundry installed and working in this environment
- local Foundry test suite passing (`31/31`)
- upgraded Base Sepolia deployment completed (`deployments/base-sepolia-v2.md`)
- live Base Sepolia spend + receipt recorded on latest repo-head-aligned deployment
- budget-tree allocation semantics implemented
- manager-controlled child budget creation implemented
- wildcard + revocable delegation rules implemented
- enriched receipt model implemented
- receipts now capture the exact matched authorization rule ID
- dedicated `wstETH`-specific treasury path implemented with exchange-rate-derived yield accounting
- slash/rate-drop safety tested for the `wstETH` path
- role-separated `wstETH` live-deployment tooling added (separate manager/executor/recipient path)
- real-asset-compatible `wstETH` setup script added for the final same-network target (`script/SetupLiveWstETHDemo.s.sol`)
- submission draft package created under `submission/`
- Base Sepolia MetaMask smart-account derivation now works in-repo
- MetaMask delegation-preparation artifact generation now works in-repo (`npm run metamask:prepare-delegation-artifact`), including the exact encoded treasury selector and concrete Base Sepolia enforcer addresses
- real signed constrained MetaMask delegation artifact generation now works in-repo (`npm run metamask:create-signed-delegation-artifact`)
- a live MetaMask delegation redemption helper now exists in-repo (`npm run metamask:redeem-signed-delegation -- path/to/signed-delegation.json`), and its dry-run payload path has been exercised successfully with `tsx`
- a one-command MetaMask live-flow orchestrator now exists in-repo (`npm run metamask:run-live-flow`) to assemble/save the artifact, deploy-if-needed, and redeem from the executor path; its dry-run path has been exercised successfully and now writes artifacts under `artifacts/metamask/`
- MetaMask live-redemption readiness can now be checked in one step (`npm run metamask:preflight`) for env completeness, treasury code presence, smart-account deployment status, bundler reachability, exact spend selector details, and final same-network Base mainnet readiness
- final same-network readiness can now be refreshed as an artifact bundle in one pass (`npm run final:refresh-readiness-bundle`)
- that same bundle now also emits a human-readable cutover handoff/checklist (`artifacts/final/cutover-checklist.md`) summarizing honest track posture, blockers, and final-proof gaps from the latest readiness artifacts
- final Base mainnet cutover env validation now explicitly requires four distinct frontend demo actors as well as four distinct backend roles, so the role-separated judge flow cannot be overstated by config defaults

## Deployment target

- current public prototype proofs: **Base Sepolia**
- required final same-network thesis target: **Base mainnet**
- why: ERC-8004 registration lives on Base mainnet, real `wstETH` is available there, and the no-compromise sponsor story now requires the final stack to converge on one network

## Honest track posture

Right now the project is strongest for:
- **Agents With Receipts — ERC-8004**
- **Synthesis Open Track**

And it is materially closer for:
- **Best Use of Delegations** — real MetaMask artifact generation is done; live bundler-backed deployment/redemption proof is still missing on the final same-network target
- **Let the Agent Cook** — needs final manifest/log framing polish plus the required frontend demo surface
- **stETH Agent Treasury** — needs a live deployment using real `wstETH` on the same final network as the rest of the sponsor story

Latest verification snapshot (2026-03-20):
- `forge test` → **31/31 passing**
- `node --check frontend/app.js` → **passing**
- `npm run metamask:preflight` → Base Sepolia selected, treasury deployed, smart account undeployed, bundler not configured/reachable, `readyForFinalSameNetworkRun=false`
- `npm run final:validate-same-network` → `overallReadyForSameNetworkDemoSubmission=false`
- `npm run submission:refresh-public-agent-artifacts` → refreshes root-level and `.well-known/` public-safe mirrors of `submission/agent.json` and `submission/agent_log.json`

See `submission/public-evidence-pack.md` for the public-safe judge index.

## Notes

- Sensitive submission / personal info is kept in local-only notes and excluded from git.
- Secrets are env-based only; do not commit private keys.
- The repo vendors `forge-std` so the test/deploy environment is reproducible.
t private keys.
- The repo vendors `forge-std` so the test/deploy environment is reproducible.
