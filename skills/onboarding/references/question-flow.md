# Onboarding Question Flow

Use this flow to onboard a new business or creator.

Ask one phase per turn unless the user gives many answers at once.

## Phase 1: Business Identity

Ask:

1. What is the business, creator, or page name?
2. What type of business is it?
3. What do you sell, offer, or want to be known for?
4. What is the main goal of content right now?
5. Are we building content for a company brand, personal brand, or both?

Save to:

- `context/company.md`
- `context/offers.md`
- `memory/project-state.yml`

## Phase 2: Social Channels

Ask:

1. Which channels matter now? LinkedIn, Instagram, TikTok, YouTube, X, Threads, Facebook, newsletter, blog?
2. What are the usernames/handles for each channel?
3. Which channel is the priority?
4. What cadence feels realistic?
5. Are there existing accounts or are we starting from zero?

Save to:

- `context/social-media.md`

## Phase 3: Audience And Market

Ask:

1. Who is the target audience?
2. What problems do they feel most often?
3. What objections or doubts do they have?
4. What competitors or alternatives should we watch?
5. What words do customers/users usually use to describe the problem?

Save to:

- `context/audience.md`
- `memory/competitors.md`
- `memory/persistent-memory.md`

## Phase 4: Voice, Tone, And Guardrails

Ask:

1. How should the brand sound?
2. What should the brand never sound like?
3. Are there words, claims, topics, or behaviors to avoid?
4. Should content be more educational, opinionated, practical, personal, or promotional?
5. Any legal, compliance, or sensitive topic constraints?

Save to:

- `guidelines/voice-and-tone.md`
- `guidelines/general-guidelines.md`
- `guidelines/guardrails.md`

## Phase 5: Brand And Design

Ask:

1. Do you already have colors? If yes, which hex codes?
2. Do you already have fonts?
3. Do you have logos or brand files?
4. What visual references should we follow?
5. What visual styles should we avoid?

Save to:

- `brand/design-system.md`
- `brand/branding.md`
- `references/styles/style-references.md`

## Phase 6: Links And References

Ask:

1. What is the website URL?
2. Any landing pages, sales pages, lead magnets, or important links?
3. Any social profiles to use as inspiration?
4. Any posts, carousels, articles, or creators whose style we should reference?
5. Any folders/files/images already available?

Save to:

- `references/content/links.md`
- `references/posts/post-references.md`
- `references/styles/style-references.md`

## Phase 7: Content System

Ask:

1. What are the 3-5 main content pillars?
2. What content formats should we create most often?
3. What CTAs should appear repeatedly?
4. What topics are high priority in the next 30 days?
5. How should content performance be judged?

Save to:

- `memory/content-pillars.md`
- `context/offers.md`
- `hooks/hook-bank.md`
- `context/social-media.md`

## Phase 8: Completion

Summarize what was configured.

Ask the user to confirm:

- "Can I mark setup as complete?"

If yes, update:

- `memory/project-state.yml`
- `memory/persistent-memory.md`
- `memory/decisions.md`
