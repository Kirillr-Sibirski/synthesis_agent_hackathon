import 'dotenv/config';

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const PREFLIGHT_PATH = process.env.METAMASK_PREFLIGHT_PATH ?? 'artifacts/metamask/preflight-8453.json';
const FRONTEND_VALIDATION_PATH = process.env.FRONTEND_VALIDATION_PATH ?? 'artifacts/frontend/validation.json';
const CUTOVER_ENV_VALIDATION_PATH = process.env.CUTOVER_ENV_VALIDATION_PATH ?? 'artifacts/final/cutover-env-validation.json';
const OUT_PATH = process.env.FINAL_READINESS_OUT ?? '';

function readJson(filePath: string) {
  return JSON.parse(readFileSync(filePath, 'utf8')) as any;
}

function uniq(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function main() {
  const resolvedPreflight = path.resolve(process.cwd(), PREFLIGHT_PATH);
  const resolvedFrontendValidation = path.resolve(process.cwd(), FRONTEND_VALIDATION_PATH);
  const resolvedCutoverEnvValidation = path.resolve(process.cwd(), CUTOVER_ENV_VALIDATION_PATH);

  const preflightLoaded = existsSync(resolvedPreflight);
  const frontendValidationLoaded = existsSync(resolvedFrontendValidation);
  const cutoverEnvValidationLoaded = existsSync(resolvedCutoverEnvValidation);

  const preflight = preflightLoaded ? readJson(resolvedPreflight) : null;
  const frontendValidation = frontendValidationLoaded ? readJson(resolvedFrontendValidation) : null;
  const cutoverEnvValidation = cutoverEnvValidationLoaded ? readJson(resolvedCutoverEnvValidation) : null;

  const metaMaskReady = preflight?.readiness?.readyForFinalSameNetworkRun === true;
  const frontendReady = frontendValidation?.readiness?.readyForFrontendSameNetworkDemoConfig === true;
  const cutoverEnvReady = cutoverEnvValidation?.readiness?.readyForBaseMainnetCutoverEnv === true;

  const blockers = uniq([
    ...(Array.isArray(preflight?.readiness?.remainingBlockers) ? preflight.readiness.remainingBlockers : []),
    ...(Array.isArray(frontendValidation?.readiness?.missing)
      ? frontendValidation.readiness.missing.map((item: string) => `Frontend missing: ${item}`)
      : []),
    ...(Array.isArray(frontendValidation?.readiness?.warnings) ? frontendValidation.readiness.warnings : []),
    ...(Array.isArray(cutoverEnvValidation?.readiness?.missing)
      ? cutoverEnvValidation.readiness.missing.map((item: string) => `Cutover env missing: ${item}`)
      : []),
    ...(Array.isArray(cutoverEnvValidation?.readiness?.warnings) ? cutoverEnvValidation.readiness.warnings : []),
    ...(!preflightLoaded ? [`Missing MetaMask preflight artifact: ${resolvedPreflight}`] : []),
    ...(!frontendValidationLoaded ? [`Missing frontend validation artifact: ${resolvedFrontendValidation}`] : []),
    ...(!cutoverEnvValidationLoaded ? [`Missing cutover env validation artifact: ${resolvedCutoverEnvValidation}`] : []),
  ]);

  const report = {
    generatedAt: new Date().toISOString(),
    inputs: {
      preflightPath: resolvedPreflight,
      preflightLoaded,
      frontendValidationPath: resolvedFrontendValidation,
      frontendValidationLoaded,
      cutoverEnvValidationPath: resolvedCutoverEnvValidation,
      cutoverEnvValidationLoaded,
    },
    summary: {
      metaMaskFinalSameNetworkReady: metaMaskReady,
      frontendFinalDemoConfigReady: frontendReady,
      cutoverEnvReady,
      overallReadyForSameNetworkDemoSubmission: metaMaskReady && frontendReady && cutoverEnvReady,
    },
    currentState: {
      selectedChain: preflight?.network?.chainName ?? null,
      selectedChainId: preflight?.network?.chainId ?? null,
      expectedFinalChain: preflight?.network?.finalSameNetworkTarget?.chainName ?? 'Base',
      expectedFinalChainId: preflight?.network?.finalSameNetworkTarget?.chainId ?? 8453,
      smartAccountDeployed: preflight?.onchain?.smartAccountDeployed ?? null,
      bundlerReachable: preflight?.bundler?.reachable ?? null,
      baseTreasuryConfiguredInFrontend: frontendValidation?.baseChecks?.treasuryPresent ?? null,
      baseReceiptRegistryConfiguredInFrontend: frontendValidation?.baseChecks?.receiptRegistryPresent ?? null,
      baseAuthorizerConfiguredInFrontend: frontendValidation?.baseChecks?.authorizerPresent ?? null,
      roleSeparatedInFrontendConfig:
        frontendValidation?.roleSeparation?.duplicates?.length === 0
          ? true
          : frontendValidation?.roleSeparation
            ? false
            : null,
      cutoverEnvReady,
      backendRoleSeparatedInEnv: cutoverEnvValidation?.roleSeparation?.backendFullySeparated ?? null,
      frontendRoleSeparatedInEnv: cutoverEnvValidation?.roleSeparation?.frontendFullySeparated ?? null,
    },
    blockers,
    nextActions: uniq([
      ...(!preflightLoaded
        ? ['Generate a MetaMask preflight artifact with: PREFLIGHT_OUT=artifacts/metamask/preflight-8453.json npm run metamask:preflight']
        : []),
      ...(!frontendValidationLoaded
        ? ['Generate a frontend validation artifact with: FRONTEND_VALIDATION_OUT=artifacts/frontend/validation.json METAMASK_PREFLIGHT_PATH=artifacts/metamask/preflight-8453.json npm run frontend:validate-config']
        : []),
      ...(!cutoverEnvValidationLoaded
        ? ['Generate a cutover env validation artifact with: CUTOVER_ENV_VALIDATION_OUT=artifacts/final/cutover-env-validation.json npm run final:validate-cutover-env']
        : []),
      ...(cutoverEnvReady ? [] : ['Finish the Base mainnet cutover env: chain selection, bundler, mainnet addresses, and distinct role wiring.']),
      ...(metaMaskReady ? [] : ['Finish the MetaMask Base mainnet path: mainnet chain selection, bundler, smart-account deployment, delegation redemption, and spend proof.']),
      ...(frontendReady ? [] : ['Finish the frontend Base mainnet demo config: treasury/authorizer/receipt registry/receipt hash plus distinct demo actors.']),
      ...(metaMaskReady && frontendReady && cutoverEnvReady
        ? ['Populate the final Base mainnet cutover template and record the judge-facing proof set.']
        : []),
    ]),
  };

  const output = JSON.stringify(report, null, 2);
  if (OUT_PATH) {
    const resolvedOut = path.resolve(process.cwd(), OUT_PATH);
    mkdirSync(path.dirname(resolvedOut), { recursive: true });
    writeFileSync(resolvedOut, `${output}\n`);
  }

  console.log(output);
}

main();
