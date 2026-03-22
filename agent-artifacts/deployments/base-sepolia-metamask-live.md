# Base Sepolia MetaMask Live Flow

Chain ID: `84532`
Network: **Base Sepolia**
Date: **2026-03-21**

This note records the live MetaMask smart-account deployment and delegation redemption proof for the current Base Sepolia prototype.

## Contracts and actors

- Treasury: `0xB38F8a149F95850cB5efF5fCE5621d36b8F8BBd0`
- DelegationAuthorizer: `0x4434F99f7655F94705217601706536Bd94273c2F`
- ReceiptRegistry: `0xEa7E65954B7A057f739AdC103D3547b9D99aa7f6`
- Mock `wstETH`: `0x623f9f72342a3c2518c880d8372de90eaef200cd`
- Owner / redeemer EOA: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- Derived MetaMask smart account / treasury executor: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- DelegationManager: `0xdb9B1e94B5b69Df7e401DDbedE43491141047dB3`
- Bundler used: Pimlico Base Sepolia

## Treasury bootstrap txs

These txs reinitialized the current Base Sepolia `wstETH` prototype so the MetaMask flow had a live budget and a rule that authorizes the smart-account address as executor:

1. Approve treasury for mock `wstETH`
   - tx: `0x03060b946531319749844865d7e6b2ae262f319bfb6feddb59146de5062afc81`
2. Deposit `100 wstETH` as principal
   - tx: `0xdf6f80fe10c014917fd002ab8aa4502be16104bd4bd0512cc386c280483f4c4b`
3. Raise mock `stEthPerToken` to `1.2`
   - tx: `0x1ae3d5f57fcf287abda072863818e3b60ef459a177d6ed016e596c587aa01eda`
4. Mint `10 wstETH` directly to treasury as extra yield headroom
   - tx: `0x2dfdf3c67d99f0506d28e7b1a4ff8b5967e09fc2ea2f029c9dc4c461d1e9ed39`
5. Configure root `OPS_BUDGET` with `10 wstETH` allocation
   - tx: `0x0e26054c43c558eeb4f9b0d88767042f1c172baf27e09296e267f4239af1d0fd`
6. Set authorizer rule for executor = MetaMask smart account
   - ruleId: `0xc70c6c881e1aee68b9f730cd779a23003e1671d47d67616d43f90f429af35327`
   - tx: `0xf057af2857fd3451103d609b8514e0918c52aa93c3d749ad26030a978bd0d1dd`

## MetaMask live proof txs

1. Smart-account deployment via user operation
   - userOperationHash: `0xaf927c0b77b8a62994b92239d23c19215b78a171b2df39edd646d4eacfcad255`
   - tx: `0x198b435a11addf820c393d31d75fca27ffa274fb85098fede06b7c5858f8ce6e`
2. Delegation redemption + treasury spend
   - tx: `0x56f401451d9a754b4c855c8e724685cf39590a40c229dbd6485c4cfd1a2c9b78`
   - block: `39170727`
   - status: `success`

## Spend / receipt evidence

- budgetId: `0xb3e0fae8b586325ab4a14d8c2d0ed544d80af3db3bc870137bebb448314c0224`
- receiptHash: `0x1cc59ae0671f490688e89a8605546e8f964f2bca7509da1b172a1380642cff2f`
- taskId: `0xba5a17f3336b16502b047d09824b23157e58c70aa8def0d7feafd248069ac260`
- ruleId: `0xc70c6c881e1aee68b9f730cd779a23003e1671d47d67616d43f90f429af35327`
- recorded executor in receipt registry: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- recorded recipient in receipt registry: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- amount: `1 wstETH`
- metadataURI: `ipfs://metamask-delegation-spend-1`

The important sponsor-native proof here is that the receipt registry records the **MetaMask smart-account address** as executor, not the redeemer EOA.

## Post-spend state snapshot

Verified after the redemption:

- `remainingBudget(OPS_BUDGET)`: `9 wstETH`
- `availableYieldInWstETH()`: `25.666666666666666667 wstETH`
- recipient mock `wstETH` balance: `1 wstETH`
- smart account deployed: `yes`
- bundler reachable on selected network: `yes`

## Honest interpretation

This closes the strongest missing **Base Sepolia** MetaMask proof:

- real smart-account deployment
- real constrained delegation artifact
- real delegation redemption
- real treasury spend caused by that redemption
- real receipt proving the smart-account executor in the spend path

What it does **not** close yet:

- the final same-network **Base mainnet** thesis
- the Lido track's requirement for real `wstETH` on the final accepted live network
