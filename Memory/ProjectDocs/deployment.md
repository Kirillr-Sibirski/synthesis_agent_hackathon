# Deployment Notes

## Recommended initial chain
- **Base Sepolia**

Why:
- best fit with the hackathon's Base / ERC-8004 gravity
- simple testnet demo path
- good stepping stone before any mainnet deployment

## Local setup
1. Copy `.env.example` to `.env`
2. Fill in:
   - `PRIVATE_KEY`
   - `BASE_SEPOLIA_RPC_URL`
   - `WSTETH_ADDRESS`
   - `TREASURY_OWNER`
3. Keep `.env` local only

## Deploy command

```bash
cd contracts && forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast
```

## Important
- Do **not** commit private keys.
- Keep secrets only in local `.env`.
- The deployer wallet can be the same as owner for first deployment, or owner can be a separate address.
- Current blocker in this environment: `forge` is not installed yet, so scripts are prepared but cannot be broadcast from here until Foundry is available.

## Short-term plan
- local tests first
- deploy mock asset on Base Sepolia
- deploy treasury stack on Base Sepolia
- run setup demo script
- exercise budget configuration and spend flow
- capture tx hashes / receipts for demo

## Current progress
- mock asset deployed on Base Sepolia
- initial treasury stack deployed on Base Sepolia
- upgraded treasury stack redeployed on Base Sepolia to match latest repo head
- setup script executed on the upgraded stack
- live spend + receipt executed on the upgraded stack
- see `Memory/Deployments/base-sepolia-v2.md` for the latest addresses and tx hashes

## Same-network upgrade path

The current public prototype proofs are on Base Sepolia, but the final no-compromise thesis now targets **Base mainnet** so that:
- ERC-8004 identity, real `wstETH`, and the final sponsor story all live on one network
- the frontend can demonstrate one coherent environment instead of a split testnet/mainnet narrative

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
- for Base mainnet cutover, prefer explicit `FRONTEND_*` env values so the helper does not accidentally reuse Base Sepolia deployment addresses from older generic env state

Important practical note:
- a fresh principal deposit into `WstETHYieldTreasury` does **not** create immediate spendable yield by itself
- for a near-term live demo, the treasury must already contain headroom above the principal floor, either from real accrued yield or from an explicit additional `wstETH` top-up sent directly to the treasury (`YIELD_TOPUP_WSTETH`)

## Possible next deployments later
- Status Sepolia for gasless bonus
- Celo only if we intentionally extend track scope
