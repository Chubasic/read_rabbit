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

#[cfg(test)]
mod tests {
    use super::*;
    use std::env;
    use std::fs::write;

    // Successful read – returns the exact bytes we wrote.
    #[tokio::test]
    async fn test_open_book_success() {
        // Create a temporary file with known contents
        let tmp_dir = env::temp_dir();
        let file_path = tmp_dir.join("open_book_test_success.txt");
        write(&file_path, b"Hello, world!").expect("Failed to write test file");

        let path_str = file_path.to_string_lossy().to_string();
        let result = open_book(path_str).await;

        assert!(result.is_ok());
        let bytes = result.unwrap();
        assert_eq!(bytes, b"Hello, world!");
    }

    // Path that does not exist – should propagate an error.
    #[tokio::test]
    async fn test_open_book_not_found() {
        let path = "/nonexistent/path/does_not_exist.txt".to_string();
        let result = open_book(path).await;
        assert!(result.is_err());
    }
}
