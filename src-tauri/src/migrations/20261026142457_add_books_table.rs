use tauri_plugin_sql::{Migration, MigrationKind};

pub const ADD_BOOK_TABLE: Migration = Migration {
    version: 1,
    description: "add_books_table",
    sql: "CREATE TABLE IF NOT EXISTS books (id BLOB PRIMARY KEY DEFAULT (randomblob(16)), name TEXT NOT NULL, date_added TEXT NOT NULL, path TEXT NOT NULL);",
    kind: MigrationKind::Up,
};

pub const ADD_BOOK_TABLE_DOWN: Migration = Migration {
    version: 1,
    description: "add_books_table",
    sql: "DROP TABLE IF EXISTS books;",
    kind: MigrationKind::Down,
};
