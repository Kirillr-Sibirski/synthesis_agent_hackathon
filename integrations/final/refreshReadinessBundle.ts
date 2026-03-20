import 'dotenv/config';

import { execFileSync } from 'node:child_process';
import path from 'node:path';

const PREFLIGHT_OUT = process.env.PREFLIGHT_OUT ?? 'artifacts/metamask/preflight-8453.json';
const FRONTEND_VALIDATION_OUT = process.env.FRONTEND_VALIDATION_OUT ?? 'artifacts/frontend/validation.json';
const FINAL_READINESS_OUT = process.env.FINAL_READINESS_OUT ?? 'artifacts/final/same-network-readiness.json';
const NPM_BIN = process.env.NPM_BIN ?? 'npm';

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
  const resolvedFinalReadiness = path.resolve(process.cwd(), FINAL_READINESS_OUT);

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
  });

  console.log(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        refreshed: {
          preflight: resolvedPreflight,
          frontendValidation: resolvedFrontendValidation,
          finalReadiness: resolvedFinalReadiness,
        },
        note: 'Readiness bundle refreshed sequentially: MetaMask preflight -> frontend validation -> final same-network report.',
      },
      null,
      2,
    ),
  );
}

main();
