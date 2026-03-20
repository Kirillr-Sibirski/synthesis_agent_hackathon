# Frontend Dashboard

This is a no-build static dashboard for the hackathon demo.

## Why it exists

The Mar 20 shipping rules made a real frontend mandatory. This dashboard is the fastest path to a usable control surface without introducing a heavy new app stack before the sponsor-complete flow is locked.

## What it currently does

- connect a browser wallet
- switch between Base Sepolia and Base mainnet targets
- show an explicit same-network status banner for prototype vs final target mode
- load treasury state from `WstETHYieldTreasury`
- inspect budgets by `budgetId`
- set authorizer / receipt registry
- configure budgets
- approve asset + deposit principal
- execute `spendFromBudget(...)`
- inspect receipts in `ReceiptRegistry`
- preview the exact MetaMask delegation spend calldata / hashes
- inspect a saved MetaMask signed-delegation, live-flow, preflight, or combined final same-network readiness JSON artifact
- hydrate the relevant dashboard fields from loaded artifact JSON so judges can move from a saved MetaMask artifact into the onchain inspection / spend-intent flow without hand-copying hashes and addresses
- persist the loaded MetaMask artifact in dashboard state so the role-separated story can reference the linked smart-account / redeemer / recipient data correctly
- build a role-separated owner / manager / executor / recipient summary from the current dashboard state
- build an honest qualification / readiness summary showing current chain selection, loaded artifact readiness flags, and remaining blockers for the final same-network sponsor run

## How to run

From this directory:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Configuring final deployments

The dashboard now supports an optional local `config.json` in this directory.

Manual path:
1. Copy `config.example.json` to `config.json`
2. Fill in the final Base mainnet deployment addresses
3. Keep `config.json` local-only (it is gitignored)

Scripted path:
1. Start from `env/base-mainnet-cutover.example.env`
2. Fill local `.env` with the final deployment values
3. For Base mainnet cutover, prefer explicit `FRONTEND_*` vars (for example `FRONTEND_TREASURY_ADDRESS`, `FRONTEND_AUTHORIZER_ADDRESS`, `FRONTEND_RECEIPT_REGISTRY_ADDRESS`, `FRONTEND_ASSET_ADDRESS`, `FRONTEND_DEMO_EXECUTOR`, `FRONTEND_DEMO_RECIPIENT`, `FRONTEND_RECEIPT_HASH`)
4. Set `FRONTEND_CHAIN=base`
5. Run:

```bash
npm run frontend:write-config
```

Then validate it with:

```bash
FRONTEND_VALIDATION_OUT=artifacts/frontend/validation.json \
METAMASK_PREFLIGHT_PATH=artifacts/metamask/preflight-84532.json \
  npm run frontend:validate-config
```

And combine that with the MetaMask readiness artifact into one go/no-go report:

```bash
FINAL_READINESS_OUT=artifacts/final/same-network-readiness.json \
METAMASK_PREFLIGHT_PATH=artifacts/metamask/preflight-84532.json \
FRONTEND_VALIDATION_PATH=artifacts/frontend/validation.json \
  npm run final:validate-same-network
```

Or refresh the whole bundle in one ordered command:

```bash
PREFLIGHT_OUT=artifacts/metamask/preflight-84532.json \
FRONTEND_VALIDATION_OUT=artifacts/frontend/validation.json \
FINAL_READINESS_OUT=artifacts/final/same-network-readiness.json \
  npm run final:refresh-readiness-bundle
```

This writes `frontend/config.json` locally and gives you machine-checkable same-network dashboard + final-run readiness reports, so moving from prototype addresses to the live deployment does not require editing app code.

## Validation notes

- `node --check frontend/app.js` now passes after tightening the MetaMask artifact inspector wiring and helper logic.
- The artifact inspector now safely handles both saved signed-delegation artifacts and the richer `run-live-flow` output shape.

## Current limitations

- tuned first for the `WstETHYieldTreasury` interface
- currently uses browser-loaded `viem` from esm.sh instead of a bundled framework
- Base Sepolia defaults are prefilled for the existing public prototype
- Base mainnet is the intended final same-network target, but still needs final live deployment addresses and sponsor-complete proofs

## Next frontend upgrades

- add explicit role-separated flow cards (owner / manager / executor / recipient)
- add live tx history panels from deployment notes
- add stronger receipt/provenance visualization
- surface saved MetaMask delegation artifacts / live-flow outputs in the UI
- move to a bundled app stack if needed after the main sponsor-complete path is locked
