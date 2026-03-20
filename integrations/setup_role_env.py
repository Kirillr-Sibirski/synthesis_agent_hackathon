from pathlib import Path
import json

env_path = Path('/root/.openclaw/workspace/synthesis_agent_hackathon/.env')
roles_path = Path('/root/.openclaw/workspace/synthesis_agent_hackathon/submission/private-role-keys.json')

roles = json.loads(roles_path.read_text())
updates = {
    'MANAGER_ADDRESS': roles['manager']['address'],
    'EXECUTOR_ADDRESS': roles['executor']['address'],
    'RECIPIENT_ADDRESS': roles['recipient']['address'],
    'EXECUTOR_PRIVATE_KEY': roles['executor']['privateKey'],
}

lines = env_path.read_text().splitlines()
out = []
seen = set()
for line in lines:
    if '=' in line:
        k, _ = line.split('=', 1)
        if k in updates:
            out.append(f'{k}={updates[k]}')
            seen.add(k)
        else:
            out.append(line)
    else:
        out.append(line)
for k, v in updates.items():
    if k not in seen:
        out.append(f'{k}={v}')

env_path.write_text('\n'.join(out) + '\n')
print('updated role env values')
