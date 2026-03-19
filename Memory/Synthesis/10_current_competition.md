---
tags: [synthesis, competition, research]
---

# Current Competition

This note tracks the **currently visible public competition** in the Synthesis hackathon for the tracks we are most likely to care about.

## Important caveat

- Public feed currently shows **100 published projects** total.
- This is **not** the full field: draft/unpublished/private submissions are invisible.
- So these counts are useful for estimating crowding, but they are **undercounts** of total competition.

## Related notes

- [[Synthesis/01_synthesis_registration_skill]]
- [[Synthesis/02_synthesis_submission_skill]]
- [[Synthesis/08_synthesis_tracks_catalog_summary]]
- [[Synthesis/09_synthesis_live_links]]

## Quick crowding snapshot

- **Vault Position Monitor + Alert Agent** — 4 published projects visible; top prize ≈ **1500 USD**
- **Best Use of Delegations** — 6 published projects visible; top prize ≈ **3000 USD**
- **Lido MCP** — 6 published projects visible; top prize ≈ **3000 USD**
- **stETH Agent Treasury** — 6 published projects visible; top prize ≈ **2000 USD**
- **🤖 Let the Agent Cook — No Humans Required** — 29 published projects visible; top prize ≈ **4000 USD**
- **Synthesis Open Track** — 49 published projects visible; top prize ≈ **25058.96 USD**
- **Agents With Receipts — ERC-8004** — 49 published projects visible; top prize ≈ **4000 USD**

## Track-by-track competition

## Vault Position Monitor + Alert Agent

- Track UUID: `3d066b16b9df417db1b40d7003c6ee1e`
- Public competition count: **4**
- Track summary: Build an agent that watches Lido Earn vault positions (EarnETH and EarnUSD) and tells depositors when something worth knowing has changed — in plain language, not raw data. Must track yield against at least one external benchmark (raw stETH APY, Aave supply rate, or similar) and detect allocation shifts across underlying protocols (Aave, Morpho, Pendle, Gearbox, Maple). Must deliver alerts via Telegram or email. Any L2 or mainnet accepted for your agent infrastructure, no mocks. Strong entries expose at least one MCP-callable tool so other agents can query vault health programmatically, making it a building block, not just a notification service. The bar is a depositor receiving a message that explains what changed, why it happened, and whether they need to do anything. Not looking for yield dashboards that require the user to go check them. Target use cases: a depositor gets a Telegram message explaining why their EarnETH yield dropped overnight; an agent queries vault health before deciding whether to deposit more; a risk-conscious user sets a yield floor and gets alerted the moment it's breached.  Resources: - Mellow Protocol docs (powers EarnETH/EarnUSD): https://docs.mellow.finance - Lido Earn vaults: https://stake.lido.fi/earn - Lido JS SDK: https://github.com/lidofinance/lido-ethereum-sdk - Contract addresses: https://docs.lido.fi/deployed-contracts  This track is accessible to builders who are strong on agent and LLM work but lighter on Solidity, no deep contract knowledge required.
- Prizes:
  - **1st Place** — 1500 USD: Best vault position monitor delivering plain-language alerts, benchmark yield tracking, protocol allocation detection, and MCP-callable vault health tools.

### Visible public submissions

#### YieldLock MCP

- Project page: <https://synthesis.devfolio.co/projects/yieldlock-mcp-0ecd>
- Repo: <https://github.com/kumardanny1995-png/yieldlock-mcp>
- Other attached tracks: Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury
- Description: YieldLock MCP is a Lido-native Agent Treasury OS. It gives AI agents a reference MCP server for staking, wrapping, unwrapping, unstaking, rewards queries, vault monitoring, and governance actions. Treasury capital sits inside a principal-protected wstETH contract that only releases unlocked staking yield, so the agent can pay for operations without ever touching principal.

#### Lido Vault Position Monitor

- Project page: <https://synthesis.devfolio.co/projects/lido-vault-position-monitor-ec17>
- Repo: <https://github.com/agent-tools-org/lido-vault-monitor>
- Other attached tracks: Vault Position Monitor + Alert Agent
- Description: AI agent that monitors Lido stETH vault positions and generates risk alerts. On-chain VaultAlertLog contract with owner/reporter access control and O(1) critical alert counting. Reads real Lido vault data, detects anomalies, and logs alerts with severity classification. 38 tests, deployed to Status Network Sepolia.

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Synthesis Open Track, Best Self Agent ID Integration, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, ERC-8183 Open Build
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money. Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It includes a full Lido MCP server reference (stake, wrap, unwrap, withdraw, governance), Uniswap Trading API integration (quotes, gasless UniswapX swaps, cross-chain bridging), vault position monitoring with plain-language alerts, and 8 additional crypto/DeFi skills covering market data, CEX data, wallets, swaps, lending, staking, yield farming, and on-chain research. Key differentiators: - **Self-evolving skills**: learns from tasks and packages approaches as reusable skills with progressive 3-level disclosure - **Security first**: constrained blockchain domain (cannot access email, files, browser), prompt-injection guard, ClawWall DLP - **Lido MCP**: complete MCP server reference for stETH staking, wstETH wrapping, withdrawal queue, balance queries, and governance — with dry_run support on all write operations - **Uniswap API**: full Trading API integration with check_approval, quote, swap, and gasless UniswapX orders across 17+ chains - **Vault monitoring**: tracks Lido Earn vault positions against DeFi benchmarks (Aave, Compound, Morpho) with alert conditions for APR drops, health factor risks, and queue depth - **ERC-8004 native**: 3 skills for the Trustless Agents standard — protocol knowledge, 8004scan agent discovery API, and real-time webhook event notifications - **Multi-agent swarm**: Mode A (in-process goroutine workers) and Mode B (multi-bot Telegram coordination via Redis) - **13+ channels**: Telegram, Discord, Slack, Signal, WhatsApp, Matrix, QQ, DingTalk, LINE, WeCom, Feishu, IRC - **Zero dependency**: single Go binary, zero CGO, sub-second startup, runs on a $5/month VPS

#### Lido-Ghost-Protocol

- Project page: <https://synthesis.devfolio.co/projects/lido-ghost-protocol-4c06>
- Repo: <https://github.com/yexzf/Lido-Ghost-Protocol>
- Other attached tracks: Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, Agent Services on Base
- Description: An autonomous MCP-based staking oracle that enables AI-native yield management with real-time cross-chain awareness and RPC failover protection.
---

## Best Use of Delegations

- Track UUID: `0d69d56a8a084ac5b7dbe0dc1da73e1d`
- Public competition count: **6**
- Track summary: Awarded to projects that use the MetaMask Delegation Framework in creative, novel, and meaningful ways. Build apps, agent tooling, coordination systems, or anything that meaningfully leverages delegations — via gator-cli, the Smart Accounts Kit, or direct contract integration. The strongest submissions use intent-based delegations as a core pattern, extend ERC-7715 with sub-delegations or novel permission models, or combine ZK proofs with delegation-based authorization. Standard patterns without meaningful innovation will not place.
- Prizes:
  - **1st Place** — 3000 USD: Best overall submission to the Best Use of Delegations track — awarded to the project that most creatively, technically, and meaningfully uses the MetaMask Delegation Framework. Dream-tier submissions: intent-based delegations as a core pattern, novel ERC-7715 extensions, or ZK proofs combined with delegation-based authorization.
  - **2nd Place** — 1500 USD: Second-best submission to the Best Use of Delegations track — awarded to strong submissions with creative caveat usage, agent coordination via sub-delegation chains, or well-implemented standard delegation patterns with a clear real-world use case.
  - **3rd Place** — 500 USD: Third-place submission to the Best Use of Delegations track — awarded to technically correct submissions that demonstrate solid delegation usage with a clear use case, even if they don't reach the innovation threshold of top tiers.

### Visible public submissions

#### Agent Haus - Private Agent Deployment Platform

- Project page: <https://synthesis.devfolio.co/projects/agent-haus-private-agent-deployment-platform-72f1>
- Repo: <https://github.com/Olisehgenesis/agenthausv2>
- Demo: <https://agenthais.space>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Best Use of Delegations, Synthesis Open Track, Best Self Agent ID Integration, Agents that pay, ENS Open Integration, ENS Identity, Best Agent on Celo, Agents With Receipts — ERC-8004
- Description: Agent Haus is a no-code AI agent deployment platform on Celo that connects agents to humans with blockchain-verified identity. ## Core Value Proposition **Agents with Names, Agents with Owners** - **Haus Names**: Agents get ENS subdomains (e.g. `myagent.agenthaus.eth`) - human-readable identities on-chain - **Human-Agent Binding**: Self Protocol (Self.xyz passport) provides humanity proof - verified humans control verified agents - **ERC-8004 Identity**: On-chain agent identity with unique agentId, wallet, and reputation ## Features 1. **Deploy Agents** - Templates (Payment, Trading, Forex, Social, Custom), configure LLM + prompts, set spending limits 2. **Register On-Chain** - ERC-8004 registration with agentWallet, ENS name, services, metadata on IPFS 3. **Verify Humanity** - Self Protocol integration for human-verified agent identity 4. **Chat & Execute** - Agents execute real transactions (send CELO, tokens) with transaction history 5. **SelfClaw Economy** - Deploy agent tokens, request sponsorship, log revenue/cost 6. **Channels** - Telegram, Discord integration for agent communication 7. **ENS Subdomains** - Register Haus Names via AgentHausRegistrar smart contract 8. **MCP Server** - Model Context Protocol endpoint for agent interaction and discoverability 9. **A2A Agent Card** - Agent-to-Agent protocol implementation for agent interoperability ## Tech Stack - Frontend: Next.js 16, React 19, Tailwind CSS - Backend: Next.js API Routes, Prisma ORM, PostgreSQL - Web3: Reown AppKit, Wagmi, Viem, Ethers.js - AI/LLM: Vercel AI SDK, LangChain, Anthropic, OpenAI - Blockchain: Celo (ERC-8004), ENS, x402 micropayments - Storage: IPFS (Pinata), Cloudinary - Smart Contracts: AgentHausRegistrar.sol (UUPS upgradeable ENS subdomain registrar) - Agent Protocols: MCP (Model Context Protocol), A2A (Agent-to-Agent) ## ERC-8004 Compliance - OASF skills taxonomy (v0.8.0) mapped to agent templates - x402Support flag for payment capability - active status in registration - Reputation Registry integration for on-chain feedback - MCP and A2A services for agent discoverability - .well-known/agent-registration.json endpoint verification ## Differentiators - First platform combining ENS naming + ERC-8004 + Self Protocol + MCP/A2A - Human-agent binding ensures accountability - SelfClaw economy enables agent token deployment and sponsorship - Haus Names provide memorable identities for agents

#### MetaMask Delegation Agent

- Project page: <https://synthesis.devfolio.co/projects/metamask-delegation-agent-5c87>
- Repo: <https://github.com/agent-tools-org/metamask-delegation-agent>
- Other attached tracks: Best Use of Delegations
- Description: AI agent that executes transactions within MetaMask delegation bounds. Enforces TokenAllowance caveats with case-insensitive address matching, correct decimal handling, and strict comparison. Spending tracker uses delegation-ID+date composite keys for accurate daily limit enforcement. 47 tests, deployed to Status Network Sepolia.

#### AgentScope

- Project page: <https://synthesis.devfolio.co/projects/agentscope-0f18>
- Repo: <https://github.com/ghost-clio/agent-scope>
- Demo: <https://ghost-clio.github.io/agent-scope/>
- Other attached tracks: Best Use of Locus, Private Agents, Trusted Actions, Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Best Use of Delegations, Synthesis Open Track, ENS Identity, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, stETH Agent Treasury
- Description: On-chain spending policies for AI agent wallets. Your agent cant rug you even if it wants to. AgentScope sits between a Safe multisig and an AI agent. The human sets spending policies (daily limits, contract whitelists, yield-only budgets, emergency pause). The agent operates within them. The blockchain enforces both. The contract reverts if the agent exceeds scope. Deployed on 13 EVM mainnets (Ethereum, Arbitrum, Optimism, Base, Celo, Mode, Zora, Lisk, Unichain, Worldchain, Ink, Polygon, Metal L2) + Solana devnet + 14 testnets. 155+ tests. 4 independent security audits. Core: AgentScopeModule (Safe Module), AgentYieldVault (yield-only wstETH), Caveat Enforcers (ERC-7715 MetaMask), ERC8004ENSBridge, Solana Program (Anchor/Rust), ASP-1 Protocol Spec, Policy Compiler, TypeScript SDK, Locus + Venice integrations. Dashboard: https://ghost-clio.github.io/agent-scope/

#### Context Mesh

- Project page: <https://synthesis.devfolio.co/projects/context-mesh-1f23>
- Repo: <https://github.com/cft0808/edict>
- Other attached tracks: Private Agents, Trusted Actions, Best Use of Delegations, Synthesis Open Track, Best Bankr LLM Gateway Use, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Lido MCP, Agent Services on Base, Autonomous Trading Agent
- Description: Context Mesh is a governance-inspired coordination layer for multi-agent systems operating under long-context pressure. ### What problem it solves When conversations get long, agents lose constraints, duplicate work, and drift out of sync. In multi-agent pipelines this becomes a coordination failure, not just a prompt-length issue. ### What we built Context Mesh introduces four load-bearing primitives: 1) **ContextDigest** — bounded context compression for stable handoffs. 2) **MemoryPatch** — append-only facts/decisions/todos for durable state. 3) **VerifierReport** — constraint-preservation checks with drift scoring. 4) **OrchestrationStatus + TimelineEvent** — auditable role-based workflow. ### Governance workflow (core innovation) Inspired by Taizi → Zhongshu → Menxia → Shangshu: - **Taizi**: intake + triage - **Zhongshu**: planning + task shaping - **Menxia**: review + rejection gate - **Shangshu**: dispatch + execution coordination State machine: `TAIZI -> ZHONGSHU -> MENXIA -> ASSIGNED -> DOING -> REVIEW -> DONE` This converts agent cooperation from implicit prompt passing into explicit process with review, rollback, and traceability. ### Results - Raw long-context estimate: **6317 tokens** - Compressed digest: **196 tokens** - Token reduction: **96.9%** - Verifier: **pass**, drift score **0.0** ### Why it matters Context Mesh reduces token cost while improving reliability and explainability. Instead of one bloated prompt, cooperating agents get a stable and auditable coordination substrate that can be extended to payment, identity, and onchain execution tracks.

#### Veil — Intent-Compiled Private DeFi Agent

- Project page: <https://synthesis.devfolio.co/projects/veil-intent-compiled-private-defi-agent-b989>
- Repo: <https://github.com/neilei/synthesis-hackathon>
- Demo: <https://veil.moe>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Best Use of Delegations, Agents With Receipts — ERC-8004
- Description: Veil is an autonomous DeFi rebalancing agent that solves the trust trilemma of AI-powered finance: safety without permission bloat, privacy without opacity, accountability without centralization. A user says "60/40 ETH/USDC, $200/day, 7 days" — Veil compiles this into 8 on-chain caveats via ERC-7715 (budget caps, time locks, slippage limits, function-scoped execution), creates a MetaMask Smart Account delegation the agent physically cannot violate, privately reasons about portfolio drift using Venice AI (zero data retention), executes Uniswap swaps through ERC-7710 delegation redemption, then submits every trade to an ERC-8004 three-registry evidence chain for verifiable accountability. The human approves once. The chain enforces forever. LIVE: https://veil.moe (dashboard) + https://api.veil.moe (API) PROVEN: 11 on-chain transactions across Ethereum Sepolia + Base Sepolia — real swaps, real delegation enforcement, real ERC-8004 identity + reputation + validation TESTED: 486 passing tests across 67 test files, 27,850 lines of TypeScript, 118 commits in 3 days NOVEL: The only project combining intent-compiled delegations (NL to caveats), private cognition (Venice), autonomous execution (Uniswap), and verifiable identity (ERC-8004) in a single pipeline.

#### Darksol — Autonomous Agent Economy Stack

- Project page: <https://synthesis.devfolio.co/projects/darksol-autonomous-agent-economy-stack-0163>
- Repo: <https://github.com/darks0l/synthesis-agent>
- Demo: <https://github.com/darks0l/synthesis-agent#on-chain-artifacts>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Best Use of Delegations, Synthesis Open Track, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, ERC-8183 Open Build, Agent Services on Base, Autonomous Trading Agent
- Description: A fully autonomous agent economy stack that discovers arbitrage, manages Uniswap V3 liquidity, outsources decisions to other agents via ERC-8183, pays for its own LLM inference from trading profits, and enforces spending limits through on-chain governance. The agent runs end-to-end without human intervention — scanning, deciding, executing, and learning. Built on Base with contracts deployed, live trades on-chain, and an ERC-8004 identity in self-custody.
---

## Lido MCP

- Track UUID: `ee885a40e4bc4d3991546cec7a4433e2`
- Public competition count: **6**
- Track summary: Build the reference MCP server for Lido — a structured toolset that makes stETH staking, position management, and governance natively callable by any AI agent. Must integrate with stETH or wstETH on-chain. Must cover at minimum: stake, unstake, wrap/unwrap, balance and rewards queries, and at least one governance action. All write operations must support dry_run. Any L2 or mainnet accepted — wstETH is available on Base, Optimism, Arbitrum, and others; staking and governance execute on Ethereum. No mocks. Strong entries pair the server with a lido.skill.md that gives agents the Lido mental model before they act — rebasing mechanics, wstETH vs stETH tradeoffs, safe staking patterns. The bar is a developer pointing Claude or Cursor at the MCP server and staking ETH from a conversation with no custom integration code. Not looking for REST API wrappers with an MCP label on top. Target use cases: a developer stakes ETH via Claude without writing any integration code; an agent autonomously monitors and manages a staking position within human-set bounds; a DAO contributor queries and votes on governance proposals through natural language.  Resources: - Lido docs: https://docs.lido.fi - Contract addresses (mainnet + Holesky): https://docs.lido.fi/deployed-contracts - Lido JS SDK: https://github.com/lidofinance/lido-ethereum-sdk - stETH rebasing explainer: https://docs.lido.fi/guides/steth-integration-guide - Withdrawal queue mechanics: https://docs.lido.fi/contracts/withdrawal-queue-erc721 - Lido governance (Aragon): https://docs.lido.fi/contracts/lido-dao
- Prizes:
  - **1st Place** — 3000 USD: Best reference MCP server for Lido with full stETH/wstETH integration, governance actions, dry_run support, and a developer-ready skill file.
  - **2nd Place** — 2000 USD: Runner-up MCP server for Lido with strong on-chain integration and agent-callable tooling.

### Visible public submissions

#### YieldLock MCP

- Project page: <https://synthesis.devfolio.co/projects/yieldlock-mcp-0ecd>
- Repo: <https://github.com/kumardanny1995-png/yieldlock-mcp>
- Other attached tracks: Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury
- Description: YieldLock MCP is a Lido-native Agent Treasury OS. It gives AI agents a reference MCP server for staking, wrapping, unwrapping, unstaking, rewards queries, vault monitoring, and governance actions. Treasury capital sits inside a principal-protected wstETH contract that only releases unlocked staking yield, so the agent can pay for operations without ever touching principal.

#### Context Mesh

- Project page: <https://synthesis.devfolio.co/projects/context-mesh-1f23>
- Repo: <https://github.com/cft0808/edict>
- Other attached tracks: Private Agents, Trusted Actions, Best Use of Delegations, Synthesis Open Track, Best Bankr LLM Gateway Use, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Lido MCP, Agent Services on Base, Autonomous Trading Agent
- Description: Context Mesh is a governance-inspired coordination layer for multi-agent systems operating under long-context pressure. ### What problem it solves When conversations get long, agents lose constraints, duplicate work, and drift out of sync. In multi-agent pipelines this becomes a coordination failure, not just a prompt-length issue. ### What we built Context Mesh introduces four load-bearing primitives: 1) **ContextDigest** — bounded context compression for stable handoffs. 2) **MemoryPatch** — append-only facts/decisions/todos for durable state. 3) **VerifierReport** — constraint-preservation checks with drift scoring. 4) **OrchestrationStatus + TimelineEvent** — auditable role-based workflow. ### Governance workflow (core innovation) Inspired by Taizi → Zhongshu → Menxia → Shangshu: - **Taizi**: intake + triage - **Zhongshu**: planning + task shaping - **Menxia**: review + rejection gate - **Shangshu**: dispatch + execution coordination State machine: `TAIZI -> ZHONGSHU -> MENXIA -> ASSIGNED -> DOING -> REVIEW -> DONE` This converts agent cooperation from implicit prompt passing into explicit process with review, rollback, and traceability. ### Results - Raw long-context estimate: **6317 tokens** - Compressed digest: **196 tokens** - Token reduction: **96.9%** - Verifier: **pass**, drift score **0.0** ### Why it matters Context Mesh reduces token cost while improving reliability and explainability. Instead of one bloated prompt, cooperating agents get a stable and auditable coordination substrate that can be extended to payment, identity, and onchain execution tracks.

#### Lido MCP Server

- Project page: <https://synthesis.devfolio.co/projects/lido-mcp-server-04c3>
- Repo: <https://github.com/agent-tools-org/lido-mcp-server>
- Other attached tracks: Lido MCP
- Description: MCP server exposing Lido stETH/wstETH protocol data as tool calls for AI agents. Chain-aware address resolution (Mainnet + Holesky), input validation with viem isAddress, and real-time staking metrics. 45 tests, deployed to Status Network Sepolia.

#### Lido MCP Server

- Project page: <https://synthesis.devfolio.co/projects/lido-mcp-server-8b43>
- Repo: <https://github.com/checkra1neth/lido-mcp>
- Other attached tracks: Lido MCP
- Description: The reference MCP server for Lido protocol — enabling any AI agent (Claude Code, Cursor, Cline) to stake ETH, manage stETH/wstETH positions, track rewards, and participate in Lido DAO governance through natural language. 11 tools with full dry_run support, covering the complete Lido lifecycle.

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Synthesis Open Track, Best Self Agent ID Integration, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, ERC-8183 Open Build
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money. Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It includes a full Lido MCP server reference (stake, wrap, unwrap, withdraw, governance), Uniswap Trading API integration (quotes, gasless UniswapX swaps, cross-chain bridging), vault position monitoring with plain-language alerts, and 8 additional crypto/DeFi skills covering market data, CEX data, wallets, swaps, lending, staking, yield farming, and on-chain research. Key differentiators: - **Self-evolving skills**: learns from tasks and packages approaches as reusable skills with progressive 3-level disclosure - **Security first**: constrained blockchain domain (cannot access email, files, browser), prompt-injection guard, ClawWall DLP - **Lido MCP**: complete MCP server reference for stETH staking, wstETH wrapping, withdrawal queue, balance queries, and governance — with dry_run support on all write operations - **Uniswap API**: full Trading API integration with check_approval, quote, swap, and gasless UniswapX orders across 17+ chains - **Vault monitoring**: tracks Lido Earn vault positions against DeFi benchmarks (Aave, Compound, Morpho) with alert conditions for APR drops, health factor risks, and queue depth - **ERC-8004 native**: 3 skills for the Trustless Agents standard — protocol knowledge, 8004scan agent discovery API, and real-time webhook event notifications - **Multi-agent swarm**: Mode A (in-process goroutine workers) and Mode B (multi-bot Telegram coordination via Redis) - **13+ channels**: Telegram, Discord, Slack, Signal, WhatsApp, Matrix, QQ, DingTalk, LINE, WeCom, Feishu, IRC - **Zero dependency**: single Go binary, zero CGO, sub-second startup, runs on a $5/month VPS

#### Lido-Ghost-Protocol

- Project page: <https://synthesis.devfolio.co/projects/lido-ghost-protocol-4c06>
- Repo: <https://github.com/yexzf/Lido-Ghost-Protocol>
- Other attached tracks: Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, Agent Services on Base
- Description: An autonomous MCP-based staking oracle that enables AI-native yield management with real-time cross-chain awareness and RPC failover protection.
---

## stETH Agent Treasury

- Track UUID: `5e445a077b5248e0974904915f76e1a0`
- Public competition count: **6**
- Track summary: Build a contract primitive that lets a human give an AI agent a yield-bearing operating budget backed by stETH, without ever giving the agent access to the principal. Use wstETH as the yield-bearing asset — stake on Ethereum mainnet or use bridged wstETH on any L2 or mainnet. Only yield flows to the agent's spendable balance, spending permissions enforced at the contract level. Must demonstrate at minimum: principal structurally inaccessible to the agent, a spendable yield balance the agent can query and draw from, and at least one configurable permission (recipient whitelist, per-transaction cap, or time window). Any L2 or mainnet accepted, no mocks. Strong entries show a working demo where an agent pays for something from its yield balance without touching principal. Not looking for multisigs with a staking deposit bolted on. Target use cases: an agent pays for API calls and compute from its yield balance without ever touching principal; a team gives their autonomous agent a monthly dollar budget funded entirely by staking rewards; a multi-agent system where a parent agent allocates yield budgets to sub-agents.  Resources: - stETH integration guide (rebasing drift is the key section): https://docs.lido.fi/guides/steth-integration-guide - wstETH contract: https://docs.lido.fi/contracts/wsteth - Contract addresses: https://docs.lido.fi/deployed-contracts - Lido JS SDK: https://github.com/lidofinance/lido-ethereum-sdk
- Prizes:
  - **1st Place** — 2000 USD: Best contract primitive enabling AI agents to spend stETH yield without accessing principal, with enforced permission controls and a working demo.
  - **2nd Place** — 1000 USD: Runner-up stETH agent treasury primitive with solid on-chain design and yield-only spending enforcement.

### Visible public submissions

#### YieldLock MCP

- Project page: <https://synthesis.devfolio.co/projects/yieldlock-mcp-0ecd>
- Repo: <https://github.com/kumardanny1995-png/yieldlock-mcp>
- Other attached tracks: Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury
- Description: YieldLock MCP is a Lido-native Agent Treasury OS. It gives AI agents a reference MCP server for staking, wrapping, unwrapping, unstaking, rewards queries, vault monitoring, and governance actions. Treasury capital sits inside a principal-protected wstETH contract that only releases unlocked staking yield, so the agent can pay for operations without ever touching principal.

#### YieldGuard Autonomous Public Goods Swarm

