# Web dashboard

<p align="center">
  <img src="../../logo.png" alt="Agent Allowance Protocol logo" width="220" />
</p>

This is the Next.js App Router judge dashboard for **Agent Allowance Protocol**.

It reads the current repo artifacts from the repository root and exposes:
- treasury status
- budget state
- receipt lookup
- MetaMask artifact and proof view
- readiness summary

## Run

From `apps/web/`:

```bash
bun install
bun run dev
```

Then open `http://localhost:3000`.

## Notes

- The app expects the repo-root artifacts to remain in place so it can read the current proof snapshot.
- `bun run frontend:write-config` now defaults the Base dashboard config to the recorded live Base mainnet proof set from `Memory/Deployments/base-mainnet-metamask-live.md`, so the judge surface stays useful even when local cutover env vars are not filled in.
- Env overrides still win, so fresh reruns can point the dashboard at newer addresses / actors without editing the generated config by hand.
- The backend demo surfaces live JSON through `/api/snapshot` and `/api/receipt?hash=...`.
- The dashboard is intended to support the judge story for the live Base mainnet treasury + MetaMask redemption proof.
