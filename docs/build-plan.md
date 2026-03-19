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

### Tests to add next
- deposit increases principal baseline
- available yield ignores principal
- cannot overspend a budget
- cannot spend without authorization
- cannot spend principal
- successful spend records receipt

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
