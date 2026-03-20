# MetaMask Integration Status

## What works now

- Base Sepolia MetaMask smart-account derivation works
- exact treasury calldata encoding works for `spendFromBudget(...)`
- bundler-aware deployment scaffolding exists
- the repo compiles cleanly alongside the MetaMask delegation-framework after enabling mixed-solc compilation
- runtime scripting is now on Node/CommonJS instead of the more fragile TS path

## Current blocker

The next missing piece is **constructing a real constrained delegation artifact with the installed MetaMask SDK**.

We know conceptually what must be encoded:
- target = treasury
- method = `spendFromBudget(...)`
- exact/tightly-scoped calldata
- redeemer restriction
- limited calls
- validity window

But the exact runtime object shape expected by `createDelegation(...)` and the caveat-builder helpers still needs to be nailed down from the installed SDK. This is now the narrowest remaining blocker before we can generate a real signed delegation artifact.

## Once that blocker is resolved

The path is straightforward:
1. create constrained delegation artifact
2. sign it
3. record artifact in repo / submission materials
4. use bundler-backed smart-account deployment + redemption path for live onchain proof

## Practical assessment

The project is now in a much better state than before:
- Lido / `wstETH` path is materially stronger
- ERC-8004 / identity path is materially stronger
- MetaMask path has moved from abstract plan to actual smart-account + calldata + bundler scaffolding

The remaining MetaMask gap is now **specific SDK-shape correctness**, not overall architecture.
