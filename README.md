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
- `Memory/` — hackathon notes, competition research, idea development
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
- local Foundry test suite passing (`23/23`)
- upgraded Base Sepolia deployment completed (`deployments/base-sepolia-v2.md`)
- live Base Sepolia spend + receipt recorded on latest repo-head-aligned deployment
- budget-tree allocation semantics implemented
- manager-controlled child budget creation implemented
- wildcard + revocable delegation rules implemented
- enriched receipt model implemented
- receipts now capture the exact matched authorization rule ID
- dedicated `wstETH`-specific treasury path implemented with exchange-rate-derived yield accounting
- slash/rate-drop safety tested for the `wstETH` path
- submission draft package created under `submission/`

## Deployment target

- initial demo chain: **Base Sepolia**
- later optional expansions: Status Sepolia, Base mainnet, Celo

## Notes

- Sensitive submission / personal info is kept in local-only notes and excluded from git.
- Secrets are env-based only; do not commit private keys.
- The repo vendors `forge-std` so the test/deploy environment is reproducible.
