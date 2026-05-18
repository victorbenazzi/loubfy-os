# Agent Role Map

Use this map to route Loubfy OS work across skills, portable agent cards, and subagents.

| Skill | Default agent | Use when | Expected inputs | Typical outputs |
|---|---|---|---|---|
| `onboarding` | main agent | configuring or reconfiguring a business, creator, brand, or client | user interview answers, existing context files, `memory/project-state.yml` | populated `context/`, `brand/`, `guidelines/`, `hooks/`, `memory/` |
| `audience-research` | `audience-researcher` | researching ICP, pains, objections, VOC, comments, reviews, JTBD | offer/context, audience hypothesis, sources or research target | `research.md`, audience themes, VOC phrases, content ideas |
| `content-strategy` | `content-strategist` | choosing pillars, topics, formats, calendars, or backlog | context, research, goals, platform priorities | strategy summary, pillars, prioritized backlog, next pieces |
| `creative-angles` | `creative-angles-specialist` | generating hooks, angles, hypotheses, positioning variations | core idea, audience stage, research or strategy | angle matrix, hooks, recommended tests, copy handoff |
| `social-copywriting` | `social-copywriter` | writing posts, captions, CTAs, hooks, image text, social variants | brief, thesis, angle, platform, brand voice | `copy.md`, caption, hook options, CTA options |
| `carousel-builder` | `carousel-architect` | building slide-by-slide carousel content | brief, research, copy, angle, platform | `carousel.md`, cover, slide text, caption, design notes |
| `visual-briefing` | `visual-briefing-specialist` | planning images, prompts, visual specs, thumbnails, covers | brand files, copy, carousel, references, asset type | `image-brief.md`, visual direction, prompt, specs |
| `social-distribution` | `distribution-planner` | repurposing one asset across channels or planning publishing sequence | source asset, goals, platforms, calendar constraints | platform versions, distribution calendar, asset checklist |
| `collab-campaigns` | `content-strategist` | planning creator/partner campaigns and outreach | goal, audience, partner criteria, offer | partner criteria, concepts, outreach, execution checklist |
| `performance-review` | `performance-analyst` | reviewing post metrics and deciding what to repeat or test | metrics, period, platform, original goals | performance summary, winners, weak spots, next tests |

## Routing Defaults

- For a single narrow output, use the skill directly.
- For a multi-stage deliverable, chain the skills in the order shown by `workflows/agent-orchestration.md`.
- For independent subtasks, spawn the mapped agents when available.
- If subagents are unavailable, simulate the mapped agents sequentially and keep the same output boundaries.
- Use `editorial-qa` after complex outputs, campaigns, carousels, or anything user-facing with multiple artifacts.

## File Ownership Defaults

| Agent | Preferred file ownership |
|---|---|
| `audience-researcher` | `research.md`, source notes, VOC tables |
| `content-strategist` | `brief.md`, strategy sections, backlog notes |
| `creative-angles-specialist` | angle sections inside `brief.md` or standalone angle notes |
| `social-copywriter` | `copy.md`, captions, hook variants |
| `carousel-architect` | `carousel.md` |
| `visual-briefing-specialist` | `image-brief.md`, visual specs, prompt notes |
| `distribution-planner` | `social-distribution.md`, publishing calendar |
| `performance-analyst` | `performance.md`, durable learnings when warranted |
| `editorial-qa` | review notes only, unless asked to apply edits |
