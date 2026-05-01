import { useEffect, useState } from "react";
import { getUserBooks, updateUserBook, deleteUserBook } from "../services/api";
import BookCard from "../components/BookCard";

export default function BookshelfPage() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("all");

  async function loadBooks() {
    try {
      const data = await getUserBooks(1);
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load books:", error);
      setBooks([]);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  const filteredBooks =
    filter === "all" ? books : books.filter((book) => book.status === filter);

  const handleStatusChange = async (id, newStatus) => {
    await updateUserBook(id, { status: newStatus });
    loadBooks();
  };

  const handleDelete = async (id) => {
    await deleteUserBook(id);
    loadBooks();
  };

  return (
    <div>
      <h1>My Bookshelf</h1>

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="Want To Read">Want To Read</option>
        <option value="Reading">Reading</option>
        <option value="Read">Read</option>
      </select>

      <div className="results-grid">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            showShelfActions={true}
          />
        ))}
      </div>
    </div>
  );
}