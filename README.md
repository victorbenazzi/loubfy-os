# Loubfy OS

Loubfy OS is a reusable content operating system for social media and blog production with AI agents.

It stores brand context, audience research, editorial rules, visual references, content drafts, renderable assets, workflow docs, and reusable skills for any business, creator, page, or client configured through onboarding.

Important: **Loubfy OS is the reusable project/product name.** It is not automatically the name of the business or social profile being onboarded.

## Who This Is For

- Creators and teams building a repeatable content workflow.
- Agencies that want one operating model per client or brand.
- AI-agent users who want structured context, reusable skills, and predictable file boundaries.
- Developers who want renderable social assets powered by versioned content files.

## Requirements

- Git
- Node.js 20+
- npm
- An AI coding/agent interface such as Codex, Claude Code, Gemini CLI, or another agent that can read repository instructions.

## Reuse This Repository

Recommended path:

1. Create a new repository from this one as a GitHub template.
2. Clone the new repository locally.
3. Install dependencies.
4. Run the onboarding flow for the new business, creator, or brand.

```bash
git clone <your-new-repo-url> my-content-os
cd my-content-os
npm install
npm run typecheck
```

Then ask your agent:

```text
Leia AGENTS.md e execute o onboarding para configurar este projeto.
```

If you are using Claude Code, ask it to read `CLAUDE.md`. If you are using Gemini-style agents, ask them to read `GEMINI.md`.

## Quick Account Setup

Create a managed social account folder and account context file:

```bash
npm run account:create -- \
  --platform linkedin \
  --account-id principal \
  --display-name "Perfil Principal" \
  --notes "Conta principal da marca"
```

This creates:

```text
content/social-media/linkedin/principal/
context/accounts/linkedin-principal.md
```

Always use an explicit `accountId`, even when the project has only one profile for a platform.

## Repository Model

```text
context/          Company, audience, offer, channel, and page context.
brand/            Design system, branding, colors, typography, logos, visual rules.
guidelines/       Voice, tone, content rules, and guardrails.
images/           Generated, sourced, working, and exported image assets.
references/       External inspiration, screenshots, source notes, and examples.
content/          Drafts and final content for social media, blogs, and newsletters.
memory/           Persistent decisions, state, variables, and recurring context.
agents/           Portable agent cards, handoff templates, and role definitions.
skills/           Reusable agent skills, each with its own `SKILL.md`.
workflows/        Operating models and workflow documentation.
scripts/          API calls, automations, and repeatable utilities.
hooks/            Social hook formulas, tested hooks, and hook patterns.
```

## Content Paths

Social content:

```text
content/social-media/{platform}/{accountId}/{slug}/
```

Recommended files:

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

Blogposts:

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

## Rendering

Validate a post file:

```bash
npm run validate:post -- --input content/social-media/linkedin/principal/example/post.json
```

Render an image:

```bash
npm run render:image -- --input content/social-media/linkedin/principal/example/post.json
```

Render a video:

```bash
npm run render:video -- --input content/social-media/linkedin/principal/example/post.json
```

This template repository does not ship posts under `content/`. Create a post in a new `content/social-media/{platform}/{accountId}/{slug}/` folder before running the render commands.

## Agent Instructions

Agent instructions live in:

- `AGENTS.md` for Codex and generic agents.
- `CLAUDE.md` for Claude Code.
- `GEMINI.md` for Gemini-style agents.

Before strategic content work, agents should check:

```text
memory/project-state.yml
```

If `loubfy_os_initialized` is not `true`, use the onboarding skill before producing strategic content.

## Making This Safe To Publish

Before sharing the repository publicly or turning it into a template:

- Remove private client/company data from `context/`, `brand/`, and `memory/`.
- Keep `content/` empty except for `.gitkeep` files; canonical visual templates live in `references/templates/`.
- Remove secrets, API keys, cookies, and local environment files.
- Keep generated final assets only when they are part of the public demo.
- Choose and add a license if other people are allowed to use, modify, or redistribute the project.
- Confirm that every third-party image, font, or reference can be shared.

See [docs/reuse-checklist.md](docs/reuse-checklist.md) for a more detailed release checklist.

## Development

```bash
npm install
npm run typecheck
```

Useful scripts:

```bash
npm run account:create
npm run validate:post
npm run render:image
npm run render:video
```

## License

No license has been selected yet. Add a `LICENSE` file before publishing this repository for public reuse.
