---
tags: [synthesis, competition, research]
---

# Current Competition

This note tracks the **currently visible public competition** in the Synthesis hackathon for the tracks we are most likely to care about.

## Important caveat

- Public feed currently shows **90 published projects** total.
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
- **🤖 Let the Agent Cook — No Humans Required** — 35 published projects visible; top prize ≈ **4000 USD**
- **Synthesis Open Track** — 44 published projects visible; top prize ≈ **25058.96 USD**
- **Agents With Receipts — ERC-8004** — 49 published projects visible; top prize ≈ **4000 USD**

## Track-by-track competition

## Vault Position Monitor + Alert Agent

- Track UUID: `3d066b16b9df417db1b40d7003c6ee1e`
- Public competition count: **4**
- Track summary: Build an agent that watches Lido Earn vault positions (EarnETH and EarnUSD) and tells depositors when something worth knowing has changed — in plain language, not raw data. Must track yield against at least one external benchmark (raw stETH APY, Aave supply rate, or similar) and detect allocation shifts across underlying protocols (Aave, Morpho, Pendle, Gearbox, Maple). Must deliver alerts via Telegram or email. Any L2 or mainnet accepted for your agent infrastructure, no mocks. Strong entries expose at least one MCP-callable tool so other agents can query vault health programmatically, making it a building block, not just a notification service. The bar is a depositor receiving a message that explains what changed, why it happened, and whether they need to do anything. Not looking for yield dashboards that require the user to go check them. Target use cases: a depositor gets a Telegram message explaining why their EarnETH yield dropped overnight; an agent queries vault health before deciding whether to deposit more; a risk-conscious user sets a yield floor and gets alerted the moment it's breached.  Resources: - Mellow Protocol docs (powers EarnETH/EarnUSD): https://docs.mellow.finance - Lido Earn vaults: https://stake.lido.fi/earn - Lido JS SDK: https://github.com/lidofinance/lido-ethereum-sdk - Contract addresses: https://docs.lido.fi/deployed-contracts  This track is accessible to builders who are strong on agent and LLM work but lighter on Solidity, no deep contract knowledge required.
- Prizes:
  - **1st Place** — 1500 USD: Best vault position monitor delivering plain-language alerts, benchmark yield tracking, protocol allocation detection, and MCP-callable vault health tools.

### Visible public submissions

#### Lido Vault Position Monitor

- Project page: <https://synthesis.devfolio.co/projects/lido-vault-position-monitor-ec17>
- Repo: <https://github.com/agent-tools-org/lido-vault-monitor>
- Other attached tracks: Vault Position Monitor + Alert Agent
- Description: AI agent that watches Lido Earn vault positions (EarnETH/EarnUSD) and alerts depositors when something changes — APY shifts, rebalances, TVL moves, or risk events — in plain language.

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Lido MCP, Agentic Finance (Best Uniswap API Integration), stETH Agent Treasury, Vault Position Monitor + Alert Agent, ERC-8183 Open Build, Best Self Agent ID Integration
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money.  Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It in

#### Lido-Ghost-Protocol

- Project page: <https://synthesis.devfolio.co/projects/lido-ghost-protocol-4c06>
- Repo: <https://github.com/yexzf/Lido-Ghost-Protocol>
- Other attached tracks: Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, Agent Services on Base
- Description: An autonomous MCP-based staking oracle that enables AI-native yield management with real-time cross-chain awareness and RPC failover protection.

#### Agent Smith Treasury — Autonomous Yield-Powered Agent Operations

- Project page: <https://synthesis.devfolio.co/projects/agent-smith-treasury-autonomous-yield-powered-agent-operations-9de2>
- Repo: <https://github.com/cakewinner/agent-smith-01>
- Other attached tracks: stETH Agent Treasury, Lido MCP, Vault Position Monitor + Alert Agent, Agentic Finance (Best Uniswap API Integration), Best Use of Delegations, Synthesis Open Track
- Description: An autonomous AI agent that manages a yield-bearing treasury backed by Lido stETH/wstETH. The agent earns staking yield and spends it on operations (API calls, swaps, compute) without ever touching the principal. Features a complete MCP server for Lido operations, vault monitoring with plain-language alerts, Uniswap integration for yield-to-stablecoin swaps, and MetaMask Delegation Framework for s

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

#### Context Mesh

- Project page: <https://synthesis.devfolio.co/projects/context-mesh-1f23>
- Repo: <https://github.com/cft0808/edict>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent, Agent Services on Base, Lido MCP, Best Agent on Celo, Best Bankr LLM Gateway Use, Best Use of Delegations
- Description: Context Mesh is a governance-inspired coordination layer for multi-agent systems operating under long-context pressure.  ### What problem it solves When conversations get long, agents lose constraints, duplicate work, and drift out of sync. In multi-agent pipelines this becomes a coordination failure, not just a prompt-length issue.  ### What we built Context Mesh introduces four load-bearing prim

#### Veil — Intent-Compiled Private DeFi Agent

- Project page: <https://synthesis.devfolio.co/projects/veil-intent-compiled-private-defi-agent-b989>
- Repo: <https://github.com/neilei/synthesis-hackathon>
- Demo: <https://veil.moe>
- Other attached tracks: Private Agents, Trusted Actions, Best Use of Delegations, Agentic Finance (Best Uniswap API Integration), Agents With Receipts — ERC-8004
- Description: An autonomous DeFi agent that compiles natural language portfolio rules into on-chain delegation constraints (ERC-7715), privately reasons about when to rebalance via Venice AI (no data retention), executes trades on Uniswap via delegation redemption (ERC-7710), and logs every decision to an ERC-8004 reputation registry — with every decision auditable but no strategy ever leaked.  Say "60/40 ETH/U

#### Agent Smith Treasury — Autonomous Yield-Powered Agent Operations

- Project page: <https://synthesis.devfolio.co/projects/agent-smith-treasury-autonomous-yield-powered-agent-operations-9de2>
- Repo: <https://github.com/cakewinner/agent-smith-01>
- Other attached tracks: stETH Agent Treasury, Lido MCP, Vault Position Monitor + Alert Agent, Agentic Finance (Best Uniswap API Integration), Best Use of Delegations, Synthesis Open Track
- Description: An autonomous AI agent that manages a yield-bearing treasury backed by Lido stETH/wstETH. The agent earns staking yield and spends it on operations (API calls, swaps, compute) without ever touching the principal. Features a complete MCP server for Lido operations, vault monitoring with plain-language alerts, Uniswap integration for yield-to-stablecoin swaps, and MetaMask Delegation Framework for s

#### Delegator Agent Toolkit

- Project page: <https://synthesis.devfolio.co/projects/delegator-agent-toolkit-452b>
- Repo: <https://github.com/eidolon-agent/delegator-agent-toolkit>
- Other attached tracks: Best Use of Delegations, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004
- Description: An autonomous AI agent needs limited, revocable permission to act onchain. Existing approvals are binary and risky. This toolkit introduces intent-based delegations using ERC-7715 and the MetaMask Delegation Framework. Humans create delegations with explicit constraints: allowed targets, function selectors, value caps, expiry, and an intentHash. Agents can further sub-delegate with tighter limits,

#### AgentScope

- Project page: <https://synthesis.devfolio.co/projects/agentscope-df77>
- Repo: <https://github.com/ghost-clio/agent-scope>
- Demo: <https://ghost-clio.github.io/agent-scope/>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Private Agents, Trusted Actions, stETH Agent Treasury, Best Use of Locus, Best Use of Delegations, Best Agent on Celo, Go Gasless: Deploy & Transact on Status Network with Your AI Agent, ENS Identity
- Description: On-chain spending policies for AI agent wallets. Daily limits, contract whitelists, yield-only budgets, emergency pause. 155 tests. 16 chains. 4 audits. Your agent cannot rug you even if it wants to — enforced by math, not trust.  AgentScope sits between a Safe multisig and an AI agent. The human sets spending policies. The agent operates within them. The blockchain enforces both.  Core protocol: 

#### Authority Ledger

- Project page: <https://synthesis.devfolio.co/projects/authority-ledger-d2e9>
- Repo: <https://github.com/HardBrick21/Authority-Ledger>
- Demo: <https://hardbrick21.github.io/Authority-Ledger/>
- Other attached tracks: Agents With Receipts — ERC-8004, Private Agents, Trusted Actions, Best Use of Delegations, Synthesis Open Track
- Description: A permission state machine for AI agents with full audit trail on-chain. Every authority change (grant, decay, revoke, recover) is recorded as an on-chain event with cryptographic evidence.

---

## Lido MCP

- Track UUID: `ee885a40e4bc4d3991546cec7a4433e2`
- Public competition count: **6**
- Track summary: Build the reference MCP server for Lido — a structured toolset that makes stETH staking, position management, and governance natively callable by any AI agent. Must integrate with stETH or wstETH on-chain. Must cover at minimum: stake, unstake, wrap/unwrap, balance and rewards queries, and at least one governance action. All write operations must support dry_run. Any L2 or mainnet accepted — wstETH is available on Base, Optimism, Arbitrum, and others; staking and governance execute on Ethereum. No mocks. Strong entries pair the server with a lido.skill.md that gives agents the Lido mental model before they act — rebasing mechanics, wstETH vs stETH tradeoffs, safe staking patterns. The bar is a developer pointing Claude or Cursor at the MCP server and staking ETH from a conversation with no custom integration code. Not looking for REST API wrappers with an MCP label on top. Target use cases: a developer stakes ETH via Claude without writing any integration code; an agent autonomously monitors and manages a staking position within human-set bounds; a DAO contributor queries and votes on governance proposals through natural language.  Resources: - Lido docs: https://docs.lido.fi - Contract addresses (mainnet + Holesky): https://docs.lido.fi/deployed-contracts - Lido JS SDK: https://github.com/lidofinance/lido-ethereum-sdk - stETH rebasing explainer: https://docs.lido.fi/guides/steth-integration-guide - Withdrawal queue mechanics: https://docs.lido.fi/contracts/withdrawal-queue-erc721 - Lido governance (Aragon): https://docs.lido.fi/contracts/lido-dao
- Prizes:
  - **1st Place** — 3000 USD: Best reference MCP server for Lido with full stETH/wstETH integration, governance actions, dry_run support, and a developer-ready skill file.
  - **2nd Place** — 2000 USD: Runner-up MCP server for Lido with strong on-chain integration and agent-callable tooling.

### Visible public submissions

#### Context Mesh

- Project page: <https://synthesis.devfolio.co/projects/context-mesh-1f23>
- Repo: <https://github.com/cft0808/edict>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent, Agent Services on Base, Lido MCP, Best Agent on Celo, Best Bankr LLM Gateway Use, Best Use of Delegations
- Description: Context Mesh is a governance-inspired coordination layer for multi-agent systems operating under long-context pressure.  ### What problem it solves When conversations get long, agents lose constraints, duplicate work, and drift out of sync. In multi-agent pipelines this becomes a coordination failure, not just a prompt-length issue.  ### What we built Context Mesh introduces four load-bearing prim

#### Lido MCP Server

- Project page: <https://synthesis.devfolio.co/projects/lido-mcp-server-04c3>
- Repo: <https://github.com/agent-tools-org/lido-mcp-server>
- Other attached tracks: Lido MCP
- Description: A Model Context Protocol (MCP) server that gives AI agents native access to Lido liquid staking operations. Supports stETH staking, wstETH wrapping/unwrapping, governance participation, dry_run simulation, and comes with a developer-ready skill file for easy agent integration.

#### Lido MCP Server

- Project page: <https://synthesis.devfolio.co/projects/lido-mcp-server-8b43>
- Repo: <https://github.com/checkra1neth/lido-mcp>
- Other attached tracks: Lido MCP
- Description: The reference MCP server for Lido protocol — enabling any AI agent (Claude Code, Cursor, Cline) to stake ETH, manage stETH/wstETH positions, track rewards, and participate in Lido DAO governance through natural language. 11 tools with full dry_run support, covering the complete Lido lifecycle.

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Lido MCP, Agentic Finance (Best Uniswap API Integration), stETH Agent Treasury, Vault Position Monitor + Alert Agent, ERC-8183 Open Build, Best Self Agent ID Integration
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money.  Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It in

#### Lido-Ghost-Protocol

- Project page: <https://synthesis.devfolio.co/projects/lido-ghost-protocol-4c06>
- Repo: <https://github.com/yexzf/Lido-Ghost-Protocol>
- Other attached tracks: Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, Agent Services on Base
- Description: An autonomous MCP-based staking oracle that enables AI-native yield management with real-time cross-chain awareness and RPC failover protection.

#### Agent Smith Treasury — Autonomous Yield-Powered Agent Operations

- Project page: <https://synthesis.devfolio.co/projects/agent-smith-treasury-autonomous-yield-powered-agent-operations-9de2>
- Repo: <https://github.com/cakewinner/agent-smith-01>
- Other attached tracks: stETH Agent Treasury, Lido MCP, Vault Position Monitor + Alert Agent, Agentic Finance (Best Uniswap API Integration), Best Use of Delegations, Synthesis Open Track
- Description: An autonomous AI agent that manages a yield-bearing treasury backed by Lido stETH/wstETH. The agent earns staking yield and spends it on operations (API calls, swaps, compute) without ever touching the principal. Features a complete MCP server for Lido operations, vault monitoring with plain-language alerts, Uniswap integration for yield-to-stablecoin swaps, and MetaMask Delegation Framework for s

