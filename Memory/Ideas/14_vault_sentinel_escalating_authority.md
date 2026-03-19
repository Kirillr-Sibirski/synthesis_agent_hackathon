# Idea 5 — Vault Sentinel with Escalating Authority

## One-liner
A vault monitoring agent that gains access to progressively stronger delegated actions only when onchain risk thresholds are crossed.

## Why it looks strong
Instead of just sending alerts, it demonstrates a more novel connection between **monitoring** and **controlled authority escalation**.

## Core primitive
- Monitor tracks Lido Earn vault conditions
- If conditions worsen, it can:
  - notify humans
  - unlock a narrower emergency delegation
  - rebalance into a safer posture
  - pause some spending paths
- All authority escalations are bounded, time-limited, and logged

## Best target tracks
- Vault Position Monitor + Alert Agent
- Best Use of Delegations
- Lido MCP
- Agents With Receipts — ERC-8004
- Open Track

## Novelty
The interesting primitive is **risk-conditioned authorization**.
That feels more original than “alerting dashboard but with Telegram.”

## Risk
Harder to communicate than a treasury primitive. Also may require more mock/live market logic.

## Build scope
Medium.
