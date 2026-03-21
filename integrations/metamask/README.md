# MetaMask Integration Workspace

This folder is the live workspace for turning the project from delegation-shaped to **actual MetaMask Delegation Framework / Smart Accounts Kit** integration.

## What is already in place

- `@metamask/smart-accounts-kit` installed in the repo
- MetaMask `delegation-framework` vendored under `lib/delegation-framework`
- Base Sepolia environment data confirmed from the SDK
- strict qualification plan written in:
  - `submission/track-qualification-plan.md`
  - `docs/metamask-integration-plan.md`

## Current implementation goal

Use the real MetaMask framework to create a constrained delegation for the treasury spend flow:
- target = treasury
- method = `spendFromBudget(...)`
- constrained redeemer
- limited calls
- exact or tightly-scoped calldata

Then redeem that delegation and execute a treasury spend with onchain proof.

## Important discovery

The delegator in the final proof flow must be an actual MetaMask **DeleGator / smart account**.
A plain EOA-signed delegation artifact is not enough on its own, because `DelegationManager` executes via `executeFromExecutor(...)` on the delegator contract.

So the next concrete implementation step is:
- create/deploy a MetaMask DeleGator smart account on the final same-network target
- bind treasury permissions to that smart account
- redeem the delegation through the live DelegationManager
- record the resulting treasury spend + receipt tx hashes

## Current concrete progress

A real MetaMask smart-account derivation now works from the repo:

```bash
npm run metamask:derive-smart-account
```

Current derived address for the current owner key on the currently configured chain:
- owner: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- smart account: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- Base Sepolia delegation manager: `0xdb9B1e94B5b69Df7e401DDbedE43491141047dB3`

At the moment this smart account is still **derived**, not yet deployed onchain.

## Repo scripts

```bash
npm run metamask:derive-smart-account
npm run metamask:deploy-smart-account
npm run metamask:encode-treasury-spend
npm run metamask:prepare-delegation-artifact
npm run metamask:create-signed-delegation-artifact
npm run metamask:redeem-signed-delegation -- path/to/signed-delegation.json
npm run metamask:run-live-flow
npm run metamask:preflight
```

### What they do

- `metamask:preflight`
  - checks env completeness
  - checks treasury code presence
  - checks whether the derived MetaMask smart account is already deployed
  - checks bundler reachability and whether the bundler is actually on the selected chain
  - shows the exact encoded `spendFromBudget(...)` selector/intent shape
  - explicitly reports whether the setup is ready for the final **same-network Base mainnet** story
  - can also save the report locally via `PREFLIGHT_OUT=... npm run metamask:preflight`

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
- `TREASURY_ADDRESS`
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
- save that signed artifact locally via `ARTIFACT_OUT=... npm run metamask:create-signed-delegation-artifact`
- dry-run the final redemption payload shape with:
  - `DRY_RUN=true npm run metamask:redeem-signed-delegation -- path/to/signed-delegation.json`
- dry-run the full deploy/create/redeem orchestration with:
  - `DRY_RUN=true npm run metamask:run-live-flow`

But we **cannot** yet broadcast the smart-account deployment / user operation that is needed for the strongest MetaMask track proof on the selected same-network target.

## Remaining execution steps for full MetaMask qualification

1. provide a working bundler endpoint for the selected final chain (and verify the endpoint itself reports that same chain ID)
2. deploy/use the MetaMask smart account onchain
3. create and sign a constrained delegation
4. redeem that delegation through the live `DelegationManager` using either:
   - `npm run metamask:redeem-signed-delegation -- path/to/signed-delegation.json`
   - `npm run metamask:run-live-flow`
5. execute a treasury spend through that path
6. record tx hashes and update deployment/submission docs

## Why this matters

The project should not just *look* like it uses delegations. It should be provable that MetaMask's real delegation layer is load-bearing in the spend path.
