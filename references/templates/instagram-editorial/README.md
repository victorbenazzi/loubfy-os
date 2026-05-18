# Instagram Editorial Template Source Of Truth

This folder is the canonical visual reference for the `instagram-editorial` template family.

## Protected Rule

These files are template examples, not production content.

Agents must not edit, overwrite, regenerate, delete, recolor, crop, rename, or replace files in this folder unless the user explicitly asks to alter this template source of truth or create a new template version from it.

When producing new Instagram posts or carousels:

1. Use these files only as layout references.
2. Create new content under `content/social-media/instagram/{accountId}/{slug}/`.
3. Use `template: "instagram-editorial"` in `post.json`.
4. Choose the matching slide layout:
   - `ig-cover-overlay`;
   - `ig-editorial-media`;
   - `ig-photo-essay`.
5. Use brand colors, images, copy, and context from the current project or content brief.

## Files

- `01-cover-overlay.png`: full-bleed image cover with dark overlay, centered profile row, huge title, and support line.
- `02-editorial-media.png`: solid background, top metadata, large headline, framed media, and lower explanatory text.
- `03-photo-essay.png`: full-bleed image with bottom gradient, accent marker, narrative paragraph, and bold closing thesis.

## Related Files

- `references/styles/instagram-editorial-templates.md`: detailed visual specification.
- `src/social/render-html.tsx`: HTML/CSS renderer implementation.
- `src/social/post-schema.ts`: allowed `template` and `layout` values.
