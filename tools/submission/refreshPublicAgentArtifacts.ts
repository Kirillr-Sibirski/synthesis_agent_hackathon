import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const AGENT_SOURCE = process.env.AGENT_SOURCE ?? 'submission/agent.json';
const AGENT_LOG_SOURCE = process.env.AGENT_LOG_SOURCE ?? 'submission/agent_log.json';
const ROOT_AGENT_DEST = process.env.ROOT_AGENT_DEST ?? 'agent.json';
const ROOT_AGENT_LOG_DEST = process.env.ROOT_AGENT_LOG_DEST ?? 'agent_log.json';
const WELL_KNOWN_DIR = process.env.WELL_KNOWN_DIR ?? '.well-known';
const WRITE_WELL_KNOWN = process.env.WRITE_WELL_KNOWN !== 'false';

function resolveInRepo(relativePath: string) {
  return path.resolve(process.cwd(), relativePath);
}

function ensureExists(filePath: string) {
  if (!existsSync(filePath)) {
    throw new Error(`Required file not found: ${filePath}`);
  }
}

function readJson(filePath: string) {
  return JSON.parse(readFileSync(filePath, 'utf8')) as Record<string, unknown>;
}

function writeJson(filePath: string, value: unknown) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function withMirrorMetadata<T extends Record<string, unknown>>(value: T, sourcePath: string) {
  return {
    ...value,
    publicArtifactMirror: {
      source: sourcePath,
      refreshedAt: new Date().toISOString(),
      note: 'This root-facing artifact mirrors the canonical public-safe submission file for judge discovery.',
    },
  };
}

function main() {
  const resolvedAgentSource = resolveInRepo(AGENT_SOURCE);
  const resolvedAgentLogSource = resolveInRepo(AGENT_LOG_SOURCE);
  const resolvedRootAgentDest = resolveInRepo(ROOT_AGENT_DEST);
  const resolvedRootAgentLogDest = resolveInRepo(ROOT_AGENT_LOG_DEST);
  const resolvedWellKnownDir = resolveInRepo(WELL_KNOWN_DIR);
  const resolvedWellKnownAgentDest = path.join(resolvedWellKnownDir, 'agent.json');
  const resolvedWellKnownAgentLogDest = path.join(resolvedWellKnownDir, 'agent_log.json');

  ensureExists(resolvedAgentSource);
  ensureExists(resolvedAgentLogSource);

  const agent = withMirrorMetadata(readJson(resolvedAgentSource), AGENT_SOURCE);
  const agentLog = withMirrorMetadata(readJson(resolvedAgentLogSource), AGENT_LOG_SOURCE);

  writeJson(resolvedRootAgentDest, agent);
  writeJson(resolvedRootAgentLogDest, agentLog);

  if (WRITE_WELL_KNOWN) {
    mkdirSync(resolvedWellKnownDir, { recursive: true });
    copyFileSync(resolvedRootAgentDest, resolvedWellKnownAgentDest);
    copyFileSync(resolvedRootAgentLogDest, resolvedWellKnownAgentLogDest);
  }

  console.log(
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: {
          agent: resolvedAgentSource,
          agentLog: resolvedAgentLogSource,
        },
        outputs: {
          rootAgent: resolvedRootAgentDest,
          rootAgentLog: resolvedRootAgentLogDest,
          wellKnownAgent: WRITE_WELL_KNOWN ? resolvedWellKnownAgentDest : null,
          wellKnownAgentLog: WRITE_WELL_KNOWN ? resolvedWellKnownAgentLogDest : null,
        },
        note: 'Refreshed public-safe agent manifest mirrors for repo-root and .well-known discovery without touching private registration state.',
      },
      null,
      2,
    ),
  );
}

main();
