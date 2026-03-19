# Idea 9 — Locus-Paid Yield Router

## One-liner
A yield-only treasury that routes spendable yield into agent-native API and service payments using Locus controls and payment rails.

## Why it looks strong
This gives a coherent path to:
- Lido treasury
- Locus payments
- Agent services / x402 style flows

## Core primitive
- Treasury computes available yield budget
- Agent requests service spend
- Locus policy layer enforces counterparty + amount restrictions
- Payment executes to approved service providers only

## Best target tracks
- Best Use of Locus
- stETH Agent Treasury
- Agent Services on Base
- Open Track

## Novelty
The value is that payments are not generic transfers. They are agent-service-native budget routes.

## Risk
Depends on how available and smooth the Locus integration is. Might introduce sponsor-specific implementation cost.

## Build scope
Medium.
