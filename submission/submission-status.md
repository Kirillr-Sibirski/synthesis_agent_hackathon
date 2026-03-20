# Submission Status Checklist

## Already done

- [x] Public GitHub repo exists
- [x] README exists and is being maintained
- [x] Foundry project is set up
- [x] Contracts implemented
- [x] Tests implemented and passing (`31/31`)
- [x] Base Sepolia deployment completed
- [x] Live onchain spend completed
- [x] Deployment records written down
- [x] Project description draft written
- [x] Problem statement draft written
- [x] Track UUIDs selected for primary targets
- [x] Submission metadata draft written
- [x] Human–agent collaboration log draft written

## Still needed

- [ ] Final project name
- [ ] Final track list confirmation
- [~] Public-facing ERC-8004 identity / manifest linkage polish (registration tx is recorded; local-only registration state is now explicitly separated from public submission artifacts; public-safe evidence index added in `submission/public-evidence-pack.md`; final agent/project UUID packaging still needs cleanup)
- [~] `agent.json` finalization (public-safe draft exists in `submission/`, and root / `.well-known/` discovery mirrors can now be refreshed with `npm run submission:refresh-public-agent-artifacts`; final title/project UUID/media fields still pending)
- [~] `agent_log.json` finalization (public-safe draft exists in `submission/`, and root / `.well-known/` discovery mirrors can now be refreshed with `npm run submission:refresh-public-agent-artifacts`; final title/project UUID/media fields still pending)
- [ ] Moltbook post URL
- [ ] Video URL
- [ ] Cover image / pictures
- [ ] Synthesis project UUID
- [ ] Self-custody transfer completed in Synthesis
- [ ] Final publish call

## Biggest quality upgrades still worth doing

- [~] Separate owner / manager / executor / recipient roles in a live deployment (tooling/scripts exist and the generated deployment note at `deployments/base-sepolia-wsteth-role-separated.md` now clearly distinguishes what is already proven versus what still needs final tx curation)
- [ ] Real MetaMask Delegation Framework integration (smart-account derivation + treasury calldata prep are done; a real signed constrained delegation artifact is now generated in-repo; live redemption helpers now exist for both the signed-artifact path and a one-command live-flow path; `npm run metamask:preflight` was re-verified on 2026-03-20, now explicitly reports `readyForFinalSameNetworkRun=false`, and can be saved as a JSON readiness artifact for the dashboard; live delegation-backed execution still pending bundler-backed deployment/redemption proof on the final same-network target)
- [~] Final ERC-8004 manifest linkage / public packaging cleanup around the completed identity registration (public-safe evidence pack now includes the latest validation snapshot, manifest draft and execution log draft are updated, and the remaining work is final agent/project UUID packaging plus final title/media fields)
- [ ] Live-network real `wstETH` deployment path on the final same-network target (final proof collection is now scaffolded in `deployments/base-mainnet-cutover-template.md`, and final env wiring now has a dedicated `env/base-mainnet-cutover.example.env` template)
- [~] Frontend/dashboard requirement (a first usable static wallet-connected dashboard now exists under `frontend/`; it now supports local `config.json` cutover for final deployment addresses, has an env-driven `npm run frontend:write-config` helper that avoids cross-chain address leakage, has a `npm run frontend:validate-config` readiness check, feeds into a combined `npm run final:validate-same-network` go/no-go report and a one-shot `npm run final:refresh-readiness-bundle` refresh path, can inspect saved MetaMask artifact/live-flow/preflight/final-readiness JSON, hydrates the relevant form fields directly from those artifacts for the judge flow, and can build a role-separated demo summary, but it still needs final same-network deployment data and sponsor-complete polish)
- [ ] Optional MCP layer if we decide to widen into the Lido MCP track
