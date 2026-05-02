import { useEffect, useState } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import { getBookDetails, addNote, getNotes } from "../services/api";
import "./BookDetailsPage.css";

export default function BookDetailsPage() {
  const { workId } = useParams();
  const location = useLocation();
  const book = location.state?.book;

  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [details, setDetails] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!book) {
    return <p>No book selected. Go back to your bookshelf and choose a book.</p>;
  }

  async function loadNotes() {
    try {
      const data = await getNotes(book.id);
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load notes:", error);
      setNotes([]);
    }
  }

  useEffect(() => {
    async function loadDetails() {
      try {
        const data = await getBookDetails(workId);
        setDetails(data);
      } catch (error) {
        console.error("Failed to load book details:", error);
      }
    }

    loadDetails();
    loadNotes();
  }, [workId]);

  const handleSaveNote = async () => {
    if (!noteText.trim()) return;

    try {
      await addNote({
        userBookId: book.id,
        notes: noteText,
      });

      setNoteText("");
      loadNotes();
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("Could not save note.");
    }
  };

  return (
    <div className="book-details-page">
      <section className="book-details-header">
        <div className="book-cover-section">
          {book.coverid ? (
            <img
              className="book-details-cover"
              src={`https://covers.openlibrary.org/b/id/${book.coverid}-L.jpg`}
              alt={book.title}
            />
          ) : (
            <div className="book-details-no-cover">No Cover</div>
          )}
        </div>

        <div className="book-info-section">
          <h1>{book.title}</h1>
          <p><strong>Author:</strong> {book.authorname}</p>
          <p><strong>Status:</strong> {book.status}</p>

          <h2>Synopsis</h2>
          <p>{details?.description || "No synopsis is available for this book."}</p>
        </div>
      </section>

      <section className="notes-section">
        <h2>My Notes</h2>

        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your thoughts about the story..."
        />

        <button onClick={handleSaveNote}>Save Note</button>

        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <p>{note.notes}</p>
              <small>{new Date(note.createddate).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}