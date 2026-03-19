# Idea 1 — Yield-Sliced Delegated Treasury

## One-liner
A **principal-protected wstETH treasury primitive** where yield is periodically sliced into spendable budget buckets controlled by **MetaMask delegations** rather than raw wallet authority.

## Why it looks strong
- Direct hit on **stETH Agent Treasury**
- Clear angle for **Best Use of Delegations**
- Can expose tools via **Lido MCP**
- Can log spending evidence for **ERC-8004**
- Good fit for **Open Track**

## Core primitive
- Human deposits wstETH
- Principal floor is recorded and locked
- Yield delta is computed as surplus over principal floor
- Surplus can be streamed or checkpointed into spendable budget buckets
- Agent can spend only from those buckets
- Spending authority is exercised through delegation caveats, not unrestricted key control

## Novelty
The main twist is that the treasury is not just “yield-only spending.”
It is **yield-only spending with delegated authority slices**:
- research budget
- ops budget
- swap budget
- API budget
- sub-agent budget

Each slice can have:
- recipient policy
- function selector policy
- per-tx cap
- time window
- optional renewal logic

## Best target tracks
- stETH Agent Treasury
- Best Use of Delegations
- Lido MCP
- Agents With Receipts — ERC-8004
- Synthesis Open Track
- Status qualifier

## Why judges may like it
It feels like a real primitive, not just an app. It also answers a very natural question: how do you let agents spend yield safely without exposing principal and without giving them a giant hot wallet.

## Risk
Could look too similar to existing treasury + policy projects unless the **bucketed delegation architecture** is very explicit.

## Build scope
Medium.
