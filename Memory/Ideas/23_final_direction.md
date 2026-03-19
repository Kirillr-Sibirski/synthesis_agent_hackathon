---
tags: [synthesis, decision, final]
---

# Final Direction

## Chosen idea

## **Delegated Yield Treasury with Receipt-Gated Sub-Budgets**

### One-sentence description
A principal-protected `wstETH` treasury primitive for autonomous agents where only yield is spendable, spendable yield is split into constrained sub-budgets, authority is exercised through MetaMask delegations, and each spend produces verifiable ERC-8004-linked receipts.

## Why we picked it

This idea gives the best overall combination of:
- high-value sponsor overlap
- relatively low visible competition in the anchor tracks
- strong hackathon-native fit
- low-level smart contract substance
- a coherent architecture rather than a stitched-together feature pile

## The architecture center

### Contract core
- treasury vault holds `wstETH`
- principal baseline is recorded and protected
- only yield delta can become spendable
- spendable budget can be sliced into named sub-budgets

### Authority core
- execution permissions are constrained using MetaMask delegations / caveats
- sub-budgets can be assigned to different agent roles or purposes
- permissions can include recipient caps, amount caps, time windows, and function restrictions

### Trust / evidence core
- each spend emits structured receipt data
- receipt can be hashed / linked to an ERC-8004-compatible record
- identity and proof-of-action become part of the system, not post-hoc decoration

## Why it beats the alternatives

### Better than a generic treasury
Because the delegation and budget-slicing model makes it more distinct and more MetaMask-native.

### Better than a pure delegation demo
Because Lido gives it a real economic primitive and a more serious constraint model.

### Better than a broad autonomous service agent
Because it is lower-level, more sponsor-native, and easier to judge as a primitive.

### Better than a Filecoin pivot
Because it is more directly aligned with the low-competition tracks we already mapped.

## Main tracks to optimize for

### Primary targets
- **stETH Agent Treasury**
- **Best Use of Delegations**
- **Agents With Receipts — ERC-8004**
- **Synthesis Open Track**

### Secondary targets
- **🤖 Let the Agent Cook — No Humans Required**
- **Lido MCP**

### Optional overlays if they fit naturally
- **Vault Position Monitor + Alert Agent**
- **Agentic Finance (Uniswap)**
- **Best Bankr LLM Gateway Use**
- **Go Gasless: Status Network**

## Competition read

### Good news
- stETH Agent Treasury visible field is still low
- Best Use of Delegations visible field is still low
- the combo of both is narrower than either broad field alone

### Real risk
There are already serious entries in adjacent territory:
- AgentScope
- YieldLock MCP
- Veil
- Ottie
- MetaMask Delegation Agent

So the build must not be generic.

## Required differentiators

At least two of these should be strong in the final design:
- sub-budget model
- sub-agent delegation tree
- receipt-gated spending
- very clean principal/yield accounting semantics
- excellent demo flow with obvious safety boundary

## The practical interpretation

We should build a system that judges can understand in 20 seconds:

> "Humans lock principal in wstETH. Agents can only spend yield. Different agent roles get different sub-budgets via MetaMask delegations. Every spend leaves a verifiable receipt tied to agent identity."

That is simple, sharp, and sponsor-native.

## Next step

Turn this into:
1. architecture spec
2. requirement mapping
3. MVP scope
4. registration/submission scaffolding for Synthesis
