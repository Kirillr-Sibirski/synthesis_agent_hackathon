# Track Qualification Plan

This file is intentionally strict.

The goal is not to vaguely fit many tracks. The goal is to **fully qualify for at least 3 tracks**, with sponsor-native evidence.

## Best realistic target set

### 1. Best Use of Delegations — MetaMask
**Status:** partially aligned, not fully qualified yet.

#### Already strong
- constrained delegated spend rules
- wildcard caveat-like behavior
- rule revocation
- hierarchical sub-budgets / child budgets
- explicit `ruleId` provenance in receipts

#### Missing for full qualification
- actual **MetaMask Smart Accounts Kit / Delegation Framework** integration
- root delegation creation
- redelegation / subdelegation demonstration if possible
- redemption flow through the actual framework
- real tx proofs showing the MetaMask delegation layer is load-bearing

#### Minimum bar we should hit
- one treasury spend path that is authorized by a **real MetaMask delegation**, not only our local analogue
- MetaMask smart account / DeleGator present in the execution path
- README section explicitly documenting the delegation flow
- tx hashes proving smart-account deployment/use, delegation creation, and redemption

---

### 2. Agents With Receipts — ERC-8004
**Status:** structurally strong, not fully qualified yet.

#### Already strong
- receipt-first architecture
- structured receipts with:
  - `taskId`
  - `budgetId`
  - `evidenceHash`
  - `resultHash`
  - `ruleId`
  - `metadataURI`
- public repo
- onchain Base Sepolia spend proofs
- `agent.json` and `agent_log.json` drafts exist

#### Missing for full qualification
- actual **ERC-8004 identity registration**
- final manifest compatibility / registration artifact
- final `agent.json`
- final `agent_log.json`
- explicit linkage from identity → manifest → onchain actions

#### Minimum bar we should hit
- register ERC-8004 identity
- include identity tx hash / registry data in submission
- finalize `agent.json`
- finalize `agent_log.json`
- point receipts / tx proofs back to the agent identity story

---

### 3. Let the Agent Cook — No Humans Required
**Status:** plausible, not fully qualified yet.

#### Already strong
- real multi-step build history exists
- tool use is real
- smart contracts were designed, tested, deployed, and executed
- onchain actions exist
- `agent.json` and `agent_log.json` drafts exist

#### Missing for full qualification
- ERC-8004 identity registration
- polished autonomous execution log
- stronger framing of the full loop:
  - discover
  - plan
  - execute
  - verify
  - submit
- compute/safety framing in the manifest/logs

#### Minimum bar we should hit
- final `agent.json`
- final `agent_log.json`
- explicit section in README showing the end-to-end autonomous loop
- ERC-8004 registration proof

---

### 4. Synthesis Open Track
**Status:** basically qualifies if submitted properly.

This is our umbrella track.
It should not be our main strategic bet, but we should absolutely enter it.

---

## High-upside extra track

### 5. stETH Agent Treasury — Lido
**Status:** conceptually strong, not fully qualified yet.

#### Already strong
- treasury is the core primitive
- `WstETHYieldTreasury` now models real `wstETH` exchange-rate semantics correctly
- slash/rate-drop safety is tested
- hierarchical delegated budgets are a novel treasury control model

#### Missing for full qualification
- deployment against **real wstETH** (not mock)
- on an accepted L2/mainnet environment for the Lido track
- live tx proofs using that real asset path

#### Minimum bar we should hit
- deploy `WstETHYieldTreasury` against real `wstETH`
- configure and execute at least one real treasury action under that path
- document why principal remains protected under real `wstETH` rate mechanics

---

## The actual plan

## Phase A — lock 3 full tracks first

### Must finish first
1. **MetaMask Delegation Framework integration**
2. **ERC-8004 registration**
3. **final `agent.json` + `agent_log.json`**
4. **README / submission flow for Let the Agent Cook**

If we complete those, we can be genuinely strong for:
- Best Use of Delegations
- Agents With Receipts — ERC-8004
- Let the Agent Cook
- plus Open Track automatically

## Phase B — upgrade into Lido compliance

5. deploy `WstETHYieldTreasury` against real `wstETH`
6. add live tx proofs for the real Lido path

That turns the project from “3-track fully qualified” into “4+ track seriously competitive.”

## What not to do right now

- do **not** branch into Uniswap unless the first three tracks are locked
- do **not** branch into Venice unless the first three tracks are locked
- do **not** spend time on frontend polish before the sponsor-critical compliance work is done

## Final practical target

### Minimum winning package
- Best Use of Delegations
- Agents With Receipts — ERC-8004
- Let the Agent Cook
- Open Track

### Best upgraded package
- Best Use of Delegations
- Agents With Receipts — ERC-8004
- Let the Agent Cook
- stETH Agent Treasury
- Open Track
