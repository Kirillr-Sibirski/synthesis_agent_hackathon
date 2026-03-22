# Cleanup Log

## Goal
Reduce the repository to a judge-friendly submission layout with only these root items:
- `contracts/`
- `frontend/`
- `skill/`
- `agent-artifacts/`
- `README.md`
- `.env.example`

## Major actions taken
- moved the Next.js app from `apps/web/` to `frontend/`
- moved the OpenClaw treasury operator skill from `skills/treasury-operator/` to `skill/skills/treasury-operator/`
- created `agent-artifacts/` as the canonical judge-facing implementation record
- copied deployment notes, submission docs, validation outputs, and public-safe ERC-8004 artifacts into `agent-artifacts/`
- removed old workspace folders (`Memory/`, `tools/`, `submission/`, root manifest mirrors, env helper folders, old app folder)
- removed unused contract prototypes, deployment scripts, and dead tests
- kept only the compiled contract artifacts the cleaned frontend still serves from `contracts/out/`
- added minimal README entry points for `contracts/`, `frontend/`, `skill/`, and `agent-artifacts/`

## Deleted groups and why
- `Memory/` — replaced by preserved judge-facing copies under `agent-artifacts/`
- `tools/` — build-phase tooling, no longer part of the minimal judge path
- `submission/` — preserved canonical public-safe outputs moved into `agent-artifacts/`
- `.well-known/`, root `agent.json`, root `agent_log.json` — preserved inside `agent-artifacts/erc8004/`
- `apps/web/` — replaced by `frontend/`
- `skills/treasury-operator/` — replaced by `skill/skills/treasury-operator/`
- `contracts/script/` — deployment/setup helpers removed from the cleaned submission repo
- removed contract source/tests no longer used by the live frontend or kept test path:
  - `contracts/src/BaseWstETHYieldTreasury.sol`
  - `contracts/src/HackathonBaseWstETHTreasury.sol`
  - `contracts/src/YieldTreasury.sol`
  - `contracts/src/interfaces/IWstETHYieldTreasury.sol`
  - `contracts/test/MetaMaskDelegationIntegration.t.sol`
  - `contracts/test/YieldTreasury.t.sol`
- pruned vendored contract dependencies down to the kept `forge-std` surface needed for tests

## Notes
- `README.md` and `.env.example` were left unchanged in content.
- Historical implementation records remain available under `agent-artifacts/` for judge review.
