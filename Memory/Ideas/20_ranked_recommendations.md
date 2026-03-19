---
tags: [synthesis, ideas, ranking]
---

# Ranked Recommendations

## Best expected-value plays

### 1) Yield-Sliced Delegated Treasury
**Best overall**.

Why:
- directly aligned with the tracks we already care about
- low visible competition in key tracks
- very contract-native
- not too broad
- easy to explain in one sentence

Likely track bundle:
- stETH Agent Treasury
- Best Use of Delegations
- Lido MCP
- Agents With Receipts — ERC-8004
- Synthesis Open Track
- Status bonus

---

### 2) Delegated Subagent Budget Tree
**Best novelty-adjusted play**.

Why:
- stronger MetaMask-native story
- better differentiation from “agent wallet with limits” projects
- naturally agentic without becoming fluff

Likely track bundle:
- Best Use of Delegations
- stETH Agent Treasury
- 🤖 Let the Agent Cook
- Agents With Receipts — ERC-8004
- OpenServ / Open Track

---

### 3) Treasury Guard MCP
**Best infra / developer-tool play**.

Why:
- strongest path into Lido MCP
- still preserves the treasury primitive center
- easier to demonstrate with CLI/tool calls

Likely track bundle:
- Lido MCP
- stETH Agent Treasury
- Vault Position Monitor
- Open Track

---

## Lower-confidence but still viable

### 4) Private Treasury Policy Compiler
Good if we want Venice and privacy to be central.

### 5) Receipt-Gated Treasury Actions
Good if we want the cleanest ERC-8004 story.

### 6) Vault Sentinel with Escalating Authority
Interesting but a bit more design complexity.

## Likely best final architecture

If we want to combine the best pieces, the strongest composite idea is probably:

### **Delegated Yield Treasury with Receipt-Gated Sub-Budgets**

That means:
- principal-protected wstETH vault
- yield-only spendable budget
- budget slices / sub-budgets
- delegated authority per slice
- receipts required for spend attribution
- small MCP layer for inspection and dry runs

That could credibly speak to:
- Lido
- MetaMask
- Protocol Labs
- Open Track
- maybe Venice / Status / ENS as extras

## What I would do next

1. Decide whether the lead story is:
   - **treasury primitive first**, or
   - **delegation primitive first**
2. Pick one final architecture
3. Write:
   - contract spec
   - track mapping
   - demo flow
   - MVP vs stretch goals
