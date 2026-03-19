# Submission Draft

## Project name
TBD

Working title:
**Delegated Yield Treasury**

## One-line description
A principal-protected yield treasury for autonomous agents where only yield is spendable, sub-budgets can be delegated hierarchically, and every spend produces a verifiable receipt linked to the exact authorization rule that allowed it.

## Description
Delegated Yield Treasury is a contract primitive for giving autonomous agents a real operating budget without ever giving them access to treasury principal. A human deposits a yield-bearing asset, the treasury tracks principal separately from accrued yield, and only the yield layer can become spendable. That spendable yield can be split into root budgets and manager-controlled child budgets, so a parent operator or agent can allocate narrower sub-budgets to specialized executors without double-counting treasury allocation.

Every spend is permissioned through delegation-style rules with recipient constraints, selector constraints, amount caps, and expiry windows. When a spend occurs, the treasury records a structured receipt containing the task ID, budget ID, evidence hash, result hash, metadata URI, and — critically — the exact delegation `ruleId` that authorized the action. This makes the system auditable, accountable, and much closer to a trust primitive than a normal agent wallet.

The current prototype is written in Solidity, tested with Foundry, and deployed on Base Sepolia with live transaction proofs. It already demonstrates principal protection, budget-tree semantics, constrained delegated execution, and receipt-producing treasury spends. The repo now also contains a dedicated `WstETHYieldTreasury` path that models real `wstETH` semantics correctly by tracking principal in stETH-equivalent units and deriving spendable yield from the changing `stEthPerToken()` exchange rate.

## Problem statement
Autonomous agents are starting to coordinate, transact, and pay for services onchain, but the current financial primitives for doing so are weak. In most agent systems, the operator still faces a bad choice: either give the agent direct wallet control and accept principal risk, or keep the human fully in the loop and give up meaningful autonomy.

That tradeoff blocks real adoption. Teams need a way to fund agents with real operating budgets while preserving hard boundaries around capital, permissions, and accountability. The missing primitive is not "another agent wallet" — it is a treasury architecture where principal is structurally inaccessible, spendable budget is derived from yield, authority can be delegated and narrowed over time, and every action leaves a verifiable execution trail.

Delegated Yield Treasury addresses that problem by separating principal from spendable yield, introducing hierarchical sub-budgets, and attaching machine-readable receipts — including authorization provenance — to every spend.

## Repo URL
`https://github.com/Kirillr-Sibirski/synthesis_agent_hackathon`

## Current deployment proof
See:
- `deployments/base-sepolia-v2.md`

## ERC-8004 / identity proof

The project's Synthesis registration has already been completed and the onchain identity registration transaction has been recorded.

- registration tx: `0x2f1effd6a8b1f3375df0d9f8e0e44341c4a5fc7e7e785d09dcdb66ef2849f96b`
- public-facing agent manifest draft: `submission/agent.json`
- public-facing execution log draft: `submission/agent_log.json`

## Primary target tracks

### 1. stETH Agent Treasury
- UUID: `5e445a077b5248e0974904915f76e1a0`
- Why fit: principal-protected yield treasury is the core primitive.

### 2. Best Use of Delegations
- UUID: `0d69d56a8a084ac5b7dbe0dc1da73e1d`
- Why fit: the project uses constrained, rule-based delegated execution and hierarchical sub-budget control.

### 3. Agents With Receipts — ERC-8004
- UUID: `3bf41be958da497bbb69f1a150c76af9`
- Why fit: receipts are load-bearing, structured, and tied to authorization provenance.

### 4. Synthesis Open Track
- UUID: `fdb76d08812b43f6a5f454744b66f590`
- Why fit: broad umbrella track for the overall primitive.

## Strong secondary targets

### Let the Agent Cook — No Humans Required
- UUID: `10bd47fac07e4f85bda33ba482695b24`
- Why fit: if we finish the agent manifest + execution log packaging and present the build/deploy flow as a more complete autonomous loop.

## Optional later targets

### Lido MCP
- UUID: `ee885a40e4bc4d3991546cec7a4433e2`
- Would require: an MCP layer and more Lido-specific tooling.

### Private Agents, Trusted Actions
- UUID: `ea3b366947c54689bd82ae80bf9f3310`
- Would require: real private reasoning / Venice integration.

### Agentic Finance (Best Uniswap API Integration)
- UUID: `020214c160fc43339dd9833733791e6b`
- Would require: real Uniswap API integration and live swap flow.

## Submission status

Ready now:
- public repo
- onchain Base Sepolia deployment
- live spend tx
- receipt-producing flow
- tested contracts
- architecture docs
- deployment docs
- conversation log draft
- submission metadata draft

Still needed before final publish:
- final project name
- Moltbook post URL
- video URL
- cover image / pictures
- ERC-8004 identity registration
- self-custody transfer step in Synthesis
- final project/team UUIDs from Devfolio API
