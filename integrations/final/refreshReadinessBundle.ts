import 'dotenv/config';

import { execFileSync } from 'node:child_process';
import path from 'node:path';

import { resolvePreflightArtifactPath } from '../metamask/preflightArtifactPath.js';

const PREFLIGHT_OUT = resolvePreflightArtifactPath(process.env.PREFLIGHT_OUT);
const FRONTEND_VALIDATION_OUT = process.env.FRONTEND_VALIDATION_OUT ?? 'artifacts/frontend/validation.json';
const CUTOVER_ENV_VALIDATION_OUT = process.env.CUTOVER_ENV_VALIDATION_OUT ?? 'artifacts/final/cutover-env-validation.json';
const FINAL_READINESS_OUT = process.env.FINAL_READINESS_OUT ?? 'artifacts/final/same-network-readiness.json';
const CUTOVER_CHECKLIST_OUT = process.env.CUTOVER_CHECKLIST_OUT ?? 'artifacts/final/cutover-checklist.md';
const CUTOVER_ENV_CHECKLIST_OUT = process.env.CUTOVER_ENV_CHECKLIST_OUT ?? 'artifacts/final/cutover-env-checklist.md';
const NPM_BIN = process.env.NPM_BIN ?? 'npm';
const REFRESH_PUBLIC_AGENT_ARTIFACTS =
  (process.env.REFRESH_PUBLIC_AGENT_ARTIFACTS ?? 'true').trim().toLowerCase() !== 'false';

function runScript(name: string, extraEnv: Record<string, string>) {
  execFileSync(NPM_BIN, ['run', name], {
    cwd: process.cwd(),
    stdio: 'inherit',
    env: {
      ...process.env,
      ...extraEnv,
    },
  });
}

function main() {
  const resolvedPreflight = path.resolve(process.cwd(), PREFLIGHT_OUT);
  const resolvedFrontendValidation = path.resolve(process.cwd(), FRONTEND_VALIDATION_OUT);
  const resolvedCutoverEnvValidation = path.resolve(process.cwd(), CUTOVER_ENV_VALIDATION_OUT);
  const resolvedFinalReadiness = path.resolve(process.cwd(), FINAL_READINESS_OUT);
  const resolvedCutoverChecklist = path.resolve(process.cwd(), CUTOVER_CHECKLIST_OUT);
  const resolvedCutoverEnvChecklist = path.resolve(process.cwd(), CUTOVER_ENV_CHECKLIST_OUT);
  const resolvedAgentManifest = path.resolve(process.cwd(), 'agent.json');
  const resolvedAgentLog = path.resolve(process.cwd(), 'agent_log.json');
  const resolvedWellKnownAgentManifest = path.resolve(process.cwd(), '.well-known/agent.json');
  const resolvedWellKnownAgentLog = path.resolve(process.cwd(), '.well-known/agent_log.json');

  if (REFRESH_PUBLIC_AGENT_ARTIFACTS) {
    runScript('submission:refresh-public-agent-artifacts', {});
  }

  runScript('final:validate-cutover-env', {
    CUTOVER_ENV_VALIDATION_OUT,
  });

  runScript('final:render-cutover-env-checklist', {
    CUTOVER_ENV_VALIDATION_PATH: CUTOVER_ENV_VALIDATION_OUT,
    CUTOVER_ENV_CHECKLIST_OUT,
  });

  runScript('metamask:preflight', {
    PREFLIGHT_OUT,
  });

  runScript('frontend:validate-config', {
    FRONTEND_VALIDATION_OUT,
    METAMASK_PREFLIGHT_PATH: PREFLIGHT_OUT,
  });

  runScript('final:validate-same-network', {
    FINAL_READINESS_OUT,
    METAMASK_PREFLIGHT_PATH: PREFLIGHT_OUT,
    FRONTEND_VALIDATION_PATH: FRONTEND_VALIDATION_OUT,
    CUTOVER_ENV_VALIDATION_PATH: CUTOVER_ENV_VALIDATION_OUT,
  });

  runScript('final:render-cutover-checklist', {
    CUTOVER_CHECKLIST_OUT,
    FINAL_READINESS_OUT,
    METAMASK_PREFLIGHT_PATH: PREFLIGHT_OUT,
    FRONTEND_VALIDATION_PATH: FRONTEND_VALIDATION_OUT,
    CUTOVER_ENV_VALIDATION_PATH: CUTOVER_ENV_VALIDATION_OUT,
  });

  runScript('submission:render-public-evidence-pack', {
    FINAL_READINESS_OUT,
    METAMASK_PREFLIGHT_PATH: PREFLIGHT_OUT,
    FRONTEND_VALIDATION_PATH: FRONTEND_VALIDATION_OUT,
    CUTOVER_ENV_VALIDATION_PATH: CUTOVER_ENV_VALIDATION_OUT,
    CUTOVER_ENV_CHECKLIST_OUT,
    CUTOVER_CHECKLIST_OUT,
  });

  console.log(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        refreshed: {
          publicAgentArtifacts: REFRESH_PUBLIC_AGENT_ARTIFACTS
            ? {
                agentManifest: resolvedAgentManifest,
                agentLog: resolvedAgentLog,
                wellKnownAgentManifest: resolvedWellKnownAgentManifest,
                wellKnownAgentLog: resolvedWellKnownAgentLog,
              }
            : null,
          cutoverEnvValidation: resolvedCutoverEnvValidation,
          cutoverEnvChecklist: resolvedCutoverEnvChecklist,
          preflight: resolvedPreflight,
          frontendValidation: resolvedFrontendValidation,
          finalReadiness: resolvedFinalReadiness,
          cutoverChecklist: resolvedCutoverChecklist,
        },
        note: REFRESH_PUBLIC_AGENT_ARTIFACTS
          ? 'Readiness bundle refreshed sequentially: public agent packaging -> cutover env validation -> generated markdown cutover-env checklist -> MetaMask preflight -> frontend validation -> final same-network report -> generated markdown cutover checklist -> generated public evidence pack.'
          : 'Readiness bundle refreshed sequentially: cutover env validation -> generated markdown cutover-env checklist -> MetaMask preflight -> frontend validation -> final same-network report -> generated markdown cutover checklist -> generated public evidence pack.',
      },
      null,
      2,
    ),
  );
}

main();
