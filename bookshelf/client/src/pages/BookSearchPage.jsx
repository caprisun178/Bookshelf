import { useState } from "react";
import { searchBooks, addUserBook } from "../services/api";

export default function BookSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const data = await searchBooks(query);
    setResults(data);
  };

  const handleAdd = async (book, status) => {
    await addUserBook({
      profileId: 1,
      openLibraryId: book.openLibraryId,
      title: book.title,
      authorName: book.authorName,
      coverId: book.coverId,
      publishedYear: book.publishedYear,
      status,
    });

    alert("Book added!");
  };

  return (
    <div>
      <h1>Search Books</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title or author"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.map((book) => (
          <div key={book.openLibraryId} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{book.title}</h3>
            <p>{book.authorName}</p>
            {book.coverId && (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                alt={book.title}
              />
            )}
            <div>
              <button onClick={() => handleAdd(book, "to_read")}>Add to To Read</button>
              <button onClick={() => handleAdd(book, "read")}>Add to Read</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}