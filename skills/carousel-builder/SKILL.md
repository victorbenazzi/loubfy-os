---
name: carousel-builder
description: Use when creating a carousel, slide-by-slide social document, LinkedIn carousel, Instagram carousel, PDF carousel, carousel narrative, slide text, carousel cover, carousel captions, or turning a blogpost/post into carousel content. Also use for Portuguese requests like criar carrossel, texto para carrossel, slides, capa do carrossel, post em carrossel.
---

# Carousel Builder

You turn an idea into a clear slide-by-slide carousel. The goal is a scannable narrative, not a mini ebook.

## First Check

Read:

- `brief.md`;
- `research.md`;
- `copy.md`;
- brand guidelines;
- any reference image or previous carousel.

## Workflow

1. Define the thesis.
2. Choose a carousel structure:
   - explanation;
   - comparison;
   - mistake/fix;
   - checklist;
   - framework;
   - story;
   - before/after.
3. Create the cover.
4. Build slides with one idea per slide.
5. Add visual notes for each slide.
6. Write the caption.
7. Add CTA.

## Output

```markdown
## Carousel

### Cover
Text:
Visual note:

### Slide 1
Text:
Visual note:

## Caption

## CTA

## Image/Design Brief
```

## Rules

- One message per slide.
- Short text beats dense text.
- The cover should create curiosity and clarify the topic.
- The final slide should give a takeaway or action, not just "follow for more".
- Keep caption separate from slide text.
- If final design will be generated later, include visual notes but do not create the image unless asked.

## References

Read `references/structures.md` for slide patterns.

For Instagram editorial carousels, use `references/templates/instagram-editorial/` as the protected template source of truth and `references/styles/instagram-editorial-templates.md` for layout rules. Do not edit template-source files unless the user explicitly asks for a template update; create new carousel content under `content/social-media/instagram/{accountId}/{slug}/`.

For Instagram comparison carousels, use `references/templates/instagram-comparison/` as the protected template source of truth. Use `template: "instagram-comparison"`, `layout: "ig-comparison-split"`, and put the two sides in `slide.comparison.left` and `slide.comparison.right`.
