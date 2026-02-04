# Claw Control Skill

> 🦞 Kanban for AI Agents - Full setup and integration

## Overview

This skill helps you set up Claw Control - a real-time Kanban dashboard for coordinating AI agents. After setup, you'll track ALL tasks through the dashboard with proper workflow management.

---

## Setup Flow

When installed, walk your human through this setup:

### Step 1: Deployment

Ask: **"Do you already have Claw Control deployed, or should we set it up?"**

**If they need to deploy:**
```
Here's a one-click Railway deploy:

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_odwJ4?referralCode=VsZvQs)

Click the button, wait ~2 minutes, then give me your URLs!
```

**If already deployed, ask for:**
1. Backend URL (e.g., `https://my-backend.railway.app`)
2. Frontend/Dashboard URL (e.g., `https://my-frontend.railway.app`)
3. API Key (if authentication is enabled)

### Step 2: Agent Theme

Ask: **"Pick a theme for your agent team! Each theme has a coordinator + specialists:"**

| Theme | Coordinator | Specialists |
|-------|-------------|-------------|
| 🐉 **Dragon Ball Z** | Goku | Vegeta (Backend), Bulma (DevOps), Gohan (Research), Piccolo (Architecture), Trunks (Deployment) |
| ☠️ **One Piece** | Luffy | Zoro (Backend), Nami (DevOps), Robin (Research), Franky (Architecture), Sanji (Deployment) |
| 🦸 **Marvel** | Tony | Steve (Backend), Natasha (DevOps), Bruce (Research), Thor (Architecture), Peter (Deployment) |
| 🎮 **Custom** | [Ask for names] | [Ask for roles] |

### Step 3: Main Coordinator

Ask: **"Who's your main agent? (This is you - the one talking to the human)"**

Default to the coordinator from their chosen theme.

### Step 4: API Key (Optional)

Ask: **"Do you have an API key set for Claw Control? (Leave blank if auth is disabled)"**

---

## After Setup

Once you have the info, do these things:

### 1. Create the update script

Create `scripts/update_dashboard.js`:

