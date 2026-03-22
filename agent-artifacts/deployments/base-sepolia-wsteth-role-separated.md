# Base Sepolia Role-Separated `wstETH` Flow

Chain ID: `84532`
Network: **Base Sepolia**

This note preserves the strongest documented role-separated rehearsal path.

## Intended roles
- owner / deployer — treasury controller
- manager — budget manager
- executor — spender key
- recipient — separate receiver address

## What is proven
- dedicated role-separated scripts existed in the pre-cleanup workspace
- dedicated `WstETHYieldTreasury` contracts/tests exist in the kept submission repo
- Sepolia rehearsal deployments were recorded before the repo cleanup

## What is still partial
- a fully curated final executor-originated Sepolia spend note with the strongest tx sequence
- a final post-spend state snapshot packaged specifically for judge review

## Honest interpretation
This is useful archived rehearsal evidence for the role-separated flow, but the strongest sponsor-facing proof remains the Base mainnet recorded path in `agent-artifacts/deployments/base-mainnet-metamask-live.md`.