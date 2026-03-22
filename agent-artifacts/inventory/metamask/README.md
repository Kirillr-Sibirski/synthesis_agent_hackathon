# MetaMask Integration Workspace

This folder preserves the judge-facing notes for the real MetaMask Delegation Framework path used by Agent Allowance Protocol.

## What is proven

- MetaMask smart-account derivation worked for the live flow.
- The treasury executor for the sponsor-native path is the derived smart account, not the redeemer EOA.
- A constrained delegation artifact was prepared for `spendFromBudget(...)`.
- The live Base mainnet delegation redemption + treasury spend proof is recorded in:
  - `agent-artifacts/deployments/base-mainnet-metamask-live.md`

## Important alignment rule

For the MetaMask flow:
- `DEMO_EXECUTOR` = redeemer EOA
- `TREASURY_EXECUTOR_ADDRESS` = MetaMask smart-account / DeleGator address seen by the treasury as `msg.sender`

If those collapse incorrectly, the sponsor-native MetaMask story is no longer honest.

## Public evidence references

- `agent-artifacts/project-docs/metamask-integration-plan.md`
- `agent-artifacts/evidence/metamask/preflight-8453.json`
- `agent-artifacts/evidence/metamask/preflight-84532.json`
- `agent-artifacts/evidence/metamask/signed-delegation-84532.json`
- `agent-artifacts/deployments/base-mainnet-metamask-live.md`

## Repo note

The public submission cleanup removed the old private/local scripting workspace from the repo root. This folder keeps the proof narrative and evidence index that judges need.