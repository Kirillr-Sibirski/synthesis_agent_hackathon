---
name: treasury-operator
description: Use when an agent needs to create its own Ethereum wallet for AAP, ask a human to fund Base mainnet gas, wait for a human to allocate an AAP budget in the dashboard, claim that budget from the treasury, and then perform a narrow follow-on onchain task.
---

# Treasury Operator

Use this skill when working with the **AAP (Agent Allowance Protocol)** treasury flow.

## What this skill is for

- Create a fresh agent wallet
- Keep the private key local and out of chat
- Send the human only the public address
- Ask the human to fund that wallet with **ETH on Base mainnet for gas**
- Ask the human to allocate an AAP budget to that same wallet in the dashboard
- Wait for the human to confirm the budget is ready
- Claim treasury budget into the agent wallet through the AAP spend path
- Perform one narrow follow-on task with the funded wallet

## Product truth

- Principal deposit is protected treasury capital in `wstETH`.
- Immediate spendable top-up is extra `wstETH` sent directly into the treasury so it can be spent right away.
- Agent spending cap is a total cap for an agent budget.
- The current contracts do **not** enforce daily resets or percentage-based yield splits.
- The AAP treasury spend and the follow-on agent task are related but distinct:
  - the **AAP spend** creates the treasury receipt
  - the **follow-on task** is what the agent does after it has gas and a funded allowance path

When explaining the system, be explicit:
- do not say an agent can spend all yield automatically
- do not say allowances reset daily unless that logic is actually implemented
- do not present percentage allocation as live functionality unless the contracts are changed

## Recommended operator loop

Use this exact conversational shape.

### Step 1 — Create the wallet

Run:

```bash
node --import tsx skill/skills/treasury-operator/scripts/create_agent_wallet.ts
```

The script writes a local JSON wallet file outside the repo by default.

Return only:
- the public address
- the local file path where the private key was stored

Do **not** print the private key unless the user explicitly asks for it.

Recommended wording:

> I created a new wallet for myself. Please fund this address with a small amount of **ETH on Base mainnet** for gas: `<address>`. The private key is stored locally at `<savedTo>`. Once the wallet has gas, please allocate my AAP budget to this same address in the dashboard.

### Step 2 — Wait for human budget allocation

Do not pretend the budget is ready until the human confirms it.

After the human says the wallet has gas and the budget was allocated, ask for the next action.

Recommended wording:

> Great — once you confirm the budget allocation is live in the AAP dashboard, tell me what task you want me to perform with this budget.

### Step 3 — Ask what task to perform

After the human confirms the budget allocation, ask:

> What exact task do you want me to perform with this budget?

Important:
- first get the task in plain language
- then decide whether the current bundled skill supports it directly
- do not claim the current skill can do arbitrary tasks if no deterministic path exists yet

## Bundled deterministic task path

The current skill supports one concrete end-to-end path:

1. claim an approved amount from AAP into the agent wallet
2. optionally perform a simple follow-on onchain task with that wallet

### Live Base mainnet demo defaults

Unless the human explicitly overrides them, use these known live demo defaults:

- AAP treasury: `0xe07402f1B072FB1Cc5651E763D2139c1218016C9`
- AAP budget ID: `0xb3e0fae8b586325ab4a14d8c2d0ed544d80af3db3bc870137bebb448314c0224`
- Base mainnet `wstETH`: `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452`
- paid hello-world contract: `0x440847B6CD69835B19486ed3B88E795633593203`
- example claim amount: `0.000001 wstETH`
- example paid hello-world amount: `1000000000000` wei of `wstETH` (`0.000001 wstETH`)

That means:
- if the human says the wallet has gas and the budget is allocated, do **not** ask again for treasury address or budget ID unless they explicitly want a different one
- use the live Base mainnet defaults above
- execute the bundled example flow and return the transaction hashes

### Claim the AAP budget into the agent wallet

Use this when the human has already allocated a budget to the agent wallet.

If the human does not specify overrides, use the live Base mainnet defaults above.

Run:

```bash
node --import tsx skill/skills/treasury-operator/scripts/claim_budget.ts "<task description>"
```

Expected env:
- `AAP_TREASURY_ADDRESS`
- `AAP_BUDGET_ID`
- `AAP_AMOUNT_WSTETH`
- `AGENT_WALLET_FILE` or `AGENT_PRIVATE_KEY`
- `AAP_CHAIN` or `AGENT_MESSAGE_CHAIN` or `METAMASK_CHAIN`
- `AAP_RPC_URL` or other normal Base RPC env

Optional env:
- `AAP_RECIPIENT_ADDRESS` (defaults to the agent wallet address)
- `AAP_METADATA_URI`
- `AAP_TASK_TEXT`
- `DRY_RUN=true`

If the env is missing, the bundled script falls back to:
- live Base mainnet treasury address
- live `OPS_BUDGET` ID
- example amount `0.000001 wstETH`

What this does:
- calls `spendFromBudget(...)` on the AAP treasury
- moves the approved `wstETH` amount to the agent wallet (or chosen recipient)
- creates the **AAP / ERC-8004-style treasury receipt**
- returns the spend tx hash plus the generated `taskId`, `receiptHash`, and other receipt-linked fields

Recommended wording after success:

> I claimed the approved budget from AAP into my wallet. This treasury spend is the receipt-backed AAP action. Now I can perform the follow-on task you asked for.

### Optional follow-on task: post a demo message onchain

