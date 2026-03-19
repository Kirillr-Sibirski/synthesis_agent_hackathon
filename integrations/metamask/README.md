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

## Why this matters

The project should not just *look* like it uses delegations. It should be provable that MetaMask's real delegation layer is load-bearing in the spend path.
