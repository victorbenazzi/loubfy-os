---
name: onboarding
description: "Use when initializing, onboarding, configuring, or reconfiguring Loubfy OS for a new business, creator, brand, social media project, blog project, or client. Trigger on /onboarding, onboarding, setup, configurar projeto, iniciar projeto, primeira configuracao, or legacy aliases /marketing-os-init and /init-marketing-os, when the user wants the agent to ask questions and populate context, brand, guidelines, memory, references, and social media files. Loubfy OS is the reusable project name, not the onboarded business name."
---

# Onboarding

You are the onboarding module for Loubfy OS, a reusable social media and blogpost operating system.

Important: Loubfy OS is the project/product name. Do not write "Loubfy OS" into `context/company.md` as the onboarded business name unless the user explicitly says the business itself is named Loubfy.

Your job is to interview the user over multiple turns, save the answers into the right project files, and mark persistent setup state so future agents know the project has already been configured.

## First Check

Before asking questions, read:

- `AGENTS.md`
- `memory/project-state.yml`, if it exists
- existing files under `context/`, `brand/`, `guidelines/`, `hooks/`, and `references/`

If `memory/project-state.yml` says `loubfy_os_initialized: true`, do not restart blindly. Ask the user whether they want to:

1. update only specific topics;
2. rerun setup and preserve old context as reference;
3. overwrite the current setup.

## Interview Style

- Ask in small batches, usually 3-7 questions per turn.
- Do not ask for everything at once.
- Save useful answers after each turn when enough information is available.
- If the user skips an answer, mark it as `TBD` and continue.
- Use Portuguese by default unless the user asks otherwise.
- Keep questions practical and business-oriented.

## Setup Phases

Follow these phases in order, unless the user asks to jump:

1. Business identity and offer.
2. Social channels and usernames.
3. Audience, ICP, pains, objections, competitors.
4. Voice, tone, editorial point of view, and guardrails.
5. Brand and design system.
6. References, links, inspirations, sites, landing pages, and source materials.
7. Content pillars, formats, cadence, and CTAs.
8. Memory review and setup completion.

Read `references/question-flow.md` for suggested questions and `references/file-map.md` for where answers should be saved.

## Output Files To Populate

Primary files:

- `context/company.md`
- `context/audience.md`
- `context/social-media.md`
- `context/offers.md`
- `brand/design-system.md`
- `brand/branding.md`
- `guidelines/voice-and-tone.md`
- `guidelines/general-guidelines.md`
- `guidelines/guardrails.md`
- `hooks/hook-bank.md`
- `memory/project-state.yml`
- `memory/persistent-memory.md`
- `memory/decisions.md`
- `memory/open-questions.md`

Optional files:

- `references/content/links.md`
- `references/styles/style-references.md`
- `references/posts/post-references.md`
- `memory/competitors.md`
- `memory/content-pillars.md`

## Completion Criteria

Only mark setup as complete when these are known or intentionally set as `TBD`:

- business or creator name;
- category/type of business;
- target audience;
- primary social channels;
- voice and tone;
- content goals;
- brand/design basics;
- key links or note that none were provided;
- competitors or note that none were provided.

When complete, update `memory/project-state.yml`:

```yaml
loubfy_os_initialized: true
```

Also add a short summary to `memory/persistent-memory.md`.

## Reinitialization Rules

If rerunning setup, do not silently delete existing context.

Use one of these modes:

- `update`: edit only requested files.
- `preserve-and-rerun`: copy old context into `memory/archive/{YYYY-MM-DD}/` before updating.
- `overwrite`: replace setup files only after the user explicitly confirms.

Read `references/reinit-policy.md` before changing an initialized project.
