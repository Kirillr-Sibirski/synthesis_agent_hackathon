# Component Map

## Contracts

### `contracts/src/WstETHYieldTreasury.sol`
Main AAP treasury.

Responsibilities:
- hold `wstETH`
- protect principal
- manage budgets / allowance buckets
- execute `spendFromBudget(...)`
- emit `BudgetSpent`
- register ERC-8004-style receipts in `ReceiptRegistry`

### `contracts/src/DelegationAuthorizer.sol`
Rule engine used by the treasury.

Responsibilities:
- store spend rules
- match executor / budget / recipient / selector / amount / validity window
- return the matched `ruleId`
- support revocation / constrained authority

### `contracts/src/ReceiptRegistry.sol`
Onchain receipt store.

Responsibilities:
- persist receipt records by receipt hash
- store task ID, rule ID, executor, recipient, amount, budget ID, evidence hash, result hash, metadata URI, timestamp
- emit receipt-registration events for indexing and UI surfaces

### `contracts/src/TreasuryOperatorFactory.sol`
Bootstrap helper for operator flows.

Responsibilities:
- deploy treasury + authorizer + receipt registry bundle
- assign initial allowances
- support operator-managed treasury setup

## Frontend

### `frontend/app/page.tsx`
Main judge dashboard shell.

### `frontend/components/dashboard.tsx`
Shows high-level proof state, readiness, and project snapshot.

### `frontend/components/treasury-workspace.tsx`
Interactive treasury workspace.

Responsibilities:
- show managed treasuries and allowances
- open per-agent receipt views
- explicitly surface ERC-8004 receipts for agent actions

### `frontend/lib/dashboard-data.ts`
Loads the preserved proof set from `agent-artifacts/` and live chain data from configured contracts.

### `frontend/app/api/operator-manifest/route.ts`
Exposes the kept contract ABIs/bytecode from `contracts/out/` for the frontend operator flow.

## Skill

### `skill/skills/treasury-operator/SKILL.md`
OpenClaw test skill for an agent operating inside an AAP allowance.

Responsibilities:
- create an agent wallet
- explain the difference between protected principal, top-up headroom, and agent spend cap
- describe the allowed treasury flow honestly

## How they connect

1. The frontend reads live addresses from `frontend/public/config.json` and proof artifacts from `agent-artifacts/`.
2. The frontend API manifest route reads the four kept compiled contract artifacts from `contracts/out/`.
3. The treasury uses `DelegationAuthorizer` and `ReceiptRegistry` onchain.
4. The skill is a usage layer: it prepares an agent wallet and explains how an OpenClaw agent uses AAP without receiving treasury ownership.