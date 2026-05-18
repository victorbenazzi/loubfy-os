# Design System

Use this file to store visual system rules for content production.

## Colors

| Token | Hex | Usage |
|---|---|---|
| Primary | #050505 | Main brand color and high-contrast Instagram backgrounds |
| Secondary | #FFFFFF | Reverse text on dark/high-contrast backgrounds |
| Accent | #FFFFFF | Small markers, profile rings, and emphasis before onboarding |
| Background | #FFFFFF | Light backgrounds |
| Surface | #F4F4F4 | Media frames and neutral panels |
| Text | #050505 | Main text |
| Muted | #5C5C5C | Secondary labels and metadata on light backgrounds |

## Typography

| Role | Font Family | Weight | Notes |
|---|---|---:|---|
| Heading | Inter | 900 | Instagram editorial covers use 100 px / 93% line-height on 1080 x 1350 |
| Body | Inter | 500-800 | Support text uses 28 px / 120%; body slides can scale to 34-36 px |
| Micro metadata | Inter | 800 | 11 px uppercase top labels |

## Layout

- Instagram portrait canvas: 1080 x 1350 px.
- Instagram safe area: 60 px top/bottom and 40 px sides.
- Template family: `instagram-editorial`.
- Template family: `instagram-comparison`.
- Supported Instagram slide layouts: `ig-cover-overlay`, `ig-editorial-media`, `ig-photo-essay`, `ig-comparison-split`.
- Radius: 8 px for framed media; no decorative outer canvas radius.
- Icon style: simple solid circular markers, using brand accent.
- Image treatment: full-bleed editorial photo with gradient overlay, or framed media on solid background.

## Accessibility

- Keep contrast readable.
- Avoid dense text in images.
- Test carousel slides at mobile size.
