# Demo Flow

## Story

A human funds a treasury with principal. The agent can only spend yield, and only within a constrained budget tree. Every spend creates a receipt.

## Live Base mainnet demo steps

1. Deploy `WstETHYieldTreasury`
2. Deploy `DelegationAuthorizer`
3. Deploy `ReceiptRegistry`
4. Wire the treasury to the authorizer + receipt registry
5. Fund treasury with real Base mainnet `wstETH`
6. Create `OPS_BUDGET` with live spendable allocation
7. Grant the MetaMask smart account permission to spend to one approved recipient
8. Create and sign the constrained delegation artifact
9. Redeem the delegation through MetaMask `DelegationManager`
10. Execute the treasury spend
11. Show:
   - recipient received tokens
   - treasury still holds principal
   - remaining budget / yield accounting is intact
   - receipt hash exists onchain
   - evidence/result hashes are attached to the receipt
   - delegated rule shape explains why the spend was allowed
   - receipt executor is the MetaMask smart account, not just the submitting EOA

## Historical note

Base Sepolia remains available as the archived rehearsal flow. The current judge-facing path should use the recorded Base mainnet proof and the matching dashboard config.

## Judge-facing one-liner

"The agent can spend yield, not principal. Different budgets can be delegated separately. Every spend leaves a verifiable receipt."
