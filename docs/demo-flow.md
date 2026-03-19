# Demo Flow

## Story

A human funds a treasury with principal. The agent can only spend yield, and only within a constrained budget tree. Every spend creates a receipt.

## Base Sepolia demo steps

1. Deploy mock `wstETH`
2. Deploy `YieldTreasury`
3. Deploy `DelegationAuthorizer`
4. Deploy `ReceiptRegistry`
5. Wire the treasury to the authorizer + receipt registry
6. Fund treasury with 100 tokens as principal
7. Mint 20 extra tokens to treasury as simulated yield
8. Create `OPS_BUDGET` with allocation of 10
9. Grant one executor permission to spend to one approved recipient
10. Execute a 3 token spend
11. Show:
   - recipient received tokens
   - treasury still holds principal
   - remaining yield is intact
   - receipt hash exists onchain
   - evidence/result hashes are attached to the receipt
   - delegated rule shape (exact or wildcard) explains why the spend was allowed

## Judge-facing one-liner

"The agent can spend yield, not principal. Different budgets can be delegated separately. Every spend leaves a verifiable receipt."
r

"The agent can spend yield, not principal. Different budgets can be delegated separately. Every spend leaves a verifiable receipt."
