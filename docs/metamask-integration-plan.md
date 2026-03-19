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

## Practical implementation path

### Step 1
Add a TS/Node helper module using the MetaMask Smart Accounts Kit / Delegation Toolkit.

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
