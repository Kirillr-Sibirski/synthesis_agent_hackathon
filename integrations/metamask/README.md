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

That offchain constrained-delegation step is now implemented directly in-repo via:

```bash
npm run metamask:create-signed-delegation-artifact
```

The script creates a real signed MetaMask delegation artifact using the installed Smart Accounts Kit builders for:
- allowed target
- allowed method
- exact calldata
- redeemer restriction
- limited call count
- zero native value
- bounded validity window

## Important discovery

The delegator in the final proof flow must be an actual MetaMask **DeleGator / smart account**.
A plain EOA-signed delegation artifact is not enough on its own, because `DelegationManager` executes via `executeFromExecutor(...)` on the delegator contract.

So the next concrete implementation step is:
- create/deploy a MetaMask DeleGator smart account on Base Sepolia
- bind treasury permissions to that smart account
- redeem the delegation through the live DelegationManager
- record the resulting treasury spend + receipt tx hashes

## Current concrete progress

A real Base Sepolia MetaMask smart-account derivation now works from the repo:

```bash
npm run metamask:derive-smart-account
```

Current derived address for the current owner key:
- owner: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- smart account: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- delegation manager: `0xdb9B1e94B5b69Df7e401DDbedE43491141047dB3`

At the moment this smart account is only **derived**, not yet deployed onchain.
The next step is to deploy/fund/use it in the treasury delegation flow.

## Repo scripts

```bash
npm run metamask:derive-smart-account
npm run metamask:deploy-smart-account
npm run metamask:encode-treasury-spend
npm run metamask:prepare-delegation-artifact
npm run metamask:create-signed-delegation-artifact
npm run metamask:preflight
```

`metamask:preflight` emits a live-readiness report that checks:
- required env presence for the treasury spend intent
- whether the derived MetaMask smart account is already deployed
- whether `TREASURY_ADDRESS` currently has code on Base Sepolia
- whether the configured bundler endpoint is reachable
- the exact encoded `spendFromBudget(...)` selector/intent shape that the delegation must authorize

`metamask:prepare-delegation-artifact` emits a sponsor-facing JSON artifact that ties together:
- the derived MetaMask smart account
- the live DelegationManager address
- the exact treasury spend calldata
- the exact selector derived from that encoded calldata
- the intended delegate / executor
- the concrete Base Sepolia enforcer addresses for AllowedTargets / ExactCalldata / Redeemer / LimitedCalls
- the caveat shape we need for honest track qualification
- the remaining live-execution blocker (`BUNDLER_URL`, if still missing)

### Required env for deployment
- `METAMASK_CHAIN` — `base` or `base-sepolia` (default: `base-sepolia`)
- `RPC_URL` — RPC for the selected chain (preferred)
- `BUNDLER_URL` — ERC-4337 bundler endpoint for the selected chain

Without a bundler endpoint we can still:
- derive the MetaMask smart-account address
- prepare exact treasury calldata
- prepare the delegation shape and caveat plan
- generate a signed delegation artifact
- dry-run the final redemption payload shape with `DRY_RUN=true npm run metamask:redeem-signed-delegation -- path/to/signed-delegation.json`

But we **cannot** yet broadcast the smart-account deployment / user operation that is needed for the strongest MetaMask track proof on the selected same-network target.

## Remaining execution steps for full MetaMask qualification

1. provide a working bundler endpoint for the selected final chain
2. deploy/use the MetaMask smart account onchain
3. create and sign a constrained delegation
4. redeem that delegation through the live `DelegationManager` using:
   - `npm run metamask:redeem-signed-delegation -- path/to/signed-delegation.json`
5. execute a treasury spend through that path
6. record tx hashes and update deployment/submission docs

## Why this matters

The project should not just *look* like it uses delegations. It should be provable that MetaMask's real delegation layer is load-bearing in the spend path.
