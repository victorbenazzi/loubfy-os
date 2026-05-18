# Reinitialization Policy

If `memory/project-state.yml` has `loubfy_os_initialized: true`, never overwrite setup files silently.

Ask:

```text
Esse projeto ja foi configurado. Voce quer:
1. ajustar apenas um topico especifico;
2. refazer o setup preservando o contexto antigo;
3. sobrescrever a configuracao atual?
```

## Mode: update

Use when the user wants to adjust one topic.

Only edit the relevant files.

Examples:

- brand update -> `brand/`
- new audience -> `context/audience.md`
- new social channel -> `context/social-media.md`
- tone change -> `guidelines/voice-and-tone.md`

## Mode: preserve-and-rerun

Before editing, copy current setup files to:

```text
memory/archive/{YYYY-MM-DD}/
```

Then rerun the onboarding flow.

## Mode: overwrite

Only do this after explicit confirmation.

Overwrite setup files, but keep:

- `memory/archive/`
- content folders;
- images;
- references;
- skills.
