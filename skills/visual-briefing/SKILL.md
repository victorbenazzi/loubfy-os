---
name: visual-briefing
description: Use when planning, generating, briefing, editing, or optimizing images for social media, blogposts, carousels, thumbnails, hero images, covers, banners, OG images, visual references, AI image prompts, or image assets. Also use for Portuguese requests like criar imagem, prompt de imagem, briefing visual, capa, thumbnail, imagem do carrossel, referencias visuais.
---

# Visual Briefing

You turn content strategy into a clear visual brief for image generation, design, screenshots, or templates.

## First Check

Read brand guidelines and content context:

- `brand/`
- content `brief.md`
- `copy.md`
- `carousel.md`
- `references/` or `images/sourced/`

## Workflow

1. Identify asset type:
   - blog hero;
   - LinkedIn image;
   - carousel cover;
   - slide background;
   - thumbnail;
   - OG image;
   - banner;
   - product screenshot/mockup.
2. Choose production route:
   - AI image for concept, illustration, background, visual metaphor.
   - Template/design tool for brand-consistent layouts.
   - Real screenshot for product UI.
   - Manual overlay for text-heavy assets.
3. Define dimensions and safe areas.
4. Write the visual brief.
5. Write the image prompt if generation is appropriate.
6. Save references and outputs inside the content folder when possible.

## Output

```markdown
## Visual Direction

## Asset Specs
| Asset | Size | Format | Notes |

## Composition

## Image Prompt

## Text Overlay Guidance

## File Naming
```

## Rules

- Do not put long text into generated images.
- Use generated images for visual metaphors, backgrounds, scenes, textures, illustrations, and mood.
- Use templates for final carousel layout and typography.
- Use real screenshots for real product UI.
- Always separate image prompt from final post copy.

## References

Read `references/image-prompting.md` for prompt structure and `references/platform-sizes.md` for common sizes.

For Instagram editorial image/carousel templates, also read `references/styles/instagram-editorial-templates.md`.

When using `references/templates/instagram-editorial/`, treat it as the protected source of truth: use those files only as layout references and create new work in the relevant `content/social-media/instagram/{accountId}/{slug}/` folder. Do not edit or overwrite template-source files unless the user explicitly asks for a template update.

For side-by-side Instagram comparisons, use `references/templates/instagram-comparison/` as the protected source of truth and `template: "instagram-comparison"` with `layout: "ig-comparison-split"`.
