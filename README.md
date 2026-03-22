# Agent Allowance Protocol

<p align="center">
  <img src="./logo.png" alt="Agent Allowance Protocol logo" width="240" />
</p>

**Agent Allowance Protocol (AAP)** is a principal-protected `wstETH` treasury for AI agents.

Historical working title: **Delegated Yield Treasury**.

The core idea is simple:
- a **human** funds the treasury
- the **principal stays protected**
- only **yield / spendable surplus** becomes usable
- that spend power can be split into **budgets and sub-budgets**
- agents do **not** receive raw treasury ownership
- agents act through **constrained authority** enforced by protocol rules and the MetaMask smart-account delegation path
- every spend creates a **verifiable onchain receipt** tied to the exact rule that authorized it

A useful mental model is:
- human = parent
- treasury = vault
- agent = child / operator
- sub-budget = allowance
- delegation rules = spending guardrails
- receipt = audit trail

That framing is intuitive, but the implementation is serious: this repo is a Solidity + Foundry treasury system for letting agents operate with real bounded spending power instead of uncontrolled wallet access.

## What Agent Allowance Protocol is

Agent Allowance Protocol is a treasury primitive for giving an agent a real operating budget **without** giving it direct control over treasury principal.

The protocol separates capital into two layers:
1. **protected principal**
2. **spendable yield / surplus headroom**

The treasury owner funds the vault with a yield-bearing asset. In the sponsor-native path, that asset is real Base mainnet `wstETH`. The protocol tracks a protected principal floor separately from the value above that floor. Budgets are carved out of the spendable layer, not out of the protected base.

That means an agent can have meaningful operational autonomy while the capital boundary remains enforceable.

## Why this matters

Most agent-finance systems force a bad choice:
- give the agent a wallet and accept principal risk, or
- keep the human in the loop for every spend and lose real autonomy

Agent Allowance Protocol is built to avoid that tradeoff.

It gives agents authority that is:
- budget-constrained
- rule-constrained
- revocable
- auditable
- receipt-producing

## How the treasury works

### 1. Principal protection

The treasury keeps a protected principal baseline.

The dedicated `WstETHYieldTreasury` path is built around real `wstETH` semantics, including Base mainnet constraints. The contract protects the principal floor while exposing only the excess above that floor as spendable headroom.

User-facing rule:
- the principal floor is **not** what the agent gets to spend
- only the yield / surplus layer becomes allocatable

### 2. Yield / surplus becomes spendable headroom

Once the treasury has value above the protected principal floor, that excess becomes spendable headroom.

The repo supports:
- root budgets
- manager-controlled child budgets
- parent / child reservation semantics
- non-double-counted allocation
- budget caps and spend tracking

### 3. Budgets and sub-budgets become allowances

A root budget can represent a broad operating category.
A child budget can narrow that authority for a more specialized agent or workflow.

That is the core allowance structure:
- treasury headroom exists at the protocol level
- budgets partition the spendable layer
- sub-budgets let a parent operator delegate narrower authority without overstating total allocation

## How agents actually get access to funds

Agents do **not** get treasury ownership.

Instead, they get constrained spend authority enforced by the treasury and authorizer stack.

Those rules can narrow execution by:
- budget ID
- executor
- recipient
- function selector
- amount cap
- time window / expiry
- revocation state

So the agent gets permission to perform a specific class of treasury actions, not blanket control over the vault.

## How MetaMask delegation is used

The repo includes a real MetaMask Delegation Framework integration workspace in `tools/metamask/`.

The sponsor-native flow is:
1. derive or deploy a MetaMask smart account / DeleGator
2. authorize that smart-account address in the treasury path
3. prepare a constrained delegation artifact for treasury spending
4. redeem that delegation through the live DelegationManager path
5. execute a treasury spend and record a receipt from that delegated execution

What is already proven in this repo:
- smart-account derivation
- bundler-backed deployment flow
- constrained delegation artifact generation
- signed delegation artifact generation
- redemption helpers
- preflight / readiness tooling
- a **live Base mainnet** MetaMask smart-account redemption that triggered the treasury spend

