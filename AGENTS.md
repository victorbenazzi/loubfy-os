# Loubfy OS Agent Guide

This file is the source of truth for Codex, Claude Code, and other agents working in this project.

## Project Purpose

Loubfy OS is a reusable social media and blogpost content operating system guided by AI agents.

Important: Loubfy OS is the name of this reusable project/product. It is not automatically the name of the business, company, creator, or social media brand being onboarded.

This repository stores company/page context, brand rules, visual references, generated images, content drafts, reusable skills, automation scripts, memory, and performance learnings for whichever business is configured through onboarding.

Default working language: Portuguese, unless the user asks otherwise.

## Agent File Convention

- Codex should read `AGENTS.md`.
- Claude Code should read `CLAUDE.md`, which points back to this file.
- Gemini CLI and Gemini-style agents should read `GEMINI.md`, which points back to this file.
- OpenCode, OpenClaw, Hermes, and generic coding agents should read `AGENTS.md` directly when supported.
- Generic agents should read `AGENTS.md`.

When instructions conflict, follow this order:

1. Current user request.
2. `AGENTS.md`.
3. Relevant skill in `skills/{skill-name}/SKILL.md`.
4. Folder-specific context files.

## Root Structure

```text
context/          Company, audience, offer, channel, and page context.
brand/            Design system, branding, colors, typography, logos, visual rules.
guidelines/       Voice, tone, general content rules, and guardrails.
images/           Generated, sourced, working, and exported image assets.
references/       External inspiration: styles, posts, screenshots, content examples.
content/          Final and in-progress content: social media, blogposts, newsletters.
memory/           Persistent project state, decisions, variables, and recurring context.
agents/           Portable agent cards, handoff templates, and role definitions.
skills/           Interchangeable agent skills, each with its own SKILL.md.
workflows/        Operating models and workflow documentation.
scripts/          API calls, automations, generated utilities, and repeatable scripts.
hooks/            Reusable social hooks, hook formulas, and tested hook patterns.
```

## Agent-Native Operating Model

Loubfy OS is skill-first and subagent-ready.

- Use `skills/{skill-name}/SKILL.md` as the durable process layer for all interfaces.
- Use subagents when the interface supports them and the work has independent subtasks that can run in parallel.
- If subagents are not available, execute the same roles sequentially using the relevant skills.
- Treat the main agent as the editor-in-chief: it routes work, consolidates outputs, protects project structure, and performs the final quality pass.
- Do not require Agency Swarm, OpenSwarm, LangGraph, or any other runtime. Runtime-specific subagents are optional accelerators, not project dependencies.

Before delegating to a subagent, provide:

```text
Objective:
Context files:
Allowed files or folders:
Relevant skill:
Expected output:
Acceptance criteria:
```

Subagents and sequential role simulations must preserve the same file boundaries:

- strategy, research, copy, carousel text, image prompts, assets, and final outputs stay separated;
- drafts stay under `content/`, not `memory/`;
- reusable learnings go to `memory/`, `hooks/`, or `guidelines/` only when they are durable.

Read `workflows/agent-orchestration.md` for the detailed orchestration protocol and `skills/catalog/agent-role-map.md` for the skill-to-agent map.

## Initialization

Before strategic content work, check:

```text
memory/project-state.yml
```

If `loubfy_os_initialized` is not `true`, use the `onboarding` skill when the user wants to configure the project, onboard a new business, or start using Loubfy OS for a new brand.

If setup was already completed and the user runs init again, ask whether they want to:

1. update only specific topics;
2. rerun setup while preserving old context;
3. overwrite the current setup.

Do not overwrite existing setup files silently.

## Content Storage

Save social content under:

```text
content/social-media/{platform}/{accountId}/{slug}/
```

Use `accountId` for the specific social account/profile being managed, not only the platform. Examples:

```text
content/social-media/instagram/empresa-institucional/lancamento-produto/
content/social-media/instagram/fundador/lancamento-produto/
content/social-media/linkedin/ceo/lancamento-produto/
```

If the project manages only one account for a platform, still use an explicit account id such as `principal`, `institucional`, or the brand/profile slug.

Recommended files inside a content folder:

```text
brief.md
research.md
copy.md
carousel.md
image-brief.md
assets/
final/
performance.md
```

Save blogposts under:

```text
content/blogposts/{slug}/
```

Recommended files:

```text
brief.md
research.md
outline.md
draft.md
social-distribution.md
assets/
final/
```

Use kebab-case for slugs:

```text
comparativo-ferramentas-ia
```

## Context Files

Before creating strategic content, check:

- `context/company.md`
- `context/audience.md`
- `context/social-media.md`
- `context/accounts/{platform}-{accountId}.md` when the post is for a specific managed account
- `context/offers.md`
- `guidelines/voice-and-tone.md`
- `guidelines/general-guidelines.md`
- `guidelines/guardrails.md`
- `brand/design-system.md`
- `brand/branding.md`

