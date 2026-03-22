# Architecture Decisions

## 1. Keep the strongest honest thesis on one network
AAP was optimized around a same-network Base mainnet story:
- real bridged Base mainnet `wstETH`
- live MetaMask smart-account delegation redemption
- live receipt-backed treasury spend
- judge-facing frontend wired to that proof set

## 2. Principal protection is the product core
The treasury is not a generic hot wallet. `WstETHYieldTreasury` protects principal and only exposes spendable headroom above the principal floor.

## 3. Receipts are load-bearing, not decorative
Receipts are created during `spendFromBudget(...)`, not as offchain reporting after the fact. This is why ERC-8004 is a core track instead of a cosmetic add-on.

## 4. Delegation is the trust boundary
Agents do not receive treasury ownership. They receive constrained authority enforced through the authorizer / MetaMask smart-account path.

## 5. Keep only the live submission path
During cleanup, prototype contracts, deployment scripts, old workspace tooling, and duplicate artifact locations were removed. The cleaned repo keeps only:
- active contracts
- active frontend
- the OpenClaw test skill
- judge-facing implementation artifacts

## 6. Preserve raw history, but add a clean canonical index
Older build notes and submission drafts were preserved under `agent-artifacts/`, even when they still mention the pre-cleanup layout. New top-level docs in `agent-artifacts/` are the canonical map for reviewers.