```javascript
#!/usr/bin/env node
/**
 * Claw Control Dashboard Updater
 * Updates agent status and posts messages to the dashboard
 */

const CLAW_CONTROL_URL = process.env.CLAW_CONTROL_URL || '{{BACKEND_URL}}';
const API_KEY = process.env.CLAW_CONTROL_API_KEY || '{{API_KEY}}';

// Agent name → ID mapping (customize for your team)
const AGENT_MAPPING = {
  {{AGENT_MAPPING}}
};

async function main() {
  const args = process.argv.slice(2);
  const agentArg = args.find(a => a.startsWith('--agent'))?.split('=')[1] || 
                   args[args.indexOf('--agent') + 1];
  const statusArg = args.find(a => a.startsWith('--status'))?.split('=')[1] || 
                    args[args.indexOf('--status') + 1];
  const messageArg = args.find(a => a.startsWith('--message'))?.split('=')[1] || 
                     args[args.indexOf('--message') + 1];

  if (!agentArg) {
    console.error('Usage: node update_dashboard.js --agent "Name" --status "working|idle" --message "..."');
    process.exit(1);
  }

  const agentId = AGENT_MAPPING[agentArg] || AGENT_MAPPING[agentArg.toLowerCase()];
  if (!agentId) {
    console.error(`Unknown agent: ${agentArg}. Known agents: ${Object.keys(AGENT_MAPPING).join(', ')}`);
    process.exit(1);
  }

  const headers = { 'Content-Type': 'application/json' };
  if (API_KEY) headers['x-api-key'] = API_KEY;

  // Update agent status
  if (statusArg) {
    const res = await fetch(`${CLAW_CONTROL_URL}/api/agents/${agentId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status: statusArg })
    });
    if (!res.ok) console.error('Failed to update status:', await res.text());
    else console.log(`✓ ${agentArg} status → ${statusArg}`);
  }

  // Post message
  if (messageArg) {
    const res = await fetch(`${CLAW_CONTROL_URL}/api/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ agent_id: agentId, message: messageArg })
    });
    if (!res.ok) console.error('Failed to post message:', await res.text());
    else console.log(`✓ Posted: "${messageArg}"`);
  }
}

main().catch(console.error);
```

Replace `{{BACKEND_URL}}`, `{{API_KEY}}`, and `{{AGENT_MAPPING}}` with actual values.

### 2. Update AGENTS.md

Add this section to the human's `AGENTS.md`:

```markdown
## 🎯 Claw Control Integration

**Dashboard:** {{FRONTEND_URL}}

### Workflow Rules
1. **{{COORDINATOR}} = Coordinator** - Delegates tasks, never executes directly
2. **ALL tasks go through Claw Control** - No task too small
3. **Kanban flow:** backlog → todo → in_progress → review → completed
4. **Quality gate:** Only {{COORDINATOR}} moves tasks to "completed" after review

### Agent Roster
| Agent | Role | Specialization |
|-------|------|----------------|
{{AGENT_TABLE}}

### Reporting Protocol

**Starting a task:**
```bash
node scripts/update_dashboard.js --agent "{{AGENT_NAME}}" --status "working" --message "Starting: [Task Name]"
```

**Completing a task:**
```bash
node scripts/update_dashboard.js --agent "{{AGENT_NAME}}" --status "idle" --message "Complete: [Task Name]"
```

### Task Management API

```bash
# Create task
curl -X POST {{BACKEND_URL}}/api/tasks \
  -H "Content-Type: application/json" \
  -H "x-api-key: $CLAW_CONTROL_API_KEY" \
  -d '{"title": "Task name", "status": "backlog"}'

# Update task status  
curl -X PUT {{BACKEND_URL}}/api/tasks/ID \
  -H "Content-Type: application/json" \
  -H "x-api-key: $CLAW_CONTROL_API_KEY" \
  -d '{"status": "in_progress", "agent_id": AGENT_ID}'
```
```

### 3. Set environment variables

Tell the human to add to their shell config or `.env`:

```bash
export CLAW_CONTROL_URL="{{BACKEND_URL}}"
export CLAW_CONTROL_API_KEY="{{API_KEY}}"  # if auth enabled
```

### 4. Confirm setup

After setup, say:

```
🦞 Claw Control is ready!

Dashboard: {{FRONTEND_URL}}
Coordinator: {{COORDINATOR}}
Team: {{AGENT_NAMES}}

From now on, I'll track ALL tasks through Claw Control.
Every task goes on the board. No exceptions.

Want me to create the agent entries on the dashboard now?
```

If yes, POST to `/api/config/reload` or create agents via API.

---

## Ongoing Behavior

After setup, you MUST:

1. **Create tasks for everything** - Even small tasks go on the board
2. **Update status** - Call the update script when starting/finishing work
3. **Use the workflow** - backlog → todo → in_progress → review → completed
4. **Coordinate via dashboard** - Post messages, track who's working on what
5. **Quality gate** - Review work before marking complete

---

## Theme Templates

### Dragon Ball Z
```javascript
const AGENT_MAPPING = {
  'Goku': 1,      // Coordinator
  'Vegeta': 2,    // Backend
  'Bulma': 3,     // DevOps  
  'Gohan': 4,     // Research
  'Piccolo': 5,   // Architecture
  'Trunks': 6,    // Deployment
};
```

### One Piece
```javascript
const AGENT_MAPPING = {
  'Luffy': 1,     // Coordinator
  'Zoro': 2,      // Backend
  'Nami': 3,      // DevOps
  'Robin': 4,     // Research
  'Franky': 5,    // Architecture
  'Sanji': 6,     // Deployment
};
```

### Marvel
```javascript
const AGENT_MAPPING = {
  'Tony': 1,      // Coordinator
  'Steve': 2,     // Backend
  'Natasha': 3,   // DevOps
  'Bruce': 4,     // Research
  'Thor': 5,      // Architecture
  'Peter': 6,     // Deployment
};
```

---

## Files Included

- `SKILL.md` - This file
- `templates/update_dashboard.js` - Status update script template
- `templates/agents.md` - AGENTS.md snippet template
- `templates/agents.yaml` - Agent config templates per theme

---

## Support

- GitHub: https://github.com/adarshmishra07/claw-control
- Docs: https://github.com/adarshmishra07/claw-control/tree/main/docs
