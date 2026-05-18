import path from "node:path";
import { loadPostSpec, repoRoot, validatePostForExport } from "../../src/social/schema";

const input = process.argv.includes("--input")
  ? process.argv[process.argv.indexOf("--input") + 1]
  : undefined;

if (!input) {
  throw new Error("Usage: npm run validate:post -- --input path/to/post.json");
}

const post = await loadPostSpec(input);
const { errors, warnings } = validatePostForExport(post, input);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Post OK: ${post.slug} (${post.platform}/${post.accountId}, ${post.format}, ${post.slides.length} slide(s))`,
);
if (warnings.length > 0) {
  console.warn(warnings.join("\n"));
}
console.log(`Input: ${path.relative(repoRoot, path.resolve(repoRoot, input))}`);