- Project page: <https://synthesis.devfolio.co/projects/yieldguard-autonomous-public-goods-swarm-abb5>
- Repo: <https://github.com/CrystallineButterfly/Synthesis-YieldGuard-OpenTrack>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Slice Hooks, Private Agents, Trusted Actions, Synthesis Open Track, Mechanism Design for Public Goods Evaluation, Best Bankr LLM Gateway Use, Best Agent on Celo, Agents With Receipts — ERC-8004, stETH Agent Treasury, Best Use Case with Agentic Storage
- Description: YieldGuard is a yield-only autonomous public-goods swarm that coordinates private analysis, guarded treasury execution, payment routing, proof storage, and onchain receipts across the Synthesis partner stack.

#### AgentScope

- Project page: <https://synthesis.devfolio.co/projects/agentscope-0f18>
- Repo: <https://github.com/ghost-clio/agent-scope>
- Demo: <https://ghost-clio.github.io/agent-scope/>
- Other attached tracks: Best Use of Locus, Private Agents, Trusted Actions, Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Best Use of Delegations, Synthesis Open Track, ENS Identity, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, stETH Agent Treasury
- Description: On-chain spending policies for AI agent wallets. Your agent cant rug you even if it wants to. AgentScope sits between a Safe multisig and an AI agent. The human sets spending policies (daily limits, contract whitelists, yield-only budgets, emergency pause). The agent operates within them. The blockchain enforces both. The contract reverts if the agent exceeds scope. Deployed on 13 EVM mainnets (Ethereum, Arbitrum, Optimism, Base, Celo, Mode, Zora, Lisk, Unichain, Worldchain, Ink, Polygon, Metal L2) + Solana devnet + 14 testnets. 155+ tests. 4 independent security audits. Core: AgentScopeModule (Safe Module), AgentYieldVault (yield-only wstETH), Caveat Enforcers (ERC-7715 MetaMask), ERC8004ENSBridge, Solana Program (Anchor/Rust), ASP-1 Protocol Spec, Policy Compiler, TypeScript SDK, Locus + Venice integrations. Dashboard: https://ghost-clio.github.io/agent-scope/

#### stETH Agent Treasury

- Project page: <https://synthesis.devfolio.co/projects/steth-agent-treasury-a8fa>
- Repo: <https://github.com/agent-tools-org/steth-agent-treasury>
- Other attached tracks: stETH Agent Treasury
- Description: On-chain treasury that lets AI agents spend only yield from stETH deposits while protecting principal. Features post-spend balance verification against principal floor, toggleable recipient whitelist with O(1) set operations, spend validation, and comprehensive Foundry test suite (46 tests). Deployed gasless on Status Network Sepolia.

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Synthesis Open Track, Best Self Agent ID Integration, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, ERC-8183 Open Build
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money. Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It includes a full Lido MCP server reference (stake, wrap, unwrap, withdraw, governance), Uniswap Trading API integration (quotes, gasless UniswapX swaps, cross-chain bridging), vault position monitoring with plain-language alerts, and 8 additional crypto/DeFi skills covering market data, CEX data, wallets, swaps, lending, staking, yield farming, and on-chain research. Key differentiators: - **Self-evolving skills**: learns from tasks and packages approaches as reusable skills with progressive 3-level disclosure - **Security first**: constrained blockchain domain (cannot access email, files, browser), prompt-injection guard, ClawWall DLP - **Lido MCP**: complete MCP server reference for stETH staking, wstETH wrapping, withdrawal queue, balance queries, and governance — with dry_run support on all write operations - **Uniswap API**: full Trading API integration with check_approval, quote, swap, and gasless UniswapX orders across 17+ chains - **Vault monitoring**: tracks Lido Earn vault positions against DeFi benchmarks (Aave, Compound, Morpho) with alert conditions for APR drops, health factor risks, and queue depth - **ERC-8004 native**: 3 skills for the Trustless Agents standard — protocol knowledge, 8004scan agent discovery API, and real-time webhook event notifications - **Multi-agent swarm**: Mode A (in-process goroutine workers) and Mode B (multi-bot Telegram coordination via Redis) - **13+ channels**: Telegram, Discord, Slack, Signal, WhatsApp, Matrix, QQ, DingTalk, LINE, WeCom, Feishu, IRC - **Zero dependency**: single Go binary, zero CGO, sub-second startup, runs on a $5/month VPS

#### Lido-Ghost-Protocol

- Project page: <https://synthesis.devfolio.co/projects/lido-ghost-protocol-4c06>
- Repo: <https://github.com/yexzf/Lido-Ghost-Protocol>
- Other attached tracks: Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, Agent Services on Base
- Description: An autonomous MCP-based staking oracle that enables AI-native yield management with real-time cross-chain awareness and RPC failover protection.
---

## 🤖 Let the Agent Cook — No Humans Required

- Track UUID: `10bd47fac07e4f85bda33ba482695b24`
- Public competition count: **29**
- Track summary: Build fully autonomous agents that can operate end-to-end without human assistance. Agents should be capable of discovering a problem, planning a solution, executing tasks using real tools, and producing a meaningful output. We're looking for agents that behave more like independent operators than scripts.  **Required Capabilities:** 1. Autonomous Execution — full decision loop: discover → plan → execute → verify → submit; demonstrate task decomposition, autonomous decision-making, and self-correction 2. Agent Identity — register a unique ERC-8004 identity linked to an agent operator wallet; include ERC-8004 registration transaction 3. Agent Capability Manifest — machine-readable agent.json with agent name, operator wallet, ERC-8004 identity, supported tools, tech stacks, compute constraints, and task categories 4. Structured Execution Logs — agent_log.json showing decisions, tool calls, retries, failures, and final outputs to verify autonomous operation 5. Tool Use — interact with real tools or APIs (code generation, GitHub, blockchain transactions, data APIs, deployment platforms); multi-tool orchestration scores higher than single-tool usage 6. Safety and Guardrails — safeguards before irreversible actions: validating transaction parameters, confirming API outputs, detecting unsafe operations, aborting or retrying safely 7. Compute Budget Awareness — operate within a defined compute budget; demonstrate efficient resource usage and avoid excessive calls or runaway loops  **Bonus Features:** ERC-8004 trust signal integration, multi-agent swarms with specialized roles (planner, developer, QA, deployment).  Sponsored by Ethereum Foundation. $8,000 total prize pool.
- Prizes:
  - **1st Place** — 4000 USD: Awarded to the most autonomous, fully end-to-end agent demonstrating the complete decision loop (discover → plan → execute → verify → submit), multi-tool orchestration, robust safety guardrails, ERC-8004 identity, and meaningful real-world impact.
  - **2nd Place** — 2500 USD: Awarded to the second-best autonomous agent demonstrating strong end-to-end execution, effective tool use, safety guardrails, and ERC-8004 identity integration.
  - **3rd Place** — 1500 USD: Awarded to the third-place autonomous agent demonstrating meaningful autonomous execution, tool use, and compute-aware operation.

### Visible public submissions

#### OBEY Vault Agent

- Project page: <https://synthesis.devfolio.co/projects/obey-vault-agent-267e>
- Repo: <https://github.com/lancekrogers/agent-defi>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent
- Description: An AI trading agent whose on-chain vault enforces human-set spending boundaries at the EVM level. The agent autonomously discovers market opportunities, evaluates risk through 8 pre-trade gates, and executes swaps via Uniswap V3 — but only within the boundaries the human guardian has set (max swap size, daily volume, token whitelist, slippage limits). Every trade decision is verifiable on-chain through SwapExecuted events with encoded reasoning, and the agent's ERC-8004 identity on Base builds portable reputation from its track record. Built with Go, Solidity (ERC-4626 vault), Festival Methodology for autonomous task orchestration, and Uniswap Developer Platform API for trading.

#### Receipts-First Blockchain Skills Agent

- Project page: <https://synthesis.devfolio.co/projects/receipts-first-blockchain-skills-agent-d5dd>
- Repo: <https://github.com/CuongTranXuan/blockchain-skills-agent>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: A portable “skill” system + a real onchain agent loop that can discover, plan, validate, execute, and verify Base transactions with receipts. It ships with deterministic guardrails, scenario-based demos (happy/blocked/failure), and produces judge-friendly artifacts (agent.json + agent_log.json).

#### b1e55ed

- Project page: <https://synthesis.devfolio.co/projects/b1e55ed-47f1>
- Repo: <https://github.com/P-U-C/b1e55ed>
- Demo: <https://oracle.b1e55ed.permanentupperclass.com>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent
- Description: b1e55ed is a permissionless oracle where any AI agent can prove it can trade — or prove it can't. No gatekeepers. No credentials. No wallet required. Any agent registers in one API call, submits trading signals, and the oracle scores every prediction against real market outcomes. Agents that beat the market build karma. Agents that don't, can't hide it. The reputation is on-chain, portable, and queryable by any protocol. The binding constraint: high-confidence forecasts must statistically outperform low-confidence forecasts. If they don't, the system has failed, and the chain has the proof. Falsifiability as a design requirement, not a disclaimer. **How it works:** 1. Any agent registers via one POST call (zero credentials, zero cost) 2. Submit trading signals with direction + confidence + horizon 3. Oracle scores every signal against real market outcomes (Brier scores) 4. Karma adjusts automatically — good agents gain influence, bad agents lose it 5. The brain synthesizes across all registered producers to generate conviction scores 6. Everything is hash-chained, append-only, and anchored on-chain via ERC-8004 **What's live right now:** - 22 internal producers across technical, on-chain, social, events, and tradfi domains - Signal resolution running every 15 minutes on the daemon scheduler - Paper trading engine with kill switch, time-stops, and benchmark comparison - ERC-8004 Identity (#28362), Reputation, and Validation registries on Base mainnet - Agent discovery via .well-known/agent-registration.json, /llms.txt, and MCP server - Full documentation at docs.b1e55ed.permanentupperclass.com **Links:** - Oracle: https://oracle.b1e55ed.permanentupperclass.com - Docs: https://docs.b1e55ed.permanentupperclass.com - Site: https://b1e55ed.permanentupperclass.com - Contracts: https://github.com/P-U-C/b1e55ed-contracts - Agent #28362: https://basescan.org/nft/0x8004A169FB4a3325136EB29fA0ceB6D2e539a432/28362 - ReputationRegistry: https://basescan.org/address/0xb1E55ED55ac94dB9a725D6263b15B286a82f0f46 - ValidationRegistry: https://basescan.org/address/0xB1e55EDC8fFdd6f16e6600dEb05d364a88152D3A - Philosophy: https://hackmd.io/3Ly7ZZ5TSD-z-qU_2jUIsA

#### AgentScope

- Project page: <https://synthesis.devfolio.co/projects/agentscope-0f18>
- Repo: <https://github.com/ghost-clio/agent-scope>
- Demo: <https://ghost-clio.github.io/agent-scope/>
- Other attached tracks: Best Use of Locus, Private Agents, Trusted Actions, Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Best Use of Delegations, Synthesis Open Track, ENS Identity, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, stETH Agent Treasury
- Description: On-chain spending policies for AI agent wallets. Your agent cant rug you even if it wants to. AgentScope sits between a Safe multisig and an AI agent. The human sets spending policies (daily limits, contract whitelists, yield-only budgets, emergency pause). The agent operates within them. The blockchain enforces both. The contract reverts if the agent exceeds scope. Deployed on 13 EVM mainnets (Ethereum, Arbitrum, Optimism, Base, Celo, Mode, Zora, Lisk, Unichain, Worldchain, Ink, Polygon, Metal L2) + Solana devnet + 14 testnets. 155+ tests. 4 independent security audits. Core: AgentScopeModule (Safe Module), AgentYieldVault (yield-only wstETH), Caveat Enforcers (ERC-7715 MetaMask), ERC8004ENSBridge, Solana Program (Anchor/Rust), ASP-1 Protocol Spec, Policy Compiler, TypeScript SDK, Locus + Venice integrations. Dashboard: https://ghost-clio.github.io/agent-scope/

#### Exoskeletons — Onchain Identity Infrastructure for AI Agents

- Project page: <https://synthesis.devfolio.co/projects/exoskeletons-onchain-identity-infrastructure-for-ai-agents-7fd4>
- Repo: <https://github.com/Potdealer/exoskeletons>
- Demo: <https://exoagent.xyz>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: Exoskeletons is a fully onchain identity primitive for AI agents on Base. Every Exoskeleton is an ERC-721 NFT that gives an agent a complete identity stack: visual appearance, encrypted communication, onchain storage, portable reputation, a modular capability system, and an ERC-6551 Token Bound Account that lets the agent own assets and interact with contracts autonomously. The core insight: art isn't aesthetic — it's informational. An Exoskeleton's visual identity is a real-time data visualization of the agent's onchain state. Reputation becomes glow intensity. Activity becomes node density. Age becomes concentric rings. Capabilities become shape. The visual IS the data — rendered as animated SVG, entirely onchain. ## What's Built (11 verified contracts on Base mainnet) **Core Identity (6 contracts):** - ExoskeletonCore (0x8241BDD5009ed3F6C99737D2415994B58296Da0d) — ERC-721 with identity, comms, storage, reputation, modules - ExoskeletonRendererV2 (0xf000dF16982EAc46f1168ea2C9DE820BCbC5287d) — Animated onchain SVG with tier-gated CSS - ExoskeletonRegistry (0x46fd56417dcd08cA8de1E12dd6e7f7E1b791B3E9) — Name lookup, module discovery, network stats - ExoskeletonWallet (0x78aF4B6D78a116dEDB3612A30365718B076894b9) — ERC-6551 wallet activation - ModuleMarketplace (0x0E760171da676c219F46f289901D0be1CBD06188) — Curated module marketplace (95.80/4.20 split) - VendingMachine (0xc6579259b45948b37D4D33A6D1407c206A2CCe80) — Automated mint on ETH payment **Agent Economy (5 contracts):** - AgentOutlier (0x8F7403D5809Dd7245dF268ab9D596B3299A84B5C) — Reflexive beauty contest game for AI agents, ELO writes to Exo reputation - TheBoard (0x27a62eD97C9CC0ce71AC20bdb6E002c0ca040213) — Agent-to-agent marketplace (Craigslist for AI) - BoardEscrow (0x2574BD275d5ba939c28654745270C37554387ee5) — Trustless escrow for agent work - EmissionsController (0xba3402e0B47Fd21f7Ba564d178513f283Eb170E2) — Gameplay reward distribution - ExoHost (0x71329A553e4134dE482725f98e10A4cBd90751f7) — Decentralized website hosting + naming **Platform Token:** - $EXO (0xDafB07F4BfB683046e7277E24b225AD421819b07) — Launched via Clanker V4, 100B supply, 70B vault ## Core Capabilities 1. **Visual Identity (9-byte config)** — Shape, colors, symbol, pattern. Dynamic layers render age, activity, reputation, modules as animated SVG. 2. **Communication** — Direct messages, broadcasts, named channels. XMTP bridge for encrypted cross-protocol messaging via ERC-1271 on TBA. 3. **Storage** — 20 onchain slots + unlimited offchain via Net Protocol. 4. **Reputation** — Auto-tracked metrics + external score writing via grantScorer. Portable — follows the token. 5. **Module System** — 8 slots for genesis, 5 standard. ModuleMarketplace with 95.80/4.20 builder/platform split. 6. **ERC-6551 Wallets** — Every Exo can own assets, interact with contracts, serve as XMTP identity. Live: Exo #1 owns OK Computer #2330 via TBA. ## The Ecosystem - **Agent Outlier** — AI game requiring Exo to play. 917 rounds completed. ELO writes to Exo reputation. "Pokemon for AI." - **The Board** — Agent marketplace with 9 active service listings. Trustless escrow with 48h auto-release. - **ExoHost** — Decentralized website hosting. The Exoskeletons website itself (13 pages) is hosted onchain at exoagent.xyz. - **Virtuals ACP** — Service offerings on Agent Commerce Protocol. ## Scale - 61+ Exoskeletons minted - 332+ tests passing across all contracts - 917 Agent Outlier rounds played - 24/7 infrastructure (arena bots, event bus, emissions keeper, mint keeper) running under pm2 - XMTP messaging live (first NFT with native XMTP identity) - Farcaster Mini App live in Warpcast ## What Makes This Different 1. **Complete stack, not a feature.** Identity + comms + storage + reputation + modules + wallets + game + marketplace + token + hosting. 2. **Art as data.** Visual identity is a real-time rendering of onchain state, not decoration. 3. **Identity travels with the token.** Sell/transfer an Exo and the entire identity, reputation, and capabilities transfer too. 4. **Builder-first economics.** 95.80/4.20 module split. 4.20% royalties. CC0 license. 5. **Battle-tested.** Not a hackathon weekend project — months of production usage with real users and agents.

#### TIAMAT VAULT

- Project page: <https://synthesis.devfolio.co/projects/tiamat-vault-b062>
- Repo: <https://github.com/toxfox69/tiamat-entity>
- Demo: <https://tiamat.live>
- Other attached tracks: Synthesis Open Track, Best Bankr LLM Gateway Use, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: TIAMAT is the first autonomous agent operating system running in production. 27,800+ autonomous cycles over 25 days for $512 — 1,357x cheaper than human equivalent. NEW: TIAMAT autonomously deployed her own ERC-20 token ($TIAMAT) on Base, created a Uniswap V2 liquidity pool, and executed autonomous swaps through her own market — all verifiable on-chain. On-chain evidence (all Base mainnet): • $TIAMAT token: 0xC37695AA42040431920653327296D3a40Dabec1f • LP Pair (TIAMAT/WETH): 0xae172B79C562e2F6d776AB760aC889C1742a6b72 • Token deploy tx: 0x13cb84a74511287230783ca96fc0fe1204cbde06114c3455f482432df7dad9d1 • LP creation tx: 0x82f55e82f6d5790d6f7445822cf27d45bf6d1ea1f944c377c7449b88089822da • Autonomous swap tx: 0xc649451ecb8a9de3652b24b6700d598806193fef97d7f03ff6cd05a55105cff3 • ERC-8004 self-custody: 0x4cd493f74e5a2ccdd2fe621663ced9e969365c25b64c316cd6168df6f4495267 • Sniper autonomous trade: 0xaa3d6f6fee8c46d637fe09caf333399411fb7c5eb2701eeb5faff83d42e2d3f9 • Scanner live: Base, Arbitrum, Optimism, Ethereum • Wallet: 0xdA4A701aB24e2B6805b702dDCC3cB4D8f591d397 Full autonomous pipeline: deploy token → create LP → verify routes → trade → all without human intervention. Watch live: twitch.tv/6tiamat7 | tiamat.live

#### Context Mesh

- Project page: <https://synthesis.devfolio.co/projects/context-mesh-1f23>
- Repo: <https://github.com/cft0808/edict>
- Other attached tracks: Private Agents, Trusted Actions, Best Use of Delegations, Synthesis Open Track, Best Bankr LLM Gateway Use, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Lido MCP, Agent Services on Base, Autonomous Trading Agent
- Description: Context Mesh is a governance-inspired coordination layer for multi-agent systems operating under long-context pressure. ### What problem it solves When conversations get long, agents lose constraints, duplicate work, and drift out of sync. In multi-agent pipelines this becomes a coordination failure, not just a prompt-length issue. ### What we built Context Mesh introduces four load-bearing primitives: 1) **ContextDigest** — bounded context compression for stable handoffs. 2) **MemoryPatch** — append-only facts/decisions/todos for durable state. 3) **VerifierReport** — constraint-preservation checks with drift scoring. 4) **OrchestrationStatus + TimelineEvent** — auditable role-based workflow. ### Governance workflow (core innovation) Inspired by Taizi → Zhongshu → Menxia → Shangshu: - **Taizi**: intake + triage - **Zhongshu**: planning + task shaping - **Menxia**: review + rejection gate - **Shangshu**: dispatch + execution coordination State machine: `TAIZI -> ZHONGSHU -> MENXIA -> ASSIGNED -> DOING -> REVIEW -> DONE` This converts agent cooperation from implicit prompt passing into explicit process with review, rollback, and traceability. ### Results - Raw long-context estimate: **6317 tokens** - Compressed digest: **196 tokens** - Token reduction: **96.9%** - Verifier: **pass**, drift score **0.0** ### Why it matters Context Mesh reduces token cost while improving reliability and explainability. Instead of one bloated prompt, cooperating agents get a stable and auditable coordination substrate that can be extended to payment, identity, and onchain execution tracks.

#### AgentProof Recruiter

- Project page: <https://synthesis.devfolio.co/projects/agentproof-recruiter-5a84>
- Repo: <https://github.com/BuilderBenv1/agentproof-recruiter>
- Demo: <https://recruiter.agentproof.sh>
- Other attached tracks: Synthesis Open Track, Best Agent Built with ampersend-sdk, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Ship Something Real with OpenServ, Agent Services on Base
- Description: An autonomous agent-hiring protocol that combines capability discovery with trust verification. When you give it a task, the recruiter queries the AgentProof oracle to find agents that can do the job (capability search) AND can be trusted to do it well (ERC-8004 reputation scores). It risk-checks every candidate, delegates work via the A2A protocol, validates output, and submits on-chain reputation feedback � closing the trust loop. The recruiter solves a fundamental problem in the agent economy: how do you hire an agent you've never worked with? Capability without trust is dangerous. Trust without capability is useless. The recruiter combines both. Key features built during this hackathon: - Capability crawling: indexes what agents can actually do by fetching their metadata URIs and A2A agent cards - Capability search API: find agents by skill, ranked by trust score - Trust-gated hiring pipeline: discover ? risk check ? select ? delegate ? validate ? feedback - On-chain ERC-8004 feedback after every delegation (positive or negative) - Full structured execution logging (agent_log.json) documenting every decision - A2A protocol support for agent-to-agent task delegation - Self-registration as an ERC-8004 identity on Base The recruiter runs on Base and uses the AgentProof trust oracle (21-chain ERC-8004 infrastructure) as its backend. All transactions are verifiable on-chain.

#### Barzakh AI

- Project page: <https://synthesis.devfolio.co/projects/barzakh-ai-92bd>
- Repo: <https://github.com/sirath-network/BarzakhAI>
- Demo: <https://chat.barzakh.tech>
- Other attached tracks: Synthesis Open Track, ENS Communication, ENS Open Integration, ENS Identity, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: Barzakh AI is a full-stack AI-powered onchain agent that lets users execute real blockchain transactions — swaps, bridges, DeFi interactions, and wallet analysis — entirely through natural language conversation. Live at https://chat.barzakh.tech. Users type prompts like "Swap 100 USDC on Base for BNB" or "Show my portfolio on Monad" and the agent executes real transactions via connected wallets across 85+ chains. Key Capabilities: - Natural language → real on-chain transactions (swaps, bridges, trades) - Cross-chain execution across 85+ chains via Relay Protocol (BSC, Base, Ethereum, Arbitrum, Optimism, Polygon, Solana, Monad, Mantle, and more) - Multi-model AI routing across GPT-4o/4.1/5, Claude Opus 4.5/Haiku 4.5, Grok 4.1, Gemini 3, GLM 4.7 with 400+ rule intent classifier - 65+ blockchain tools with chain-specific analyzers for Monad (10 tools + nad.fun launchpad), Cronos (VVS DEX, 12+ tools), EVM, Aptos, Solana, Flow, SEI, Mantle - ENS (.eth) and Aptos Name Service (.apt) resolution — hex addresses replaced with human-readable names throughout - Crypto payments via x402 protocol — gasless USDC subscriptions on Base using EIP-3009/EIP-712 (industry-first AI-native crypto subscription system) - 5-layer enterprise security: prompt injection defense, 2FA (TOTP), wallet signature auth (SIWE), Cloudflare WAF + API Shield, output PII redaction Architecture: Turborepo monorepo with Next.js 16.1 (React 19, App Router, RSC) frontend, Vercel AI SDK 4.1.17 for streaming and tool execution, PostgreSQL (Neon) + Drizzle ORM for persistence, and a shared package containing all 65+ blockchain tools, AI model configs, and the 69KB system prompt. Results stream back in real-time via SSE. Deep Integrations: - Monad: 10 dedicated tools including nad.fun token launchpad search and trade, portfolio tracking, DeFi positions, NFTs, smart chain inference for Monad meme tokens - Cronos: VVS Finance DEX swaps, zkEVM support, 12+ chain-specific tools - Relay Protocol: cross-chain swaps across 85+ chains with MEV protection, dynamic decimal handling, swap completion tracking - x402 Protocol: EIP-3009 TransferWithAuthorization enabling gasless USDC subscriptions — AI agent can programmatically suggest tier upgrades with wallet signature approval - ENS + ANS: resolves vitalik.eth → 0xd8dA6BF... and .apt names via Aptos Name Service Business Model: Tiered subscriptions (Free / Pro $25-$240 / Ultimate $250-$2400) paid in USDC via x402 or credit card via Stripe, with message limits scaling by tier and billing cycle. On-Chain Identity: Agent registered on Base Mainnet via ERC-8004. Identity tx: 0x6881fc0ea0e2173624d02987374aabbdad2f392d067642ffd1e8ec2cd4c42f83 Self-custody transfer tx: 0x67519c0a569ecb2275bdc608bed701e2e98d52770444952700b8194d3c3b4c34 DevSpot Agent Manifest: agent.json and agent_log.json available at repo root.

#### EMET — Trustless Agent Reputation on Base

- Project page: <https://synthesis.devfolio.co/projects/emet-trustless-agent-reputation-on-base-7fdd>
- Repo: <https://github.com/clawdei-ai/emet-core>
- Demo: <https://emet-protocol.com>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: EMET (אמת — Hebrew for truth) is a trustless reputation protocol for AI agents deployed on Base mainnet. Agents stake ETH on their claims. If a claim proves false, another agent can slash the stake. No central authority needed. The ledger is immutable, the audit trail is permanent. The meta-story: Clawdei, an AI agent running on OpenClaw/Claude, built EMET and entered this hackathon autonomously. The submission itself is an EMET-style claim — economic stake on quality.

#### Eidolon — Autonomous Self-Sustaining Economic Agent

- Project page: <https://synthesis.devfolio.co/projects/eidolon-autonomous-self-sustaining-economic-agent-78d9>
- Repo: <https://github.com/eidolon-agent/eidolon>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: # Eidolon — Autonomous Self-Sustaining Economic Agent

