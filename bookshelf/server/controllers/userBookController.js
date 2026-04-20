import pool from "../db/db.js";

export async function addUserBook(req, res) {
  try {
    const {
      profileId,
      openLibraryId,
      title,
      authorName,
      coverId,
      publishedYear,
      status,
    } = req.body;

    if (!profileId || !openLibraryId || !title || !status) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (status !== "to_read" && status !== "read") {
      return res.status(400).json({ error: "Invalid status value." });
    }

    let bookResult = await pool.query(
      `SELECT * FROM BOOK_OpenLibrary WHERE OpenLibraryID = $1`,
      [openLibraryId]
    );

    let bookId;

    if (bookResult.rows.length === 0) {
      const insertedBook = await pool.query(
        `INSERT INTO BOOK_OpenLibrary 
          (OpenLibraryID, Title, AuthorName, CoverID, PublishedYear)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING ID`,
        [openLibraryId, title, authorName, coverId, publishedYear]
      );

      bookId = insertedBook.rows[0].id;
    } else {
      bookId = bookResult.rows[0].id;
    }

    const existingUserBook = await pool.query(
      `SELECT * FROM USER_Books WHERE ProfileID = $1 AND BookID = $2`,
      [profileId, bookId]
    );

    if (existingUserBook.rows.length > 0) {
      const updatedBook = await pool.query(
        `UPDATE USER_Books
         SET Status = $1
         WHERE ProfileID = $2 AND BookID = $3
         RETURNING *`,
        [status, profileId, bookId]
      );

      return res.json(updatedBook.rows[0]);
    }

    const userBookResult = await pool.query(
      `INSERT INTO USER_Books (ProfileID, BookID, Status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [profileId, bookId, status]
    );

    res.status(201).json(userBookResult.rows[0]);
  } catch (error) {
    console.error("Error adding user book:", error);
    res.status(500).json({ error: "Failed to save book." });
  }
}