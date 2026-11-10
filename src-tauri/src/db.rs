use sqlx::{Connection, SqliteConnection};
use std::{future::Future, path::PathBuf, pin::Pin};

pub type ConnectionFuture =
    Pin<Box<dyn Future<Output = Result<SqliteConnection, sqlx::Error>> + Send + 'static>>;

pub type ConnectionFn = Box<dyn Fn() -> ConnectionFuture + Send + Sync + 'static>;

pub const DB_NAME: &str = "rabbitread.db";

pub fn db_connect(db_path: Result<PathBuf, String>) -> ConnectionFn {
    let db_path = match db_path {
        Ok(path) => path.join(DB_NAME),
        Err(err) => {
            eprintln!("Failed to load db path: {err}");
            panic!()
        }
    };

    Box::new(move || {
        let path = db_path.clone();
        Box::pin(async move { SqliteConnection::connect(&path.to_string_lossy()).await })
    })
}
