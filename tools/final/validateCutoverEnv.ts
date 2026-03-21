import 'dotenv/config';

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { getAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const OUT_PATH = process.env.CUTOVER_ENV_VALIDATION_OUT ?? '';
const BASE_MAINNET_WSTETH = '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452';

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

function normalizeAddresses(values: string[]) {
  return values.filter(Boolean).map((value) => {
    try {
      return getAddress(value);
    } catch {
      return value;
    }
  });
}

function classifyFrontendRoleSeparation(roles: Record<string, string>) {
  const normalizedEntries = Object.entries(roles)
    .map(([role, value]) => [role, normalizeAddresses([value])[0]])
    .filter(([, value]) => Boolean(value)) as Array<[string, string]>;

  const unique = [...new Set(normalizedEntries.map(([, value]) => value))];
  const duplicates = unique
    .map((address) => ({
      address,
      roles: normalizedEntries.filter(([, value]) => value === address).map(([role]) => role),
    }))
    .filter((entry) => entry.roles.length > 1);

  const allowedDuplicates = duplicates.filter((entry) => {
    const roles = [...entry.roles].sort();
    return roles.length === 2 && roles[0] === 'demoRecipient' && roles[1] === 'spendRecipient';
  });

  const blockingDuplicates = duplicates.filter((entry) => !allowedDuplicates.includes(entry));

  return {
    distinctAddresses: unique.length,
    duplicates,
    allowedDuplicates,
    blockingDuplicates,
    frontendFullySeparated: normalizedEntries.length >= 4 && blockingDuplicates.length === 0,
  };
}

function deriveAddressFromPrivateKey(value: string) {
  try {
    return getAddress(privateKeyToAccount(value as `0x${string}`).address);
  } catch {
    return null;
  }
}

function main() {
  const derivedOwnerAddress = has('PRIVATE_KEY') ? deriveAddressFromPrivateKey(env('PRIVATE_KEY')) : null;
  const derivedExecutorAddress = has('EXECUTOR_PRIVATE_KEY') ? deriveAddressFromPrivateKey(env('EXECUTOR_PRIVATE_KEY')) : null;
  const ownerDeclared = env('TREASURY_OWNER');
  const managerDeclared = env('MANAGER_ADDRESS');
  const executorDeclared = env('EXECUTOR_ADDRESS');
  const recipientDeclared = env('RECIPIENT_ADDRESS');
  const demoExecutorDeclared = env('DEMO_EXECUTOR');
  const demoRecipientDeclared = env('DEMO_RECIPIENT');
  const frontendBudgetManagerDeclared = env('FRONTEND_BUDGET_MANAGER');
  const frontendSpendRecipientDeclared = env('FRONTEND_SPEND_RECIPIENT');
  const frontendDemoExecutorDeclared = env('FRONTEND_DEMO_EXECUTOR');
  const frontendDemoRecipientDeclared = env('FRONTEND_DEMO_RECIPIENT');
  const treasuryExecutorDeclared = env('TREASURY_EXECUTOR_ADDRESS');

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

  const roleAddresses = [ownerDeclared, managerDeclared, executorDeclared, recipientDeclared].filter(Boolean);
  const frontendRoleAddresses = [
    frontendBudgetManagerDeclared,
    frontendSpendRecipientDeclared,
    frontendDemoExecutorDeclared,
    frontendDemoRecipientDeclared,
  ].filter(Boolean);
  const frontendRoleSeparation = classifyFrontendRoleSeparation({
    budgetManager: frontendBudgetManagerDeclared,
    spendRecipient: frontendSpendRecipientDeclared,
    demoExecutor: frontendDemoExecutorDeclared,
    demoRecipient: frontendDemoRecipientDeclared,
  });

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
      frontendDistinctAddresses: frontendRoleSeparation.distinctAddresses,
      frontendFullySeparated: frontendRoleSeparation.frontendFullySeparated,
      frontendDuplicates: frontendRoleSeparation.duplicates,
      frontendAllowedDuplicates: frontendRoleSeparation.allowedDuplicates,
      frontendBlockingDuplicates: frontendRoleSeparation.blockingDuplicates,
    },
    derivedAddresses: {
      fromPrivateKey: derivedOwnerAddress,
      fromExecutorPrivateKey: derivedExecutorAddress,
    },
    addressConsistency: {
      ownerMatchesPrivateKey: derivedOwnerAddress ? sameAddress(ownerDeclared, derivedOwnerAddress) : null,
      executorMatchesExecutorKey: derivedExecutorAddress ? sameAddress(executorDeclared, derivedExecutorAddress) : null,
      demoExecutorMatchesExecutorAddress:
        demoExecutorDeclared && executorDeclared ? sameAddress(demoExecutorDeclared, executorDeclared) : null,
      demoRecipientMatchesRecipientAddress:
        demoRecipientDeclared && recipientDeclared ? sameAddress(demoRecipientDeclared, recipientDeclared) : null,
      frontendBudgetManagerMatchesManagerAddress:
        frontendBudgetManagerDeclared && managerDeclared ? sameAddress(frontendBudgetManagerDeclared, managerDeclared) : null,
      frontendSpendRecipientMatchesRecipientAddress:
        frontendSpendRecipientDeclared && recipientDeclared ? sameAddress(frontendSpendRecipientDeclared, recipientDeclared) : null,
      frontendDemoExecutorMatchesExecutorAddress:
        frontendDemoExecutorDeclared && (treasuryExecutorDeclared || executorDeclared)
          ? sameAddress(frontendDemoExecutorDeclared, treasuryExecutorDeclared || executorDeclared)
          : null,
      frontendDemoRecipientMatchesRecipientAddress:
        frontendDemoRecipientDeclared && recipientDeclared ? sameAddress(frontendDemoRecipientDeclared, recipientDeclared) : null,
    },
    readiness: {
      readyForBaseMainnetCutoverEnv:
        Object.values(checks).every(Boolean) &&
        roleAddresses.length >= 4 &&
        distinctAddresses(roleAddresses) === roleAddresses.length &&
        frontendRoleAddresses.length >= 4 &&
        frontendRoleSeparation.frontendFullySeparated,
      missing: Object.entries(checks)
        .filter(([, ok]) => !ok)
        .map(([name]) => name),
      warnings: [
        ...(roleAddresses.length >= 4 && distinctAddresses(roleAddresses) !== roleAddresses.length
          ? ['Backend role addresses are not fully separated yet.']
          : []),
        ...(frontendRoleAddresses.length >= 4 && frontendRoleSeparation.blockingDuplicates.length > 0
          ? ['Frontend role addresses are not fully separated yet.']
          : []),
        ...(frontendRoleAddresses.length > 0 && frontendRoleAddresses.length < 4
          ? ['Frontend role env is incomplete; expected budget manager, spend recipient, demo executor, and demo recipient.']
          : []),
        ...(derivedOwnerAddress && ownerDeclared && !sameAddress(ownerDeclared, derivedOwnerAddress)
          ? [`TREASURY_OWNER does not match the loaded PRIVATE_KEY address (${derivedOwnerAddress}).`]
          : []),
        ...(derivedExecutorAddress && executorDeclared && !sameAddress(executorDeclared, derivedExecutorAddress)
          ? [`EXECUTOR_ADDRESS does not match the loaded EXECUTOR_PRIVATE_KEY address (${derivedExecutorAddress}).`]
          : []),
        ...(demoExecutorDeclared && executorDeclared && !sameAddress(demoExecutorDeclared, executorDeclared)
          ? ['DEMO_EXECUTOR does not match EXECUTOR_ADDRESS.']
          : []),
        ...(demoRecipientDeclared && recipientDeclared && !sameAddress(demoRecipientDeclared, recipientDeclared)
          ? ['DEMO_RECIPIENT does not match RECIPIENT_ADDRESS.']
          : []),
        ...(frontendBudgetManagerDeclared && managerDeclared && !sameAddress(frontendBudgetManagerDeclared, managerDeclared)
          ? ['FRONTEND_BUDGET_MANAGER does not match MANAGER_ADDRESS.']
          : []),
        ...(frontendSpendRecipientDeclared && recipientDeclared && !sameAddress(frontendSpendRecipientDeclared, recipientDeclared)
          ? ['FRONTEND_SPEND_RECIPIENT does not match RECIPIENT_ADDRESS.']
          : []),
        ...(frontendDemoExecutorDeclared &&
        (treasuryExecutorDeclared || executorDeclared) &&
        !sameAddress(frontendDemoExecutorDeclared, treasuryExecutorDeclared || executorDeclared)
          ? ['FRONTEND_DEMO_EXECUTOR does not match TREASURY_EXECUTOR_ADDRESS / smart-account caller.']
          : []),
        ...(frontendDemoRecipientDeclared && recipientDeclared && !sameAddress(frontendDemoRecipientDeclared, recipientDeclared)
          ? ['FRONTEND_DEMO_RECIPIENT does not match RECIPIENT_ADDRESS.']
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
