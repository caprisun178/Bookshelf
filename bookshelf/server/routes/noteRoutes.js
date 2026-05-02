import express from "express";
import pool from "../db/db.js";

const router = express.Router();

// Get notes for one saved user book
router.get("/:userBookId", async (req, res) => {
  const { userBookId } = req.params;

  try {
    const result = await pool.query(
      `SELECT ID, UserBookID, Notes, CreatedDate
       FROM USER_Notes
       WHERE UserBookID = $1
       ORDER BY CreatedDate DESC`,
      [userBookId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Add a note to one saved user book
router.post("/", async (req, res) => {
  const { userBookId, notes } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO USER_Notes (UserBookID, Notes)
       VALUES ($1, $2)
       RETURNING ID, UserBookID, Notes, CreatedDate`,
      [userBookId, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: "Failed to save note" });
  }
});

export default router;