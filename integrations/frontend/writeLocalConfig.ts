import 'dotenv/config';

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

type ChainKey = 'base' | 'baseSepolia';

type FrontendConfig = {
  chains: Record<ChainKey, {
    rpcUrl: string;
    treasury: string;
    asset: string;
    receiptRegistry: string;
    authorizer: string;
  }>;
  actors: {
    budgetManager: string;
    spendRecipient: string;
    demoExecutor: string;
    demoRecipient: string;
    receiptHash: string;
  };
};

const BASE_WSTETH = '0x7f39c581f595b53c5cb5bbd8f2c9a0e1b8d9d2b2';
const BASE_SEPOLIA_DEFAULTS = {
  rpcUrl: 'https://sepolia.base.org',
  treasury: '0xB38F8a149F95850cB5efF5fCE5621d36b8F8BBd0',
  asset: '0x623f9f72342a3c2518c880d8372de90eaef200cd',
  receiptRegistry: '0xEa7E65954B7A057f739AdC103D3547b9D99aa7f6',
  authorizer: '0x4434F99f7655F94705217601706536Bd94273c2F',
};

const FRONTEND_CHAIN = (process.env.FRONTEND_CHAIN ?? 'base') as ChainKey;
const OUT_PATH = process.env.FRONTEND_CONFIG_OUT ?? 'frontend/config.json';
const ENV_CHAIN_RAW = (process.env.METAMASK_CHAIN ?? '').trim().toLowerCase();

if (!['base', 'baseSepolia'].includes(FRONTEND_CHAIN)) {
  throw new Error('Unsupported FRONTEND_CHAIN. Use base or baseSepolia.');
}

function env(name: string) {
  return process.env[name]?.trim() ?? '';
}

function choose(...values: string[]) {
  return values.find((value) => value.trim().length > 0) ?? '';
}

function normalizeChainKey(value: string): ChainKey | '' {
  if (value === 'base') return 'base';
  if (value === 'base-sepolia' || value === 'basesepolia' || value === 'baseSepolia') return 'baseSepolia';
  return '';
}

function genericEnvMatches(chain: ChainKey) {
  const envChain = normalizeChainKey(ENV_CHAIN_RAW);
  return envChain ? envChain === chain : chain === 'baseSepolia';
}

function buildConfig(): FrontendConfig {
  const baseRpc = choose(env('FRONTEND_BASE_RPC_URL'), env('BASE_MAINNET_RPC_URL'), env('BASE_RPC_URL'), 'https://mainnet.base.org');
  const baseSepoliaRpc = choose(env('FRONTEND_BASE_SEPOLIA_RPC_URL'), env('BASE_SEPOLIA_RPC_URL'), BASE_SEPOLIA_DEFAULTS.rpcUrl);

  const genericTreasury = env('TREASURY_ADDRESS');
  const genericAuthorizer = env('AUTHORIZER_ADDRESS');
  const genericReceiptRegistry = env('RECEIPT_REGISTRY_ADDRESS');
  const genericAsset = env('WSTETH_ADDRESS');

  const baseTreasury = choose(
    env('FRONTEND_TREASURY_ADDRESS'),
    genericEnvMatches('base') ? genericTreasury : '',
  );
  const baseAuthorizer = choose(
    env('FRONTEND_AUTHORIZER_ADDRESS'),
    genericEnvMatches('base') ? genericAuthorizer : '',
  );
  const baseReceiptRegistry = choose(
    env('FRONTEND_RECEIPT_REGISTRY_ADDRESS'),
    genericEnvMatches('base') ? genericReceiptRegistry : '',
  );
  const baseAsset = choose(
    env('FRONTEND_ASSET_ADDRESS'),
    genericEnvMatches('base') ? genericAsset : '',
    BASE_WSTETH,
  );

  const sepoliaTreasury = choose(
    env('FRONTEND_BASE_SEPOLIA_TREASURY_ADDRESS'),
    genericEnvMatches('baseSepolia') ? genericTreasury : '',
    BASE_SEPOLIA_DEFAULTS.treasury,
  );
  const sepoliaAuthorizer = choose(
    env('FRONTEND_BASE_SEPOLIA_AUTHORIZER_ADDRESS'),
    genericEnvMatches('baseSepolia') ? genericAuthorizer : '',
    BASE_SEPOLIA_DEFAULTS.authorizer,
  );
  const sepoliaReceiptRegistry = choose(
    env('FRONTEND_BASE_SEPOLIA_RECEIPT_REGISTRY_ADDRESS'),
    genericEnvMatches('baseSepolia') ? genericReceiptRegistry : '',
    BASE_SEPOLIA_DEFAULTS.receiptRegistry,
  );
  const sepoliaAsset = choose(
    env('FRONTEND_BASE_SEPOLIA_ASSET_ADDRESS'),
    genericEnvMatches('baseSepolia') ? genericAsset : '',
    BASE_SEPOLIA_DEFAULTS.asset,
  );

  const manager = choose(env('FRONTEND_BUDGET_MANAGER'), env('MANAGER_ADDRESS'), env('TREASURY_OWNER'));
  const executor = choose(env('FRONTEND_DEMO_EXECUTOR'), env('EXECUTOR_ADDRESS'), env('DEMO_EXECUTOR'));
  const spendRecipient = choose(env('FRONTEND_SPEND_RECIPIENT'), env('RECIPIENT_ADDRESS'));
  const demoRecipient = choose(env('FRONTEND_DEMO_RECIPIENT'), env('DEMO_RECIPIENT'), spendRecipient);
  const receiptHash = choose(env('FRONTEND_RECEIPT_HASH'), env('RECEIPT_HASH'));

  return {
    chains: {
      base: {
        rpcUrl: baseRpc,
        treasury: baseTreasury,
        asset: baseAsset,
        receiptRegistry: baseReceiptRegistry,
        authorizer: baseAuthorizer,
      },
      baseSepolia: {
        rpcUrl: baseSepoliaRpc,
        treasury: sepoliaTreasury,
        asset: sepoliaAsset,
        receiptRegistry: sepoliaReceiptRegistry,
        authorizer: sepoliaAuthorizer,
      },
    },
    actors: {
      budgetManager: manager,
      spendRecipient,
      demoExecutor: executor,
      demoRecipient,
      receiptHash,
    },
  };
}

function main() {
  const config = buildConfig();
  const resolved = path.resolve(process.cwd(), OUT_PATH);
  mkdirSync(path.dirname(resolved), { recursive: true });
  writeFileSync(resolved, `${JSON.stringify(config, null, 2)}\n`);

  console.log(JSON.stringify({
    written: resolved,
    frontendChain: FRONTEND_CHAIN,
    note: FRONTEND_CHAIN === 'base'
      ? 'Base mainnet cutover config written. Fill any remaining blanks before demo use.'
      : 'Base Sepolia frontend config written.',
    config,
  }, null, 2));
}

main();
