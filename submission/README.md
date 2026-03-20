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

These files are meant to make the project submission-ready before the final human polish step (name, logo, cover image, video, Moltbook post, and final project-ID packaging cleanup).

The public draft package now already includes:
- deployment proofs
- identity registration proof
- agent manifest draft
- agent execution log draft
- a public-safe evidence index for judges (`public-evidence-pack.md`)
- a scripted way to mirror the manifest/log to repo-root and `.well-known/` for judge discovery:

```bash
npm run submission:refresh-public-agent-artifacts
```

That command only uses the committed public-safe submission files and does **not** read or publish `submission/private-registration.json`.
