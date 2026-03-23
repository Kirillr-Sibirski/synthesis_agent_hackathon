# Public Evidence Pack

This file is the judge-facing evidence index for Agent Allowance Protocol.

No secrets, API keys, or local-only registration files are required to verify anything referenced here.

Generated at: 2026-03-23T03:30:00.000Z

## 1. Public repo

- Repo: `https://github.com/Kirillr-Sibirski/synthesis_agent_hackathon`

## 2. ERC-8004 / Synthesis identity evidence

The project completed Synthesis registration and recorded the resulting onchain identity-registration transaction.

- owner / operator address: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- registration tx: `0x2f1effd6a8b1f3375df0d9f8e0e44341c4a5fc7e7e785d09dcdb66ef2849f96b`
- root manifest: `agent.json` ✅ committed to repo root (2026-03-22)
- root execution log: `agent_log.json` ✅ committed to repo root (2026-03-22)
- well-known manifest: `.well-known/agent.json` ✅ committed (2026-03-22)
- well-known execution log: `.well-known/agent_log.json` ✅ committed (2026-03-22)
- canonical source: `agent-artifacts/erc8004/submission-agent.json`
- canonical log source: `agent-artifacts/erc8004/submission-agent-log.json`

Private API credentials and registration state remain local-only in `submission/private-registration.json` and are intentionally excluded from git.

## 3. Live onchain treasury evidence

**Network: Base Mainnet (chainId: 8453)**

Contracts:
- Treasury: `0xe07402f1B072FB1Cc5651E763D2139c1218016C9`
- DelegationAuthorizer: `0x6367B12cee6105fCe90B4532c513605Fc061bF4D`
- ReceiptRegistry: `0xf5741a5d361706CA7cf9348db0fb899e8e7A86Cd`
- Base mainnet `wstETH`: `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452` ✅ real canonical bridged token

Deployment records:
- `agent-artifacts/deployments/base-mainnet-metamask-live.md` — canonical live proof
- `agent-artifacts/deployed-addresses.md` — quick-reference address book
- `agent-artifacts/deployments/base-sepolia-metamask-live.md` — earlier Sepolia archive proof

## 4. MetaMask Delegation Framework evidence

**Network: Base Mainnet (chainId: 8453)**

Key actors:
- MetaMask smart account / executor: `0x08478FfC43E134ae9390720D41409B06f38fEB7d` ✅ deployed onchain
- DelegationManager: `0xdb9B1e94B5b69Df7e401DDbedE43491141047dB3`
- Redeemer / delegate EOA: `0x7615D4BB302Ae439aFd83ddcCc9898adB2c7e659`
- Bundler: Pimlico Base Mainnet

Key transactions:
- Live delegation redemption + treasury spend: `0xb920f46d259fd8608d08c22fc5e8adfc2c1d10b0ee2168a1c27ee294b9d56504`
  - block: `43663891`
  - status: `success`
- Authorizer rule set (ruleId tied to smart account executor): `0xdb17fcebdf4b58db7dca43738f12abaaa5e207422f7ff95865e35082cf9f851f`

The receipt registry records the **MetaMask smart-account address** as executor, not the redeemer EOA — this is the sponsor-native delegation proof.

Workspace docs:
- `agent-artifacts/inventory/metamask/README.md`
- `agent-artifacts/inventory/metamask/STATUS.md`
- `agent-artifacts/project-docs/metamask-integration-plan.md`

Track qualification: **honest** — live Base mainnet MetaMask smart-account redemption proof recorded in `agent-artifacts/deployments/base-mainnet-metamask-live.md`

## 5. Lido / `wstETH` same-network evidence

**Network: Base Mainnet (chainId: 8453)**

- Real Base mainnet `wstETH` (`0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452`) deposited as principal ✅
- Principal protection: `3000000000000` raw `wstETH` deposited as protected floor
- Yield headroom: `2000000000000` extra `wstETH` top-up (spendable layer)
- Root budget configured: `1500000000000` allocation (`OPS_BUDGET`)
- Spend: `1000000000000` raw `wstETH` spent via MetaMask delegation
- Post-spend available yield: `1000000000000` raw `wstETH`

