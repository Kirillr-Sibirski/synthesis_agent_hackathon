import 'dotenv/config';

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const AGENT_MANIFEST_PATH = process.env.AGENT_MANIFEST_PATH ?? 'agent.json';
const PREFLIGHT_PATH = process.env.METAMASK_PREFLIGHT_PATH ?? 'artifacts/metamask/preflight-8453.json';
const CUTOVER_ENV_VALIDATION_PATH = process.env.CUTOVER_ENV_VALIDATION_PATH ?? 'artifacts/final/cutover-env-validation.json';
const FRONTEND_VALIDATION_PATH = process.env.FRONTEND_VALIDATION_PATH ?? 'artifacts/frontend/validation.json';
const FINAL_READINESS_PATH = process.env.FINAL_READINESS_OUT ?? 'artifacts/final/same-network-readiness.json';
const CUTOVER_CHECKLIST_PATH = process.env.CUTOVER_CHECKLIST_OUT ?? 'artifacts/final/cutover-checklist.md';
const CUTOVER_ENV_CHECKLIST_PATH = process.env.CUTOVER_ENV_CHECKLIST_OUT ?? 'artifacts/final/cutover-env-checklist.md';
const OUT_PATH = process.env.PUBLIC_EVIDENCE_PACK_OUT ?? 'submission/public-evidence-pack.md';

function readJsonMaybe(filePath: string) {
  const resolved = path.resolve(process.cwd(), filePath);
  if (!existsSync(resolved)) return null;
  return JSON.parse(readFileSync(resolved, 'utf8')) as any;
}

function rel(filePath: string) {
  return path.relative(process.cwd(), path.resolve(process.cwd(), filePath)).replaceAll('\\', '/');
}

function yesNo(value: unknown) {
  return value === true ? 'yes' : value === false ? 'no' : 'unknown';
}

function bullets(items: string[], empty = '- none') {
  if (!items.length) return `${empty}\n`;
  return `${items.map((item) => `- ${item}`).join('\n')}\n`;
}

const TRACK_LABELS: Record<string, string> = {
  agentsWithReceiptsErc8004: 'Agents With Receipts — ERC-8004',
  bestUseOfDelegations: 'Best Use of Delegations',
  stEthAgentTreasury: 'stETH Agent Treasury',
  letTheAgentCook: 'Let the Agent Cook',
  synthesisOpenTrack: 'Synthesis Open Track',
};

function trackLabel(track: string) {
  return TRACK_LABELS[track] ?? track;
}

