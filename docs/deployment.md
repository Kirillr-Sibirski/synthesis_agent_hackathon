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
forge script script/Deploy.s.sol:DeployScript \
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
- see `deployments/base-sepolia-v2.md` for the latest addresses and tx hashes

## Same-network upgrade path

The current public prototype proofs are on Base Sepolia, but the final no-compromise thesis now targets **Base mainnet** so that:
- ERC-8004 identity, real `wstETH`, and the final sponsor story all live on one network
- the frontend can demonstrate one coherent environment instead of a split testnet/mainnet narrative

For the live `wstETH` path, use:
- `script/DeployWstETHTreasury.s.sol`
- `script/SetupLiveWstETHDemo.s.sol`
- `script/SpendFromWstETHBudget.s.sol`

Important practical note:
- a fresh principal deposit into `WstETHYieldTreasury` does **not** create immediate spendable yield by itself
- for a near-term live demo, the treasury must already contain headroom above the principal floor, either from real accrued yield or from an explicit additional `wstETH` top-up sent directly to the treasury (`YIELD_TOPUP_WSTETH`)

## Possible next deployments later
- Status Sepolia for gasless bonus
- Celo only if we intentionally extend track scope
