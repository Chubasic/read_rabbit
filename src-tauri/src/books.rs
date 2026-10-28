use crate::db::connection;
use blake3::Hash;
use chrono::{DateTime, Local};
use serde::Deserialize;
use sqlx::Connection;
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

fn hash_contents(book_bytes: &[u8]) -> Hash {
    return blake3::Hasher::new().update(&book_bytes).finalize();
}

#[tauri::command(rename_all = "snake_case")]
pub async fn save_book(presave_book: BookPreSave) {
    match open_book(&presave_book.path).await {
        Ok(bytes) => {
            let hash = hash_contents(&bytes);
            let book = Book {
                content_id: hash.to_string(),
                title: presave_book.title,
                language: match presave_book.language {
                    Languages::English => String::from("en"), // This looks really bad :)
                },
                path: presave_book.path,
                last_opened: Local::now(),
                date_added: Local::now(),
            };

            upsert_book(book).await
        }
        Err(msg) => eprintln!("Failed to load book: {}", msg),
    }
}

async fn open_book(path: &str) -> Result<Vec<u8>, std::io::Error> {
    let contents = fs::read_to_string(path).await?;
    Ok(contents.into_bytes())
}

async fn upsert_book(book: Book) {
    match connection().await {
        Ok(mut conn) => match conn.begin().await {
            Ok(mut tx) => {
                let result = sqlx::query(
                    r#"
                          INSERT INTO books
                              (id, title, path, language, last_opened, date_added)
                          VALUES (?1, ?2, ?3, ?4, ?5, ?6)
                          ON CONFLICT(id) DO UPDATE SET
                              title = excluded.title,
                              path = excluded.path,
                              language = excluded.language,
                              last_opened = excluded.last_opened,
                              date_added = excluded.date_added
                          "#,
                )
                .bind(&book.content_id)
                .bind(&book.title)
                .bind(&book.path)
                .bind(&book.language)
                .bind(&book.last_opened.to_string()) // last_opened
                .bind(&book.date_added.to_string()) // date_added
                .execute(&mut *tx)
                .await;

                match result {
                    Ok(_) => {
                        if tx.commit().await.is_err() {
                            eprintln!("Transaction commit failed");
                        } else {
                            println!("Saved book '{}' (id: {})", book.title, book.content_id);
                        }
                    }
                    Err(e) => {
                        eprintln!("Failed to write book to DB: {}", e); // TODO: Proper error handling
                    }
                }
            }
            Err(err) => {
                eprintln!("Failed to load book: {}", err); // TODO: Proper error handling
                return;
            }
        },
        Err(err) => {
            eprintln!("Failed to establish book: {}", err); // Need to read on a custom error types or smth
            return;
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
