# Agent Artifacts

This folder is the judge-facing implementation record for **Agent Allowance Protocol (AAP)**.

## Start here

- `deployed-addresses.md` — live networks, contract addresses, and transaction hashes
- `component-map.md` — what each kept contract does and how it connects to the frontend and skill
- `architecture-decisions.md` — key design decisions made during the build
- `known-issues.md` — incomplete items and honest caveats
- `track-alignment.md` — direct mapping to the target hackathon tracks
- `heartbeat-report.md` — final cleanup verification report
- `cleanup-log.md` — exact files removed during the cleanup pass

## Folder structure

- `deployments/` — preserved deployment notes and live proof records
- `project-docs/` — preserved build/design docs from the implementation phase
- `submission/` — preserved judge/submission materials
- `erc8004/` — preserved public-safe manifest and execution-log artifacts
- `evidence/` — preserved generated validation/proof artifacts used by the frontend
- `inventory/` — file inventories and cleanup audit material

## Note on preserved records

Many files in the subfolders are preserved snapshots from the active build phase, so some of them still reference the older pre-cleanup repo layout. For the cleaned repository, treat the top-level files in this folder as the canonical map.