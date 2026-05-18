import React from "react";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import type { PostSpec, SlideSpec } from "./schema";
import { resolveAssetPath } from "./schema";

const mimeByExtension: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const assetToRenderableUrl = async (inputPath: string, assetSrc: string) => {
  const resolved = resolveAssetPath(inputPath, assetSrc);
  if (/^https?:\/\//i.test(resolved)) {
    return resolved;
  }

  const mime = mimeByExtension[path.extname(resolved).toLowerCase()];
  if (!mime) {
    return new URL(`file://${resolved}`).href;
  }

  const bytes = await readFile(resolved);
  return `data:${mime};base64,${bytes.toString("base64")}`;
};

const shellCss = (post: PostSpec) => `
  :root {
    --primary: ${post.brand.primary};
    --secondary: ${post.brand.secondary};
    --accent: ${post.brand.accent};
    --background: ${post.brand.background};
    --surface: ${post.brand.surface};
    --text: ${post.brand.text};
    --muted: ${post.brand.muted};
    --font: ${post.brand.fontFamily};
  }

  * { box-sizing: border-box; }
  html, body {
    width: ${post.dimensions.width}px;
    height: ${post.dimensions.height}px;
    margin: 0;
    overflow: hidden;
    background: var(--background);
    font-family: var(--font);
    color: var(--text);
  }

  .post-canvas {
    width: ${post.dimensions.width}px;
    height: ${post.dimensions.height}px;
    position: relative;
    overflow: hidden;
    background:
      linear-gradient(140deg, rgba(29, 78, 216, 0.10), transparent 38%),
      linear-gradient(320deg, rgba(15, 118, 110, 0.12), transparent 42%),
      var(--background);
  }

  .frame {
    position: absolute;
    inset: 54px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 28px;
  }

  .topline, .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--muted);
    font-size: 26px;
    line-height: 1;
  }

  .brand-mark {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-weight: 800;
    color: var(--text);
  }

  .brand-dot {
    width: 78px;
    height: 22px;
    background:
      radial-gradient(circle at 11px 11px, var(--accent) 0 10px, transparent 11px),
      radial-gradient(circle at 39px 11px, var(--primary) 0 10px, transparent 11px),
      radial-gradient(circle at 67px 11px, var(--secondary) 0 10px, transparent 11px);
  }

  .content {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 36px;
    min-height: 0;
    align-items: stretch;
  }

  .content.no-media {
    grid-template-columns: 1fr;
  }

  .copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  .eyebrow {
    color: var(--secondary);
    font-size: 28px;
    font-weight: 800;
    letter-spacing: 0;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  h1 {
    margin: 0;
    color: var(--text);
    font-size: clamp(58px, 7.3vw, 94px);
    line-height: 0.95;
    letter-spacing: 0;
    text-wrap: balance;
  }

  .body {
    margin-top: 28px;
    color: var(--muted);
    font-size: 34px;
    line-height: 1.18;
    max-width: 820px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 34px 0 0;
    display: grid;
    gap: 18px;
  }

  li {
    display: grid;
    grid-template-columns: 30px 1fr;
    gap: 16px;
    color: var(--text);
    font-size: 31px;
    line-height: 1.15;
  }

  li::before {
    content: "";
    width: 18px;
    height: 18px;
    margin-top: 8px;
    border-radius: 999px;
    background: var(--accent);
  }

  .media {
    min-width: 0;
    border: 2px solid rgba(15, 23, 42, 0.10);
    background: var(--surface);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 24px 64px rgba(15, 23, 42, 0.14);
  }

  .media img, .media video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .media.contain img, .media.contain video {
    object-fit: contain;
    background: var(--surface);
  }

  .video-badge {
    position: absolute;
    left: 28px;
    bottom: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 68px;
    height: 68px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.82);
    color: white;
    font-size: 32px;
  }

  .cta {
    display: inline-flex;
    width: fit-content;
    margin-top: 34px;
    padding: 18px 24px;
    border-radius: 8px;
    background: var(--text);
    color: white;
    font-size: 27px;
    font-weight: 800;
  }

  .footer {
    font-size: 24px;
  }

  @media (max-width: 1100px) {
    .frame { inset: 42px; }
    .content { grid-template-columns: 1fr; }
    .media { min-height: 390px; }
    h1 { font-size: 70px; }
  }
`;

