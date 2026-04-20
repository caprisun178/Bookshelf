import { useEffect, useState } from "react";
import { getUserBooks, updateUserBook, deleteUserBook } from "../services/api";

export default function BookshelfPage() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("all");

  async function loadBooks() {
    const data = await getUserBooks(1);
    setBooks(data);
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
        <option value="to_read">To Read</option>
        <option value="read">Read</option>
      </select>

      {filteredBooks.map((book) => (
        <div key={book.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
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
            <button onClick={() => handleStatusChange(book.id, "read")}>Mark Read</button>
            <button onClick={() => handleStatusChange(book.id, "to_read")}>Mark To Read</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}