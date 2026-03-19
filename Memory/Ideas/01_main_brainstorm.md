---
tags: [synthesis, ideas, brainstorm, strategy]
---

# Main Idea Brainstorm

This folder collects ideas optimized for:

- **good payout relative to visible competition**
- **smart-contract-heavy builds**
- **low-level / primitive-style work**
- **enough agent behavior to qualify for agent tracks**
- **not so broad that execution collapses**

## Current recommendation

If we want the best blend of:

- manageable scope
- strong differentiation
- low visible competition
- multi-track upside

then the strongest zone is:

**Lido + Delegations + Receipts**, with a contract primitive at the center.

## Top 10 ideas

### Tier 1 — strongest overall

1. **Yield-Sliced Delegated Treasury**
   - Main angle: stETH treasury primitive + MetaMask delegations
   - Why strong: hits the exact current discussion; sponsor-native; low visible competition
   - File: [[Ideas/10_yield_sliced_delegated_treasury]]

2. **Delegated Subagent Budget Tree**
   - Main angle: treasury allocates yield budgets to sub-agents via sub-delegations
   - Why strong: more novel for MetaMask; still grounded in Lido treasury requirements
   - File: [[Ideas/11_delegated_subagent_budget_tree]]

3. **Private Treasury Policy Compiler**
   - Main angle: human intent -> private policy reasoning -> onchain caveats + treasury rules
   - Why strong: combines Venice + Delegations + Lido cleanly
   - File: [[Ideas/12_private_treasury_policy_compiler]]

4. **Treasury Guard MCP**
   - Main angle: reference MCP server around a principal-protected treasury primitive
   - Why strong: can score in Lido MCP while still being a real primitive, not just an API wrapper
   - File: [[Ideas/13_treasury_guard_mcp]]

### Tier 2 — high potential, slightly more specific

5. **Vault Sentinel with Escalating Authority**
   - Main angle: vault monitor that can only unlock tighter delegated powers when risk thresholds hit
   - File: [[Ideas/14_vault_sentinel_escalating_authority]]

6. **Receipt-Gated Treasury Actions**
   - Main angle: every treasury spend requires a machine-verifiable execution receipt chain
   - File: [[Ideas/15_receipt_gated_treasury_actions]]

7. **ENS-Named Treasury Agents**
   - Main angle: named agent treasuries and delegated operators with better UX and discoverability
   - File: [[Ideas/16_ens_named_treasury_agents]]

### Tier 3 — interesting alt paths

8. **Gasless Treasury Simulator on Status**
   - Main angle: deploy a treasury/policy primitive and exercise it gaslessly on Status
   - File: [[Ideas/17_gasless_treasury_simulator_status]]

9. **Locus-Paid Yield Router**
   - Main angle: yield-only treasury that pays APIs/tools through Locus and x402-style flows
   - File: [[Ideas/18_locus_paid_yield_router]]

10. **OpenServ Treasury Operator Swarm**
   - Main angle: multi-agent treasury operator system with a contract-enforced core
   - File: [[Ideas/19_openserv_treasury_operator_swarm]]

## Best immediate shortlist

If we want to narrow fast, I would shortlist these three:

### A. Yield-Sliced Delegated Treasury
Best balance of:
- low competition
- smart contract seriousness
- directly sponsor-native
- good story for multiple tracks

### B. Delegated Subagent Budget Tree
Best if we want something more original and more obviously “MetaMask delegations”-native.

### C. Treasury Guard MCP
Best if we want a slightly more developer-tool / infra framing while keeping the primitive real.

## Suggested evaluation criteria

For picking one final direction, score each on:

- **Sponsor fit** — does it feel native to the tracks?
- **Novelty** — not just another spending-policy vault
- **Scope control** — can we ship a convincing demo?
- **Low-level substance** — contracts first, not just prompts/UI
- **Prize stackability** — can it credibly touch 4+ tracks?
- **Demoability** — can a judge “get it” in 30 seconds?

## My present take

If I had to choose one right now:

**Build a principal-protected stETH treasury primitive with delegated sub-budgets and receipt-gated agent spending.**

That can be framed as either:
- a treasury primitive first, or
- a delegations primitive first,

but the technical center should be:

- one contract family
- explicit principal / yield separation
- explicit delegated authorities
- explicit spend receipts / evidence
- a minimal agent loop proving it works

That feels both low-level and competitive.
