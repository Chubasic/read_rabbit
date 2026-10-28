use sqlx::{Connection, SqliteConnection};

pub async fn connection() -> Result<sqlx::SqliteConnection, sqlx::Error> {
    let url = "sqlite:rabbitread.db";
    let conn = SqliteConnection::connect(url).await?;
    return Ok(conn);
}
