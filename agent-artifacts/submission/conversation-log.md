# Human–Agent Collaboration Log

This is a curated build log for the Synthesis submission. It summarizes how the project was shaped, built, iterated, and polished.

## Final public name

- **Agent Allowance Protocol**
- short form: **AAP**

Historical working title:
- **Delegated Yield Treasury**

## Phase 1 — Track research and strategic positioning

The agent began by analyzing the Synthesis prize surface, visible competition, and likely reward-to-competition ratios.

That work narrowed the strongest opportunity area to a combination of:
- Lido / `wstETH`
- MetaMask delegations / constrained authority
- receipts / ERC-8004-style accountability

Several weaker directions were deprioritized as primary anchors.

## Phase 2 — Project direction selection

Multiple candidate ideas were compared, including:
- delegated yield treasury
- delegated subagent budget tree
- private treasury policy compiler
- vault sentinel / escalating-authority monitoring
- other sponsor-specific variants

The final direction chosen was the treasury-and-allowance design that became **Agent Allowance Protocol**.

## Phase 3 — Architecture design

The project architecture crystallized around three main pieces:
- `YieldTreasury` / `WstETHYieldTreasury`
- `DelegationAuthorizer`
- `ReceiptRegistry`

Key protocol constraints were established early:
- principal must remain protected
- only yield / surplus headroom should become spendable
- budgets should constrain operating capital
- delegated rules should constrain execution
- receipts should record machine-readable evidence and authorization provenance

## Phase 4 — Implementation

The agent helped build the repo as a Solidity / Foundry project and contributed substantially to:
- contracts
- tests
- scripts
- deployment notes
- architecture docs
- track-fit docs
- submission packaging
- judge dashboard integration

The project evolved from a simpler delegated treasury into a more robust primitive with:
- wildcard delegation rules
- rule revocation
- manager-controlled child budgets
- parent/child reservation semantics
- non-double-counted root allocation
- richer receipt fields
- explicit matched `ruleId` provenance
- dedicated `WstETHYieldTreasury` support

## Phase 5 — Testing and early onchain proof

The repo gained a substantial Foundry test suite covering treasury behavior, authorization failures, budget logic, receipts, and the `wstETH` path.

The project was first proven on Base Sepolia, with deployment and spend artifacts captured in the deployment notes.

## Phase 6 — Identity and submission packaging

The collaboration expanded beyond contracts into judge-facing packaging:
- Synthesis registration was completed
- the ERC-8004 identity registration tx was recorded
- public-safe `agent.json` and `agent_log.json` artifacts were created
- a public evidence pack was added for judges
- a dashboard / frontend path was added for the demo story

## Phase 7 — Base mainnet sponsor hardening

The repo later gained a real Base mainnet sponsor-complete proof path.

That work added and verified:
- live Base mainnet treasury deployment
- real Base mainnet `wstETH`
- live MetaMask smart-account proof
- live delegation redemption
- live treasury spend triggered by that redemption
- live receipt proving the smart-account executor in the spend path

The strongest current public proof set is:
- `agent-artifacts/deployments/base-mainnet-metamask-live.md`
- `agent-artifacts/submission/public-evidence-pack.md`

## Phase 8 — Automation loop and final repo polish

An OpenClaw heartbeat / ongoing automation loop kept the repo integrating, validating, and updating.

That process was useful, but it was not perfect. It sometimes:
- got stuck
- circled on blockers
- overfocused on partial status loops
- needed human intervention to reset priorities

The final submission-prep pass therefore required explicit human steering for:
- final naming
- final story polish
- frontend styling / branding direction
- final track-positioning judgment
- final shipping decisions

## Human contributions

The human:
- set priorities and shipment standards
- steered sponsor selection and track emphasis
- provided deployment authority and practical unblock decisions
- intervened when automation loops stalled or overfocused on the wrong problems
- handled or prepared to handle final ship tasks such as media, logo, video, and submission metadata

## Agent contributions

The agent:
- analyzed the hackathon and recommended the strongest strategic direction
- helped define the core treasury / allowance thesis
- implemented major parts of the contracts, tests, scripts, docs, and submission package
- maintained deployment notes and track-fit documentation
- kept the repo moving through OpenClaw automation and validation loops
- helped turn the project into a judge-readable repository instead of only a contract experiment

## Honest framing of autonomy

This repo should be presented honestly.

The agent was a real contributor, and in many phases a major one. But the process was not perfectly autonomous.

The most accurate summary is:
- the agent helped brainstorm the direction by analyzing the competition and identifying strong reward-to-competition opportunities across tracks
- the agent then helped implement the project end-to-end with human guidance
- there was a heartbeat / ongoing automation loop that kept OpenClaw integrating the project
- that process got stuck / circled on some issues
- human intervention was needed to unblock the final steps, polish the repo, and ship the final version

That is not a weakness. It is the true collaboration model behind this submission.

## Remaining human-only final tasks

- final video
- cover image / screenshots / logo
- Moltbook URL if needed
- final metadata polish in the submission UI
