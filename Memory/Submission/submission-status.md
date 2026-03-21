# Submission Status Checklist

## Already done

- [x] Public GitHub repo exists
- [x] README exists and is being maintained
- [x] Foundry project is set up
- [x] Contracts implemented
- [x] Tests implemented and last recorded passing snapshot captured (`31/31`)
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
- [~] Public-facing ERC-8004 identity / manifest linkage polish (registration tx is recorded; local-only registration state is separated from public submission artifacts; `Memory/Submission/public-evidence-pack.md` exists; final agent/project UUID packaging still needs cleanup)
- [~] `agent.json` finalization (public-safe draft exists in `submission/`, root / `.well-known/` discovery mirrors can be refreshed with `bun run submission:refresh-public-agent-artifacts`, and the manifest now includes the working title plus public discovery paths; final branding/project UUID/media fields still pending)
- [~] `agent_log.json` finalization (public-safe draft exists in `submission/`, root / `.well-known/` discovery mirrors can be refreshed with `bun run submission:refresh-public-agent-artifacts`, and the log now records the public-safe packaging-finalization step; final branding/project UUID/media fields still pending)
- [ ] Moltbook post URL
- [ ] Video URL
- [ ] Cover image / pictures
- [ ] Synthesis project UUID
- [ ] Self-custody transfer completed in Synthesis
- [ ] Final publish call

## Biggest quality upgrades still worth doing

- [~] Separate owner / manager / executor / recipient roles in a live deployment (tooling/scripts exist; the Base mainnet cutover env + frontend validator explicitly require distinct frontend role wiring too; the remaining work is to finish a clean final proof set)
- [~] Real MetaMask Delegation Framework integration (Base Sepolia now has live smart-account deployment, live delegation redemption, and a live receipt-backed treasury spend proof in `Memory/Deployments/base-sepolia-metamask-live.md`; the remaining work is reproducing that proof on the final same-network Base mainnet target)
- [~] Final ERC-8004 manifest linkage / public packaging cleanup (public-safe evidence pack exists, discovery mirrors exist, and the validator checks the same public-safe artifacts; final agent/project UUID packaging plus final title/media fields still need cleanup)
- [ ] Live-network real `wstETH` deployment path on the final same-network target (final proof collection is scaffolded in `Memory/Deployments/base-mainnet-cutover-template.md`, and the final env wiring has a dedicated `env/base-mainnet-cutover.example.env` template)
- [~] Frontend/dashboard requirement (the static dashboard exists under `frontend/`; it supports local `config.json` cutover, env-driven config generation, validation, and artifact hydration, but it still needs the final same-network deployment data and sponsor-complete polish)
- [ ] Optional MCP layer if we decide to widen into the Lido MCP track
