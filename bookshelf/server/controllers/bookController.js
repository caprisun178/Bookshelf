export async function searchBooks(req, res) {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: "Search query is required." });
    }

    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Open Library");
    }

    const data = await response.json();

    const books = data.docs.slice(0, 12).map((book) => ({
      openLibraryId: book.key || null,
      title: book.title || "Unknown Title",
      authorName: book.author_name ? book.author_name[0] : "Unknown Author",
      publishedYear: book.first_publish_year || null,
      coverId: book.cover_i || null,
    }));

    res.json(books);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Failed to search books." });
  }
}

export async function getBookDetails(req, res) {
  try {
    const { workId } = req.params;

    const response = await fetch(`https://openlibrary.org/works/${workId}.json`);
    const data = await response.json();

    let description = null;

    if (typeof data.description === "string") {
      description = data.description;
    } else if (data.description?.value) {
      description = data.description.value;
    }

    res.json({
      title: data.title,
      description,
    });
  } catch (error) {
    console.error("Error fetching book details:", error);
    res.status(500).json({ error: "Failed to fetch book details" });
  }
}