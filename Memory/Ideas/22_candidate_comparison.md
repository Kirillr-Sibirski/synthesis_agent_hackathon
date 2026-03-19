---
tags: [synthesis, ideas, comparison, strategy]
---

# Candidate Comparison

Goal: identify the **single best idea** with the highest expected upside after accounting for:

- sponsor fit
- prize stackability
- visible competition
- technical scope
- differentiation
- how natural ERC-8004 / agent requirements feel

## Candidate A — Delegated Yield Treasury

### Summary
A principal-protected `wstETH` treasury primitive where only yield is spendable, agent authority is constrained through MetaMask delegations, and actions are tied to ERC-8004 receipts.

### Best-fit tracks
- stETH Agent Treasury
- Best Use of Delegations
- Agents With Receipts — ERC-8004
- Synthesis Open Track
- likely Let the Agent Cook
- possible Lido MCP
- possible Uniswap / Bankr overlays

### Visible competition
- stETH Agent Treasury: **6 visible**
- Best Use of Delegations: **6 visible**
- Agents With Receipts: **49 visible**

### What competition looks like
There are already treasury / policy / delegation projects in the field, especially:
- AgentScope
- YieldLock MCP
- Veil
- MetaMask Delegation Agent
- Ottie

So this lane is **competitive but still tractable**.
The low visible counts in the Lido + Delegations tracks matter.

### Differentiation potential
High, if we emphasize one of:
- delegated sub-budgets
- sub-agent delegation tree
- receipt-gated spending
- clear principal/yield separation with better semantics than “wallet with limits”

### Risk
Main risk is blending into existing treasury/policy builds if the design is too generic.

### Verdict
Still extremely strong. Probably the current frontrunner.

---

## Candidate B — Delegated Subagent Budget Tree

### Summary
A treasury where yield-funded budgets are assigned to specialized agents through narrower sub-delegations.

### Best-fit tracks
- Best Use of Delegations
- stETH Agent Treasury
- Agents With Receipts — ERC-8004
- Let the Agent Cook
- Open Track

### Visible competition
Same core counts as Candidate A, but the design space looks less occupied.

### What competition looks like
There are delegation projects, but fewer clearly foreground **sub-delegation as organizational structure**.
This feels more MetaMask-native and more agent-native than a flat single-agent budget.

### Differentiation potential
Very high.
This is probably the strongest novelty move inside the same general lane.

### Risk
Slightly harder to explain and demo than Candidate A.
If the demo is confusing, novelty becomes a liability.

### Verdict
Potentially the **best differentiated** version of Candidate A, but needs extremely crisp product framing.

---

## Candidate C — Private Treasury Policy Compiler

### Summary
Natural language treasury intent gets compiled into private policy reasoning plus enforceable onchain constraints.

### Best-fit tracks
- Private Agents, Trusted Actions
- Best Use of Delegations
- stETH Agent Treasury
- Agents With Receipts — ERC-8004
- Open Track

### Visible competition
No good exact count for Venice overlap from our tracked note, but many broad agent submissions touch privacy/trusted actions.

### What competition looks like
Veil already occupies part of this territory strongly.
That matters.

### Differentiation potential
Moderate to high.
But it risks looking like “AI policy UX” unless the compiled output is very crisp and low-level.

### Risk
Most likely to drift into fuzzy territory.

### Verdict
Interesting, but probably not the best highest-probability winning play.

---

## Candidate D — Filecoin-backed Agent Receipt / Treasury State Layer

### Summary
An agent treasury or agent coordination system whose receipts, state transitions, and policy history are persisted in a Filecoin-essential architecture.

### Best-fit tracks
- Best Use Case with Agentic Storage
- Agents With Receipts — ERC-8004
- Ship Something Real with OpenServ
- Open Track

### Visible competition
We do not have a focused competition note for Filecoin, which itself is informative: it is not the lane we have already been mapping tightly.

