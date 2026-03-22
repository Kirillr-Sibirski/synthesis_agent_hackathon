# Base Mainnet Same-Network Cutover Template

Use this file as the single source of truth for any fresh final same-network rerun.

Goal:
- ERC-8004 identity
- real Base mainnet `wstETH` treasury
- MetaMask delegation flow
- frontend demo config

...all on **Base mainnet** with judge-verifiable proof.

## Fill in

### Chain
- network: `Base mainnet`
- chain id: `8453`
- date completed:
- operator / owner:

### Core contracts
- `WstETHYieldTreasury`:
- `DelegationAuthorizer`:
- `ReceiptRegistry`:
- `wstETH`: `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452`

### Roles
- owner:
- manager:
- executor / MetaMask redeemer:
- recipient:
- all roles distinct: `yes/no`

### Proof
- principal deposit tx:
- top-up / yield source:
- budget tx:
- authorization rule tx:
- smart-account deployment tx:
- delegation hash:
- redemption tx:
- spend tx:
- receipt hash:
- matched rule id:

### Frontend cutover
- `FRONTEND_CHAIN=base`
- treasury:
- authorizer:
- receipt registry:
- asset:
- budget manager:
- spend recipient:
- demo executor:
- demo recipient:
- receipt hash:

### Generated evidence
- `agent-artifacts/evidence/final/cutover-env-validation.json`
- `agent-artifacts/evidence/final/cutover-env-checklist.md`
- `agent-artifacts/evidence/final/cutover-checklist.md`
- `agent-artifacts/evidence/final/same-network-readiness.json`
- `agent-artifacts/evidence/frontend/validation.json`

### Local env base
Start from `.env.example`, not a committed private env file.