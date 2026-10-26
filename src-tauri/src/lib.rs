pub mod migrations;
use crate::migrations::ADD_BOOK_TABLE;
use crate::migrations::ADD_USER_CONFIG_TABLE;
use crate::migrations::ALTER_BOOKS_TABLE;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    const DB_URI: &str = "sqlite:rabbitread.db";

    let migrations = vec![ADD_BOOK_TABLE, ADD_USER_CONFIG_TABLE, ALTER_BOOKS_TABLE];
    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::new()
                .add_migrations(DB_URI, migrations)
                .build(),
        )
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
