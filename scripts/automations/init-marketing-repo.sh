#!/usr/bin/env bash
set -euo pipefail

repo_url="${1:-}"
target_dir="${2:-}"

if [[ -z "$repo_url" ]]; then
  echo "Usage: scripts/automations/init-marketing-repo.sh <repo-url> [target-dir]"
  echo ""
  echo "Optional env vars:"
  echo "  PLATFORM=instagram"
  echo "  ACCOUNT_ID=empresa-institucional"
  echo "  DISPLAY_NAME='Empresa Institucional'"
  echo "  ACCOUNT_NOTES='Conta institucional da empresa'"
  exit 1
fi

if [[ -z "$target_dir" ]]; then
  repo_name="$(basename "$repo_url" .git)"
  target_dir="$repo_name"
fi

if [[ ! -d "$target_dir" ]]; then
  git clone "$repo_url" "$target_dir"
fi

cd "$target_dir"

npm install
npm run typecheck

if [[ -n "${PLATFORM:-}" && -n "${ACCOUNT_ID:-}" ]]; then
  npm run account:create -- \
    --platform "$PLATFORM" \
    --account-id "$ACCOUNT_ID" \
    --display-name "${DISPLAY_NAME:-$ACCOUNT_ID}" \
    --notes "${ACCOUNT_NOTES:-TBD}"
fi

echo "Marketing repo ready at: $(pwd)"