### What competition looks like
Likely less crowded than Open / ERC-8004 broadly, but harder to make obviously excellent quickly.

### Differentiation potential
High, if storage is truly core.

### Risk
Biggest risk is that Filecoin becomes decorative rather than essential.
If that happens, both the project and the track fit weaken.

### Verdict
Good alt if we intentionally pivot to infra storage, but worse than the Lido/MetaMask lane for us right now.

---

## Candidate E — Celo + Bankr Autonomous Service Agent

### Summary
A service agent with ERC-8004 identity that runs on Celo, uses Bankr for autonomous execution, and maybe monetizes via onchain payments.

### Best-fit tracks
- Best Agent on Celo
- Best Bankr LLM Gateway Use
- Agents With Receipts — ERC-8004
- Agent Services on Base maybe only partially, depending on architecture
- Open Track

### Visible competition
No exact note here, but this is likely easier to enter and broader in style.

### What competition looks like
There are many broad “autonomous service agent” style submissions already in the public feed.
That makes this feel easier to ship, but also easier to blend in.

### Differentiation potential
Moderate.
Without a really sharp product hook, this risks becoming another general-purpose autonomous agent.

### Risk
Easy to build, harder to stand out.

### Verdict
Best fallback for shipping speed, but not the best shot at winning the most.

---

## Candidate F — Vault Sentinel with Escalating Authority

### Summary
A Lido vault monitor that can unlock tighter delegated actions when market/risk conditions require it.

### Best-fit tracks
- Vault Position Monitor + Alert Agent
- Best Use of Delegations
- Lido MCP
- Agents With Receipts — ERC-8004
- Open Track

### Visible competition
- Vault Position Monitor: **4 visible**
- Best Use of Delegations: **6 visible**
- Lido MCP: **6 visible**

### What competition looks like
This is attractive because the visible competition is low.
But the track itself is smaller and the product is slightly harder to communicate than a treasury primitive.

### Differentiation potential
High.
Risk-conditioned authority is a genuinely interesting primitive.

### Risk
Slightly trickier to prove and demo than treasury spend rules.

### Verdict
Very good dark horse, but not as strong overall as the best treasury-centered concept.

---

# Final ranking

## 1. Delegated Yield Treasury
Best mix of:
- low-competition anchor tracks
- strong sponsor fit
- high stackability
- contract seriousness
- clean demo path

## 2. Delegated Subagent Budget Tree
Possibly more novel than #1, but harder to present cleanly.

## 3. Vault Sentinel with Escalating Authority
Best dark horse if we want to lean into the very low competition Lido monitor lane.

## 4. Private Treasury Policy Compiler
Interesting, but less robust strategically.

## 5. Filecoin-backed Receipt / State Layer
Promising alt-universe project, but not the best immediate play.

## 6. Celo + Bankr Autonomous Service Agent
Fastest fallback, lowest differentiation.

# Best single idea

## **Delegated Yield Treasury with Receipt-Gated Sub-Budgets**

This is the best final synthesis.

It combines the strengths of Candidate A and B while avoiding their weaknesses.

### Core concept
- A human deposits `wstETH` into a treasury contract
- Principal is structurally protected
- Yield becomes the only spendable budget
- Spendable budget is split into **sub-budgets**
- Each sub-budget is controlled through **delegated authority**
- Each spend must produce a **receipt / action record** linked to the agent identity

### Why this is the best shot
- strong fit for Lido
- strong fit for MetaMask
- native fit for ERC-8004
- easy to explain
- feels low-level and serious
- can still grow into MCP / Bankr / Uniswap / monitor overlays

### Core target tracks
- stETH Agent Treasury
- Best Use of Delegations
- Agents With Receipts — ERC-8004
- Synthesis Open Track

### Natural secondary tracks
- Let the Agent Cook
- Lido MCP
- Vault Position Monitor + Alert Agent
- maybe Uniswap or Bankr if we wire them in properly
