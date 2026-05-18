import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import {
  defaultOutputDir,
  loadPostSpec,
  repoRoot,
  resolveAssetPath,
  validatePostForExport,
} from "../../src/social/schema";

const arg = (name: string) =>
  process.argv.includes(name)
    ? process.argv[process.argv.indexOf(name) + 1]
    : undefined;

const input = arg("--input");
const outputOverride = arg("--out");

if (!input) {
  throw new Error("Usage: npm run render:video -- --input path/to/post.json [--out output.mp4]");
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

const outputDir = defaultOutputDir(input, post);
await mkdir(outputDir, { recursive: true });

const publicDir = path.join(repoRoot, "public");
const publicAssetDir = path.join(publicDir, "loubfy-render-assets", post.slug);
await mkdir(publicAssetDir, { recursive: true });

const remotionPost = structuredClone(post);

for (const slide of remotionPost.slides) {
  if (!slide.media || /^https?:\/\//i.test(slide.media.src)) {
    continue;
  }

  const absoluteAsset = resolveAssetPath(input, slide.media.src);
  const publicName = path.basename(slide.media.src);
  const publicRelative = path.posix.join(
    "loubfy-render-assets",
    post.slug,
    publicName,
  );
  const publicAbsolute = path.join(publicAssetDir, publicName);

  await copyFile(absoluteAsset, publicAbsolute);

  slide.media.src = publicRelative;
}

const cacheDir = path.join(repoRoot, ".render-cache");
await mkdir(cacheDir, { recursive: true });

const propsPath = path.join(cacheDir, `${post.slug}.remotion-props.json`);
await import("node:fs/promises").then((fs) =>
  fs.writeFile(
    propsPath,
    JSON.stringify(
      {
        post: remotionPost,
        inputDir: path.dirname(path.resolve(repoRoot, input)),
      },
      null,
      2,
    ),
  ),
);

const outputPath = outputOverride
  ? path.resolve(repoRoot, outputOverride)
  : path.join(outputDir, `${post.slug}.mp4`);

const renderProcess = spawn(
  "npx",
  [
    "remotion",
    "render",
    "src/remotion/index.tsx",
    "SocialVideo",
    outputPath,
    "--props",
    propsPath,
    "--codec",
    "h264",
  ],
  { cwd: repoRoot, stdio: "inherit" },
);

const exitCode = await new Promise<number | null>((resolve) => {
  renderProcess.on("close", resolve);
});

if (exitCode !== 0) {
  process.exit(exitCode ?? 1);
}
