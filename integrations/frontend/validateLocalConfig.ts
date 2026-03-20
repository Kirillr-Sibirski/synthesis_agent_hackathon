import 'dotenv/config';

import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { getAddress } from 'viem';

const CONFIG_PATH = process.env.FRONTEND_CONFIG_PATH ?? 'frontend/config.json';
const PREFLIGHT_PATH = process.env.METAMASK_PREFLIGHT_PATH ?? '';
const VALIDATION_OUT = process.env.FRONTEND_VALIDATION_OUT ?? '';

const BASE_MAINNET_CHAIN_ID = 8453;
const BASE_MAINNET_WSTETH = '0x7f39c581f595b53c5cb5bbd8f2c9a0e1b8d9d2b2';

type FrontendConfig = {
  chains?: Record<string, {
    rpcUrl?: string;
    treasury?: string;
    asset?: string;
    receiptRegistry?: string;
    authorizer?: string;
  }>;
  actors?: {
    budgetManager?: string;
    spendRecipient?: string;
    demoExecutor?: string;
    demoRecipient?: string;
    receiptHash?: string;
  };
};

function readJson(filePath: string) {
  return JSON.parse(readFileSync(filePath, 'utf8')) as any;
}

function asAddress(value: unknown) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    return getAddress(value.trim());
  } catch {
    return null;
  }
}

function roleWarnings(actors: FrontendConfig['actors']) {
  const ownerlessRoles = {
    budgetManager: asAddress(actors?.budgetManager),
    spendRecipient: asAddress(actors?.spendRecipient),
    demoExecutor: asAddress(actors?.demoExecutor),
    demoRecipient: asAddress(actors?.demoRecipient),
  };

  const normalized = Object.entries(ownerlessRoles).filter(([, value]) => value) as Array<[string, string]>;
  const unique = [...new Set(normalized.map(([, value]) => value))];
  const duplicates = unique
    .map((address) => ({
      address,
      roles: normalized.filter(([, value]) => value === address).map(([role]) => role),
    }))
    .filter((entry) => entry.roles.length > 1);

  return {
    distinctAddresses: unique.length,
    duplicates,
  };
}

function main() {
  const resolvedConfig = path.resolve(process.cwd(), CONFIG_PATH);
  if (!existsSync(resolvedConfig)) {
    throw new Error(`Frontend config not found at ${resolvedConfig}. Generate it first with npm run frontend:write-config.`);
  }

  const config = readJson(resolvedConfig) as FrontendConfig;
  const base = config.chains?.base ?? {};
  const actors = config.actors ?? {};

  const preflight = PREFLIGHT_PATH ? readJson(path.resolve(process.cwd(), PREFLIGHT_PATH)) : null;
  const warnings = roleWarnings(actors);

  const baseChecks = {
    rpcUrlPresent: Boolean(base.rpcUrl?.trim()),
    treasuryPresent: Boolean(asAddress(base.treasury)),
    assetPresent: Boolean(asAddress(base.asset)),
    receiptRegistryPresent: Boolean(asAddress(base.receiptRegistry)),
    authorizerPresent: Boolean(asAddress(base.authorizer)),
    correctMainnetWstETH: asAddress(base.asset) === getAddress(BASE_MAINNET_WSTETH),
  };

  const actorChecks = {
    budgetManagerPresent: Boolean(asAddress(actors.budgetManager)),
    spendRecipientPresent: Boolean(asAddress(actors.spendRecipient)),
    demoExecutorPresent: Boolean(asAddress(actors.demoExecutor)),
    demoRecipientPresent: Boolean(asAddress(actors.demoRecipient)),
    receiptHashPresent: typeof actors.receiptHash === 'string' && actors.receiptHash.trim().length > 0,
  };

  const preflightChecks = preflight
    ? {
        loaded: true,
        chainId: preflight.network?.chainId ?? null,
        chainName: preflight.network?.chainName ?? null,
        readyForFinalSameNetworkRun: preflight.readiness?.readyForFinalSameNetworkRun ?? null,
        treasuryMatches:
          asAddress(preflight.onchain?.treasuryAddress) && asAddress(base.treasury)
            ? asAddress(preflight.onchain?.treasuryAddress) === asAddress(base.treasury)
            : null,
        executorMatches:
          asAddress(preflight.accounts?.executor) && asAddress(actors.demoExecutor)
            ? asAddress(preflight.accounts?.executor) === asAddress(actors.demoExecutor)
            : null,
      }
    : {
        loaded: false,
      };

  const missing = [
    ...Object.entries(baseChecks)
      .filter(([, ok]) => !ok)
      .map(([key]) => `base.${key}`),
    ...Object.entries(actorChecks)
      .filter(([, ok]) => !ok)
      .map(([key]) => `actors.${key}`),
  ];

  const report = {
    generatedAt: new Date().toISOString(),
    configPath: resolvedConfig,
    expectedFinalChain: {
      chainId: BASE_MAINNET_CHAIN_ID,
      chainName: 'Base',
      expectedWstETH: BASE_MAINNET_WSTETH,
    },
    baseChecks,
    actorChecks,
    roleSeparation: warnings,
    preflightChecks,
    readiness: {
      readyForFrontendSameNetworkDemoConfig:
        missing.length === 0 &&
        warnings.duplicates.length === 0 &&
        (!preflight || preflight.readiness?.readyForFinalSameNetworkRun === true || preflightChecks.loaded === false),
      missing,
      warnings: [
        ...(warnings.duplicates.length
          ? [`Role overlap still present in frontend config: ${JSON.stringify(warnings.duplicates)}`]
          : []),
        ...(preflight && preflight.readiness?.readyForFinalSameNetworkRun !== true
          ? ['Loaded MetaMask preflight artifact is not yet ready for the final same-network run.']
          : []),
        ...(preflightChecks.loaded && preflightChecks.treasuryMatches === false
          ? ['Frontend base treasury does not match the loaded MetaMask preflight treasury.']
          : []),
        ...(preflightChecks.loaded && preflightChecks.executorMatches === false
          ? ['Frontend demoExecutor does not match the loaded MetaMask preflight executor.']
          : []),
      ],
    },
  };

  const output = JSON.stringify(report, null, 2);
  if (VALIDATION_OUT) {
    const resolvedOut = path.resolve(process.cwd(), VALIDATION_OUT);
    mkdirSync(path.dirname(resolvedOut), { recursive: true });
    writeFileSync(resolvedOut, `${output}\n`);
  }

  console.log(output);
}

main();
