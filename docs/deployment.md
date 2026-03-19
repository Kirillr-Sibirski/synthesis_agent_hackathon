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

## Possible next deployments later
- Status Sepolia for gasless bonus
- Base mainnet for stronger onchain artifact
- Celo only if we intentionally extend track scope
