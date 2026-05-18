// Loubfy OS — rebuilds the `.claude/skills` link to the agnostic `skills/` source.
//
// `.claude/skills` is committed as a POSIX symlink, so macOS/Linux clones work
// with no setup. Run this only if the link is missing or broken — typically on
// Windows, where checked-out symlinks may not resolve.
//
// Usage: npm run setup:claude

import { existsSync, lstatSync, rmSync, symlinkSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const link = join(root, '.claude', 'skills');
const target = join(root, 'skills');

if (!existsSync(target)) {
  console.error('skills/ not found — run this from the repository root.');
  process.exit(1);
}

// A working link already resolves to the skills source: nothing to do.
if (existsSync(join(link, 'onboarding', 'SKILL.md'))) {
  console.log('.claude/skills already linked to skills/ — OK.');
  process.exit(0);
}

if (existsSync(link) || isLink(link)) {
  rmSync(link, { recursive: true, force: true });
}

// 'junction' is the only link type that works on Windows without elevation.
const type = process.platform === 'win32' ? 'junction' : 'dir';
symlinkSync(type === 'junction' ? target : '../skills', link, type);

const skills = readdirSync(link).filter((d) =>
  existsSync(join(link, d, 'SKILL.md')),
);
console.log(`.claude/skills linked — ${skills.length} skills discoverable.`);

function isLink(p) {
  try {
    return lstatSync(p).isSymbolicLink();
  } catch {
    return false;
  }
}
