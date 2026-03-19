# Base Sepolia Deployment

Chain ID: `84532`
Network: **Base Sepolia**
Deployer / owner / current demo executor: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`

## Deployed contracts

### Mock asset (`wstETH` demo asset)
- Address: `0xD9Fb2C2514beE54d58aBA07d07E09978c87Fe881`
- Deploy tx: `0x780da944a1ef5d365842b767e7ac87fd5e9be054752b00093fc0e963e1c649b4`

### YieldTreasury
- Address: `0x6367B12cee6105fCe90B4532c513605Fc061bF4D`
- Deploy tx: `0xc2f3e379d688a8c55b3be0d69f8c98c14852bbeea4bde6d866d86f31da00315c`

### DelegationAuthorizer
- Address: `0x37CD40aBfE9A20a6f7499499Fbb2CE9273Fbab94`
- Deploy tx: `0x6da710155720f65d513ea70ac2a0438df3b9da647dab108dd3b0295800325f14`

### ReceiptRegistry
- Address: `0xfd408884586ec9953AbF245848A0aa1A4Ca5C88c`
- Deploy tx: `0x4a6bf663da83ba2b395deb64474e601251deab5c96f7827b57e30ca25e25ee88`

## Wiring txs

- `YieldTreasury.setAuthorizer(...)`
  - tx: `0x9af38a55c72a6e0ac7fe224c42ede0aed5347edb267f5a7946ae81e6cab2bb6a`
- `YieldTreasury.setReceiptRegistry(...)`
  - tx: `0xbaa3c6fd2651d69c92ed4cff74e15fa92efdc5f23e961c351f62c060eea86f01`

## Setup txs

`script/SetupDemo.s.sol`

1. Mint 100 demo tokens to deployer
   - tx: `0xf58ac026e0df108476d21193b63a431305f5789af966861f7ecfedc612d8e36d`
2. Approve treasury
   - tx: `0x4af7d9e8e849152f4456076fc8ffa6f89655da377cdfcd89a12929d40ce7b2fc`
3. Deposit 100 as principal
   - tx: `0x20ad52c31eab3ca363591159652dbc01eec898d43c5dc0fef85945aacfeeeeb3`
4. Mint 20 demo tokens to treasury as simulated yield
   - tx: `0xae170a8f162f210428b4f8bc7140921b81038ee4e2954a8e0f814f2d3a01a9cf`
5. Configure root `OPS_BUDGET` with manager = deployer
   - tx: `0x24adcdd44554f971b768f7a871da323e8dc90022e2201f7e2608f4f8b7c72797`
6. Set delegation rule for executor/recipient/selector tuple
   - tx: `0x165a7006970ce096eb61b6f8b056ac35004b0b68b4d64c8839a49874a0ece035`

## Spend tx

`script/SpendFromBudget.s.sol`

- Spend 1 token from `OPS_BUDGET`
- tx: `0x904b71d96d451f3cc74a974d1b5b1ab6a463907e9e9ba3fa821cb5b0e15205fe`

## Current onchain state snapshot

From `script/ReadDemoState.s.sol` after the spend:

- `principalBaseline`: `100e18`
- `availableYield`: `19e18`
- `totalBudgetAllocated` (root budgets only): `10e18`
- `OPS_BUDGET.allocated`: `10e18`
- `OPS_BUDGET.spent`: `1e18`
- `OPS_BUDGET.directSpendableRemaining`: `9e18`
- `OPS_BUDGET.manager`: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`

## Important caveat

This first testnet deployment uses the same address as owner, manager, executor, and recipient for convenience.
For the final hackathon-quality demo, we should separate:
- owner
- budget manager
- executor
- recipient

That will make the delegated-authority story much stronger.
