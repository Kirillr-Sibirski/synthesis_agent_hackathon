import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function ensureHex(value: string): `0x${string}` {
  return value.startsWith('0x') ? (value as `0x${string}`) : (`0x${value}` as `0x${string}`);
}

async function readArtifact(relativePath: string) {
  const repoRoot = path.resolve(process.cwd(), '..');
  const resolved = path.join(repoRoot, relativePath);
  const raw = await readFile(resolved, 'utf8');
  const parsed = JSON.parse(raw) as { abi: unknown; bytecode?: { object?: string } };

  return {
    abi: parsed.abi,
    bytecode: ensureHex(parsed.bytecode?.object ?? ''),
  };
}

export async function GET(): Promise<Response> {
  const [factory, treasury, authorizer, receiptRegistry] = await Promise.all([
    readArtifact('contracts/out/TreasuryOperatorFactory.sol/TreasuryOperatorFactory.json'),
    readArtifact('contracts/out/WstETHYieldTreasury.sol/WstETHYieldTreasury.json'),
    readArtifact('contracts/out/DelegationAuthorizer.sol/DelegationAuthorizer.json'),
    readArtifact('contracts/out/ReceiptRegistry.sol/ReceiptRegistry.json'),
  ]);

  return NextResponse.json(
    {
      baseAssetAddress: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
      spendSelector: '0x7441041a',
      factory,
      treasury,
      authorizer,
      receiptRegistry,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}
