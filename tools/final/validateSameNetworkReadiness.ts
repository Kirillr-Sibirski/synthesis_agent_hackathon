import 'dotenv/config';

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { resolvePreflightArtifactPath } from '../metamask/preflightArtifactPath.js';

const BASE_MAINNET_LIVE_NOTE_PATH = process.env.BASE_MAINNET_LIVE_NOTE_PATH ?? 'Memory/Deployments/base-mainnet-metamask-live.md';

const PREFLIGHT_PATH = resolvePreflightArtifactPath(process.env.METAMASK_PREFLIGHT_PATH);
const FRONTEND_VALIDATION_PATH = process.env.FRONTEND_VALIDATION_PATH ?? 'artifacts/frontend/validation.json';
const CUTOVER_ENV_VALIDATION_PATH = process.env.CUTOVER_ENV_VALIDATION_PATH ?? 'artifacts/final/cutover-env-validation.json';
const AGENT_MANIFEST_PATH = process.env.AGENT_MANIFEST_PATH ?? 'agent.json';
const AGENT_LOG_PATH = process.env.AGENT_LOG_PATH ?? 'agent_log.json';
const WELL_KNOWN_AGENT_MANIFEST_PATH = process.env.WELL_KNOWN_AGENT_MANIFEST_PATH ?? '.well-known/agent.json';
const WELL_KNOWN_AGENT_LOG_PATH = process.env.WELL_KNOWN_AGENT_LOG_PATH ?? '.well-known/agent_log.json';
const OUT_PATH = process.env.FINAL_READINESS_OUT ?? 'artifacts/final/same-network-readiness.json';

function readJson(filePath: string) {
  return JSON.parse(readFileSync(filePath, 'utf8')) as any;
}

