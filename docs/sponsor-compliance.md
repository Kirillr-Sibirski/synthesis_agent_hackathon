# Sponsor Compliance Roadmap

## Strongest compliance path

The project should be understood as three layers:

1. **Lido / wstETH capital primitive**
2. **MetaMask-style delegated authority primitive**
3. **ERC-8004 / receipt / manifest trust layer**

## What is proven vs pending

### Lido
We now have a dedicated `WstETHYieldTreasury` contract that models `wstETH` correctly:
- principal is tracked in **stETH-equivalent terms**
- yield accrues through the changing `stEthPerToken()` rate
- available yield is exposed in both **stETH** and **wstETH** terms
- spend checks ensure the treasury cannot cross below the current principal floor in `wstETH`
- slash/rate-drop scenarios are explicitly tested

This is much closer to real Lido compliance than the older generic treasury model, but the strongest live proof still needs the final same-network deployment.

### MetaMask Delegations
Current protocol strengths:
- rule-based constrained authority
- wildcard recipient / selector caveat-like behavior
- explicit `ruleId` provenance on receipts
- manager-controlled child budgets, which are a good fit for delegated sub-budget trees
- Base Sepolia MetaMask smart-account derivation now works in-repo
- bundler-aware smart-account deployment scaffolding now exists in-repo

Still missing for full sponsor-native compliance:
- live deployment/use of the MetaMask smart account on Base Sepolia
- integration with the **actual MetaMask Delegation Framework** in the spend path rather than only a local analogue
- ideally sub-delegation / ERC-7715-aware semantics or an adapter layer
- working bundler endpoint for user-op execution

### ERC-8004 / Receipts
Current protocol strengths:
- structured receipts are load-bearing
- receipts store `ruleId`, `evidenceHash`, `resultHash`, and `metadataURI`
- `agent.json` and `agent_log.json` drafts exist in `submission/`

Still missing for full sponsor-native compliance:
- final public linkage from the completed ERC-8004 registration to the manifest/log package
- real manifest compatibility confirmation with the relevant registry / format

## What still blocks highest-confidence sponsor fit

### stETH Agent Treasury
The contract design is now much more correct for `wstETH`, but the current live demo still relies on a test asset / testnet environment. To be fully compliant with the Lido track we still need a deployment using **real wstETH on an accepted L2 or mainnet**.

### Best Use of Delegations
The project now has a compelling delegation-shaped core, but still needs the live MetaMask framework redemption proof to be maximally credible.

### Agents With Receipts — ERC-8004
The receipt model is strong, but we still need actual identity / registry integration.

## Best next steps

1. Deploy `WstETHYieldTreasury` against real `wstETH` on an accepted network
2. Replace or augment `DelegationAuthorizer` with a MetaMask-framework-compatible adapter
3. Finalize `agent.json` / `agent_log.json` and tighten the public linkage from the recorded ERC-8004 registration to the live treasury receipts
4. Run a fresh live spend on the sponsor-native stack and update deployment records
