# Role-Separated Live Flow

Goal: improve the judge story by separating the operational roles in the live onchain flow.

## Why this matters

The current earliest live Base Sepolia deployments were intentionally simplified by using the same address for multiple roles. That was useful for getting real onchain artifacts quickly, but it is not the cleanest final narrative.

A stronger demo separates:
- **owner** — treasury owner / capital controller
- **manager** — budget manager who controls a root or child budget
- **executor** — actor who actually performs a spend under delegated authority
- **recipient** — the receiver of treasury funds

## Added tooling

The repo now contains a role-separated `wstETH` path:

- `script/DeployMockWstETH.s.sol`
- `script/DeployWstETHTreasury.s.sol`
- `script/SetupRoleSeparatedWstETHDemo.s.sol`
- `script/SpendFromWstETHBudget.s.sol`
- `integrations/setup_role_env.py`

## Intended flow

### Mock/test flow
1. Generate local-only role keys for manager / executor / recipient
2. Wire those addresses into local `.env`
3. Deploy mock `wstETH`
4. Deploy `WstETHYieldTreasury` + `DelegationAuthorizer` + `ReceiptRegistry`
5. Fund executor with Base Sepolia ETH for gas
6. Initialize treasury with owner key:
   - deposit principal
   - raise `stEthPerToken()`
   - configure root budget with manager address
   - set authorization rule for executor -> recipient
7. Execute spend with **executor private key**, not owner key
8. Record resulting tx hashes and update deployment notes

### Final same-network / real-asset flow
1. Deploy `WstETHYieldTreasury` + `DelegationAuthorizer` + `ReceiptRegistry` on the final target network
2. Point `WSTETH_ADDRESS` to the real token address on that same network
3. Run `script/SetupLiveWstETHDemo.s.sol`
4. Deposit principal from the owner wallet
5. Ensure spendable headroom exists above the principal floor:
   - either from real accrued yield already inside the treasury
   - or from an explicit additional `wstETH` transfer to the treasury via `YIELD_TOPUP_WSTETH`
6. Configure the root budget and executor rule
7. Execute spend with **executor private key**, not owner key
8. Record tx hashes and final state snapshot for judges

## Current state

The role-separated deployment/setup/spend tooling is implemented. A generated deployment note now exists at:
- `deployments/base-sepolia-wsteth-role-separated.md`

The current remaining work is not missing code paths; it is evidence curation and final rerun quality:
- copy in the strongest final setup tx hashes with distinct actor addresses called out explicitly
- capture the strongest executor-originated spend tx hash
- attach a final post-spend state snapshot for the judge-facing narrative
- fill the final Base mainnet frontend cutover env with four distinct actor addresses (`FRONTEND_BUDGET_MANAGER`, `FRONTEND_SPEND_RECIPIENT`, `FRONTEND_DEMO_EXECUTOR`, `FRONTEND_DEMO_RECIPIENT`) so the dashboard story does not collapse roles by accident

## Why this helps track fit

This improves the project for:
- **Let the Agent Cook** — clearer multi-role autonomy story
- **Agents With Receipts — ERC-8004** — stronger provenance and actor separation
- **stETH Agent Treasury** — more believable operational control flow
- **Open Track** — better product maturity / demo quality
