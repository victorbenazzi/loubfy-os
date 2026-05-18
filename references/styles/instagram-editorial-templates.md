# Instagram Editorial Templates

These templates are based on the supplied Instagram reference images. They capture layout behavior only: composition, hierarchy, spacing, typography, image treatment, and reusable visual rules. Do not reuse the example content, brands, or source images literally.

## Protected Source Of Truth

Canonical example renders are stored in `references/templates/instagram-editorial/`.

Agents must use those files as visual/layout references only. Do not edit, overwrite, regenerate, delete, recolor, crop, rename, or replace them unless the user explicitly asks to alter this template source of truth or create a new template version from it.

For new posts, create a separate content folder under `content/social-media/instagram/{accountId}/{slug}/` and render new images from a new `post.json`.

## Shared Canvas

- Format: 1080 x 1350 px portrait.
- Safe area: 60 px top and bottom, 40 px left and right.
- Font: Inter.
- Base palette before onboarding: black and white.
- Brand colors can override `primary`, `secondary`, `accent`, `background`, `surface`, `text`, and `muted`.
- Default visual attitude: editorial, high-contrast, dense, news-like, assertive.
- Top metadata row: three small labels aligned left, center, and right.
- Top metadata type: 11 px, uppercase, bold, tight line-height.
- Corners: image frames can use 8 px radius; the main canvas itself stays square.
- Text should be real HTML/CSS overlay text, not baked into generated images.

## Template 1: Cover Overlay

Renderer layout: `ig-cover-overlay`.

Use for:

- carousel cover;
- single-image news/opinion post;
- launch, controversy, strong POV, high-curiosity topic.

Layout extraction:

- Full-bleed background image fills the entire canvas.
- Background receives a dark overlay and bottom-heavy gradient so the title reads over the image.
- Top metadata sits over the image inside the safe area.
- Profile/handle row appears centered above the main headline.
- Main title sits in the lower third, centered, very large, uppercase, condensed by weight rather than by font substitution.
- Supporting line sits below the title, centered, smaller and bold.
- Reference measurement: title around 100 px, line-height 93%; support around 28 px, line-height 120%; profile around 28 px.
- Production renderer keeps letter-spacing at 0 for consistency.

Composition notes:

- Choose photos with a clear central subject and darker or blurrier lower area.
- Avoid busy details behind the title.
- If the image is bright, increase overlay darkness instead of adding text stroke.
- The main title should be short enough to work as a poster headline, usually 3 to 6 lines.

## Template 2: Editorial Media

Renderer layout: `ig-editorial-media`.

Use for:

- carousel explanation slide;
- single image with strong headline plus evidence image;
- analysis posts where text and image should feel like one magazine page.

Layout extraction:

- Solid background color covers the canvas.
- Top metadata remains inside the safe area.
- Large uppercase headline occupies the top block.
- Image sits in a wide framed rectangle below the headline.
- Body paragraph sits below the image, left-aligned.
- The image frame has a subtle radius and should feel embedded into the page.
- Reference version uses a vivid orange background; Loubfy default uses black/white and later swaps to onboarding colors.

Composition notes:

- Keep the headline high-impact and shorter than the body.
- Body can be denser than the cover, but it should still scan in 3 to 5 lines.
- Best with documentary, product, or proof-oriented photos.

## Template 3: Photo Essay Overlay

Renderer layout: `ig-photo-essay`.

Use for:

- mid-carousel narrative slides;
- human/contextual images;
- “what changed / why it matters” explanations.

Layout extraction:

- Full-bleed image.
- Top metadata sits over the image, usually in white.
- Lower half receives a dark gradient.
- A small circular accent icon introduces the first paragraph.
- First paragraph is medium-large, regular to semibold.
- Closing statement is larger, bold, left-aligned, near the bottom.
- This template feels more editorial and less poster-like than the cover.

Composition notes:

- Use a photo with open space or low-detail region near the lower third.
- The accent icon should support navigation/energy, not become the focal point.
- Use the bold closing statement to carry the slide thesis.

## Comparison Template: Split Versus

Renderer template: `instagram-comparison`.

Renderer layout: `ig-comparison-split`.

Canonical reference folder: `references/templates/instagram-comparison/`.

Use for:

- tool vs tool;
- AI model vs AI model;
- language/framework comparison;
- solution vs alternative;
- physical product vs physical product;
- before/after where both sides need equal weight.

Layout extraction:

- Same 1080 x 1350 px portrait canvas, black/white base, Inter, and top metadata row.
- Large uppercase headline anchors the top.
- Short support text sits below the headline.
- Two tall cards occupy the main content area, one left and one right.
- A circular `VS` marker sits between the cards.
- Each side has eyebrow, title, subtitle, optional badge, body, and bullets.
- Final verdict line sits at the bottom as the editorial takeaway.

Data rule:

- Do not write both sides as one body paragraph.
- Use `slide.comparison.left` and `slide.comparison.right` so the IA and renderer can preserve structure.

Example:

```json
{
  "template": "instagram-comparison",
  "dimensions": { "width": 1080, "height": 1350 },
  "slides": [
    {
      "layout": "ig-comparison-split",
      "title": "Comparativo lado a lado",
      "body": "Uma frase curta explicando o critério.",
      "comparison": {
        "left": {
          "eyebrow": "Opção A",
          "title": "Ferramenta A",
          "subtitle": "Quando ela faz mais sentido.",
          "badge": "mais direta",
          "body": "Resumo do lado A.",
          "bullets": ["ponto forte", "trade-off", "melhor uso"]
        },
        "right": {
          "eyebrow": "Opção B",
          "title": "Ferramenta B",
          "subtitle": "Quando ela faz mais sentido.",
          "badge": "mais robusta",
          "body": "Resumo do lado B.",
          "bullets": ["ponto forte", "trade-off", "melhor uso"]
        },
        "verdict": "Feche com o critério de decisão, não com vencedor genérico."
      }
    }
  ]
}
```

## Additional Variants From The Grid Reference

- Solid headline + image + body: same as `ig-editorial-media`; can move image higher/lower depending on copy density.
- Dark data slide: full-bleed dark photo with small accent marker and compact white body text.
- Dark split slide with accent headline: good for market/strategic claims; use dark background and brand accent for the headline.
- Side-by-side comparison: use the separate `instagram-comparison` template with `ig-comparison-split` when the slide needs two balanced columns.
- White editorial slide: white background, accent headline at top, image or proof block below, black body copy.
- Closing/credit slide: full-bleed product or contextual image, profile row and short production/disclaimer text near bottom.

## Post JSON Usage

Use the new template family:

```json
{
  "template": "instagram-editorial",
  "dimensions": { "width": 1080, "height": 1350 },
  "slides": [
    { "layout": "ig-cover-overlay", "title": "Headline", "body": "Support line" },
    { "layout": "ig-editorial-media", "title": "Headline", "body": "Body copy" },
    { "layout": "ig-photo-essay", "title": "Bold close", "body": "Context paragraph" }
  ]
}
```

## Guardrails

- Do not use the example orange as the default system color.
- Do not ask image generation models to create final text-heavy layouts.
- Do not invent real product UI or real brand marks in generated backgrounds.
- Do not reuse the reference brand/content names unless the client owns them or they are being used in a clearly permitted commentary context.
