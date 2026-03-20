# Frontend Dashboard

This is a no-build static dashboard for the hackathon demo.

## Why it exists

The Mar 20 shipping rules made a real frontend mandatory. This dashboard is the fastest path to a usable control surface without introducing a heavy new app stack before the sponsor-complete flow is locked.

## What it currently does

- connect a browser wallet
- switch between Base Sepolia and Base mainnet targets
- load treasury state from `WstETHYieldTreasury`
- inspect budgets by `budgetId`
- set authorizer / receipt registry
- configure budgets
- approve asset + deposit principal
- execute `spendFromBudget(...)`
- inspect receipts in `ReceiptRegistry`
- preview the exact MetaMask delegation spend calldata / hashes

## How to run

From this directory:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Current limitations

- tuned first for the `WstETHYieldTreasury` interface
- currently uses browser-loaded `viem` from esm.sh instead of a bundled framework
- Base Sepolia defaults are prefilled for the existing public prototype
- Base mainnet is the intended final same-network target, but still needs final live deployment addresses and sponsor-complete proofs

## Next frontend upgrades

- add explicit role-separated flow cards (owner / manager / executor / recipient)
- add live tx history panels from deployment notes
- add stronger receipt/provenance visualization
- move to a bundled app stack if needed after the main sponsor-complete path is locked
