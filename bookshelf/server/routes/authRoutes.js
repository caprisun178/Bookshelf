import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT ID, Username, Email, FirstName, LastName
       FROM USER_Profile
       WHERE Username = $1 AND Password = $2`,
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;