const instagramCss = (post: PostSpec) => `
  :root {
    --primary: ${post.brand.primary};
    --secondary: ${post.brand.secondary};
    --accent: ${post.brand.accent};
    --background: ${post.brand.background};
    --surface: ${post.brand.surface};
    --text: ${post.brand.text};
    --muted: ${post.brand.muted};
    --font: ${post.brand.fontFamily};
    --safe-x: 40px;
    --safe-y: 60px;
  }

  * { box-sizing: border-box; }
  html, body {
    width: ${post.dimensions.width}px;
    height: ${post.dimensions.height}px;
    margin: 0;
    overflow: hidden;
    background: var(--background);
    font-family: var(--font);
    color: var(--text);
  }

  .post-canvas {
    width: ${post.dimensions.width}px;
    height: ${post.dimensions.height}px;
    position: relative;
    overflow: hidden;
    background: var(--background);
  }

  .ig-meta {
    position: absolute;
    top: var(--safe-y);
    left: var(--safe-x);
    right: var(--safe-x);
    z-index: 8;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 22px;
    font-size: 11px;
    line-height: 1;
    font-weight: 800;
    text-transform: uppercase;
    color: currentColor;
  }

  .ig-meta span:nth-child(2) { justify-self: center; }
  .ig-meta span:nth-child(3) { justify-self: end; }

  .ig-media {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: var(--surface);
  }

  .ig-media img,
  .ig-media video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .ig-cover {
    color: var(--secondary);
    background: var(--primary);
  }

  .ig-cover .ig-media::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.12) 36%, rgba(0, 0, 0, 0.84) 100%),
      linear-gradient(90deg, rgba(0, 0, 0, 0.30), transparent 30%, rgba(0, 0, 0, 0.22));
  }

  .ig-cover-copy {
    position: absolute;
    left: var(--safe-x);
    right: var(--safe-x);
    bottom: var(--safe-y);
    z-index: 6;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: var(--secondary);
  }

  .ig-profile {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
    font-size: 28px;
    line-height: 1;
    font-weight: 700;
    text-transform: none;
  }

  .ig-avatar-ring {
    width: 58px;
    height: 58px;
    border-radius: 999px;
    border: 2px solid var(--accent);
    background:
      radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0 46%, transparent 47%),
      conic-gradient(from 210deg, var(--accent), var(--primary), var(--secondary), var(--accent));
  }

  .ig-verified {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: var(--secondary);
    color: var(--primary);
    font-size: 18px;
    line-height: 1;
    font-weight: 900;
  }

  .ig-title {
    margin: 0;
    width: 100%;
    font-size: 100px;
    line-height: 0.93;
    letter-spacing: 0;
    font-weight: 900;
    text-transform: uppercase;
    text-wrap: balance;
  }

  .ig-support {
    margin: 30px 0 0;
    max-width: 930px;
    font-size: 28px;
    line-height: 1.2;
    letter-spacing: 0;
    font-weight: 800;
  }

  .ig-editorial {
    padding: var(--safe-y) var(--safe-x);
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    gap: 36px;
    color: var(--secondary);
    background: var(--primary);
  }

  .ig-editorial .ig-meta {
    position: static;
    color: var(--secondary);
  }

  .ig-editorial-title {
    align-self: end;
    margin: 54px 0 0;
    color: var(--secondary);
    font-size: 84px;
    line-height: 0.96;
    letter-spacing: 0;
    font-weight: 900;
    text-transform: uppercase;
    text-wrap: balance;
  }

  .ig-editorial-frame {
    position: relative;
    min-height: 560px;
    border-radius: 8px;
    overflow: hidden;
    background: var(--surface);
  }

  .ig-editorial-frame .ig-media {
    position: absolute;
    inset: 0;
  }

  .ig-editorial-body {
    margin: 0;
    color: var(--secondary);
    font-size: 36px;
    line-height: 1.12;
    letter-spacing: 0;
    font-weight: 800;
  }

  .ig-photo {
    color: var(--secondary);
    background: var(--primary);
  }

  .ig-photo .ig-media::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.12) 46%, rgba(0, 0, 0, 0.86) 100%);
  }

  .ig-photo-copy {
    position: absolute;
    left: var(--safe-x);
    right: var(--safe-x);
    bottom: var(--safe-y);
    z-index: 6;
    color: var(--secondary);
  }

  .ig-kicker-row {
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 24px;
    align-items: start;
    margin-bottom: 56px;
  }

  .ig-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    color: var(--primary);
    background: var(--accent);
    font-size: 28px;
    line-height: 1;
    font-weight: 900;
  }

  .ig-photo-body {
    margin: 0;
    max-width: 900px;
    font-size: 34px;
    line-height: 1.22;
    letter-spacing: 0;
    font-weight: 500;
  }

  .ig-photo-title {
    margin: 0;
    max-width: 960px;
    font-size: 42px;
    line-height: 1.04;
    letter-spacing: 0;
    font-weight: 900;
  }

  .ig-default {
    padding: var(--safe-y) var(--safe-x);
    color: var(--text);
    background: var(--background);
  }

  .ig-comparison {
    padding: var(--safe-y) var(--safe-x);
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    gap: 34px;
    color: var(--secondary);
    background:
      radial-gradient(circle at 50% 18%, rgba(255, 255, 255, 0.18), transparent 34%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 30%),
      var(--primary);
  }

  .ig-comparison .ig-meta {
    position: static;
    color: var(--secondary);
  }

  .ig-comparison-title {
    margin: 54px 0 0;
    max-width: 980px;
    color: var(--secondary);
    font-size: 82px;
    line-height: 0.96;
    letter-spacing: 0;
    font-weight: 900;
    text-transform: uppercase;
    text-wrap: balance;
  }

  .ig-comparison-body {
    margin: -14px 0 0;
    max-width: 920px;
    color: var(--secondary);
    font-size: 28px;
    line-height: 1.2;
    font-weight: 750;
  }

  .ig-vs-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 86px minmax(0, 1fr);
    gap: 18px;
    align-items: stretch;
    min-height: 0;
  }

  .ig-vs-card {
    position: relative;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.22);
    border-radius: 8px;
    padding: 34px 30px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.035)),
      rgba(255, 255, 255, 0.07);
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .ig-vs-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.18), transparent 46%);
    pointer-events: none;
  }

  .ig-vs-eyebrow {
    position: relative;
    margin: 0 0 18px;
    color: rgba(255, 255, 255, 0.72);
    font-size: 15px;
    line-height: 1;
    font-weight: 900;
    text-transform: uppercase;
  }

  .ig-vs-name {
    position: relative;
    margin: 0;
    color: var(--secondary);
    font-size: 54px;
    line-height: 0.94;
    letter-spacing: 0;
    font-weight: 900;
    text-transform: uppercase;
    text-wrap: balance;
  }

  .ig-vs-subtitle {
    position: relative;
    margin: 16px 0 0;
    color: rgba(255, 255, 255, 0.78);
    font-size: 24px;
    line-height: 1.12;
    font-weight: 750;
  }

  .ig-vs-badge {
    position: relative;
    width: fit-content;
    margin-top: 30px;
    padding: 11px 14px;
    border-radius: 999px;
    color: var(--primary);
    background: var(--accent);
    font-size: 18px;
    line-height: 1;
    font-weight: 900;
    text-transform: uppercase;
  }

  .ig-vs-body {
    position: relative;
    margin: 30px 0 0;
    color: var(--secondary);
    font-size: 25px;
    line-height: 1.18;
    font-weight: 650;
  }

  .ig-vs-list {
    position: relative;
    margin: 30px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 15px;
  }

  .ig-vs-list li {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 13px;
    color: var(--secondary);
    font-size: 22px;
    line-height: 1.12;
    font-weight: 750;
  }

  .ig-vs-list li::before {
    content: "";
    width: 10px;
    height: 10px;
    margin-top: 7px;
    border-radius: 999px;
    background: var(--accent);
  }

  .ig-vs-divider {
    align-self: stretch;
    display: grid;
    place-items: center;
    color: var(--primary);
  }

  .ig-vs-pill {
    display: grid;
    place-items: center;
    width: 76px;
    height: 76px;
    border-radius: 999px;
    background: var(--accent);
    color: var(--primary);
    font-size: 26px;
    line-height: 1;
    font-weight: 900;
    text-transform: uppercase;
  }

  .ig-comparison-verdict {
    margin: 0;
    color: var(--secondary);
    font-size: 32px;
    line-height: 1.08;
    font-weight: 900;
    text-wrap: balance;
  }
`;

