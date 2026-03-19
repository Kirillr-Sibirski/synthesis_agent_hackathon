# Human–Agent Collaboration Log

This is a curated build log for the Synthesis submission. It summarizes the collaboration process that led to the current prototype and points to concrete code, tests, and onchain artifacts.

## Phase 1 — Track research and competitive analysis

- Reviewed the Synthesis prize surface and catalog.
- Compared visible competition across relevant tracks.
- Narrowed the strongest opportunity area to Lido + MetaMask Delegations + receipts / ERC-8004-adjacent accountability.
- Rejected several weaker alternatives as primary anchors, including Filecoin-first, generic Celo agent, and Bankr-first approaches.

## Phase 2 — Project direction selection

- Evaluated multiple candidate concepts:
  - delegated yield treasury
  - delegated subagent budget tree
  - private treasury policy compiler
  - vault sentinel with escalating authority
  - Filecoin-backed receipt/state layer
- Chose the final direction:
  - **Delegated Yield Treasury with Receipt-Gated Sub-Budgets**

## Phase 3 — Architecture design

- Specified a contract system with three main pieces:
  - `YieldTreasury`
  - `DelegationAuthorizer`
  - `ReceiptRegistry`
- Defined the key protocol constraints:
  - principal baseline is protected
  - only yield is spendable
  - budgets constrain operating capital
  - delegated rules constrain execution
  - receipts record machine-readable evidence

## Phase 4 — Foundry setup and initial implementation

- Set up the repo as a Foundry project.
- Added Solidity sources, tests, and deployment scripts.
- Installed Foundry inside the VPS environment.
- Installed `forge-std` and enabled `via_ir` where needed for compilation.

## Phase 5 — Protocol hardening

The protocol evolved from a simple treasury to a more novel primitive:

- wildcard delegation rules for recipient and selector matching
- rule revocation support
- manager-controlled child budgets
- parent/child budget reservation semantics
- non-double-counted root allocation
- enriched receipt fields (`evidenceHash`, `resultHash`, `metadataURI`)
- explicit `ruleId` provenance embedded in receipts

## Phase 6 — Testing

Built a Foundry test suite covering:

- principal baseline behavior
- yield accounting
- unauthorized and over-budget spends
- duplicate and empty receipt rejection
- inactive budgets
- wildcard delegation rules
- rule expiry and revocation
- parent/child budget constraints
- manager-created child budgets
- receipt recording correctness

Current status at repo head:
- **23 / 23 tests passing**

## Phase 7 — First live Base Sepolia deployment

Deployed:
- mock asset
- treasury
- authorizer
- receipt registry

Executed:
- setup script
- budget configuration
- rule creation
- first live spend

This produced the initial onchain artifact set recorded in `deployments/base-sepolia.md`.

## Phase 8 — Repo-head-aligned Base Sepolia redeploy

After upgrading the protocol to include explicit rule-linked receipts, redeployed the latest code to Base Sepolia.

Deployed:
- upgraded treasury
- upgraded authorizer
- upgraded receipt registry

Executed:
- fresh setup flow
- live spend on upgraded contracts
- live receipt that includes `ruleId`

This produced the latest onchain artifact set recorded in `deployments/base-sepolia-v2.md`.

## Human contributions

The human:
- prioritized the overall hackathon strategy
- guided the sponsor-selection discussion
- chose the general direction toward a low-level smart contract primitive
- requested Base Sepolia deployment
- provided deployment access / VPS authority / testnet funds
- set the priority order: build core protocol first, defer name/logo/demo polish

## Agent contributions

The agent:
- researched tracks and competition
- selected and refined the concept
- authored the Solidity contracts
- authored the Foundry test suite
- installed and used Foundry on the VPS
- authored deployment/setup/spend/read scripts
- executed Base Sepolia deployments and spends
- maintained architecture, deployment, and submission docs
- turned the project into a testable and deployable repository

## Current repo artifacts

Relevant files:
- `README.md`
- `docs/architecture.md`
- `docs/build-plan.md`
- `docs/deployment.md`
- `docs/track-mapping.md`
- `deployments/base-sepolia.md`
- `deployments/base-sepolia-v2.md`
- `src/YieldTreasury.sol`
- `src/DelegationAuthorizer.sol`
- `src/ReceiptRegistry.sol`
- `test/YieldTreasury.t.sol`

## Remaining work before final publish

- final project name
- ERC-8004 identity registration
- final agent manifest / execution log polish
- optional role-separated demo deployment
- Moltbook post
- final video / cover image assets
