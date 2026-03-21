import 'dotenv/config';

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CUTOVER_ENV_VALIDATION_PATH = process.env.CUTOVER_ENV_VALIDATION_PATH ?? 'artifacts/final/cutover-env-validation.json';
const OUT_PATH = process.env.CUTOVER_ENV_CHECKLIST_OUT ?? 'artifacts/final/cutover-env-checklist.md';

const CHECK_TO_ENV: Record<string, string[]> = {
  metaMaskChainIsBase: ['METAMASK_CHAIN=base'],
  frontendChainIsBase: ['FRONTEND_CHAIN=base'],
  rpcConfigured: ['RPC_URL=<base-mainnet-rpc>', 'or BASE_MAINNET_RPC_URL=<base-mainnet-rpc>'],
  bundlerConfigured: ['BUNDLER_URL=<base-mainnet-bundler-endpoint>'],
  privateKeyConfigured: ['PRIVATE_KEY=<owner-private-key>'],
  executorKeyConfigured: ['EXECUTOR_PRIVATE_KEY=<executor-private-key>'],
  wstETHConfigured: ['WSTETH_ADDRESS=0x7f39c581f595b53c5cb5bbd8f2c9a0e1b8d9d2b2'],
  wstETHIsBaseMainnet: ['WSTETH_ADDRESS=0x7f39c581f595b53c5cb5bbd8f2c9a0e1b8d9d2b2'],
  treasuryConfigured: ['TREASURY_ADDRESS=<base-mainnet-treasury>'],
  authorizerConfigured: ['AUTHORIZER_ADDRESS=<base-mainnet-authorizer>'],
  receiptRegistryConfigured: ['RECEIPT_REGISTRY_ADDRESS=<base-mainnet-receipt-registry>'],
  managerConfigured: ['MANAGER_ADDRESS=<budget-manager-address>'],
  executorConfigured: ['EXECUTOR_ADDRESS=<executor-address>'],
  recipientConfigured: ['RECIPIENT_ADDRESS=<recipient-address>'],
  frontendTreasuryConfigured: ['FRONTEND_TREASURY_ADDRESS=<base-mainnet-treasury>'],
  frontendAuthorizerConfigured: ['FRONTEND_AUTHORIZER_ADDRESS=<base-mainnet-authorizer>'],
  frontendReceiptRegistryConfigured: ['FRONTEND_RECEIPT_REGISTRY_ADDRESS=<base-mainnet-receipt-registry>'],
  frontendAssetConfigured: ['FRONTEND_ASSET_ADDRESS=0x7f39c581f595b53c5cb5bbd8f2c9a0e1b8d9d2b2'],
  frontendAssetIsBaseMainnet: ['FRONTEND_ASSET_ADDRESS=0x7f39c581f595b53c5cb5bbd8f2c9a0e1b8d9d2b2'],
  frontendBudgetManagerConfigured: ['FRONTEND_BUDGET_MANAGER=<budget-manager-address>'],
  frontendSpendRecipientConfigured: ['FRONTEND_SPEND_RECIPIENT=<spend-recipient-address>'],
  frontendDemoExecutorConfigured: ['FRONTEND_DEMO_EXECUTOR=<executor-address>'],
  frontendDemoRecipientConfigured: ['FRONTEND_DEMO_RECIPIENT=<recipient-address>'],
  frontendReceiptHashConfigured: ['FRONTEND_RECEIPT_HASH=<final-receipt-hash>'],
};

function readJson(filePath: string) {
  return JSON.parse(readFileSync(filePath, 'utf8')) as any;
}

function rel(filePath: string) {
  return path.relative(process.cwd(), path.resolve(process.cwd(), filePath)).replaceAll('\\', '/');
}

function yesNo(value: unknown) {
  return value === true ? 'yes' : value === false ? 'no' : 'unknown';
}

function bulletList(items: string[], empty = '- none') {
  return items.length ? items.map((item) => `- ${item}`).join('\n') : empty;
}

function envSuggestions(name: string) {
  return CHECK_TO_ENV[name] ?? [`Fill the env/input that satisfies \`${name}\`.`];
}

