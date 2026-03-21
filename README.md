# synthesis_agent_hackathon

Hackathon repo for a delegated, yield-only treasury with receipt-backed spends, MetaMask smart-account execution, and a judge-facing Next.js dashboard.

## Layout

- `contracts/` — Foundry project for the treasury, authorizer, receipt registry, mocks, and deployment/demo scripts
- `apps/web/` — Next.js App Router dashboard for judges and operators
- `tools/` — Bun/TS helpers for MetaMask, frontend config, readiness validation, and public submission artifacts
- `Memory/ProjectDocs/` — project docs and implementation notes
- `Memory/Deployments/` — deployment records and the final Base mainnet cutover template
- `Memory/Submission/` — public markdown submission and judge-evidence material
- `submission/` — machine-readable submission artifacts (`agent.json`, `agent_log.json`, metadata drafts)
- `env/` — local cutover env templates
- `artifacts/` — generated readiness and proof artifacts

## Current status

- Base Sepolia MetaMask path is live end-to-end: smart-account deployment, delegation redemption, treasury spend, and receipt proof
- The Lido-style `wstETH` treasury path is implemented in `contracts/` and ready for the final Base mainnet cutover once the wallet has mainnet gas
- The repo now has a real Next.js dashboard in `apps/web/` instead of the old static prototype
- The remaining sponsor-complete blocker is still the final same-network Base mainnet deployment and proof collection pass

## Key commands

```bash
bun install
bun run web:dev
bun run web:build
bun run contracts:test
bun run metamask:preflight
bun run final:refresh-readiness-bundle
bun run verify:demo
```

## Important paths

- Judge dashboard: `apps/web/`
- MetaMask workspace: `tools/metamask/`
- Final cutover template: `Memory/Deployments/base-mainnet-cutover-template.md`
- Public evidence index: `Memory/Submission/public-evidence-pack.md`

## Notes

- Use Bun for JS tooling in this repo.
- Secrets stay in `.env`; do not commit private keys.
- Foundry dependencies are vendored under `contracts/lib/`.
