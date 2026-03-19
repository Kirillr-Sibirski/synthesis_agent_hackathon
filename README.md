# synthesis_agent_hackathon

Foundry-first build for a Synthesis hackathon project centered on a delegated yield treasury primitive for autonomous agents.

## Current direction

A principal-protected yield treasury where:
- users deposit a yield-bearing asset (planned: `wstETH`)
- only yield becomes spendable
- yield is split into named sub-budgets
- executors act under constrained delegated authority
- every spend emits a structured receipt

## Repo structure

- `src/` — Solidity contracts
- `docs/` — architecture, build plan, track mapping
- `Memory/` — hackathon notes, competition research, idea development
- `foundry.toml` — Foundry config

## Current contracts

- `YieldTreasury.sol`
- `DelegationAuthorizer.sol`
- `ReceiptRegistry.sol`
- `MockERC20.sol` (testing/demo asset)

## Current status

- Foundry installed
- local Foundry test suite passing (`19/19`)
- Base Sepolia deployment scaffolding ready

## Deployment target

- initial demo chain: **Base Sepolia**
- later optional expansions: Status Sepolia, Base mainnet, Celo

## Notes

- Sensitive submission / personal info is kept in local-only notes and excluded from git.
- Secrets are env-based only; do not commit private keys.
- Initial contract code uses lightweight local interfaces so we can scaffold fast before pulling in heavier dependencies.
- Current environment issue: Foundry is not installed here yet, so deploy/test scripts are scaffolded but not executed from this runtime.
