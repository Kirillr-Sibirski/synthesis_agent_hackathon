# Submission Status Checklist

## Already done

- [x] Public GitHub repo exists
- [x] Final public-facing project name selected: **Agent Allowance Protocol**
- [x] README updated for the final public story
- [x] Foundry project is set up
- [x] Contracts implemented (`WstETHYieldTreasury`, `DelegationAuthorizer`, `ReceiptRegistry`, `TreasuryOperatorFactory`)
- [x] Tests implemented and passing: **9/9** (2026-03-23)
- [x] Base Sepolia deployment completed
- [x] Base mainnet deployment completed (2026-03-21)
- [x] Live onchain spend completed (MetaMask delegation redemption + treasury spend)
- [x] Live MetaMask delegation redemption completed on Base mainnet
- [x] Live Base mainnet `wstETH` proof recorded
- [x] Deployment records written: `agent-artifacts/deployed-addresses.md`, `agent-artifacts/deployments/base-mainnet-metamask-live.md`
- [x] Judge dashboard exists and validates against the live proof set
- [x] Project description draft written
- [x] Problem statement draft written
- [x] Human-agent collaboration log drafted and updated
- [x] Public-safe evidence pack generated and updated (2026-03-23)
- [x] Public-facing ERC-8004 manifest / execution-log at repo root (`agent.json`, `agent_log.json`, `.well-known/agent.json`, `.well-known/agent_log.json`) — committed 2026-03-22, updated 2026-03-23
- [x] Evidence artifacts corrected to reflect real Base mainnet state (2026-03-23)
- [x] Frontend build passing (2026-03-23)
- [x] Frontend config correctly pointing at Base mainnet contracts
- [x] `agent_log.json` updated with final submission-day entry

## Still needed (human-only final tasks)

- [ ] Final video URL
- [ ] Cover image / screenshots / logo
- [ ] Moltbook post URL if needed
- [ ] Synthesis project UUID / final UI details in submission form
- [ ] Final track checkbox selection in submission UI
- [ ] **FINAL PUBLISH CALL** before March 23, 2026 deadline

## Honest track posture right now

### Strongest (all qualify honestly)
- **Agents With Receipts — ERC-8004**: receipt-first architecture, ERC-8004 registration recorded, discovery files committed
- **Best Use of Delegations**: live Base mainnet MetaMask smart-account redemption, constrained authorizer rules, receipt proves executor identity
- **stETH Agent Treasury**: real Base mainnet `wstETH`, principal-protected, yield-only spendable
- **Synthesis Open Track**: complete protocol + proof + dashboard package

### Secondary / careful
- **Let the Agent Cook**: agent-led collaboration with human intervention — honest framing only, NOT claiming full autonomy

## Strongest current repo strengths (for judge review)

- Live Base mainnet treasury proof (2026-03-21)
- Live Base mainnet MetaMask smart-account redemption proof
- Real Base mainnet `wstETH` path with principal protection
- Receipt-linked authorization provenance (ruleId in every receipt)
- ERC-8004 discovery files committed to repo root
- 9/9 forge tests passing
- Frontend build passing with correct Base mainnet config
- Judge dashboard aligned with recorded mainnet proof
- Public-safe evidence pack at `agent-artifacts/submission/public-evidence-pack.md`

## Key evidence paths

- Live proof: `agent-artifacts/deployments/base-mainnet-metamask-live.md`
- Address book: `agent-artifacts/deployed-addresses.md`
- Evidence index: `agent-artifacts/submission/public-evidence-pack.md`
- Readiness: `agent-artifacts/evidence/final/same-network-readiness.json`
- Checklist: `agent-artifacts/evidence/final/cutover-checklist.md`
