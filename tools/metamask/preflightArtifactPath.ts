import path from 'node:path';

const DEFAULT_CHAIN = (process.env.METAMASK_CHAIN ?? 'base-sepolia').trim().toLowerCase();

const CHAIN_TO_PREFLIGHT_FILE: Record<string, string> = {
  base: 'artifacts/metamask/preflight-8453.json',
  'base-sepolia': 'artifacts/metamask/preflight-84532.json',
};

export function defaultPreflightArtifactPath() {
  return CHAIN_TO_PREFLIGHT_FILE[DEFAULT_CHAIN] ?? CHAIN_TO_PREFLIGHT_FILE['base-sepolia'];
}

export function resolvePreflightArtifactPath(explicitPath?: string) {
  return explicitPath && explicitPath.trim() ? explicitPath : defaultPreflightArtifactPath();
}

export function resolvePreflightArtifactAbsolutePath(explicitPath?: string) {
  return path.resolve(process.cwd(), resolvePreflightArtifactPath(explicitPath));
}
