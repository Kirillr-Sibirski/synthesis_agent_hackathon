# Frontend

Judge-facing Next.js dashboard for **Agent Allowance Protocol (AAP)**.

## What it shows

- live treasury status
- budget / allowance state
- per-agent **ERC-8004 receipt** views
- receipt lookup
- MetaMask proof artifacts
- submission-readiness context from `../agent-artifacts/`

## Local run

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:3000>.

## Contract inputs

The frontend reads:
- ABIs / bytecode from `../contracts/out/`
- proof and submission artifacts from `../agent-artifacts/`
- local demo config from `./public/config.json`

## Entry points

- app shell: `app/page.tsx`
- treasury workspace: `components/treasury-workspace.tsx`
- live data loader: `lib/dashboard-data.ts`
- deployable contract manifest API: `app/api/operator-manifest/route.ts`
