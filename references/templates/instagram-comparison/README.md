# Instagram Comparison Template Source Of Truth

This folder is the canonical visual reference for the `instagram-comparison` template family.

## Protected Rule

These files are template examples, not production content.

Agents must not edit, overwrite, regenerate, delete, recolor, crop, rename, or replace files in this folder unless the user explicitly asks to alter this template source of truth or create a new template version from it.

When producing new Instagram comparison posts or carousels:

1. Use these files only as layout references.
2. Create new content under `content/social-media/instagram/{accountId}/{slug}/`.
3. Use `template: "instagram-comparison"` in `post.json`.
4. Use `layout: "ig-comparison-split"`.
5. Put comparison content in `slide.comparison.left` and `slide.comparison.right`.
6. Use brand colors, images, copy, and context from the current project or content brief.

## Files

- `01-comparison-split.png`: two balanced editorial cards, central VS marker, headline, support text, and verdict.

## Related Files

- `references/styles/instagram-editorial-templates.md`: shared visual style rules.
- `src/social/render-html.tsx`: HTML/CSS renderer implementation.
- `src/social/post-schema.ts`: allowed `template`, `layout`, and `comparison` values.
