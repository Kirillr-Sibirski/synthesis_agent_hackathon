# Deployed Addresses and Transactions

## Base Mainnet (`8453`)

### Contracts
- Treasury: `0xe07402f1B072FB1Cc5651E763D2139c1218016C9`
- DelegationAuthorizer: `0x6367B12cee6105fCe90B4532c513605Fc061bF4D`
- ReceiptRegistry: `0xf5741a5d361706CA7cf9348db0fb899e8e7A86Cd`
- Base mainnet `wstETH`: `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452`

### Actors
- Owner EOA: `0xF6D413920c3dfE8c4195bDC7fDa9cE3bb316e948`
- Budget manager: `0x9Ce7984513e36786CC111b087BAD4b3E56E35322`
- MetaMask smart account / executor: `0x08478FfC43E134ae9390720D41409B06f38fEB7d`
- Redeemer / delegate EOA: `0x7615D4BB302Ae439aFd83ddcCc9898adB2c7e659`
- Recipient: `0xC318e7fE96a302250CBaB69c6de2E8f476AB3671`
- DelegationManager: `0xdb9B1e94B5b69Df7e401DDbedE43491141047dB3`

### Deployment / setup transactions
- Treasury deploy: `0xb414d2cf45d02578e2868a6656bf67b2fdc50d3d10de12bbd124fa4dfbec3393`
- ReceiptRegistry deploy: `0xf86c506a7c012b090d6f77dcf05472ca03b50784410ff3c59103538ae46f90c1`
- Set authorizer: `0xa3cf788f306c595a471e43a21e3e8f2cc13d5f7cb21715bfe1e7d2c6b62532cf`
- Set receipt registry: `0xa869f77ed53e4a501d395f7e43d1a55289af52d2cab38933fb98a283cc5cf435`
- Approve treasury for principal: `0x64489223b0af71ff2e765d214ea1f3c3474fcf3618882f37554821427460fda6`
- Principal deposit: `0x17ba36ba5379b098d364a18060c8429e47a7a030613e49e3afa7684fa37026bf`
- Yield headroom top-up: `0x99262a197b36161bdd287c820e5238e0f9b354908007cc1bc0c5d2dc437d7ca3`
- Root budget configure: `0x7dd6fc6269201093c6aa20fb600d66901fd0457c6f5451d789ad864ed8413c61`
- Authorizer rule set: `0xdb17fcebdf4b58db7dca43738f12abaaa5e207422f7ff95865e35082cf9f851f`
- Live delegation redemption + spend: `0xb920f46d259fd8608d08c22fc5e8adfc2c1d10b0ee2168a1c27ee294b9d56504`

### Receipt / spend proof
- Budget ID: `0xb3e0fae8b586325ab4a14d8c2d0ed544d80af3db3bc870137bebb448314c0224`
- Rule ID: `0x33ebc0a1635c1f36b0831b1005d41f561c6329eeeb47a4e72aea97e80307ed29`
- Receipt hash: `0xe724aca208b8d52c3f5e564bd25361b8884887b6537c625a2f53d6d7e20b06ea`
- Task ID: `0x950479decd884dc145e75de1402dbb73a7047388630a84fbdaaaad5b531e8be8`
- Amount: `1000000000000` raw `wstETH`
- Metadata URI: `ipfs://metamask-delegation-spend-base-mainnet-1`

## Base Sepolia (`84532`)

### Contracts
- Treasury: `0xB38F8a149F95850cB5efF5fCE5621d36b8F8BBd0`
- DelegationAuthorizer: `0x4434F99f7655F94705217601706536Bd94273c2F`
- ReceiptRegistry: `0xEa7E65954B7A057f739AdC103D3547b9D99aa7f6`
- Mock `wstETH`: `0x623f9f72342a3c2518c880d8372de90eaef200cd`

### Key proof transactions
- Smart-account deploy tx: `0x198b435a11addf820c393d31d75fca27ffa274fb85098fede06b7c5858f8ce6e`
- Smart-account userOp hash: `0xaf927c0b77b8a62994b92239d23c19215b78a171b2df39edd646d4eacfcad255`
- Delegation redemption + spend: `0x56f401451d9a754b4c855c8e724685cf39590a40c229dbd6485c4cfd1a2c9b78`
- Receipt hash: `0x1cc59ae0671f490688e89a8605546e8f964f2bca7509da1b172a1380642cff2f`

## Source records
- `deployments/base-mainnet-metamask-live.md`
- `deployments/base-sepolia-metamask-live.md`