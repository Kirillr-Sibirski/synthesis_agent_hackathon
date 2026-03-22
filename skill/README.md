# Skill

This folder preserves the OpenClaw test skill without changing its internal layout.

## Entry point

- `skill/skills/treasury-operator/SKILL.md`

## Note

Install the skill runtime once:

```bash
cd skill
npm install
```

Then run the skill from inside this folder:

```bash
cd skill
node --import tsx skills/treasury-operator/scripts/create_agent_wallet.ts
```
