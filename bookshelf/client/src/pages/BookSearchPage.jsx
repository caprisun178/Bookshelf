import { useState } from "react";
import { searchBooks, addUserBook } from "../services/api";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import "./BookSearchPage.css";

export default function BookSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const data = await searchBooks(query);
      setResults(data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const handleAdd = async (book, status) => {
    try {
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
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="book-search-page">
      <h1 className="page-title">Search Books</h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        placeholder="Search by title or author"
      />

      <div className="results-grid">
        {results.map((book) => (
          <BookCard
            key={book.openLibraryId}
            book={book}
            onAdd={handleAdd}
            showActions={true}
          />
        ))}
      </div>
    </div>
  );
}