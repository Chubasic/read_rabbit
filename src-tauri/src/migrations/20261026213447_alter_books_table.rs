use tauri_plugin_sql::{Migration, MigrationKind};

pub const ALTER_BOOKS_TABLE: Migration = Migration {
    version: 3,
    description: "alter_books_table",
    sql: "ALTER TABLE books DROP COLUMN date_added;\nALTER TABLE books ADD COLUMN date_added TIMESTAMP NOT NULL;\nALTER TABLE books ADD COLUMN content_id TEXT NOT NULL;\nALTER TABLE books ADD COLUMN language TEXT NOT NULL;\nALTER TABLE books ADD COLUMN last_page INTEGER NOT NULL;\nALTER TABLE books ADD COLUMN last_opened TIMESTAMP NOT NULL;\nALTER TABLE books RENAME COLUMN name TO title;",
    kind: MigrationKind::Up,
};

pub const ALTER_BOOKS_TABLE_DOWN: Migration = Migration {
    version: 3,
    description: "alter_books_table",
    sql: "ALTER TABLE books RENAME COLUMN title TO name;\nALTER TABLE books DROP COLUMN content_id;\nALTER TABLE books DROP COLUMN language;\nALTER TABLE books DROP COLUMN last_page;\nALTER TABLE books DROP COLUMN last_opened;\nALTER TABLE books DROP COLUMN date_added;\nALTER TABLE books ADD COLUMN date_added TEXT;\nDELETE FROM _sqlx_migrations WHERE name = 'alter_books_table';",
    kind: MigrationKind::Down,
};