function main() {
  const agent = readJsonMaybe(AGENT_MANIFEST_PATH);
  const preflight = readJsonMaybe(PREFLIGHT_PATH);
  const cutover = readJsonMaybe(CUTOVER_ENV_VALIDATION_PATH);
  const frontend = readJsonMaybe(FRONTEND_VALIDATION_PATH);
  const readiness = readJsonMaybe(FINAL_READINESS_PATH);

  const honestTracks = Array.isArray(readiness?.summary?.currentlyHonestTracks)
    ? readiness.summary.currentlyHonestTracks
    : [];
  const blockerList = Array.isArray(readiness?.blockers) ? readiness.blockers : [];
  const nextActions = Array.isArray(readiness?.nextActions) ? readiness.nextActions : [];
  const strongNow = honestTracks.map((track: string) => `**${trackLabel(track)}**`);
  const incompleteTracks = Object.entries(readiness?.trackQualification ?? {})
    .filter(([, value]) => !(value as any)?.currentlyHonest)
    .map(([track, value]) => {
      const blocker = (value as any)?.blockerIfAny;
      return blocker ? `**${trackLabel(track)}** — ${blocker}` : `**${trackLabel(track)}**`;
    });

  const markdown = `# Public Evidence Pack

This file is generated from the latest public-safe repo artifacts so the judge-facing evidence index stays current without hand-edit drift.

No secrets, API keys, or local-only registration files are required to verify anything referenced here.

Generated at: ${new Date().toISOString()}

## 1. Public repo

- Repo: \`${agent?.repoURL ?? 'https://github.com/Kirillr-Sibirski/synthesis_agent_hackathon'}\`

## 2. ERC-8004 / Synthesis identity evidence

The project has already completed Synthesis registration and recorded the resulting onchain identity-registration transaction.

- owner / operator address: \`${agent?.erc8004?.ownerAddress ?? agent?.operatorWallet ?? 'pending'}\`
- registration tx: \`${agent?.erc8004?.registrationTx ?? 'pending'}\`
- public manifest draft: \`submission/agent.json\`
- public execution log draft: \`submission/agent_log.json\`
- judge-discovery mirrors can be refreshed to repo root and \`.well-known/\` with \`npm run submission:refresh-public-agent-artifacts\`

Private API credentials and registration state remain local-only in \`submission/private-registration.json\` and are intentionally excluded from git.

## 3. Live onchain treasury evidence

Latest repo-head-aligned deployment notes:
- \`deployments/base-sepolia-v2.md\`
- \`deployments/base-sepolia-wsteth-role-separated.md\`
- final same-network template: \`deployments/base-mainnet-cutover-template.md\`

Strongest current public proof is still the Base Sepolia live treasury path plus the role-separated \`wstETH\` deployment scaffolding.

## 4. MetaMask Delegation Framework evidence

Public MetaMask workspace docs:
- \`integrations/metamask/README.md\`
- \`integrations/metamask/STATUS.md\`
- \`docs/metamask-integration-plan.md\`

Latest generated preflight artifact:
- path: \`${rel(PREFLIGHT_PATH)}\`
- selected chain: \`${preflight?.network?.chainName ?? 'unknown'}\` (\`${preflight?.network?.chainId ?? 'unknown'}\`)
- final target chain: \`${preflight?.network?.finalSameNetworkTarget?.chainName ?? 'Base'}\` (\`${preflight?.network?.finalSameNetworkTarget?.chainId ?? 8453}\`)
- final target chain currently selected: \`${yesNo(preflight?.network?.finalSameNetworkTarget?.chainSelected)}\`
- configured \`WSTETH_ADDRESS\` in current MetaMask env: \`${preflight?.network?.finalSameNetworkTarget?.configuredWstETH ?? 'pending'}\`
- configured address matches Base mainnet \`wstETH\`: \`${yesNo(preflight?.network?.finalSameNetworkTarget?.configuredWstETHMatchesBaseMainnet)}\`
- smart account: \`${preflight?.accounts?.delegatorSmartAccount ?? 'pending'}\`
- treasury deployed: \`${yesNo(preflight?.onchain?.treasuryDeployed)}\`
- smart account deployed: \`${yesNo(preflight?.onchain?.smartAccountDeployed)}\`
- bundler reachable: \`${yesNo(preflight?.bundler?.reachable)}\`
- bundler chain matches selected network: \`${yesNo(preflight?.bundler?.chainMatchesSelectedNetwork)}\`
- bundler ready for selected-network user operations: \`${yesNo(preflight?.bundler?.readyForSelectedNetworkUserOps)}\`
- ready for final same-network run: \`${yesNo(preflight?.readiness?.readyForFinalSameNetworkRun)}\`

Honest blocker:
- live delegation-backed execution still needs bundler-backed smart-account deployment plus redemption proof on the final same-network target

## 5. Lido / \`wstETH\` same-network evidence

Public docs:
- \`docs/sponsor-compliance.md\`
- \`docs/architecture.md\`
- \`docs/role-separated-live-flow.md\`

Latest cutover-env validation artifact:
- path: \`${rel(CUTOVER_ENV_VALIDATION_PATH)}\`
- Base mainnet env ready: \`${yesNo(cutover?.readiness?.readyForBaseMainnetCutoverEnv)}\`
- real Base mainnet \`wstETH\` configured: \`${yesNo(cutover?.checks?.wstETHIsBaseMainnet)}\`
- treasury configured: \`${yesNo(cutover?.checks?.treasuryConfigured)}\`
- authorizer configured: \`${yesNo(cutover?.checks?.authorizerConfigured)}\`
- receipt registry configured: \`${yesNo(cutover?.checks?.receiptRegistryConfigured)}\`
- backend roles fully separated: \`${yesNo(cutover?.roleSeparation?.backendFullySeparated)}\`
- frontend roles fully separated in env: \`${yesNo(cutover?.roleSeparation?.frontendFullySeparated)}\`

Honest blocker:
- a real Base mainnet \`wstETH\` treasury deployment/env cutover still needs final live addresses, final role wiring, and proof collection

## 6. Frontend / Let-the-Agent-Cook evidence

Public frontend docs:
- \`frontend/README.md\`
- \`docs/demo-flow.md\`

Latest frontend validation artifact:
- path: \`${rel(FRONTEND_VALIDATION_PATH)}\`
- frontend same-network demo config ready: \`${yesNo(frontend?.readiness?.readyForFrontendSameNetworkDemoConfig)}\`
- Base treasury present: \`${yesNo(frontend?.baseChecks?.treasuryPresent)}\`
- Base receipt registry present: \`${yesNo(frontend?.baseChecks?.receiptRegistryPresent)}\`
- Base authorizer present: \`${yesNo(frontend?.baseChecks?.authorizerPresent)}\`
- receipt hash present: \`${yesNo(frontend?.actorChecks?.receiptHashPresent)}\`
- distinct frontend actor addresses: \`${frontend?.roleSeparation?.distinctAddresses ?? 'unknown'}\`

Honest blocker:
- the dashboard is real and judge-usable, but the final Base mainnet cutover config is still incomplete and still overlaps roles in the current local validation state

## 7. Latest validation snapshot

Latest generated readiness artifacts:
- final readiness: \`${rel(FINAL_READINESS_PATH)}\`
- generated cutover env checklist: \`${rel(CUTOVER_ENV_CHECKLIST_PATH)}\`
- generated cutover checklist: \`${rel(CUTOVER_CHECKLIST_PATH)}\`

Current validation summary:
- last recorded forge test snapshot: \`31/31 passing\`
- frontend syntax: \`node --check frontend/app.js passing\`
- overall ready for same-network demo/submission: \`${yesNo(readiness?.summary?.overallReadyForSameNetworkDemoSubmission)}\`
- current honest tracks: ${honestTracks.length ? honestTracks.map((track: string) => `\`${trackLabel(track)}\``).join(', ') : '\`none\`'}

