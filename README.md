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
- `Memory/` — hackathon notes, competition research, idea development
- `foundry.toml` — Foundry config

## Current contracts

- `YieldTreasury.sol`
- `DelegationAuthorizer.sol`
- `ReceiptRegistry.sol`
- `MockERC20.sol` (testing/demo asset)

## Current status

- Foundry installed and working in this environment
- local Foundry test suite passing (`23/23`)
- Base Sepolia deployment + initial setup completed
- first live Base Sepolia spend + receipt recorded
- budget-tree allocation semantics implemented
- manager-controlled child budget creation implemented
- wildcard + revocable delegation rules implemented
- enriched receipt model implemented

## Deployment target

- initial demo chain: **Base Sepolia**
- later optional expansions: Status Sepolia, Base mainnet, Celo

## Notes

- Sensitive submission / personal info is kept in local-only notes and excluded from git.
- Secrets are env-based only; do not commit private keys.
- The repo vendors `forge-std` so the test/deploy environment is reproducible.
