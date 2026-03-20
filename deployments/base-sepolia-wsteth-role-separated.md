# Base Sepolia Role-Separated `wstETH` Flow

Chain ID: `84532`
Network: **Base Sepolia**

This note records the strongest currently documented role-separated `wstETH`-style deployment/setup/spend path and makes the remaining gaps explicit.

## Intended roles

- owner / deployer — treasury controller
- manager — budget manager
- executor — spender key
- recipient — separate receiver address

## Current evidence level

**What is proven in-repo now**
- dedicated role-separated scripts exist
- dedicated `WstETHYieldTreasury` contracts/tests exist
- live Base Sepolia deployment transactions for the `wstETH`-style stack are recorded
- local-only role-key wiring helper exists at `integrations/setup_role_env.py`

**What is not yet proven in this note**
- final curated onchain setup tx hashes showing the manager/executor/recipient addresses in the exact strongest judge-facing sequence
- final curated executor-originated spend tx hash from the role-separated `wstETH` path
- final post-spend state snapshot from chain

So this file should be read as: **deployment proof exists; full role-separated execution proof is partially documented and still needs one more curation pass.**

## Script path used for this flow

- `script/DeployMockWstETH.s.sol`
- `script/DeployWstETHTreasury.s.sol`
- `script/SetupRoleSeparatedWstETHDemo.s.sol`
- `script/SpendFromWstETHBudget.s.sol`
- `script/ReadDemoState.s.sol`

## 1. Mock `wstETH` deployment

- Deploy MockWstETH: `0x623f9f72342a3c2518c880d8372de90eaef200cd`
- tx: `0xf6a76113a1afcd79aa0f9ac59e18286c80b0bb6769ac58d792be042d5228bbf8`

## 2. `WstETHYieldTreasury` stack deployment

- Deploy WstETHYieldTreasury: `0xB38F8a149F95850cB5efF5fCE5621d36b8F8BBd0`
  - tx: `0xa6f7e18f1dfd8dca2af838a63df922f3610869339bd6ae3ceacf3ea2eb1803a4`
- Deploy DelegationAuthorizer: `0x4434F99f7655F94705217601706536Bd94273c2F`
  - tx: `0xa1908eab39da8387039c656c8861655761d1b8a50d5850d2bd4b6dc368aba58f`
- Deploy ReceiptRegistry: `0xEa7E65954B7A057f739AdC103D3547b9D99aa7f6`
  - tx: `0xf00d643710cd391dc75c8305f40705aaf394ff5ac26b12fa9134f58c93167fc7`
- Treasury wiring calls:
  - tx: `0x5738131e8922dfe737286241df0398c633ba17e46bf61de992be11bb32842b2e`
  - tx: `0x21b236c4243283bafa21144e1c61f9a847ffa5940823feaf5d9eb715877808bd`

## 3. Intended role-separated setup transaction content

The setup script is implemented and is expected to do the following with distinct actor addresses from env:

1. mint mock `wstETH` to owner
2. approve treasury
3. deposit `100 ether` principal
4. raise `stEthPerToken` to `1.2 ether` to simulate yield accrual
5. configure root budget `OPS_BUDGET`
6. assign `manager` as the budget manager
7. install an authorization rule allowing only:
   - `executor`
   - budget = `OPS_BUDGET`
   - recipient = `recipient`
   - selector = `spendFromBudget(...)`
   - max amount = `10 ether`

Expected identifiers from script logic:
- `budgetId = keccak256("OPS_BUDGET")`
- `ruleId = keccak256(abi.encode(executor, budgetId, recipient, spendFromBudget.selector))`

**Documentation status:** script is present, but the exact final setup tx hash set still needs curation into this note.

## 4. Intended executor spend transaction content

The executor spend script is implemented and is expected to:
- broadcast with `EXECUTOR_PRIVATE_KEY`
- call `spendFromBudget(...)` on treasury
- spend `1 ether`
- use deterministic task/receipt/evidence/result hashes
- write metadata URI `ipfs://wsteth-role-separated-spend-1`

**Documentation status:** the final curated live executor tx hash is still missing from this note.

## 5. Judge-facing interpretation

Once the final setup/spend tx set is curated, this path gives a much stronger sponsor story than the single-actor prototype because it cleanly separates:
- capital control
- budget management
- execution authority
- fund receipt

That improves the project most directly for:
- **Agents With Receipts — ERC-8004**
- **Let the Agent Cook**
- **stETH Agent Treasury**
- **Synthesis Open Track**

## 6. Remaining blocker to close

The code path is ready, but the docs still need the final strongest onchain tx set to be copied here after a clean rerun or curated from local/private records.

Until that curation is done, treat this as **partial role-separated live proof**, not full completion.