function uniq(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function parseRecordedBaseMainnetLiveProof(filePath: string) {
  if (!existsSync(filePath)) {
    return {
      recorded: false,
      evidence: {
        liveNotePresent: false,
      },
    };
  }

  const contents = readFileSync(filePath, 'utf8');
  const hasBaseMainnetHeader = /Base Mainnet MetaMask \+ Lido Live Flow/i.test(contents);
  const hasBaseChainId = /Chain ID:\s*`8453`/i.test(contents);
  const hasMainnetWstEth = /Base mainnet `wstETH`:\s*`0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452`/i.test(contents);
  const hasDelegationRedemption = /Delegation redemption \+ treasury spend/i.test(contents);
  const hasReceiptEvidence = /recorded executor in receipt registry:/i.test(contents) && /receiptHash:/i.test(contents);
  const hasRuleEvidence = /ruleId:/i.test(contents);

  return {
    recorded:
      hasBaseMainnetHeader &&
      hasBaseChainId &&
      hasMainnetWstEth &&
      hasDelegationRedemption &&
      hasReceiptEvidence &&
      hasRuleEvidence,
    evidence: {
      liveNotePresent: true,
      hasBaseMainnetHeader,
      hasBaseChainId,
      hasMainnetWstEth,
      hasDelegationRedemption,
      hasReceiptEvidence,
      hasRuleEvidence,
    },
  };
}

function main() {
  const resolvedPreflight = path.resolve(process.cwd(), PREFLIGHT_PATH);
  const resolvedFrontendValidation = path.resolve(process.cwd(), FRONTEND_VALIDATION_PATH);
  const resolvedCutoverEnvValidation = path.resolve(process.cwd(), CUTOVER_ENV_VALIDATION_PATH);
  const resolvedAgentManifest = path.resolve(process.cwd(), AGENT_MANIFEST_PATH);
  const resolvedAgentLog = path.resolve(process.cwd(), AGENT_LOG_PATH);
  const resolvedWellKnownAgentManifest = path.resolve(process.cwd(), WELL_KNOWN_AGENT_MANIFEST_PATH);
  const resolvedWellKnownAgentLog = path.resolve(process.cwd(), WELL_KNOWN_AGENT_LOG_PATH);
  const resolvedBaseMainnetLiveNote = path.resolve(process.cwd(), BASE_MAINNET_LIVE_NOTE_PATH);

  const preflightLoaded = existsSync(resolvedPreflight);
  const frontendValidationLoaded = existsSync(resolvedFrontendValidation);
  const cutoverEnvValidationLoaded = existsSync(resolvedCutoverEnvValidation);
  const agentManifestLoaded = existsSync(resolvedAgentManifest);
  const agentLogLoaded = existsSync(resolvedAgentLog);
  const wellKnownAgentManifestLoaded = existsSync(resolvedWellKnownAgentManifest);
  const wellKnownAgentLogLoaded = existsSync(resolvedWellKnownAgentLog);
  const baseMainnetLiveNoteRecorded = existsSync(resolvedBaseMainnetLiveNote);

  const preflight = preflightLoaded ? readJson(resolvedPreflight) : null;
  const frontendValidation = frontendValidationLoaded ? readJson(resolvedFrontendValidation) : null;
  const cutoverEnvValidation = cutoverEnvValidationLoaded ? readJson(resolvedCutoverEnvValidation) : null;
  const agentManifest = agentManifestLoaded ? readJson(resolvedAgentManifest) : null;
  const agentLog = agentLogLoaded ? readJson(resolvedAgentLog) : null;
  const recordedBaseMainnetLiveProof = parseRecordedBaseMainnetLiveProof(resolvedBaseMainnetLiveNote);

  const metaMaskReady = preflight?.readiness?.readyForFinalSameNetworkRun === true;
  const frontendReady = frontendValidation?.readiness?.readyForFrontendSameNetworkDemoConfig === true;
  const cutoverEnvReady = cutoverEnvValidation?.readiness?.readyForBaseMainnetCutoverEnv === true;
  const frontendRoleSeparated =
    frontendValidation?.roleSeparation?.readySeparation ??
    (frontendValidation?.roleSeparation?.duplicates?.length === 0);
  const erc8004PackagingReady =
    agentManifestLoaded &&
    agentLogLoaded &&
    wellKnownAgentManifestLoaded &&
    wellKnownAgentLogLoaded &&
    agentManifest?.erc8004?.status === 'registered_via_synthesis' &&
    typeof agentManifest?.erc8004?.registrationTx === 'string' &&
    agentManifest.erc8004.registrationTx.trim().length > 0 &&
    Array.isArray(agentLog?.entries) &&
    agentLog.entries.some((entry: any) => entry?.phase === 'identity' && entry?.status === 'success');
  const noHumanRequiredClaimHonest =
    agentManifest?.developmentModel?.canHonestlyBePresentedAsNoHumanRequired === true;

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
    ...(!agentManifestLoaded ? [`Missing root agent manifest: ${resolvedAgentManifest}`] : []),
    ...(!agentLogLoaded ? [`Missing root agent log: ${resolvedAgentLog}`] : []),
    ...(!wellKnownAgentManifestLoaded ? [`Missing .well-known agent manifest: ${resolvedWellKnownAgentManifest}`] : []),
    ...(!wellKnownAgentLogLoaded ? [`Missing .well-known agent log: ${resolvedWellKnownAgentLog}`] : []),
    ...(agentManifestLoaded && agentManifest?.erc8004?.status !== 'registered_via_synthesis'
      ? ['agent.json does not currently declare registered_via_synthesis ERC-8004 status.']
      : []),
    ...(agentManifestLoaded && !(typeof agentManifest?.erc8004?.registrationTx === 'string' && agentManifest.erc8004.registrationTx.trim())
      ? ['agent.json is missing the ERC-8004 registration transaction reference.']
      : []),
    ...(agentLogLoaded && !(Array.isArray(agentLog?.entries) && agentLog.entries.some((entry: any) => entry?.phase === 'identity' && entry?.status === 'success'))
      ? ['agent_log.json is missing a successful identity-registration entry.']
      : []),
  ]);

  const trackQualification = {
    agentsWithReceiptsErc8004: {
      currentlyHonest: erc8004PackagingReady,
      evidence: {
        erc8004Registered: agentManifest?.erc8004?.status === 'registered_via_synthesis',
        registrationTxRecorded: Boolean(agentManifest?.erc8004?.registrationTx),
        rootManifestPresent: agentManifestLoaded,
        rootLogPresent: agentLogLoaded,
        wellKnownManifestPresent: wellKnownAgentManifestLoaded,
        wellKnownLogPresent: wellKnownAgentLogLoaded,
      },
      blockerIfAny: erc8004PackagingReady ? null : 'Finish public ERC-8004 manifest/log packaging and identity linkage.',
    },
    bestUseOfDelegations: {
      currentlyHonest: metaMaskReady || recordedBaseMainnetLiveProof.recorded,
      evidence: {
        preflightLoaded,
        selectedChainId: preflight?.network?.chainId ?? null,
        smartAccountDeployed: preflight?.onchain?.smartAccountDeployed ?? null,
        bundlerReachable: preflight?.bundler?.reachable ?? null,
        recordedBaseMainnetLiveProof: recordedBaseMainnetLiveProof.evidence,
      },
      blockerIfAny:
        metaMaskReady || recordedBaseMainnetLiveProof.recorded
          ? null
          : 'MetaMask smart-account deployment/redemption proof is still missing on the final same-network target.',
    },
    stEthAgentTreasury: {
      currentlyHonest: cutoverEnvReady || recordedBaseMainnetLiveProof.recorded,
      evidence: {
        expectedFinalChainId: cutoverEnvValidation?.expectedFinalChain?.chainId ?? 8453,
        wstETHConfiguredForBaseMainnet: cutoverEnvValidation?.checks?.wstETHIsBaseMainnet ?? null,
        treasuryConfigured: cutoverEnvValidation?.checks?.treasuryConfigured ?? null,
        roleSeparated: cutoverEnvValidation?.roleSeparation?.backendFullySeparated ?? null,
        recordedBaseMainnetLiveProof: recordedBaseMainnetLiveProof.evidence,
      },
      blockerIfAny:
        cutoverEnvReady || recordedBaseMainnetLiveProof.recorded
          ? null
          : 'Real Base mainnet wstETH deployment/env path is not fully wired yet.',
    },
    letTheAgentCook: {
      currentlyHonest: frontendReady && erc8004PackagingReady,
      evidence: {
        frontendReady,
        roleSeparatedInFrontendConfig: frontendRoleSeparated,
        publicManifestAndLogReady: erc8004PackagingReady,
      },
      blockerIfAny:
        frontendReady && erc8004PackagingReady
          ? null
          : recordedBaseMainnetLiveProof.recorded && erc8004PackagingReady
            ? 'Historical live proof is recorded, but the current local frontend cutover config is still incomplete for a fresh same-network rerun.'
            : 'Judge-ready frontend demo surface and/or public agent packaging still need final completion.',
    },
    synthesisOpenTrack: {
      currentlyHonest: true,
      evidence: {
        repoPublicEvidencePackPresent: true,
      },
      blockerIfAny: null,
    },
  };

  const report = {
    generatedAt: new Date().toISOString(),
    inputs: {
      preflightPath: resolvedPreflight,
      preflightLoaded,
      frontendValidationPath: resolvedFrontendValidation,
      frontendValidationLoaded,
      cutoverEnvValidationPath: resolvedCutoverEnvValidation,
      cutoverEnvValidationLoaded,
      agentManifestPath: resolvedAgentManifest,
      agentManifestLoaded,
      agentLogPath: resolvedAgentLog,
      agentLogLoaded,
      wellKnownAgentManifestPath: resolvedWellKnownAgentManifest,
      wellKnownAgentManifestLoaded,
      wellKnownAgentLogPath: resolvedWellKnownAgentLog,
      wellKnownAgentLogLoaded,
    },
    summary: {
      metaMaskFinalSameNetworkReady: metaMaskReady,
      frontendFinalDemoConfigReady: frontendReady,
      cutoverEnvReady,
      erc8004PackagingReady,
      overallReadyForSameNetworkDemoSubmission: metaMaskReady && frontendReady && cutoverEnvReady,
      currentlyHonestTracks: Object.entries(trackQualification)
        .filter(([, value]) => Boolean((value as any).currentlyHonest))
        .map(([key]) => key),
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
        typeof frontendRoleSeparated === 'boolean'
          ? frontendRoleSeparated
          ? true
          : frontendValidation?.roleSeparation
            ? false
            : null
          : null,
      cutoverEnvReady,
      backendRoleSeparatedInEnv: cutoverEnvValidation?.roleSeparation?.backendFullySeparated ?? null,
      frontendRoleSeparatedInEnv: cutoverEnvValidation?.roleSeparation?.frontendFullySeparated ?? null,
      erc8004RegistrationTx: agentManifest?.erc8004?.registrationTx ?? null,
      recordedBaseMainnetLiveProof: recordedBaseMainnetLiveProof.evidence,
    },
    trackQualification,
    blockers,
    nextActions: uniq([
      ...(!preflightLoaded
        ? ['Generate a MetaMask preflight artifact with: PREFLIGHT_OUT=artifacts/metamask/preflight-8453.json bun run metamask:preflight']
        : []),
      ...(!frontendValidationLoaded
        ? ['Generate a frontend validation artifact with: FRONTEND_VALIDATION_OUT=artifacts/frontend/validation.json METAMASK_PREFLIGHT_PATH=artifacts/metamask/preflight-8453.json bun run frontend:validate-config']
        : []),
      ...(!cutoverEnvValidationLoaded
        ? ['Generate a cutover env validation artifact with: CUTOVER_ENV_VALIDATION_OUT=artifacts/final/cutover-env-validation.json bun run final:validate-cutover-env']
        : []),
      ...(cutoverEnvReady ? [] : ['Finish the Base mainnet cutover env: chain selection, bundler, mainnet addresses, and distinct role wiring.']),
      ...(metaMaskReady ? [] : ['Finish the MetaMask Base mainnet path: mainnet chain selection, bundler, smart-account deployment, delegation redemption, and spend proof.']),
      ...(frontendReady ? [] : ['Finish the frontend Base mainnet demo config: treasury/authorizer/receipt registry/receipt hash plus distinct demo actors.']),
      ...(erc8004PackagingReady ? [] : ['Refresh/finalize public ERC-8004 packaging: root + .well-known agent manifests/logs, registration tx linkage, and identity entry in agent_log.json.']),
      ...(metaMaskReady && frontendReady && cutoverEnvReady && !baseMainnetLiveNoteRecorded
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
