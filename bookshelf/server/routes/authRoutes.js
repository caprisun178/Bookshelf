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

router.post("/register", async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO USER_Profile 
        (Username, Password, Email, FirstName, LastName)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING ID, Username, Email, FirstName, LastName`,
      [username, password, email, firstName, lastName]
    );

    res.status(201).json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Could not create account" });
  }
});


export default router;