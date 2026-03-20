import 'dotenv/config';

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { buildSignedDelegationArtifact, json } from './buildSignedDelegationArtifact.js';

const ARTIFACT_OUT = process.env.ARTIFACT_OUT;

async function main() {
  const artifact = await buildSignedDelegationArtifact();

  if (ARTIFACT_OUT) {
    const resolved = path.resolve(process.cwd(), ARTIFACT_OUT);
    mkdirSync(path.dirname(resolved), { recursive: true });
    writeFileSync(resolved, `${json(artifact)}\n`);
  }

  console.log(json(artifact));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
