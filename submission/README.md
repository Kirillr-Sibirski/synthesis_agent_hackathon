# Submission Package

This folder collects submission-facing artifacts for The Synthesis.

## Files

- `project-draft.md` — draft description, problem statement, repo URL, and target tracks
- `submission-metadata-draft.json` — draft `submissionMetadata` object for the Devfolio API
- `conversation-log.md` — curated human–agent collaboration log
- `submission-status.md` — checklist of what is done vs still needed
- `agent.json` — draft agent manifest
- `agent_log.json` — draft structured execution log
- `public-evidence-pack.md` — public-safe judge index linking identity, deployment, receipt, and sponsor-track evidence
- `private-registration.example.json` — redacted shape of the local-only Synthesis registration state

## Private vs public

- `submission/private-registration.json` is **local-only** and gitignored because it may contain sensitive registration state such as API credentials.
- Only redacted/public-safe material should be used in committed submission artifacts.
- Public-facing ERC-8004 proof should rely on non-secret fields such as the registration transaction, owner address, repo URL, deployment notes, and judge-facing manifests.

## Current status

These files are meant to make the project submission-ready before the final human polish step (final branding/name choice, logo, cover image, video, Moltbook post, and final project-ID packaging cleanup).

The public draft package now already includes:
- deployment proofs
- identity registration proof
- agent manifest draft
- agent execution log draft
- a public-safe evidence index for judges (`public-evidence-pack.md`)
- a working-title fallback in `submission/agent.json` / `submission/agent_log.json` so public judge discovery no longer shows `TBD` while final branding is still pending
- a scripted way to mirror the manifest/log to repo-root and `.well-known/` for judge discovery:

```bash
npm run submission:refresh-public-agent-artifacts
```

That command only uses the committed public-safe submission files and does **not** read or publish `submission/private-registration.json`.

The larger final readiness bundle now calls that refresh automatically first, so the same-network validator always checks the latest public-safe ERC-8004 discovery surface unless you explicitly opt out with `REFRESH_PUBLIC_AGENT_ARTIFACTS=false`.

The repo also now has a public-safe evidence-pack renderer:

```bash
npm run submission:render-public-evidence-pack
```

That command reads the latest committed/public-safe readiness artifacts (`agent.json`, MetaMask preflight, cutover-env validation, frontend validation, final same-network readiness, and the generated cutover checklist) and rewrites `submission/public-evidence-pack.md` so the judge-facing status summary stays synchronized with the real validator output.
