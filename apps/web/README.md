# Web dashboard

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
- The backend demo surfaces live JSON through `/api/snapshot` and `/api/receipt?hash=...`.
- The dashboard is intended to support the judge story for the live Base mainnet treasury + MetaMask redemption proof.