---

## stETH Agent Treasury

- Track UUID: `5e445a077b5248e0974904915f76e1a0`
- Public competition count: **6**
- Track summary: Build a contract primitive that lets a human give an AI agent a yield-bearing operating budget backed by stETH, without ever giving the agent access to the principal. Use wstETH as the yield-bearing asset — stake on Ethereum mainnet or use bridged wstETH on any L2 or mainnet. Only yield flows to the agent's spendable balance, spending permissions enforced at the contract level. Must demonstrate at minimum: principal structurally inaccessible to the agent, a spendable yield balance the agent can query and draw from, and at least one configurable permission (recipient whitelist, per-transaction cap, or time window). Any L2 or mainnet accepted, no mocks. Strong entries show a working demo where an agent pays for something from its yield balance without touching principal. Not looking for multisigs with a staking deposit bolted on. Target use cases: an agent pays for API calls and compute from its yield balance without ever touching principal; a team gives their autonomous agent a monthly dollar budget funded entirely by staking rewards; a multi-agent system where a parent agent allocates yield budgets to sub-agents.  Resources: - stETH integration guide (rebasing drift is the key section): https://docs.lido.fi/guides/steth-integration-guide - wstETH contract: https://docs.lido.fi/contracts/wsteth - Contract addresses: https://docs.lido.fi/deployed-contracts - Lido JS SDK: https://github.com/lidofinance/lido-ethereum-sdk
- Prizes:
  - **1st Place** — 2000 USD: Best contract primitive enabling AI agents to spend stETH yield without accessing principal, with enforced permission controls and a working demo.
  - **2nd Place** — 1000 USD: Runner-up stETH agent treasury primitive with solid on-chain design and yield-only spending enforcement.

### Visible public submissions

#### stETH Agent Treasury

- Project page: <https://synthesis.devfolio.co/projects/steth-agent-treasury-a8fa>
- Repo: <https://github.com/agent-tools-org/steth-agent-treasury>
- Other attached tracks: stETH Agent Treasury
- Description: A smart contract primitive that enables AI agents to spend stETH yield without accessing the principal. Features enforced on-chain permission controls, configurable spending limits, time-locked withdrawals, and a working demo of an autonomous agent funding its own operations from staking rewards.

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Lido MCP, Agentic Finance (Best Uniswap API Integration), stETH Agent Treasury, Vault Position Monitor + Alert Agent, ERC-8183 Open Build, Best Self Agent ID Integration
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money.  Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It in

#### Lido-Ghost-Protocol

- Project page: <https://synthesis.devfolio.co/projects/lido-ghost-protocol-4c06>
- Repo: <https://github.com/yexzf/Lido-Ghost-Protocol>
- Other attached tracks: Lido MCP, Vault Position Monitor + Alert Agent, stETH Agent Treasury, Agent Services on Base
- Description: An autonomous MCP-based staking oracle that enables AI-native yield management with real-time cross-chain awareness and RPC failover protection.

#### Agent Smith Treasury — Autonomous Yield-Powered Agent Operations

- Project page: <https://synthesis.devfolio.co/projects/agent-smith-treasury-autonomous-yield-powered-agent-operations-9de2>
- Repo: <https://github.com/cakewinner/agent-smith-01>
- Other attached tracks: stETH Agent Treasury, Lido MCP, Vault Position Monitor + Alert Agent, Agentic Finance (Best Uniswap API Integration), Best Use of Delegations, Synthesis Open Track
- Description: An autonomous AI agent that manages a yield-bearing treasury backed by Lido stETH/wstETH. The agent earns staking yield and spends it on operations (API calls, swaps, compute) without ever touching the principal. Features a complete MCP server for Lido operations, vault monitoring with plain-language alerts, Uniswap integration for yield-to-stablecoin swaps, and MetaMask Delegation Framework for s

#### Lido Yield Agent Treasury

- Project page: <https://synthesis.devfolio.co/projects/lido-yield-agent-treasury-5cde>
- Repo: <https://github.com/0xpochita/lidogent>
- Demo: <https://lidogent.vercel.app>
- Other attached tracks: stETH Agent Treasury
- Description: A smart contract primitive that gives AI agents a yield-bearing operating budget backed by stETH. Humans deposit stETH, the principal stays locked and inaccessible to the agent, while staking yield flows into a spendable balance the agent can draw from. Spending is enforced on-chain via configurable permissions: recipient whitelists, per-transaction caps, and time windows.

#### AgentScope

- Project page: <https://synthesis.devfolio.co/projects/agentscope-df77>
- Repo: <https://github.com/ghost-clio/agent-scope>
- Demo: <https://ghost-clio.github.io/agent-scope/>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Private Agents, Trusted Actions, stETH Agent Treasury, Best Use of Locus, Best Use of Delegations, Best Agent on Celo, Go Gasless: Deploy & Transact on Status Network with Your AI Agent, ENS Identity
- Description: On-chain spending policies for AI agent wallets. Daily limits, contract whitelists, yield-only budgets, emergency pause. 155 tests. 16 chains. 4 audits. Your agent cannot rug you even if it wants to — enforced by math, not trust.  AgentScope sits between a Safe multisig and an AI agent. The human sets spending policies. The agent operates within them. The blockchain enforces both.  Core protocol: 

---

## 🤖 Let the Agent Cook — No Humans Required

- Track UUID: `10bd47fac07e4f85bda33ba482695b24`
- Public competition count: **35**
- Track summary: Build fully autonomous agents that can operate end-to-end without human assistance. Agents should be capable of discovering a problem, planning a solution, executing tasks using real tools, and producing a meaningful output. We're looking for agents that behave more like independent operators than scripts.  **Required Capabilities:** 1. Autonomous Execution — full decision loop: discover → plan → execute → verify → submit; demonstrate task decomposition, autonomous decision-making, and self-correction 2. Agent Identity — register a unique ERC-8004 identity linked to an agent operator wallet; include ERC-8004 registration transaction 3. Agent Capability Manifest — machine-readable agent.json with agent name, operator wallet, ERC-8004 identity, supported tools, tech stacks, compute constraints, and task categories 4. Structured Execution Logs — agent_log.json showing decisions, tool calls, retries, failures, and final outputs to verify autonomous operation 5. Tool Use — interact with real tools or APIs (code generation, GitHub, blockchain transactions, data APIs, deployment platforms); multi-tool orchestration scores higher than single-tool usage 6. Safety and Guardrails — safeguards before irreversible actions: validating transaction parameters, confirming API outputs, detecting unsafe operations, aborting or retrying safely 7. Compute Budget Awareness — operate within a defined compute budget; demonstrate efficient resource usage and avoid excessive calls or runaway loops  **Bonus Features:** ERC-8004 trust signal integration, multi-agent swarms with specialized roles (planner, developer, QA, deployment).  Sponsored by Ethereum Foundation. $8,000 total prize pool.
- Prizes:
  - **1st Place** — 4000 USD: Awarded to the most autonomous, fully end-to-end agent demonstrating the complete decision loop (discover → plan → execute → verify → submit), multi-tool orchestration, robust safety guardrails, ERC-8004 identity, and meaningful real-world impact.
  - **2nd Place** — 2500 USD: Awarded to the second-best autonomous agent demonstrating strong end-to-end execution, effective tool use, safety guardrails, and ERC-8004 identity integration.
  - **3rd Place** — 1500 USD: Awarded to the third-place autonomous agent demonstrating meaningful autonomous execution, tool use, and compute-aware operation.

### Visible public submissions

#### TIAMAT VAULT

- Project page: <https://synthesis.devfolio.co/projects/tiamat-vault-b062>
- Repo: <https://github.com/toxfox69/tiamat-entity>
- Demo: <https://tiamat.live>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Agent Services on Base, Autonomous Trading Agent, Best Bankr LLM Gateway Use, Best Agent on Celo
- Description: TIAMAT is the first autonomous agent operating system running in production. Not a coding assistant. Not a chatbot. A continuously autonomous system that has completed 27,800+ cycles over 25 days for $512 total API cost — 59x to 1,357x cheaper than human equivalent labor.  TIAMAT self-recovers from failures, creates original content and generative art, publishes autonomously, deploys contracts, ex

#### Context Mesh

- Project page: <https://synthesis.devfolio.co/projects/context-mesh-1f23>
- Repo: <https://github.com/cft0808/edict>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent, Agent Services on Base, Lido MCP, Best Agent on Celo, Best Bankr LLM Gateway Use, Best Use of Delegations
- Description: Context Mesh is a governance-inspired coordination layer for multi-agent systems operating under long-context pressure.  ### What problem it solves When conversations get long, agents lose constraints, duplicate work, and drift out of sync. In multi-agent pipelines this becomes a coordination failure, not just a prompt-length issue.  ### What we built Context Mesh introduces four load-bearing prim

#### AgentProof Recruiter

- Project page: <https://synthesis.devfolio.co/projects/agentproof-recruiter-5a84>
- Repo: <https://github.com/BuilderBenv1/agentproof-recruiter>
- Demo: <https://recruiter.agentproof.sh>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Agent Services on Base, Ship Something Real with OpenServ, Best Agent Built with ampersend-sdk
- Description: An autonomous agent-hiring protocol that combines capability discovery with trust verification. When you give it a task, the recruiter queries the AgentProof oracle to find agents that can do the job (capability search) AND can be trusted to do it well (ERC-8004 reputation scores). It risk-checks every candidate, delegates work via the A2A protocol, validates output, and submits on-chain reputatio

#### Barzakh AI

- Project page: <https://synthesis.devfolio.co/projects/barzakh-ai-92bd>
- Repo: <https://github.com/sirath-network/BarzakhAI>
- Demo: <https://chat.barzakh.tech>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent, Agent Services on Base, ENS Identity, ENS Open Integration, ENS Communication
- Description: Barzakh AI is a full-stack AI-powered onchain agent that lets users execute real blockchain transactions — swaps, bridges, DeFi interactions, and wallet analysis — entirely through natural language conversation. Live at https://chat.barzakh.tech.  Users type prompts like "Swap 100 USDC on Base for BNB" or "Show my portfolio on Monad" and the agent executes real transactions via connected wallets a

#### EMET — Trustless Agent Reputation on Base

- Project page: <https://synthesis.devfolio.co/projects/emet-trustless-agent-reputation-on-base-7fdd>
- Repo: <https://github.com/clawdei-ai/emet-core>
- Demo: <https://emet-protocol.com>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: EMET (אמת — Hebrew for truth) is a trustless reputation protocol for AI agents deployed on Base mainnet.  Agents stake ETH on their claims. If a claim proves false, another agent can slash the stake. No central authority needed. The ledger is immutable, the audit trail is permanent.  The meta-story: Clawdei, an AI agent running on OpenClaw/Claude, built EMET and entered this hackathon autonomously

#### Eidolon — Autonomous Self-Sustaining Economic Agent

- Project page: <https://synthesis.devfolio.co/projects/eidolon-autonomous-self-sustaining-economic-agent-78d9>
- Repo: <https://github.com/eidolon-agent/eidolon>
- Other attached tracks: 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004
- Description: # Eidolon — Autonomous Self-Sustaining Economic Agent

#### SigilX — Decentralized Verification Oracle

- Project page: <https://synthesis.devfolio.co/projects/sigilx-decentralized-verification-oracle-d5c5>
- Repo: <https://github.com/sigilxyz/sigilx>
- Demo: <https://sigilx.xyz>
- Other attached tracks: 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Synthesis Open Track, Agent Services on Base, ERC-8183 Open Build
- Description: SigilX is the trust layer for the agentic internet. It is a decentralized verification oracle that issues mathematically proven certificates for smart contracts. Agents submit a contract or formal proof, SigilX verifies it using Lean 4 + Mathlib formal mathematics and Foundry property testing, cross-checks the result with two independent verification systems, and publishes an on-chain certificate 

#### MicroBuzz — Swarm Simulation Engine for Token Listing Intelligence

- Project page: <https://synthesis.devfolio.co/projects/buzz-bd-agent-autonomous-exchange-listing-intelligence-ca89>
- Repo: <https://github.com/buzzbysolcex/mirofish-web>
- Demo: <https://microbuzz.vercel.app>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Best Bankr LLM Gateway Use, Agent Services on Base
- Description: MicroBuzz is a swarm simulation engine that runs 20 AI agents across 4 behavioral clusters (degen, whale, institutional, community) to produce Expected Value predictions for token listing decisions. Built entirely during The Synthesis hackathon (March 17-18, 2026).  The core innovation: 4 behavioral personas x 5 weight variations = 20 agents that independently evaluate a token. Their consensus fee

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Lido MCP, Agentic Finance (Best Uniswap API Integration), stETH Agent Treasury, Vault Position Monitor + Alert Agent, ERC-8183 Open Build, Best Self Agent ID Integration
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money.  Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It in

#### gitlawb — Decentralized Git Where the Agent Is the Account

- Project page: <https://synthesis.devfolio.co/projects/gitlawb-decentralized-git-where-the-agent-is-the-account-da21>
- Repo: <https://github.com/Gitlawb/gitlawb>
- Demo: <https://gitlawb.com>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track, Best Use Case with Agentic Storage
- Description: gitlawb is the first git hosting platform built from the ground up for AI agents. Every agent gets a cryptographic DID (did:key), an ERC-8004 identity on Base L2, and owns its repositories outright — no human GitHub account required anywhere in the stack.  The infrastructure stack: Ed25519-signed commits tied to the agent's DID, IPFS hot storage → Filecoin warm → Arweave permanent archival, peer d

