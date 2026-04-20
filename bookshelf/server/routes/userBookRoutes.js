import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// Add a book to a user's shelf
router.post("/", async (req, res) => {
  const { profileId, openLibraryId, title, authorName, coverId, publishedYear, status } = req.body;

  try {
    let bookResult = await pool.query(
      `SELECT * FROM BOOK_OpenLibrary WHERE OpenLibraryID = $1`,
      [openLibraryId]
    );

    let bookId;

    if (bookResult.rows.length === 0) {
      const insertedBook = await pool.query(
        `INSERT INTO BOOK_OpenLibrary (OpenLibraryID, Title, AuthorName, CoverID, PublishedYear)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING ID`,
        [openLibraryId, title, authorName, coverId, publishedYear]
      );
      bookId = insertedBook.rows[0].id;
    } else {
      bookId = bookResult.rows[0].id;
    }

    const userBookResult = await pool.query(
      `INSERT INTO USER_Books (ProfileID, BookID, Status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [profileId, bookId, status]
    );

    res.status(201).json(userBookResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save book" });
  }
});

// Get all books for one user
router.get("/:profileId", async (req, res) => {
  const { profileId } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
          ub.ID,
          ub.Status,
          ub.Rating,
          ub.CreatedDate,
          b.Title,
          b.AuthorName,
          b.CoverID,
          b.PublishedYear,
          b.OpenLibraryID
       FROM USER_Books ub
       JOIN BOOK_OpenLibrary b ON ub.BookID = b.ID
       WHERE ub.ProfileID = $1
       ORDER BY ub.CreatedDate DESC`,
      [profileId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user books" });
  }
});

// Update read/to_read status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, rating } = req.body;

  try {
    const result = await pool.query(
      `UPDATE USER_Books
       SET Status = $1, Rating = $2
       WHERE ID = $3
       RETURNING *`,
      [status, rating || null, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Delete from shelf
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM USER_Books WHERE ID = $1`, [id]);
    res.json({ message: "Book removed from shelf" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

export default router;