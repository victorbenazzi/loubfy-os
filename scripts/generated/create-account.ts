import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { accountIdSchema, platformSchema } from "../../src/social/post-schema";
import { repoRoot } from "../../src/social/schema";

const arg = (name: string) =>
  process.argv.includes(name)
    ? process.argv[process.argv.indexOf(name) + 1]
    : undefined;

const platform = platformSchema.parse(arg("--platform"));
const accountId = accountIdSchema.parse(arg("--account-id"));
const displayName = arg("--display-name") ?? accountId;
const notes = arg("--notes") ?? "TBD";

const accountDir = path.join(repoRoot, "content", "social-media", platform, accountId);
const contextDir = path.join(repoRoot, "context", "accounts");
const contextPath = path.join(contextDir, `${platform}-${accountId}.md`);

await mkdir(accountDir, { recursive: true });
await mkdir(contextDir, { recursive: true });

const keepPath = path.join(accountDir, ".gitkeep");
if (!existsSync(keepPath)) {
  await writeFile(keepPath, "");
}

if (!existsSync(contextPath)) {
  await writeFile(
    contextPath,
    `# ${displayName}\n\n## Account\n\n- Platform: ${platform}\n- Account ID: ${accountId}\n- Display name: ${displayName}\n\n## Role\n\n${notes}\n\n## Audience\n\nTBD\n\n## Voice Notes\n\nTBD\n\n## Content Formats\n\nTBD\n\n## Guardrails\n\nTBD\n`,
  );
}

console.log(`Account ready: ${platform}/${accountId}`);
console.log(`Content path: ${path.relative(repoRoot, accountDir)}`);
console.log(`Context file: ${path.relative(repoRoot, contextPath)}`);