function main() {
  const resolvedValidation = path.resolve(process.cwd(), CUTOVER_ENV_VALIDATION_PATH);
  if (!existsSync(resolvedValidation)) {
    throw new Error(
      `Cutover env validation artifact not found at ${resolvedValidation}. Run npm run final:validate-cutover-env first.`,
    );
  }

  const report = readJson(resolvedValidation);
  const missingChecks = Array.isArray(report?.readiness?.missing) ? report.readiness.missing : [];
  const warnings = Array.isArray(report?.readiness?.warnings) ? report.readiness.warnings : [];
  const expectedChain = report?.expectedFinalChain ?? {};
  const consistency = report?.addressConsistency ?? {};
  const derived = report?.derivedAddresses ?? {};

  const missingChecklist = missingChecks.map((name: string) => {
    const suggestions = envSuggestions(name).map((item) => `  - ${item}`).join('\n');
    return `- \`${name}\`\n${suggestions}`;
  }).join('\n');

  const consistencyLines = Object.entries(consistency).map(([key, value]) => `${key}: ${yesNo(value)}`);

  const markdown = `# Base Mainnet Cutover Env Checklist

Generated at: ${new Date().toISOString()}

This file is generated from \`${rel(CUTOVER_ENV_VALIDATION_PATH)}\` so the final Base mainnet run has a human-readable env handoff tied to the same validator used by the readiness bundle.

## Overall status

- ready for Base mainnet cutover env: ${yesNo(report?.readiness?.readyForBaseMainnetCutoverEnv)}
- expected final chain: \`${expectedChain.chainName ?? 'Base'}\` (\`${expectedChain.chainId ?? 8453}\`)
- expected canonical mainnet \`wstETH\`: \`${expectedChain.expectedWstETH ?? '0x7f39c581f595b53c5cb5bbd8f2c9a0e1b8d9d2b2'}\`
- source validation artifact: \`${rel(CUTOVER_ENV_VALIDATION_PATH)}\`

## Missing checks → exact env values to fill

${missingChecklist || '- none'}

## Role-separation snapshot

- backend distinct addresses currently seen: \`${report?.roleSeparation?.backendDistinctAddresses ?? 'unknown'}\`
- backend fully separated: ${yesNo(report?.roleSeparation?.backendFullySeparated)}
- frontend distinct addresses currently seen: \`${report?.roleSeparation?.frontendDistinctAddresses ?? 'unknown'}\`
- frontend fully separated: ${yesNo(report?.roleSeparation?.frontendFullySeparated)}

## Derived signer addresses

- derived from \`PRIVATE_KEY\`: \`${derived.fromPrivateKey ?? 'missing'}\`
- derived from \`EXECUTOR_PRIVATE_KEY\`: \`${derived.fromExecutorPrivateKey ?? 'missing'}\`

## Address consistency checks

${bulletList(consistencyLines)}

## Validator warnings

${bulletList(warnings)}

## Recommended operator sequence

- Copy \`env/base-mainnet-cutover.example.env\` into local \`.env\` and fill every missing item above.
- Re-run:
  - \`CUTOVER_ENV_VALIDATION_OUT=artifacts/final/cutover-env-validation.json npm run final:validate-cutover-env\`
- Once the env is green, write the dashboard config locally:
  - \`FRONTEND_CHAIN=base npm run frontend:write-config\`
- Then refresh the full same-network bundle:
  - \`npm run final:refresh-readiness-bundle\`
- Only attempt the live Base mainnet MetaMask deployment/redemption path after the cutover env validator, frontend validator, and same-network validator all agree.
`;

  const resolvedOut = path.resolve(process.cwd(), OUT_PATH);
  mkdirSync(path.dirname(resolvedOut), { recursive: true });
  writeFileSync(resolvedOut, `${markdown}\n`);

  console.log(JSON.stringify({
    generatedAt: new Date().toISOString(),
    output: resolvedOut,
    sourceValidation: resolvedValidation,
  }, null, 2));
}

main();
