import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import {
  defaultOutputDir,
  loadPostSpec,
  repoRoot,
  validatePostForExport,
} from "../../src/social/schema";
import { renderPostHtml } from "../../src/social/render-html";

const arg = (name: string) =>
  process.argv.includes(name)
    ? process.argv[process.argv.indexOf(name) + 1]
    : undefined;

const input = arg("--input");
const outputOverride = arg("--out");

if (!input) {
  throw new Error("Usage: npm run render:image -- --input path/to/post.json [--out output-dir]");
}

const post = await loadPostSpec(input);
const { errors, warnings } = validatePostForExport(post, input);
if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}
if (warnings.length > 0) {
  console.warn(warnings.join("\n"));
}

const outputDir = outputOverride
  ? path.resolve(repoRoot, outputOverride)
  : defaultOutputDir(input, post);

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: post.dimensions,
  deviceScaleFactor: 1,
});

for (const [index, slide] of post.slides.entries()) {
  await page.setContent(
    await renderPostHtml({ post, slide, slideIndex: index, inputPath: input }),
    { waitUntil: "networkidle" },
  );
  await page.waitForFunction(() =>
    Array.from(document.images).every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );

  const canvas = page.locator(".post-canvas");
  const filename =
    post.slides.length === 1
      ? `${post.slug}.png`
      : `${post.slug}-${String(index + 1).padStart(2, "0")}.png`;
  const outputPath = path.join(outputDir, filename);
  await canvas.screenshot({ path: outputPath });
  console.log(`Rendered ${path.relative(repoRoot, outputPath)}`);
}

await browser.close();
