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
- `deployments/` — concrete onchain deployment records
- `submission/` — submission drafts, metadata, agent manifest, execution log
- `integrations/` — sponsor-specific integration workspaces (for example MetaMask)
- `frontend/` — static wallet-connected dashboard for the judge demo flow
- `Memory/` — hackathon notes, competition research, idea development
- `frontend/` — dashboard surface for the final judge demo flow (required by the current operating checklist; still unfinished if missing)
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
- local Foundry test suite passing (`30/30`)
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
- submission draft package created under `submission/`
- Base Sepolia MetaMask smart-account derivation now works in-repo
- MetaMask delegation-preparation artifact generation now works in-repo (`npm run metamask:prepare-delegation-artifact`), including the exact encoded treasury selector and concrete Base Sepolia enforcer addresses
- real signed constrained MetaMask delegation artifact generation now works in-repo (`npm run metamask:create-signed-delegation-artifact`)
- MetaMask live-redemption readiness can now be checked in one step (`npm run metamask:preflight`) for env completeness, treasury code presence, smart-account deployment status, bundler reachability, and exact spend selector details

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

See `submission/public-evidence-pack.md` for the public-safe judge index.

## Notes

- Sensitive submission / personal info is kept in local-only notes and excluded from git.
- Secrets are env-based only; do not commit private keys.
- The repo vendors `forge-std` so the test/deploy environment is reproducible.
ys.
- The repo vendors `forge-std` so the test/deploy environment is reproducible.
