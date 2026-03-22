# Contracts

Minimal AAP contract set kept for the submission.

## Entry points

- `src/WstETHYieldTreasury.sol` — principal-protected `wstETH` treasury and budget execution path
- `src/DelegationAuthorizer.sol` — constrained spend-rule registry used by the treasury
- `src/ReceiptRegistry.sol` — ERC-8004-style receipt storage for spend actions
- `src/TreasuryOperatorFactory.sol` — convenience bootstrap / allowance assignment factory for operator flows

## Supporting files

- `src/interfaces/` — interfaces imported by the kept contracts
- `src/mocks/` — mock assets kept only because `test/WstETHYieldTreasury.t.sol` still uses them
- `test/WstETHYieldTreasury.t.sol` — passing coverage for the live treasury path
- `out/` — compiled artifacts consumed by the frontend manifest API

## Current judge story

This folder intentionally excludes deprecated prototype contracts, deployment scripts, and unused delegation-framework vendoring. What remains is only the live submission path plus the single test suite that still validates it.