const MediaBlock = ({
  slide,
  mediaSrc,
}: {
  slide: SlideSpec;
  mediaSrc?: string;
}) => {
  if (!slide.media || !mediaSrc) {
    return null;
  }

  const className = `media ${slide.media.fit === "contain" ? "contain" : ""}`;

  return (
    <div className={className} aria-label={slide.media.alt}>
      <img src={mediaSrc} alt={slide.media.alt ?? ""} />
      {slide.media.type === "video" ? <div className="video-badge">▶</div> : null}
    </div>
  );
};

const InstagramMedia = ({
  slide,
  mediaSrc,
}: {
  slide: SlideSpec;
  mediaSrc?: string;
}) => {
  if (!slide.media || !mediaSrc) {
    return null;
  }

  return (
    <div className="ig-media" aria-label={slide.media.alt}>
      <img src={mediaSrc} alt={slide.media.alt ?? ""} />
    </div>
  );
};

const InstagramMeta = ({ post }: { post: PostSpec }) => (
  <header className="ig-meta">
    <span>@{post.accountId.replaceAll("-", "")}</span>
    <span>{post.brand.name} TM</span>
    <span>©COPYRIGHT {new Date().getFullYear()}</span>
  </header>
);

const ComparisonSide = ({
  side,
}: {
  side: NonNullable<SlideSpec["comparison"]>["left"];
}) => (
  <article className="ig-vs-card">
    {side.eyebrow ? <p className="ig-vs-eyebrow">{side.eyebrow}</p> : null}
    <h2 className="ig-vs-name">{side.title}</h2>
    {side.subtitle ? <p className="ig-vs-subtitle">{side.subtitle}</p> : null}
    {side.badge ? <div className="ig-vs-badge">{side.badge}</div> : null}
    {side.body ? <p className="ig-vs-body">{side.body}</p> : null}
    {side.bullets.length > 0 ? (
      <ul className="ig-vs-list">
        {side.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    ) : null}
  </article>
);

const InstagramSlide = ({
  post,
  slide,
  mediaSrc,
}: {
  post: PostSpec;
  slide: SlideSpec;
  mediaSrc?: string;
}) => {
  if (slide.layout === "ig-comparison-split" && slide.comparison) {
    return (
      <main className="post-canvas ig-comparison">
        <InstagramMeta post={post} />
        <section>
          <h1 className="ig-comparison-title">{slide.title}</h1>
          {slide.body ? <p className="ig-comparison-body">{slide.body}</p> : null}
        </section>
        <section className="ig-vs-grid">
          <ComparisonSide side={slide.comparison.left} />
          <div className="ig-vs-divider">
            <span className="ig-vs-pill">VS</span>
          </div>
          <ComparisonSide side={slide.comparison.right} />
        </section>
        {slide.comparison.verdict ? (
          <p className="ig-comparison-verdict">{slide.comparison.verdict}</p>
        ) : null}
      </main>
    );
  }

  if (slide.layout === "ig-editorial-media") {
    return (
      <main className="post-canvas ig-editorial">
        <InstagramMeta post={post} />
        <h1 className="ig-editorial-title">{slide.title}</h1>
        <div className="ig-editorial-frame">
          <InstagramMedia slide={slide} mediaSrc={mediaSrc} />
        </div>
        {slide.body ? <p className="ig-editorial-body">{slide.body}</p> : null}
      </main>
    );
  }

  if (slide.layout === "ig-photo-essay") {
    return (
      <main className="post-canvas ig-photo">
        <InstagramMedia slide={slide} mediaSrc={mediaSrc} />
        <InstagramMeta post={post} />
        <section className="ig-photo-copy">
          {slide.body ? (
            <div className="ig-kicker-row">
              <span className="ig-arrow">›</span>
              <p className="ig-photo-body">{slide.body}</p>
            </div>
          ) : null}
          <h1 className="ig-photo-title">{slide.title}</h1>
        </section>
      </main>
    );
  }

  if (slide.layout === "ig-cover-overlay") {
    return (
      <main className="post-canvas ig-cover">
        <InstagramMedia slide={slide} mediaSrc={mediaSrc} />
        <InstagramMeta post={post} />
        <section className="ig-cover-copy">
          <div className="ig-profile">
            <span className="ig-avatar-ring" />
            <span>@{post.accountId}</span>
            <span className="ig-verified">✓</span>
          </div>
          <h1 className="ig-title">{slide.title}</h1>
          {slide.body ? <p className="ig-support">{slide.body}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <main className="post-canvas ig-default">
      <InstagramMeta post={post} />
      <section className="ig-cover-copy">
        <h1 className="ig-title">{slide.title}</h1>
        {slide.body ? <p className="ig-support">{slide.body}</p> : null}
      </section>
    </main>
  );
};

export const renderPostHtml = async ({
  post,
  slide,
  slideIndex,
  inputPath,
}: {
  post: PostSpec;
  slide: SlideSpec;
  slideIndex: number;
  inputPath: string;
}) => {
  const mediaSrc = slide.media
    ? await assetToRenderableUrl(inputPath, slide.media.poster ?? slide.media.src)
    : undefined;

  if (
    post.template === "instagram-editorial" ||
    post.template === "instagram-comparison"
  ) {
    const markup = renderToStaticMarkup(
      <InstagramSlide post={post} slide={slide} mediaSrc={mediaSrc} />,
    );

    return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=${post.dimensions.width}, initial-scale=1" />
    <style>${instagramCss(post)}</style>
  </head>
  <body>${markup}</body>
</html>`;
  }

  const markup = renderToStaticMarkup(
    <main className="post-canvas">
      <section className="frame">
        <header className="topline">
          <div className="brand-mark">
            <span className="brand-dot" />
            <span>{post.brand.name}</span>
          </div>
          <span>
            {post.platform} / {post.accountId} /{" "}
            {String(slideIndex + 1).padStart(2, "0")}
          </span>
        </header>
        <div className={`content ${slide.media ? "" : "no-media"}`}>
          <article className="copy">
            {slide.eyebrow ? <div className="eyebrow">{slide.eyebrow}</div> : null}
            <h1>{slide.title}</h1>
            {slide.body ? <p className="body">{slide.body}</p> : null}
            {slide.bullets.length > 0 ? (
              <ul>
                {slide.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            {slide.cta ? <div className="cta">{slide.cta}</div> : null}
          </article>
          <MediaBlock slide={slide} mediaSrc={mediaSrc} />
        </div>
        <footer className="footer">
          <span>{post.template}</span>
          <span>{post.slug}</span>
        </footer>
      </section>
    </main>,
  );

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=${post.dimensions.width}, initial-scale=1" />
    <style>${shellCss(post)}</style>
  </head>
  <body>${markup}</body>
</html>`;
};