If a file is still a placeholder, infer conservatively from the current task and save useful new context there when appropriate.

When multiple accounts exist for the same platform, never assume their voice, audience, cadence, visual treatment, or performance learnings are interchangeable. Use the explicit `accountId` from the content path or `post.json`.

## Skills

Project skills are in `skills/{skill-name}/SKILL.md`.

Use these modules when relevant:

- `onboarding`: first-run setup, business onboarding, reconfiguration, and persistent project initialization.
- `audience-research`: audience, VOC, pains, objections, ICP, JTBD, comment/review mining.
- `content-strategy`: pillars, editorial calendar, topic clusters, backlog, what to create.
- `creative-angles`: angles, hooks, hypotheses, multiple approaches for one idea.
- `social-copywriting`: posts, captions, hooks, CTAs, carousel text, image text.
- `visual-briefing`: image prompts, art direction, visual specs, generated image briefing.
- `carousel-builder`: slide-by-slide carousel structure and text.
- `social-distribution`: repurpose one asset across platforms.
- `collab-campaigns`: co-marketing, creator collabs, joint posts, lives, webinars.
- `performance-review`: metrics, learnings, winners, next tests.

Validate local skill discovery with:

```bash
npx skills add . --list
```

## Visual Asset Rules

- Store AI-generated images in `images/generated/`.
- Store images saved from the web in `images/sourced/`.
- Store editable or in-progress visuals in `images/working/`.
- Store final exported images in `images/exports/`.
- Store inspiration and examples in `references/`, not `images/`.
- Store canonical template examples in `references/templates/`.
- Do not generate final images unless the user explicitly asks for image generation.
- For carousels, keep text/layout separate from generated background art whenever possible.
- Use real screenshots for real product UI. Do not ask image models to invent product screens.

## Template Source Of Truth

Files under `references/templates/` are canonical template references.

- Use them only as visual/layout templates for new work.
- Do not edit, overwrite, regenerate, delete, recolor, crop, rename, or replace them unless the user explicitly asks to alter the template source of truth or create a new template version from it.
- New posts and carousels must be created under `content/social-media/{platform}/{accountId}/{slug}/`.
- For Instagram editorial posts, use `references/templates/instagram-editorial/` as the source of truth and create new renders through `template: "instagram-editorial"` in the new post's `post.json`.
- For Instagram comparison posts, use `references/templates/instagram-comparison/` as the source of truth and create new renders through `template: "instagram-comparison"` and `layout: "ig-comparison-split"` in the new post's `post.json`.

## References

Use `references/` for examples and inspiration:

```text
references/styles/       Visual styles, moodboards, layout references.
references/templates/    Protected source-of-truth template examples.
references/posts/        Posts, carousels, threads, captions, screenshots.
references/content/      Articles, frameworks, research excerpts, source notes.
references/screenshots/  UI screenshots or platform screenshots used as reference.
```

When facts depend on official or current sources, cite the source in the content folder.

## Persistent Memory

Use `memory/` for durable project memory:

```text
memory/project-state.yml      Machine-readable init state and key variables.
memory/persistent-memory.md   Durable facts agents should remember.
memory/decisions.md           Important decisions and rationale.
memory/open-questions.md      Missing information to ask later.
memory/competitors.md         Competitors and alternatives.
memory/content-pillars.md     Durable editorial pillars.
```

Read memory before strategy, content planning, brand decisions, or reinitialization.

Do not store drafts in memory. Drafts belong in `content/`.

## Guidelines

Use `guidelines/` for reusable editorial rules:

- `voice-and-tone.md`: how the brand sounds.
- `general-guidelines.md`: content principles and production rules.
- `guardrails.md`: what to avoid, legal/ethical/editorial constraints.

## Hooks

The `hooks/` folder is a content hook lab, not git hooks.

Use it to store:

- hook formulas;
- tested hooks;
- hooks by platform;
- hooks by content pillar;
- hooks that won or lost in performance reviews.

When a hook performs well, add it to `hooks/hook-bank.md` with context and metrics.

## Scripts

Use `scripts/` for repeatable operations:

```text
scripts/api/          API calls and integration helpers.
scripts/automations/  Reusable automations.
scripts/generated/    Agent-generated helper scripts.
```

Do not add scripts unless they reduce repeated manual work or make a workflow more reliable.

## Working Rules

- Preserve user-created files and existing content.
- Do not overwrite content unless explicitly asked.
- Keep drafts, image prompts, and final copy separated.
- Save outputs in the appropriate content folder.
- Prefer official sources for product/platform claims.
- For social posts, write for the platform's native rhythm instead of copying the same text everywhere.
- For LinkedIn, prioritize clarity, point of view, and useful specificity.
- For image-heavy work, keep brand consistency and readability above novelty.
