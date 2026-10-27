use chrono::{DateTime, Local};
use serde::Deserialize;
use std::{hash::Hash, io::Error};
use tokio::fs;

#[derive(Deserialize)]
#[serde(untagged)]
enum Languages {
    English,
}

#[derive(Deserialize)]
#[serde(rename_all = "snake_case")]
pub struct BookPreSave {
    title: String,
    path: String,
    language: Languages,
}

struct Book {
    content_id: String, // Well maybe not
    title: String,
    path: String,
    language: String,
    last_opened: DateTime<Local>,
    date_added: DateTime<Local>,
}

fn hash_contents(book_bytes: Vec<u8>) {
    blake3::Hasher::new().update(&book_bytes).finalize();
}

async fn open_book(path: String) -> Result<Vec<u8>, std::io::Error> {
    let contents = fs::read_to_string(path).await?;
    Ok(contents.into_bytes())
}

#[tauri::command(rename_all = "snake_case")]
pub async fn save_book(book: BookPreSave) {
    match open_book(book.path).await {
        Ok(bytes) => {
            let hash = hash_contents(bytes);
            // TODO:
            // - Use hash as id(?)
            // - Write book data to DB
        }
        Err(msg) => eprintln!("Failed to load book: {}", msg),
    }
}
