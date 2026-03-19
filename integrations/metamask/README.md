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
- create/deploy a MetaMask DeleGator smart account on Base Sepolia
- bind treasury permissions to that smart account
- redeem the delegation through the live DelegationManager
- record the resulting treasury spend + receipt tx hashes

## Why this matters

The project should not just *look* like it uses delegations. It should be provable that MetaMask's real delegation layer is load-bearing in the spend path.
