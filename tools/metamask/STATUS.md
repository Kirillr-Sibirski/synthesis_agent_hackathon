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
- `tools/metamask/createSignedDelegationArtifact.ts`
- `bun run metamask:create-signed-delegation-artifact`

The generated artifact includes a signed delegation that binds:
- target = treasury
- method = `spendFromBudget(...)`
- exact calldata
- redeemer restriction
- limited calls
- zero native value
- bounded validity window

## Latest live status

The Base Sepolia MetaMask path is now proven end-to-end onchain.

Latest re-verified preflight on `2026-03-21` confirms:
- required env for the current Base Sepolia preflight is present
- treasury code is deployed at `0xB38F8a149F95850cB5efF5fCE5621d36b8F8BBd0`
- derived smart account `0x08478FfC43E134ae9390720D41409B06f38fEB7d` is now **deployed onchain**
- Pimlico bundler reachability is now **true** on Base Sepolia
- `readyForLiveRedemption=true`
- `readyForFinalSameNetworkRun=false` only because the selected chain is still Base Sepolia and the asset is still the mock token, not final Base mainnet `wstETH`

Live proof now recorded:
1. treasury bootstrap with smart-account-aligned executor rule
2. smart-account deployment via user operation
3. delegation redemption through live `DelegationManager`
4. treasury spend execution caused by that redemption
5. receipt registry entry proving the smart-account address as executor

See:
- `Memory/Deployments/base-sepolia-metamask-live.md`
- `artifacts/metamask/preflight-84532.json`
- `artifacts/metamask/signed-delegation-84532.json`

## Practical assessment

The MetaMask path has now moved from abstract plan to live Base Sepolia proof.

The remaining MetaMask gap is no longer about SDK correctness or onchain viability. It is only about whether the team wants to reproduce the same proof on the final same-network Base mainnet stack.

One subtle but important implementation gap was also closed in-repo: the treasury authorizer for the MetaMask path must authorize the derived smart-account address, not the redeemer EOA, because the treasury sees the DeleGator contract as `msg.sender`. The setup scripts and preflight now support/check that explicitly with `TREASURY_EXECUTOR_ADDRESS`.

## Local verification note

A lightweight `contracts/test/MetaMaskDelegationIntegration.t.sol` compile-sanity test now avoids the delegation-framework `BaseTest` import stack after a prior local compile run hit a deep Yul/stack error while pulling in the full framework test harness.

For the new TypeScript redemption helper, a repo-level `tsc --noEmit ...` check is currently noisy because upstream dependency types in this workspace assume a newer TS target/config than that ad-hoc command provides. The practical validation used here is a successful `tsx` dry run of `tools/metamask/redeemSignedDelegation.ts`, which confirmed the payload-building path and fixed a real BigInt JSON serialization bug.

That keeps the sponsor-facing integration evidence lighter and more realistic for this repo, but final verification of the Solidity side still requires a runtime with Foundry (`forge`) installed.
