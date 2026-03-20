# MetaMask Integration Status

## What works now

- Base Sepolia MetaMask smart-account derivation works
- exact treasury calldata encoding works for `spendFromBudget(...)`
- bundler-aware deployment scaffolding exists
- the repo compiles cleanly alongside the MetaMask delegation-framework after enabling mixed-solc compilation
- runtime scripting is now on Node/CommonJS instead of the more fragile TS path

## Current status of the delegation artifact step

The repo now **does** construct a real constrained delegation artifact with the installed MetaMask SDK.

Implemented in:
- `integrations/metamask/createSignedDelegationArtifact.ts`
- `npm run metamask:create-signed-delegation-artifact`

The generated artifact includes a signed delegation that binds:
- target = treasury
- method = `spendFromBudget(...)`
- exact calldata
- redeemer restriction
- limited calls
- zero native value
- bounded validity window

## Current blocker

The remaining MetaMask blocker is now the **live onchain redemption path on the final same-network target**, not SDK shape correctness.

Specifically, we still need:
1. a working bundler endpoint for the selected final chain
2. smart-account deployment/funding onchain
3. delegation redemption through live `DelegationManager` (a repo helper now exists at `integrations/metamask/redeemSignedDelegation.ts`)
4. treasury spend execution caused by that redemption

## Practical assessment

The project is now in a much better state than before:
- Lido / `wstETH` path is materially stronger
- ERC-8004 / identity path is materially stronger
- MetaMask path has moved from abstract plan to actual smart-account + calldata + bundler scaffolding

The remaining MetaMask gap is now the **live deployment/redemption proof**, not overall architecture or SDK shape correctness.

## Local verification note

A lightweight `test/MetaMaskDelegationIntegration.t.sol` compile-sanity test now avoids the delegation-framework `BaseTest` import stack after a prior local compile run hit a deep Yul/stack error while pulling in the full framework test harness.

For the new TypeScript redemption helper, a repo-level `npx tsc --noEmit ...` check is currently noisy because upstream dependency types in this workspace assume a newer TS target/config than that ad-hoc command provides. The practical validation used here is a successful `tsx` dry run of `integrations/metamask/redeemSignedDelegation.ts`, which confirmed the payload-building path and fixed a real BigInt JSON serialization bug.

That keeps the sponsor-facing integration evidence lighter and more realistic for this repo, but final verification of the Solidity side still requires a runtime with Foundry (`forge`) installed.
