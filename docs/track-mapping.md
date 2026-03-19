# Track Mapping

## Primary

### stETH Agent Treasury
- contract primitive
- principal inaccessible to agent
- spendable yield balance
- configurable permissions via sub-budgets and authorization rules

### Best Use of Delegations
- constrained execution rules per executor and budget
- wildcard recipient / selector semantics to mimic caveat-style authority
- rule revocation lifecycle
- delegated budget managers for child-budget creation
- intended evolution toward fuller MetaMask delegation caveats / sub-delegations
- delegated authority is core, not decorative

### Agents With Receipts — ERC-8004
- receipt-first execution model
- machine-readable action evidence
- natural fit for later ERC-8004 identity / manifest linkage

### Synthesis Open Track
- broad umbrella eligibility

## Secondary

### Let the Agent Cook
- structured agent execution with bounded spend authority
- supports full loop when agent orchestration is added

### Lido MCP
- if we later wrap treasury and staking actions as agent-callable tools

## Optional later
- Vault Position Monitor + Alert Agent
- Agentic Finance (Uniswap)
- Best Bankr LLM Gateway Use
