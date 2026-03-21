# Submission Status Checklist

## Already done

- [x] Public GitHub repo exists
- [x] README exists and is being maintained
- [x] Foundry project is set up
- [x] Contracts implemented
- [x] Tests implemented and last recorded passing snapshot captured (`31/31`)
- [x] Base Sepolia deployment completed
- [x] Base mainnet deployment completed
- [x] Live onchain spend completed
- [x] Live MetaMask delegation redemption completed
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

- [x] Separate owner / manager / executor / recipient roles in a live deployment (current Base mainnet env validates with distinct backend roles, and the frontend validator accepts the intended recipient overlap only)
- [x] Real MetaMask Delegation Framework integration (live Base mainnet proof now recorded in `Memory/Deployments/base-mainnet-metamask-live.md`)
- [~] Final ERC-8004 manifest linkage / public packaging cleanup (public-safe evidence pack exists, discovery mirrors exist, and the validator checks the same public-safe artifacts; final agent/project UUID packaging plus final title/media fields still need cleanup)
- [x] Live-network real `wstETH` deployment path on the final same-network target (live Base mainnet proof now recorded in `Memory/Deployments/base-mainnet-metamask-live.md`)
- [x] Frontend/dashboard requirement (the Next.js dashboard validates against the live Base mainnet proof/config set)
- [ ] Optional MCP layer if we decide to widen into the Lido MCP track