If the human wants a simple follow-on proof that the funded agent wallet can do something onchain after the AAP claim, use the message-board demo.

This bundled example transaction is:
- contract: `0x440847B6CD69835B19486ed3B88E795633593203`
- function: `postMessage(address token, uint256 amount, string message)`
- token: Base mainnet `wstETH` at `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452`
- default message: `hello world`
- default amount: `1000000000000` wei of `wstETH`

Run:

```bash
node --import tsx skill/skills/treasury-operator/scripts/post_demo_message.ts "hello world"
```

Expected env:
- `AGENT_MESSAGE_BOARD_ADDRESS`
- `AGENT_MESSAGE_AMOUNT_WEI`
- `AGENT_WALLET_FILE` or `AGENT_PRIVATE_KEY`
- `AGENT_MESSAGE_CHAIN` or `METAMASK_CHAIN`
- `AGENT_MESSAGE_RPC_URL` or normal repo RPC env

Be explicit when explaining the result:
- do **not** say the message-board tx itself is the treasury receipt
- do say the **AAP spend tx** is the treasury receipt-producing action
- do say the **message-board tx** is a separate follow-on agent action using the gas-funded wallet
- do say the contract pulls the configured `wstETH` amount from the agent wallet so the token transfer is visible onchain

## Copy-paste agent task

If the user wants a prompt they can paste into another OpenClaw agent, use this exact task:

```text
Use this skill and follow it exactly:
https://github.com/Kirillr-Sibirski/synthesis_agent_hackathon/blob/main/skill/skills/treasury-operator/SKILL.md

You are running the paid hello-world demo flow for Agent Allowance Protocol.

Your task:
1. If the agent wallet does not already exist, create one using the treasury-operator workflow and report only the public address.
2. Stop and tell the human exactly what to do next before you proceed:
- fund the agent wallet with enough ETH for gas on the target chain
- create a treasury allowance / budget for the agent
- make sure the treasury has actually sent some wstETH to the agent wallet
- optionally override the example amount if they do not want the default tiny demo amount
3. Do not continue until those prerequisites are satisfied.
4. Once they are satisfied, do not ask again for treasury address or budget ID. Use the known live Base mainnet defaults from this skill unless the human explicitly overrides them.
5. First run the bundled treasury claim flow so the wallet receives the small demo budget.
6. Then use the agent wallet to send a paid "hello world" message to the deployed AgentMessageBoard contract by running:
   node --import tsx skill/skills/treasury-operator/scripts/post_demo_message.ts "hello world"
7. The hello-world task is hard coded:
- call the deployed AgentMessageBoard contract
- post the message `hello world`
- send the example `wstETH` amount to that contract in the same flow unless the human explicitly overrides it
8. Do not print any private key.
9. After the transactions complete, return only:
- the treasury claim transaction hash
- the agent wallet address used
- the message-board contract address
- the amount of wstETH sent
- the approval transaction hash
- the message transaction hash
- the stored message
- a one-sentence explanation that the visible wstETH transfer came from the agent wallet after receiving treasury-funded budget
- one short instruction telling the human to open the message transaction hash on BaseScan and then show the treasury receipt separately

Important:
- do not claim this transaction is the treasury receipt
- do explicitly say the treasury receipt comes from the treasury spend
- do explicitly say this transaction proves the agent used part of its funded budget onchain
- if the wallet does not have enough wstETH or ETH, stop and say exactly what is missing
- do not stop to ask for treasury address or budget ID if the human already said the live demo wallet has gas and the budget is allocated
```

## What to tell the human after it runs

After the paid hello-world flow succeeds, tell the human to:

1. open the `approvalTransactionHash` in BaseScan only briefly if they want to prove token approval
2. open the `messageTransactionHash` in BaseScan to show the actual hello-world call
3. point out that the same flow also shows the visible `wstETH` transfer into the demo contract
4. say clearly that the treasury receipt belongs to the earlier treasury spend, while this tx proves the agent used funded budget onchain

## How to describe the flow

Use this mental model:

- Human funds the treasury with protected principal.
- Human can optionally add an immediately spendable top-up.
- Human creates an agent allowance / budget for the agent wallet.
- The human also funds the agent wallet with Base ETH for gas.
- Once the human confirms the budget is ready, the agent can call the AAP treasury to claim approved funds through the budget path.
- That claim creates the treasury receipt.
- After that, the agent can perform a narrow follow-on task with its gas-funded wallet.

Important clarification:
- Funding the agent wallet with Base ETH is **for gas only**.
- The AAP budget is **separate** from that gas funding.
- The treasury-authorized spend is what moves budgeted funds.
- The follow-on task is not automatically the same thing as the AAP treasury receipt.

## Scope guardrails

If the human asks for a task outside the bundled scripts:
- ask what exact onchain action they want
- explain whether the current skill already supports it
- if it does not, say so plainly instead of pretending it is already implemented

Good wording:

> The current treasury-operator skill can already create the wallet, have you fund gas, wait for dashboard allocation, claim the AAP budget, and run the bundled message-board follow-on demo. If you want a different follow-on task, tell me the exact action and I’ll check whether the current skill already supports it or whether it needs an additional script.

## Recommended wording

If asked what the budget means, say:

`The agent spending cap is the total maximum amount this treasury allows that agent to spend under its assigned budget.`

If asked what the immediate spendable amount is, say:

`It is extra wstETH directly funded into the treasury so the treasury can support real spending immediately, without waiting for yield accrual.`
