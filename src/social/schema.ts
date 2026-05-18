import { existsSync } from "node:fs";
import path from "node:path";
export {
  accountIdSchema,
  dimensionsSchema,
  formatSchema,
  platformSchema,
  postSchema,
  presetDimensions,
  slideSchema,
  sourcePermissionSchema,
} from "./post-schema";
export type { MediaSpec, PostSpec, SlideSpec } from "./post-schema";
import { postSchema, type MediaSpec, type PostSpec } from "./post-schema";

export const repoRoot = process.cwd();

export const loadPostSpec = async (inputPath: string): Promise<PostSpec> => {
  const absoluteInputPath = path.resolve(repoRoot, inputPath);
  const raw = await import("node:fs/promises").then((fs) =>
    fs.readFile(absoluteInputPath, "utf8"),
  );
  const parsed = JSON.parse(raw) as unknown;
  return postSchema.parse(parsed);
};

export const defaultOutputDir = (inputPath: string, post: PostSpec) => {
  if (post.outputDir) {
    return path.resolve(repoRoot, post.outputDir);
  }

  return path.join(path.dirname(path.resolve(repoRoot, inputPath)), "final");
};

export const expectedPostDir = (post: PostSpec) =>
  path.join("content", "social-media", post.platform, post.accountId, post.slug);

export const resolveAssetPath = (inputPath: string, assetSrc: string) => {
  if (/^https?:\/\//i.test(assetSrc)) {
    return assetSrc;
  }

  return path.resolve(path.dirname(path.resolve(repoRoot, inputPath)), assetSrc);
};

export const toFileUrl = (absolutePathOrUrl: string) => {
  if (/^https?:\/\//i.test(absolutePathOrUrl)) {
    return absolutePathOrUrl;
  }

  return new URL(`file://${absolutePathOrUrl}`).href;
};

export const mediaCanBeExported = (media: MediaSpec) =>
  ["owned", "licensed", "permission-granted", "public-domain"].includes(
    media.source.permission,
  );

export const validatePostForExport = (post: PostSpec, inputPath: string) => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const normalizedInput = path
    .relative(repoRoot, path.resolve(repoRoot, inputPath))
    .split(path.sep)
    .join("/");
  const expectedDir = expectedPostDir(post).split(path.sep).join("/");

  if (!normalizedInput.startsWith(`${expectedDir}/`)) {
    warnings.push(
      `path convention: expected post.json under ${expectedDir}/, got ${normalizedInput}`,
    );
  }

  post.slides.forEach((slide, index) => {
    if (!slide.media) {
      return;
    }

    const label = `slide ${index + 1}`;
    if (!mediaCanBeExported(slide.media)) {
      errors.push(
        `${label}: media permission "${slide.media.source.permission}" cannot be exported. Use owned, licensed, permission-granted, or public-domain media.`,
      );
    }

    const src = resolveAssetPath(inputPath, slide.media.src);
    if (!/^https?:\/\//i.test(src) && !existsSync(src)) {
      errors.push(`${label}: media file not found: ${src}`);
    }

    if (slide.media.type === "video" && slide.media.poster) {
      const poster = resolveAssetPath(inputPath, slide.media.poster);
      if (!/^https?:\/\//i.test(poster) && !existsSync(poster)) {
        errors.push(`${label}: poster file not found: ${poster}`);
      }
    }
  });

  return { errors, warnings };
};
