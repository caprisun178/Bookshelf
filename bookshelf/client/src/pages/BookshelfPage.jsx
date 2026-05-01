import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserBooks, updateUserBook, deleteUserBook } from "../services/api";
import BookCard from "../components/BookCard";

export default function BookshelfPage() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("all");

  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  async function loadBooks() {
    try {
      const data = await getUserBooks(user.id);
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
            showViewDetails={true}
          />
        ))}
      </div>
    </div>
  );
}