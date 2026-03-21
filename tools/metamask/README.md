# MetaMask Integration Workspace

This folder is the live workspace for turning the project from delegation-shaped to **actual MetaMask Delegation Framework / Smart Accounts Kit** integration.

## What is already in place

- `@metamask/smart-accounts-kit` installed in the repo
- MetaMask `delegation-framework` vendored under `contracts/lib/delegation-framework`
- Base mainnet environment data confirmed from the SDK and current live proof artifacts
- strict qualification plan written in:
  - `Memory/Submission/track-qualification-plan.md`
  - `Memory/ProjectDocs/metamask-integration-plan.md`

## Current implementation status

The repo now uses the real MetaMask framework to create and redeem a constrained delegation for the treasury spend flow:
- target = treasury
- method = `spendFromBudget(...)`
- constrained redeemer
- limited calls
- exact or tightly-scoped calldata

That flow has already been executed on Base mainnet with onchain proof.

## Important discovery that shaped the final implementation

The delegator in the final proof flow must be an actual MetaMask **DeleGator / smart account**.
A plain EOA-signed delegation artifact is not enough on its own, because `DelegationManager` executes via `executeFromExecutor(...)` on the delegator contract.

The repo now handles that correctly by:
- deriving and deploying the MetaMask smart account on Base mainnet
- binding treasury permissions to that smart account via `TREASURY_EXECUTOR_ADDRESS`
- redeeming the delegation through the live `DelegationManager`
- recording the resulting treasury spend + receipt tx hashes in `Memory/Deployments/base-mainnet-metamask-live.md`

## Current concrete progress

A real MetaMask smart-account derivation now works from the repo:

```bash
bun run metamask:derive-smart-account
```

Current derived address for the current owner key on the currently configured chain:
- owner: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- smart account: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- Base mainnet delegation manager: `0xDB9B1e94B5b69Df7e401DDbedE43491141047dB3`

This smart account is now deployed onchain on Base mainnet and is the treasury-side executor in the live proof.

## Repo scripts

```bash
bun run metamask:derive-smart-account
bun run metamask:deploy-smart-account
bun run metamask:encode-treasury-spend
bun run metamask:prepare-delegation-artifact
bun run metamask:create-signed-delegation-artifact
bun run metamask:redeem-signed-delegation -- path/to/signed-delegation.json
bun run metamask:run-live-flow
bun run metamask:preflight
```

### What they do

- `metamask:preflight`
  - checks env completeness
  - checks treasury code presence
  - checks whether the derived MetaMask smart account is already deployed
  - checks bundler reachability and whether the bundler is actually on the selected chain
  - shows the exact encoded `spendFromBudget(...)` selector/intent shape
  - explicitly reports whether the setup is ready for the live **same-network Base mainnet** story
  - can also save the report locally via `PREFLIGHT_OUT=... bun run metamask:preflight`

- `metamask:create-signed-delegation-artifact`
  - generates a real signed constrained MetaMask delegation artifact
  - can also save it locally via `ARTIFACT_OUT=...`

- `metamask:redeem-signed-delegation`
  - loads a saved artifact JSON
  - validates chain/redeemer alignment
  - builds the exact live redemption payload
  - can run in `DRY_RUN=true` mode

- `metamask:run-live-flow`
  - one-command helper for the practical path
  - assembles and saves the signed delegation artifact
  - deploys the smart account if needed and a bundler is configured
  - redeems from the executor path
  - can run in `DRY_RUN=true` mode

## Required env for live work

- `METAMASK_CHAIN` — `base` or `base-sepolia` (default: `base-sepolia`)
- `RPC_URL` — RPC for the selected chain (preferred)
- `BUNDLER_URL` — ERC-4337 bundler endpoint for the selected chain
- `SMART_ACCOUNT_FUNDING_WEI` — optional wei amount to pre-fund the derived smart account before the first unsponsored deployment attempt
- `TREASURY_ADDRESS`
- `TREASURY_EXECUTOR_ADDRESS` — for the MetaMask path this should equal the derived smart-account address, not the redeemer EOA
- `DEMO_EXECUTOR`
- `DEMO_RECIPIENT`
- `PRIVATE_KEY`
- `EXECUTOR_PRIVATE_KEY` (optional if the same key is used)

## What is possible without a bundler endpoint

Without a bundler endpoint we can still:
- derive the MetaMask smart-account address
- prepare exact treasury calldata
- prepare the delegation shape and caveat plan
- generate a signed delegation artifact
- save that signed artifact locally via `ARTIFACT_OUT=... bun run metamask:create-signed-delegation-artifact`
- dry-run the final redemption payload shape with:
  - `DRY_RUN=true bun run metamask:redeem-signed-delegation -- path/to/signed-delegation.json`
- dry-run the full deploy/create/redeem orchestration with:
  - `DRY_RUN=true bun run metamask:run-live-flow`

But we **cannot** broadcast the smart-account deployment / user operation path again on a fresh target until a working bundler is configured for that target.

## Important treasury-authorizer alignment

The MetaMask redeemer and the treasury executor are not the same address.

- `DEMO_EXECUTOR` is the redeemer EOA that submits the redemption transaction.
- the treasury itself sees the MetaMask smart account / DeleGator as `msg.sender`.

That means the treasury authorization rule for the MetaMask path must allow the derived smart-account address as executor. The repo now supports this explicitly via:

- `TREASURY_EXECUTOR_ADDRESS=<derived-smart-account-address>`

If you leave `TREASURY_EXECUTOR_ADDRESS` unset, the setup scripts fall back to the direct executor env and the sponsor-native MetaMask path will not be aligned correctly.

## Important smart-account funding note

The current live MetaMask helpers do not use a paymaster. For the first smart-account deployment, the counterfactual smart-account address therefore needs ETH available for an unsponsored user operation.

You can handle that in either of two ways:

- pre-fund the derived smart-account address manually
- set `SMART_ACCOUNT_FUNDING_WEI` so the helper tops up the counterfactual smart-account address from the owner EOA before attempting deployment

## Current live proof set

Latest recorded Base mainnet proof includes:
1. patched treasury deployment on Base mainnet
2. real Base mainnet `wstETH` treasury setup and budget/rule wiring
3. MetaMask smart-account deployment through the configured bundler
4. constrained delegation artifact generation for the live treasury calldata
5. delegation redemption through the live `DelegationManager`
6. receipt-backed treasury spend proving the smart-account executor

Primary evidence:
- `Memory/Deployments/base-mainnet-metamask-live.md`
- `artifacts/metamask/preflight-8453.json`
- `artifacts/metamask/signed-delegation-8453.json`

## Remaining practical work

1. keep docs and judge-facing dashboard output aligned with the latest generated artifacts
2. preserve the separation between redeemer EOA and treasury executor smart account in all future reruns
3. rerun the flow only when we intentionally rotate roles, deployment addresses, or live proof values

## Why this matters

The project should not just *look* like it uses delegations. It should be provable that MetaMask's real delegation layer is load-bearing in the spend path.
