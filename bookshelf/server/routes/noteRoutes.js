const express = require("express");
const router = express.Router();
const pool = require("../db/db");

router.post("/", async (req, res) => {
  const { userBookId, notes } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO USER_Notes (UserBookID, Notes)
       VALUES ($1, $2)
       RETURNING *`,
      [userBookId, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save note" });
  }
});

router.get("/:userBookId", async (req, res) => {
  const { userBookId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM USER_Notes
       WHERE UserBookID = $1
       ORDER BY CreatedDate DESC`,
      [userBookId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

module.exports = router;