## How receipts work

Every treasury spend produces a structured receipt.

The receipt model is load-bearing, not decorative. It records:
- `taskId`
- `budgetId`
- `evidenceHash`
- `resultHash`
- `metadataURI`
- and the exact matched authorization `ruleId`

That last field is the trust primitive:
- not just “a spend happened”
- but “this spend happened because this exact rule authorized it”

That is why the project fits the ERC-8004 / Agents With Receipts direction so naturally.

## Live Base mainnet proof

The strongest current public proof in the repo is the live Base mainnet treasury + MetaMask flow recorded here:

- `Memory/Deployments/base-mainnet-metamask-live.md`

That note includes:
- Base mainnet treasury addresses
- real Base mainnet `wstETH`
- smart-account address
- DelegationManager address
- deployment tx hashes
- live delegation redemption tx hash
- receipt hash
- rule ID
- post-spend state snapshot

The fastest public judge index is:
- `Memory/Submission/public-evidence-pack.md`

## Next.js judge dashboard

The judge dashboard lives in:
- `apps/web/`
- `apps/web/README.md`

It is a Next.js App Router app that surfaces:
- treasury status
- budget state
- receipt lookup
- MetaMask proof artifacts
- readiness status

## Sponsor usage at a glance

This repo is intentionally built around the strongest honest sponsor-native path:

- **Lido / stETH Agent Treasury**
  - the treasury is built around real Base mainnet `wstETH`
  - principal stays protected
  - only yield / surplus headroom is allocatable and spendable

- **MetaMask / Best Use of Delegations**
  - agents do not get raw treasury ownership
  - constrained spend authority is enforced through the MetaMask smart-account / delegation path
  - live Base mainnet delegation redemption proof exists in-repo

- **ERC-8004 / Agents With Receipts**
  - every treasury spend creates a structured receipt
  - the receipt records execution evidence and the exact authorization `ruleId`
  - public-safe agent manifest / log packaging is included under `submission/`

**Strongest target tracks:**
- Agents With Receipts — ERC-8004
- Best Use of Delegations
- stETH Agent Treasury
- Synthesis Open Track

## Honest Synthesis track fit

### Strongest tracks

#### 1. Agents With Receipts — ERC-8004
Why it fits:
- receipts are central to the protocol
- receipts contain execution evidence and authorization provenance
- ERC-8004 registration tx is recorded
- public-safe manifest / execution-log packaging exists

Main evidence:
- `contracts/src/ReceiptRegistry.sol`
- `submission/agent.json`
- `submission/agent_log.json`
- `Memory/Submission/public-evidence-pack.md`
- `Memory/Deployments/base-mainnet-metamask-live.md`

#### 2. Best Use of Delegations
Why it fits:
- constrained authority is core to the protocol
- hierarchical budgets behave like allowance / sub-delegation structures
- the repo includes a real MetaMask Delegation Framework integration workspace
- live Base mainnet smart-account redemption proof exists

Main evidence:
- `contracts/src/DelegationAuthorizer.sol`
- `tools/metamask/README.md`
- `tools/metamask/STATUS.md`
- `Memory/ProjectDocs/metamask-integration-plan.md`
- `Memory/Deployments/base-mainnet-metamask-live.md`

#### 3. stETH Agent Treasury
Why it fits:
- the project is literally an agent treasury built around principal protection
- only yield / surplus headroom is spendable
- the repo contains a dedicated `WstETHYieldTreasury` path
- live Base mainnet proof uses real `wstETH`

Main evidence:
- `contracts/src/WstETHYieldTreasury.sol`
- `contracts/test/WstETHYieldTreasury.t.sol`
- `Memory/ProjectDocs/sponsor-compliance.md`
- `Memory/Deployments/base-mainnet-metamask-live.md`

