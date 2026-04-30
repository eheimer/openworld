#!/usr/bin/env bash
#
# Initialize the phase 2 database by copying the phase 1 reference database
# and applying phase 2 seed data migrations.
#
# Usage: npm run db:init
#
# Ownership rules:
#   Phase 1 owns ALL DDL (static + dynamic table schemas).
#   Phase 1 owns ALL static table DML (seed data for monsters, skills, etc.).
#   Phase 2 owns ONLY dynamic table DML (seed data for players, games, etc.).
#
# This script:
#   1. Copies reference/dev.sqlite from the phase 1 project (../reboot/)
#   2. Applies the dynamic tables DDL (reference/dynamic-tables.sql)
#   3. Runs phase 2 seed migrations from migrations/*.sql (DML only)
#
# Phase 2 migrations must NEVER contain DDL (CREATE TABLE, ALTER TABLE, etc.)
# or writes to static tables. Violations are caught and rejected below.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

PHASE1_DB="../reboot/reference/dev.sqlite"
PHASE1_DDL="../reboot/reference/dynamic-tables.sql"
TARGET_DB="$PROJECT_ROOT/data/game.sqlite"
MIGRATIONS_DIR="$PROJECT_ROOT/migrations"

# Resolve phase 1 paths relative to project root
cd "$PROJECT_ROOT"

if [ ! -f "$PHASE1_DB" ]; then
  echo "ERROR: Phase 1 database not found at $PHASE1_DB"
  echo "Make sure the reboot project is at ../reboot/ relative to this project."
  exit 1
fi

if [ ! -f "$PHASE1_DDL" ]; then
  echo "ERROR: Dynamic tables DDL not found at $PHASE1_DDL"
  exit 1
fi

# Validate phase 2 migrations contain no DDL
if [ -d "$MIGRATIONS_DIR" ] && ls "$MIGRATIONS_DIR"/*.sql 1>/dev/null 2>&1; then
  echo "Validating phase 2 migrations (DML only)..."
  DDL_PATTERN='^\s*\(CREATE\|ALTER\|DROP\|TRUNCATE\)\s'
  for f in "$MIGRATIONS_DIR"/*.sql; do
    if grep -iq '^\s*\(CREATE\|ALTER\|DROP\|TRUNCATE\)\s' "$f"; then
      echo "ERROR: $(basename "$f") contains DDL statements."
      echo "Phase 2 migrations must contain DML only (INSERT/UPDATE/DELETE)."
      echo "Schema changes must be made in phase 1 (../reboot/)."
      exit 1
    fi
  done
  echo "  -> All migrations are DML-only. OK."
fi

# Create data directory if needed
mkdir -p "$(dirname "$TARGET_DB")"

# Step 1: Copy the phase 1 database
echo "Copying phase 1 database..."
cp "$PHASE1_DB" "$TARGET_DB"
echo "  -> $TARGET_DB"

# Step 2: Apply dynamic tables DDL
echo "Applying dynamic tables DDL..."
sqlite3 "$TARGET_DB" < "$PHASE1_DDL"
echo "  -> dynamic-tables.sql applied"

# Step 3: Run phase 2 seed migrations (if any exist)
if [ -d "$MIGRATIONS_DIR" ] && ls "$MIGRATIONS_DIR"/*.sql 1>/dev/null 2>&1; then
  echo "Running phase 2 seed migrations..."
  for f in "$MIGRATIONS_DIR"/*.sql; do
    echo "  -> $(basename "$f")"
    sqlite3 "$TARGET_DB" < "$f"
  done
else
  echo "No phase 2 migrations found (migrations/*.sql). Skipping."
fi

echo ""
echo "Database initialized at $TARGET_DB"
echo "  Static tables : read-only  (phase 1 owns schema + data)"
echo "  Dynamic tables: read-write (phase 2 owns data only)"
