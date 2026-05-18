// Loubfy OS — links `.claude/skills` to the agnostic `skills/` source.
//
// `.claude/skills` is generated, not committed (a symlink does not survive a
// Windows checkout cleanly). It is rebuilt automatically by `npm install`
// (postinstall) and can be re-run with `npm run setup:claude`.
//
// POSIX  -> relative symlink.
// Windows -> directory junction (works without admin or Developer Mode).
//
// The script never fails the install: on any problem it warns and exits 0.

import { existsSync, lstatSync, rmSync, symlinkSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

try {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
  const link = join(root, '.claude', 'skills');
  const target = join(root, 'skills');

  if (!existsSync(target)) {
    console.warn('[setup:claude] skills/ not found — skipped.');
    process.exit(0);
  }

  // A working link already resolves into the skills source: nothing to do.
  if (existsSync(join(link, 'onboarding', 'SKILL.md'))) {
    console.log('[setup:claude] .claude/skills already linked — OK.');
    process.exit(0);
  }

  // Remove any stale link, junction, or text file left by a previous checkout.
  if (existsSync(link) || isLink(link)) {
    rmSync(link, { recursive: true, force: true });
  }

  const type = process.platform === 'win32' ? 'junction' : 'dir';
  symlinkSync(type === 'junction' ? target : '../skills', link, type);

  const count = readdirSync(link).filter((d) =>
    existsSync(join(link, d, 'SKILL.md')),
  ).length;
  console.log(`[setup:claude] .claude/skills linked — ${count} skills discoverable.`);
} catch (err) {
  console.warn(`[setup:claude] could not link .claude/skills: ${err.message}`);
  console.warn('[setup:claude] run "npm run setup:claude" manually if Claude Code skills are missing.');
}

function isLink(p) {
  try {
    return lstatSync(p).isSymbolicLink();
  } catch {
    return false;
  }
}
