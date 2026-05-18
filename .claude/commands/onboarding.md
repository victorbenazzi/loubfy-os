---
description: Onboard or reconfigure Loubfy OS for a business, creator, brand, or client
---

Run the Loubfy OS onboarding flow.

1. Read `AGENTS.md` and `memory/project-state.yml`.
2. Follow `skills/onboarding/SKILL.md` exactly: interview the user in small batches (3-7 questions per turn) and populate the files under `context/`, `brand/`, `guidelines/`, `hooks/`, and `memory/`.
3. If `loubfy_os_initialized` is already `true`, do not restart blindly — apply the reinitialization rules in the skill (update / preserve-and-rerun / overwrite).
4. Loubfy OS is the reusable product name, not the onboarded business name.

Extra instructions from the user: $ARGUMENTS
