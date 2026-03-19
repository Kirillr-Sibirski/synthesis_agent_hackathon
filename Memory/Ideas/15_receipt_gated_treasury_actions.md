# Idea 6 — Receipt-Gated Treasury Actions

## One-liner
A treasury primitive where every agent spend must be accompanied by a structured execution receipt hash before settlement is finalized or reputation is updated.

## Why it looks strong
This idea strengthens the ERC-8004 angle and makes “agents with receipts” genuinely load-bearing.

## Core primitive
- Agent proposes spend
- Spend passes treasury and delegation checks
- Agent must attach receipt payload:
  - task id
  - reason
  - output hash
  - counterparty
  - budget class
- Contract or companion verifier logs / attests receipt linkage
- Reputation updates can reference the spend receipt

## Best target tracks
- Agents With Receipts — ERC-8004
- stETH Agent Treasury
- Best Use of Delegations
- 🤖 Let the Agent Cook
- Open Track

## Novelty
Makes receipts part of the payment primitive, not post hoc documentation.

## Risk
Could feel too infra-infra unless the demo shows a concrete spend for useful work.

## Build scope
Low to medium.
