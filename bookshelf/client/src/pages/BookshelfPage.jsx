import { useEffect, useState } from "react";
import { getUserBooks, updateUserBook, deleteUserBook } from "../services/api";

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
    try {
      await updateUserBook(id, { status: newStatus });
      loadBooks();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserBook(id);
      loadBooks();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
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

      {filteredBooks.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>Author: {book.authorname}</p>
          <p>Status: {book.status}</p>

          {book.coverid && (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.coverid}-M.jpg`}
              alt={book.title}
            />
          )}

          <div>
            <button onClick={() => handleStatusChange(book.id, "Want To Read")}>
              Want To Read
            </button>
            <button onClick={() => handleStatusChange(book.id, "Reading")}>
              Reading
            </button>
            <button onClick={() => handleStatusChange(book.id, "Read")}>
              Read
            </button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}