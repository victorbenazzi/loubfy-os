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
