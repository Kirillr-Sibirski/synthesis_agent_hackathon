import 'dotenv/config';

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const PREFLIGHT_PATH = process.env.METAMASK_PREFLIGHT_PATH ?? 'artifacts/metamask/preflight-8453.json';
const FRONTEND_VALIDATION_PATH = process.env.FRONTEND_VALIDATION_PATH ?? 'artifacts/frontend/validation.json';
const CUTOVER_ENV_VALIDATION_PATH = process.env.CUTOVER_ENV_VALIDATION_PATH ?? 'artifacts/final/cutover-env-validation.json';
const FINAL_READINESS_PATH = process.env.FINAL_READINESS_OUT ?? 'artifacts/final/same-network-readiness.json';
const OUT_PATH = process.env.CUTOVER_CHECKLIST_OUT ?? 'artifacts/final/cutover-checklist.md';

function readJsonMaybe(filePath: string) {
  const resolved = path.resolve(process.cwd(), filePath);
  if (!existsSync(resolved)) return null;
  return JSON.parse(readFileSync(resolved, 'utf8')) as any;
}

function yesNo(value: unknown) {
  return value === true ? 'yes' : value === false ? 'no' : 'unknown';
}

function code(value: unknown) {
  if (value === null || value === undefined || value === '') return '`pending`';
  return `\`${String(value)}\``;
}

function bulletList(items: string[], empty = '- none') {
  if (!items.length) return `${empty}\n`;
  return `${items.map((item) => `- ${item}`).join('\n')}\n`;
}

function main() {
  const preflight = readJsonMaybe(PREFLIGHT_PATH);
  const frontend = readJsonMaybe(FRONTEND_VALIDATION_PATH);
  const cutover = readJsonMaybe(CUTOVER_ENV_VALIDATION_PATH);
  const readiness = readJsonMaybe(FINAL_READINESS_PATH);

  const currentTracks = Array.isArray(readiness?.summary?.currentlyHonestTracks)
    ? readiness.summary.currentlyHonestTracks
    : [];
  const blockers = Array.isArray(readiness?.blockers) ? readiness.blockers : [];
  const nextActions = Array.isArray(readiness?.nextActions) ? readiness.nextActions : [];

  const trackMatrix = Object.entries(readiness?.trackQualification ?? {}).map(([track, value]) => {
    const item = value as any;
    return `**${track}** — ${item?.currentlyHonest ? 'currently honest' : 'not honest yet'}${item?.blockerIfAny ? `; blocker: ${item.blockerIfAny}` : ''}`;
  });

  const markdown = `# Generated Same-Network Cutover Checklist

Generated at: ${new Date().toISOString()}

This file is generated from the latest readiness artifacts so the final Base mainnet cutover can be executed and narrated honestly without re-reading raw JSON.

## Overall status

- overall ready for same-network demo/submission: ${yesNo(readiness?.summary?.overallReadyForSameNetworkDemoSubmission === true)}
- same network thesis currently satisfied: ${yesNo(readiness?.currentState?.selectedChainId === readiness?.currentState?.expectedFinalChainId && readiness?.summary?.overallReadyForSameNetworkDemoSubmission === true)}
- compromises: ${blockers.length ? '`present`' : '`none detected in current reports`'}
- current honest tracks: ${currentTracks.length ? currentTracks.map((track: string) => `\`${track}\``).join(', ') : '`none`'}

## Final-chain state snapshot

- selected chain: ${code(readiness?.currentState?.selectedChain)} (${code(readiness?.currentState?.selectedChainId)})
- expected final chain: ${code(readiness?.currentState?.expectedFinalChain)} (${code(readiness?.currentState?.expectedFinalChainId)})
- MetaMask smart account deployed: ${yesNo(readiness?.currentState?.smartAccountDeployed)}
- bundler reachable: ${yesNo(readiness?.currentState?.bundlerReachable)}
- frontend Base treasury configured: ${yesNo(readiness?.currentState?.baseTreasuryConfiguredInFrontend)}
- frontend Base receipt registry configured: ${yesNo(readiness?.currentState?.baseReceiptRegistryConfiguredInFrontend)}
- frontend Base authorizer configured: ${yesNo(readiness?.currentState?.baseAuthorizerConfiguredInFrontend)}
- frontend role separation ready: ${yesNo(readiness?.currentState?.roleSeparatedInFrontendConfig)}
- backend role separation ready: ${yesNo(readiness?.currentState?.backendRoleSeparatedInEnv)}
- frontend role separation ready in env: ${yesNo(readiness?.currentState?.frontendRoleSeparatedInEnv)}
- ERC-8004 registration tx: ${code(readiness?.currentState?.erc8004RegistrationTx)}

## Track qualification matrix

${bulletList(trackMatrix, '- track qualification data unavailable')}
## MetaMask preflight snapshot

