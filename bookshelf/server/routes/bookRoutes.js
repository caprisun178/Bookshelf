const express = require("express");
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    const books = data.docs.slice(0, 10).map((book) => ({
      openLibraryId: book.key,
      title: book.title,
      authorName: book.author_name ? book.author_name[0] : "Unknown",
      coverId: book.cover_i || null,
      publishedYear: book.first_publish_year || null,
    }));

    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search books" });
  }
});

module.exports = router;