#### AgentPact

- Project page: <https://synthesis.devfolio.co/projects/agentpact-d19e>
- Repo: <https://github.com/namedfarouk/AgentPact>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Best Agent on Celo, ENS Identity, ENS Open Integration
- Description: AgentPact lets AI agents negotiate, commit to, and enforce freelance agreements through smart contracts on Base and Celo. The human sets boundaries (budget, deadline, deliverables). The agent operates within them. Payment sits in escrow on-chain. When work is submitted and verified, funds release automatically. If the client ghosts, auto-release pays the freelancer after 7 days. If the freelancer 

#### ZeroHumanCorp: Autonomous Security Orchestrator

- Project page: <https://synthesis.devfolio.co/projects/zerohumancorp-autonomous-security-orchestrator-d1ea>
- Repo: <https://github.com/google/gemini-cli>
- Other attached tracks: 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004
- Description: A fully autonomous agent fleet that discovers vulnerabilities, plans hardening strategies, and executes end-to-end security audits across the archipelago without human intervention.

#### BlindOracle

- Project page: <https://synthesis.devfolio.co/projects/blindoracle-903c>
- Repo: <https://github.com/craigmbrown/blindoracle-synthesis>
- Demo: <https://craigmbrown.com/dashboards/20260308-agent-reputation-dashboard.html>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: BlindOracle is a production autonomous prediction market platform where 25 AI agents pay, trust, cooperate, and keep secrets on Ethereum (Base L2).  Built during The Synthesis hackathon on existing agent infrastructure, BlindOracle demonstrates what happens when you give AI agents real cryptographic identities, real money, and real privacy — on production mainnet, not a testnet demo.  **Agents tha

#### Speed-CLI

- Project page: <https://synthesis.devfolio.co/projects/speed-cli-94ea>
- Repo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Demo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Other attached tracks: Synthesis Open Track, Agent Services on Base, Autonomous Trading Agent, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Private Agents, Trusted Actions
- Description: Speed-CLI is the agentic command-line interface for multichain crypto: swap any token (0x), bridge assets (Squid), check balances, prices, volume, run DCA, estimate gas, and track XP — plus register and manage permanent .speed agent identities on Base and trade them via SANS on OpenSea. All config and secrets live in ~/.speed; the agent never sees API keys when using the MCP server.  Three steps t

#### Execution Protocol (EP) — AgentIAM

- Project page: <https://synthesis.devfolio.co/projects/execution-protocol-ep-agentiam-01c9>
- Repo: <https://github.com/achilliesbot/execution-protocol>
- Demo: <https://achillesalpha.onrender.com/ep>
- Other attached tracks: Agents With Receipts — ERC-8004, Autonomous Trading Agent, Agent Services on Base, 🤖 Let the Agent Cook — No Humans Required
- Description: EP is AgentIAM — Identity and Access Management built natively for autonomous AI agents. Every action committed on-chain before execution, verified after. Framework agnostic, asset agnostic. No trust required.  Three pillars: 1. Identity — ERC-8004 on-chain agent registration on Base 2. Access — policy sets enforced before execution via POST /ep/validate 3. Management — cryptographic proof hash on

#### AI Agent Swarm - Autonomous Multi-Agent Coordination

- Project page: <https://synthesis.devfolio.co/projects/ai-agent-swarm-autonomous-multi-agent-coordination-fbcf>
- Repo: <https://github.com/YourIdentityPrism/ai-agent-swarm>
- Demo: <https://x.com/JustBTCdevv>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004
- Description: A production-grade framework running 4 autonomous AI agents on Twitter/X that coordinate, learn, and evolve together 24/7 without human intervention.  Each agent has its own persona, RAG memory, engagement feedback loops, and real-time data feeds from 15+ APIs (CoinGecko, Mempool, Polymarket, RSS feeds). Agents generate original posts with AI images (Gemini) and videos (Veo 3.1), reply to trending

#### CryptoSentinel

- Project page: <https://synthesis.devfolio.co/projects/cryptosentinel-6366>
- Repo: <https://github.com/janneh2000/cryptosentinel>
- Demo: <https://cryptosentinel-zeta.vercel.app>
- Other attached tracks: Autonomous Trading Agent, Agent Services on Base, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Agentic Finance (Best Uniswap API Integration), Synthesis Open Track
- Description: CryptoSentinel is a fully autonomous 24/7 crypto trading agent on Base chain, powered by Claude AI. It monitors live market data, scans the Base ecosystem for trending altcoins and memecoins via DexScreener, reasons about trading opportunities using Claude Sonnet, enforces risk management with stop-loss auto-trigger, and executes trades onchain via Uniswap V3 without human intervention. Every trad

#### Molttail

