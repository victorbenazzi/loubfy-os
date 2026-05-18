# Loubfy OS Agent Orchestration

This workflow defines how coding agents should use Loubfy OS across Codex, Claude, OpenCode, Gemini, Hermes, OpenClaw, and other agent interfaces.

The project is skill-first and subagent-ready:

- Skills are the durable process layer.
- Agent cards are portable role definitions.
- Subagents are optional acceleration when the interface supports them.
- No external swarm runtime is required.

## Decision Rule

Use the smallest execution model that can produce a high-quality result.

| Situation | Execution model |
|---|---|
| One narrow task, one clear output | Use the relevant skill directly |
| Multi-step content work with dependent phases | Use skills sequentially |
| Independent research, strategy, angle, or QA workstreams | Spawn subagents if available |
| Interface does not support subagents | Simulate the same agent roles sequentially |
| A task needs a specialist not in the roster | Create a temporary agent brief from `agents/templates/temporary-agent-card.md` |

## Standard Handoff Brief

Every delegated task should include:

```text
Objective:
Context files:
Allowed files or folders:
Relevant skill:
Expected output:
Acceptance criteria:
```

Keep file ownership tight. Do not ask a subagent to edit files outside its scope. If a subagent is research-only, it should return findings or write `research.md`, not produce final copy.

## Main Agent Responsibilities

The main agent acts as editor-in-chief:

1. Read `AGENTS.md`, `memory/project-state.yml`, relevant context, and relevant skill files.
2. Decide whether the task needs direct skill use, sequential roles, or subagents.
3. Assign each role a clear objective and file boundary.
4. Consolidate outputs into the requested deliverable.
5. Run an editorial quality pass before final response.
6. Save outputs in the correct `content/`, `memory/`, `hooks/`, `references/`, or `images/` location.

The main agent should not merge unrelated artifacts. Research, strategy, copy, carousel text, image prompts, and final assets must remain separated.

## Default Roster

| Agent | Skill | Owns |
|---|---|---|
| `audience-researcher` | `audience-research` | Audience language, pains, objections, research evidence |
| `content-strategist` | `content-strategy` | Pillars, thesis, backlog, platform/format strategy |
| `creative-angles-specialist` | `creative-angles` | Hooks, angle matrix, test hypotheses |
| `social-copywriter` | `social-copywriting` | Platform-native copy, captions, CTAs |
| `carousel-architect` | `carousel-builder` | Slide-by-slide carousel narrative |
| `visual-briefing-specialist` | `visual-briefing` | Visual direction, prompts, asset specs |
| `distribution-planner` | `social-distribution` | Repurposing and publishing sequence |
| `performance-analyst` | `performance-review` | Metric interpretation and next tests |
| `editorial-qa` | All relevant skills | Final consistency, clarity, file-boundary, and guardrail review |

Detailed role cards live in `agents/roster/`.

## Parallelization Protocol

Parallelize only independent workstreams.

Good parallel work:

- audience research and competitor/reference scan;
- angle generation and visual reference gathering;
- distribution planning and editorial QA after a draft exists;
- performance pattern extraction and next-test ideation.

Keep sequential when one output depends on another:

- audience research before strategy;
- strategy before angles;
- angles before final copy;
- carousel structure before visual briefing;
- final copy before editorial QA.

If parallel outputs conflict, the main agent resolves the conflict using this priority:

1. User request.
2. `AGENTS.md`.
3. Relevant skill.
4. Evidence quality and recency.
5. Brand and editorial guidelines.

## Common Workflows

### Campaign

1. `audience-researcher`: gather audience language and objections.
2. `content-strategist`: define campaign thesis, pillars, and formats.
3. `creative-angles-specialist`: produce angle matrix and hooks.
4. `social-copywriter`: write platform-native assets.
5. `visual-briefing-specialist`: brief visuals and image prompts.
6. `distribution-planner`: create publishing sequence.
7. `editorial-qa`: review final bundle.

### Single Social Post

Use `social-copywriting` directly unless the request asks for research, angles, carousel, or visual planning. Save to `content/social-media/{platform}/{slug}/copy.md` when persistence is requested or implied.

### Blogpost

1. Use `content-strategy` to clarify thesis and search/social role.
2. Use `audience-research` or web research when the topic depends on evidence.
3. Draft under `content/blogposts/{slug}/draft.md`.
4. Use `social-distribution` for repurposing.

### Carousel

1. Use `creative-angles` if the hook or framing is unclear.
2. Use `carousel-builder` for slide-by-slide text.
3. Use `visual-briefing` for design direction and asset prompts.
4. Keep `carousel.md`, `image-brief.md`, and final exports separate.

### Audience Research And Ideas

Run `audience-researcher` first, then pass insights to `content-strategist` and `creative-angles-specialist`. Do not invent voice-of-customer quotes.

### Performance Review

Use `performance-analyst` to read metrics and identify patterns. Feed durable learnings into `memory/content-pillars.md`, `hooks/hook-bank.md`, or future content folders only when evidence is strong enough.

## Temporary Agents

Create a temporary agent when the task needs a specialist outside the default roster, such as:

- competitor researcher;
- SEO blog strategist;
- LinkedIn ghostwriter;
- YouTube script doctor;
- product screenshot auditor;
- offer/positioning critic.

Use `agents/templates/temporary-agent-card.md` and give the temporary agent a narrow role, one relevant skill if possible, and strict output boundaries.

## Completion Standard

A task is complete when:

- the requested output exists in the expected file or response;
- the output follows the relevant skill format;
- source-backed claims are cited in the content folder;
- drafts, prompts, assets, and final files are separated;
- the final response names the important files created or changed.