- network: ${code(preflight?.network?.chainName)} (${code(preflight?.network?.chainId)})
- final target network: ${code(preflight?.network?.finalSameNetworkTarget?.chainName)} (${code(preflight?.network?.finalSameNetworkTarget?.chainId)})
- final target chain currently selected: ${yesNo(preflight?.network?.finalSameNetworkTarget?.chainSelected)}
- configured \`WSTETH_ADDRESS\` in current MetaMask env: ${code(preflight?.network?.finalSameNetworkTarget?.configuredWstETH)}
- expected Base mainnet \`wstETH\`: ${code(preflight?.network?.finalSameNetworkTarget?.expectedWstETH)}
- configured address matches Base mainnet \`wstETH\`: ${yesNo(preflight?.network?.finalSameNetworkTarget?.configuredWstETHMatchesBaseMainnet)}
- using expected mainnet \`wstETH\` on the selected chain: ${yesNo(preflight?.network?.finalSameNetworkTarget?.usingExpectedMainnetWstETH)}
- smart account: ${code(preflight?.accounts?.delegatorSmartAccount)}
- executor: ${code(preflight?.accounts?.executor)}
- recipient: ${code(preflight?.accounts?.recipient)}
- treasury deployed: ${yesNo(preflight?.onchain?.treasuryDeployed)}
- smart account deployed: ${yesNo(preflight?.onchain?.smartAccountDeployed)}
- bundler reachable: ${yesNo(preflight?.bundler?.reachable)}
- ready for final same-network run: ${yesNo(preflight?.readiness?.readyForFinalSameNetworkRun)}
- note: ${preflight?.network?.finalSameNetworkTarget?.chainSelected === true ? 'selected chain is already Base mainnet, so the mainnet compatibility booleans should be read literally' : 'selected chain is not Base mainnet yet, so treat any configured addresses as provisional until the chain is switched and the report is regenerated'}

## Frontend/demo snapshot

- config validation ready: ${yesNo(frontend?.readiness?.readyForFrontendSameNetworkDemoConfig)}
- Base treasury present: ${yesNo(frontend?.baseChecks?.treasuryPresent)}
- Base asset present: ${yesNo(frontend?.baseChecks?.assetPresent)}
- Base receipt registry present: ${yesNo(frontend?.baseChecks?.receiptRegistryPresent)}
- Base authorizer present: ${yesNo(frontend?.baseChecks?.authorizerPresent)}
- Base asset is real mainnet \`wstETH\`: ${yesNo(frontend?.baseChecks?.correctMainnetWstETH)}
- budget manager present: ${yesNo(frontend?.actorChecks?.budgetManagerPresent)}
- spend recipient present: ${yesNo(frontend?.actorChecks?.spendRecipientPresent)}
- demo executor present: ${yesNo(frontend?.actorChecks?.demoExecutorPresent)}
- demo recipient present: ${yesNo(frontend?.actorChecks?.demoRecipientPresent)}
- receipt hash present: ${yesNo(frontend?.actorChecks?.receiptHashPresent)}
- distinct frontend actor addresses: ${code(frontend?.roleSeparation?.distinctAddresses)}

## Raw cutover-env snapshot

- ready for Base mainnet cutover env: ${yesNo(cutover?.readiness?.readyForBaseMainnetCutoverEnv)}
- MetaMask chain set to Base: ${yesNo(cutover?.checks?.metaMaskChainIsBase)}
- frontend chain set to Base: ${yesNo(cutover?.checks?.frontendChainIsBase)}
- RPC configured: ${yesNo(cutover?.checks?.rpcConfigured)}
- bundler configured: ${yesNo(cutover?.checks?.bundlerConfigured)}
- executor key configured: ${yesNo(cutover?.checks?.executorKeyConfigured)}
- real Base mainnet \`wstETH\` configured: ${yesNo(cutover?.checks?.wstETHIsBaseMainnet)}
- treasury configured: ${yesNo(cutover?.checks?.treasuryConfigured)}
- authorizer configured: ${yesNo(cutover?.checks?.authorizerConfigured)}
- receipt registry configured: ${yesNo(cutover?.checks?.receiptRegistryConfigured)}
- backend roles fully separated: ${yesNo(cutover?.roleSeparation?.backendFullySeparated)}
- frontend roles fully separated in env: ${yesNo(cutover?.roleSeparation?.frontendFullySeparated)}

## Current blockers

${bulletList(blockers, '- none')}
## Next actions

${bulletList(nextActions, '- none')}
## Final proof collection reminder

When the real Base mainnet run happens, immediately fill in:
- \`deployments/base-mainnet-cutover-template.md\`
- final MetaMask/userOp/redemption tx hashes
- final treasury spend tx + receipt hash
- final role-separated frontend config inputs
- any submission media/title/UUID fields still marked pending in \`submission/\`
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
          preflight: path.resolve(process.cwd(), PREFLIGHT_PATH),
          frontendValidation: path.resolve(process.cwd(), FRONTEND_VALIDATION_PATH),
          cutoverEnvValidation: path.resolve(process.cwd(), CUTOVER_ENV_VALIDATION_PATH),
          finalReadiness: path.resolve(process.cwd(), FINAL_READINESS_PATH),
        },
      },
      null,
      2,
    ),
  );
}

main();
