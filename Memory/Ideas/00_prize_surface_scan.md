---
tags: [synthesis, ideas, strategy, prizes]
---

# Prize Surface Scan

Goal: optimize for **competition-to-payout ratio** while still building something technically credible and not too huge.

## What looks most attractive

### Highest-value anchors

- **Synthesis Open Track** — 25058.96 USD
- **Private Agents, Trusted Actions (Venice)** — 5750 / 3450 / 2300 USD equivalent in VVV
- **Agents With Receipts — ERC-8004** — 4000 / 3000 / 1004 USD
- **🤖 Let the Agent Cook — No Humans Required** — 4000 / 2500 / 1500 USD
- **Best Agent on Celo** — 3000 / 2000 USD
- **Best Bankr LLM Gateway Use** — 3000 / 1500 / 500 USD
- **Lido MCP** — 3000 / 2000 USD
- **Best Use of Delegations** — 3000 / 1500 / 500 USD
- **Ship Something Real with OpenServ** — 2500 / 1000 / 1000 USD
- **Agentic Finance (Uniswap)** — 2500 / 1500 / 1000 USD
- **stETH Agent Treasury** — 2000 / 1000 USD
- **Best Use of Locus** — 2000 / 500 / 500 USD
- **ERC-8183 Open Build** — 2000 USD
- **Agent Services on Base** — 3 × 1666.67 USD
- **Autonomous Trading Agent** — 3 × 1666.67 USD
- **Vault Position Monitor + Alert Agent** — 1500 USD

## Tracks that look favorable for lower visible competition

Based on current public competition note:

- **Vault Position Monitor + Alert Agent** — 4 visible
- **Best Use of Delegations** — 6 visible
- **Lido MCP** — 6 visible
- **stETH Agent Treasury** — 6 visible

This is the clearest pocket where a technically sharp contract-heavy build can still punch above its weight.

## Tracks that are valuable but crowded

- **Synthesis Open Track** — 49 visible
- **Agents With Receipts — ERC-8004** — 49 visible
- **🤖 Let the Agent Cook** — 29 visible

These should be treated as **overlay prizes**, not the primary target, unless the core project is genuinely autonomous and differentiated.

## Good “stackable” sponsors

These are the ones that combine well in one architecture:

- **Lido** — MCP + Treasury + Vault Monitor
- **MetaMask** — Delegations
- **Protocol Labs / PL_Genesis** — Cook + ERC-8004
- **Uniswap** — any treasury/spending/trading/payment agent
- **Bankr** — autonomous inference + onchain payments
- **Venice** — private policy / private reasoning
- **OpenServ** — multi-agent workflows and x402 services
- **Base / Locus** — service/payment rails
- **Self** — load-bearing human-backed agent identity
- **ENS** — if the product has named wallets / discoverability / messaging
- **Status** — almost free bonus if we deploy and do one gasless tx on testnet

## Tracks that are probably not our best first target

Lower strategic fit unless we intentionally pivot:

- **SuperRare** — better for art-native systems
- **Markee** — distribution / repo audience play, not core product
- **Olas Marketplace** — requires marketplace-specific operational thresholds
- **Octant public goods tracks** — interesting, but a different product category
- **Filecoin Foundation** — better if storage is truly core
- **Arkhai** — promising but more niche and likely requires protocol-specific deep work
- **Zyfai** — interesting yield angle, but lower payout than Lido and less obviously synergistic with the current direction

## Best strategic pattern

The best expected-value move appears to be:

1. Pick a **low-competition contract-heavy anchor**
2. Add **one differentiated auth/permissions primitive**
3. Add a thin but credible **autonomy / receipts / identity layer**
4. Add one easy extra integration like **Status** or **ENS** if it helps

That means the sweet spot is something like:

- **principal-protected treasury / policy vault / delegated authority primitive**
- with enough agent UX to qualify for broader agent tracks
- but without becoming a giant general-purpose platform

## Recommended core target set

Best overall target bundle:

- **stETH Agent Treasury**
- **Best Use of Delegations**
- **Lido MCP** or **Vault Position Monitor**
- **Agents With Receipts — ERC-8004**
- **🤖 Let the Agent Cook** as bonus
- **Synthesis Open Track** as umbrella
- **Status** as cheap extra qualifier

## Key design implication

We should build something that is:

- **low-level enough** to feel sponsor-native
- **contract-centric** rather than just UI/agent wrapper
- **narrow enough** to finish cleanly
- **modular enough** to map onto multiple tracks

That is exactly why the ideas in this folder skew toward:

- treasury primitives
- delegation caveats / sub-delegations
- receipts / attestations
- policy compilers
- MCP as tooling around a contract core
