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

The remaining MetaMask blocker is now the **live onchain redemption path**, not SDK shape correctness.

Specifically, we still need:
1. a working Base Sepolia bundler endpoint
2. smart-account deployment/funding onchain
3. delegation redemption through live `DelegationManager`
4. treasury spend execution caused by that redemption

## Practical assessment

The project is now in a much better state than before:
- Lido / `wstETH` path is materially stronger
- ERC-8004 / identity path is materially stronger
- MetaMask path has moved from abstract plan to actual smart-account + calldata + bundler scaffolding

The remaining MetaMask gap is now **specific SDK-shape correctness**, not overall architecture.
