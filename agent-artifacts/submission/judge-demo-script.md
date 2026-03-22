# Judge Demo Script

## Goal

Keep the live demo short and obvious.

Do not try to explain every file, every artifact, or every implementation detail.
The point is to show:

1. what the protocol is
2. how the agent gets controlled access to funds
3. why the MetaMask + receipt path is real

## One-line opener

"Agent Allowance Protocol lets a human fund a yield-bearing treasury, give an AI agent a bounded allowance instead of full wallet control, and prove every spend with an onchain receipt."

## What to show on the dashboard

Open the dashboard homepage.

### 1. Hero section

Say:

"This is the whole story in one screen: the human funds the treasury, the agent gets a limited allowance or sub-budget, and the spend is proven onchain."

Point at:
- Base mainnet live badge
- MetaMask executor proven badge
- Receipt recorded badge

### 2. The three-step explanation

Say:

"Step one: fund the treasury. Step two: allocate an allowance or sub-budget to the agent. Step three: the agent spends within limits and the receipt proves it."

Do not linger here for too long.

### 3. Proof card

Point at:
- treasury address
- smart-account executor
- spend transaction
- receipt hash

Say:

"This is the live proof. The smart account is the executor in the actual recorded spend path, and the receipt shows who executed, who got paid, and which budget/task it belongs to."

### 4. Track-facing summary

Say:

"This is why the project fits the tracks:
- Delegations: MetaMask smart-account execution is load-bearing
- stETH treasury: only bounded spendable value is exposed
- Receipts: every spend produces a verifiable onchain receipt
- Let the Agent Cook: the app reads the live proof through a real backend"

### 5. Onchain snapshot

Point at:
- allocation
- spent
- remaining
- available yield

Say:

"This is the actual budget state. The agent does not get the whole treasury. It gets a bounded operating allowance."

### 6. Receipt summary

Say:

"And this is the final proof object: recipient, amount, timestamp, and readiness all in one place."

## If a judge asks how the agent actually gets access to funds

Say:

"We do not hand the agent the treasury key. We give it a scoped executor identity, like a smart account, and authorize that executor against a specific budget or sub-budget with clear rules."

Short version:

"The treasury is the vault. The budget is the allowance. The smart account is the controlled spending identity."

## If a judge asks what sub-budgets mean

Say:

"A parent budget can allocate narrower child budgets to specialized agents. That means one manager can fund multiple agent roles without giving any one of them full treasury access."

## If time is very short

Use this 20-second version:

"Agent Allowance Protocol gives AI agents bounded allowances instead of full wallet control. The treasury stays protected, the agent spends through MetaMask-constrained execution, and every spend is proven with an onchain receipt."

## What not to show unless asked

- old Sepolia history
- raw JSON artifacts
- internal generated files
- unused lookup tooling
- deep technical implementation detail

## Safe final line

"The key idea is simple: agents should get an allowance, not the whole wallet."
