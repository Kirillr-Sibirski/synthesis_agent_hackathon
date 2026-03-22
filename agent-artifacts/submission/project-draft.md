# Submission Draft

## Project name
**Agent Allowance Protocol**

Short form:
**AAP**

Historical working title:
**Delegated Yield Treasury**

## One-line description
A principal-protected `wstETH` treasury for AI agents where only yield / surplus headroom is spendable, allowances can be split into budgets and sub-budgets, constrained authority is enforced by protocol rules and MetaMask smart-account delegation, and every spend produces a verifiable onchain receipt tied to the exact rule that authorized it.

## Description
Agent Allowance Protocol is a treasury primitive for giving autonomous agents a real operating budget without giving them direct access to treasury principal. A human funds the treasury, the protocol tracks a protected principal floor separately from accrued headroom, and only the yield / surplus layer can become spendable. That spendable layer can be partitioned into root budgets and manager-controlled child budgets, so a parent operator or higher-level agent can allocate narrower sub-budgets to specialized executors without double-counting treasury allocation.

Agents do not get treasury ownership. Instead, they receive constrained authority through explicit spending rules and the MetaMask smart-account delegation path. Those rules can narrow execution by executor, recipient, selector, amount, and validity window. When a spend occurs, the treasury records a structured receipt containing the task ID, budget ID, evidence hash, result hash, metadata URI, and — critically — the exact matched authorization `ruleId`. That makes the system auditable, accountable, and much closer to a financial trust primitive than a normal agent wallet.

The repo already demonstrates:
- principal protection
- yield-only spendable budgeting
- sub-budget / allowance-tree semantics
- constrained delegated execution
- receipt-producing treasury spends
- a dedicated `WstETHYieldTreasury` path for real `wstETH`
- a real MetaMask Delegation Framework integration workspace
- a live Base mainnet treasury + MetaMask proof
- a judge dashboard and public-safe ERC-8004 manifest/log packaging

## Problem statement
Autonomous agents are starting to transact with real economic consequences, but the capital primitives are still crude. In many systems the operator faces a bad choice: either hand the agent a wallet and accept principal risk, or keep the human in the loop for every spend and lose meaningful autonomy.

That tradeoff blocks serious deployment. Teams need a way to fund agents with real operating budgets while preserving hard boundaries around capital, permissions, and accountability. The missing primitive is not just another agent wallet. It is a treasury architecture where principal is structurally protected, spendable capacity is derived from yield / headroom, authority can be delegated and narrowed over time, and every action leaves a verifiable execution trail.

Agent Allowance Protocol addresses that problem by separating principal from spendable headroom, introducing hierarchical budget allowances, and attaching machine-readable receipts — including authorization provenance — to every spend.

## Repo URL
`https://github.com/Kirillr-Sibirski/synthesis_agent_hackathon`

## Current live proof
See:
- `agent-artifacts/deployments/base-mainnet-metamask-live.md`
- `agent-artifacts/submission/public-evidence-pack.md`
- `frontend/README.md`

## ERC-8004 / identity proof

The project’s Synthesis registration has already been completed and the onchain identity registration transaction has been recorded.

- registration tx: `0x2f1effd6a8b1f3375df0d9f8e0e44341c4a5fc7e7e785d09dcdb66ef2849f96b`
- public manifest draft: `agent-artifacts/erc8004/submission-agent.json`
- public execution log draft: `agent-artifacts/erc8004/submission-agent-log.json`
- public-safe judge index: `agent-artifacts/submission/public-evidence-pack.md`

## Strongest target tracks

### 1. Agents With Receipts — ERC-8004
- Why fit: receipts are load-bearing, structured, and tied to exact authorization provenance.

### 2. Best Use of Delegations
- Why fit: the project gives agents constrained authority through allowance-style budgets, rule-based execution restrictions, and a real MetaMask delegation integration with live Base mainnet proof.

### 3. stETH Agent Treasury
- Why fit: a principal-protected `wstETH` treasury is the core capital primitive.

### 4. Synthesis Open Track
- Why fit: the repo is a complete protocol + proof + dashboard package.

## Secondary / careful track

### Let the Agent Cook
- Why it still has merit: the build was materially agent-assisted and agent-led in many phases.
- Why it is secondary: the final shipping loop required human intervention, so this should be framed as honest collaboration rather than fake total autonomy.

## How the agent was used

The repo should describe this honestly:
- the agent helped brainstorm the direction by analyzing the competition and identifying strong reward-to-competition opportunities across tracks
- the agent then helped implement the project end-to-end with human guidance
- there was a heartbeat / ongoing automation loop that kept OpenClaw integrating the repo
- that process got stuck / circled on some issues
- human intervention was needed to unblock the final steps, polish the repo, and ship the final version

## Submission status

Ready now:
- public repo
- final public project name
- live Base mainnet proof
- tested contracts
- architecture docs
- track-fit docs
- public agent manifest draft
- public agent execution log draft
- public-safe evidence pack
- judge dashboard

Still needed before final publish:
- final video URL
- cover image / screenshots / logo
- Moltbook post URL if required
- any final submission metadata polish
- project UUID / final UI details inside the submission form
