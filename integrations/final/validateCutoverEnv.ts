import 'dotenv/config';

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { getAddress } from 'viem';

const OUT_PATH = process.env.CUTOVER_ENV_VALIDATION_OUT ?? '';
const BASE_MAINNET_WSTETH = '0x7f39c581f595b53c5cb5bbd8f2c9a0e1b8d9d2b2';

function env(name: string) {
  return process.env[name]?.trim() ?? '';
}

function has(name: string) {
  return env(name).length > 0;
}

function sameAddress(a: string, b: string) {
  try {
    return getAddress(a) === getAddress(b);
  } catch {
    return false;
  }
}

function distinctAddresses(values: string[]) {
  const normalized = values.filter(Boolean).map((value) => {
    try {
      return getAddress(value);
    } catch {
      return value;
    }
  });
  return [...new Set(normalized)].length;
}

function main() {
  const checks = {
    metaMaskChainIsBase: env('METAMASK_CHAIN').toLowerCase() === 'base',
    frontendChainIsBase: env('FRONTEND_CHAIN').toLowerCase() === 'base',
    rpcConfigured: has('RPC_URL') || has('BASE_MAINNET_RPC_URL') || has('BASE_RPC_URL'),
    bundlerConfigured: has('BUNDLER_URL'),
    privateKeyConfigured: has('PRIVATE_KEY'),
    executorKeyConfigured: has('EXECUTOR_PRIVATE_KEY'),
    wstETHConfigured: has('WSTETH_ADDRESS'),
    wstETHIsBaseMainnet: has('WSTETH_ADDRESS') && sameAddress(env('WSTETH_ADDRESS'), BASE_MAINNET_WSTETH),
    treasuryConfigured: has('TREASURY_ADDRESS'),
    authorizerConfigured: has('AUTHORIZER_ADDRESS'),
    receiptRegistryConfigured: has('RECEIPT_REGISTRY_ADDRESS'),
    managerConfigured: has('MANAGER_ADDRESS'),
    executorConfigured: has('EXECUTOR_ADDRESS'),
    recipientConfigured: has('RECIPIENT_ADDRESS'),
    frontendTreasuryConfigured: has('FRONTEND_TREASURY_ADDRESS'),
    frontendAuthorizerConfigured: has('FRONTEND_AUTHORIZER_ADDRESS'),
    frontendReceiptRegistryConfigured: has('FRONTEND_RECEIPT_REGISTRY_ADDRESS'),
    frontendAssetConfigured: has('FRONTEND_ASSET_ADDRESS'),
    frontendAssetIsBaseMainnet: has('FRONTEND_ASSET_ADDRESS') && sameAddress(env('FRONTEND_ASSET_ADDRESS'), BASE_MAINNET_WSTETH),
    frontendBudgetManagerConfigured: has('FRONTEND_BUDGET_MANAGER'),
    frontendSpendRecipientConfigured: has('FRONTEND_SPEND_RECIPIENT'),
    frontendDemoExecutorConfigured: has('FRONTEND_DEMO_EXECUTOR'),
    frontendDemoRecipientConfigured: has('FRONTEND_DEMO_RECIPIENT'),
    frontendReceiptHashConfigured: has('FRONTEND_RECEIPT_HASH'),
  };

  const roleAddresses = [env('TREASURY_OWNER'), env('MANAGER_ADDRESS'), env('EXECUTOR_ADDRESS'), env('RECIPIENT_ADDRESS')].filter(Boolean);
  const frontendRoleAddresses = [
    env('FRONTEND_BUDGET_MANAGER'),
    env('FRONTEND_SPEND_RECIPIENT'),
    env('FRONTEND_DEMO_EXECUTOR'),
    env('FRONTEND_DEMO_RECIPIENT'),
  ].filter(Boolean);

  const report = {
    generatedAt: new Date().toISOString(),
    expectedFinalChain: {
      chainName: 'Base',
      chainId: 8453,
      expectedWstETH: BASE_MAINNET_WSTETH,
    },
    checks,
    roleSeparation: {
      backendDistinctAddresses: distinctAddresses(roleAddresses),
      backendFullySeparated: roleAddresses.length >= 4 && distinctAddresses(roleAddresses) === roleAddresses.length,
      frontendDistinctAddresses: distinctAddresses(frontendRoleAddresses),
      frontendFullySeparated: frontendRoleAddresses.length >= 4 && distinctAddresses(frontendRoleAddresses) === frontendRoleAddresses.length,
    },
    readiness: {
      readyForBaseMainnetCutoverEnv:
        Object.values(checks).every(Boolean) &&
        roleAddresses.length >= 4 &&
        distinctAddresses(roleAddresses) === roleAddresses.length &&
        frontendRoleAddresses.length >= 4 &&
        distinctAddresses(frontendRoleAddresses) === frontendRoleAddresses.length,
      missing: Object.entries(checks)
        .filter(([, ok]) => !ok)
        .map(([name]) => name),
      warnings: [
        ...(roleAddresses.length >= 4 && distinctAddresses(roleAddresses) !== roleAddresses.length
          ? ['Backend role addresses are not fully separated yet.']
          : []),
        ...(frontendRoleAddresses.length >= 4 && distinctAddresses(frontendRoleAddresses) !== frontendRoleAddresses.length
          ? ['Frontend role addresses are not fully separated yet.']
          : []),
        ...(frontendRoleAddresses.length > 0 && frontendRoleAddresses.length < 4
          ? ['Frontend role env is incomplete; expected budget manager, spend recipient, demo executor, and demo recipient.']
          : []),
      ],
    },
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
