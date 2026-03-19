# Build Plan

## MVP

### Contracts
- `YieldTreasury.sol`
- `DelegationAuthorizer.sol`
- `ReceiptRegistry.sol`

### Required behaviors
- deposit asset into treasury
- principal protection
- available yield calculation
- sub-budget creation
- constrained spend from sub-budget
- structured receipt recording

### Current tests passing
- deposit increases principal baseline
- available yield ignores principal
- cannot overspend a budget
- cannot spend without authorization
- cannot spend principal
- successful spend records enriched receipt
- budget can be resized but not below spent amount
- principal baseline can be synced downward by owner
- duplicate receipt hash reverts
- inactive budget cannot spend
- authorization window expiry blocks spend
- wildcard recipient rule works
- wildcard selector rule works
- multiple budgets track independently
- parent budget assignment and parent budget bounds work
- child budgets do not double-count global allocation
- parent direct spend cannot consume child-reserved allocation
- budget manager can create child budget
- non-manager cannot create child budget
- revoked rule blocks spend

### Tests still to add
- fuzzing around budget/yield invariants
- integration-style deploy/setup script validation on Base Sepolia
- deeper multi-level hierarchy semantics
- more caveat-like wildcard combinations
- rule replacement / rotation flows under live state

## Stretch goals
- richer caveat model closer to MetaMask delegations
- sub-agent budget tree semantics
- ERC-8004-linked receipt export / manifests
- MCP-facing adapter
- Uniswap swap adapter
- Bankr-funded execution path
- monitor / alert layer

## Demo path
- run local Foundry tests
- deploy treasury + authorizer + receipt registry to Base Sepolia
- connect to a test asset / mocked yield-bearing asset setup
- deposit principal
- simulate or accrue yield
- configure budget
- authorize one executor
- spend from that budget
- show principal remains untouched
- show receipt emitted
