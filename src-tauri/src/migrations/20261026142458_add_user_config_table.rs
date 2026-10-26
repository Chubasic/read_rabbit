use tauri_plugin_sql::{Migration, MigrationKind};

pub const ADD_USER_CONFIG_TABLE: Migration = Migration {
    version: 2,
    description: "add_user_config_table",
    sql: "CREATE TABLE IF NOT EXISTS user_config (id BLOB PRIMARY KEY DEFAULT (randomblob(16)));",
    kind: MigrationKind::Up,
};

pub const ADD_USER_CONFIG_TABLE_DOWN: Migration = Migration {
    version: 2,
    description: "add_user_config_table",
    sql: "DROP TABLE IF EXISTS user_config;",
    kind: MigrationKind::Down,
};