Key txs:
- Principal deposit: `0x17ba36ba5379b098d364a18060c8429e47a7a030613e49e3afa7684fa37026bf`
- Yield headroom top-up: `0x99262a197b36161bdd287c820e5238e0f9b354908007cc1bc0c5d2dc437d7ca3`

Sponsor docs:
- `agent-artifacts/project-docs/sponsor-compliance.md`
- `agent-artifacts/project-docs/architecture.md`

Track qualification: **honest** — real Base mainnet `wstETH` treasury with principal protection and yield-only spendable headroom

## 6. Spend / receipt proof

- budgetId: `0xb3e0fae8b586325ab4a14d8c2d0ed544d80af3db3bc870137bebb448314c0224`
- receiptHash: `0xe724aca208b8d52c3f5e564bd25361b8884887b6537c625a2f53d6d7e20b06ea`
- taskId: `0x950479decd884dc145e75de1402dbb73a7047388630a84fbdaaaad5b531e8be8`
- ruleId: `0x33ebc0a1635c1f36b0831b1005d41f561c6329eeeb47a4e72aea97e80307ed29`
- executor recorded in receipt: `0x08478FfC43E134ae9390720D41409B06f38fEB7d` (MetaMask smart account) ✅
- recipient: `0xC318e7fE96a302250CBaB69c6de2E8f476AB3671`
- amount: `1000000000000` raw `wstETH`
- metadataURI: `ipfs://metamask-delegation-spend-base-mainnet-1`

## 7. Frontend / dashboard evidence

The frontend is a Next.js App Router app that surfaces:
- treasury status and budget state
- per-agent ERC-8004 receipt views
- receipt lookup by hash
- MetaMask proof artifacts
- readiness status

Frontend config (`frontend/public/config.json`):
- Base treasury: `0xe07402f1B072FB1Cc5651E763D2139c1218016C9` ✅
- Base asset (mainnet wstETH): `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452` ✅
- Base receipt registry: `0xf5741a5d361706CA7cf9348db0fb899e8e7A86Cd` ✅
- Base authorizer: `0x6367B12cee6105fCe90B4532c513605Fc061bF4D` ✅
- Demo executor (smart account): `0x08478FfC43E134ae9390720D41409B06f38fEB7d` ✅
- Receipt hash: `0xe724aca208b8d52c3f5e564bd25361b8884887b6537c625a2f53d6d7e20b06ea` ✅

Frontend docs:
- `frontend/README.md`
- `agent-artifacts/project-docs/demo-flow.md`

Build status: `npm run build` ✅ passing

## 8. Latest validation snapshot

- forge test: **9/9 passing** (as of 2026-03-23)
- frontend build: **passing** (as of 2026-03-23)
- overall ready for same-network demo/submission: **YES**
- live proof recorded: **YES** (2026-03-21)
- current honest tracks: `Agents With Receipts — ERC-8004`, `Best Use of Delegations`, `stETH Agent Treasury`, `Synthesis Open Track`

Readiness artifacts:
- `agent-artifacts/evidence/final/same-network-readiness.json`
- `agent-artifacts/evidence/final/cutover-checklist.md`

## 9. Best honest track posture

### Strong
- **Agents With Receipts — ERC-8004**: receipt-first architecture, ERC-8004 registration, root manifest committed
- **Best Use of Delegations**: live MetaMask smart-account redemption on Base mainnet, constrained authorizer rules, receipt proves executor identity
- **stETH Agent Treasury**: real Base mainnet `wstETH`, principal-protected, yield-only spendable
- **Synthesis Open Track**: complete protocol + proof + dashboard package

### Secondary / careful
- **Let the Agent Cook**: agent-led collaboration with human intervention in final shipping — NOT claiming full autonomy. Honest framing only.

## 10. Honest framing note

This project was built with significant agent contribution but was not a fully autonomous build. The agent helped research tracks, design the architecture, implement contracts, set up deployment flows, and package the submission. Human intervention was required for final unblocking, deployment signing, and shipping decisions. This is documented honestly in `agent_log.json` and `agent-artifacts/submission/conversation-log.md`.
