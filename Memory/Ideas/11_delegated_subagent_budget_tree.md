# Idea 2 — Delegated Subagent Budget Tree

## One-liner
A treasury primitive where a parent human or operator creates a **tree of sub-delegated agent budgets**, each funded only from stETH yield and each strictly narrower than the parent authority.

## Why it looks strong
This is probably the most MetaMask-native idea in the set. It treats delegations as a first-class coordination primitive rather than a checkbox.

## Core primitive
- Root treasury holds principal in wstETH
- Yield accrues into spendable pool
- Root operator creates sub-budgets for specialized agents:
  - researcher
  - execution agent
  - monitoring agent
  - payment agent
- Each sub-budget is represented by tighter delegated authority
- Sub-delegation chains encode narrowing constraints

## Novelty
The key novelty is **budget hierarchy as delegation topology**.
Not just one agent with limits, but a structured multi-agent authority graph.

## Best target tracks
- Best Use of Delegations
- stETH Agent Treasury
- 🤖 Let the Agent Cook
- Agents With Receipts — ERC-8004
- OpenServ
- Open Track

## Why judges may like it
It shows:
- real contract structure
- meaningful use of sub-delegations
- a very agent-native operational model

## Risk
Slightly more complex to explain than a plain treasury. Needs a very crisp demo.

## Build scope
Medium to medium-high.
