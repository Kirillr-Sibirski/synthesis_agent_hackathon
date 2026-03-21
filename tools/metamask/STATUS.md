# MetaMask Integration Status

## What works now

- Base mainnet MetaMask smart-account derivation works
- exact treasury calldata encoding works for `spendFromBudget(...)`
- bundler-aware deployment / live redemption flow works against Pimlico on Base mainnet
- the repo now distinguishes the redeemer EOA from the treasury-side smart-account executor via `TREASURY_EXECUTOR_ADDRESS`
- runtime scripting is on the stable `node --import tsx` path

## Current status of the delegation artifact step

The repo constructs a real constrained delegation artifact with the installed MetaMask SDK.

Implemented in:
- `tools/metamask/createSignedDelegationArtifact.ts`
- `bun run metamask:create-signed-delegation-artifact`

The generated artifact binds:
- target = live treasury
- method = `spendFromBudget(...)`
- exact calldata
- redeemer restriction
- limited calls
- zero native value
- bounded validity window

## Latest live status

The Base mainnet MetaMask path is now proven end-to-end onchain.

Latest re-verified preflight on `2026-03-21` confirms:
- selected chain is **Base mainnet**
- treasury code is deployed at `0xe07402f1B072FB1Cc5651E763D2139c1218016C9`
- derived smart account `0x08478FfC43E134ae9390720D41409B06f38fEB7d` is **deployed onchain**
- Pimlico bundler reachability is **true** on Base mainnet
- `readyForLiveRedemption=true`
- `readyForFinalSameNetworkRun=true`

Live proof recorded:
1. patched treasury deployment on Base mainnet
2. real Base mainnet `wstETH` treasury setup + budget/rule wiring
3. constrained delegation artifact for the live treasury calldata
4. delegation redemption through live `DelegationManager`
5. receipt-backed treasury spend proving the smart-account executor

See:
- `Memory/Deployments/base-mainnet-metamask-live.md`
- `artifacts/metamask/preflight-8453.json`
- `artifacts/metamask/signed-delegation-8453.json`

## Practical assessment

The MetaMask path has moved from scaffold to live Base mainnet proof.

The remaining work is no longer sponsor-track implementation risk. It is mostly repo/demo polish:
- keep public evidence/docs aligned with the live mainnet proof
- keep the dashboard synced with the latest generated artifacts
- preserve the clean separation between redeemer EOA and treasury executor smart account

## Local verification note

The Solidity side now includes the Base/L2 `wstETH` fallback logic and its focused treasury tests pass in the current environment when run with an explicit local `solc` binary / offline mode.
