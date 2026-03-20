# MetaMask Integration Plan

Goal: replace the local `DelegationAuthorizer`-only story with an **actual MetaMask Smart Accounts Kit / Delegation Framework** path.

## Why this matters

Our current authorizer is a strong protocol prototype, but for the MetaMask track we need to prove that delegated authority comes from the real MetaMask framework, not just a locally defined allowlist system.

## Target architecture

### Onchain core
- `WstETHYieldTreasury` (or `YieldTreasury` for generic path)
- receipt registry
- budget tree

### MetaMask layer
- MetaMask smart account / delegator account
- root delegation from owner to budget manager or executor
- redelegation / subdelegation for child-budget flows if feasible
- redemption path that ultimately triggers treasury spend execution

## Desired story

1. Human controls a MetaMask smart account
2. Human grants a constrained delegation
3. Delegation maps to a treasury budget or child budget
4. Delegate redeems the delegation and executes a treasury spend
5. Treasury records receipt including the matched authorization provenance

## Critical implementation note discovered during integration

The real MetaMask Delegation Framework cannot execute our treasury flow from a plain EOA-origin delegation alone.

Why:
- `DelegationManager.redeemDelegations(...)` ultimately calls `executeFromExecutor(...)` on the **delegator**
- that means the delegator must be a contract implementing `IDeleGatorCore`
- in practice, for sponsor-native qualification, we need a real MetaMask **DeleGator / smart account** in the flow

Implication:
- a simple EOA-signed delegation artifact is not enough to prove the track in the strongest way
- the correct path is:
  - derive and then deploy a MetaMask DeleGator smart account on Base Sepolia
  - create/sign delegation from that account
  - redeem delegation through `DelegationManager`
  - have the DeleGator execute the treasury spend

Current progress:
- the repo now derives a real Base Sepolia MetaMask smart-account address successfully via `npm run metamask:derive-smart-account`
- the repo now also prepares exact treasury spend calldata via `npm run metamask:encode-treasury-spend`
- bundler-aware deployment scaffolding exists via `npm run metamask:deploy-smart-account`
- the repo now emits a concrete delegation-preparation artifact via `npm run metamask:prepare-delegation-artifact`
- that artifact now derives the treasury selector directly from the encoded calldata and includes the concrete Base Sepolia enforcer addresses for AllowedTargets / ExactCalldata / Redeemer / LimitedCalls
- next step is deploying/using that DeleGator in the live treasury flow once a Base Sepolia bundler endpoint is available

## Practical implementation path

### Step 1
Add a TS/Node helper module using the MetaMask Smart Accounts Kit / Delegation Toolkit.

**Status:** in progress — the repo now includes:
- `@metamask/smart-accounts-kit`
- vendored `lib/delegation-framework`
- `tsconfig.json`
- `integrations/metamask/`

### Step 2
Create a proof-of-life flow:
- create delegator account
- create delegation
- store delegation artifact
- redeem delegation
- execute a treasury action

### Step 3
Connect delegation metadata to treasury budget IDs so the budget tree and the delegation chain tell the same story.

## Non-negotiable evidence

To count as strong MetaMask compliance, we should have:
- real toolkit usage in code
- delegation creation proof
- redemption proof
- treasury action caused by that redemption
- README section documenting it
