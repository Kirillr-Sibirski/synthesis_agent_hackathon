# Base Mainnet MetaMask + Lido Live Flow

Chain ID: `8453`
Network: **Base Mainnet**
Date: **2026-03-21**

This note records the live Base mainnet proof for the real bridged `wstETH` treasury path plus the MetaMask Delegation Framework redemption that executed the treasury spend.

## Contracts and actors

- Treasury: `0xe07402f1B072FB1Cc5651E763D2139c1218016C9`
- DelegationAuthorizer: `0x6367B12cee6105fCe90B4532c513605Fc061bF4D`
- ReceiptRegistry: `0xf5741a5d361706CA7cf9348db0fb899e8e7A86Cd`
- Base mainnet `wstETH`: `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452`
- Owner EOA: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- Budget manager: `0x9Ce7984513e36786CC111b087BAD4b3E56E35322`
- Redeemer / delegate EOA: `0x7615D4BB302Ae439aFd83ddcCc9898adB2c7e659`
- Recipient: `0xC318e7fE96a302250CBaB69c6de2E8f476AB3671`
- Derived MetaMask smart account / treasury executor: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- DelegationManager: `0xdb9B1e94B5b69Df7e401DDbedE43491141047dB3`
- Bundler used: Pimlico Base Mainnet

## Treasury deployment txs

1. Deploy patched `WstETHYieldTreasury`
   - tx: `0xb414d2cf45d02578e2868a6656bf67b2fdc50d3d10de12bbd124fa4dfbec3393`
2. Deploy `ReceiptRegistry`
   - tx: `0xf86c506a7c012b090d6f77dcf05472ca03b50784410ff3c59103538ae46f90c1`
3. Set treasury authorizer
   - tx: `0xa3cf788f306c595a471e43a21e3e8f2cc13d5f7cb21715bfe1e7d2c6b62532cf`
4. Set treasury receipt registry
   - tx: `0xa869f77ed53e4a501d395f7e43d1a55289af52d2cab38933fb98a283cc5cf435`

## Live treasury setup txs

1. Approve treasury for principal deposit
   - tx: `0x64489223b0af71ff2e765d214ea1f3c3474fcf3618882f37554821427460fda6`
2. Deposit `3000000000000` raw `wstETH` principal
   - tx: `0x17ba36ba5379b098d364a18060c8429e47a7a030613e49e3afa7684fa37026bf`
3. Transfer `2000000000000` extra `wstETH` yield headroom into treasury
   - tx: `0x99262a197b36161bdd287c820e5238e0f9b354908007cc1bc0c5d2dc437d7ca3`
4. Configure root `OPS_BUDGET` with `1500000000000` allocation
   - tx: `0x7dd6fc6269201093c6aa20fb600d66901fd0457c6f5451d789ad864ed8413c61`
5. Set authorizer rule for executor = MetaMask smart account
   - ruleId: `0x33ebc0a1635c1f36b0831b1005d41f561c6329eeeb47a4e72aea97e80307ed29`
   - tx: `0xdb17fcebdf4b58db7dca43738f12abaaa5e207422f7ff95865e35082cf9f851f`

## MetaMask live proof

1. Delegation redemption + treasury spend
   - tx: `0xb920f46d259fd8608d08c22fc5e8adfc2c1d10b0ee2168a1c27ee294b9d56504`
   - block: `43663891`
   - status: `success`

The current Base mainnet preflight also confirms the MetaMask smart account is already deployed onchain before / during the live proof path.

## Spend / receipt evidence

- budgetId: `0xb3e0fae8b586325ab4a14d8c2d0ed544d80af3db3bc870137bebb448314c0224`
- receiptHash: `0xe724aca208b8d52c3f5e564bd25361b8884887b6537c625a2f53d6d7e20b06ea`
- taskId: `0x950479decd884dc145e75de1402dbb73a7047388630a84fbdaaaad5b531e8be8`
- ruleId: `0x33ebc0a1635c1f36b0831b1005d41f561c6329eeeb47a4e72aea97e80307ed29`
- recorded executor in receipt registry: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- recorded recipient in receipt registry: `0xC318e7fE96a302250CBaB69c6de2E8f476AB3671`
- amount: `1000000000000` raw `wstETH`
- metadataURI: `ipfs://metamask-delegation-spend-base-mainnet-1`

The important sponsor-native proof here is that the receipt registry records the **MetaMask smart-account address** as executor, not the redeemer EOA.

## Post-spend state snapshot

Verified after the redemption:

- `availableYieldInWstETH()`: `1000000000000`
- `remainingBudget(OPS_BUDGET)`: `500000000000`
- `totalBudgetAllocated()`: `1500000000000`
- recipient `wstETH` balance: `2000000000000`
- treasury `receiptRegistry()`: `0xf5741a5d361706CA7cf9348db0fb899e8e7A86Cd`
- smart account deployed: `yes`
- bundler reachable on selected network: `yes`

## L2 `wstETH` implementation note

Base mainnet `wstETH` is a bridged token that does **not** expose the canonical L1 conversion helpers like `getStETHByWstETH(...)`.

Because of that, the treasury was patched to support an L2 fallback mode that protects principal and computes spendable headroom in raw `wstETH` units instead of relying on L1 rate-conversion methods. That is why `principalBaselineStETH()` now reads `0` on this live Base deployment even though the treasury still enforces the raw `wstETH` principal floor correctly.

## Honest interpretation

This closes the strongest remaining Base mainnet proof set:

- real Base mainnet `wstETH`
- real patched treasury deployment
- real authorizer + receipt-registry wiring
- real constrained MetaMask delegation redemption
- real treasury spend caused by that redemption
- real receipt proving the smart-account executor in the spend path

The remaining work after this note is mainly repo/package polish, judge-facing UX cleanup, and keeping the public evidence surfaces synchronized with this live proof.
