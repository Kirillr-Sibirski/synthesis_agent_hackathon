---
name: treasury-operator
description: Use when an agent needs to operate Agent Allowance Protocol treasuries, create its own wallet, report only the public address for funding, top up immediate spendable balance, or work with treasury budgets and agent allowances.
---

# Treasury Operator

Use this skill when working with the Agent Allowance Protocol treasury flow.

## What this skill is for

- Create a fresh agent wallet
- Keep the private key local and out of chat
- Report only the public address for funding
- Explain how principal, immediate spendable top-ups, and agent spending caps differ
- Post a simple onchain demo message from the agent wallet once it has gas and a funded allowance path
- Interact with treasury budgets and allowances without overstating what the contracts enforce

## Product truth

- Principal deposit is protected treasury capital in `wstETH`.
- Immediate spendable top-up is extra `wstETH` sent directly into the treasury so it can be spent right away.
- Agent spending cap is a total cap for an agent budget.
- The current contracts do **not** enforce daily resets or percentage-based yield splits.

When explaining the system, be explicit:
- do not say an agent can spend all yield automatically
- do not say allowances reset daily unless that logic is actually implemented
- do not present percentage allocation as live functionality unless the contracts are changed

## Wallet creation workflow

When the user wants an agent wallet:

1. Run:

```bash
node --import tsx skills/treasury-operator/scripts/create_agent_wallet.ts
```

2. The script writes a local JSON file under `env/agent-wallets/`.
3. That folder is gitignored.
4. Return only:
   - the public address
   - the local file path where the private key was stored
5. Do not print the private key unless the user explicitly asks for it.

## How to describe the flow

Use this mental model:

- Human funds the treasury with protected principal.
- Human can optionally add an immediately spendable top-up.
- Human assigns an agent spending cap.
- The agent wallet does not automatically receive tokens.
- Instead, the treasury authorizes that agent to spend up to its cap through the treasury path.

Important clarification:
- Funding the agent wallet is separate from authorizing the agent budget.
- The budget lives in the treasury.
- The agent spends through treasury rules; funds are not pre-sent to the agent by default.

## Demo message-board workflow

If the user wants a recorded demo where the agent does one simple onchain action after the treasury flow:

1. Keep the treasury spend and the follow-on agent action conceptually separate.
2. The treasury receipt proves the treasury-authorized spend.
3. The follow-on agent tx proves the agent used its own gas-funded wallet onchain.

For the demo message-board call:

```bash
node --import tsx skills/treasury-operator/scripts/post_demo_message.ts "hello world"
```

Expected env:
- `AGENT_MESSAGE_BOARD_ADDRESS`
- `AGENT_WALLET_FILE` or `AGENT_PRIVATE_KEY`
- `AGENT_MESSAGE_CHAIN` or `METAMASK_CHAIN`
- `AGENT_MESSAGE_RPC_URL` or normal repo RPC env

Be explicit when explaining the result:
- do not say the message-board tx itself is the treasury receipt
- do say the message-board tx is a follow-on agent action after the treasury allowance / spend path

## Recommended wording

If asked what the budget means, say:

`The agent spending cap is the total maximum amount this treasury allows that agent to spend under its assigned budget.`

If asked what the immediate spendable amount is, say:

`It is extra wstETH directly funded into the treasury so the treasury can support real spending immediately, without waiting for yield accrual.`