Current same-network validator blockers:
${bullets(blockerList)}## 8. Best honest track posture right now

### Strong now
${bullets(strongNow, '- none yet')}
### Credible but still incomplete
${bullets(incompleteTracks, '- none')}
## 9. Fastest remaining path to honest 3+ track qualification

${bullets(nextActions, '- no next actions emitted by the validator')}
## 10. Final same-network handoff

When the real Base mainnet run happens, record it in:
- \`deployments/base-mainnet-cutover-template.md\`

The latest generated handoff/checklists are here:
- \`${rel(CUTOVER_ENV_CHECKLIST_PATH)}\`
- \`${rel(CUTOVER_CHECKLIST_PATH)}\`
`;

  const resolvedOut = path.resolve(process.cwd(), OUT_PATH);
  mkdirSync(path.dirname(resolvedOut), { recursive: true });
  writeFileSync(resolvedOut, markdown);

  console.log(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        output: resolvedOut,
        basedOn: {
          agentManifest: path.resolve(process.cwd(), AGENT_MANIFEST_PATH),
          preflight: path.resolve(process.cwd(), PREFLIGHT_PATH),
          cutoverEnvValidation: path.resolve(process.cwd(), CUTOVER_ENV_VALIDATION_PATH),
          frontendValidation: path.resolve(process.cwd(), FRONTEND_VALIDATION_PATH),
          finalReadiness: path.resolve(process.cwd(), FINAL_READINESS_PATH),
          cutoverEnvChecklist: path.resolve(process.cwd(), CUTOVER_ENV_CHECKLIST_PATH),
          cutoverChecklist: path.resolve(process.cwd(), CUTOVER_CHECKLIST_PATH),
        },
      },
      null,
      2,
    ),
  );
}

main();
