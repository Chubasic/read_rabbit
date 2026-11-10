use tauri_plugin_sql::{Migration, MigrationKind};

pub const REMOVE_CONTENT_ID_ADD_LAST_PAGE_DEFAULT: Migration = Migration {
    version: 4,
    description: "remove_content_id_add_last_page_default",
    sql: "CREATE TABLE books_new (
    id BLOB PRIMARY KEY DEFAULT (randomblob(16)),
    title TEXT NOT NULL,
    date_added TIMESTAMP NOT NULL,
    path TEXT NOT NULL,
    language TEXT NOT NULL,
    last_page INTEGER NOT NULL DEFAULT 1,
    last_opened TIMESTAMP NOT NULL
);
INSERT INTO books_new (id, title, date_added, path, language, last_page, last_opened)
SELECT id, title, date_added, path, language, last_page, last_opened FROM books;
DROP TABLE books;
ALTER TABLE books_new RENAME TO books;",
    kind: MigrationKind::Up,
};

pub const REMOVE_CONTENT_ID_ADD_LAST_PAGE_DEFAULT_DOWN: Migration = Migration {
    version: 4,
    description: "remove_content_id_add_last_page_default",
    sql: "CREATE TABLE books_new (
    id BLOB PRIMARY KEY DEFAULT (randomblob(16)),
    title TEXT NOT NULL,
    date_added TIMESTAMP NOT NULL,
    path TEXT NOT NULL,
    content_id TEXT NOT NULL,
    language TEXT NOT NULL,
    last_page INTEGER NOT NULL,
    last_opened TIMESTAMP NOT NULL
);
INSERT INTO books_new (id, title, date_added, path, content_id, language, last_page, last_opened)
SELECT id, title, date_added, path, '', language, last_page, last_opened FROM books;
DROP TABLE books;
ALTER TABLE books_new RENAME TO books;",
    kind: MigrationKind::Down,
};
