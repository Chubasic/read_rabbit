#[path = "20261026142457_add_books_table.rs"]
pub mod add_books_table;

#[path = "20261026142458_add_user_config_table.rs"]
pub mod add_user_config_table;

#[path = "20261026213447_alter_books_table.rs"]
pub mod alter_books_table;

pub use add_books_table::ADD_BOOK_TABLE;
pub use add_books_table::ADD_BOOK_TABLE_DOWN;

pub use add_user_config_table::ADD_USER_CONFIG_TABLE;
pub use add_user_config_table::ADD_USER_CONFIG_TABLE_DOWN;

pub use alter_books_table::ALTER_BOOKS_TABLE;
pub use alter_books_table::ALTER_BOOKS_TABLE_DOWN;
