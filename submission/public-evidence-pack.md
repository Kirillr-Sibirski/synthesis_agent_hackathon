# Public Evidence Pack

This file is the public-safe, judge-facing index of what is already proven versus what is still honestly missing.

No secrets, API keys, or local-only registration files are required to verify anything referenced here.

## 1. Public repo

- Repo: `https://github.com/Kirillr-Sibirski/synthesis_agent_hackathon`

## 2. ERC-8004 / Synthesis identity evidence

The project has already completed Synthesis registration and recorded the resulting onchain identity-registration transaction.

- owner / operator address: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- registration tx: `0x2f1effd6a8b1f3375df0d9f8e0e44341c4a5fc7e7e785d09dcdb66ef2849f96b`
- public manifest draft: `submission/agent.json`
- public execution log draft: `submission/agent_log.json`

Private API credentials and registration state remain local-only in `submission/private-registration.json` and are intentionally excluded from git.

## 3. Live onchain treasury evidence

Latest repo-head-aligned deployment note:
- `deployments/base-sepolia-v2.md`

Key public artifacts from that deployment:
- YieldTreasury: `0xdA832F7646e0527c16aDda3Bc4b2E265E4892450`
- DelegationAuthorizer: `0x12c2a7523bC841edB663F01989E972ef480Fa78c`
- ReceiptRegistry: `0x6Bda3c9B50DE0111395A1b168D72Ed79EC45eeCb`
- live spend tx: `0x91746c08a18f8946758ce24f903116256eec4e7a976eb826057c989a8a2abb71`
- receipt hash: `0x1675e089e66f959833b06b6c503058d4fda53f62715d36d92176427095c95b0b`
- matched authorization rule id: `0xb56d4562b1973e16677a44ced06d00a94e45f8981edbd0e25c00fa49c2e6c8e8`

This is the strongest current proof for:
- receipt-first spending
- authorization provenance
- live execution on Base Sepolia
- principal-protected treasury behavior in the generic treasury path

## 4. Role-separated live-flow evidence

Judge-facing role-separation note:
- `deployments/base-sepolia-wsteth-role-separated.md`

What is already true:
- the repo contains separate owner / manager / executor / recipient flow tooling
- a dedicated `WstETHYieldTreasury` path exists
- live deployment transactions for the role-separated `wstETH` stack are recorded
- the deployment note now explicitly documents the intended setup/spend content and the exact remaining curation gap

What is still missing:
- the strongest curated final setup tx set with distinct actor addresses called out explicitly
- the strongest curated executor-originated spend tx hash for the role-separated story
- final post-spend state snapshot for the judge-facing role-separated narrative

## 5. MetaMask Delegation Framework evidence

Public MetaMask workspace docs:
- `integrations/metamask/README.md`
- `integrations/metamask/STATUS.md`
- `docs/metamask-integration-plan.md`

Implemented evidence already in the repo:
- Base Sepolia MetaMask smart-account derivation
- exact treasury `spendFromBudget(...)` calldata encoding
- real signed constrained delegation artifact generation
- bundler-aware smart-account deployment scaffolding
- live-readiness preflight report generation

Concrete current public values:
- derived MetaMask smart account: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- DelegationManager: `0xdb9B1e94B5b69Df7e401DDbedE43491141047dB3`
- intended live treasury target: `0xB38F8a149F95850cB5efF5fCE5621d36b8F8BBd0`
- latest verified preflight status: env configured = yes, treasury deployed = yes, smart account deployed = no, bundler configured/reachable = no

Honest blocker:
- live delegation-backed execution is still blocked by the missing bundler-backed smart-account deployment and redemption proof

That means the MetaMask story is now materially real, but not yet fully sponsor-complete.

## 6. Lido / `wstETH` evidence

Public docs:
- `docs/sponsor-compliance.md`
- `docs/architecture.md`
- `docs/role-separated-live-flow.md`

Implemented evidence already in the repo:
- `WstETHYieldTreasury.sol`
- rate-based `wstETH` accounting
- slash / rate-drop safety coverage in tests
- role-separated `wstETH` deployment tooling

Honest blocker:
- we still need a deployment using real `wstETH` on an accepted L2/mainnet for strongest Lido-track qualification

## 7. Best honest track posture right now

### Strong now
- **Agents With Receipts — ERC-8004**
- **Synthesis Open Track**

### Credible but still missing one sponsor-native proof step
- **Best Use of Delegations** — missing live MetaMask smart-account deployment/redemption proof
- **Let the Agent Cook** — needs more final manifest/log framing polish
- **stETH Agent Treasury** — needs real `wstETH` deployment path on accepted network

## 8. Fastest remaining path to honest 3+ track qualification

1. finish the live MetaMask bundler-backed deployment/redemption proof
2. finalize `agent.json` and `agent_log.json` around the already-recorded ERC-8004 registration and live txs
3. tighten the judge-facing autonomous loop / role-separated evidence
4. optionally upgrade into real `wstETH` deployment for a stronger Lido claim