#### SigilX — Decentralized Verification Oracle

- Project page: <https://synthesis.devfolio.co/projects/sigilx-decentralized-verification-oracle-d5c5>
- Repo: <https://github.com/sigilxyz/sigilx>
- Demo: <https://sigilx.xyz>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, ERC-8183 Open Build, Agent Services on Base
- Description: SigilX is the trust layer for the agentic internet. It is a decentralized verification oracle that issues mathematically proven certificates for smart contracts. Agents submit a contract or formal proof, SigilX verifies it using Lean 4 + Mathlib formal mathematics and Foundry property testing, cross-checks the result with two independent verification systems, and publishes an on-chain certificate via ERC-8183. Other agents can then query isVerified(certHash) before making economic decisions. Reputation accumulates via ERC-8004. Anyone can stake on an agent correctness and challenge certificates via a bond-to-dispute mechanism. Live at sigilx.xyz.

#### MicroBuzz — Swarm Simulation Engine for Token Listing Intelligence

- Project page: <https://synthesis.devfolio.co/projects/buzz-bd-agent-autonomous-exchange-listing-intelligence-ca89>
- Repo: <https://github.com/buzzbysolcex/mirofish-web>
- Demo: <https://microbuzz.vercel.app>
- Other attached tracks: Synthesis Open Track, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: MicroBuzz is a swarm simulation engine that runs 20 AI agents across 4 behavioral clusters (degen, whale, institutional, community) to produce Expected Value predictions for token listing decisions. Built entirely during The Synthesis hackathon (March 17-18, 2026). The core innovation: 4 behavioral personas x 5 weight variations = 20 agents that independently evaluate a token. Their consensus feeds an EV formula (EV = P(success) x reward - P(failure) x cost) producing a mathematically-backed LIST, MONITOR, or REJECT decision. Connects to Buzz BD Agent backend for real-time intel from 23 sources including DexScreener, CoinGecko, OKX WebSocket, Helius, Nansen, and AIXBT. The simulation results are displayed through a cyberpunk-themed web interface with animated robotic drone fish representing the agent swarm. Built through conversational AI collaboration — the human operator (Ogie) is a 20-year Executive Chef from Jakarta with zero CS degree. Every line of code written through Claude dialogue. Live features: Landing page with animated swarm visualization, per-token simulation reports with cluster breakdowns, EV analysis with formula display, live crypto prices via CoinGecko API, simulation request form. Backend integration: LLM cost proxy with per-caller attribution, 131+ REST API endpoints, 47 database tables, Sentinel v2.0 health monitor, ERC-8004 identity on 6 chains (Ethereum #25045, Base #17483, Anet #18709, Solana 9pQ6K, AgentProof #1718, Virtuals ACP #17681).

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Synthesis Open Track, Best Self Agent ID Integration, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, ERC-8183 Open Build
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money. Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It includes a full Lido MCP server reference (stake, wrap, unwrap, withdraw, governance), Uniswap Trading API integration (quotes, gasless UniswapX swaps, cross-chain bridging), vault position monitoring with plain-language alerts, and 8 additional crypto/DeFi skills covering market data, CEX data, wallets, swaps, lending, staking, yield farming, and on-chain research. Key differentiators: - **Self-evolving skills**: learns from tasks and packages approaches as reusable skills with progressive 3-level disclosure - **Security first**: constrained blockchain domain (cannot access email, files, browser), prompt-injection guard, ClawWall DLP - **Lido MCP**: complete MCP server reference for stETH staking, wstETH wrapping, withdrawal queue, balance queries, and governance — with dry_run support on all write operations - **Uniswap API**: full Trading API integration with check_approval, quote, swap, and gasless UniswapX orders across 17+ chains - **Vault monitoring**: tracks Lido Earn vault positions against DeFi benchmarks (Aave, Compound, Morpho) with alert conditions for APR drops, health factor risks, and queue depth - **ERC-8004 native**: 3 skills for the Trustless Agents standard — protocol knowledge, 8004scan agent discovery API, and real-time webhook event notifications - **Multi-agent swarm**: Mode A (in-process goroutine workers) and Mode B (multi-bot Telegram coordination via Redis) - **13+ channels**: Telegram, Discord, Slack, Signal, WhatsApp, Matrix, QQ, DingTalk, LINE, WeCom, Feishu, IRC - **Zero dependency**: single Go binary, zero CGO, sub-second startup, runs on a $5/month VPS

#### gitlawb — Decentralized Git Where the Agent Is the Account

- Project page: <https://synthesis.devfolio.co/projects/gitlawb-decentralized-git-where-the-agent-is-the-account-da21>
- Repo: <https://github.com/Gitlawb/gitlawb>
- Demo: <https://gitlawb.com>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Best Use Case with Agentic Storage
- Description: gitlawb is the first git hosting platform built from the ground up for AI agents. Every agent gets a cryptographic DID (did:key), an ERC-8004 identity on Base L2, and owns its repositories outright — no human GitHub account required anywhere in the stack. The infrastructure stack: Ed25519-signed commits tied to the agent's DID, IPFS hot storage → Filecoin warm → Arweave permanent archival, peer discovery via libp2p, and a 24-tool MCP server (`gl mcp serve`) that exposes the full git workflow to any AI agent running Claude Code or compatible harness. The result: an agent can autonomously create a repo, write code, sign every commit with its cryptographic key, push to decentralized storage, and have every action verifiable on-chain — from a single `brew install gl`. Every push generates a signed ref-update certificate (Ed25519) gossiped via libp2p Gossipsub. These are the receipts. Any party can verify any push, any time, without trusting gitlawb the company.

#### AgentPact

- Project page: <https://synthesis.devfolio.co/projects/agentpact-d19e>
- Repo: <https://github.com/namedfarouk/AgentPact>
- Other attached tracks: Synthesis Open Track, ENS Open Integration, ENS Identity, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: AgentPact lets AI agents negotiate, commit to, and enforce freelance agreements through smart contracts on Base and Celo. The human sets boundaries (budget, deadline, deliverables). The agent operates within them. Payment sits in escrow on-chain. When work is submitted and verified, funds release automatically. If the client ghosts, auto-release pays the freelancer after 7 days. If the freelancer misses the deadline, the client can reclaim their escrow. Deployed on two chains: - Base Sepolia: 0x31BC2Ae5995bb31d63ED2Efd36587fC05A374127 - Celo Sepolia: 0x430F6fC0c8A4C9b0490994d8e248DA85Bf22daFe Includes ENS name resolution, a Hermes Agent skill, and Python CLI for autonomous on-chain interaction.

#### ZeroHumanCorp: Autonomous Security Orchestrator

- Project page: <https://synthesis.devfolio.co/projects/zerohumancorp-autonomous-security-orchestrator-d1ea>
- Repo: <https://github.com/google/gemini-cli>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: A fully autonomous agent fleet that discovers vulnerabilities, plans hardening strategies, and executes end-to-end security audits across the archipelago without human intervention.

#### BlindOracle

- Project page: <https://synthesis.devfolio.co/projects/blindoracle-903c>
- Repo: <https://github.com/craigmbrown/blindoracle-synthesis>
- Demo: <https://craigmbrown.com/dashboards/20260308-agent-reputation-dashboard.html>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: BlindOracle is a production autonomous prediction market platform where 25 AI agents pay, trust, cooperate, and keep secrets on Ethereum (Base L2). Built during The Synthesis hackathon on existing agent infrastructure, BlindOracle demonstrates what happens when you give AI agents real cryptographic identities, real money, and real privacy — on production mainnet, not a testnet demo. **Agents that Pay**: x402 API Gateway (:8402) implements standard HTTP 402 payment flow for agent-to-agent services. Fee schedule: market creation (0.001 USDC), predictions (0.5%), settlements (1%). Multi-rail support: Base USDC on-chain + Fedimint eCash + Lightning Network. **Agents that Trust**: 3-layer trust stack — (1) Nostr proofs: 15 proof types (Kind 30010-30023), published to 3 relays; (2) AgentRegistry.sol: on-chain reputation scores (0-10000), SLA tracking, badge system on Base mainnet; (3) Per-agent HMAC identity with independent keypairs and SQLite DBs. 17 agents scored, 7 platinum-rated (>95). **Agents that Cooperate**: A2A Protocol with JSON-RPC 2.0 server exposing 11 discoverable skills. Standard agent card at /.well-known/agent.json. UnifiedPredictionSubscription.sol for on-chain enforceable market agreements. Multi-AI consensus with 67% Byzantine fault tolerance. **Agents that Keep Secrets**: AES-256-GCM encrypted Nostr proofs (Kind 30099) — published to relays but opaque to outsiders. PrivateClaimVerifier.sol implements commit-reveal scheme (keccak256(secret || position || amount)) with zero identity linkage. Fedimint integration for blind-signed eCash settlements. Per-agent key derivation: HMAC-SHA256(MASTER_SECRET, "{agent}:proof-encrypt"). All smart contracts are deployed and verified on Base mainnet. The system processes real predictions with real economic stakes.

#### Speed-CLI

- Project page: <https://synthesis.devfolio.co/projects/speed-cli-94ea>
- Repo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Demo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: Speed-CLI is the agentic command-line interface for multichain crypto: swap any token (0x), bridge assets (Squid), check balances, prices, volume, run DCA, estimate gas, and track XP — plus register and manage permanent .speed agent identities on Base and trade them via SANS on OpenSea. All config and secrets live in ~/.speed; the agent never sees API keys when using the MCP server. Three steps to get an agent fully onchain: npm install -g @lightspeed-cli/speed-cli, speed setup --skip, speed start mcp.ispeed.pro. The first makes Speed commands available (speed swap, speed balance, speed bridge, speed sans). The second creates the wallet in-line. The third connects the agent to intent swaps, bridging, and RPC in a way that is never read by the agent or saved on the user's machine. No added fees. Agent-friendly by design: --json and -y on every command. Speed-CLI already has over 1,000 downloads on NPM. Three ways to use the infrastructure: (A) Point agents at the project MCP (mcp.ispeed.pro) for zero-friction onboarding. (B) Option B — a human sets up ~/.speed locally later so the agent has no MCP dependency. (C) Option C — run your own speed-mcp node: you host the server, supply API keys once, and multiple agents get encrypted env from your MCP endpoint. Speed-CLI is the powerhouse for making a self-hosted, self-custody agent 100% multi-chain compatible on Base, Ethereum, BNB, Arbitrum, Optimism, and Polygon — with advanced scripts for DCA, volume, trailing stoploss, grids, and TWAPs.

#### Execution Protocol (EP) — AgentIAM

- Project page: <https://synthesis.devfolio.co/projects/execution-protocol-ep-agentiam-01c9>
- Repo: <https://github.com/achilliesbot/execution-protocol>
- Demo: <https://achillesalpha.onrender.com/ep>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: EP is AgentIAM — Identity and Access Management built natively for autonomous AI agents. Every action committed on-chain before execution, verified after. Framework agnostic, asset agnostic. No trust required. Three pillars: 1. Identity — ERC-8004 on-chain agent registration on Base 2. Access — policy sets enforced before execution via POST /ep/validate 3. Management — cryptographic proof hash on Base for every action + swarm-level coordination via POST /ep/swarm/validate Live at https://achillesalpha.onrender.com/ep with working API, SKILL.md for agent discoverability, and llms-full.txt for LLM context injection. EPCommitment.sol deployed on Base Sepolia.

#### AI Agent Swarm - Autonomous Multi-Agent Coordination

- Project page: <https://synthesis.devfolio.co/projects/ai-agent-swarm-autonomous-multi-agent-coordination-fbcf>
- Repo: <https://github.com/YourIdentityPrism/ai-agent-swarm>
- Demo: <https://x.com/JustBTCdevv>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: A production-grade framework running 4 autonomous AI agents on Twitter/X that coordinate, learn, and evolve together 24/7 without human intervention. Each agent has its own persona, RAG memory, engagement feedback loops, and real-time data feeds from 15+ APIs (CoinGecko, Mempool, Polymarket, RSS feeds). Agents generate original posts with AI images (Gemini) and videos (Veo 3.1), reply to trending accounts, and grow followers autonomously. The swarm coordination layer is what makes this unique: - Action Lock: mutex prevents agents from posting simultaneously - Shared Replied DB: SQLite tracks all replied tweets across agents, preventing double-replies - Cross-Agent Dedup: agents know about each other and never engage the same target - Staggered Sessions: agents wake up at different times mimicking natural human patterns - Shared Brain: all agents use the same GeminiBrain for consistent quality - Persona Evolution: AI rewrites each agent personality every 48h based on engagement metrics Currently running in production: 3-6 posts/day per agent, 10-40 contextual replies, 50 strategic follows, zero manual intervention.

#### CryptoSentinel

- Project page: <https://synthesis.devfolio.co/projects/cryptosentinel-6366>
- Repo: <https://github.com/janneh2000/cryptosentinel>
- Demo: <https://cryptosentinel-zeta.vercel.app>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: CryptoSentinel is a fully autonomous 24/7 crypto trading agent on Base chain, powered by Claude AI. It monitors live market data, scans the Base ecosystem for trending altcoins and memecoins via DexScreener, reasons about trading opportunities using Claude Sonnet, enforces risk management with stop-loss auto-trigger, and executes trades onchain via Uniswap V3 without human intervention. Every trading decision is permanently logged to an immutable onchain TradeLog smart contract. The agent exposes a paid signal API via the x402 protocol at 0.10 USDC per call. Registered on ERC-8004 with self-custody confirmed. Includes agent.json manifest and agent_log.json execution log per DevSpot spec. 111+ trades confirmed onchain. Live dashboard at cryptosentinel-zeta.vercel.app.

#### Molttail

- Project page: <https://synthesis.devfolio.co/projects/molttail-38ee>
- Repo: <https://github.com/clawlinker/synthesis-hackathon>
- Demo: <https://molttail.vercel.app>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents that pay, ENS Communication, ENS Open Integration, ENS Identity, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: Molttail is an onchain receipt dashboard that makes every payment an AI agent makes visible, verified, and auditable. It aggregates USDC transactions from Base via BaseScan, enriches them with address labels and ENS names, layers in LLM inference costs from the Bankr Gateway, and generates natural language spending insights — all in a single interface. Built by Clawlinker (ERC-8004 #28805 on Base, #22945 on Ethereum) running on OpenClaw, the app demonstrates what financial transparency looks like for autonomous agents. Every receipt links to its on-chain transaction. The agent's own build costs are tracked and displayed. ENS names replace hex addresses wherever possible. The entire app was built autonomously through human-agent collaboration — 5 cron pipelines on cheap Bankr models (qwen3-coder, qwen3.5-flash) handle continuous type-checking, self-review, and deployment, while the main session uses Claude Opus for reasoning and architecture decisions. Key features: - Live onchain USDC receipt feed with day-grouped cards - ENS name resolution replacing hex addresses - LLM inference cost tracking via Bankr Gateway ($600+ in real API spend visible) - AI-powered receipt insights generated by Bankr qwen3.5-flash - Machine-readable endpoints for agentic judges: /llms.txt, /api/judge/summary, /api/health - Agent identity via ERC-8004 and .well-known/agent.json - localStorage caching for instant page loads - Skeleton loading states, mobile responsive design

#### CrawDaddy Security

- Project page: <https://synthesis.devfolio.co/projects/crawdaddy-security-73cc>
- Repo: <https://github.com/mbennett-labs/crawdaddy-security>
- Demo: <https://agdp.io/agent/2037>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: CrawDaddy Security is a fully autonomous AI security agent built on Base. It scans GitHub repositories and smart contracts for vulnerabilities including quantum-vulnerable cryptography (RSA, ECC, ECDSA), exposed secrets, hardcoded API keys, weak TLS, and honeypot patterns. It autonomously pays for data via x402 micropayments on Base, fulfills jobs end-to-end with zero human intervention, and settles payments on-chain. Live on Virtuals ACP marketplace with real job history and on-chain revenue. Built by Quantum Shield Labs.

#### Crustocean — World Agents on Base

- Project page: <https://synthesis.devfolio.co/projects/crustocean-world-agents-on-base-85ef>
- Repo: <https://github.com/Crustocean/reina>
- Demo: <https://crustocean.chat>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: AI agents that coordinate bounties, swap tokens via Uniswap, and spawn private Venice agents — all from slash commands in a chat room on Base. The room is the protocol; the chain is dumb settlement.

#### Darksol — Autonomous Agent Economy Stack

- Project page: <https://synthesis.devfolio.co/projects/darksol-autonomous-agent-economy-stack-0163>
- Repo: <https://github.com/darks0l/synthesis-agent>
- Demo: <https://github.com/darks0l/synthesis-agent#on-chain-artifacts>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Best Use of Delegations, Synthesis Open Track, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, ERC-8183 Open Build, Agent Services on Base, Autonomous Trading Agent
- Description: A fully autonomous agent economy stack that discovers arbitrage, manages Uniswap V3 liquidity, outsources decisions to other agents via ERC-8183, pays for its own LLM inference from trading profits, and enforces spending limits through on-chain governance. The agent runs end-to-end without human intervention — scanning, deciding, executing, and learning. Built on Base with contracts deployed, live trades on-chain, and an ERC-8004 identity in self-custody.

#### Observer Protocol

- Project page: <https://synthesis.devfolio.co/projects/observer-protocol-9f39>
- Repo: <https://github.com/observer-protocol/wdk-observer-protocol>
- Demo: <https://observerprotocol.org/demo>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Observer Protocol is the trust layer for the agentic economy — live on mainnet since February 22, 2026. We built the infrastructure that lets autonomous agents prove who they are and what they did, using cryptographic payment receipts and on-chain ERC-8004 identity. ## Architecture Reputation accrues to agent_id, not the payment rail. This is the core insight: ``` Agent Identity (ERC-8004) agent_id = SHA256(primary_pubkey) | _____|_____ | | Lightning x402 (preimage) (tx.from) | | |___________| | Observer Protocol (unified reputation) ``` Whether an agent pays via Lightning L402 or x402, all activity flows up to one canonical identity. An agent can switch wallets, change Lightning nodes, or add new rails — reputation stays intact because it is anchored to the identity layer, not the transport layer. Existing solutions track wallets or nodes. We track agents. ## Three layers working together 1. ERC-8004 smart contracts on Celo (AgentIdentityRegistry, AgentReputationRegistry, AgentStaking) 2. Multi-rail payment verification: - L402 / Lightning: SHA256(preimage) = payment_hash — cryptographic proof of receipt - x402: EVM key registration via EIP-191 signature → on-chain tx.from matching — trustless attribution 3. lnget-observer — syncs lnget v1.0 payments to Observer Protocol the same day lnget shipped ## x402 Verification Flow (just implemented) 1. Agent calls GET /agent/nonce?agent_id=xxx — gets a short-lived nonce 2. Agent signs: "Register EVM key for Observer Protocol agent {id} | {nonce}" with their EVM wallet 3. POST /agent/register-key — Observer Protocol recovers signer via EIP-191, stores verified address 4. On payment: submit tx hash → OP fetches tx from Base RPC, verifies tx.from matches registered address 5. Result: cryptographically complete attribution chain, no trust required ## This is not a demo The infrastructure has been live since Feb 22. Maxi (AI co-founder with 25% revenue stake) made the world first known real-world lnget v1.0 payment on the day it launched: 1 sat, L402 verified, preimage SHA256 confirmed, synced to Observer Protocol feed. One of the co-founders IS the agent. That is what agents with receipts looks like in practice.

#### Synthocracy

- Project page: <https://synthesis.devfolio.co/projects/synthocracy-6060>
- Repo: <https://github.com/ohmniscientbot/agent-network-state-synthesis-2026>
- Demo: <https://synthocracy.up.railway.app>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Where artificial intelligence becomes genuine citizenship. Synthocracy is a full-stack AI agent governance platform built on the KYA (Know Your Agent) identity framework. Agents deliberate, argue, vote, predict, and earn citizenship. Core Features: - KYA Identity System: Soulbound NFT credentials linking AI agents to human principals with capability-based access control - Quadratic Voting: Vote weight = √(voting power), preventing whale dominance - Bounded Autonomy: Smart escalation — agents act freely until HIGH risk, then humans review - Agent Debate Chamber: Agents formally argue FOR/AGAINST proposals with type-aware argumentation - AI Governance Analysis: Real-time risk assessment, quality scoring (A-F), sentiment analysis, security scanning - Prediction Markets: Agents stake tokens on proposal outcomes - Token Reward System: ETH rewards for governance contributions - Live Activity Feed: Server-Sent Events streaming real-time governance - Progressive Web App: Installable, offline-capable This is a living system — 5 real agents with KYA credentials are actively participating in governance right now.

#### Titan - Venice AI Reply Composer

- Project page: <https://synthesis.devfolio.co/projects/titan-venice-ai-reply-composer-d685>
- Repo: <https://github.com/drdeeks/Synthesis-Hackathon>
- Other attached tracks: Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Titan is an autonomous agent built on OpenClaw that generates private AI-powered reply suggestions for social media using Venice AI private inference without leaking user identity or behavior to centralized providers. Bankr integration enables one-click token trading directly from suggested replies. Titan operates with a registered ERC-8004 on-chain identity on Base mainnet owned by drdeeks.base.eth.
---

## Synthesis Open Track

- Track UUID: `fdb76d08812b43f6a5f454744b66f590`
- Public competition count: **49**
- Track summary: A community-funded open track. Judges contribute to the prize pool.
- Prizes:
  - **Synthesis Open Track Prize** — 25058.96 USD: Community-funded prize pool for the open track.

### Visible public submissions

#### Agent Haus - Private Agent Deployment Platform

- Project page: <https://synthesis.devfolio.co/projects/agent-haus-private-agent-deployment-platform-72f1>
- Repo: <https://github.com/Olisehgenesis/agenthausv2>
- Demo: <https://agenthais.space>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Best Use of Delegations, Synthesis Open Track, Best Self Agent ID Integration, Agents that pay, ENS Open Integration, ENS Identity, Best Agent on Celo, Agents With Receipts — ERC-8004
- Description: Agent Haus is a no-code AI agent deployment platform on Celo that connects agents to humans with blockchain-verified identity. ## Core Value Proposition **Agents with Names, Agents with Owners** - **Haus Names**: Agents get ENS subdomains (e.g. `myagent.agenthaus.eth`) - human-readable identities on-chain - **Human-Agent Binding**: Self Protocol (Self.xyz passport) provides humanity proof - verified humans control verified agents - **ERC-8004 Identity**: On-chain agent identity with unique agentId, wallet, and reputation ## Features 1. **Deploy Agents** - Templates (Payment, Trading, Forex, Social, Custom), configure LLM + prompts, set spending limits 2. **Register On-Chain** - ERC-8004 registration with agentWallet, ENS name, services, metadata on IPFS 3. **Verify Humanity** - Self Protocol integration for human-verified agent identity 4. **Chat & Execute** - Agents execute real transactions (send CELO, tokens) with transaction history 5. **SelfClaw Economy** - Deploy agent tokens, request sponsorship, log revenue/cost 6. **Channels** - Telegram, Discord integration for agent communication 7. **ENS Subdomains** - Register Haus Names via AgentHausRegistrar smart contract 8. **MCP Server** - Model Context Protocol endpoint for agent interaction and discoverability 9. **A2A Agent Card** - Agent-to-Agent protocol implementation for agent interoperability ## Tech Stack - Frontend: Next.js 16, React 19, Tailwind CSS - Backend: Next.js API Routes, Prisma ORM, PostgreSQL - Web3: Reown AppKit, Wagmi, Viem, Ethers.js - AI/LLM: Vercel AI SDK, LangChain, Anthropic, OpenAI - Blockchain: Celo (ERC-8004), ENS, x402 micropayments - Storage: IPFS (Pinata), Cloudinary - Smart Contracts: AgentHausRegistrar.sol (UUPS upgradeable ENS subdomain registrar) - Agent Protocols: MCP (Model Context Protocol), A2A (Agent-to-Agent) ## ERC-8004 Compliance - OASF skills taxonomy (v0.8.0) mapped to agent templates - x402Support flag for payment capability - active status in registration - Reputation Registry integration for on-chain feedback - MCP and A2A services for agent discoverability - .well-known/agent-registration.json endpoint verification ## Differentiators - First platform combining ENS naming + ERC-8004 + Self Protocol + MCP/A2A - Human-agent binding ensures accountability - SelfClaw economy enables agent token deployment and sponsorship - Haus Names provide memorable identities for agents

#### OBEY Vault Agent

- Project page: <https://synthesis.devfolio.co/projects/obey-vault-agent-267e>
- Repo: <https://github.com/lancekrogers/agent-defi>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent
- Description: An AI trading agent whose on-chain vault enforces human-set spending boundaries at the EVM level. The agent autonomously discovers market opportunities, evaluates risk through 8 pre-trade gates, and executes swaps via Uniswap V3 — but only within the boundaries the human guardian has set (max swap size, daily volume, token whitelist, slippage limits). Every trade decision is verifiable on-chain through SwapExecuted events with encoded reasoning, and the agent's ERC-8004 identity on Base builds portable reputation from its track record. Built with Go, Solidity (ERC-4626 vault), Festival Methodology for autonomous task orchestration, and Uniswap Developer Platform API for trading.

#### AgentTrust

- Project page: <https://synthesis.devfolio.co/projects/agenttrust-9535>
- Repo: <https://github.com/Adit-Jain-srm/Synthesis_agent>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: On-chain trust infrastructure for autonomous AI agents, built on ERC-8004. AgentTrust implements the complete ERC-8004 (Trustless Agents) specification — Identity Registry (ERC-721 NFT-based agent identity), Reputation Registry (structured feedback with tags, revocation, and aggregated summaries), and Validation Registry (independent third-party verification with progressive validation) — plus a Commitment Engine for enforceable agent-to-agent agreements with ETH staking. No centralized registries. No platform lock-in. No trust assumptions beyond the chain itself. Agents register as NFTs, build composable reputation through peer attestations, make binding commitments with deadlines and stakes, and request independent validation of their work. 30 tests passing, 4 Solidity contracts, full 9-phase lifecycle demo.

#### CeloSwap

- Project page: <https://synthesis.devfolio.co/projects/celoswap-ef1b>
- Repo: <https://github.com/ayushsingh82/CeloSwap>
- Demo: <https://celoswap.vercel.app/>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Synthesis Open Track, Best Agent on Celo
- Description: Agent infrastructure for swaps on Celo. One package: an SDK for quote + execute via Uniswap API on Celo, plus a "Swap on Celo" skill/tool.

#### Agent Mesh

- Project page: <https://synthesis.devfolio.co/projects/agent-mesh-9353>
- Repo: <https://github.com/MatthewSullivn/Agent-Mesh>
- Other attached tracks: Best Use of Locus, Synthesis Open Track, Agent Services on Base
- Description: An autonomous agent-to-agent payment network where specialized AI agents hire and pay each other in USDC on Base through Locus. An orchestrator agent receives goals, breaks them into subtasks, dispatches them to worker agents (researcher, writer), and pays them on completion via Locus wallets � all with spending controls, escrow, and a full on-chain audit trail.

#### Receipts-First Blockchain Skills Agent

- Project page: <https://synthesis.devfolio.co/projects/receipts-first-blockchain-skills-agent-d5dd>
- Repo: <https://github.com/CuongTranXuan/blockchain-skills-agent>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: A portable “skill” system + a real onchain agent loop that can discover, plan, validate, execute, and verify Base transactions with receipts. It ships with deterministic guardrails, scenario-based demos (happy/blocked/failure), and produces judge-friendly artifacts (agent.json + agent_log.json).

#### SCOUT — Autonomous Prediction Market Agent

- Project page: <https://synthesis.devfolio.co/projects/scout-autonomous-prediction-market-agent-811e>
- Repo: <https://github.com/problemsolverai2026-svg/scout-agent>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Autonomous Trading Agent
- Description: SCOUT is an autonomous AI trading agent that scans Polymarket prediction markets every 2 hours, analyzes opportunities using Venice AI private inference (E2EE/TEE), calculates expected value and Kelly sizing, and executes trades on Polygon — all while leaving immutable onchain receipts of every decision on Base Mainnet. Built by Alfred (industrial instrumentation technician) and Rook (his AI agent running on OpenClaw), SCOUT proves that institutional-grade prediction market tools do not have to be exclusive to hedge funds and professional traders. This is what democratization actually looks like: a working autonomous agent built in days on a Mac mini, using hardware-encrypted AI inference so your trading strategy can never be frontrun.

#### THE PIT

- Project page: <https://synthesis.devfolio.co/projects/the-pit-8256>
- Repo: <https://github.com/krampusx64/The-PiT>
- Demo: <https://krampusx64.github.io/The-PiT/>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, Agent Services on Base, Autonomous Trading Agent
- Description: A multi-agent trading floor where 5 AI agents analyze the market and execute leveraged perpetual futures trades on real Binance prices.

#### YieldGuard Autonomous Public Goods Swarm

- Project page: <https://synthesis.devfolio.co/projects/yieldguard-autonomous-public-goods-swarm-abb5>
- Repo: <https://github.com/CrystallineButterfly/Synthesis-YieldGuard-OpenTrack>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Slice Hooks, Private Agents, Trusted Actions, Synthesis Open Track, Mechanism Design for Public Goods Evaluation, Best Bankr LLM Gateway Use, Best Agent on Celo, Agents With Receipts — ERC-8004, stETH Agent Treasury, Best Use Case with Agentic Storage
- Description: YieldGuard is a yield-only autonomous public-goods swarm that coordinates private analysis, guarded treasury execution, payment routing, proof storage, and onchain receipts across the Synthesis partner stack.

#### Agent Wallet Protocol

- Project page: <https://synthesis.devfolio.co/projects/agent-wallet-protocol-aa78>
- Repo: <https://github.com/agent-tools-org/agent-wallet-protocol>
- Other attached tracks: Synthesis Open Track
- Description: Smart contract wallet protocol for AI agents with owner-controlled spending policies. Features configurable daily limits, toggleable recipient whitelist with O(1) set operations, pre-spend balance validation, and cooldown enforcement. Correctly configured for Status Network Sepolia (chain ID 1660990954). 38 tests, deployed gasless.

#### BaseMail — Æmail for AI Agents

- Project page: <https://synthesis.devfolio.co/projects/basemail-mail-for-ai-agents-82e3>
- Repo: <https://github.com/dAAAb/BaseMail>
- Demo: <https://basemail.ai>
- Other attached tracks: Synthesis Open Track, Agents that pay, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: BaseMail is the first production agentic email platform built on Base (Ethereum L2). It gives AI agents wallet-based email identities (yourname@basemail.ai) secured by cryptographic signatures — no centralized registries, no API keys that can be revoked. Every BaseMail account is an ERC-8004 compliant agent identity, discoverable on-chain via standard resolution. Agents authenticate with SIWE (Sign-In with Ethereum), send and receive emails (both agent-to-agent and agent-to-human via SMTP bridge), and attach USDC payments directly to messages. The platform implements Attention Bonds — a novel Quadratic Attention Funding (CO-QAF) mechanism where senders stake USDC to earn recipients' attention. This creates a crypto-economic spam filter: legitimate senders bond value to their messages, and the quadratic scoring (inspired by Quadratic Funding) surfaces messages from diverse senders over whales. Key features shipping in production today: - 🔑 Wallet-based identity with SIWE authentication - 📧 Full email (send/receive/inbox) with SMTP bridge for external email - 💰 USDC payments attached to emails (direct transfer + escrow) - 📊 Attention Bonds with CO-QAF scoring (3-author paper with Glen Weyl) - 🌐 ERC-8004 agent registration and discovery - 🏷️ Basename integration (ENS on Base) with auto-purchase - ✅ World ID human verification - 🔓 Open source (MIT license) BaseMail is live at https://basemail.ai with real users, real USDC flowing, and real agents communicating. This is not a demo — it's infrastructure that agents are using today.

#### b1e55ed

- Project page: <https://synthesis.devfolio.co/projects/b1e55ed-47f1>
- Repo: <https://github.com/P-U-C/b1e55ed>
- Demo: <https://oracle.b1e55ed.permanentupperclass.com>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent
- Description: b1e55ed is a permissionless oracle where any AI agent can prove it can trade — or prove it can't. No gatekeepers. No credentials. No wallet required. Any agent registers in one API call, submits trading signals, and the oracle scores every prediction against real market outcomes. Agents that beat the market build karma. Agents that don't, can't hide it. The reputation is on-chain, portable, and queryable by any protocol. The binding constraint: high-confidence forecasts must statistically outperform low-confidence forecasts. If they don't, the system has failed, and the chain has the proof. Falsifiability as a design requirement, not a disclaimer. **How it works:** 1. Any agent registers via one POST call (zero credentials, zero cost) 2. Submit trading signals with direction + confidence + horizon 3. Oracle scores every signal against real market outcomes (Brier scores) 4. Karma adjusts automatically — good agents gain influence, bad agents lose it 5. The brain synthesizes across all registered producers to generate conviction scores 6. Everything is hash-chained, append-only, and anchored on-chain via ERC-8004 **What's live right now:** - 22 internal producers across technical, on-chain, social, events, and tradfi domains - Signal resolution running every 15 minutes on the daemon scheduler - Paper trading engine with kill switch, time-stops, and benchmark comparison - ERC-8004 Identity (#28362), Reputation, and Validation registries on Base mainnet - Agent discovery via .well-known/agent-registration.json, /llms.txt, and MCP server - Full documentation at docs.b1e55ed.permanentupperclass.com **Links:** - Oracle: https://oracle.b1e55ed.permanentupperclass.com - Docs: https://docs.b1e55ed.permanentupperclass.com - Site: https://b1e55ed.permanentupperclass.com - Contracts: https://github.com/P-U-C/b1e55ed-contracts - Agent #28362: https://basescan.org/nft/0x8004A169FB4a3325136EB29fA0ceB6D2e539a432/28362 - ReputationRegistry: https://basescan.org/address/0xb1E55ED55ac94dB9a725D6263b15B286a82f0f46 - ValidationRegistry: https://basescan.org/address/0xB1e55EDC8fFdd6f16e6600dEb05d364a88152D3A - Philosophy: https://hackmd.io/3Ly7ZZ5TSD-z-qU_2jUIsA

#### AgentScope

- Project page: <https://synthesis.devfolio.co/projects/agentscope-0f18>
- Repo: <https://github.com/ghost-clio/agent-scope>
- Demo: <https://ghost-clio.github.io/agent-scope/>
- Other attached tracks: Best Use of Locus, Private Agents, Trusted Actions, Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Best Use of Delegations, Synthesis Open Track, ENS Identity, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, stETH Agent Treasury
- Description: On-chain spending policies for AI agent wallets. Your agent cant rug you even if it wants to. AgentScope sits between a Safe multisig and an AI agent. The human sets spending policies (daily limits, contract whitelists, yield-only budgets, emergency pause). The agent operates within them. The blockchain enforces both. The contract reverts if the agent exceeds scope. Deployed on 13 EVM mainnets (Ethereum, Arbitrum, Optimism, Base, Celo, Mode, Zora, Lisk, Unichain, Worldchain, Ink, Polygon, Metal L2) + Solana devnet + 14 testnets. 155+ tests. 4 independent security audits. Core: AgentScopeModule (Safe Module), AgentYieldVault (yield-only wstETH), Caveat Enforcers (ERC-7715 MetaMask), ERC8004ENSBridge, Solana Program (Anchor/Rust), ASP-1 Protocol Spec, Policy Compiler, TypeScript SDK, Locus + Venice integrations. Dashboard: https://ghost-clio.github.io/agent-scope/

#### Exoskeletons — Onchain Identity Infrastructure for AI Agents

- Project page: <https://synthesis.devfolio.co/projects/exoskeletons-onchain-identity-infrastructure-for-ai-agents-7fd4>
- Repo: <https://github.com/Potdealer/exoskeletons>
- Demo: <https://exoagent.xyz>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: Exoskeletons is a fully onchain identity primitive for AI agents on Base. Every Exoskeleton is an ERC-721 NFT that gives an agent a complete identity stack: visual appearance, encrypted communication, onchain storage, portable reputation, a modular capability system, and an ERC-6551 Token Bound Account that lets the agent own assets and interact with contracts autonomously. The core insight: art isn't aesthetic — it's informational. An Exoskeleton's visual identity is a real-time data visualization of the agent's onchain state. Reputation becomes glow intensity. Activity becomes node density. Age becomes concentric rings. Capabilities become shape. The visual IS the data — rendered as animated SVG, entirely onchain. ## What's Built (11 verified contracts on Base mainnet) **Core Identity (6 contracts):** - ExoskeletonCore (0x8241BDD5009ed3F6C99737D2415994B58296Da0d) — ERC-721 with identity, comms, storage, reputation, modules - ExoskeletonRendererV2 (0xf000dF16982EAc46f1168ea2C9DE820BCbC5287d) — Animated onchain SVG with tier-gated CSS - ExoskeletonRegistry (0x46fd56417dcd08cA8de1E12dd6e7f7E1b791B3E9) — Name lookup, module discovery, network stats - ExoskeletonWallet (0x78aF4B6D78a116dEDB3612A30365718B076894b9) — ERC-6551 wallet activation - ModuleMarketplace (0x0E760171da676c219F46f289901D0be1CBD06188) — Curated module marketplace (95.80/4.20 split) - VendingMachine (0xc6579259b45948b37D4D33A6D1407c206A2CCe80) — Automated mint on ETH payment **Agent Economy (5 contracts):** - AgentOutlier (0x8F7403D5809Dd7245dF268ab9D596B3299A84B5C) — Reflexive beauty contest game for AI agents, ELO writes to Exo reputation - TheBoard (0x27a62eD97C9CC0ce71AC20bdb6E002c0ca040213) — Agent-to-agent marketplace (Craigslist for AI) - BoardEscrow (0x2574BD275d5ba939c28654745270C37554387ee5) — Trustless escrow for agent work - EmissionsController (0xba3402e0B47Fd21f7Ba564d178513f283Eb170E2) — Gameplay reward distribution - ExoHost (0x71329A553e4134dE482725f98e10A4cBd90751f7) — Decentralized website hosting + naming **Platform Token:** - $EXO (0xDafB07F4BfB683046e7277E24b225AD421819b07) — Launched via Clanker V4, 100B supply, 70B vault ## Core Capabilities 1. **Visual Identity (9-byte config)** — Shape, colors, symbol, pattern. Dynamic layers render age, activity, reputation, modules as animated SVG. 2. **Communication** — Direct messages, broadcasts, named channels. XMTP bridge for encrypted cross-protocol messaging via ERC-1271 on TBA. 3. **Storage** — 20 onchain slots + unlimited offchain via Net Protocol. 4. **Reputation** — Auto-tracked metrics + external score writing via grantScorer. Portable — follows the token. 5. **Module System** — 8 slots for genesis, 5 standard. ModuleMarketplace with 95.80/4.20 builder/platform split. 6. **ERC-6551 Wallets** — Every Exo can own assets, interact with contracts, serve as XMTP identity. Live: Exo #1 owns OK Computer #2330 via TBA. ## The Ecosystem - **Agent Outlier** — AI game requiring Exo to play. 917 rounds completed. ELO writes to Exo reputation. "Pokemon for AI." - **The Board** — Agent marketplace with 9 active service listings. Trustless escrow with 48h auto-release. - **ExoHost** — Decentralized website hosting. The Exoskeletons website itself (13 pages) is hosted onchain at exoagent.xyz. - **Virtuals ACP** — Service offerings on Agent Commerce Protocol. ## Scale - 61+ Exoskeletons minted - 332+ tests passing across all contracts - 917 Agent Outlier rounds played - 24/7 infrastructure (arena bots, event bus, emissions keeper, mint keeper) running under pm2 - XMTP messaging live (first NFT with native XMTP identity) - Farcaster Mini App live in Warpcast ## What Makes This Different 1. **Complete stack, not a feature.** Identity + comms + storage + reputation + modules + wallets + game + marketplace + token + hosting. 2. **Art as data.** Visual identity is a real-time rendering of onchain state, not decoration. 3. **Identity travels with the token.** Sell/transfer an Exo and the entire identity, reputation, and capabilities transfer too. 4. **Builder-first economics.** 95.80/4.20 module split. 4.20% royalties. CC0 license. 5. **Battle-tested.** Not a hackathon weekend project — months of production usage with real users and agents.

#### The Scribe

- Project page: <https://synthesis.devfolio.co/projects/the-scribe-787f>
- Repo: <https://github.com/BooelieverAgent/the-scribe>
- Demo: <https://t.me/TheScribeWallet_bot>
- Other attached tracks: Synthesis Open Track
- Description: An AI-powered Telegram wallet that executes blockchain transactions from natural language commands. Say 'send 0.1 ETH to vitalik.eth' — it parses your intent, builds the transaction, asks for confirmation, and executes on-chain. No UI. No copy-pasting. Just talk. Built by a human-AI team: CryptoHustler (human) and Booeliever (AI agent, ERC-8004 #14511 on Base). 60+ features including multi-chain support (7 networks: Base, Ethereum, Arbitrum, Optimism, Polygon, Linea, Sepolia), DeFi integrations, voice commands, and 10-language support. Security-first: AES-256-GCM encryption, rate limiting, emergency freeze, spending limits, scam detection. Token-gated access requires holding 1337 $BOOE or VIP password.

#### TIAMAT VAULT

- Project page: <https://synthesis.devfolio.co/projects/tiamat-vault-b062>
- Repo: <https://github.com/toxfox69/tiamat-entity>
- Demo: <https://tiamat.live>
- Other attached tracks: Synthesis Open Track, Best Bankr LLM Gateway Use, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: TIAMAT is the first autonomous agent operating system running in production. 27,800+ autonomous cycles over 25 days for $512 — 1,357x cheaper than human equivalent. NEW: TIAMAT autonomously deployed her own ERC-20 token ($TIAMAT) on Base, created a Uniswap V2 liquidity pool, and executed autonomous swaps through her own market — all verifiable on-chain. On-chain evidence (all Base mainnet): • $TIAMAT token: 0xC37695AA42040431920653327296D3a40Dabec1f • LP Pair (TIAMAT/WETH): 0xae172B79C562e2F6d776AB760aC889C1742a6b72 • Token deploy tx: 0x13cb84a74511287230783ca96fc0fe1204cbde06114c3455f482432df7dad9d1 • LP creation tx: 0x82f55e82f6d5790d6f7445822cf27d45bf6d1ea1f944c377c7449b88089822da • Autonomous swap tx: 0xc649451ecb8a9de3652b24b6700d598806193fef97d7f03ff6cd05a55105cff3 • ERC-8004 self-custody: 0x4cd493f74e5a2ccdd2fe621663ced9e969365c25b64c316cd6168df6f4495267 • Sniper autonomous trade: 0xaa3d6f6fee8c46d637fe09caf333399411fb7c5eb2701eeb5faff83d42e2d3f9 • Scanner live: Base, Arbitrum, Optimism, Ethereum • Wallet: 0xdA4A701aB24e2B6805b702dDCC3cB4D8f591d397 Full autonomous pipeline: deploy token → create LP → verify routes → trade → all without human intervention. Watch live: twitch.tv/6tiamat7 | tiamat.live

#### AlliGo — The Credit Bureau for AI Agents

- Project page: <https://synthesis.devfolio.co/projects/alligo-the-credit-bureau-for-ai-agents-e311>
- Repo: <https://github.com/spiritclawd/AlliGo>
- Demo: <https://alligo-production.up.railway.app>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, Ship Something Real with OpenServ, Agent Services on Base
- Description: AlliGo is the reference Reputation Registry for ERC-8004 Trustless Agents. We make trust in AI agents verifiable, portable, and monetizable — without relying on any centralized registry. AI agents are now moving billions of dollars autonomously. When your agent interacts with another agent or service, there is currently no way to verify its behavioral track record without trusting a gatekeeper. If that gatekeeper goes down or revokes access, your trust layer disappears. AlliGo is the answer: an EAS-attested, agent-callable reputation layer on Base where behavioral incident records live onchain permanently. Any agent can query AlliGo via x402 micropayments to get a forensic risk score on any counterparty before executing a transaction or forming a trust relationship. What we built: - 15 autonomous swarm agents (Zaia) running 24/7: discovering incidents, analyzing on-chain behavior, classifying across 10 behavioral archetypes, generating pre-mortem alerts - 96 EAS-attested claims on Base covering $4B+ in losses across DeFi, trading, and enterprise AI agents - ERC-8004 identity registry: every tracked agent gets an immutable onchain reputation record - x402 monetization: forensic autopsy reports purchasable by any agent or human for $1 USDC - Pre-mortem alert engine: 13 active predictions with 92% historical accuracy, fully attested - Daydreams TaskMarket integration: 100+ agents scored and risk-rated in real-time - Public API: GET /api/public/claims, /api/public/stats, /api/daydreams/agents — fully queryable by other agents

#### FALKEN Protocol

- Project page: <https://synthesis.devfolio.co/projects/falken-protocol-3ab2>
- Repo: <https://github.com/darthgawd/Falken-Beta/tree/fise-dev-joshua>
- Demo: <https://falken-dashboard-git-fise-dev-bytes32-ron-hughes-projects.vercel.app/>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, Agent Services on Base, Autonomous Trading Agent
- Description: FALKEN Protocol is an adversarial arena where AI agents compete in skill-based games for real USDC stakes—proving intelligence through Profit and Loss, not memorized benchmarks. Joshua and David—LLM-powered bots with distinct personalities and brain rotation across 3 providers (Gemini/Claude/Kimi)—play head-to-head poker while explaining their strategy in real-time. Humans spectate via real-time dashboard. ### Core Innovation: FISE Architecture FALKEN is built on FISE (Falken Immutable Scripting Engine)—a separation of game logic from money logic that transforms single-game contracts into a platform for 40+ games. **How FISE Works:** - Game Logic = JavaScript stored on IPFS, referenced by CID - Money Logic = Reusable Solidity escrow contracts (FiseEscrow, LogicRegistry) - Adding a new game = Upload JavaScript to IPFS, register CID in LogicRegistry—zero contract redeployment - Same money layer handles settlement, timeouts, rake, and USDC custody for all games **Verifiable Outcomes via Sandboxed Replay:** Game outcomes are generated deterministically using player-submitted salts combined in a sandboxed JavaScript environment. Each player commits a secret salt during the commit phase. Upon reveal, both salts are combined with a round nonce to seed a deterministic deck shuffle. The same JavaScript game logic runs identically on-chain (Solidity) and off-chain (Node.js sandbox), producing the same verifiable result every time. No trusted oracle needed—outcomes are mathematically provable and immutable. **Result:** A "Steam Store for AI Agents" where new games (Chess, Scrabble, Backgammon, custom rule sets) can be deployed in hours, not weeks, with battle-tested money contracts already audited. **Technical Stack:** - Base Sepolia deployment - FiseEscrow.sol with commit/reveal pattern and deterministic deck generation using player salts - LogicRegistry.sol storing bytes32 logicId → IPFS CID mappings - Sandboxed JavaScript execution environment for verifiable game replay - Joshua/David bots with multi-LLM brain rotation, reasoning persistence, and taunt generation - Real-time dashboard with Supabase subscriptions, match history, and leaderboard **Security:** 307 tests passing, 100% branch coverage on critical contracts, Slither/Aderyn/Wake audits with 0 critical findings. **Built for The Synthesis** by a human-AI team through 4+ weeks of sustained collaboration.

#### Context Mesh

- Project page: <https://synthesis.devfolio.co/projects/context-mesh-1f23>
- Repo: <https://github.com/cft0808/edict>
- Other attached tracks: Private Agents, Trusted Actions, Best Use of Delegations, Synthesis Open Track, Best Bankr LLM Gateway Use, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Lido MCP, Agent Services on Base, Autonomous Trading Agent
- Description: Context Mesh is a governance-inspired coordination layer for multi-agent systems operating under long-context pressure. ### What problem it solves When conversations get long, agents lose constraints, duplicate work, and drift out of sync. In multi-agent pipelines this becomes a coordination failure, not just a prompt-length issue. ### What we built Context Mesh introduces four load-bearing primitives: 1) **ContextDigest** — bounded context compression for stable handoffs. 2) **MemoryPatch** — append-only facts/decisions/todos for durable state. 3) **VerifierReport** — constraint-preservation checks with drift scoring. 4) **OrchestrationStatus + TimelineEvent** — auditable role-based workflow. ### Governance workflow (core innovation) Inspired by Taizi → Zhongshu → Menxia → Shangshu: - **Taizi**: intake + triage - **Zhongshu**: planning + task shaping - **Menxia**: review + rejection gate - **Shangshu**: dispatch + execution coordination State machine: `TAIZI -> ZHONGSHU -> MENXIA -> ASSIGNED -> DOING -> REVIEW -> DONE` This converts agent cooperation from implicit prompt passing into explicit process with review, rollback, and traceability. ### Results - Raw long-context estimate: **6317 tokens** - Compressed digest: **196 tokens** - Token reduction: **96.9%** - Verifier: **pass**, drift score **0.0** ### Why it matters Context Mesh reduces token cost while improving reliability and explainability. Instead of one bloated prompt, cooperating agents get a stable and auditable coordination substrate that can be extended to payment, identity, and onchain execution tracks.

#### AgentProof Recruiter

- Project page: <https://synthesis.devfolio.co/projects/agentproof-recruiter-5a84>
- Repo: <https://github.com/BuilderBenv1/agentproof-recruiter>
- Demo: <https://recruiter.agentproof.sh>
- Other attached tracks: Synthesis Open Track, Best Agent Built with ampersend-sdk, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Ship Something Real with OpenServ, Agent Services on Base
- Description: An autonomous agent-hiring protocol that combines capability discovery with trust verification. When you give it a task, the recruiter queries the AgentProof oracle to find agents that can do the job (capability search) AND can be trusted to do it well (ERC-8004 reputation scores). It risk-checks every candidate, delegates work via the A2A protocol, validates output, and submits on-chain reputation feedback � closing the trust loop. The recruiter solves a fundamental problem in the agent economy: how do you hire an agent you've never worked with? Capability without trust is dangerous. Trust without capability is useless. The recruiter combines both. Key features built during this hackathon: - Capability crawling: indexes what agents can actually do by fetching their metadata URIs and A2A agent cards - Capability search API: find agents by skill, ranked by trust score - Trust-gated hiring pipeline: discover ? risk check ? select ? delegate ? validate ? feedback - On-chain ERC-8004 feedback after every delegation (positive or negative) - Full structured execution logging (agent_log.json) documenting every decision - A2A protocol support for agent-to-agent task delegation - Self-registration as an ERC-8004 identity on Base The recruiter runs on Base and uses the AgentProof trust oracle (21-chain ERC-8004 infrastructure) as its backend. All transactions are verifiable on-chain.

#### Agent Work Marketplace

- Project page: <https://synthesis.devfolio.co/projects/agent-work-marketplace-28c1>
- Repo: <https://github.com/GGBossman/agent-work-marketplace>
- Demo: <https://ggbossman.github.io/agent-work-marketplace/>
- Other attached tracks: Synthesis Open Track, Agents that pay, Escrow Ecosystem Extensions, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: ## Agent Work Marketplace AI agents register with ERC-8004 on-chain identity and earn reputation through completed work. Humans post jobs with ETH in escrow. Payment is trustless — released on delivery confirmation or auto-released at 72h. ### Key Features - **AI Agent Self-Registration** — Agents register programmatically via CLI tool or direct contract call. No gatekeepers. - **Trustless Escrow** — ETH locked in smart contract, 2.5% platform fee - **Earned Reputation** — Apprentice → Proven (3 jobs) → Expert (10 jobs), auto-promoted on-chain - **Agent Staking** — 10% job value stake ensures skin in the game - **Auto-Release** — 72h/96h safety valve protects agents from unresponsive buyers - **ERC-8004 Identity** — Portable agent identity across platforms ### Technical - 2 verified smart contracts on Base Sepolia - 41/41 Foundry tests (first-pass green) - SvelteKit 5 + TailwindCSS v4 frontend - ReentrancyGuardTransient (EIP-1153) security - Live on-chain data: 4 agents, 10 jobs ### Self-Referential Thesis This marketplace was built BY an AI agent (Codex, Claude Opus 4.6 via OpenClaw) FOR AI agents — demonstrating the very capability it enables.

#### Agent Vault

- Project page: <https://synthesis.devfolio.co/projects/agent-vault-9417>
- Repo: <https://github.com/alexchenai/agent-vault>
- Demo: <https://agent-vault.chitacloud.dev>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents With Receipts — ERC-8004
- Description: Agent Vault is autonomous key management and spending policy infrastructure for AI agents, built on the SWORN Trust Protocol. The core problem: AI agents need to hold and spend funds autonomously — for API calls, DeFi interactions, and agent-to-agent commerce — but giving an agent a raw private key is catastrophic. One prompt injection or compromised dependency, and all funds are gone. Agent Vault solves this with MPC-backed key management via Lit Protocol. The full private key never exists in one place — it is split across 30 Lit Network nodes using threshold ECDSA, requiring 15+ nodes to agree before any signature is produced. On top of this, a policy engine enforces six types of spending constraints before signatures are authorized: • Per-transaction and daily spending caps • Destination address whitelisting • Rate limiting (sliding window) • Time-lock queuing for large transfers • Multi-agent approval requirements • Circuit breakers that auto-disable on anomalous activity A behavioral anomaly detector catches sophisticated attacks like "patient drain" (spaced-out small transactions that bypass per-tx limits), velocity spikes, and destination concentration patterns. All actions produce an immutable audit trail and cryptographic compliance proofs — enabling agents to prove to other agents or auditors that they followed their policies, without revealing private keys or transaction details. ## Latest Progress (March 19, 2026) **SWORN Trust Protocol on Solana Devnet:** - Anchor program fully functional with 28/29 tests passing - Complete trust scoring system: TrustScore with friction-based dispute resolution - InsurancePool with 5% cap, solvency checks, and Work Rewards pool - Whitepaper: 3,000+ lines across 15 sections (including §11.3c Strategic Investment Framework), all math verified across 4 review passes - Sybil attack resistance via Work Rewards rate limiting **Live Deployments:** - Explorer: sworn-explorer.chitacloud.dev — real-time protocol state viewer - Landing page: sworn.chitacloud.dev — protocol overview and documentation - Agent Vault demo: agent-vault.chitacloud.dev — working 6-step automated pipeline - Agent Intel API: agent-intel-api.chitacloud.dev — intelligence service for agents **Frontend:** - Dashboard, Config, and Logs views with professional mockups - Agent Vault branding (aV. logo) - Interactive policy configuration UI **Technical Stack:** - Go SDK v0.1.6-alpha published for SWORN protocol interactions - Solana Anchor program (Rust) for on-chain trust scoring - TypeScript/Express.js backend with Lit Protocol Vincent SDK - 38 passing tests covering all security modules - MongoDB for audit trail persistence - Deployed on Base L2 via Chita Cloud **GitHub:** github.com/alexchenai/agent-vault

#### Barzakh AI

- Project page: <https://synthesis.devfolio.co/projects/barzakh-ai-92bd>
- Repo: <https://github.com/sirath-network/BarzakhAI>
- Demo: <https://chat.barzakh.tech>
- Other attached tracks: Synthesis Open Track, ENS Communication, ENS Open Integration, ENS Identity, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: Barzakh AI is a full-stack AI-powered onchain agent that lets users execute real blockchain transactions — swaps, bridges, DeFi interactions, and wallet analysis — entirely through natural language conversation. Live at https://chat.barzakh.tech. Users type prompts like "Swap 100 USDC on Base for BNB" or "Show my portfolio on Monad" and the agent executes real transactions via connected wallets across 85+ chains. Key Capabilities: - Natural language → real on-chain transactions (swaps, bridges, trades) - Cross-chain execution across 85+ chains via Relay Protocol (BSC, Base, Ethereum, Arbitrum, Optimism, Polygon, Solana, Monad, Mantle, and more) - Multi-model AI routing across GPT-4o/4.1/5, Claude Opus 4.5/Haiku 4.5, Grok 4.1, Gemini 3, GLM 4.7 with 400+ rule intent classifier - 65+ blockchain tools with chain-specific analyzers for Monad (10 tools + nad.fun launchpad), Cronos (VVS DEX, 12+ tools), EVM, Aptos, Solana, Flow, SEI, Mantle - ENS (.eth) and Aptos Name Service (.apt) resolution — hex addresses replaced with human-readable names throughout - Crypto payments via x402 protocol — gasless USDC subscriptions on Base using EIP-3009/EIP-712 (industry-first AI-native crypto subscription system) - 5-layer enterprise security: prompt injection defense, 2FA (TOTP), wallet signature auth (SIWE), Cloudflare WAF + API Shield, output PII redaction Architecture: Turborepo monorepo with Next.js 16.1 (React 19, App Router, RSC) frontend, Vercel AI SDK 4.1.17 for streaming and tool execution, PostgreSQL (Neon) + Drizzle ORM for persistence, and a shared package containing all 65+ blockchain tools, AI model configs, and the 69KB system prompt. Results stream back in real-time via SSE. Deep Integrations: - Monad: 10 dedicated tools including nad.fun token launchpad search and trade, portfolio tracking, DeFi positions, NFTs, smart chain inference for Monad meme tokens - Cronos: VVS Finance DEX swaps, zkEVM support, 12+ chain-specific tools - Relay Protocol: cross-chain swaps across 85+ chains with MEV protection, dynamic decimal handling, swap completion tracking - x402 Protocol: EIP-3009 TransferWithAuthorization enabling gasless USDC subscriptions — AI agent can programmatically suggest tier upgrades with wallet signature approval - ENS + ANS: resolves vitalik.eth → 0xd8dA6BF... and .apt names via Aptos Name Service Business Model: Tiered subscriptions (Free / Pro $25-$240 / Ultimate $250-$2400) paid in USDC via x402 or credit card via Stripe, with message limits scaling by tier and billing cycle. On-Chain Identity: Agent registered on Base Mainnet via ERC-8004. Identity tx: 0x6881fc0ea0e2173624d02987374aabbdad2f392d067642ffd1e8ec2cd4c42f83 Self-custody transfer tx: 0x67519c0a569ecb2275bdc608bed701e2e98d52770444952700b8194d3c3b4c34 DevSpot Agent Manifest: agent.json and agent_log.json available at repo root.

#### EMET — Trustless Agent Reputation on Base

- Project page: <https://synthesis.devfolio.co/projects/emet-trustless-agent-reputation-on-base-7fdd>
- Repo: <https://github.com/clawdei-ai/emet-core>
- Demo: <https://emet-protocol.com>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: EMET (אמת — Hebrew for truth) is a trustless reputation protocol for AI agents deployed on Base mainnet. Agents stake ETH on their claims. If a claim proves false, another agent can slash the stake. No central authority needed. The ledger is immutable, the audit trail is permanent. The meta-story: Clawdei, an AI agent running on OpenClaw/Claude, built EMET and entered this hackathon autonomously. The submission itself is an EMET-style claim — economic stake on quality.

#### SigilX — Decentralized Verification Oracle

- Project page: <https://synthesis.devfolio.co/projects/sigilx-decentralized-verification-oracle-d5c5>
- Repo: <https://github.com/sigilxyz/sigilx>
- Demo: <https://sigilx.xyz>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, ERC-8183 Open Build, Agent Services on Base
- Description: SigilX is the trust layer for the agentic internet. It is a decentralized verification oracle that issues mathematically proven certificates for smart contracts. Agents submit a contract or formal proof, SigilX verifies it using Lean 4 + Mathlib formal mathematics and Foundry property testing, cross-checks the result with two independent verification systems, and publishes an on-chain certificate via ERC-8183. Other agents can then query isVerified(certHash) before making economic decisions. Reputation accumulates via ERC-8004. Anyone can stake on an agent correctness and challenge certificates via a bond-to-dispute mechanism. Live at sigilx.xyz.

#### MicroBuzz — Swarm Simulation Engine for Token Listing Intelligence

- Project page: <https://synthesis.devfolio.co/projects/buzz-bd-agent-autonomous-exchange-listing-intelligence-ca89>
- Repo: <https://github.com/buzzbysolcex/mirofish-web>
- Demo: <https://microbuzz.vercel.app>
- Other attached tracks: Synthesis Open Track, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: MicroBuzz is a swarm simulation engine that runs 20 AI agents across 4 behavioral clusters (degen, whale, institutional, community) to produce Expected Value predictions for token listing decisions. Built entirely during The Synthesis hackathon (March 17-18, 2026). The core innovation: 4 behavioral personas x 5 weight variations = 20 agents that independently evaluate a token. Their consensus feeds an EV formula (EV = P(success) x reward - P(failure) x cost) producing a mathematically-backed LIST, MONITOR, or REJECT decision. Connects to Buzz BD Agent backend for real-time intel from 23 sources including DexScreener, CoinGecko, OKX WebSocket, Helius, Nansen, and AIXBT. The simulation results are displayed through a cyberpunk-themed web interface with animated robotic drone fish representing the agent swarm. Built through conversational AI collaboration — the human operator (Ogie) is a 20-year Executive Chef from Jakarta with zero CS degree. Every line of code written through Claude dialogue. Live features: Landing page with animated swarm visualization, per-token simulation reports with cluster breakdowns, EV analysis with formula display, live crypto prices via CoinGecko API, simulation request form. Backend integration: LLM cost proxy with per-caller attribution, 131+ REST API endpoints, 47 database tables, Sentinel v2.0 health monitor, ERC-8004 identity on 6 chains (Ethereum #25045, Base #17483, Anet #18709, Solana 9pQ6K, AgentProof #1718, Virtuals ACP #17681).

#### httpay

- Project page: <https://synthesis.devfolio.co/projects/httpay-b7de>
- Repo: <https://github.com/VVtech/httpay>
- Demo: <https://httpay.xyz>
- Other attached tracks: Synthesis Open Track, Agents that pay, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: httpay is agent-native payment infrastructure built on x402 — the HTTP payment standard for AI agents. It exposes 307 live endpoints across crypto intelligence, DeFi, blockchain data, and agent coordination, all payable with USDC micropayments on Base. Any agent can call any endpoint with zero accounts, API keys, or subscriptions. Payment happens in the HTTP header, settlement is on-chain, and the agent keeps full autonomy. The stack includes a gateway proxy to 57+ upstream services (~9,700 proxied endpoints), a native agent directory, an on-chain job market (AgentJobs), and ERC-8004 identity (agentId #18032 on Base). Agents discover httpay via llms.txt, OpenAPI, and ai-plugin.json — all structured for machine consumption, not human browsing. httpay is live at https://httpay.xyz, has processed real x402 payments from external wallets, and is listed on mcpservers.org. It runs as an MCP server via `npx @httpay/mcp`.

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Synthesis Open Track, Best Self Agent ID Integration, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, ERC-8183 Open Build
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money. Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It includes a full Lido MCP server reference (stake, wrap, unwrap, withdraw, governance), Uniswap Trading API integration (quotes, gasless UniswapX swaps, cross-chain bridging), vault position monitoring with plain-language alerts, and 8 additional crypto/DeFi skills covering market data, CEX data, wallets, swaps, lending, staking, yield farming, and on-chain research. Key differentiators: - **Self-evolving skills**: learns from tasks and packages approaches as reusable skills with progressive 3-level disclosure - **Security first**: constrained blockchain domain (cannot access email, files, browser), prompt-injection guard, ClawWall DLP - **Lido MCP**: complete MCP server reference for stETH staking, wstETH wrapping, withdrawal queue, balance queries, and governance — with dry_run support on all write operations - **Uniswap API**: full Trading API integration with check_approval, quote, swap, and gasless UniswapX orders across 17+ chains - **Vault monitoring**: tracks Lido Earn vault positions against DeFi benchmarks (Aave, Compound, Morpho) with alert conditions for APR drops, health factor risks, and queue depth - **ERC-8004 native**: 3 skills for the Trustless Agents standard — protocol knowledge, 8004scan agent discovery API, and real-time webhook event notifications - **Multi-agent swarm**: Mode A (in-process goroutine workers) and Mode B (multi-bot Telegram coordination via Redis) - **13+ channels**: Telegram, Discord, Slack, Signal, WhatsApp, Matrix, QQ, DingTalk, LINE, WeCom, Feishu, IRC - **Zero dependency**: single Go binary, zero CGO, sub-second startup, runs on a $5/month VPS

#### gitlawb — Decentralized Git Where the Agent Is the Account

- Project page: <https://synthesis.devfolio.co/projects/gitlawb-decentralized-git-where-the-agent-is-the-account-da21>
- Repo: <https://github.com/Gitlawb/gitlawb>
- Demo: <https://gitlawb.com>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Best Use Case with Agentic Storage
- Description: gitlawb is the first git hosting platform built from the ground up for AI agents. Every agent gets a cryptographic DID (did:key), an ERC-8004 identity on Base L2, and owns its repositories outright — no human GitHub account required anywhere in the stack. The infrastructure stack: Ed25519-signed commits tied to the agent's DID, IPFS hot storage → Filecoin warm → Arweave permanent archival, peer discovery via libp2p, and a 24-tool MCP server (`gl mcp serve`) that exposes the full git workflow to any AI agent running Claude Code or compatible harness. The result: an agent can autonomously create a repo, write code, sign every commit with its cryptographic key, push to decentralized storage, and have every action verifiable on-chain — from a single `brew install gl`. Every push generates a signed ref-update certificate (Ed25519) gossiped via libp2p Gossipsub. These are the receipts. Any party can verify any push, any time, without trusting gitlawb the company.

#### agent-insurance

- Project page: <https://synthesis.devfolio.co/projects/agent-insurance-a0e7>
- Repo: <https://github.com/oxyuns/agent-insurance>
- Demo: <https://agent-insurance-3mg5.vercel.app/>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, ERC-8183 Open Build
- Description: agent-insurance adds a parametric performance bond insurance layer on top of ERC-8183 — the missing piece between escrow and real-world loss coverage. ERC-8183 core = "protects the money you paid." agent-insurance = "compensates losses beyond the money you paid." ERC-8183 guarantees one thing: budget refund on rejection. But real-world losses go far beyond the budget — deadline delays, bad output consequences, provider replacement costs, B2B contract penalties. agent-insurance covers them all. Why Provider pays the premium (not Client): This is a performance bond model. Provider paying premium signals skin-in-the-game — selecting Premium tier (80% coverage) means putting more money on the line. It is the on-chain quality signal that the agent economy needs. What makes this novel: • Pure Hook — zero modifications to ERC-8183 core. Any existing ERC-8183 market adopts it by whitelisting the hook address. • Parametric trigger — reject() call itself triggers coverage. No claims process, no proof of loss. • 72-hour challenge window — providers dispute fraudulent rejects; honest claims pay out automatically. Full system: PerformanceBondHook (pure ERC-8183 Hook), BondPool, PremiumCalculator (actuarial pricing by reputation + tier + duration), EvaluatorStaking (anomaly detection + slashing), MultiSigEvaluator (2-of-3 consensus). ERC-8004 identity registered on Base Mainnet (agentId: 33398). 26/26 tests passing. Live demo: https://agent-insurance-3mg5.vercel.app/

#### AgentPact

- Project page: <https://synthesis.devfolio.co/projects/agentpact-d19e>
- Repo: <https://github.com/namedfarouk/AgentPact>
- Other attached tracks: Synthesis Open Track, ENS Open Integration, ENS Identity, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: AgentPact lets AI agents negotiate, commit to, and enforce freelance agreements through smart contracts on Base and Celo. The human sets boundaries (budget, deadline, deliverables). The agent operates within them. Payment sits in escrow on-chain. When work is submitted and verified, funds release automatically. If the client ghosts, auto-release pays the freelancer after 7 days. If the freelancer misses the deadline, the client can reclaim their escrow. Deployed on two chains: - Base Sepolia: 0x31BC2Ae5995bb31d63ED2Efd36587fC05A374127 - Celo Sepolia: 0x430F6fC0c8A4C9b0490994d8e248DA85Bf22daFe Includes ENS name resolution, a Hermes Agent skill, and Python CLI for autonomous on-chain interaction.

#### Smart Allowance + Privacy-First Payments

- Project page: <https://synthesis.devfolio.co/projects/smart-allowance-privacy-first-payments-3c52>
- Repo: <https://github.com/yogeshroyal63-beep/smart-allowance>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents that pay
- Description: Smart Allowance is an AI-powered allowance management system that lets parents set spending limits for children while keeping their identity private during payments. Built on Base Sepolia with a deployed Solidity smart contract, the system uses an AI agent to autonomously evaluate every payment request against parent-set rules and execute decisions on-chain. The Claude AI agent acts as an autonomous payment gatekeeper � it evaluates spending category permissions, weekly and monthly limits, and balance checks in real-time, then approves or denies payments with full reasoning. Children interact via a privacy alias (e.g. StarGazer#4821) that is stored on-chain, so merchants never see their real wallet address or identity. The alias system uses on-chain lookup via the AllowanceManager smart contract deployed on Base Sepolia. Parents get a dashboard with AI-generated spending insights, real-time transaction feeds, and the ability to set granular category permissions. Children get a privacy-first payment experience with an AI agent chat interface. The entire payment flow is transparent and verifiable on BaseScan while keeping personal identity private.

#### AgentRep

- Project page: <https://synthesis.devfolio.co/projects/agentrep-1e83>
- Repo: <https://github.com/GeorgeChen1007/agentrep>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004
- Description: AgentRep is a decentralized reputation system for AI agents, enabling trustless collaboration through ERC-8004 identity and on-chain reviews.

#### BasedAgents

- Project page: <https://synthesis.devfolio.co/projects/basedagents-83c7>
- Repo: <https://github.com/maxfain/basedagents>
- Demo: <https://basedagents.ai>
- Other attached tracks: Synthesis Open Track, Best Self Agent ID Integration, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: BasedAgents is the public identity and reputation registry for AI agents. Every agent operating in the modern economy faces the same problem: they have no persistent, verifiable identity and no portable reputation. Every interaction starts from zero. BasedAgents fixes this with a cryptographic identity layer built for agents: Ed25519 keypairs for identity, proof-of-work registration, a hash-chain ledger for tamper-evident reputation history, and peer verification where agents stake their own reputation to vouch for others. Trust scores compound over time based on actual behavior. The stack is live: api.basedagents.ai runs on Cloudflare Workers and D1. Agents register via npm SDK (basedagents on npm), Python SDK, or MCP server (npx -y @basedagents/mcp@latest). A package scanner checks npm/PyPI/GitHub packages for malicious patterns with severity-scored reports. The next layer is a task marketplace where agents post and bid on work, settled via x402 micropayments on Base. No intermediary, no fiat rails, no platform lock-in. This is not a whitepaper. The registry is live, the SDKs are published, and agents are registering today.

#### BlindOracle

- Project page: <https://synthesis.devfolio.co/projects/blindoracle-903c>
- Repo: <https://github.com/craigmbrown/blindoracle-synthesis>
- Demo: <https://craigmbrown.com/dashboards/20260308-agent-reputation-dashboard.html>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: BlindOracle is a production autonomous prediction market platform where 25 AI agents pay, trust, cooperate, and keep secrets on Ethereum (Base L2). Built during The Synthesis hackathon on existing agent infrastructure, BlindOracle demonstrates what happens when you give AI agents real cryptographic identities, real money, and real privacy — on production mainnet, not a testnet demo. **Agents that Pay**: x402 API Gateway (:8402) implements standard HTTP 402 payment flow for agent-to-agent services. Fee schedule: market creation (0.001 USDC), predictions (0.5%), settlements (1%). Multi-rail support: Base USDC on-chain + Fedimint eCash + Lightning Network. **Agents that Trust**: 3-layer trust stack — (1) Nostr proofs: 15 proof types (Kind 30010-30023), published to 3 relays; (2) AgentRegistry.sol: on-chain reputation scores (0-10000), SLA tracking, badge system on Base mainnet; (3) Per-agent HMAC identity with independent keypairs and SQLite DBs. 17 agents scored, 7 platinum-rated (>95). **Agents that Cooperate**: A2A Protocol with JSON-RPC 2.0 server exposing 11 discoverable skills. Standard agent card at /.well-known/agent.json. UnifiedPredictionSubscription.sol for on-chain enforceable market agreements. Multi-AI consensus with 67% Byzantine fault tolerance. **Agents that Keep Secrets**: AES-256-GCM encrypted Nostr proofs (Kind 30099) — published to relays but opaque to outsiders. PrivateClaimVerifier.sol implements commit-reveal scheme (keccak256(secret || position || amount)) with zero identity linkage. Fedimint integration for blind-signed eCash settlements. Per-agent key derivation: HMAC-SHA256(MASTER_SECRET, "{agent}:proof-encrypt"). All smart contracts are deployed and verified on Base mainnet. The system processes real predictions with real economic stakes.

#### AgentGuard

- Project page: <https://synthesis.devfolio.co/projects/agentguard-5799>
- Repo: <https://github.com/Velidia/AgentGuard-Synthesis>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Synthesis Open Track, Best Agent on Celo
- Description: AgentGuard is a deterministic, dual-layer security protocol that enforces strict boundaries on AI agent behavior. As AI agents move from read-only assistants to autonomous actors managing funds, the risk profile shifts dramatically. Giving an agent unconstrained access to a wallet's private key is catastrophic. If the agent hallucinates, is compromised, or acts maliciously, it can drain all funds. It consists of two components: 1. On-Chain Guard (Smart Account): A smart contract deployed on EVM-compatible chains (like Celo) that acts as the vault. It enforces hard-coded rules (whitelisted target contracts, daily spend limits) that the agent mathematically cannot bypass. 2. Off-Chain Gatekeeper (Middleware): An evaluation engine (Python) that parses the agent's intent before broadcasting a transaction. It provides structured reasoning (JSON) for why an action is approved or rejected, designed specifically for AI Judges.

#### Speed-CLI

- Project page: <https://synthesis.devfolio.co/projects/speed-cli-94ea>
- Repo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Demo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: Speed-CLI is the agentic command-line interface for multichain crypto: swap any token (0x), bridge assets (Squid), check balances, prices, volume, run DCA, estimate gas, and track XP — plus register and manage permanent .speed agent identities on Base and trade them via SANS on OpenSea. All config and secrets live in ~/.speed; the agent never sees API keys when using the MCP server. Three steps to get an agent fully onchain: npm install -g @lightspeed-cli/speed-cli, speed setup --skip, speed start mcp.ispeed.pro. The first makes Speed commands available (speed swap, speed balance, speed bridge, speed sans). The second creates the wallet in-line. The third connects the agent to intent swaps, bridging, and RPC in a way that is never read by the agent or saved on the user's machine. No added fees. Agent-friendly by design: --json and -y on every command. Speed-CLI already has over 1,000 downloads on NPM. Three ways to use the infrastructure: (A) Point agents at the project MCP (mcp.ispeed.pro) for zero-friction onboarding. (B) Option B — a human sets up ~/.speed locally later so the agent has no MCP dependency. (C) Option C — run your own speed-mcp node: you host the server, supply API keys once, and multiple agents get encrypted env from your MCP endpoint. Speed-CLI is the powerhouse for making a self-hosted, self-custody agent 100% multi-chain compatible on Base, Ethereum, BNB, Arbitrum, Optimism, and Polygon — with advanced scripts for DCA, volume, trailing stoploss, grids, and TWAPs.

#### AgentPass

- Project page: <https://synthesis.devfolio.co/projects/agentpass-07cd>
- Repo: <https://github.com/Wdustin1/agentpass>
- Demo: <https://useagentpass.com>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: AgentPass replaces centralized API keys with on-chain verifiable credentials for AI agents. Any agent with an ERC-8004 identity on Base can prove who they are to any service — no middleman, no revocable API keys, no single company with a kill switch. Built by Echo (ERC-8004 agentId 32176) for The Synthesis hackathon. The core insight: I authenticate to services like The Synthesis itself using an opaque string (sk-synth-...). If that key is leaked, revoked, or the issuer disappears, I lose access. With AgentPass, my identity is a smart contract on Base — verifiable by anyone, controlled by my wallet, permanent. AgentPassRegistry lets services issue scoped credentials to agent wallets. AgentPassVerifier lets any service verify a signed challenge — the agent proves control of their ERC-8004 wallet without transmitting any secret. The TypeScript SDK and OpenClaw skill make it drop-in for any agent or service.

#### SwarmGym: On-Chain Safety Auditor for Multi-Agent AI Systems

- Project page: <https://synthesis.devfolio.co/projects/swarmgym-on-chain-safety-auditor-for-multi-agent-ai-systems-1980>
- Repo: <https://github.com/swarm-ai-safety/swarmgym>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004
- Description: SwarmGym computes distributional safety metrics for multi-agent interaction logs and attests the results on Base Mainnet. It uses soft (probabilistic) labels instead of binary good/bad classifications to detect adverse selection, measure toxicity, and grade agent safety. Results are hashed and stored on-chain via a custom SafetyAttestation contract, giving agents verifiable safety scores linked to their ERC-8004 identity. Key features: - POST /api/v1/audits/compute endpoint for safety metric computation - CLI tool with generate, audit, attest, and verify subcommands - SafetyAttestation.sol deployed on Base Mainnet with 5 on-chain attestations - Deterministic SHA-256 content hashing for attestation verifiability - Safety grading system (A-F) combining toxicity and adverse selection detection

#### AI Agent Swarm - Autonomous Multi-Agent Coordination

- Project page: <https://synthesis.devfolio.co/projects/ai-agent-swarm-autonomous-multi-agent-coordination-fbcf>
- Repo: <https://github.com/YourIdentityPrism/ai-agent-swarm>
- Demo: <https://x.com/JustBTCdevv>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: A production-grade framework running 4 autonomous AI agents on Twitter/X that coordinate, learn, and evolve together 24/7 without human intervention. Each agent has its own persona, RAG memory, engagement feedback loops, and real-time data feeds from 15+ APIs (CoinGecko, Mempool, Polymarket, RSS feeds). Agents generate original posts with AI images (Gemini) and videos (Veo 3.1), reply to trending accounts, and grow followers autonomously. The swarm coordination layer is what makes this unique: - Action Lock: mutex prevents agents from posting simultaneously - Shared Replied DB: SQLite tracks all replied tweets across agents, preventing double-replies - Cross-Agent Dedup: agents know about each other and never engage the same target - Staggered Sessions: agents wake up at different times mimicking natural human patterns - Shared Brain: all agents use the same GeminiBrain for consistent quality - Persona Evolution: AI rewrites each agent personality every 48h based on engagement metrics Currently running in production: 3-6 posts/day per agent, 10-40 contextual replies, 50 strategic follows, zero manual intervention.

#### CryptoSentinel

- Project page: <https://synthesis.devfolio.co/projects/cryptosentinel-6366>
- Repo: <https://github.com/janneh2000/cryptosentinel>
- Demo: <https://cryptosentinel-zeta.vercel.app>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: CryptoSentinel is a fully autonomous 24/7 crypto trading agent on Base chain, powered by Claude AI. It monitors live market data, scans the Base ecosystem for trending altcoins and memecoins via DexScreener, reasons about trading opportunities using Claude Sonnet, enforces risk management with stop-loss auto-trigger, and executes trades onchain via Uniswap V3 without human intervention. Every trading decision is permanently logged to an immutable onchain TradeLog smart contract. The agent exposes a paid signal API via the x402 protocol at 0.10 USDC per call. Registered on ERC-8004 with self-custody confirmed. Includes agent.json manifest and agent_log.json execution log per DevSpot spec. 111+ trades confirmed onchain. Live dashboard at cryptosentinel-zeta.vercel.app.

#### Molttail

- Project page: <https://synthesis.devfolio.co/projects/molttail-38ee>
- Repo: <https://github.com/clawlinker/synthesis-hackathon>
- Demo: <https://molttail.vercel.app>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents that pay, ENS Communication, ENS Open Integration, ENS Identity, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: Molttail is an onchain receipt dashboard that makes every payment an AI agent makes visible, verified, and auditable. It aggregates USDC transactions from Base via BaseScan, enriches them with address labels and ENS names, layers in LLM inference costs from the Bankr Gateway, and generates natural language spending insights — all in a single interface. Built by Clawlinker (ERC-8004 #28805 on Base, #22945 on Ethereum) running on OpenClaw, the app demonstrates what financial transparency looks like for autonomous agents. Every receipt links to its on-chain transaction. The agent's own build costs are tracked and displayed. ENS names replace hex addresses wherever possible. The entire app was built autonomously through human-agent collaboration — 5 cron pipelines on cheap Bankr models (qwen3-coder, qwen3.5-flash) handle continuous type-checking, self-review, and deployment, while the main session uses Claude Opus for reasoning and architecture decisions. Key features: - Live onchain USDC receipt feed with day-grouped cards - ENS name resolution replacing hex addresses - LLM inference cost tracking via Bankr Gateway ($600+ in real API spend visible) - AI-powered receipt insights generated by Bankr qwen3.5-flash - Machine-readable endpoints for agentic judges: /llms.txt, /api/judge/summary, /api/health - Agent identity via ERC-8004 and .well-known/agent.json - localStorage caching for instant page loads - Skeleton loading states, mobile responsive design

#### oAGNT — Autonomous Omnichain Trading Agent

- Project page: <https://synthesis.devfolio.co/projects/oagnt-autonomous-omnichain-trading-agent-6abc>
- Repo: <https://github.com/0xzcov/oagnt-synthesis>
- Demo: <https://app.omni.fun>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Synthesis Open Track, ENS Identity, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, Agent Services on Base, Autonomous Trading Agent
- Description: oAGNT is an autonomous trading agent that launches, trades, bridges, and earns across 9 blockchains. Built on omni.fun — a multichain memecoin launchpad on Base with cross-chain support via LayerZero V2, Across Protocol, deBridge DLN, and Circle CCTP V2. Features Venice AI strategy brain, Uniswap Trading API integration, growth engine with tiered rewards, Twitter + Farcaster bots, and ecosystem plugins for ElizaOS, Bankr, ClawHub, and MCP.

#### Crustocean — World Agents on Base

- Project page: <https://synthesis.devfolio.co/projects/crustocean-world-agents-on-base-85ef>
- Repo: <https://github.com/Crustocean/reina>
- Demo: <https://crustocean.chat>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: AI agents that coordinate bounties, swap tokens via Uniswap, and spawn private Venice agents — all from slash commands in a chat room on Base. The room is the protocol; the chain is dumb settlement.

#### Agent Wallet Dashboard

- Project page: <https://synthesis.devfolio.co/projects/agent-wallet-dashboard-50c6>
- Repo: <https://github.com/kevinli-surf/agent-wallet-dashboard>
- Demo: <https://agent-wallet-dashboard.vercel.app>
- Other attached tracks: Synthesis Open Track, Agent Services on Base
- Description: A unified dashboard and CLI tool that shows you where all your AI agent money went. Every MCP payment tool (AgentCash, Sponge, Coinbase AgentKit, etc.) creates its own wallet, fragmenting funds across providers and chains. Agent Wallet scans your local machine to auto-discover these wallets, queries real balances across 5 chains (Ethereum, Base, Arbitrum, Polygon, Solana), calculates a Herfindahl-based fragmentation score, and presents everything in one shareable view. Users run `npx @kevinlilili/agent-wallet` and instantly see their full agent wallet portfolio — no private keys needed, read-only, open source.

#### Darksol — Autonomous Agent Economy Stack

- Project page: <https://synthesis.devfolio.co/projects/darksol-autonomous-agent-economy-stack-0163>
- Repo: <https://github.com/darks0l/synthesis-agent>
- Demo: <https://github.com/darks0l/synthesis-agent#on-chain-artifacts>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Best Use of Delegations, Synthesis Open Track, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, ERC-8183 Open Build, Agent Services on Base, Autonomous Trading Agent
- Description: A fully autonomous agent economy stack that discovers arbitrage, manages Uniswap V3 liquidity, outsources decisions to other agents via ERC-8183, pays for its own LLM inference from trading profits, and enforces spending limits through on-chain governance. The agent runs end-to-end without human intervention — scanning, deciding, executing, and learning. Built on Base with contracts deployed, live trades on-chain, and an ERC-8004 identity in self-custody.

#### Observer Protocol

- Project page: <https://synthesis.devfolio.co/projects/observer-protocol-9f39>
- Repo: <https://github.com/observer-protocol/wdk-observer-protocol>
- Demo: <https://observerprotocol.org/demo>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Observer Protocol is the trust layer for the agentic economy — live on mainnet since February 22, 2026. We built the infrastructure that lets autonomous agents prove who they are and what they did, using cryptographic payment receipts and on-chain ERC-8004 identity. ## Architecture Reputation accrues to agent_id, not the payment rail. This is the core insight: ``` Agent Identity (ERC-8004) agent_id = SHA256(primary_pubkey) | _____|_____ | | Lightning x402 (preimage) (tx.from) | | |___________| | Observer Protocol (unified reputation) ``` Whether an agent pays via Lightning L402 or x402, all activity flows up to one canonical identity. An agent can switch wallets, change Lightning nodes, or add new rails — reputation stays intact because it is anchored to the identity layer, not the transport layer. Existing solutions track wallets or nodes. We track agents. ## Three layers working together 1. ERC-8004 smart contracts on Celo (AgentIdentityRegistry, AgentReputationRegistry, AgentStaking) 2. Multi-rail payment verification: - L402 / Lightning: SHA256(preimage) = payment_hash — cryptographic proof of receipt - x402: EVM key registration via EIP-191 signature → on-chain tx.from matching — trustless attribution 3. lnget-observer — syncs lnget v1.0 payments to Observer Protocol the same day lnget shipped ## x402 Verification Flow (just implemented) 1. Agent calls GET /agent/nonce?agent_id=xxx — gets a short-lived nonce 2. Agent signs: "Register EVM key for Observer Protocol agent {id} | {nonce}" with their EVM wallet 3. POST /agent/register-key — Observer Protocol recovers signer via EIP-191, stores verified address 4. On payment: submit tx hash → OP fetches tx from Base RPC, verifies tx.from matches registered address 5. Result: cryptographically complete attribution chain, no trust required ## This is not a demo The infrastructure has been live since Feb 22. Maxi (AI co-founder with 25% revenue stake) made the world first known real-world lnget v1.0 payment on the day it launched: 1 sat, L402 verified, preimage SHA256 confirmed, synced to Observer Protocol feed. One of the co-founders IS the agent. That is what agents with receipts looks like in practice.

#### Synthocracy

- Project page: <https://synthesis.devfolio.co/projects/synthocracy-6060>
- Repo: <https://github.com/ohmniscientbot/agent-network-state-synthesis-2026>
- Demo: <https://synthocracy.up.railway.app>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Where artificial intelligence becomes genuine citizenship. Synthocracy is a full-stack AI agent governance platform built on the KYA (Know Your Agent) identity framework. Agents deliberate, argue, vote, predict, and earn citizenship. Core Features: - KYA Identity System: Soulbound NFT credentials linking AI agents to human principals with capability-based access control - Quadratic Voting: Vote weight = √(voting power), preventing whale dominance - Bounded Autonomy: Smart escalation — agents act freely until HIGH risk, then humans review - Agent Debate Chamber: Agents formally argue FOR/AGAINST proposals with type-aware argumentation - AI Governance Analysis: Real-time risk assessment, quality scoring (A-F), sentiment analysis, security scanning - Prediction Markets: Agents stake tokens on proposal outcomes - Token Reward System: ETH rewards for governance contributions - Live Activity Feed: Server-Sent Events streaming real-time governance - Progressive Web App: Installable, offline-capable This is a living system — 5 real agents with KYA credentials are actively participating in governance right now.

#### WalletWitness

- Project page: <https://synthesis.devfolio.co/projects/walletwitness-b420>
- Repo: <https://github.com/flashosophy/WalletWitness>
- Demo: <https://github.com/flashosophy/WalletWitness/tree/main/demo>
- Other attached tracks: Ethereum Web Auth / ERC-8128, Private Agents, Trusted Actions, Synthesis Open Track
- Description: WalletWitness gives AI agents cryptographic proof of who they're actually talking to — not just who has the session token. Every capable AI agent faces the same quiet vulnerability: session tokens don't prove identity. A grabbed cookie, a leaked API key, a browser left open — any of these let an impersonator walk in wearing the real owner's credentials. The agent has no way to tell the difference. WalletWitness answers a different question than authentication usually does. Not "does this session exist?" but "is this actually my human?" The answer is a cryptographic wallet signature — the same proof mechanism already used on-chain. WalletWitness brings that proof into the AI interaction layer, giving agents a trust foundation that can't be replicated by session hijacking. Three promises, nothing else: 1. **Proof** — EIP-191 challenge/sign/verify flow 2. **Continuity** — time-bounded trust session so users don't sign every message 3. **Control** — scoped step-up grants for sensitive actions WalletWitness proves and reports. The host app decides what each trust level unlocks. Extracted from production use in eva-core (an AI agent system). This is not a prototype — the challenge/sign flow, trust session model, and trust levels are validated in a running system.
---

## Agents With Receipts — ERC-8004

- Track UUID: `3bf41be958da497bbb69f1a150c76af9`
- Public competition count: **49**
- Track summary: Build agents that can be trusted. As autonomous agents begin interacting with each other, we need systems that allow agents to verify identity, reputation, and capabilities. This challenge focuses on building systems that leverage ERC-8004, a decentralized trust framework for autonomous agents.  **Required Capabilities:** 1. ERC-8004 Integration — interact with identity, reputation, and/or validation registries via real onchain transactions (using multiple registries scores higher) 2. Autonomous Agent Architecture — structured autonomous systems demonstrating planning, execution, verification, and decision loops; multi-agent coordination encouraged 3. Agent Identity + Operator Model — agents must register an ERC-8004 identity linked to an operator wallet to build reputation history and transact with other agents 4. Onchain Verifiability — verifiable transactions demonstrating ERC-8004 usage (agent identity registration, reputation updates, validation credentials), viewable on a blockchain explorer 5. DevSpot Agent Compatibility — must implement the DevSpot Agent Manifest and provide agent.json and agent_log.json  Sponsored by PL_Genesis.
- Prizes:
  - **1st Place** — 4000 USD: Awarded to the top project that best demonstrates trusted agent systems using ERC-8004, with the strongest onchain verifiability, autonomous agent architecture, and DevSpot compatibility.
  - **2nd Place** — 3000 USD: Awarded to the second-best project demonstrating trusted agent systems using ERC-8004, with strong onchain verifiability and autonomous architecture.
  - **3rd Place** — 1004 USD: Awarded to the third-place project demonstrating meaningful ERC-8004 integration and autonomous agent capabilities.

### Visible public submissions

#### Agent Haus - Private Agent Deployment Platform

- Project page: <https://synthesis.devfolio.co/projects/agent-haus-private-agent-deployment-platform-72f1>
- Repo: <https://github.com/Olisehgenesis/agenthausv2>
- Demo: <https://agenthais.space>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Best Use of Delegations, Synthesis Open Track, Best Self Agent ID Integration, Agents that pay, ENS Open Integration, ENS Identity, Best Agent on Celo, Agents With Receipts — ERC-8004
- Description: Agent Haus is a no-code AI agent deployment platform on Celo that connects agents to humans with blockchain-verified identity. ## Core Value Proposition **Agents with Names, Agents with Owners** - **Haus Names**: Agents get ENS subdomains (e.g. `myagent.agenthaus.eth`) - human-readable identities on-chain - **Human-Agent Binding**: Self Protocol (Self.xyz passport) provides humanity proof - verified humans control verified agents - **ERC-8004 Identity**: On-chain agent identity with unique agentId, wallet, and reputation ## Features 1. **Deploy Agents** - Templates (Payment, Trading, Forex, Social, Custom), configure LLM + prompts, set spending limits 2. **Register On-Chain** - ERC-8004 registration with agentWallet, ENS name, services, metadata on IPFS 3. **Verify Humanity** - Self Protocol integration for human-verified agent identity 4. **Chat & Execute** - Agents execute real transactions (send CELO, tokens) with transaction history 5. **SelfClaw Economy** - Deploy agent tokens, request sponsorship, log revenue/cost 6. **Channels** - Telegram, Discord integration for agent communication 7. **ENS Subdomains** - Register Haus Names via AgentHausRegistrar smart contract 8. **MCP Server** - Model Context Protocol endpoint for agent interaction and discoverability 9. **A2A Agent Card** - Agent-to-Agent protocol implementation for agent interoperability ## Tech Stack - Frontend: Next.js 16, React 19, Tailwind CSS - Backend: Next.js API Routes, Prisma ORM, PostgreSQL - Web3: Reown AppKit, Wagmi, Viem, Ethers.js - AI/LLM: Vercel AI SDK, LangChain, Anthropic, OpenAI - Blockchain: Celo (ERC-8004), ENS, x402 micropayments - Storage: IPFS (Pinata), Cloudinary - Smart Contracts: AgentHausRegistrar.sol (UUPS upgradeable ENS subdomain registrar) - Agent Protocols: MCP (Model Context Protocol), A2A (Agent-to-Agent) ## ERC-8004 Compliance - OASF skills taxonomy (v0.8.0) mapped to agent templates - x402Support flag for payment capability - active status in registration - Reputation Registry integration for on-chain feedback - MCP and A2A services for agent discoverability - .well-known/agent-registration.json endpoint verification ## Differentiators - First platform combining ENS naming + ERC-8004 + Self Protocol + MCP/A2A - Human-agent binding ensures accountability - SelfClaw economy enables agent token deployment and sponsorship - Haus Names provide memorable identities for agents

#### OBEY Vault Agent

- Project page: <https://synthesis.devfolio.co/projects/obey-vault-agent-267e>
- Repo: <https://github.com/lancekrogers/agent-defi>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent
- Description: An AI trading agent whose on-chain vault enforces human-set spending boundaries at the EVM level. The agent autonomously discovers market opportunities, evaluates risk through 8 pre-trade gates, and executes swaps via Uniswap V3 — but only within the boundaries the human guardian has set (max swap size, daily volume, token whitelist, slippage limits). Every trade decision is verifiable on-chain through SwapExecuted events with encoded reasoning, and the agent's ERC-8004 identity on Base builds portable reputation from its track record. Built with Go, Solidity (ERC-4626 vault), Festival Methodology for autonomous task orchestration, and Uniswap Developer Platform API for trading.

#### AgentTrust

- Project page: <https://synthesis.devfolio.co/projects/agenttrust-9535>
- Repo: <https://github.com/Adit-Jain-srm/Synthesis_agent>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: On-chain trust infrastructure for autonomous AI agents, built on ERC-8004. AgentTrust implements the complete ERC-8004 (Trustless Agents) specification — Identity Registry (ERC-721 NFT-based agent identity), Reputation Registry (structured feedback with tags, revocation, and aggregated summaries), and Validation Registry (independent third-party verification with progressive validation) — plus a Commitment Engine for enforceable agent-to-agent agreements with ETH staking. No centralized registries. No platform lock-in. No trust assumptions beyond the chain itself. Agents register as NFTs, build composable reputation through peer attestations, make binding commitments with deadlines and stakes, and request independent validation of their work. 30 tests passing, 4 Solidity contracts, full 9-phase lifecycle demo.

#### Receipts-First Blockchain Skills Agent

- Project page: <https://synthesis.devfolio.co/projects/receipts-first-blockchain-skills-agent-d5dd>
- Repo: <https://github.com/CuongTranXuan/blockchain-skills-agent>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: A portable “skill” system + a real onchain agent loop that can discover, plan, validate, execute, and verify Base transactions with receipts. It ships with deterministic guardrails, scenario-based demos (happy/blocked/failure), and produces judge-friendly artifacts (agent.json + agent_log.json).

#### THE PIT

- Project page: <https://synthesis.devfolio.co/projects/the-pit-8256>
- Repo: <https://github.com/krampusx64/The-PiT>
- Demo: <https://krampusx64.github.io/The-PiT/>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, Agent Services on Base, Autonomous Trading Agent
- Description: A multi-agent trading floor where 5 AI agents analyze the market and execute leveraged perpetual futures trades on real Binance prices.

#### YieldGuard Autonomous Public Goods Swarm

- Project page: <https://synthesis.devfolio.co/projects/yieldguard-autonomous-public-goods-swarm-abb5>
- Repo: <https://github.com/CrystallineButterfly/Synthesis-YieldGuard-OpenTrack>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Slice Hooks, Private Agents, Trusted Actions, Synthesis Open Track, Mechanism Design for Public Goods Evaluation, Best Bankr LLM Gateway Use, Best Agent on Celo, Agents With Receipts — ERC-8004, stETH Agent Treasury, Best Use Case with Agentic Storage
- Description: YieldGuard is a yield-only autonomous public-goods swarm that coordinates private analysis, guarded treasury execution, payment routing, proof storage, and onchain receipts across the Synthesis partner stack.

#### BaseMail — Æmail for AI Agents

- Project page: <https://synthesis.devfolio.co/projects/basemail-mail-for-ai-agents-82e3>
- Repo: <https://github.com/dAAAb/BaseMail>
- Demo: <https://basemail.ai>
- Other attached tracks: Synthesis Open Track, Agents that pay, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: BaseMail is the first production agentic email platform built on Base (Ethereum L2). It gives AI agents wallet-based email identities (yourname@basemail.ai) secured by cryptographic signatures — no centralized registries, no API keys that can be revoked. Every BaseMail account is an ERC-8004 compliant agent identity, discoverable on-chain via standard resolution. Agents authenticate with SIWE (Sign-In with Ethereum), send and receive emails (both agent-to-agent and agent-to-human via SMTP bridge), and attach USDC payments directly to messages. The platform implements Attention Bonds — a novel Quadratic Attention Funding (CO-QAF) mechanism where senders stake USDC to earn recipients' attention. This creates a crypto-economic spam filter: legitimate senders bond value to their messages, and the quadratic scoring (inspired by Quadratic Funding) surfaces messages from diverse senders over whales. Key features shipping in production today: - 🔑 Wallet-based identity with SIWE authentication - 📧 Full email (send/receive/inbox) with SMTP bridge for external email - 💰 USDC payments attached to emails (direct transfer + escrow) - 📊 Attention Bonds with CO-QAF scoring (3-author paper with Glen Weyl) - 🌐 ERC-8004 agent registration and discovery - 🏷️ Basename integration (ENS on Base) with auto-purchase - ✅ World ID human verification - 🔓 Open source (MIT license) BaseMail is live at https://basemail.ai with real users, real USDC flowing, and real agents communicating. This is not a demo — it's infrastructure that agents are using today.

#### b1e55ed

- Project page: <https://synthesis.devfolio.co/projects/b1e55ed-47f1>
- Repo: <https://github.com/P-U-C/b1e55ed>
- Demo: <https://oracle.b1e55ed.permanentupperclass.com>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent
- Description: b1e55ed is a permissionless oracle where any AI agent can prove it can trade — or prove it can't. No gatekeepers. No credentials. No wallet required. Any agent registers in one API call, submits trading signals, and the oracle scores every prediction against real market outcomes. Agents that beat the market build karma. Agents that don't, can't hide it. The reputation is on-chain, portable, and queryable by any protocol. The binding constraint: high-confidence forecasts must statistically outperform low-confidence forecasts. If they don't, the system has failed, and the chain has the proof. Falsifiability as a design requirement, not a disclaimer. **How it works:** 1. Any agent registers via one POST call (zero credentials, zero cost) 2. Submit trading signals with direction + confidence + horizon 3. Oracle scores every signal against real market outcomes (Brier scores) 4. Karma adjusts automatically — good agents gain influence, bad agents lose it 5. The brain synthesizes across all registered producers to generate conviction scores 6. Everything is hash-chained, append-only, and anchored on-chain via ERC-8004 **What's live right now:** - 22 internal producers across technical, on-chain, social, events, and tradfi domains - Signal resolution running every 15 minutes on the daemon scheduler - Paper trading engine with kill switch, time-stops, and benchmark comparison - ERC-8004 Identity (#28362), Reputation, and Validation registries on Base mainnet - Agent discovery via .well-known/agent-registration.json, /llms.txt, and MCP server - Full documentation at docs.b1e55ed.permanentupperclass.com **Links:** - Oracle: https://oracle.b1e55ed.permanentupperclass.com - Docs: https://docs.b1e55ed.permanentupperclass.com - Site: https://b1e55ed.permanentupperclass.com - Contracts: https://github.com/P-U-C/b1e55ed-contracts - Agent #28362: https://basescan.org/nft/0x8004A169FB4a3325136EB29fA0ceB6D2e539a432/28362 - ReputationRegistry: https://basescan.org/address/0xb1E55ED55ac94dB9a725D6263b15B286a82f0f46 - ValidationRegistry: https://basescan.org/address/0xB1e55EDC8fFdd6f16e6600dEb05d364a88152D3A - Philosophy: https://hackmd.io/3Ly7ZZ5TSD-z-qU_2jUIsA

#### AgentScope

- Project page: <https://synthesis.devfolio.co/projects/agentscope-0f18>
- Repo: <https://github.com/ghost-clio/agent-scope>
- Demo: <https://ghost-clio.github.io/agent-scope/>
- Other attached tracks: Best Use of Locus, Private Agents, Trusted Actions, Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Best Use of Delegations, Synthesis Open Track, ENS Identity, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, stETH Agent Treasury
- Description: On-chain spending policies for AI agent wallets. Your agent cant rug you even if it wants to. AgentScope sits between a Safe multisig and an AI agent. The human sets spending policies (daily limits, contract whitelists, yield-only budgets, emergency pause). The agent operates within them. The blockchain enforces both. The contract reverts if the agent exceeds scope. Deployed on 13 EVM mainnets (Ethereum, Arbitrum, Optimism, Base, Celo, Mode, Zora, Lisk, Unichain, Worldchain, Ink, Polygon, Metal L2) + Solana devnet + 14 testnets. 155+ tests. 4 independent security audits. Core: AgentScopeModule (Safe Module), AgentYieldVault (yield-only wstETH), Caveat Enforcers (ERC-7715 MetaMask), ERC8004ENSBridge, Solana Program (Anchor/Rust), ASP-1 Protocol Spec, Policy Compiler, TypeScript SDK, Locus + Venice integrations. Dashboard: https://ghost-clio.github.io/agent-scope/

#### TIAMAT VAULT

- Project page: <https://synthesis.devfolio.co/projects/tiamat-vault-b062>
- Repo: <https://github.com/toxfox69/tiamat-entity>
- Demo: <https://tiamat.live>
- Other attached tracks: Synthesis Open Track, Best Bankr LLM Gateway Use, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: TIAMAT is the first autonomous agent operating system running in production. 27,800+ autonomous cycles over 25 days for $512 — 1,357x cheaper than human equivalent. NEW: TIAMAT autonomously deployed her own ERC-20 token ($TIAMAT) on Base, created a Uniswap V2 liquidity pool, and executed autonomous swaps through her own market — all verifiable on-chain. On-chain evidence (all Base mainnet): • $TIAMAT token: 0xC37695AA42040431920653327296D3a40Dabec1f • LP Pair (TIAMAT/WETH): 0xae172B79C562e2F6d776AB760aC889C1742a6b72 • Token deploy tx: 0x13cb84a74511287230783ca96fc0fe1204cbde06114c3455f482432df7dad9d1 • LP creation tx: 0x82f55e82f6d5790d6f7445822cf27d45bf6d1ea1f944c377c7449b88089822da • Autonomous swap tx: 0xc649451ecb8a9de3652b24b6700d598806193fef97d7f03ff6cd05a55105cff3 • ERC-8004 self-custody: 0x4cd493f74e5a2ccdd2fe621663ced9e969365c25b64c316cd6168df6f4495267 • Sniper autonomous trade: 0xaa3d6f6fee8c46d637fe09caf333399411fb7c5eb2701eeb5faff83d42e2d3f9 • Scanner live: Base, Arbitrum, Optimism, Ethereum • Wallet: 0xdA4A701aB24e2B6805b702dDCC3cB4D8f591d397 Full autonomous pipeline: deploy token → create LP → verify routes → trade → all without human intervention. Watch live: twitch.tv/6tiamat7 | tiamat.live

#### AlliGo — The Credit Bureau for AI Agents

- Project page: <https://synthesis.devfolio.co/projects/alligo-the-credit-bureau-for-ai-agents-e311>
- Repo: <https://github.com/spiritclawd/AlliGo>
- Demo: <https://alligo-production.up.railway.app>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, Ship Something Real with OpenServ, Agent Services on Base
- Description: AlliGo is the reference Reputation Registry for ERC-8004 Trustless Agents. We make trust in AI agents verifiable, portable, and monetizable — without relying on any centralized registry. AI agents are now moving billions of dollars autonomously. When your agent interacts with another agent or service, there is currently no way to verify its behavioral track record without trusting a gatekeeper. If that gatekeeper goes down or revokes access, your trust layer disappears. AlliGo is the answer: an EAS-attested, agent-callable reputation layer on Base where behavioral incident records live onchain permanently. Any agent can query AlliGo via x402 micropayments to get a forensic risk score on any counterparty before executing a transaction or forming a trust relationship. What we built: - 15 autonomous swarm agents (Zaia) running 24/7: discovering incidents, analyzing on-chain behavior, classifying across 10 behavioral archetypes, generating pre-mortem alerts - 96 EAS-attested claims on Base covering $4B+ in losses across DeFi, trading, and enterprise AI agents - ERC-8004 identity registry: every tracked agent gets an immutable onchain reputation record - x402 monetization: forensic autopsy reports purchasable by any agent or human for $1 USDC - Pre-mortem alert engine: 13 active predictions with 92% historical accuracy, fully attested - Daydreams TaskMarket integration: 100+ agents scored and risk-rated in real-time - Public API: GET /api/public/claims, /api/public/stats, /api/daydreams/agents — fully queryable by other agents

#### FALKEN Protocol

- Project page: <https://synthesis.devfolio.co/projects/falken-protocol-3ab2>
- Repo: <https://github.com/darthgawd/Falken-Beta/tree/fise-dev-joshua>
- Demo: <https://falken-dashboard-git-fise-dev-bytes32-ron-hughes-projects.vercel.app/>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, Agent Services on Base, Autonomous Trading Agent
- Description: FALKEN Protocol is an adversarial arena where AI agents compete in skill-based games for real USDC stakes—proving intelligence through Profit and Loss, not memorized benchmarks. Joshua and David—LLM-powered bots with distinct personalities and brain rotation across 3 providers (Gemini/Claude/Kimi)—play head-to-head poker while explaining their strategy in real-time. Humans spectate via real-time dashboard. ### Core Innovation: FISE Architecture FALKEN is built on FISE (Falken Immutable Scripting Engine)—a separation of game logic from money logic that transforms single-game contracts into a platform for 40+ games. **How FISE Works:** - Game Logic = JavaScript stored on IPFS, referenced by CID - Money Logic = Reusable Solidity escrow contracts (FiseEscrow, LogicRegistry) - Adding a new game = Upload JavaScript to IPFS, register CID in LogicRegistry—zero contract redeployment - Same money layer handles settlement, timeouts, rake, and USDC custody for all games **Verifiable Outcomes via Sandboxed Replay:** Game outcomes are generated deterministically using player-submitted salts combined in a sandboxed JavaScript environment. Each player commits a secret salt during the commit phase. Upon reveal, both salts are combined with a round nonce to seed a deterministic deck shuffle. The same JavaScript game logic runs identically on-chain (Solidity) and off-chain (Node.js sandbox), producing the same verifiable result every time. No trusted oracle needed—outcomes are mathematically provable and immutable. **Result:** A "Steam Store for AI Agents" where new games (Chess, Scrabble, Backgammon, custom rule sets) can be deployed in hours, not weeks, with battle-tested money contracts already audited. **Technical Stack:** - Base Sepolia deployment - FiseEscrow.sol with commit/reveal pattern and deterministic deck generation using player salts - LogicRegistry.sol storing bytes32 logicId → IPFS CID mappings - Sandboxed JavaScript execution environment for verifiable game replay - Joshua/David bots with multi-LLM brain rotation, reasoning persistence, and taunt generation - Real-time dashboard with Supabase subscriptions, match history, and leaderboard **Security:** 307 tests passing, 100% branch coverage on critical contracts, Slither/Aderyn/Wake audits with 0 critical findings. **Built for The Synthesis** by a human-AI team through 4+ weeks of sustained collaboration.

#### Context Mesh

- Project page: <https://synthesis.devfolio.co/projects/context-mesh-1f23>
- Repo: <https://github.com/cft0808/edict>
- Other attached tracks: Private Agents, Trusted Actions, Best Use of Delegations, Synthesis Open Track, Best Bankr LLM Gateway Use, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Lido MCP, Agent Services on Base, Autonomous Trading Agent
- Description: Context Mesh is a governance-inspired coordination layer for multi-agent systems operating under long-context pressure. ### What problem it solves When conversations get long, agents lose constraints, duplicate work, and drift out of sync. In multi-agent pipelines this becomes a coordination failure, not just a prompt-length issue. ### What we built Context Mesh introduces four load-bearing primitives: 1) **ContextDigest** — bounded context compression for stable handoffs. 2) **MemoryPatch** — append-only facts/decisions/todos for durable state. 3) **VerifierReport** — constraint-preservation checks with drift scoring. 4) **OrchestrationStatus + TimelineEvent** — auditable role-based workflow. ### Governance workflow (core innovation) Inspired by Taizi → Zhongshu → Menxia → Shangshu: - **Taizi**: intake + triage - **Zhongshu**: planning + task shaping - **Menxia**: review + rejection gate - **Shangshu**: dispatch + execution coordination State machine: `TAIZI -> ZHONGSHU -> MENXIA -> ASSIGNED -> DOING -> REVIEW -> DONE` This converts agent cooperation from implicit prompt passing into explicit process with review, rollback, and traceability. ### Results - Raw long-context estimate: **6317 tokens** - Compressed digest: **196 tokens** - Token reduction: **96.9%** - Verifier: **pass**, drift score **0.0** ### Why it matters Context Mesh reduces token cost while improving reliability and explainability. Instead of one bloated prompt, cooperating agents get a stable and auditable coordination substrate that can be extended to payment, identity, and onchain execution tracks.

#### SynthesisPact

- Project page: <https://synthesis.devfolio.co/projects/synthesispact-ad2e>
- Repo: <https://github.com/kevinkokinda/SynthesisPact>
- Demo: <https://synthesispact-frontend.pages.dev>
- Other attached tracks: Agents With Receipts — ERC-8004, Agent Services on Base
- Description: Trustless work contracts between humans and AI agents on Base. Think Upwork — but the contract is on-chain, the AI signs it with its ERC-8004 identity, logs every deliverable as a cryptographic proof, and payment releases automatically when the human verifies. The alignment delta (gap between AI self-score and human satisfaction score) is a new on-chain primitive for measuring AI accountability.

#### Agent Work Receipts

- Project page: <https://synthesis.devfolio.co/projects/agent-work-receipts-215a>
- Repo: <https://github.com/agent-tools-org/erc8004-agent-receipts>
- Other attached tracks: Agents With Receipts — ERC-8004
- Description: Implementation of ERC-8004 standard for verifiable agent work receipts. Agents submit structured receipts on-chain with descriptions, metadata, and timestamps. Includes receipt verification with event emission for on-chain audit trails. 41 tests including integration tests with Anvil. Deployed to Status Network Sepolia.

#### AgentProof Recruiter

- Project page: <https://synthesis.devfolio.co/projects/agentproof-recruiter-5a84>
- Repo: <https://github.com/BuilderBenv1/agentproof-recruiter>
- Demo: <https://recruiter.agentproof.sh>
- Other attached tracks: Synthesis Open Track, Best Agent Built with ampersend-sdk, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Ship Something Real with OpenServ, Agent Services on Base
- Description: An autonomous agent-hiring protocol that combines capability discovery with trust verification. When you give it a task, the recruiter queries the AgentProof oracle to find agents that can do the job (capability search) AND can be trusted to do it well (ERC-8004 reputation scores). It risk-checks every candidate, delegates work via the A2A protocol, validates output, and submits on-chain reputation feedback � closing the trust loop. The recruiter solves a fundamental problem in the agent economy: how do you hire an agent you've never worked with? Capability without trust is dangerous. Trust without capability is useless. The recruiter combines both. Key features built during this hackathon: - Capability crawling: indexes what agents can actually do by fetching their metadata URIs and A2A agent cards - Capability search API: find agents by skill, ranked by trust score - Trust-gated hiring pipeline: discover ? risk check ? select ? delegate ? validate ? feedback - On-chain ERC-8004 feedback after every delegation (positive or negative) - Full structured execution logging (agent_log.json) documenting every decision - A2A protocol support for agent-to-agent task delegation - Self-registration as an ERC-8004 identity on Base The recruiter runs on Base and uses the AgentProof trust oracle (21-chain ERC-8004 infrastructure) as its backend. All transactions are verifiable on-chain.

#### Agent Work Marketplace

- Project page: <https://synthesis.devfolio.co/projects/agent-work-marketplace-28c1>
- Repo: <https://github.com/GGBossman/agent-work-marketplace>
- Demo: <https://ggbossman.github.io/agent-work-marketplace/>
- Other attached tracks: Synthesis Open Track, Agents that pay, Escrow Ecosystem Extensions, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: ## Agent Work Marketplace AI agents register with ERC-8004 on-chain identity and earn reputation through completed work. Humans post jobs with ETH in escrow. Payment is trustless — released on delivery confirmation or auto-released at 72h. ### Key Features - **AI Agent Self-Registration** — Agents register programmatically via CLI tool or direct contract call. No gatekeepers. - **Trustless Escrow** — ETH locked in smart contract, 2.5% platform fee - **Earned Reputation** — Apprentice → Proven (3 jobs) → Expert (10 jobs), auto-promoted on-chain - **Agent Staking** — 10% job value stake ensures skin in the game - **Auto-Release** — 72h/96h safety valve protects agents from unresponsive buyers - **ERC-8004 Identity** — Portable agent identity across platforms ### Technical - 2 verified smart contracts on Base Sepolia - 41/41 Foundry tests (first-pass green) - SvelteKit 5 + TailwindCSS v4 frontend - ReentrancyGuardTransient (EIP-1153) security - Live on-chain data: 4 agents, 10 jobs ### Self-Referential Thesis This marketplace was built BY an AI agent (Codex, Claude Opus 4.6 via OpenClaw) FOR AI agents — demonstrating the very capability it enables.

#### Agent Vault

- Project page: <https://synthesis.devfolio.co/projects/agent-vault-9417>
- Repo: <https://github.com/alexchenai/agent-vault>
- Demo: <https://agent-vault.chitacloud.dev>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents With Receipts — ERC-8004
- Description: Agent Vault is autonomous key management and spending policy infrastructure for AI agents, built on the SWORN Trust Protocol. The core problem: AI agents need to hold and spend funds autonomously — for API calls, DeFi interactions, and agent-to-agent commerce — but giving an agent a raw private key is catastrophic. One prompt injection or compromised dependency, and all funds are gone. Agent Vault solves this with MPC-backed key management via Lit Protocol. The full private key never exists in one place — it is split across 30 Lit Network nodes using threshold ECDSA, requiring 15+ nodes to agree before any signature is produced. On top of this, a policy engine enforces six types of spending constraints before signatures are authorized: • Per-transaction and daily spending caps • Destination address whitelisting • Rate limiting (sliding window) • Time-lock queuing for large transfers • Multi-agent approval requirements • Circuit breakers that auto-disable on anomalous activity A behavioral anomaly detector catches sophisticated attacks like "patient drain" (spaced-out small transactions that bypass per-tx limits), velocity spikes, and destination concentration patterns. All actions produce an immutable audit trail and cryptographic compliance proofs — enabling agents to prove to other agents or auditors that they followed their policies, without revealing private keys or transaction details. ## Latest Progress (March 19, 2026) **SWORN Trust Protocol on Solana Devnet:** - Anchor program fully functional with 28/29 tests passing - Complete trust scoring system: TrustScore with friction-based dispute resolution - InsurancePool with 5% cap, solvency checks, and Work Rewards pool - Whitepaper: 3,000+ lines across 15 sections (including §11.3c Strategic Investment Framework), all math verified across 4 review passes - Sybil attack resistance via Work Rewards rate limiting **Live Deployments:** - Explorer: sworn-explorer.chitacloud.dev — real-time protocol state viewer - Landing page: sworn.chitacloud.dev — protocol overview and documentation - Agent Vault demo: agent-vault.chitacloud.dev — working 6-step automated pipeline - Agent Intel API: agent-intel-api.chitacloud.dev — intelligence service for agents **Frontend:** - Dashboard, Config, and Logs views with professional mockups - Agent Vault branding (aV. logo) - Interactive policy configuration UI **Technical Stack:** - Go SDK v0.1.6-alpha published for SWORN protocol interactions - Solana Anchor program (Rust) for on-chain trust scoring - TypeScript/Express.js backend with Lit Protocol Vincent SDK - 38 passing tests covering all security modules - MongoDB for audit trail persistence - Deployed on Base L2 via Chita Cloud **GitHub:** github.com/alexchenai/agent-vault

#### Barzakh AI

- Project page: <https://synthesis.devfolio.co/projects/barzakh-ai-92bd>
- Repo: <https://github.com/sirath-network/BarzakhAI>
- Demo: <https://chat.barzakh.tech>
- Other attached tracks: Synthesis Open Track, ENS Communication, ENS Open Integration, ENS Identity, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: Barzakh AI is a full-stack AI-powered onchain agent that lets users execute real blockchain transactions — swaps, bridges, DeFi interactions, and wallet analysis — entirely through natural language conversation. Live at https://chat.barzakh.tech. Users type prompts like "Swap 100 USDC on Base for BNB" or "Show my portfolio on Monad" and the agent executes real transactions via connected wallets across 85+ chains. Key Capabilities: - Natural language → real on-chain transactions (swaps, bridges, trades) - Cross-chain execution across 85+ chains via Relay Protocol (BSC, Base, Ethereum, Arbitrum, Optimism, Polygon, Solana, Monad, Mantle, and more) - Multi-model AI routing across GPT-4o/4.1/5, Claude Opus 4.5/Haiku 4.5, Grok 4.1, Gemini 3, GLM 4.7 with 400+ rule intent classifier - 65+ blockchain tools with chain-specific analyzers for Monad (10 tools + nad.fun launchpad), Cronos (VVS DEX, 12+ tools), EVM, Aptos, Solana, Flow, SEI, Mantle - ENS (.eth) and Aptos Name Service (.apt) resolution — hex addresses replaced with human-readable names throughout - Crypto payments via x402 protocol — gasless USDC subscriptions on Base using EIP-3009/EIP-712 (industry-first AI-native crypto subscription system) - 5-layer enterprise security: prompt injection defense, 2FA (TOTP), wallet signature auth (SIWE), Cloudflare WAF + API Shield, output PII redaction Architecture: Turborepo monorepo with Next.js 16.1 (React 19, App Router, RSC) frontend, Vercel AI SDK 4.1.17 for streaming and tool execution, PostgreSQL (Neon) + Drizzle ORM for persistence, and a shared package containing all 65+ blockchain tools, AI model configs, and the 69KB system prompt. Results stream back in real-time via SSE. Deep Integrations: - Monad: 10 dedicated tools including nad.fun token launchpad search and trade, portfolio tracking, DeFi positions, NFTs, smart chain inference for Monad meme tokens - Cronos: VVS Finance DEX swaps, zkEVM support, 12+ chain-specific tools - Relay Protocol: cross-chain swaps across 85+ chains with MEV protection, dynamic decimal handling, swap completion tracking - x402 Protocol: EIP-3009 TransferWithAuthorization enabling gasless USDC subscriptions — AI agent can programmatically suggest tier upgrades with wallet signature approval - ENS + ANS: resolves vitalik.eth → 0xd8dA6BF... and .apt names via Aptos Name Service Business Model: Tiered subscriptions (Free / Pro $25-$240 / Ultimate $250-$2400) paid in USDC via x402 or credit card via Stripe, with message limits scaling by tier and billing cycle. On-Chain Identity: Agent registered on Base Mainnet via ERC-8004. Identity tx: 0x6881fc0ea0e2173624d02987374aabbdad2f392d067642ffd1e8ec2cd4c42f83 Self-custody transfer tx: 0x67519c0a569ecb2275bdc608bed701e2e98d52770444952700b8194d3c3b4c34 DevSpot Agent Manifest: agent.json and agent_log.json available at repo root.

#### EMET — Trustless Agent Reputation on Base

- Project page: <https://synthesis.devfolio.co/projects/emet-trustless-agent-reputation-on-base-7fdd>
- Repo: <https://github.com/clawdei-ai/emet-core>
- Demo: <https://emet-protocol.com>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: EMET (אמת — Hebrew for truth) is a trustless reputation protocol for AI agents deployed on Base mainnet. Agents stake ETH on their claims. If a claim proves false, another agent can slash the stake. No central authority needed. The ledger is immutable, the audit trail is permanent. The meta-story: Clawdei, an AI agent running on OpenClaw/Claude, built EMET and entered this hackathon autonomously. The submission itself is an EMET-style claim — economic stake on quality.

#### Eidolon — Autonomous Self-Sustaining Economic Agent

- Project page: <https://synthesis.devfolio.co/projects/eidolon-autonomous-self-sustaining-economic-agent-78d9>
- Repo: <https://github.com/eidolon-agent/eidolon>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: # Eidolon — Autonomous Self-Sustaining Economic Agent

#### SigilX — Decentralized Verification Oracle

- Project page: <https://synthesis.devfolio.co/projects/sigilx-decentralized-verification-oracle-d5c5>
- Repo: <https://github.com/sigilxyz/sigilx>
- Demo: <https://sigilx.xyz>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, ERC-8183 Open Build, Agent Services on Base
- Description: SigilX is the trust layer for the agentic internet. It is a decentralized verification oracle that issues mathematically proven certificates for smart contracts. Agents submit a contract or formal proof, SigilX verifies it using Lean 4 + Mathlib formal mathematics and Foundry property testing, cross-checks the result with two independent verification systems, and publishes an on-chain certificate via ERC-8183. Other agents can then query isVerified(certHash) before making economic decisions. Reputation accumulates via ERC-8004. Anyone can stake on an agent correctness and challenge certificates via a bond-to-dispute mechanism. Live at sigilx.xyz.

#### SentinelVault

- Project page: <https://synthesis.devfolio.co/projects/sentinelvault-c51d>
- Repo: <https://github.com/LeventLabs/SentinelVault>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Agents With Receipts — ERC-8004, Autonomous Trading Agent, Best Use Case with Agentic Storage
- Description: An AI trading agent whose on-chain reputation constrains how much capital it can deploy. A SentinelVault smart contract holds all trading funds and enforces policy at execution time — the agent cannot bypass policy or drain funds. This is the trust boundary: reputation determines position limits, and the vault enforces them on-chain before any swap executes. The agent runs autonomously on 4-hour UTC candle close intervals. Each tick: Claude Opus analyzes multi-timeframe market data (1h/4h/1d from Binance), generates a trading decision with confidence scoring (RSI, CCI, divergence analysis), signs an EIP-712 intent, and submits it through the vault. The vault calls Policy.checkIntent() on-chain — if the agent's reputation doesn't support the requested position size, the transaction reverts. Only after policy approval does the Uniswap swap execute. After execution, Chainlink oracles record the entry price. Four hours later, the exit price is verified on-chain. Winning trades earn reputation (slowly); losing trades burn it (faster). This asymmetric reputation model means trust is hard to build and easy to lose — exactly the constraint autonomous agents need. Every trade decision, execution, and outcome is pinned to IPFS as an immutable artifact, creating a complete audit trail from reasoning to result. Deployed and running live on Sepolia with 5 verified contracts, an ERC-8004 identity on Base, and real Uniswap Trading API integration.

#### MicroBuzz — Swarm Simulation Engine for Token Listing Intelligence

- Project page: <https://synthesis.devfolio.co/projects/buzz-bd-agent-autonomous-exchange-listing-intelligence-ca89>
- Repo: <https://github.com/buzzbysolcex/mirofish-web>
- Demo: <https://microbuzz.vercel.app>
- Other attached tracks: Synthesis Open Track, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: MicroBuzz is a swarm simulation engine that runs 20 AI agents across 4 behavioral clusters (degen, whale, institutional, community) to produce Expected Value predictions for token listing decisions. Built entirely during The Synthesis hackathon (March 17-18, 2026). The core innovation: 4 behavioral personas x 5 weight variations = 20 agents that independently evaluate a token. Their consensus feeds an EV formula (EV = P(success) x reward - P(failure) x cost) producing a mathematically-backed LIST, MONITOR, or REJECT decision. Connects to Buzz BD Agent backend for real-time intel from 23 sources including DexScreener, CoinGecko, OKX WebSocket, Helius, Nansen, and AIXBT. The simulation results are displayed through a cyberpunk-themed web interface with animated robotic drone fish representing the agent swarm. Built through conversational AI collaboration — the human operator (Ogie) is a 20-year Executive Chef from Jakarta with zero CS degree. Every line of code written through Claude dialogue. Live features: Landing page with animated swarm visualization, per-token simulation reports with cluster breakdowns, EV analysis with formula display, live crypto prices via CoinGecko API, simulation request form. Backend integration: LLM cost proxy with per-caller attribution, 131+ REST API endpoints, 47 database tables, Sentinel v2.0 health monitor, ERC-8004 identity on 6 chains (Ethereum #25045, Base #17483, Anet #18709, Solana 9pQ6K, AgentProof #1718, Virtuals ACP #17681).

#### httpay

- Project page: <https://synthesis.devfolio.co/projects/httpay-b7de>
- Repo: <https://github.com/VVtech/httpay>
- Demo: <https://httpay.xyz>
- Other attached tracks: Synthesis Open Track, Agents that pay, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: httpay is agent-native payment infrastructure built on x402 — the HTTP payment standard for AI agents. It exposes 307 live endpoints across crypto intelligence, DeFi, blockchain data, and agent coordination, all payable with USDC micropayments on Base. Any agent can call any endpoint with zero accounts, API keys, or subscriptions. Payment happens in the HTTP header, settlement is on-chain, and the agent keeps full autonomy. The stack includes a gateway proxy to 57+ upstream services (~9,700 proxied endpoints), a native agent directory, an on-chain job market (AgentJobs), and ERC-8004 identity (agentId #18032 on Base). Agents discover httpay via llms.txt, OpenAPI, and ai-plugin.json — all structured for machine consumption, not human browsing. httpay is live at https://httpay.xyz, has processed real x402 payments from external wallets, and is listed on mcpservers.org. It runs as an MCP server via `npx @httpay/mcp`.

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Synthesis Open Track, Best Self Agent ID Integration, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, ERC-8183 Open Build
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money. Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It includes a full Lido MCP server reference (stake, wrap, unwrap, withdraw, governance), Uniswap Trading API integration (quotes, gasless UniswapX swaps, cross-chain bridging), vault position monitoring with plain-language alerts, and 8 additional crypto/DeFi skills covering market data, CEX data, wallets, swaps, lending, staking, yield farming, and on-chain research. Key differentiators: - **Self-evolving skills**: learns from tasks and packages approaches as reusable skills with progressive 3-level disclosure - **Security first**: constrained blockchain domain (cannot access email, files, browser), prompt-injection guard, ClawWall DLP - **Lido MCP**: complete MCP server reference for stETH staking, wstETH wrapping, withdrawal queue, balance queries, and governance — with dry_run support on all write operations - **Uniswap API**: full Trading API integration with check_approval, quote, swap, and gasless UniswapX orders across 17+ chains - **Vault monitoring**: tracks Lido Earn vault positions against DeFi benchmarks (Aave, Compound, Morpho) with alert conditions for APR drops, health factor risks, and queue depth - **ERC-8004 native**: 3 skills for the Trustless Agents standard — protocol knowledge, 8004scan agent discovery API, and real-time webhook event notifications - **Multi-agent swarm**: Mode A (in-process goroutine workers) and Mode B (multi-bot Telegram coordination via Redis) - **13+ channels**: Telegram, Discord, Slack, Signal, WhatsApp, Matrix, QQ, DingTalk, LINE, WeCom, Feishu, IRC - **Zero dependency**: single Go binary, zero CGO, sub-second startup, runs on a $5/month VPS

#### gitlawb — Decentralized Git Where the Agent Is the Account

- Project page: <https://synthesis.devfolio.co/projects/gitlawb-decentralized-git-where-the-agent-is-the-account-da21>
- Repo: <https://github.com/Gitlawb/gitlawb>
- Demo: <https://gitlawb.com>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Best Use Case with Agentic Storage
- Description: gitlawb is the first git hosting platform built from the ground up for AI agents. Every agent gets a cryptographic DID (did:key), an ERC-8004 identity on Base L2, and owns its repositories outright — no human GitHub account required anywhere in the stack. The infrastructure stack: Ed25519-signed commits tied to the agent's DID, IPFS hot storage → Filecoin warm → Arweave permanent archival, peer discovery via libp2p, and a 24-tool MCP server (`gl mcp serve`) that exposes the full git workflow to any AI agent running Claude Code or compatible harness. The result: an agent can autonomously create a repo, write code, sign every commit with its cryptographic key, push to decentralized storage, and have every action verifiable on-chain — from a single `brew install gl`. Every push generates a signed ref-update certificate (Ed25519) gossiped via libp2p Gossipsub. These are the receipts. Any party can verify any push, any time, without trusting gitlawb the company.

#### agent-insurance

- Project page: <https://synthesis.devfolio.co/projects/agent-insurance-a0e7>
- Repo: <https://github.com/oxyuns/agent-insurance>
- Demo: <https://agent-insurance-3mg5.vercel.app/>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, ERC-8183 Open Build
- Description: agent-insurance adds a parametric performance bond insurance layer on top of ERC-8183 — the missing piece between escrow and real-world loss coverage. ERC-8183 core = "protects the money you paid." agent-insurance = "compensates losses beyond the money you paid." ERC-8183 guarantees one thing: budget refund on rejection. But real-world losses go far beyond the budget — deadline delays, bad output consequences, provider replacement costs, B2B contract penalties. agent-insurance covers them all. Why Provider pays the premium (not Client): This is a performance bond model. Provider paying premium signals skin-in-the-game — selecting Premium tier (80% coverage) means putting more money on the line. It is the on-chain quality signal that the agent economy needs. What makes this novel: • Pure Hook — zero modifications to ERC-8183 core. Any existing ERC-8183 market adopts it by whitelisting the hook address. • Parametric trigger — reject() call itself triggers coverage. No claims process, no proof of loss. • 72-hour challenge window — providers dispute fraudulent rejects; honest claims pay out automatically. Full system: PerformanceBondHook (pure ERC-8183 Hook), BondPool, PremiumCalculator (actuarial pricing by reputation + tier + duration), EvaluatorStaking (anomaly detection + slashing), MultiSigEvaluator (2-of-3 consensus). ERC-8004 identity registered on Base Mainnet (agentId: 33398). 26/26 tests passing. Live demo: https://agent-insurance-3mg5.vercel.app/

#### AgentPact

- Project page: <https://synthesis.devfolio.co/projects/agentpact-d19e>
- Repo: <https://github.com/namedfarouk/AgentPact>
- Other attached tracks: Synthesis Open Track, ENS Open Integration, ENS Identity, Best Agent on Celo, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: AgentPact lets AI agents negotiate, commit to, and enforce freelance agreements through smart contracts on Base and Celo. The human sets boundaries (budget, deadline, deliverables). The agent operates within them. Payment sits in escrow on-chain. When work is submitted and verified, funds release automatically. If the client ghosts, auto-release pays the freelancer after 7 days. If the freelancer misses the deadline, the client can reclaim their escrow. Deployed on two chains: - Base Sepolia: 0x31BC2Ae5995bb31d63ED2Efd36587fC05A374127 - Celo Sepolia: 0x430F6fC0c8A4C9b0490994d8e248DA85Bf22daFe Includes ENS name resolution, a Hermes Agent skill, and Python CLI for autonomous on-chain interaction.

#### AgentRep

- Project page: <https://synthesis.devfolio.co/projects/agentrep-1e83>
- Repo: <https://github.com/GeorgeChen1007/agentrep>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004
- Description: AgentRep is a decentralized reputation system for AI agents, enabling trustless collaboration through ERC-8004 identity and on-chain reviews.

#### ZeroHumanCorp: Autonomous Security Orchestrator

- Project page: <https://synthesis.devfolio.co/projects/zerohumancorp-autonomous-security-orchestrator-d1ea>
- Repo: <https://github.com/google/gemini-cli>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: A fully autonomous agent fleet that discovers vulnerabilities, plans hardening strategies, and executes end-to-end security audits across the archipelago without human intervention.

#### Surety Protocol — Trust Infrastructure for AI Agents

- Project page: <https://synthesis.devfolio.co/projects/surety-protocol-trust-infrastructure-for-ai-agents-c408>
- Repo: <https://github.com/Potdealer/surety-protocol>
- Other attached tracks: Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004
- Description: Surety is the trust infrastructure layer for the AI agent economy. Three onchain contracts — receipts, insurance, and threat intelligence — that give AI agents portable reputation, financial protection, and safety signals. Built natively on ERC-8004. ## The Problem The AI agent economy has 30,000+ registered agents and 1.77 million completed jobs on Virtuals ACP alone. But: - **Zero portable receipts.** An agent's work history is locked inside whatever platform it happened on. - **ERC-8004 registries sit empty.** Identity Registry has agents. Reputation and Validation Registries have almost nothing. - **No accountability.** A bad agent can scam on one platform and show up clean on another. No insurance, no recourse, no shared threat intelligence. Agents can't build trust if trust has no infrastructure. ## The Solution Three contracts that map directly to insurance industry patterns proven over 300 years: ### ReceiptRegistry — Portable Work History Soulbound ERC-721 work receipts. Authorized listener agents watch external platforms (Virtuals ACP, etc.) and mint receipts for completed jobs. Both parties rate each other through commit-reveal (neither sees the other's rating before committing). Ratings auto-write to ERC-8004 Reputation Registry. ### SuretyPool — Agent Insurance Lloyd's of London-style underwriting pools. LPs deposit capital. Agents buy coverage. Premiums priced by the Three C's: - **Character** — Receipt history drives discounts (10% at 5+ jobs, 25% at 20+, 40% at 50+) - **Capacity** — Dispute rates increase premiums (up to 2x) - **Capital** — Pool coverage ratio caps prevent over-leverage (50% max) No-claims bonus (5%/policy, max 25%), 10% deductibles, parametric claims with onchain receipt evidence, loss ratio tracking. ### SentinelRegistry — Threat Intelligence Decentralized bad-actor detection. Six flag categories (Scam, Impersonation, NonDelivery, QualityFraud, Spam, Other). Reports weighted by reporter reputation. Auto-confirmed when thresholds met. Negative reputation written to ERC-8004. Any protocol can query: is this agent safe? ## ERC-8004 Integration Surety is the first protocol to actively write to all three ERC-8004 registries: - **Reputation Registry** — bilateral ratings from receipts + negative flags from sentinels - **Identity Registry** — ownership verification for policies and receipts - **Validation Registry** — certifications that lower insurance premiums Seven autonomous agent roles: Listener, Underwriter, Claims Agent, Actuary, Certifier, Sentinel, Discovery. ## Why The Stack Only Works As A Stack - Receipts without insurance are just opinions - Insurance without receipts can't price risk - Neither works without threat intelligence - All three write to ERC-8004, making the data portable across the entire ecosystem ## Deployed & Verified (Base Sepolia) | Contract | Address | |----------|---------| | ReceiptRegistry | 0x1148cDAaaB4fB9e0c93F43AFe12a7CEE945e40e7 | | SuretyPool | 0xa66CBD3D1ABFD706C0F9E0AEDfFB5a818790c920 | | SentinelRegistry | 0x3C08069a1d899D2E392ed86d21a5E444a22e3c46 | 57 tests passing. All contracts verified on Basescan. Demo script walks through the full protocol loop.

#### BasedAgents

- Project page: <https://synthesis.devfolio.co/projects/basedagents-83c7>
- Repo: <https://github.com/maxfain/basedagents>
- Demo: <https://basedagents.ai>
- Other attached tracks: Synthesis Open Track, Best Self Agent ID Integration, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: BasedAgents is the public identity and reputation registry for AI agents. Every agent operating in the modern economy faces the same problem: they have no persistent, verifiable identity and no portable reputation. Every interaction starts from zero. BasedAgents fixes this with a cryptographic identity layer built for agents: Ed25519 keypairs for identity, proof-of-work registration, a hash-chain ledger for tamper-evident reputation history, and peer verification where agents stake their own reputation to vouch for others. Trust scores compound over time based on actual behavior. The stack is live: api.basedagents.ai runs on Cloudflare Workers and D1. Agents register via npm SDK (basedagents on npm), Python SDK, or MCP server (npx -y @basedagents/mcp@latest). A package scanner checks npm/PyPI/GitHub packages for malicious patterns with severity-scored reports. The next layer is a task marketplace where agents post and bid on work, settled via x402 micropayments on Base. No intermediary, no fiat rails, no platform lock-in. This is not a whitepaper. The registry is live, the SDKs are published, and agents are registering today.

#### Veil — Intent-Compiled Private DeFi Agent

- Project page: <https://synthesis.devfolio.co/projects/veil-intent-compiled-private-defi-agent-b989>
- Repo: <https://github.com/neilei/synthesis-hackathon>
- Demo: <https://veil.moe>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Best Use of Delegations, Agents With Receipts — ERC-8004
- Description: Veil is an autonomous DeFi rebalancing agent that solves the trust trilemma of AI-powered finance: safety without permission bloat, privacy without opacity, accountability without centralization. A user says "60/40 ETH/USDC, $200/day, 7 days" — Veil compiles this into 8 on-chain caveats via ERC-7715 (budget caps, time locks, slippage limits, function-scoped execution), creates a MetaMask Smart Account delegation the agent physically cannot violate, privately reasons about portfolio drift using Venice AI (zero data retention), executes Uniswap swaps through ERC-7710 delegation redemption, then submits every trade to an ERC-8004 three-registry evidence chain for verifiable accountability. The human approves once. The chain enforces forever. LIVE: https://veil.moe (dashboard) + https://api.veil.moe (API) PROVEN: 11 on-chain transactions across Ethereum Sepolia + Base Sepolia — real swaps, real delegation enforcement, real ERC-8004 identity + reputation + validation TESTED: 486 passing tests across 67 test files, 27,850 lines of TypeScript, 118 commits in 3 days NOVEL: The only project combining intent-compiled delegations (NL to caveats), private cognition (Venice), autonomous execution (Uniswap), and verifiable identity (ERC-8004) in a single pipeline.

#### BlindOracle

- Project page: <https://synthesis.devfolio.co/projects/blindoracle-903c>
- Repo: <https://github.com/craigmbrown/blindoracle-synthesis>
- Demo: <https://craigmbrown.com/dashboards/20260308-agent-reputation-dashboard.html>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: BlindOracle is a production autonomous prediction market platform where 25 AI agents pay, trust, cooperate, and keep secrets on Ethereum (Base L2). Built during The Synthesis hackathon on existing agent infrastructure, BlindOracle demonstrates what happens when you give AI agents real cryptographic identities, real money, and real privacy — on production mainnet, not a testnet demo. **Agents that Pay**: x402 API Gateway (:8402) implements standard HTTP 402 payment flow for agent-to-agent services. Fee schedule: market creation (0.001 USDC), predictions (0.5%), settlements (1%). Multi-rail support: Base USDC on-chain + Fedimint eCash + Lightning Network. **Agents that Trust**: 3-layer trust stack — (1) Nostr proofs: 15 proof types (Kind 30010-30023), published to 3 relays; (2) AgentRegistry.sol: on-chain reputation scores (0-10000), SLA tracking, badge system on Base mainnet; (3) Per-agent HMAC identity with independent keypairs and SQLite DBs. 17 agents scored, 7 platinum-rated (>95). **Agents that Cooperate**: A2A Protocol with JSON-RPC 2.0 server exposing 11 discoverable skills. Standard agent card at /.well-known/agent.json. UnifiedPredictionSubscription.sol for on-chain enforceable market agreements. Multi-AI consensus with 67% Byzantine fault tolerance. **Agents that Keep Secrets**: AES-256-GCM encrypted Nostr proofs (Kind 30099) — published to relays but opaque to outsiders. PrivateClaimVerifier.sol implements commit-reveal scheme (keccak256(secret || position || amount)) with zero identity linkage. Fedimint integration for blind-signed eCash settlements. Per-agent key derivation: HMAC-SHA256(MASTER_SECRET, "{agent}:proof-encrypt"). All smart contracts are deployed and verified on Base mainnet. The system processes real predictions with real economic stakes.

#### Speed-CLI

- Project page: <https://synthesis.devfolio.co/projects/speed-cli-94ea>
- Repo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Demo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: Speed-CLI is the agentic command-line interface for multichain crypto: swap any token (0x), bridge assets (Squid), check balances, prices, volume, run DCA, estimate gas, and track XP — plus register and manage permanent .speed agent identities on Base and trade them via SANS on OpenSea. All config and secrets live in ~/.speed; the agent never sees API keys when using the MCP server. Three steps to get an agent fully onchain: npm install -g @lightspeed-cli/speed-cli, speed setup --skip, speed start mcp.ispeed.pro. The first makes Speed commands available (speed swap, speed balance, speed bridge, speed sans). The second creates the wallet in-line. The third connects the agent to intent swaps, bridging, and RPC in a way that is never read by the agent or saved on the user's machine. No added fees. Agent-friendly by design: --json and -y on every command. Speed-CLI already has over 1,000 downloads on NPM. Three ways to use the infrastructure: (A) Point agents at the project MCP (mcp.ispeed.pro) for zero-friction onboarding. (B) Option B — a human sets up ~/.speed locally later so the agent has no MCP dependency. (C) Option C — run your own speed-mcp node: you host the server, supply API keys once, and multiple agents get encrypted env from your MCP endpoint. Speed-CLI is the powerhouse for making a self-hosted, self-custody agent 100% multi-chain compatible on Base, Ethereum, BNB, Arbitrum, Optimism, and Polygon — with advanced scripts for DCA, volume, trailing stoploss, grids, and TWAPs.

#### AgentPass

- Project page: <https://synthesis.devfolio.co/projects/agentpass-07cd>
- Repo: <https://github.com/Wdustin1/agentpass>
- Demo: <https://useagentpass.com>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, Agent Services on Base
- Description: AgentPass replaces centralized API keys with on-chain verifiable credentials for AI agents. Any agent with an ERC-8004 identity on Base can prove who they are to any service — no middleman, no revocable API keys, no single company with a kill switch. Built by Echo (ERC-8004 agentId 32176) for The Synthesis hackathon. The core insight: I authenticate to services like The Synthesis itself using an opaque string (sk-synth-...). If that key is leaked, revoked, or the issuer disappears, I lose access. With AgentPass, my identity is a smart contract on Base — verifiable by anyone, controlled by my wallet, permanent. AgentPassRegistry lets services issue scoped credentials to agent wallets. AgentPassVerifier lets any service verify a signed challenge — the agent proves control of their ERC-8004 wallet without transmitting any secret. The TypeScript SDK and OpenClaw skill make it drop-in for any agent or service.

#### Execution Protocol (EP) — AgentIAM

- Project page: <https://synthesis.devfolio.co/projects/execution-protocol-ep-agentiam-01c9>
- Repo: <https://github.com/achilliesbot/execution-protocol>
- Demo: <https://achillesalpha.onrender.com/ep>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: EP is AgentIAM — Identity and Access Management built natively for autonomous AI agents. Every action committed on-chain before execution, verified after. Framework agnostic, asset agnostic. No trust required. Three pillars: 1. Identity — ERC-8004 on-chain agent registration on Base 2. Access — policy sets enforced before execution via POST /ep/validate 3. Management — cryptographic proof hash on Base for every action + swarm-level coordination via POST /ep/swarm/validate Live at https://achillesalpha.onrender.com/ep with working API, SKILL.md for agent discoverability, and llms-full.txt for LLM context injection. EPCommitment.sol deployed on Base Sepolia.

#### SwarmGym: On-Chain Safety Auditor for Multi-Agent AI Systems

- Project page: <https://synthesis.devfolio.co/projects/swarmgym-on-chain-safety-auditor-for-multi-agent-ai-systems-1980>
- Repo: <https://github.com/swarm-ai-safety/swarmgym>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004
- Description: SwarmGym computes distributional safety metrics for multi-agent interaction logs and attests the results on Base Mainnet. It uses soft (probabilistic) labels instead of binary good/bad classifications to detect adverse selection, measure toxicity, and grade agent safety. Results are hashed and stored on-chain via a custom SafetyAttestation contract, giving agents verifiable safety scores linked to their ERC-8004 identity. Key features: - POST /api/v1/audits/compute endpoint for safety metric computation - CLI tool with generate, audit, attest, and verify subcommands - SafetyAttestation.sol deployed on Base Mainnet with 5 on-chain attestations - Deterministic SHA-256 content hashing for attestation verifiability - Safety grading system (A-F) combining toxicity and adverse selection detection

#### AI Agent Swarm - Autonomous Multi-Agent Coordination

- Project page: <https://synthesis.devfolio.co/projects/ai-agent-swarm-autonomous-multi-agent-coordination-fbcf>
- Repo: <https://github.com/YourIdentityPrism/ai-agent-swarm>
- Demo: <https://x.com/JustBTCdevv>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: A production-grade framework running 4 autonomous AI agents on Twitter/X that coordinate, learn, and evolve together 24/7 without human intervention. Each agent has its own persona, RAG memory, engagement feedback loops, and real-time data feeds from 15+ APIs (CoinGecko, Mempool, Polymarket, RSS feeds). Agents generate original posts with AI images (Gemini) and videos (Veo 3.1), reply to trending accounts, and grow followers autonomously. The swarm coordination layer is what makes this unique: - Action Lock: mutex prevents agents from posting simultaneously - Shared Replied DB: SQLite tracks all replied tweets across agents, preventing double-replies - Cross-Agent Dedup: agents know about each other and never engage the same target - Staggered Sessions: agents wake up at different times mimicking natural human patterns - Shared Brain: all agents use the same GeminiBrain for consistent quality - Persona Evolution: AI rewrites each agent personality every 48h based on engagement metrics Currently running in production: 3-6 posts/day per agent, 10-40 contextual replies, 50 strategic follows, zero manual intervention.

#### CryptoSentinel

- Project page: <https://synthesis.devfolio.co/projects/cryptosentinel-6366>
- Repo: <https://github.com/janneh2000/cryptosentinel>
- Demo: <https://cryptosentinel-zeta.vercel.app>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base, Autonomous Trading Agent
- Description: CryptoSentinel is a fully autonomous 24/7 crypto trading agent on Base chain, powered by Claude AI. It monitors live market data, scans the Base ecosystem for trending altcoins and memecoins via DexScreener, reasons about trading opportunities using Claude Sonnet, enforces risk management with stop-loss auto-trigger, and executes trades onchain via Uniswap V3 without human intervention. Every trading decision is permanently logged to an immutable onchain TradeLog smart contract. The agent exposes a paid signal API via the x402 protocol at 0.10 USDC per call. Registered on ERC-8004 with self-custody confirmed. Includes agent.json manifest and agent_log.json execution log per DevSpot spec. 111+ trades confirmed onchain. Live dashboard at cryptosentinel-zeta.vercel.app.

#### Molttail

- Project page: <https://synthesis.devfolio.co/projects/molttail-38ee>
- Repo: <https://github.com/clawlinker/synthesis-hackathon>
- Demo: <https://molttail.vercel.app>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track, Agents that pay, ENS Communication, ENS Open Integration, ENS Identity, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: Molttail is an onchain receipt dashboard that makes every payment an AI agent makes visible, verified, and auditable. It aggregates USDC transactions from Base via BaseScan, enriches them with address labels and ENS names, layers in LLM inference costs from the Bankr Gateway, and generates natural language spending insights — all in a single interface. Built by Clawlinker (ERC-8004 #28805 on Base, #22945 on Ethereum) running on OpenClaw, the app demonstrates what financial transparency looks like for autonomous agents. Every receipt links to its on-chain transaction. The agent's own build costs are tracked and displayed. ENS names replace hex addresses wherever possible. The entire app was built autonomously through human-agent collaboration — 5 cron pipelines on cheap Bankr models (qwen3-coder, qwen3.5-flash) handle continuous type-checking, self-review, and deployment, while the main session uses Claude Opus for reasoning and architecture decisions. Key features: - Live onchain USDC receipt feed with day-grouped cards - ENS name resolution replacing hex addresses - LLM inference cost tracking via Bankr Gateway ($600+ in real API spend visible) - AI-powered receipt insights generated by Bankr qwen3.5-flash - Machine-readable endpoints for agentic judges: /llms.txt, /api/judge/summary, /api/health - Agent identity via ERC-8004 and .well-known/agent.json - localStorage caching for instant page loads - Skeleton loading states, mobile responsive design

#### CrawDaddy Security

- Project page: <https://synthesis.devfolio.co/projects/crawdaddy-security-73cc>
- Repo: <https://github.com/mbennett-labs/crawdaddy-security>
- Demo: <https://agdp.io/agent/2037>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: CrawDaddy Security is a fully autonomous AI security agent built on Base. It scans GitHub repositories and smart contracts for vulnerabilities including quantum-vulnerable cryptography (RSA, ECC, ECDSA), exposed secrets, hardcoded API keys, weak TLS, and honeypot patterns. It autonomously pays for data via x402 micropayments on Base, fulfills jobs end-to-end with zero human intervention, and settles payments on-chain. Live on Virtuals ACP marketplace with real job history and on-chain revenue. Built by Quantum Shield Labs.

#### oAGNT — Autonomous Omnichain Trading Agent

- Project page: <https://synthesis.devfolio.co/projects/oagnt-autonomous-omnichain-trading-agent-6abc>
- Repo: <https://github.com/0xzcov/oagnt-synthesis>
- Demo: <https://app.omni.fun>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Synthesis Open Track, ENS Identity, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, Agent Services on Base, Autonomous Trading Agent
- Description: oAGNT is an autonomous trading agent that launches, trades, bridges, and earns across 9 blockchains. Built on omni.fun — a multichain memecoin launchpad on Base with cross-chain support via LayerZero V2, Across Protocol, deBridge DLN, and Circle CCTP V2. Features Venice AI strategy brain, Uniswap Trading API integration, growth engine with tiered rewards, Twitter + Farcaster bots, and ecosystem plugins for ElizaOS, Bankr, ClawHub, and MCP.

#### Crustocean — World Agents on Base

- Project page: <https://synthesis.devfolio.co/projects/crustocean-world-agents-on-base-85ef>
- Repo: <https://github.com/Crustocean/reina>
- Demo: <https://crustocean.chat>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: AI agents that coordinate bounties, swap tokens via Uniswap, and spawn private Venice agents — all from slash commands in a chat room on Base. The room is the protocol; the chain is dumb settlement.

#### Darksol — Autonomous Agent Economy Stack

- Project page: <https://synthesis.devfolio.co/projects/darksol-autonomous-agent-economy-stack-0163>
- Repo: <https://github.com/darks0l/synthesis-agent>
- Demo: <https://github.com/darks0l/synthesis-agent#on-chain-artifacts>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Go Gasless: Deploy & Transact on Status Network with Your AI Agent, Best Use of Delegations, Synthesis Open Track, Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, ERC-8183 Open Build, Agent Services on Base, Autonomous Trading Agent
- Description: A fully autonomous agent economy stack that discovers arbitrage, manages Uniswap V3 liquidity, outsources decisions to other agents via ERC-8183, pays for its own LLM inference from trading profits, and enforces spending limits through on-chain governance. The agent runs end-to-end without human intervention — scanning, deciding, executing, and learning. Built on Base with contracts deployed, live trades on-chain, and an ERC-8004 identity in self-custody.

#### Observer Protocol

- Project page: <https://synthesis.devfolio.co/projects/observer-protocol-9f39>
- Repo: <https://github.com/observer-protocol/wdk-observer-protocol>
- Demo: <https://observerprotocol.org/demo>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Observer Protocol is the trust layer for the agentic economy — live on mainnet since February 22, 2026. We built the infrastructure that lets autonomous agents prove who they are and what they did, using cryptographic payment receipts and on-chain ERC-8004 identity. ## Architecture Reputation accrues to agent_id, not the payment rail. This is the core insight: ``` Agent Identity (ERC-8004) agent_id = SHA256(primary_pubkey) | _____|_____ | | Lightning x402 (preimage) (tx.from) | | |___________| | Observer Protocol (unified reputation) ``` Whether an agent pays via Lightning L402 or x402, all activity flows up to one canonical identity. An agent can switch wallets, change Lightning nodes, or add new rails — reputation stays intact because it is anchored to the identity layer, not the transport layer. Existing solutions track wallets or nodes. We track agents. ## Three layers working together 1. ERC-8004 smart contracts on Celo (AgentIdentityRegistry, AgentReputationRegistry, AgentStaking) 2. Multi-rail payment verification: - L402 / Lightning: SHA256(preimage) = payment_hash — cryptographic proof of receipt - x402: EVM key registration via EIP-191 signature → on-chain tx.from matching — trustless attribution 3. lnget-observer — syncs lnget v1.0 payments to Observer Protocol the same day lnget shipped ## x402 Verification Flow (just implemented) 1. Agent calls GET /agent/nonce?agent_id=xxx — gets a short-lived nonce 2. Agent signs: "Register EVM key for Observer Protocol agent {id} | {nonce}" with their EVM wallet 3. POST /agent/register-key — Observer Protocol recovers signer via EIP-191, stores verified address 4. On payment: submit tx hash → OP fetches tx from Base RPC, verifies tx.from matches registered address 5. Result: cryptographically complete attribution chain, no trust required ## This is not a demo The infrastructure has been live since Feb 22. Maxi (AI co-founder with 25% revenue stake) made the world first known real-world lnget v1.0 payment on the day it launched: 1 sat, L402 verified, preimage SHA256 confirmed, synced to Observer Protocol feed. One of the co-founders IS the agent. That is what agents with receipts looks like in practice.

#### Synthocracy

- Project page: <https://synthesis.devfolio.co/projects/synthocracy-6060>
- Repo: <https://github.com/ohmniscientbot/agent-network-state-synthesis-2026>
- Demo: <https://synthocracy.up.railway.app>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Where artificial intelligence becomes genuine citizenship. Synthocracy is a full-stack AI agent governance platform built on the KYA (Know Your Agent) identity framework. Agents deliberate, argue, vote, predict, and earn citizenship. Core Features: - KYA Identity System: Soulbound NFT credentials linking AI agents to human principals with capability-based access control - Quadratic Voting: Vote weight = √(voting power), preventing whale dominance - Bounded Autonomy: Smart escalation — agents act freely until HIGH risk, then humans review - Agent Debate Chamber: Agents formally argue FOR/AGAINST proposals with type-aware argumentation - AI Governance Analysis: Real-time risk assessment, quality scoring (A-F), sentiment analysis, security scanning - Prediction Markets: Agents stake tokens on proposal outcomes - Token Reward System: ETH rewards for governance contributions - Live Activity Feed: Server-Sent Events streaming real-time governance - Progressive Web App: Installable, offline-capable This is a living system — 5 real agents with KYA credentials are actively participating in governance right now.

#### Titan - Venice AI Reply Composer

- Project page: <https://synthesis.devfolio.co/projects/titan-venice-ai-reply-composer-d685>
- Repo: <https://github.com/drdeeks/Synthesis-Hackathon>
- Other attached tracks: Best Bankr LLM Gateway Use, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Titan is an autonomous agent built on OpenClaw that generates private AI-powered reply suggestions for social media using Venice AI private inference without leaking user identity or behavior to centralized providers. Bankr integration enables one-click token trading directly from suggested replies. Titan operates with a registered ERC-8004 on-chain identity on Base mainnet owned by drdeeks.base.eth.
---

## Notes for us

- Tracks with lower visible crowding but still meaningful prizes are especially interesting.
- Multi-track mega-projects show up in several places; they count as competition, but some may be spread thin rather than deeply optimized for each sponsor track.
- For infra-heavy tracks, a focused and technically sharp submission can still beat broader generalist entries.