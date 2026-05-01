import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getBookDetails, addNote } from "../services/api";
import "./BookDetailsPage.css";

export default function BookDetailsPage() {
  const { workId } = useParams();
  const location = useLocation();

  const bookFromState = location.state?.book;

  const [book, setBook] = useState(bookFromState || null);
  const [details, setDetails] = useState(null);
  const [note, setNote] = useState("");

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
  }, [workId]);

  const handleSaveNote = async () => {
    if (!note.trim()) return;

    try {
      await addNote({
        userBookId: book?.id || 1,
        notes: note,
      });

      alert("Note saved!");
      setNote("");
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("Could not save note.");
    }
  };

  return (
    <div className="book-details-page">
      <section className="book-details-header">
        <div className="book-cover-section">
          {book?.coverId || book?.coverid ? (
            <img
              className="book-details-cover"
              src={`https://covers.openlibrary.org/b/id/${book.coverId || book.coverid}-L.jpg`}
              alt={book?.title}
            />
          ) : (
            <div className="book-details-no-cover">No Cover</div>
          )}
        </div>

        <div className="book-info-section">
          <h1>{book?.title || details?.title}</h1>
          <p><strong>Author:</strong> {book?.authorName || book?.authorname || "Unknown"}</p>
          <p><strong>Published:</strong> {book?.publishedYear || book?.publishedyear || "Unknown"}</p>

          <h2>Synopsis</h2>
          <p>
            {details?.description || "No synopsis is available for this book."}
          </p>
        </div>
      </section>

      <section className="notes-section">
        <h2>Story Notes</h2>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add your notes about the story..."
        />

        <button onClick={handleSaveNote}>Save Note</button>
      </section>
    </div>
  );
}