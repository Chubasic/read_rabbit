#!/usr/bin/env bash
set -euo pipefail

# This script creates a new migration file in src-tauri/src/migrations/
# The file name is prefixed with the current timestamp
# Example: 20241026123045_create_users.rs
#
# Usage: ./mkmigration.sh migration_name

if [[ -z "${1:-}" ]]; then
  echo "Usage: $0 migration_name"
  exit 1
fi

TIMESTAMP=$(date +%Y%m%d%H%M%S)
NAME="$1"
UP_CONST=$(echo "$NAME" | tr '[:lower:]' '[:upper:]')
DOWN_CONST="${UP_CONST}_DOWN"
FILENAME="src/migrations/${TIMESTAMP}_${NAME}.rs"

# Create the migrations directory if it does not exist
mkdir -p "src/migrations"

cat > "$FILENAME" << EOF
use tauri_plugin_sql::{Migration, MigrationKind};

pub const ${UP_CONST}: Migration = Migration {
    version: 1,
    description: "$NAME",
    sql: "CREATE TABLE IF NOT EXISTS ${NAME} (id BLOB PRIMARY KEY DEFAULT (randomblob(16)));\nINSERT INTO migrations (id, name, created_at) VALUES (hex(randomblob(16)), '$NAME', datetime('now'));",
    kind: MigrationKind::Up,
};

pub const ${DOWN_CONST}: Migration = Migration {
    version: 1,
    description: "$NAME",
    sql: "DROP TABLE IF EXISTS ${NAME};\nDELETE FROM migrations WHERE name = '$NAME';",
    kind: MigrationKind::Down,
};
EOF

echo "Created migration file: $FILENAME"
