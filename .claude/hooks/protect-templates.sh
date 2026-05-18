#!/usr/bin/env bash
# Loubfy OS — protects references/templates/ (canonical source-of-truth templates).
# See AGENTS.md "Template Source Of Truth". On any Write/Edit inside
# references/templates/, this forces a confirmation prompt instead of a silent edit.

input=$(cat)

target=$(printf '%s' "$input" | node -e '
let s="";
process.stdin.on("data", d => s += d).on("end", () => {
  try {
    const j = JSON.parse(s);
    const ti = j.tool_input || {};
    process.stdout.write(ti.file_path || ti.notebook_path || "");
  } catch (e) { /* no parseable path: allow */ }
});
')

case "$target" in
  *references/templates/*)
    cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"references/templates/ e fonte de verdade protegida (ver AGENTS.md > Template Source Of Truth). Confirme apenas se o usuario pediu explicitamente para alterar o template. Caso contrario, crie o trabalho novo em content/social-media/{platform}/{accountId}/{slug}/."}}
JSON
    ;;
esac

exit 0
