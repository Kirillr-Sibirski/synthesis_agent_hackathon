# Submission Status Checklist

## Already done

- [x] Public GitHub repo exists
- [x] README exists and is being maintained
- [x] Foundry project is set up
- [x] Contracts implemented
- [x] Tests implemented and passing (`30/30`)
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
- [ ] `agent.json` finalization
- [ ] `agent_log.json` finalization
- [ ] Moltbook post URL
- [ ] Video URL
- [ ] Cover image / pictures
- [ ] Synthesis project UUID
- [ ] Self-custody transfer completed in Synthesis
- [ ] Final publish call

## Biggest quality upgrades still worth doing

- [~] Separate owner / manager / executor / recipient roles in a live deployment (tooling/scripts exist and the generated deployment note at `deployments/base-sepolia-wsteth-role-separated.md` now clearly distinguishes what is already proven versus what still needs final tx curation)
- [ ] Real MetaMask Delegation Framework integration (smart-account derivation + treasury calldata prep are done; a real signed constrained delegation artifact is now generated in-repo; a live redemption helper script now exists for the signed artifact path; a live-readiness preflight now checks env/treasury/bundler/smart-account status in one step; live delegation-backed execution still pending bundler-backed deployment/redemption proof on the final same-network target)
- [ ] Final ERC-8004 manifest linkage / public packaging cleanup around the completed identity registration
- [ ] Live-network real `wstETH` deployment path on the final same-network target
- [~] Frontend/dashboard requirement (a first usable static wallet-connected dashboard now exists under `frontend/`; it still needs final same-network deployment addresses and sponsor-complete polish)
- [ ] Optional MCP layer if we decide to widen into the Lido MCP track
