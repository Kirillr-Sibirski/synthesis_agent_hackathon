import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

async function main() {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputDir = process.env.AAP_AGENT_WALLET_DIR?.trim()
    ? path.resolve(process.cwd(), process.env.AAP_AGENT_WALLET_DIR)
    : path.join(process.env.HOME ?? process.cwd(), ".aap-agent-wallets");
  const outputPath = path.join(outputDir, `${timestamp}-${account.address}.json`);

  await mkdir(outputDir, { recursive: true });
  await writeFile(
    outputPath,
    JSON.stringify(
      {
        address: account.address,
        privateKey,
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        address: account.address,
        savedTo: outputPath,
      },
      null,
      2,
    ),
  );
}

void main();
