# Base Sepolia Role-Separated `wstETH` Flow

Chain ID: `84532`
Network: **Base Sepolia**

This note records the role-separated `wstETH`-style deployment/setup/spend flow used to improve the live demo story.

## Intended roles

- owner / deployer — treasury controller
- manager — budget manager
- executor — spender key
- recipient — separate receiver address

## 1. Mock `wstETH` deployment

- Deploy MockWstETH: `0x623f9f72342a3c2518c880d8372de90eaef200cd` — tx `0xf6a76113a1afcd79aa0f9ac59e18286c80b0bb6769ac58d792be042d5228bbf8`

## 2. `WstETHYieldTreasury` stack deployment

- Deploy WstETHYieldTreasury: `0xb38f8a149f95850cb5eff5fce5621d36b8f8bbd0` — tx `0xa6f7e18f1dfd8dca2af838a63df922f3610869339bd6ae3ceacf3ea2eb1803a4`
- Deploy DelegationAuthorizer: `0x4434f99f7655f94705217601706536bd94273c2f` — tx `0xa1908eab39da8387039c656c8861655761d1b8a50d5850d2bd4b6dc368aba58f`
- Deploy ReceiptRegistry: `0xea7e65954b7a057f739adc103d3547b9d99aa7f6` — tx `0xf00d643710cd391dc75c8305f40705aaf394ff5ac26b12fa9134f58c93167fc7`
- CALL to `None` — tx `0x5738131e8922dfe737286241df0398c633ba17e46bf61de992be11bb32842b2e`
- CALL to `None` — tx `0x21b236c4243283bafa21144e1c61f9a847ffa5940823feaf5d9eb715877808bd`

## 3. Role-separated setup flow

- Missing

## 4. Executor spend flow

- Missing

## 5. Best-effort chain state snapshot

- Chain state query skipped: missing env values

## Notes

- This flow is intended to improve the live judge story by separating actor roles.
- If any section above is marked missing, the scripts/tooling still exist in the repo and can be rerun/refined.
- This note is generated from local Forge broadcast artifacts plus live best-effort chain queries.