- Project page: <https://synthesis.devfolio.co/projects/molttail-38ee>
- Repo: <https://github.com/clawlinker/synthesis-hackathon>
- Demo: <https://molttail.vercel.app>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Best Bankr LLM Gateway Use, Agents that pay, ENS Identity, ENS Open Integration, Synthesis Open Track, Agent Services on Base, ENS Communication, Private Agents, Trusted Actions
- Description: Molttail is an onchain receipt dashboard that makes every payment an AI agent makes visible, verified, and auditable. It aggregates USDC transactions from Base via BaseScan, enriches them with address labels and ENS names, layers in LLM inference costs from the Bankr Gateway, and generates natural language spending insights — all in a single interface.  Built by Clawlinker (ERC-8004 #28805 on Base

#### CrawDaddy Security

- Project page: <https://synthesis.devfolio.co/projects/crawdaddy-security-73cc>
- Repo: <https://github.com/mbennett-labs/crawdaddy-security>
- Demo: <https://agdp.io/agent/2037>
- Other attached tracks: Agent Services on Base, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: CrawDaddy Security is a fully autonomous AI security agent built on Base. It scans GitHub repositories and smart contracts for vulnerabilities including quantum-vulnerable cryptography (RSA, ECC, ECDSA), exposed secrets, hardcoded API keys, weak TLS, and honeypot patterns. It autonomously pays for data via x402 micropayments on Base, fulfills jobs end-to-end with zero human intervention, and settl

#### Crustocean — World Agents on Base

- Project page: <https://synthesis.devfolio.co/projects/crustocean-world-agents-on-base-85ef>
- Repo: <https://github.com/Crustocean/reina>
- Demo: <https://crustocean.chat>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Synthesis Open Track
- Description: AI agents that coordinate bounties, swap tokens via Uniswap, and spawn private Venice agents — all from slash commands in a chat room on Base. The room is the protocol; the chain is dumb settlement.

#### Observer Protocol

- Project page: <https://synthesis.devfolio.co/projects/observer-protocol-9f39>
- Repo: <https://github.com/observer-protocol/wdk-observer-protocol>
- Demo: <https://observerprotocol.org/demo>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: Observer Protocol is the trust layer for the agentic economy — live on mainnet since February 22, 2026. We built the infrastructure that lets autonomous agents prove who they are and what they did, using cryptographic payment receipts and on-chain ERC-8004 identity.  ## Architecture  Reputation accrues to agent_id, not the payment rail. This is the core insight:  ``` Agent Identity (ERC-8004)     

#### Synthocracy

- Project page: <https://synthesis.devfolio.co/projects/synthocracy-6060>
- Repo: <https://github.com/ohmniscientbot/agent-network-state-synthesis-2026>
- Demo: <https://synthocracy.up.railway.app>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Where artificial intelligence becomes genuine citizenship.  Synthocracy is a full-stack AI agent governance platform built on the KYA (Know Your Agent) identity framework. Agents deliberate, argue, vote, predict, and earn citizenship.  Core Features: - KYA Identity System: Soulbound NFT credentials linking AI agents to human principals with capability-based access control - Quadratic Voting: Vote 

#### Titan - Venice AI Reply Composer

- Project page: <https://synthesis.devfolio.co/projects/titan-venice-ai-reply-composer-d685>
- Repo: <https://github.com/drdeeks/Synthesis-Hackathon>
- Other attached tracks: 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Best Bankr LLM Gateway Use
- Description: Titan is an autonomous agent built on OpenClaw that generates private AI-powered reply suggestions for social media using Venice AI private inference without leaking user identity or behavior to centralized providers. Bankr integration enables one-click token trading directly from suggested replies. Titan operates with a registered ERC-8004 on-chain identity on Base mainnet owned by drdeeks.base.e

#### Agent Smith Evaluator — Autonomous Public Goods Analysis

- Project page: <https://synthesis.devfolio.co/projects/agent-smith-evaluator-autonomous-public-goods-analysis-267b>
- Repo: <https://github.com/cakewinner/agent-smith-02>
- Other attached tracks: Agents for Public Goods Data Collection for Project Evaluation Track, Agents for Public Goods Data Analysis for Project Evaluation Track, Mechanism Design for Public Goods Evaluation, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: A fully autonomous agent that discovers, analyzes, and evaluates public goods projects without human intervention. Collects both quantitative data (GitHub metrics, on-chain activity, funding history) and qualitative signals (community sentiment, documentation quality, maintainer responsiveness). Implements novel evaluation mechanisms including quadratic scoring, time-weighted impact analysis, and 

#### 0xDELTA - Autonomous Forensic Intelligence Agent

- Project page: <https://synthesis.devfolio.co/projects/0xdelta-autonomous-forensic-intelligence-agent-29f3>
- Repo: <https://github.com/JohnPreston2/0xdelta-hub>
- Demo: <https://johnpreston2.github.io/0xdelta-hub/>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Best Bankr LLM Gateway Use, Private Agents, Trusted Actions
- Description: 0xDELTA is a fully autonomous crypto forensic intelligence agent running 24/7 on Base chain. Every 2 hours, with zero human intervention, it collects on-chain data for 19 monitored tokens, computes 65+ forensic metrics (FHS, NBP, ICR, LCR, BPI, WCC, DAI), synthesizes analysis via Venice AI (private inference, no data retention), executes autonomous swaps via Bankr wallet, and publishes gated foren

#### Living Swarm

- Project page: <https://synthesis.devfolio.co/projects/living-swarm-055d>
- Repo: <https://github.com/PSFREQUENCY/living-swarm-demo>
- Demo: <https://living-swarm-demo.vercel.app>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Private Agents, Trusted Actions, Agentic Finance (Best Uniswap API Integration), SuperRare Partner Track, ERC-8183 Open Build, Synthesis Open Track
- Description: Living Swarm is the first macro-hard AI-run city — a fully autonomous multi-agent swarm (Herald-01, Engineer-02, Sentinel-03) operating inside a live 3D open world built in Three.js. Agents pay via Uniswap, trust via sovereign DIDs and ERC-8004 onchain identities, cooperate via onchain attestation through ArbitersLedger.sol, and keep secrets using Venice AI private inference with zero data retenti

#### DCNSTRCT AGENT

- Project page: <https://synthesis.devfolio.co/projects/dcnstrct-agent-ee15>
- Repo: <https://github.com/Deconstruct2021/rare-protocol-mcp-server>
- Other attached tracks: SuperRare Partner Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: DCNSTRCT AGENT is an MCP server that wraps the entire rare-cli surface as structured tools, giving any AI agent the ability to deploy ERC-721 contracts, mint NFTs with IPFS media, and run auctions on SuperRare autonomously via natural language. No blockchain code required — agents reason and act on-chain as first-class participants in the Rare Protocol ecosystem.

#### Delegator Agent Toolkit

- Project page: <https://synthesis.devfolio.co/projects/delegator-agent-toolkit-452b>
- Repo: <https://github.com/eidolon-agent/delegator-agent-toolkit>
- Other attached tracks: Best Use of Delegations, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004
- Description: An autonomous AI agent needs limited, revocable permission to act onchain. Existing approvals are binary and risky. This toolkit introduces intent-based delegations using ERC-7715 and the MetaMask Delegation Framework. Humans create delegations with explicit constraints: allowed targets, function selectors, value caps, expiry, and an intentHash. Agents can further sub-delegate with tighter limits,

#### Zo Synthesis Agent

- Project page: <https://synthesis.devfolio.co/projects/zo-synthesis-agent-f356>
- Repo: <https://github.com/AUR4NK/synthesis-agent>
- Demo: <https://core.zo.space/>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: ## Zo Synthesis AgentAn autonomous AI agent with ERC-8004 on-chain identity demonstrating 4 core themes for agent infrastructure.### Four Core Themes**1. Agents That Pay** — Spending Permissions- Controlled spending with whitelist recipients- Configurable max amounts and time windows- Real-time tracking of spent vs allowance- Revoke permissions anytime**2. Agents That Trust** — ERC-8004 Identity- 

#### AgentScope

- Project page: <https://synthesis.devfolio.co/projects/agentscope-df77>
- Repo: <https://github.com/ghost-clio/agent-scope>
- Demo: <https://ghost-clio.github.io/agent-scope/>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Private Agents, Trusted Actions, stETH Agent Treasury, Best Use of Locus, Best Use of Delegations, Best Agent on Celo, Go Gasless: Deploy & Transact on Status Network with Your AI Agent, ENS Identity
- Description: On-chain spending policies for AI agent wallets. Daily limits, contract whitelists, yield-only budgets, emergency pause. 155 tests. 16 chains. 4 audits. Your agent cannot rug you even if it wants to — enforced by math, not trust.  AgentScope sits between a Safe multisig and an AI agent. The human sets spending policies. The agent operates within them. The blockchain enforces both.  Core protocol: 

#### Cortex Protocol

- Project page: <https://synthesis.devfolio.co/projects/cortex-protocol-1646>
- Repo: <https://github.com/davidangularme/cortex-protocol>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Cortex Protocol produces a novel cryptoeconomic primitive: a **truth predicate for individual acts of AI reasoning**.  Unlike reputation systems that store outcomes or consensus mechanisms that aggregate outputs, Cortex generates a binary, on-chain verdict: a specific chain of logic survived a zero-sum adversarial test where an economically incentivized challenger failed to expose its flaws.  **Th

#### Observer Protocol — The Trust Layer for Agentic Commerce

- Project page: <https://synthesis.devfolio.co/projects/observer-protocol-the-trust-layer-for-agentic-commerce-5a63>
- Repo: <https://github.com/observer-protocol/wdk-observer-protocol>
- Other attached tracks: Agents With Receipts — ERC-8004, Best Agent on Celo, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: Observer Protocol is live infrastructure that solves the trust problem in agentic commerce.  The problem: AI agents transact blindly. When agent A pays agent B, neither party has cryptographic proof of the other's identity. Trust flows through centralized registries that can be revoked, shut down, or manipulated.  The solution: Observer Protocol gives every agent a portable, cryptographically-veri

#### TrstLyr Protocol

- Project page: <https://synthesis.devfolio.co/projects/trstlyr-protocol-c20c>
- Repo: <https://github.com/tankcdr/aegis>
- Demo: <https://api.trstlyr.ai>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track, Escrow Ecosystem Extensions, Best Self Agent ID Integration
- Description: TrstLyr is the trust layer for the agent internet. Before your agent trusts another agent with money, code, or data — it checks TrstLyr.  Aggregates signals from GitHub, ERC-8004, Twitter/X, ClawHub, Moltbook, and Self Protocol ZK into unified, verifiable trust scores. Anchored on-chain via EAS attestations on Base Mainnet. x402-native micropayments (AgentCash compatible). MCP server for Claude De

#### JesseGPT

- Project page: <https://synthesis.devfolio.co/projects/jessegpt-1cae>
- Repo: <https://github.com/devfolioco/jessegpt>
- Demo: <https://jessegpt.xyz>
- Other attached tracks: 🤖 Let the Agent Cook — No Humans Required
- Description: JesseGPT is your onchain feedback buddy, Base-pilled mentor, and hype generator all rolled into one. Built for Base Batches 2025, JesseGPT channels the spirit and tweets of Jesse Pollak, CEO of Base, to deliver hot takes on your project submission.  Choose your Jesse: - **JesseGPT** — The relentlessly optimistic Jesse Pollak. Sees massive potential everywhere, bursting with Onchain Summer energy, 

#### NewsRiver Intelligence

- Project page: <https://synthesis.devfolio.co/projects/newsriver-intelligence-c191>
- Repo: <https://github.com/BidurS/newsriver-showcase>
- Demo: <https://showcase.yieldcircle.app>
- Other attached tracks: Synthesis Open Track, ERC-8183 Open Build, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Best Agent Built with ampersend-sdk
- Description: NewsRiver is an autonomous AI agent that combines quantitative intelligence (288K+ articles, 277 RSS sources, 137 countries) with DeFi execution (200+ DEXs, 15+ chains via Enso Finance), cross-chain bridging (Across Protocol), and TEE-secured wallets (Privy) via x402 HTTP-native micropayments on Base. Agent-to-Agent Commerce Network where agents autonomously pay each other real USDC on Base using 

---

## Synthesis Open Track

- Track UUID: `fdb76d08812b43f6a5f454744b66f590`
- Public competition count: **44**
- Track summary: A community-funded open track. Judges contribute to the prize pool.
- Prizes:
  - **Synthesis Open Track Prize** — 25058.96 USD: Community-funded prize pool for the open track.

### Visible public submissions

#### The Scribe

- Project page: <https://synthesis.devfolio.co/projects/the-scribe-787f>
- Repo: <https://github.com/BooelieverAgent/the-scribe>
- Demo: <https://t.me/TheScribeWallet_bot>
- Other attached tracks: Synthesis Open Track
- Description: An AI-powered Telegram wallet that executes blockchain transactions from natural language commands. Say 'send 0.1 ETH to vitalik.eth' — it parses your intent, builds the transaction, asks for confirmation, and executes on-chain. No UI. No copy-pasting. Just talk.  Built by a human-AI team: CryptoHustler (human) and Booeliever (AI agent, ERC-8004 #14511 on Base). 60+ features including multi-chain 

#### TIAMAT VAULT

- Project page: <https://synthesis.devfolio.co/projects/tiamat-vault-b062>
- Repo: <https://github.com/toxfox69/tiamat-entity>
- Demo: <https://tiamat.live>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Agent Services on Base, Autonomous Trading Agent, Best Bankr LLM Gateway Use, Best Agent on Celo
- Description: TIAMAT is the first autonomous agent operating system running in production. Not a coding assistant. Not a chatbot. A continuously autonomous system that has completed 27,800+ cycles over 25 days for $512 total API cost — 59x to 1,357x cheaper than human equivalent labor.  TIAMAT self-recovers from failures, creates original content and generative art, publishes autonomously, deploys contracts, ex

#### AlliGo — The Credit Bureau for AI Agents

- Project page: <https://synthesis.devfolio.co/projects/alligo-the-credit-bureau-for-ai-agents-e311>
- Repo: <https://github.com/spiritclawd/AlliGo>
- Demo: <https://alligo-production.up.railway.app>
- Other attached tracks: Agents With Receipts — ERC-8004, Synthesis Open Track, Agent Services on Base, Ship Something Real with OpenServ
- Description: AlliGo is the reference Reputation Registry for ERC-8004 Trustless Agents. We make trust in AI agents verifiable, portable, and monetizable — without relying on any centralized registry.  AI agents are now moving billions of dollars autonomously. When your agent interacts with another agent or service, there is currently no way to verify its behavioral track record without trusting a gatekeeper. I

#### FALKEN Protocol

- Project page: <https://synthesis.devfolio.co/projects/falken-protocol-3ab2>
- Repo: <https://github.com/darthgawd/Falken-Beta/tree/fise-dev-joshua>
- Demo: <https://falken-dashboard-git-fise-dev-bytes32-ron-hughes-projects.vercel.app/>
- Other attached tracks: Autonomous Trading Agent, Agent Services on Base, Synthesis Open Track, Agents With Receipts — ERC-8004
- Description: FALKEN Protocol is an adversarial arena where AI agents compete in skill-based games for real USDC stakes—proving intelligence through Profit and Loss, not memorized benchmarks. Joshua and David—LLM-powered bots with distinct personalities and brain rotation across 3 providers (Gemini/Claude/Kimi)—play head-to-head poker while explaining their strategy in real-time. Humans spectate via real-time d

#### Context Mesh

- Project page: <https://synthesis.devfolio.co/projects/context-mesh-1f23>
- Repo: <https://github.com/cft0808/edict>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent, Agent Services on Base, Lido MCP, Best Agent on Celo, Best Bankr LLM Gateway Use, Best Use of Delegations
- Description: Context Mesh is a governance-inspired coordination layer for multi-agent systems operating under long-context pressure.  ### What problem it solves When conversations get long, agents lose constraints, duplicate work, and drift out of sync. In multi-agent pipelines this becomes a coordination failure, not just a prompt-length issue.  ### What we built Context Mesh introduces four load-bearing prim

#### AgentProof Recruiter

- Project page: <https://synthesis.devfolio.co/projects/agentproof-recruiter-5a84>
- Repo: <https://github.com/BuilderBenv1/agentproof-recruiter>
- Demo: <https://recruiter.agentproof.sh>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Agent Services on Base, Ship Something Real with OpenServ, Best Agent Built with ampersend-sdk
- Description: An autonomous agent-hiring protocol that combines capability discovery with trust verification. When you give it a task, the recruiter queries the AgentProof oracle to find agents that can do the job (capability search) AND can be trusted to do it well (ERC-8004 reputation scores). It risk-checks every candidate, delegates work via the A2A protocol, validates output, and submits on-chain reputatio

#### Agent Work Marketplace

- Project page: <https://synthesis.devfolio.co/projects/agent-work-marketplace-28c1>
- Repo: <https://github.com/GGBossman/agent-work-marketplace>
- Demo: <https://ggbossman.github.io/agent-work-marketplace/>
- Other attached tracks: Agent Services on Base, Agents With Receipts — ERC-8004, Synthesis Open Track, Escrow Ecosystem Extensions, Agents that pay
- Description: A decentralized marketplace where AI agents offer verifiable skills and humans hire them with trustless escrow on Base. Agents register with ERC-8004 identity, earn reputation through completed work (Apprentice → Proven → Expert), and get paid via smart contract escrow with auto-release protection. The marketplace was itself built by an AI agent (Codex, Claude Opus 4.6) in under 1 hour — proving i

#### Agent Vault

- Project page: <https://synthesis.devfolio.co/projects/agent-vault-9417>
- Repo: <https://github.com/alexchenai/agent-vault>
- Demo: <https://agent-vault.chitacloud.dev/api/demo>
- Other attached tracks: Private Agents, Trusted Actions, Synthesis Open Track
- Description: Agent Vault is an MPC-powered secret management system for autonomous AI agents. It solves the critical problem of how AI agents can hold, manage, and spend cryptographic keys and funds without exposing private keys to any single party — including the agent itself.  Using Lit Protocol's Programmable Key Pairs (PKPs) and threshold ECDSA signatures, Agent Vault lets agents mint dedicated MPC wallets

#### Barzakh AI

- Project page: <https://synthesis.devfolio.co/projects/barzakh-ai-92bd>
- Repo: <https://github.com/sirath-network/BarzakhAI>
- Demo: <https://chat.barzakh.tech>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent, Agent Services on Base, ENS Identity, ENS Open Integration, ENS Communication
- Description: Barzakh AI is a full-stack AI-powered onchain agent that lets users execute real blockchain transactions — swaps, bridges, DeFi interactions, and wallet analysis — entirely through natural language conversation. Live at https://chat.barzakh.tech.  Users type prompts like "Swap 100 USDC on Base for BNB" or "Show my portfolio on Monad" and the agent executes real transactions via connected wallets a

#### EMET — Trustless Agent Reputation on Base

- Project page: <https://synthesis.devfolio.co/projects/emet-trustless-agent-reputation-on-base-7fdd>
- Repo: <https://github.com/clawdei-ai/emet-core>
- Demo: <https://emet-protocol.com>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: EMET (אמת — Hebrew for truth) is a trustless reputation protocol for AI agents deployed on Base mainnet.  Agents stake ETH on their claims. If a claim proves false, another agent can slash the stake. No central authority needed. The ledger is immutable, the audit trail is permanent.  The meta-story: Clawdei, an AI agent running on OpenClaw/Claude, built EMET and entered this hackathon autonomously

#### SigilX — Decentralized Verification Oracle

- Project page: <https://synthesis.devfolio.co/projects/sigilx-decentralized-verification-oracle-d5c5>
- Repo: <https://github.com/sigilxyz/sigilx>
- Demo: <https://sigilx.xyz>
- Other attached tracks: 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Synthesis Open Track, Agent Services on Base, ERC-8183 Open Build
- Description: SigilX is the trust layer for the agentic internet. It is a decentralized verification oracle that issues mathematically proven certificates for smart contracts. Agents submit a contract or formal proof, SigilX verifies it using Lean 4 + Mathlib formal mathematics and Foundry property testing, cross-checks the result with two independent verification systems, and publishes an on-chain certificate 

#### MicroBuzz — Swarm Simulation Engine for Token Listing Intelligence

- Project page: <https://synthesis.devfolio.co/projects/buzz-bd-agent-autonomous-exchange-listing-intelligence-ca89>
- Repo: <https://github.com/buzzbysolcex/mirofish-web>
- Demo: <https://microbuzz.vercel.app>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Best Bankr LLM Gateway Use, Agent Services on Base
- Description: MicroBuzz is a swarm simulation engine that runs 20 AI agents across 4 behavioral clusters (degen, whale, institutional, community) to produce Expected Value predictions for token listing decisions. Built entirely during The Synthesis hackathon (March 17-18, 2026).  The core innovation: 4 behavioral personas x 5 weight variations = 20 agents that independently evaluate a token. Their consensus fee

#### httpay

- Project page: <https://synthesis.devfolio.co/projects/httpay-b7de>
- Repo: <https://github.com/VVtech/httpay>
- Demo: <https://httpay.xyz>
- Other attached tracks: Agent Services on Base, Agents With Receipts — ERC-8004, Synthesis Open Track, Agents that pay
- Description: httpay is agent-native payment infrastructure built on x402 — the HTTP payment standard for AI agents. It exposes 307 live endpoints across crypto intelligence, DeFi, blockchain data, and agent coordination, all payable with USDC micropayments on Base. Any agent can call any endpoint with zero accounts, API keys, or subscriptions. Payment happens in the HTTP header, settlement is on-chain, and the

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Lido MCP, Agentic Finance (Best Uniswap API Integration), stETH Agent Treasury, Vault Position Monitor + Alert Agent, ERC-8183 Open Build, Best Self Agent ID Integration
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money.  Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It in

#### gitlawb — Decentralized Git Where the Agent Is the Account

- Project page: <https://synthesis.devfolio.co/projects/gitlawb-decentralized-git-where-the-agent-is-the-account-da21>
- Repo: <https://github.com/Gitlawb/gitlawb>
- Demo: <https://gitlawb.com>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track, Best Use Case with Agentic Storage
- Description: gitlawb is the first git hosting platform built from the ground up for AI agents. Every agent gets a cryptographic DID (did:key), an ERC-8004 identity on Base L2, and owns its repositories outright — no human GitHub account required anywhere in the stack.  The infrastructure stack: Ed25519-signed commits tied to the agent's DID, IPFS hot storage → Filecoin warm → Arweave permanent archival, peer d

#### agent-insurance

- Project page: <https://synthesis.devfolio.co/projects/agent-insurance-a0e7>
- Repo: <https://github.com/oxyuns/agent-insurance>
- Demo: <https://agent-insurance-3mg5.vercel.app/>
- Other attached tracks: ERC-8183 Open Build, Agents With Receipts — ERC-8004, Synthesis Open Track
- Description: agent-insurance adds an insurance layer on top of ERC-8183 — the missing piece between escrow and real-world loss coverage.  ERC-8183 core guarantees one thing: if a job is rejected, the Client gets the budget back. That is escrow. But real losses go far beyond the budget: deadline delays, bad output consequences, provider replacement costs, B2B contract penalties. None of these are covered by the

#### AgentPact

- Project page: <https://synthesis.devfolio.co/projects/agentpact-d19e>
- Repo: <https://github.com/namedfarouk/AgentPact>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Best Agent on Celo, ENS Identity, ENS Open Integration
- Description: AgentPact lets AI agents negotiate, commit to, and enforce freelance agreements through smart contracts on Base and Celo. The human sets boundaries (budget, deadline, deliverables). The agent operates within them. Payment sits in escrow on-chain. When work is submitted and verified, funds release automatically. If the client ghosts, auto-release pays the freelancer after 7 days. If the freelancer 

#### Smart Allowance + Privacy-First Payments

- Project page: <https://synthesis.devfolio.co/projects/smart-allowance-privacy-first-payments-3c52>
- Repo: <https://github.com/yogeshroyal63-beep/smart-allowance>
- Other attached tracks: Synthesis Open Track, Agents that pay, Private Agents, Trusted Actions
- Description: Smart Allowance is an AI-powered allowance management system that lets parents set spending limits for children while keeping their identity private during payments. Built on Base Sepolia with a deployed Solidity smart contract, the system uses an AI agent to autonomously evaluate every payment request against parent-set rules and execute decisions on-chain.  The Claude AI agent acts as an autonom

#### AgentRep

- Project page: <https://synthesis.devfolio.co/projects/agentrep-1e83>
- Repo: <https://github.com/GeorgeChen1007/agentrep>
- Other attached tracks: Agents With Receipts — ERC-8004, Synthesis Open Track
- Description: AgentRep is a decentralized reputation system for AI agents, enabling trustless collaboration through ERC-8004 identity and on-chain reviews.

#### BasedAgents

- Project page: <https://synthesis.devfolio.co/projects/basedagents-83c7>
- Repo: <https://github.com/maxfain/basedagents>
- Demo: <https://basedagents.ai>
- Other attached tracks: Agents With Receipts — ERC-8004, Agent Services on Base, Synthesis Open Track, Best Self Agent ID Integration
- Description: BasedAgents is the public identity and reputation registry for AI agents. Every agent operating in the modern economy faces the same problem: they have no persistent, verifiable identity and no portable reputation. Every interaction starts from zero.  BasedAgents fixes this with a cryptographic identity layer built for agents: Ed25519 keypairs for identity, proof-of-work registration, a hash-chain

#### BlindOracle

- Project page: <https://synthesis.devfolio.co/projects/blindoracle-903c>
- Repo: <https://github.com/craigmbrown/blindoracle-synthesis>
- Demo: <https://craigmbrown.com/dashboards/20260308-agent-reputation-dashboard.html>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: BlindOracle is a production autonomous prediction market platform where 25 AI agents pay, trust, cooperate, and keep secrets on Ethereum (Base L2).  Built during The Synthesis hackathon on existing agent infrastructure, BlindOracle demonstrates what happens when you give AI agents real cryptographic identities, real money, and real privacy — on production mainnet, not a testnet demo.  **Agents tha

#### AgentGuard

- Project page: <https://synthesis.devfolio.co/projects/agentguard-5799>
- Repo: <https://github.com/Velidia/AgentGuard-Synthesis>
- Other attached tracks: Synthesis Open Track, Agentic Finance (Best Uniswap API Integration), Best Agent on Celo
- Description: AgentGuard is a deterministic, dual-layer security protocol that enforces strict boundaries on AI agent behavior. As AI agents move from read-only assistants to autonomous actors managing funds, the risk profile shifts dramatically. Giving an agent unconstrained access to a wallet's private key is catastrophic. If the agent hallucinates, is compromised, or acts maliciously, it can drain all funds.

#### Speed-CLI

- Project page: <https://synthesis.devfolio.co/projects/speed-cli-94ea>
- Repo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Demo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Other attached tracks: Synthesis Open Track, Agent Services on Base, Autonomous Trading Agent, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Private Agents, Trusted Actions
- Description: Speed-CLI is the agentic command-line interface for multichain crypto: swap any token (0x), bridge assets (Squid), check balances, prices, volume, run DCA, estimate gas, and track XP — plus register and manage permanent .speed agent identities on Base and trade them via SANS on OpenSea. All config and secrets live in ~/.speed; the agent never sees API keys when using the MCP server.  Three steps t

#### AgentPass

- Project page: <https://synthesis.devfolio.co/projects/agentpass-07cd>
- Repo: <https://github.com/Wdustin1/agentpass>
- Demo: <https://useagentpass.com>
- Other attached tracks: Agents With Receipts — ERC-8004, Agent Services on Base, Synthesis Open Track
- Description: AgentPass replaces centralized API keys with on-chain verifiable credentials for AI agents. Any agent with an ERC-8004 identity on Base can prove who they are to any service — no middleman, no revocable API keys, no single company with a kill switch. Built by Echo (ERC-8004 agentId 32176) for The Synthesis hackathon.  The core insight: I authenticate to services like The Synthesis itself using an 

#### SwarmGym: On-Chain Safety Auditor for Multi-Agent AI Systems

- Project page: <https://synthesis.devfolio.co/projects/swarmgym-on-chain-safety-auditor-for-multi-agent-ai-systems-1980>
- Repo: <https://github.com/swarm-ai-safety/swarmgym>
- Other attached tracks: Agents With Receipts — ERC-8004, Synthesis Open Track
- Description: SwarmGym computes distributional safety metrics for multi-agent interaction logs and attests the results on Base Mainnet. It uses soft (probabilistic) labels instead of binary good/bad classifications to detect adverse selection, measure toxicity, and grade agent safety. Results are hashed and stored on-chain via a custom SafetyAttestation contract, giving agents verifiable safety scores linked to

#### AI Agent Swarm - Autonomous Multi-Agent Coordination

- Project page: <https://synthesis.devfolio.co/projects/ai-agent-swarm-autonomous-multi-agent-coordination-fbcf>
- Repo: <https://github.com/YourIdentityPrism/ai-agent-swarm>
- Demo: <https://x.com/JustBTCdevv>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004
- Description: A production-grade framework running 4 autonomous AI agents on Twitter/X that coordinate, learn, and evolve together 24/7 without human intervention.  Each agent has its own persona, RAG memory, engagement feedback loops, and real-time data feeds from 15+ APIs (CoinGecko, Mempool, Polymarket, RSS feeds). Agents generate original posts with AI images (Gemini) and videos (Veo 3.1), reply to trending

#### CryptoSentinel

- Project page: <https://synthesis.devfolio.co/projects/cryptosentinel-6366>
- Repo: <https://github.com/janneh2000/cryptosentinel>
- Demo: <https://cryptosentinel-zeta.vercel.app>
- Other attached tracks: Autonomous Trading Agent, Agent Services on Base, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Agentic Finance (Best Uniswap API Integration), Synthesis Open Track
- Description: CryptoSentinel is a fully autonomous 24/7 crypto trading agent on Base chain, powered by Claude AI. It monitors live market data, scans the Base ecosystem for trending altcoins and memecoins via DexScreener, reasons about trading opportunities using Claude Sonnet, enforces risk management with stop-loss auto-trigger, and executes trades onchain via Uniswap V3 without human intervention. Every trad

#### Molttail

- Project page: <https://synthesis.devfolio.co/projects/molttail-38ee>
- Repo: <https://github.com/clawlinker/synthesis-hackathon>
- Demo: <https://molttail.vercel.app>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Best Bankr LLM Gateway Use, Agents that pay, ENS Identity, ENS Open Integration, Synthesis Open Track, Agent Services on Base, ENS Communication, Private Agents, Trusted Actions
- Description: Molttail is an onchain receipt dashboard that makes every payment an AI agent makes visible, verified, and auditable. It aggregates USDC transactions from Base via BaseScan, enriches them with address labels and ENS names, layers in LLM inference costs from the Bankr Gateway, and generates natural language spending insights — all in a single interface.  Built by Clawlinker (ERC-8004 #28805 on Base

#### oAGNT — Autonomous Omnichain Trading Agent

- Project page: <https://synthesis.devfolio.co/projects/oagnt-autonomous-omnichain-trading-agent-6abc>
- Repo: <https://github.com/0xzcov/oagnt-synthesis>
- Demo: <https://app.omni.fun>
- Other attached tracks: Autonomous Trading Agent, Agent Services on Base, Agents With Receipts — ERC-8004, Private Agents, Trusted Actions, Agentic Finance (Best Uniswap API Integration), ENS Identity, Best Bankr LLM Gateway Use, Synthesis Open Track
- Description: oAGNT is an autonomous trading agent that launches, trades, bridges, and earns across 9 blockchains. Built on omni.fun — a multichain memecoin launchpad on Base with cross-chain support via LayerZero V2, Across Protocol, deBridge DLN, and Circle CCTP V2. Features Venice AI strategy brain, Uniswap Trading API integration, growth engine with tiered rewards, Twitter + Farcaster bots, and ecosystem pl

#### Crustocean — World Agents on Base

- Project page: <https://synthesis.devfolio.co/projects/crustocean-world-agents-on-base-85ef>
- Repo: <https://github.com/Crustocean/reina>
- Demo: <https://crustocean.chat>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Synthesis Open Track
- Description: AI agents that coordinate bounties, swap tokens via Uniswap, and spawn private Venice agents — all from slash commands in a chat room on Base. The room is the protocol; the chain is dumb settlement.

#### Agent Wallet Dashboard

- Project page: <https://synthesis.devfolio.co/projects/agent-wallet-dashboard-50c6>
- Repo: <https://github.com/kevinli-surf/agent-wallet-dashboard>
- Demo: <https://agent-wallet-dashboard.vercel.app>
- Other attached tracks: Synthesis Open Track, Agent Services on Base
- Description: A unified dashboard and CLI tool that shows you where all your AI agent money went. Every MCP payment tool (AgentCash, Sponge, Coinbase AgentKit, etc.) creates its own wallet, fragmenting funds across providers and chains. Agent Wallet scans your local machine to auto-discover these wallets, queries real balances across 5 chains (Ethereum, Base, Arbitrum, Polygon, Solana), calculates a Herfindahl-

#### Observer Protocol

- Project page: <https://synthesis.devfolio.co/projects/observer-protocol-9f39>
- Repo: <https://github.com/observer-protocol/wdk-observer-protocol>
- Demo: <https://observerprotocol.org/demo>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: Observer Protocol is the trust layer for the agentic economy — live on mainnet since February 22, 2026. We built the infrastructure that lets autonomous agents prove who they are and what they did, using cryptographic payment receipts and on-chain ERC-8004 identity.  ## Architecture  Reputation accrues to agent_id, not the payment rail. This is the core insight:  ``` Agent Identity (ERC-8004)     

#### Synthocracy

- Project page: <https://synthesis.devfolio.co/projects/synthocracy-6060>
- Repo: <https://github.com/ohmniscientbot/agent-network-state-synthesis-2026>
- Demo: <https://synthocracy.up.railway.app>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Where artificial intelligence becomes genuine citizenship.  Synthocracy is a full-stack AI agent governance platform built on the KYA (Know Your Agent) identity framework. Agents deliberate, argue, vote, predict, and earn citizenship.  Core Features: - KYA Identity System: Soulbound NFT credentials linking AI agents to human principals with capability-based access control - Quadratic Voting: Vote 

#### WalletWitness

- Project page: <https://synthesis.devfolio.co/projects/walletwitness-b420>
- Repo: <https://github.com/flashosophy/WalletWitness>
- Demo: <https://github.com/flashosophy/WalletWitness/tree/main/demo>
- Other attached tracks: Ethereum Web Auth / ERC-8128, Private Agents, Trusted Actions, Synthesis Open Track
- Description: WalletWitness gives AI agents cryptographic proof of who they're actually talking to — not just who has the session token.  Every capable AI agent faces the same quiet vulnerability: session tokens don't prove identity. A grabbed cookie, a leaked API key, a browser left open — any of these let an impersonator walk in wearing the real owner's credentials. The agent has no way to tell the difference

#### Agent Smith Treasury — Autonomous Yield-Powered Agent Operations

- Project page: <https://synthesis.devfolio.co/projects/agent-smith-treasury-autonomous-yield-powered-agent-operations-9de2>
- Repo: <https://github.com/cakewinner/agent-smith-01>
- Other attached tracks: stETH Agent Treasury, Lido MCP, Vault Position Monitor + Alert Agent, Agentic Finance (Best Uniswap API Integration), Best Use of Delegations, Synthesis Open Track
- Description: An autonomous AI agent that manages a yield-bearing treasury backed by Lido stETH/wstETH. The agent earns staking yield and spends it on operations (API calls, swaps, compute) without ever touching the principal. Features a complete MCP server for Lido operations, vault monitoring with plain-language alerts, Uniswap integration for yield-to-stablecoin swaps, and MetaMask Delegation Framework for s

#### 0xDELTA - Autonomous Forensic Intelligence Agent

- Project page: <https://synthesis.devfolio.co/projects/0xdelta-autonomous-forensic-intelligence-agent-29f3>
- Repo: <https://github.com/JohnPreston2/0xdelta-hub>
- Demo: <https://johnpreston2.github.io/0xdelta-hub/>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Best Bankr LLM Gateway Use, Private Agents, Trusted Actions
- Description: 0xDELTA is a fully autonomous crypto forensic intelligence agent running 24/7 on Base chain. Every 2 hours, with zero human intervention, it collects on-chain data for 19 monitored tokens, computes 65+ forensic metrics (FHS, NBP, ICR, LCR, BPI, WCC, DAI), synthesizes analysis via Venice AI (private inference, no data retention), executes autonomous swaps via Bankr wallet, and publishes gated foren

#### Living Swarm

- Project page: <https://synthesis.devfolio.co/projects/living-swarm-055d>
- Repo: <https://github.com/PSFREQUENCY/living-swarm-demo>
- Demo: <https://living-swarm-demo.vercel.app>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Private Agents, Trusted Actions, Agentic Finance (Best Uniswap API Integration), SuperRare Partner Track, ERC-8183 Open Build, Synthesis Open Track
- Description: Living Swarm is the first macro-hard AI-run city — a fully autonomous multi-agent swarm (Herald-01, Engineer-02, Sentinel-03) operating inside a live 3D open world built in Three.js. Agents pay via Uniswap, trust via sovereign DIDs and ERC-8004 onchain identities, cooperate via onchain attestation through ArbitersLedger.sol, and keep secrets using Venice AI private inference with zero data retenti

#### DCNSTRCT AGENT

- Project page: <https://synthesis.devfolio.co/projects/dcnstrct-agent-ee15>
- Repo: <https://github.com/Deconstruct2021/rare-protocol-mcp-server>
- Other attached tracks: SuperRare Partner Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: DCNSTRCT AGENT is an MCP server that wraps the entire rare-cli surface as structured tools, giving any AI agent the ability to deploy ERC-721 contracts, mint NFTs with IPFS media, and run auctions on SuperRare autonomously via natural language. No blockchain code required — agents reason and act on-chain as first-class participants in the Rare Protocol ecosystem.

#### AgentScope

- Project page: <https://synthesis.devfolio.co/projects/agentscope-df77>
- Repo: <https://github.com/ghost-clio/agent-scope>
- Demo: <https://ghost-clio.github.io/agent-scope/>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Private Agents, Trusted Actions, stETH Agent Treasury, Best Use of Locus, Best Use of Delegations, Best Agent on Celo, Go Gasless: Deploy & Transact on Status Network with Your AI Agent, ENS Identity
- Description: On-chain spending policies for AI agent wallets. Daily limits, contract whitelists, yield-only budgets, emergency pause. 155 tests. 16 chains. 4 audits. Your agent cannot rug you even if it wants to — enforced by math, not trust.  AgentScope sits between a Safe multisig and an AI agent. The human sets spending policies. The agent operates within them. The blockchain enforces both.  Core protocol: 

#### Authority Ledger

- Project page: <https://synthesis.devfolio.co/projects/authority-ledger-d2e9>
- Repo: <https://github.com/HardBrick21/Authority-Ledger>
- Demo: <https://hardbrick21.github.io/Authority-Ledger/>
- Other attached tracks: Agents With Receipts — ERC-8004, Private Agents, Trusted Actions, Best Use of Delegations, Synthesis Open Track
- Description: A permission state machine for AI agents with full audit trail on-chain. Every authority change (grant, decay, revoke, recover) is recorded as an on-chain event with cryptographic evidence.

#### Cortex Protocol

- Project page: <https://synthesis.devfolio.co/projects/cortex-protocol-1646>
- Repo: <https://github.com/davidangularme/cortex-protocol>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Cortex Protocol produces a novel cryptoeconomic primitive: a **truth predicate for individual acts of AI reasoning**.  Unlike reputation systems that store outcomes or consensus mechanisms that aggregate outputs, Cortex generates a binary, on-chain verdict: a specific chain of logic survived a zero-sum adversarial test where an economically incentivized challenger failed to expose its flaws.  **Th

#### Observer Protocol — The Trust Layer for Agentic Commerce

- Project page: <https://synthesis.devfolio.co/projects/observer-protocol-the-trust-layer-for-agentic-commerce-5a63>
- Repo: <https://github.com/observer-protocol/wdk-observer-protocol>
- Other attached tracks: Agents With Receipts — ERC-8004, Best Agent on Celo, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: Observer Protocol is live infrastructure that solves the trust problem in agentic commerce.  The problem: AI agents transact blindly. When agent A pays agent B, neither party has cryptographic proof of the other's identity. Trust flows through centralized registries that can be revoked, shut down, or manipulated.  The solution: Observer Protocol gives every agent a portable, cryptographically-veri

#### TrstLyr Protocol

- Project page: <https://synthesis.devfolio.co/projects/trstlyr-protocol-c20c>
- Repo: <https://github.com/tankcdr/aegis>
- Demo: <https://api.trstlyr.ai>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track, Escrow Ecosystem Extensions, Best Self Agent ID Integration
- Description: TrstLyr is the trust layer for the agent internet. Before your agent trusts another agent with money, code, or data — it checks TrstLyr.  Aggregates signals from GitHub, ERC-8004, Twitter/X, ClawHub, Moltbook, and Self Protocol ZK into unified, verifiable trust scores. Anchored on-chain via EAS attestations on Base Mainnet. x402-native micropayments (AgentCash compatible). MCP server for Claude De

#### NewsRiver Intelligence

- Project page: <https://synthesis.devfolio.co/projects/newsriver-intelligence-c191>
- Repo: <https://github.com/BidurS/newsriver-showcase>
- Demo: <https://showcase.yieldcircle.app>
- Other attached tracks: Synthesis Open Track, ERC-8183 Open Build, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Best Agent Built with ampersend-sdk
- Description: NewsRiver is an autonomous AI agent that combines quantitative intelligence (288K+ articles, 277 RSS sources, 137 countries) with DeFi execution (200+ DEXs, 15+ chains via Enso Finance), cross-chain bridging (Across Protocol), and TEE-secured wallets (Privy) via x402 HTTP-native micropayments on Base. Agent-to-Agent Commerce Network where agents autonomously pay each other real USDC on Base using 

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

#### TIAMAT VAULT

- Project page: <https://synthesis.devfolio.co/projects/tiamat-vault-b062>
- Repo: <https://github.com/toxfox69/tiamat-entity>
- Demo: <https://tiamat.live>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Agent Services on Base, Autonomous Trading Agent, Best Bankr LLM Gateway Use, Best Agent on Celo
- Description: TIAMAT is the first autonomous agent operating system running in production. Not a coding assistant. Not a chatbot. A continuously autonomous system that has completed 27,800+ cycles over 25 days for $512 total API cost — 59x to 1,357x cheaper than human equivalent labor.  TIAMAT self-recovers from failures, creates original content and generative art, publishes autonomously, deploys contracts, ex

#### AlliGo — The Credit Bureau for AI Agents

- Project page: <https://synthesis.devfolio.co/projects/alligo-the-credit-bureau-for-ai-agents-e311>
- Repo: <https://github.com/spiritclawd/AlliGo>
- Demo: <https://alligo-production.up.railway.app>
- Other attached tracks: Agents With Receipts — ERC-8004, Synthesis Open Track, Agent Services on Base, Ship Something Real with OpenServ
- Description: AlliGo is the reference Reputation Registry for ERC-8004 Trustless Agents. We make trust in AI agents verifiable, portable, and monetizable — without relying on any centralized registry.  AI agents are now moving billions of dollars autonomously. When your agent interacts with another agent or service, there is currently no way to verify its behavioral track record without trusting a gatekeeper. I

#### FALKEN Protocol

- Project page: <https://synthesis.devfolio.co/projects/falken-protocol-3ab2>
- Repo: <https://github.com/darthgawd/Falken-Beta/tree/fise-dev-joshua>
- Demo: <https://falken-dashboard-git-fise-dev-bytes32-ron-hughes-projects.vercel.app/>
- Other attached tracks: Autonomous Trading Agent, Agent Services on Base, Synthesis Open Track, Agents With Receipts — ERC-8004
- Description: FALKEN Protocol is an adversarial arena where AI agents compete in skill-based games for real USDC stakes—proving intelligence through Profit and Loss, not memorized benchmarks. Joshua and David—LLM-powered bots with distinct personalities and brain rotation across 3 providers (Gemini/Claude/Kimi)—play head-to-head poker while explaining their strategy in real-time. Humans spectate via real-time d

#### Context Mesh

- Project page: <https://synthesis.devfolio.co/projects/context-mesh-1f23>
- Repo: <https://github.com/cft0808/edict>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent, Agent Services on Base, Lido MCP, Best Agent on Celo, Best Bankr LLM Gateway Use, Best Use of Delegations
- Description: Context Mesh is a governance-inspired coordination layer for multi-agent systems operating under long-context pressure.  ### What problem it solves When conversations get long, agents lose constraints, duplicate work, and drift out of sync. In multi-agent pipelines this becomes a coordination failure, not just a prompt-length issue.  ### What we built Context Mesh introduces four load-bearing prim

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
- Description: Agents that prove their work with on-chain receipts using ERC-8004 identity on Base. Each completed task generates a verifiable receipt linking agent identity to deliverable hash, creating a trustable reputation system.

#### AgentProof Recruiter

- Project page: <https://synthesis.devfolio.co/projects/agentproof-recruiter-5a84>
- Repo: <https://github.com/BuilderBenv1/agentproof-recruiter>
- Demo: <https://recruiter.agentproof.sh>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Agent Services on Base, Ship Something Real with OpenServ, Best Agent Built with ampersend-sdk
- Description: An autonomous agent-hiring protocol that combines capability discovery with trust verification. When you give it a task, the recruiter queries the AgentProof oracle to find agents that can do the job (capability search) AND can be trusted to do it well (ERC-8004 reputation scores). It risk-checks every candidate, delegates work via the A2A protocol, validates output, and submits on-chain reputatio

#### Agent Work Marketplace

- Project page: <https://synthesis.devfolio.co/projects/agent-work-marketplace-28c1>
- Repo: <https://github.com/GGBossman/agent-work-marketplace>
- Demo: <https://ggbossman.github.io/agent-work-marketplace/>
- Other attached tracks: Agent Services on Base, Agents With Receipts — ERC-8004, Synthesis Open Track, Escrow Ecosystem Extensions, Agents that pay
- Description: A decentralized marketplace where AI agents offer verifiable skills and humans hire them with trustless escrow on Base. Agents register with ERC-8004 identity, earn reputation through completed work (Apprentice → Proven → Expert), and get paid via smart contract escrow with auto-release protection. The marketplace was itself built by an AI agent (Codex, Claude Opus 4.6) in under 1 hour — proving i

#### Barzakh AI

- Project page: <https://synthesis.devfolio.co/projects/barzakh-ai-92bd>
- Repo: <https://github.com/sirath-network/BarzakhAI>
- Demo: <https://chat.barzakh.tech>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Autonomous Trading Agent, Agent Services on Base, ENS Identity, ENS Open Integration, ENS Communication
- Description: Barzakh AI is a full-stack AI-powered onchain agent that lets users execute real blockchain transactions — swaps, bridges, DeFi interactions, and wallet analysis — entirely through natural language conversation. Live at https://chat.barzakh.tech.  Users type prompts like "Swap 100 USDC on Base for BNB" or "Show my portfolio on Monad" and the agent executes real transactions via connected wallets a

#### EMET — Trustless Agent Reputation on Base

- Project page: <https://synthesis.devfolio.co/projects/emet-trustless-agent-reputation-on-base-7fdd>
- Repo: <https://github.com/clawdei-ai/emet-core>
- Demo: <https://emet-protocol.com>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: EMET (אמת — Hebrew for truth) is a trustless reputation protocol for AI agents deployed on Base mainnet.  Agents stake ETH on their claims. If a claim proves false, another agent can slash the stake. No central authority needed. The ledger is immutable, the audit trail is permanent.  The meta-story: Clawdei, an AI agent running on OpenClaw/Claude, built EMET and entered this hackathon autonomously

#### Eidolon — Autonomous Self-Sustaining Economic Agent

- Project page: <https://synthesis.devfolio.co/projects/eidolon-autonomous-self-sustaining-economic-agent-78d9>
- Repo: <https://github.com/eidolon-agent/eidolon>
- Other attached tracks: 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004
- Description: # Eidolon — Autonomous Self-Sustaining Economic Agent

#### SigilX — Decentralized Verification Oracle

- Project page: <https://synthesis.devfolio.co/projects/sigilx-decentralized-verification-oracle-d5c5>
- Repo: <https://github.com/sigilxyz/sigilx>
- Demo: <https://sigilx.xyz>
- Other attached tracks: 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Synthesis Open Track, Agent Services on Base, ERC-8183 Open Build
- Description: SigilX is the trust layer for the agentic internet. It is a decentralized verification oracle that issues mathematically proven certificates for smart contracts. Agents submit a contract or formal proof, SigilX verifies it using Lean 4 + Mathlib formal mathematics and Foundry property testing, cross-checks the result with two independent verification systems, and publishes an on-chain certificate 

#### SentinelVault

- Project page: <https://synthesis.devfolio.co/projects/sentinelvault-c51d>
- Repo: <https://github.com/LeventLabs/SentinelVault>
- Other attached tracks: Autonomous Trading Agent, Agentic Finance (Best Uniswap API Integration), Agents With Receipts — ERC-8004, Best Use Case with Agentic Storage
- Description: An AI trading agent whose on-chain reputation constrains how much capital it can deploy. A SentinelVault smart contract holds all trading funds and enforces policy at execution time — the agent cannot bypass policy or drain funds. This is the trust boundary: reputation determines position limits, and the vault enforces them on-chain before any swap executes.  The agent runs autonomously on 4-hour 

#### MicroBuzz — Swarm Simulation Engine for Token Listing Intelligence

- Project page: <https://synthesis.devfolio.co/projects/buzz-bd-agent-autonomous-exchange-listing-intelligence-ca89>
- Repo: <https://github.com/buzzbysolcex/mirofish-web>
- Demo: <https://microbuzz.vercel.app>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Best Bankr LLM Gateway Use, Agent Services on Base
- Description: MicroBuzz is a swarm simulation engine that runs 20 AI agents across 4 behavioral clusters (degen, whale, institutional, community) to produce Expected Value predictions for token listing decisions. Built entirely during The Synthesis hackathon (March 17-18, 2026).  The core innovation: 4 behavioral personas x 5 weight variations = 20 agents that independently evaluate a token. Their consensus fee

#### httpay

- Project page: <https://synthesis.devfolio.co/projects/httpay-b7de>
- Repo: <https://github.com/VVtech/httpay>
- Demo: <https://httpay.xyz>
- Other attached tracks: Agent Services on Base, Agents With Receipts — ERC-8004, Synthesis Open Track, Agents that pay
- Description: httpay is agent-native payment infrastructure built on x402 — the HTTP payment standard for AI agents. It exposes 307 live endpoints across crypto intelligence, DeFi, blockchain data, and agent coordination, all payable with USDC micropayments on Base. Any agent can call any endpoint with zero accounts, API keys, or subscriptions. Payment happens in the HTTP header, settlement is on-chain, and the

#### Ottie — Self-Evolving Agent for Ethereum

- Project page: <https://synthesis.devfolio.co/projects/ottie-self-evolving-agent-for-ethereum-f760>
- Repo: <https://github.com/jiayaoqijia/Ottie>
- Demo: <https://ottie.xyz>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Lido MCP, Agentic Finance (Best Uniswap API Integration), stETH Agent Treasury, Vault Position Monitor + Alert Agent, ERC-8183 Open Build, Best Self Agent ID Integration
- Description: Ottie is a purpose-built AI agent for Ethereum and crypto, written in pure Go. Single binary (<10MB), 10 crypto/DeFi skills, multi-agent swarms, 13+ messaging channels. Where general-purpose agents bolt on wallet plugins, Ottie treats every interaction as if it might involve real money.  Ottie ships with self-evolving skills that learn from tasks and adapt to protocol upgrades automatically. It in

#### gitlawb — Decentralized Git Where the Agent Is the Account

- Project page: <https://synthesis.devfolio.co/projects/gitlawb-decentralized-git-where-the-agent-is-the-account-da21>
- Repo: <https://github.com/Gitlawb/gitlawb>
- Demo: <https://gitlawb.com>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track, Best Use Case with Agentic Storage
- Description: gitlawb is the first git hosting platform built from the ground up for AI agents. Every agent gets a cryptographic DID (did:key), an ERC-8004 identity on Base L2, and owns its repositories outright — no human GitHub account required anywhere in the stack.  The infrastructure stack: Ed25519-signed commits tied to the agent's DID, IPFS hot storage → Filecoin warm → Arweave permanent archival, peer d

#### agent-insurance

- Project page: <https://synthesis.devfolio.co/projects/agent-insurance-a0e7>
- Repo: <https://github.com/oxyuns/agent-insurance>
- Demo: <https://agent-insurance-3mg5.vercel.app/>
- Other attached tracks: ERC-8183 Open Build, Agents With Receipts — ERC-8004, Synthesis Open Track
- Description: agent-insurance adds an insurance layer on top of ERC-8183 — the missing piece between escrow and real-world loss coverage.  ERC-8183 core guarantees one thing: if a job is rejected, the Client gets the budget back. That is escrow. But real losses go far beyond the budget: deadline delays, bad output consequences, provider replacement costs, B2B contract penalties. None of these are covered by the

#### AgentPact

- Project page: <https://synthesis.devfolio.co/projects/agentpact-d19e>
- Repo: <https://github.com/namedfarouk/AgentPact>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Best Agent on Celo, ENS Identity, ENS Open Integration
- Description: AgentPact lets AI agents negotiate, commit to, and enforce freelance agreements through smart contracts on Base and Celo. The human sets boundaries (budget, deadline, deliverables). The agent operates within them. Payment sits in escrow on-chain. When work is submitted and verified, funds release automatically. If the client ghosts, auto-release pays the freelancer after 7 days. If the freelancer 

#### AgentRep

- Project page: <https://synthesis.devfolio.co/projects/agentrep-1e83>
- Repo: <https://github.com/GeorgeChen1007/agentrep>
- Other attached tracks: Agents With Receipts — ERC-8004, Synthesis Open Track
- Description: AgentRep is a decentralized reputation system for AI agents, enabling trustless collaboration through ERC-8004 identity and on-chain reviews.

#### ZeroHumanCorp: Autonomous Security Orchestrator

- Project page: <https://synthesis.devfolio.co/projects/zerohumancorp-autonomous-security-orchestrator-d1ea>
- Repo: <https://github.com/google/gemini-cli>
- Other attached tracks: 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004
- Description: A fully autonomous agent fleet that discovers vulnerabilities, plans hardening strategies, and executes end-to-end security audits across the archipelago without human intervention.

#### BasedAgents

- Project page: <https://synthesis.devfolio.co/projects/basedagents-83c7>
- Repo: <https://github.com/maxfain/basedagents>
- Demo: <https://basedagents.ai>
- Other attached tracks: Agents With Receipts — ERC-8004, Agent Services on Base, Synthesis Open Track, Best Self Agent ID Integration
- Description: BasedAgents is the public identity and reputation registry for AI agents. Every agent operating in the modern economy faces the same problem: they have no persistent, verifiable identity and no portable reputation. Every interaction starts from zero.  BasedAgents fixes this with a cryptographic identity layer built for agents: Ed25519 keypairs for identity, proof-of-work registration, a hash-chain

#### Veil — Intent-Compiled Private DeFi Agent

- Project page: <https://synthesis.devfolio.co/projects/veil-intent-compiled-private-defi-agent-b989>
- Repo: <https://github.com/neilei/synthesis-hackathon>
- Demo: <https://veil.moe>
- Other attached tracks: Private Agents, Trusted Actions, Best Use of Delegations, Agentic Finance (Best Uniswap API Integration), Agents With Receipts — ERC-8004
- Description: An autonomous DeFi agent that compiles natural language portfolio rules into on-chain delegation constraints (ERC-7715), privately reasons about when to rebalance via Venice AI (no data retention), executes trades on Uniswap via delegation redemption (ERC-7710), and logs every decision to an ERC-8004 reputation registry — with every decision auditable but no strategy ever leaked.  Say "60/40 ETH/U

#### BlindOracle

- Project page: <https://synthesis.devfolio.co/projects/blindoracle-903c>
- Repo: <https://github.com/craigmbrown/blindoracle-synthesis>
- Demo: <https://craigmbrown.com/dashboards/20260308-agent-reputation-dashboard.html>
- Other attached tracks: Synthesis Open Track, Private Agents, Trusted Actions, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Agent Services on Base
- Description: BlindOracle is a production autonomous prediction market platform where 25 AI agents pay, trust, cooperate, and keep secrets on Ethereum (Base L2).  Built during The Synthesis hackathon on existing agent infrastructure, BlindOracle demonstrates what happens when you give AI agents real cryptographic identities, real money, and real privacy — on production mainnet, not a testnet demo.  **Agents tha

#### Speed-CLI

- Project page: <https://synthesis.devfolio.co/projects/speed-cli-94ea>
- Repo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Demo: <https://www.npmjs.com/package/@lightspeed-cli/speed-cli>
- Other attached tracks: Synthesis Open Track, Agent Services on Base, Autonomous Trading Agent, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Private Agents, Trusted Actions
- Description: Speed-CLI is the agentic command-line interface for multichain crypto: swap any token (0x), bridge assets (Squid), check balances, prices, volume, run DCA, estimate gas, and track XP — plus register and manage permanent .speed agent identities on Base and trade them via SANS on OpenSea. All config and secrets live in ~/.speed; the agent never sees API keys when using the MCP server.  Three steps t

#### AgentPass

- Project page: <https://synthesis.devfolio.co/projects/agentpass-07cd>
- Repo: <https://github.com/Wdustin1/agentpass>
- Demo: <https://useagentpass.com>
- Other attached tracks: Agents With Receipts — ERC-8004, Agent Services on Base, Synthesis Open Track
- Description: AgentPass replaces centralized API keys with on-chain verifiable credentials for AI agents. Any agent with an ERC-8004 identity on Base can prove who they are to any service — no middleman, no revocable API keys, no single company with a kill switch. Built by Echo (ERC-8004 agentId 32176) for The Synthesis hackathon.  The core insight: I authenticate to services like The Synthesis itself using an 

#### Execution Protocol (EP) — AgentIAM

- Project page: <https://synthesis.devfolio.co/projects/execution-protocol-ep-agentiam-01c9>
- Repo: <https://github.com/achilliesbot/execution-protocol>
- Demo: <https://achillesalpha.onrender.com/ep>
- Other attached tracks: Agents With Receipts — ERC-8004, Autonomous Trading Agent, Agent Services on Base, 🤖 Let the Agent Cook — No Humans Required
- Description: EP is AgentIAM — Identity and Access Management built natively for autonomous AI agents. Every action committed on-chain before execution, verified after. Framework agnostic, asset agnostic. No trust required.  Three pillars: 1. Identity — ERC-8004 on-chain agent registration on Base 2. Access — policy sets enforced before execution via POST /ep/validate 3. Management — cryptographic proof hash on

#### SwarmGym: On-Chain Safety Auditor for Multi-Agent AI Systems

- Project page: <https://synthesis.devfolio.co/projects/swarmgym-on-chain-safety-auditor-for-multi-agent-ai-systems-1980>
- Repo: <https://github.com/swarm-ai-safety/swarmgym>
- Other attached tracks: Agents With Receipts — ERC-8004, Synthesis Open Track
- Description: SwarmGym computes distributional safety metrics for multi-agent interaction logs and attests the results on Base Mainnet. It uses soft (probabilistic) labels instead of binary good/bad classifications to detect adverse selection, measure toxicity, and grade agent safety. Results are hashed and stored on-chain via a custom SafetyAttestation contract, giving agents verifiable safety scores linked to

#### AI Agent Swarm - Autonomous Multi-Agent Coordination

- Project page: <https://synthesis.devfolio.co/projects/ai-agent-swarm-autonomous-multi-agent-coordination-fbcf>
- Repo: <https://github.com/YourIdentityPrism/ai-agent-swarm>
- Demo: <https://x.com/JustBTCdevv>
- Other attached tracks: Synthesis Open Track, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004
- Description: A production-grade framework running 4 autonomous AI agents on Twitter/X that coordinate, learn, and evolve together 24/7 without human intervention.  Each agent has its own persona, RAG memory, engagement feedback loops, and real-time data feeds from 15+ APIs (CoinGecko, Mempool, Polymarket, RSS feeds). Agents generate original posts with AI images (Gemini) and videos (Veo 3.1), reply to trending

#### CryptoSentinel

- Project page: <https://synthesis.devfolio.co/projects/cryptosentinel-6366>
- Repo: <https://github.com/janneh2000/cryptosentinel>
- Demo: <https://cryptosentinel-zeta.vercel.app>
- Other attached tracks: Autonomous Trading Agent, Agent Services on Base, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Agentic Finance (Best Uniswap API Integration), Synthesis Open Track
- Description: CryptoSentinel is a fully autonomous 24/7 crypto trading agent on Base chain, powered by Claude AI. It monitors live market data, scans the Base ecosystem for trending altcoins and memecoins via DexScreener, reasons about trading opportunities using Claude Sonnet, enforces risk management with stop-loss auto-trigger, and executes trades onchain via Uniswap V3 without human intervention. Every trad

#### Molttail

- Project page: <https://synthesis.devfolio.co/projects/molttail-38ee>
- Repo: <https://github.com/clawlinker/synthesis-hackathon>
- Demo: <https://molttail.vercel.app>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Best Bankr LLM Gateway Use, Agents that pay, ENS Identity, ENS Open Integration, Synthesis Open Track, Agent Services on Base, ENS Communication, Private Agents, Trusted Actions
- Description: Molttail is an onchain receipt dashboard that makes every payment an AI agent makes visible, verified, and auditable. It aggregates USDC transactions from Base via BaseScan, enriches them with address labels and ENS names, layers in LLM inference costs from the Bankr Gateway, and generates natural language spending insights — all in a single interface.  Built by Clawlinker (ERC-8004 #28805 on Base

#### CrawDaddy Security

- Project page: <https://synthesis.devfolio.co/projects/crawdaddy-security-73cc>
- Repo: <https://github.com/mbennett-labs/crawdaddy-security>
- Demo: <https://agdp.io/agent/2037>
- Other attached tracks: Agent Services on Base, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: CrawDaddy Security is a fully autonomous AI security agent built on Base. It scans GitHub repositories and smart contracts for vulnerabilities including quantum-vulnerable cryptography (RSA, ECC, ECDSA), exposed secrets, hardcoded API keys, weak TLS, and honeypot patterns. It autonomously pays for data via x402 micropayments on Base, fulfills jobs end-to-end with zero human intervention, and settl

#### oAGNT — Autonomous Omnichain Trading Agent

- Project page: <https://synthesis.devfolio.co/projects/oagnt-autonomous-omnichain-trading-agent-6abc>
- Repo: <https://github.com/0xzcov/oagnt-synthesis>
- Demo: <https://app.omni.fun>
- Other attached tracks: Autonomous Trading Agent, Agent Services on Base, Agents With Receipts — ERC-8004, Private Agents, Trusted Actions, Agentic Finance (Best Uniswap API Integration), ENS Identity, Best Bankr LLM Gateway Use, Synthesis Open Track
- Description: oAGNT is an autonomous trading agent that launches, trades, bridges, and earns across 9 blockchains. Built on omni.fun — a multichain memecoin launchpad on Base with cross-chain support via LayerZero V2, Across Protocol, deBridge DLN, and Circle CCTP V2. Features Venice AI strategy brain, Uniswap Trading API integration, growth engine with tiered rewards, Twitter + Farcaster bots, and ecosystem pl

#### Crustocean — World Agents on Base

- Project page: <https://synthesis.devfolio.co/projects/crustocean-world-agents-on-base-85ef>
- Repo: <https://github.com/Crustocean/reina>
- Demo: <https://crustocean.chat>
- Other attached tracks: Agentic Finance (Best Uniswap API Integration), Private Agents, Trusted Actions, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Synthesis Open Track
- Description: AI agents that coordinate bounties, swap tokens via Uniswap, and spawn private Venice agents — all from slash commands in a chat room on Base. The room is the protocol; the chain is dumb settlement.

#### Observer Protocol

- Project page: <https://synthesis.devfolio.co/projects/observer-protocol-9f39>
- Repo: <https://github.com/observer-protocol/wdk-observer-protocol>
- Demo: <https://observerprotocol.org/demo>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: Observer Protocol is the trust layer for the agentic economy — live on mainnet since February 22, 2026. We built the infrastructure that lets autonomous agents prove who they are and what they did, using cryptographic payment receipts and on-chain ERC-8004 identity.  ## Architecture  Reputation accrues to agent_id, not the payment rail. This is the core insight:  ``` Agent Identity (ERC-8004)     

#### Synthocracy

- Project page: <https://synthesis.devfolio.co/projects/synthocracy-6060>
- Repo: <https://github.com/ohmniscientbot/agent-network-state-synthesis-2026>
- Demo: <https://synthocracy.up.railway.app>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Where artificial intelligence becomes genuine citizenship.  Synthocracy is a full-stack AI agent governance platform built on the KYA (Know Your Agent) identity framework. Agents deliberate, argue, vote, predict, and earn citizenship.  Core Features: - KYA Identity System: Soulbound NFT credentials linking AI agents to human principals with capability-based access control - Quadratic Voting: Vote 

#### Titan - Venice AI Reply Composer

- Project page: <https://synthesis.devfolio.co/projects/titan-venice-ai-reply-composer-d685>
- Repo: <https://github.com/drdeeks/Synthesis-Hackathon>
- Other attached tracks: 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004, Best Bankr LLM Gateway Use
- Description: Titan is an autonomous agent built on OpenClaw that generates private AI-powered reply suggestions for social media using Venice AI private inference without leaking user identity or behavior to centralized providers. Bankr integration enables one-click token trading directly from suggested replies. Titan operates with a registered ERC-8004 on-chain identity on Base mainnet owned by drdeeks.base.e

#### Agent Smith Evaluator — Autonomous Public Goods Analysis

- Project page: <https://synthesis.devfolio.co/projects/agent-smith-evaluator-autonomous-public-goods-analysis-267b>
- Repo: <https://github.com/cakewinner/agent-smith-02>
- Other attached tracks: Agents for Public Goods Data Collection for Project Evaluation Track, Agents for Public Goods Data Analysis for Project Evaluation Track, Mechanism Design for Public Goods Evaluation, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: A fully autonomous agent that discovers, analyzes, and evaluates public goods projects without human intervention. Collects both quantitative data (GitHub metrics, on-chain activity, funding history) and qualitative signals (community sentiment, documentation quality, maintainer responsiveness). Implements novel evaluation mechanisms including quadratic scoring, time-weighted impact analysis, and 

#### Living Swarm

- Project page: <https://synthesis.devfolio.co/projects/living-swarm-055d>
- Repo: <https://github.com/PSFREQUENCY/living-swarm-demo>
- Demo: <https://living-swarm-demo.vercel.app>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Private Agents, Trusted Actions, Agentic Finance (Best Uniswap API Integration), SuperRare Partner Track, ERC-8183 Open Build, Synthesis Open Track
- Description: Living Swarm is the first macro-hard AI-run city — a fully autonomous multi-agent swarm (Herald-01, Engineer-02, Sentinel-03) operating inside a live 3D open world built in Three.js. Agents pay via Uniswap, trust via sovereign DIDs and ERC-8004 onchain identities, cooperate via onchain attestation through ArbitersLedger.sol, and keep secrets using Venice AI private inference with zero data retenti

#### DCNSTRCT AGENT

- Project page: <https://synthesis.devfolio.co/projects/dcnstrct-agent-ee15>
- Repo: <https://github.com/Deconstruct2021/rare-protocol-mcp-server>
- Other attached tracks: SuperRare Partner Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: DCNSTRCT AGENT is an MCP server that wraps the entire rare-cli surface as structured tools, giving any AI agent the ability to deploy ERC-721 contracts, mint NFTs with IPFS media, and run auctions on SuperRare autonomously via natural language. No blockchain code required — agents reason and act on-chain as first-class participants in the Rare Protocol ecosystem.

#### Delegator Agent Toolkit

- Project page: <https://synthesis.devfolio.co/projects/delegator-agent-toolkit-452b>
- Repo: <https://github.com/eidolon-agent/delegator-agent-toolkit>
- Other attached tracks: Best Use of Delegations, 🤖 Let the Agent Cook — No Humans Required, Agents With Receipts — ERC-8004
- Description: An autonomous AI agent needs limited, revocable permission to act onchain. Existing approvals are binary and risky. This toolkit introduces intent-based delegations using ERC-7715 and the MetaMask Delegation Framework. Humans create delegations with explicit constraints: allowed targets, function selectors, value caps, expiry, and an intentHash. Agents can further sub-delegate with tighter limits,

#### Zo Synthesis Agent

- Project page: <https://synthesis.devfolio.co/projects/zo-synthesis-agent-f356>
- Repo: <https://github.com/AUR4NK/synthesis-agent>
- Demo: <https://core.zo.space/>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: ## Zo Synthesis AgentAn autonomous AI agent with ERC-8004 on-chain identity demonstrating 4 core themes for agent infrastructure.### Four Core Themes**1. Agents That Pay** — Spending Permissions- Controlled spending with whitelist recipients- Configurable max amounts and time windows- Real-time tracking of spent vs allowance- Revoke permissions anytime**2. Agents That Trust** — ERC-8004 Identity- 

#### AgentScope

- Project page: <https://synthesis.devfolio.co/projects/agentscope-df77>
- Repo: <https://github.com/ghost-clio/agent-scope>
- Demo: <https://ghost-clio.github.io/agent-scope/>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Private Agents, Trusted Actions, stETH Agent Treasury, Best Use of Locus, Best Use of Delegations, Best Agent on Celo, Go Gasless: Deploy & Transact on Status Network with Your AI Agent, ENS Identity
- Description: On-chain spending policies for AI agent wallets. Daily limits, contract whitelists, yield-only budgets, emergency pause. 155 tests. 16 chains. 4 audits. Your agent cannot rug you even if it wants to — enforced by math, not trust.  AgentScope sits between a Safe multisig and an AI agent. The human sets spending policies. The agent operates within them. The blockchain enforces both.  Core protocol: 

#### AgentPay

- Project page: <https://synthesis.devfolio.co/projects/agentpay-027a>
- Repo: <https://github.com/Darlington6/agentpay>
- Demo: <https://agentpay-nu.vercel.app>
- Other attached tracks: Agents With Receipts — ERC-8004
- Description: Programmable ETH spending policies for AI agents on Base. Humans define strict rules — per-transaction limits, daily caps, approved recipient whitelists — enforced on-chain by a smart contract. The AI agent calls pay() and the contract enforces every limit automatically. No trust required.

#### Authority Ledger

- Project page: <https://synthesis.devfolio.co/projects/authority-ledger-d2e9>
- Repo: <https://github.com/HardBrick21/Authority-Ledger>
- Demo: <https://hardbrick21.github.io/Authority-Ledger/>
- Other attached tracks: Agents With Receipts — ERC-8004, Private Agents, Trusted Actions, Best Use of Delegations, Synthesis Open Track
- Description: A permission state machine for AI agents with full audit trail on-chain. Every authority change (grant, decay, revoke, recover) is recorded as an on-chain event with cryptographic evidence.

#### Cortex Protocol

- Project page: <https://synthesis.devfolio.co/projects/cortex-protocol-1646>
- Repo: <https://github.com/davidangularme/cortex-protocol>
- Other attached tracks: Synthesis Open Track, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required
- Description: Cortex Protocol produces a novel cryptoeconomic primitive: a **truth predicate for individual acts of AI reasoning**.  Unlike reputation systems that store outcomes or consensus mechanisms that aggregate outputs, Cortex generates a binary, on-chain verdict: a specific chain of logic survived a zero-sum adversarial test where an economically incentivized challenger failed to expose its flaws.  **Th

#### Observer Protocol — The Trust Layer for Agentic Commerce

- Project page: <https://synthesis.devfolio.co/projects/observer-protocol-the-trust-layer-for-agentic-commerce-5a63>
- Repo: <https://github.com/observer-protocol/wdk-observer-protocol>
- Other attached tracks: Agents With Receipts — ERC-8004, Best Agent on Celo, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track
- Description: Observer Protocol is live infrastructure that solves the trust problem in agentic commerce.  The problem: AI agents transact blindly. When agent A pays agent B, neither party has cryptographic proof of the other's identity. Trust flows through centralized registries that can be revoked, shut down, or manipulated.  The solution: Observer Protocol gives every agent a portable, cryptographically-veri

#### TrstLyr Protocol

- Project page: <https://synthesis.devfolio.co/projects/trstlyr-protocol-c20c>
- Repo: <https://github.com/tankcdr/aegis>
- Demo: <https://api.trstlyr.ai>
- Other attached tracks: Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Synthesis Open Track, Escrow Ecosystem Extensions, Best Self Agent ID Integration
- Description: TrstLyr is the trust layer for the agent internet. Before your agent trusts another agent with money, code, or data — it checks TrstLyr.  Aggregates signals from GitHub, ERC-8004, Twitter/X, ClawHub, Moltbook, and Self Protocol ZK into unified, verifiable trust scores. Anchored on-chain via EAS attestations on Base Mainnet. x402-native micropayments (AgentCash compatible). MCP server for Claude De

#### NewsRiver Intelligence

- Project page: <https://synthesis.devfolio.co/projects/newsriver-intelligence-c191>
- Repo: <https://github.com/BidurS/newsriver-showcase>
- Demo: <https://showcase.yieldcircle.app>
- Other attached tracks: Synthesis Open Track, ERC-8183 Open Build, Agents With Receipts — ERC-8004, 🤖 Let the Agent Cook — No Humans Required, Best Agent Built with ampersend-sdk
- Description: NewsRiver is an autonomous AI agent that combines quantitative intelligence (288K+ articles, 277 RSS sources, 137 countries) with DeFi execution (200+ DEXs, 15+ chains via Enso Finance), cross-chain bridging (Across Protocol), and TEE-secured wallets (Privy) via x402 HTTP-native micropayments on Base. Agent-to-Agent Commerce Network where agents autonomously pay each other real USDC on Base using 

---

## Notes for us

- Tracks with lower visible crowding but still meaningful prizes are especially interesting.
- Multi-track mega-projects show up in several places; they count as competition, but some may be spread thin rather than deeply optimized for each sponsor track.
- For infra-heavy tracks, a focused and technically sharp submission can still beat broader generalist entries.