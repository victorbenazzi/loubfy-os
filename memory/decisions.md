# Decisions

Record durable decisions here.

| Date | Decision | Reason |
|---|---|---|
| TBD | Rename the first-run setup skill to `onboarding`. | More intuitive for non-technical users while keeping legacy aliases in the skill description. |
| 2026-05-18 | Adopt a hybrid agent-native architecture: skill-first, subagents-when-available. | Keeps Loubfy OS portable across Codex, Claude, OpenCode, Gemini, Hermes, OpenClaw, and other interfaces without requiring a swarm runtime. |
| 2026-05-18 | Require `accountId` for renderable social posts and store posts under `content/social-media/{platform}/{accountId}/{slug}/`. | Separates multiple managed profiles on the same platform so context, assets, performance, and exports do not mix. |
