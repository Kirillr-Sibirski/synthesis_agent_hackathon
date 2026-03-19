# Base Sepolia Deployment (v2)

Chain ID: `84532`
Network: **Base Sepolia**
Status: **latest repo-head-aligned deployment**
Deployer / owner / current demo executor: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`

This deployment supersedes the earlier `base-sepolia.md` deployment and matches the current repo head, including:
- budget-tree allocation semantics
- manager-controlled child budgets
- enriched receipts
- **matched delegation `ruleId` recorded in receipts**

## Contracts

### Mock asset (`wstETH` demo asset, reused)
- Address: `0xD9Fb2C2514beE54d58aBA07d07E09978c87Fe881`

### YieldTreasury
- Address: `0xdA832F7646e0527c16aDda3Bc4b2E265E4892450`
- Deploy tx: `0x47c01f6f3bac67f4b274baa40365dcc9588f356c84cee7bfb2b01f667f711811`

### DelegationAuthorizer
- Address: `0x12c2a7523bC841edB663F01989E972ef480Fa78c`
- Deploy tx: `0xd0097f904c7388724ea45c2fb55cd697bef4c7a6f3fbb64c223c8cf0a73236e1`

### ReceiptRegistry
- Address: `0x6Bda3c9B50DE0111395A1b168D72Ed79EC45eeCb`
- Deploy tx: `0x6ecd28edbd211d93b6614f8deae3579b6a8c5dddc46a88b06481be4301a6f2d9`

## Wiring txs

- `YieldTreasury.setAuthorizer(...)`
  - tx: `0xac5a3522bb2443b4e766d7ec309ba201d3030e30bdb3c1a2a5c8ffd1e582a780`
- `YieldTreasury.setReceiptRegistry(...)`
  - tx: `0xaad2e269092cba95e10c706faebf8a02748146e69cc00529414a7a9ea69462ee`

## Setup txs

`script/SetupDemo.s.sol`

1. Mint 100 demo tokens to deployer
   - tx: `0x0801807bb4c711e96d948be5ae4a022d060588ba28cb99ce192b61d314e3b482`
2. Approve treasury
   - tx: `0x6ed3efb3a7f485122175fc981c9bd7a7ff757a7d216aa63d2fe5c02fef8ceda9`
3. Deposit 100 as principal
   - tx: `0x994993cefd922f5cf3a6ee74700f0acb4c2a0b90a7527a64caa164a992f611c5`
4. Mint 20 demo tokens to treasury as simulated yield
   - tx: `0x5a81506e8ad81ed809c20c7d3647fe328ef54c16963455299c6fc93e311ce6e4`
5. Configure root `OPS_BUDGET` with manager = deployer
   - tx: `0x6a39eaccc8164cbd277baf795c1f732880b55646cde832ba7758b8f52e9071d6`
6. Set delegation rule for executor/recipient/selector tuple
   - tx: `0x3a574ca1afbe3ff31532e60928ab7ec627eb9b2c434105871e6185757b151d28`

## Live spend tx

`script/SpendFromBudget.s.sol`

- Spend 1 token from `OPS_BUDGET`
- tx: `0x91746c08a18f8946758ce24f903116256eec4e7a976eb826057c989a8a2abb71`

## Receipt evidence

The live spend produced a receipt with explicit authorization provenance:

- `receiptHash`: `0x1675e089e66f959833b06b6c503058d4fda53f62715d36d92176427095c95b0b`
- `taskId`: `0xc408ace4033a37ba999b4cb75b0e40ac1e58139e5ee9704aac52e1c819b63235`
- `ruleId`: `0xb56d4562b1973e16677a44ced06d00a94e45f8981edbd0e25c00fa49c2e6c8e8`
- `evidenceHash`: `0x6c94193c44b1a000f25e42fbca582bb38a3c97bd19977d9a70dac40b9d5096f7`
- `resultHash`: `0xe35b4360374319259c148f88c08a6ec8131fbe14240d72b7271e690a694a15b5`
- `metadataURI`: `ipfs://base-sepolia-demo-spend-1`

## Current onchain state snapshot

From `script/ReadDemoState.s.sol` after the live spend:

- `principalBaseline`: `100e18`
- `availableYield`: `19e18`
- `totalBudgetAllocated` (root budgets only): `10e18`
- `OPS_BUDGET.allocated`: `10e18`
- `OPS_BUDGET.spent`: `1e18`
- `OPS_BUDGET.directSpendableRemaining`: `9e18`
- `OPS_BUDGET.manager`: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`

## Remaining polish for final hackathon demo

This deployment still uses the same address as owner, manager, executor, and recipient for speed.
For the final judge-facing demo, we should separate:
- owner
- budget manager
- executor
- recipient

That will make the delegated-sub-budget story much stronger.
