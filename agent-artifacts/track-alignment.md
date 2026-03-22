# Track Alignment

## 1. Agents With Receipts — ERC-8004
**Status:** strong

Why it qualifies:
- every successful treasury spend records a receipt onchain
- receipts store `taskId`, `ruleId`, `budgetId`, `executor`, `recipient`, `amount`, `evidenceHash`, `resultHash`, and `metadataURI`
- preserved ERC-8004 manifest / execution-log artifacts live in `erc8004/`
- the frontend now includes per-agent ERC-8004 receipt views

Primary evidence:
- `../contracts/src/ReceiptRegistry.sol`
- `../contracts/src/WstETHYieldTreasury.sol`
- `erc8004/`
- `deployments/base-mainnet-metamask-live.md`

## 2. Best Use of Delegations
**Status:** strong

Why it qualifies:
- spend authority is constrained by executor, budget, recipient, selector, amount, and validity window
- live Base mainnet MetaMask smart-account redemption proof exists
- receipts preserve the exact `ruleId` that authorized each spend

Primary evidence:
- `../contracts/src/DelegationAuthorizer.sol`
- `deployments/base-mainnet-metamask-live.md`
- `evidence/metamask/`

## 3. stETH Agent Treasury
**Status:** strong

Why it qualifies:
- the treasury holds real Base mainnet `wstETH`
- principal stays protected
- only spendable headroom is allocated into budgets / allowances
- the frontend and recorded proof stay on the same network as the contracts

Primary evidence:
- `../contracts/src/WstETHYieldTreasury.sol`
- `deployments/base-mainnet-metamask-live.md`
- `../frontend/public/config.json`

## 4. Synthesis Open Track
**Status:** strong

Why it qualifies:
- full stack system: contracts + frontend + agent skill + preserved evidence pack
- live proof and judge-facing dashboard are both included

## Secondary / careful
### Let the Agent Cook
**Status:** secondary only

Why it is only secondary:
- the implementation was agent-led but not fully no-human
- final shipping and submission steps still required human intervention