#### 4. Synthesis Open Track
Why it fits:
- the project is a full-stack treasury primitive with contracts, live proof, receipt packaging, and a judge dashboard

### Secondary / careful framing

#### Let the Agent Cook
This repo is **agent-led and heavily agent-assisted**, but it is **not honestly a strict “no humans required” story**.

The stronger truthful framing is:
- the agent substantially contributed to research, implementation, and integration
- the repo includes public agent packaging and a judge dashboard
- but human guidance and final intervention were required to unblock issues and ship the final version

So this is a possible secondary track only if described carefully, not as fake total autonomy.

## How the agent was actually used

This should be presented honestly.

What happened:
- the agent setup used for this project was **OpenClaw** running with **Codex-authenticated model access**, plus an always-on **heartbeat loop** for recurring review and progress checks
- the agent also used an **Obsidian-style Markdown memory system** for persistent notes, working context, decision tracking, and submission-state recall across sessions
- the agent continuously analyzed the project end-to-end against the hackathon and sponsor requirements
- its main role was checking that the implementation really met the target track requirements instead of only sounding aligned on paper
- that analysis helped steer the project toward a credible Lido + Delegations + receipts combination with same-network proof
- the agent also reviewed repo state, evidence, docs, and demo readiness so the public story stayed consistent with the real implementation
- the OpenClaw heartbeat / ongoing automation loop kept validating progress, surfacing gaps, and pushing the work back toward sponsor-complete delivery
- human intervention was still required to make judgment calls, unblock hard issues, and finalize shipping/submission tasks

That is the credible story:
- **agent-led in end-to-end analysis, requirement checking, and implementation validation**
- **human-guided in judgment, unblock decisions, and final shipping**

See:
- `Memory/Submission/conversation-log.md`
- `submission/agent.json`
- `submission/agent_log.json`

## Example: using AAP with a treasury operator agent

This repo now includes a dedicated skill for agents that should operate inside a bounded treasury allowance:

- `skills/treasury-operator/SKILL.md`

The intended pattern is:
1. a human bootstraps the treasury with protected `wstETH` principal
2. the human assigns an agent allowance / budget cap
3. a separate OpenClaw agent loads the `treasury-operator` skill
4. that agent gets its own wallet, reports only the public address, and spends only through the treasury rules
5. each spend is recorded with receipt-linked proof

A simple example deployment is an **autonomous operator agent** that has a small capped budget for narrow tasks such as:
- paying for task-specific onchain actions
- handling bounded operational spend
- acting as a role-specific budget operator without ever controlling treasury principal

A good real-world framing is:
> spin up a separate OpenClaw agent with the `treasury-operator` skill, give it a small allowance, and let it execute one narrow class of treasury-approved actions without ever exposing the treasury private keys.

Important mental model:
- the agent wallet is **not** the treasury
- the budget lives in the treasury
- the agent only gets constrained authority to spend up to its assigned cap

## Repo structure

- `contracts/` — Solidity contracts, tests, and Foundry config
- `apps/web/` — Next.js judge dashboard
- `tools/` — MetaMask, frontend, final readiness, and submission tooling
- `Memory/ProjectDocs/` — architecture, track mapping, sponsor alignment, and demo docs
- `Memory/Deployments/` — live deployment notes and proof artifacts
- `Memory/Submission/` — judge-facing submission drafts and evidence index
- `submission/` — public-safe manifest and structured agent log sources
- `artifacts/` — generated validation and readiness outputs

## Quick commands

```bash
bun run contracts:test
bun run web:build
bun run verify:demo
bun run final:refresh-readiness-bundle
bun run submission:refresh-public-agent-artifacts
bun run submission:render-public-evidence-pack
```

`bun run final:refresh-readiness-bundle` now regenerates the local dashboard config at `apps/web/public/config.json` before frontend validation, so the one-command readiness pass works from the current env instead of assuming that file was already hand-written.

## One-sentence summary

> Agent Allowance Protocol lets a human give an AI agent a real operating budget without giving it the keys to the vault.
