# Sponsor Compliance Roadmap

Agent Allowance Protocol should be understood as a principal-protected `wstETH` treasury for AI agents, with delegation and receipt infrastructure layered on top.

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

This is now backed by a live same-network Base mainnet proof using real Base mainnet `wstETH`.

### MetaMask Delegations
Current protocol strengths:
- rule-based constrained authority
- wildcard recipient / selector caveat-like behavior
- explicit `ruleId` provenance on receipts
- manager-controlled child budgets, which are a good fit for delegated sub-budget trees
- Base mainnet MetaMask smart-account derivation works in-repo
- bundler-aware smart-account deployment flow works in-repo
- live Base mainnet smart-account deployment + delegation redemption + treasury spend proof now exists

Still missing for full sponsor-native compliance:
- ideally sub-delegation / ERC-7715-aware semantics or an adapter layer

### ERC-8004 / Receipts
Current protocol strengths:
- structured receipts are load-bearing
- receipts store `ruleId`, `evidenceHash`, `resultHash`, and `metadataURI`
- public-safe ERC-8004 manifest/log artifacts now exist under `agent-artifacts/erc8004/`, including root and `.well-known` mirror payloads

Remaining polish for sponsor-native compliance:
- final submission-side UUID/media linkage in the public manifest/log package
- any last compatibility confirmation the hackathon UI expects when the final project entry is published

## What still blocks highest-confidence sponsor fit

### stETH Agent Treasury
The contract design is now backed by a deployment using **real Base mainnet `wstETH`**. The remaining gap is no longer chain selection or asset realism; it is sponsor-story polish and how clearly we present the live proof.

### Best Use of Delegations
The project now has a compelling delegation-shaped core and a live Base mainnet MetaMask proof. The remaining work is presentation polish plus any optional deeper adapter work around sub-delegation / ERC-7715 semantics.

### Agents With Receipts — ERC-8004
The receipt model is strong and the ERC-8004 registration transaction is already recorded; the remaining work is submission-surface polish, not core qualification.

## Best next steps

1. Finalize `agent.json` / `agent_log.json` and tighten the public linkage from the recorded ERC-8004 registration to the live treasury receipts
2. Keep the dashboard, evidence pack, and deployment note aligned with the latest live Base mainnet proof
3. Optionally replace or augment `DelegationAuthorizer` with a more direct MetaMask-framework-compatible adapter if we want an even stronger sponsor-native framing
