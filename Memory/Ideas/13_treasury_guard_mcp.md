# Idea 4 — Treasury Guard MCP

## One-liner
A reference MCP server for a principal-protected Lido treasury primitive, exposing safe treasury operations, yield introspection, and dry-run policy checks to any agent.

## Why it looks strong
This gives a better shot at **Lido MCP** while staying more contract-real than a generic staking wrapper.

## Core primitive
- Underlying treasury contract separates principal from spendable yield
- MCP tools expose:
  - current principal floor
  - accrued spendable yield
  - allowed recipients / spending windows
  - dry_run spend validation
  - stake / wrap / unwrap / withdraw request flows
  - optional governance read / action support
- Optional monitor tool explains treasury health and runway

## Best target tracks
- Lido MCP
- stETH Agent Treasury
- Vault Position Monitor + Alert Agent
- Agents With Receipts — ERC-8004
- Open Track

## Novelty
Most MCP ideas are tool wrappers. This one is an MCP layer around an actual treasury primitive with strong safety semantics.

## Risk
Need to be careful not to appear weaker than a more complete Lido MCP server unless the treasury angle is very clearly the differentiator.

## Build scope
Medium.
