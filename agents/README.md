# Agents

This folder contains portable agent cards for Loubfy OS.

Agent cards are not executable code. They are role definitions that any coding-agent interface can use:

- Claude can map them to subagents when available.
- Codex can use them as delegation briefs when subagents are available.
- OpenCode, Gemini, Hermes, OpenClaw, and simpler CLIs can simulate them sequentially.

The durable process still lives in `skills/{skill-name}/SKILL.md`. Each agent card points to the skill it should follow.

## Folders

```text
agents/
  roster/      Default Loubfy OS roles.
  templates/   Handoff, result, and temporary-agent templates.
```

## Usage

1. Read `AGENTS.md`.
2. Read `workflows/agent-orchestration.md`.
3. Select the smallest execution model:
   - direct skill;
   - sequential role simulation;
   - subagent delegation.
4. Use the relevant agent card as the role brief.
5. Keep file ownership narrow and return paths for any created outputs.

## Rule Of Thumb

If a task can be completed by one skill, do not create a subagent. If a task has independent workstreams, delegate them with clear objectives and consolidate as editor-in-chief.
