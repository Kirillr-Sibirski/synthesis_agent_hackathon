# Architecture

## Core idea

A principal-protected yield treasury for autonomous agents:

- users deposit `wstETH` (represented here as a generic ERC20 yield-bearing asset)
- principal is tracked via `principalBaseline`
- only balance above principal is treated as spendable yield
- yield is allocated into named sub-budgets
- executors spend through constrained authorization rules
- each spend creates a structured receipt

## Contracts

### `YieldTreasury`
Main contract.

Responsibilities:
- hold the asset
- track principal baseline
- compute current yield
- configure sub-budgets
- support parent/child budget links
- enforce budget ceilings
- enforce “yield only” spending
- allow owner baseline sync when the accounting model changes
- forward enriched receipt registration

### `DelegationAuthorizer`
Minimal stand-in for delegation policy.

Responsibilities:
- store narrow execution rules
- approve or reject spend attempts based on:
  - executor
  - budget id
  - recipient (exact or wildcard)
  - function selector (exact or wildcard)
  - amount cap
  - time window
- support multiple matching rule shapes for the same executor/budget
- support revocation

This is still a simplified adapter, but it now better resembles caveat-like constrained authority rather than one hardcoded exact-match rule.

### `ReceiptRegistry`
Structured receipt log.

Responsibilities:
- record spend evidence
- index by receipt hash
- emit events for downstream indexing / ERC-8004 linkage

## Planned evolution

Phase 1:
- ship the core primitive
- prove principal protection
- prove budget slicing
- prove constrained execution
- prove receipts

Phase 2:
- integrate real delegation flow / caveat semantics
- add ERC-8004 linking / manifest artifacts
- maybe add MCP adapter or monitor module
- maybe add Uniswap / Bankr adapters

## Pseudocode

```text
user deposits yield-bearing asset
principalBaseline += deposit

if assetBalance > principalBaseline:
    availableYield = assetBalance - principalBaseline
else:
    availableYield = 0

owner allocates availableYield into sub-budgets

executor requests spend(budgetId, recipient, amount, taskId, receiptHash)

check budget is active
check amount <= remaining budget
check delegation policy authorizes executor + recipient + selector + amount + time
check treasury balance after spend would still be >= principalBaseline
transfer asset
record receipt
emit spend event
```
tor + recipient + selector + amount + time
check treasury balance after spend would still be >= principalBaseline
transfer asset
record receipt
emit spend event
```
