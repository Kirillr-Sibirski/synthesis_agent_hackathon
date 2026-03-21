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

Latest re-verified preflight on `2026-03-20` confirms:
- required env for the current Base Sepolia preflight is present
- treasury code is deployed at `0xB38F8a149F95850cB5efF5fCE5621d36b8F8BBd0`
- derived smart account is still **not** deployed onchain
- no `BUNDLER_URL` is configured, so bundler reachability is currently false
- the preflight now also reports `readyForFinalSameNetworkRun=false` and explicitly flags that the selected chain is still not Base mainnet

Specifically, we still need:
1. a working bundler endpoint for the selected final chain
2. treasury-authorizer alignment so the treasury allows the derived smart-account address as executor
3. smart-account deployment/funding onchain
4. delegation redemption through live `DelegationManager` (repo helpers now exist at `integrations/metamask/redeemSignedDelegation.ts` and `integrations/metamask/runLiveDelegationFlow.ts`)
5. treasury spend execution caused by that redemption

## Practical assessment

The project is now in a much better state than before:
- Lido / `wstETH` path is materially stronger
- ERC-8004 / identity path is materially stronger
- MetaMask path has moved from abstract plan to actual smart-account + calldata + bundler scaffolding

The remaining MetaMask gap is now the **live deployment/redemption proof**, not overall architecture or SDK shape correctness.

A new one-command helper now exists at `integrations/metamask/runLiveDelegationFlow.ts`, and its `DRY_RUN=true` path was successfully exercised on 2026-03-20. That dry run assembled/saved a signed delegation artifact and the exact redemption payload, while confirming the current blocker is still the undeployed smart account / missing live bundler path.

One subtle but important implementation gap was also closed in-repo: the treasury authorizer for the MetaMask path must authorize the derived smart-account address, not the redeemer EOA, because the treasury sees the DeleGator contract as `msg.sender`. The setup scripts now support that explicitly with `TREASURY_EXECUTOR_ADDRESS`.

## Local verification note

A lightweight `test/MetaMaskDelegationIntegration.t.sol` compile-sanity test now avoids the delegation-framework `BaseTest` import stack after a prior local compile run hit a deep Yul/stack error while pulling in the full framework test harness.

For the new TypeScript redemption helper, a repo-level `npx tsc --noEmit ...` check is currently noisy because upstream dependency types in this workspace assume a newer TS target/config than that ad-hoc command provides. The practical validation used here is a successful `tsx` dry run of `integrations/metamask/redeemSignedDelegation.ts`, which confirmed the payload-building path and fixed a real BigInt JSON serialization bug.

That keeps the sponsor-facing integration evidence lighter and more realistic for this repo, but final verification of the Solidity side still requires a runtime with Foundry (`forge`) installed.
