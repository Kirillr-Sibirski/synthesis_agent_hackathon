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

## Current state

The role-separated deployment/setup/spend tooling is implemented. The remaining work is to cleanly verify and record the latest live tx hashes/state snapshot in a dedicated deployment note.

## Why this helps track fit

This improves the project for:
- **Let the Agent Cook** — clearer multi-role autonomy story
- **Agents With Receipts — ERC-8004** — stronger provenance and actor separation
- **stETH Agent Treasury** — more believable operational control flow
- **Open Track** — better product maturity / demo quality
