# Deployment Notes

## Current primary chain
- **Base mainnet**

Why:
- it keeps the Lido-style `wstETH` story, MetaMask delegation flow, ERC-8004 receipts, and judge dashboard on one network
- the strongest recorded public proof now lives on Base mainnet
- Sepolia remains useful only as archived prototype history and low-risk rehearsal space

## Local setup
1. Copy `.env.example` to `.env`
2. Fill in:
   - `PRIVATE_KEY`
   - `BASE_MAINNET_RPC_URL`
   - `WSTETH_ADDRESS`
   - `TREASURY_OWNER`
3. Keep `.env` local only

## Deploy command

```bash
cd contracts && forge script script/DeployWstETHTreasury.s.sol:DeployWstETHTreasuryScript \
  --rpc-url $BASE_MAINNET_RPC_URL \
  --broadcast
```

## Important
- Do **not** commit private keys.
- Keep secrets only in local `.env`.
- The deployer wallet can be the same as owner for first deployment, or owner can be a separate address.
- Current blocker in this environment: `forge` is not installed yet, so scripts are prepared but cannot be broadcast from here until Foundry is available.

## Short-term plan
- local tests first
- validate local env and dashboard config
- deploy treasury stack on Base mainnet
- run the live `wstETH` setup script
- execute the MetaMask delegation redemption + spend flow
- capture tx hashes / receipts for the deployment note and evidence pack

## Current progress
- archived Sepolia prototype runs exist for the early mock-asset and rehearsal path
- live Base mainnet treasury stack is deployed and configured
- live Base mainnet MetaMask smart-account deployment + delegation redemption + spend proof is recorded
- live Base mainnet `wstETH` treasury proof is recorded
- see `Memory/Deployments/base-mainnet-metamask-live.md` for the current addresses and tx hashes

## Same-network path

For the live `wstETH` path, use:
- `contracts/script/DeployWstETHTreasury.s.sol`
- `contracts/script/SetupLiveWstETHDemo.s.sol`
- `contracts/script/SpendFromWstETHBudget.s.sol`

Use `Memory/Deployments/base-mainnet-cutover-template.md` as the single place to record the final same-network run:
- core contract addresses
- role-separated actors
- `wstETH` principal + top-up / accrued-yield proof
- MetaMask smart-account deployment + redemption proof
- live spend / receipt proof
- frontend cutover values for `apps/web/public/config.json`

For the dashboard cutover itself, start from:

```bash
env/base-mainnet-cutover.example.env
```

Copy its values into local `.env`, fill the final Base mainnet fields, and then run:

```bash
bun run frontend:write-config
```

That writes the local `apps/web/public/config.json` from deployment values instead of relying on hand-edited JSON under deadline pressure.

Safety note:
- for Base mainnet reruns, prefer explicit `FRONTEND_*` env values so the helper does not accidentally reuse older deployment addresses from generic env state

Important practical note:
- a fresh principal deposit into `WstETHYieldTreasury` does **not** create immediate spendable yield by itself
- for a near-term live demo, the treasury must already contain headroom above the principal floor, either from real accrued yield or from an explicit additional `wstETH` top-up sent directly to the treasury (`YIELD_TOPUP_WSTETH`)

## Historical / optional deployments
- Base Sepolia for archived rehearsal or low-risk dry runs
- Status Sepolia for gasless bonus
- Celo only if we intentionally extend track scope
