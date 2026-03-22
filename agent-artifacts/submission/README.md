# Submission Package

This folder collects submission-facing artifacts for **Agent Allowance Protocol**.

- Short form: **AAP**
- Historical working title retained only for context: **Delegated Yield Treasury**

## Files

- `project-draft.md` — project description, problem statement, repo URL, and target tracks
- `submission-metadata-draft.json` — draft metadata object for the submission form/API
- `conversation-log.md` — curated human–agent collaboration log
- `submission-status.md` — checklist of what is done vs still needed
- `track-qualification-plan.md` — current honest track review / positioning notes
- `public-evidence-pack.md` — generated public-safe judge index linking identity, deployment, receipt, and sponsor-track evidence
- `private-registration.example.json` — redacted shape of the local-only Synthesis registration state

## Canonical public-safe manifest / log

The canonical public-safe manifest and log live in:
- `agent-artifacts/erc8004/submission-agent.json`
- `agent-artifacts/erc8004/submission-agent-log.json`

They can be mirrored to repo root and `.well-known/` with:

```bash
bun run submission:refresh-public-agent-artifacts
```

That refresh only uses committed public-safe files and does **not** touch local-only secrets.

## Generated judge evidence index

Refresh the judge-facing evidence pack with:

```bash
bun run submission:render-public-evidence-pack
```

Or refresh the full readiness + evidence bundle with:

```bash
bun run final:refresh-readiness-bundle
```

## Current posture

The repo now supports a clear final public story:
- final project name selected
- live Base mainnet proof recorded
- judge dashboard present
- public-safe manifest / execution log present
- track-fit docs aligned with the real state of the repo

## Fastest judge read order

1. `agent-artifacts/submission/public-evidence-pack.md`
2. `README.md`
3. `agent-artifacts/submission/project-draft.md`
4. `agent-artifacts/project-docs/track-mapping.md`
5. `agent-artifacts/deployments/base-mainnet-metamask-live.md`
