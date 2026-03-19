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
- deploy mock asset + treasury + authorizer + receipt registry
- deposit principal
- simulate yield by minting / transferring extra tokens into treasury
- configure budget
- authorize one executor
- spend from that budget
- show principal remains untouched
- show receipt emitted
