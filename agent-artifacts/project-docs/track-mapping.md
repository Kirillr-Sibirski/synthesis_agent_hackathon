# Track Mapping

## Final public-facing name

- Primary name: **Agent Allowance Protocol**
- Short form: **AAP**
- Historical working title kept only for context: **Delegated Yield Treasury**

The project should be understood as a principal-protected `wstETH` treasury for agents where:
- only yield / surplus headroom becomes spendable
- budgets and sub-budgets act like allowances
- protocol rules and MetaMask delegation constrain execution
- receipts provide onchain auditability tied to exact authorization provenance

## Strongest tracks

## 1. Agents With Receipts — ERC-8004

### Honest fit
**Strong.**

### Why it fits
Receipts are part of the trust model, not just a reporting layer.

Each spend can record:
- `taskId`
- `budgetId`
- `evidenceHash`
- `resultHash`
- `metadataURI`
- exact matched authorization `ruleId`

The repo also includes public-safe identity / manifest / log packaging, plus the Synthesis-triggered registration tx.

### Concrete evidence
- `contracts/src/ReceiptRegistry.sol`
- `agent-artifacts/erc8004/submission-agent.json`
- `agent-artifacts/erc8004/submission-agent-log.json`
- `agent-artifacts/submission/public-evidence-pack.md`
- `agent-artifacts/deployments/base-mainnet-metamask-live.md`

### Judge wording
Agent Allowance Protocol is a receipt-first treasury system. Every spend can be tied to machine-readable evidence and to the exact authorization rule that enabled it, making the project a strong fit for the ERC-8004 / Agents With Receipts track.

---

## 2. Best Use of Delegations

### Honest fit
**Strong.**

### Why it fits
Delegation is the project’s core safety primitive.

The protocol gives agents constrained authority through:
- budget-specific spend authority
- manager-controlled child budgets / sub-budgets
- executor restrictions
- recipient restrictions
- selector restrictions
- amount caps
- expiry windows
- revocation
- receipt-level `ruleId` provenance

The MetaMask layer is real, not decorative. The repo includes:
- smart-account derivation
- bundler-aware deployment flow
- constrained delegation artifact generation
- signed delegation artifact generation
- redemption helpers
- live Base mainnet proof

### Concrete evidence
- `contracts/src/DelegationAuthorizer.sol`
- `agent-artifacts/inventory/metamask/README.md`
- `agent-artifacts/inventory/metamask/STATUS.md`
- `agent-artifacts/project-docs/metamask-integration-plan.md`
- `agent-artifacts/deployments/base-mainnet-metamask-live.md`

### Judge wording
Agent Allowance Protocol treats delegation as the central trust boundary: agents receive constrained authority over specific budgets and calls, not raw treasury ownership. The repo also includes a real MetaMask Delegation Framework integration path with live Base mainnet redemption proof.

---

## 3. stETH Agent Treasury

### Honest fit
**Strong.**

### Why it fits
The project is directly about funding agents from a yield-bearing treasury while protecting principal.

That maps cleanly to the Lido / `wstETH` story:
- the human funds the treasury
- principal stays protected
- only yield / surplus headroom becomes spendable
- budgets and sub-budgets partition the spendable layer
- agents operate from allowance-like headroom, not vault ownership

The dedicated `WstETHYieldTreasury` path matters because it models real `wstETH` semantics instead of pretending yield is just a static balance delta.

### Concrete evidence
- `contracts/src/WstETHYieldTreasury.sol`
- `contracts/test/WstETHYieldTreasury.t.sol`
- `agent-artifacts/project-docs/sponsor-compliance.md`
- `agent-artifacts/project-docs/architecture.md`
- `agent-artifacts/deployments/base-mainnet-metamask-live.md`

### Judge wording
Agent Allowance Protocol is an agent treasury built around capital protection: the user funds the vault, principal stays protected, and only yield-derived headroom becomes available for delegated agent operation.

---

## 4. Synthesis Open Track

### Honest fit
**Strong.**

### Why it fits
The repo is a complete system, not just a contract fragment:
- live Base mainnet proof
- treasury contracts
- delegated authorization model
- receipt layer
- public-safe agent manifest / log
- judge dashboard

### Judge wording
Agent Allowance Protocol is a full-stack treasury primitive for agent finance: protected capital, delegated spend authority, receipt-backed accountability, and a judge-facing dashboard tied to live onchain proof.

---

## Secondary / careful track

## 5. Let the Agent Cook

### Honest fit
**Secondary and needs careful framing.**

### Why it still has some merit
- the agent materially contributed to strategy, implementation, and integration
- the repo includes public agent packaging
- the dashboard and proof surfaces make the agent story inspectable
- OpenClaw heartbeat automation was a real part of the workflow

### Honest caveat
This is **not** a credible “no humans touched it” story.

The truthful framing is:
- the agent helped brainstorm the direction by analyzing the competition and identifying strong reward-to-competition opportunities across tracks
- the agent then helped implement the project end-to-end with human guidance
- there was a heartbeat / ongoing automation loop that kept OpenClaw integrating the repo
- that process got stuck / circled on some issues
- human intervention was needed to unblock final steps, polish the repo, and ship the final version

If judges interpret the track strictly as “no humans required,” this should not be the main bet.

### Judge wording
Agent Allowance Protocol is an agent-led but human-guided build. The project demonstrates meaningful agent contribution, tooling, and execution, but it should be presented honestly as collaboration rather than fake total autonomy.

---

## Summary posture for judges

### Strongest now
- **Agents With Receipts — ERC-8004**
- **Best Use of Delegations**
- **stETH Agent Treasury**
- **Synthesis Open Track**

### Secondary / arguable
- **Let the Agent Cook**

### Best short pitch
Agent Allowance Protocol is a principal-protected `wstETH` treasury for AI agents. Humans fund the vault, only yield becomes spendable, allowances can be split into budgets and sub-budgets, MetaMask-backed delegated authority constrains execution, and every spend produces a verifiable receipt tied to the exact rule that authorized it.
