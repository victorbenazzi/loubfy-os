# Reuse Checklist

Use this checklist before another person downloads, clones, forks, or creates a template from this repository.

## 1. Decide The Distribution Mode

Choose one primary mode:

- **GitHub template:** best for people who should start their own clean copy.
- **Public repository:** best for open collaboration and issues.
- **Private shared repository:** best for a team or agency client workflow.
- **Zip download:** acceptable for non-technical users, but harder to update.

For most Loubfy OS use cases, prefer a GitHub template repository.

## 2. Clean Private Context

Review and sanitize:

```text
context/
brand/
guidelines/
memory/
content/
references/
images/
```

Keep placeholders and public demos. Remove private strategy, personal notes, unpublished drafts, client data, credentials, paid assets, and screenshots that cannot be redistributed.

## 3. Reset Setup State

For a reusable template, `memory/project-state.yml` should start as:

```yaml
loubfy_os_initialized: false
project_product_name: Loubfy OS
setup_version: 1
onboarded_business_name: TBD
business_type: TBD
primary_channel: TBD
initialized_at: null
last_updated_at: null
last_updated_topic: null
```

Do not ship a template marked as initialized unless the repository is intentionally a demo for one specific brand.

## 4. Keep Demo Content Clearly Labeled

If demo content stays in the repository:

- Use a demo account ID such as `demo`, `sample`, or `loubfy-os`.
- Make source metadata explicit in `assets/source-metadata.json`.
- Avoid implying the demo brand is the user's brand.
- Keep demo output small enough that the repository stays easy to clone.

## 5. Confirm First-Run Commands

From a fresh clone:

```bash
npm install
npm run typecheck
npm run account:create -- --platform linkedin --account-id principal
```

This reusable repository should not ship example posts under `content/`. Validate rendering only after creating a new post in a project-specific content folder.

## 6. Validate Agent Entry Points

Confirm these files are present and consistent:

```text
AGENTS.md
CLAUDE.md
GEMINI.md
skills/onboarding/SKILL.md
workflows/agent-orchestration.md
skills/catalog/agent-role-map.md
```

The main instruction should tell agents that Loubfy OS is the reusable project name, not the onboarded business name.

## 7. Choose A License

Add a `LICENSE` file before publishing.

Common choices:

- MIT: permissive reuse with minimal restrictions.
- Apache-2.0: permissive reuse with explicit patent grant.
- Proprietary/custom: use when distribution is controlled or commercial.

If unsure, ask a legal professional before public release.

## 8. Publish

For GitHub template use:

1. Push the sanitized repository to GitHub.
2. Open repository settings.
3. Enable **Template repository**.
4. Add topics such as `content-system`, `social-media`, `ai-agents`, `marketing-os`.
5. Add a short repository description.
6. Test **Use this template** into a new repository.

## 9. New User Onboarding Prompt

Give new users this prompt:

```text
Leia AGENTS.md. Este é um novo uso do Loubfy OS para uma marca/cliente.
Execute o onboarding em português, salve o contexto nos arquivos corretos e não sobrescreva conteúdo existente sem confirmar.
```
