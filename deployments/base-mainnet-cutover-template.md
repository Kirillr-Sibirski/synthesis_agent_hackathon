# Base Mainnet Same-Network Cutover Template

Use this file as the single source of truth when the final same-network deployment happens.

Goal:
- ERC-8004 identity
- real `wstETH` treasury
- MetaMask delegation flow
- frontend demo config

…all on **Base mainnet** with judge-verifiable proof.

---

## 1. Chain / thesis

- network: `Base mainnet`
- chain id: `8453`
- same-network thesis satisfied: `yes/no`
- date completed:
- operator / owner address:

---

## 2. Core contract deployments

### Treasury stack
- `WstETHYieldTreasury`:
- `DelegationAuthorizer`:
- `ReceiptRegistry`:
- `wstETH` token address: `0x7f39c581f595b53c5cb5bbd8f2c9a0e1b8d9d2b2`

### Deployment tx hashes
- treasury deployment tx:
- authorizer deployment tx:
- receipt registry deployment tx:
- verification / explorer links:

---

## 3. Role-separated actors

- owner:
- manager:
- executor / MetaMask redeemer:
- recipient:

Are all four roles distinct?
- `yes/no`

If not, explain why:

---

## 4. Live `wstETH` funding / spendable-headroom proof

### Principal deposit
- principal deposit tx:
- principal amount (`wstETH`):

### Spendable headroom above principal floor
Choose the actual source used:
- real accrued yield already present: `yes/no`
- explicit extra `wstETH` top-up to treasury: `yes/no`

If top-up used:
- top-up tx:
- top-up amount (`wstETH`):
- rationale for judges:
  - this top-up creates spendable balance above the protected principal floor for the demo

### Post-setup treasury state snapshot
- `principalBaselineStETH`:
- `currentPrincipalFloorWstETH`:
- `availableYieldInWstETH`:
- `unallocatedYieldInWstETH`:
- snapshot block number:

---

## 5. Budget / authorization setup

### Budget
- budget label:
- budget id:
- configure budget tx:
- budget manager:
- allocated amount:

### Authorization rule
- rule id:
- rule setup tx:
- executor:
- recipient:
- selector: `spendFromBudget(bytes32,address,uint128,bytes32,bytes32,bytes32,bytes32,string)`
- max amount:

---

## 6. MetaMask delegation proof

### Smart account
- delegator smart account:
- smart-account deployment userOp hash:
- smart-account deployment tx hash:
- bundler endpoint used:

### Delegation artifact
- saved artifact path (local):
- artifact generation command:
- delegation hash:
- delegation manager:
- redeemer:

### Redemption
- redemption command used:
- redemption tx hash:
- redemption block number:
- redemption status:

---

## 7. Live treasury spend proof

- spend tx hash:
- receipt hash:
- matched authorization rule id:
- recipient received funds: `yes/no`
- post-spend treasury snapshot tx / block:

If receipt registry was queried after spend:
- receipt lookup proof / tx / block:

---

## 8. Frontend / demo cutover

### Dashboard config
Populate `frontend/config.json` locally with:
- chain: `base`
- treasury:
- asset:
- receiptRegistry:
- authorizer:
- budgetManager:
- spendRecipient:
- demoExecutor:
- demoRecipient:
- receiptHash:

Preferred write path:

```bash
FRONTEND_CHAIN=base npm run frontend:write-config
```

Then validate the generated dashboard config:

```bash
FRONTEND_VALIDATION_OUT=artifacts/frontend/validation.json \
METAMASK_PREFLIGHT_PATH=artifacts/metamask/preflight-8453.json \
  npm run frontend:validate-config
```

Then generate the combined same-network go/no-go report:

```bash
FINAL_READINESS_OUT=artifacts/final/same-network-readiness.json \
METAMASK_PREFLIGHT_PATH=artifacts/metamask/preflight-8453.json \
FRONTEND_VALIDATION_PATH=artifacts/frontend/validation.json \
  npm run final:validate-same-network
```

Optional first check for the raw final-run env:

```bash
CUTOVER_ENV_VALIDATION_OUT=artifacts/final/cutover-env-validation.json \
  npm run final:validate-cutover-env
```

Or refresh the entire readiness bundle in one pass:

```bash
CUTOVER_ENV_VALIDATION_OUT=artifacts/final/cutover-env-validation.json \
PREFLIGHT_OUT=artifacts/metamask/preflight-8453.json \
FRONTEND_VALIDATION_OUT=artifacts/frontend/validation.json \
FINAL_READINESS_OUT=artifacts/final/same-network-readiness.json \
  npm run final:refresh-readiness-bundle
```

Expected env inputs:
- recommended starting point: copy `env/base-mainnet-cutover.example.env` into local `.env` and fill it for the final run
- preferred for mainnet cutover:
  - `FRONTEND_TREASURY_ADDRESS`
  - `FRONTEND_AUTHORIZER_ADDRESS`
  - `FRONTEND_RECEIPT_REGISTRY_ADDRESS`
  - `FRONTEND_ASSET_ADDRESS`
  - `FRONTEND_BUDGET_MANAGER`
  - `FRONTEND_SPEND_RECIPIENT`
  - `FRONTEND_DEMO_EXECUTOR`
  - `FRONTEND_DEMO_RECIPIENT`
  - `FRONTEND_RECEIPT_HASH`
- acceptable fallback inputs when the generic env is already pointed at the same chain:
  - `TREASURY_ADDRESS`
  - `AUTHORIZER_ADDRESS`
  - `RECEIPT_REGISTRY_ADDRESS`
  - `WSTETH_ADDRESS`
  - `MANAGER_ADDRESS`
  - `EXECUTOR_ADDRESS`
  - `RECIPIENT_ADDRESS`
  - `RECEIPT_HASH`

### Demo artifacts to preload / show
- saved MetaMask artifact JSON:
- role-separated summary built in dashboard: `yes/no`
- receipt lookup ready in dashboard: `yes/no`

---

## 9. Judge-facing links

- BaseScan treasury:
- BaseScan authorizer:
- BaseScan receipt registry:
- BaseScan smart account:
- BaseScan redemption tx:
- BaseScan spend tx:
- repo commit for final demo state:
- video timestamp references:

---

## 10. Honest final checklist

- [ ] ERC-8004 identity is on Base mainnet
- [ ] real `wstETH` treasury path is on Base mainnet
- [ ] MetaMask smart account is on Base mainnet
- [ ] MetaMask delegation redemption happened on Base mainnet
- [ ] treasury spend happened on Base mainnet
- [ ] frontend points at Base mainnet deployment data
- [ ] role-separated story is demonstrable
- [ ] no secrets were committed
- [ ] same network: yes
- [ ] compromises: none

---

## 11. Notes / blockers encountered

Use this section for anything judges or the human should know about the exact final run.
