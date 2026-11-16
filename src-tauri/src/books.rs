use crate::db::{db_connect, ConnectionFn};
use blake3::Hash;
use chrono::{DateTime, Local, Utc};
use serde::Deserialize;
use sqlx::Connection;
use tauri::{AppHandle, Manager};
use tokio::fs;

type BookId = String;

#[derive(Deserialize)]
#[serde(rename_all = "PascalCase")]
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

#[derive(Deserialize)]
#[serde(rename_all = "snake_case")]
pub struct BookLastPageUpdate {
    id: BookId,
    last_page: u32,
}

struct Book {
    id: BookId,
    title: String,
    path: String,
    language: String,
    last_page: u32,
    last_opened: DateTime<Utc>,
    date_added: DateTime<Utc>,
}

struct BookPatch {
    id: BookId,
    title: Option<String>,
    path: Option<String>,
    language: Option<String>,
    last_page: Option<u32>,
    last_opened: Option<DateTime<Utc>>,
    date_added: Option<DateTime<Utc>>,
}

#[tauri::command(rename_all = "snake_case")]
pub async fn set_last_page(patch: BookLastPageUpdate, app: AppHandle) {
    let dir = app
        .path()
        .app_data_dir()
        .expect("Failed to get app data dir");
    let connection = db_connect(dir);
    let book_patch = BookPatch {
        id: patch.id,
        last_page: Some(patch.last_page),
        last_opened: Some(Local::now().with_timezone(&Utc)),
        title: None,
        date_added: None,
        path: None,
        language: None,
    };
    upsert_book(book_patch, connection).await;
}

fn hash_contents(book_bytes: &[u8]) -> Hash {
    return blake3::Hasher::new().update(&book_bytes).finalize();
}

#[tauri::command(rename_all = "snake_case")]
pub async fn save_book(presave_book: BookPreSave, app: AppHandle) -> Result<BookId, String> {
    let dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
    let bytes = open_book(&presave_book.path)
        .await
        .map_err(|e| e.to_string())?;
    let hash = hash_contents(&bytes);
    let book_id = hash.to_string();
    let book = BookPatch {
        id: book_id.clone(),
        title: Some(presave_book.title),
        language: match presave_book.language {
            Languages::English => Some(String::from("en")),
        },
        path: Some(presave_book.path),
        last_page: Some(1),
        last_opened: Some(Local::now().with_timezone(&Utc)),
        date_added: Some(Local::now().with_timezone(&Utc)),
    };
    let connection = db_connect(dir);
    upsert_book(book, connection).await;
    Ok(book_id)
}

async fn open_book(path: &str) -> Result<Vec<u8>, std::io::Error> {
    return fs::read(path).await;
}

async fn upsert_book(book: BookPatch, connection: ConnectionFn) {
    match connection().await {
        Ok(mut conn) => match conn.begin().await {
            Ok(mut trx) => {
                let result = sqlx::query(
                    r#"
                          INSERT INTO books
                              (id, title, path, language, last_opened, date_added, last_page)
                          VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
                          ON CONFLICT(id) DO UPDATE SET
                              title = excluded.title,
                              path = excluded.path,
                              language = excluded.language,
                              last_opened = excluded.last_opened,
                              date_added = excluded.date_added,
                              last_page = excluded.last_page
                          "#,
                )
                .bind(&book.id)
                .bind(&book.title)
                .bind(&book.path)
                .bind(&book.language)
                .bind(&book.last_opened) // last_opened
                .bind(&book.date_added)
                .bind(book.last_page) // date_added
                .execute(&mut *trx) // This is literally a programming skateboarding...
                .await;
                //TODO: omit in favor of ?
                match result {
                    Ok(_) => {
                        if trx.commit().await.is_err() {
                            eprintln!("Transaction commit failed");
                        } else {
                            println!("Saved book '{:?}' (id: {})", &book.title, book.id);
                        }
                    }
                    Err(e) => {
                        eprintln!("Failed to write book to DB: {}", e); // TODO: Proper error handling
                    }
                }
            }
            Err(err) => {
                eprintln!("Failed to load book: {}", err); // TODO: Proper error handling
            }
        },
        Err(err) => {
            eprintln!("Failed to establish book: {}", err); // Need to read on a custom error types or smth
        }
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
        let result = open_book(&path_str).await;

        assert!(result.is_ok());
        let bytes = result.unwrap();
        assert_eq!(bytes, b"Hello, world!");
    }

    // Path that does not exist – should propagate an error.
    #[tokio::test]
    async fn test_open_book_not_found() {
        let path = "/nonexistent/path/does_not_exist.txt".to_string();
        let result = open_book(&path).await;
        assert!(result.is_err());
    }
}
