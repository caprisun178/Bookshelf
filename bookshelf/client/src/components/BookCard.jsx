import { useNavigate } from "react-router-dom";
import "./BookCard.css";

export default function BookCard({
  book,
  onAdd,
  onStatusChange,
  onDelete,
  showActions = false,
  showShelfActions = false,
  showViewDetails = false,
}) {
  const navigate = useNavigate();

  const openLibraryId = book.openLibraryId || book.openlibraryid;
  const title = book.title;
  const authorName = book.authorName || book.authorname;
  const coverId = book.coverId || book.coverid;
  const publishedYear = book.publishedYear || book.publishedyear;

  const handleViewDetails = () => {
    navigate(`/books/${encodeURIComponent(openLibraryId)}`, {
      state: { book },
    });
  };

  return (
    <div className="book-card">
      <div className="book-card-image-wrapper">
        {coverId ? (
          <img
            className="book-card-image"
            src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`}
            alt={title}
          />
        ) : (
          <div className="book-card-no-image">No Cover</div>
        )}
      </div>

      <div className="book-card-content">
        <h3 className="book-card-title">{title}</h3>
        <p className="book-card-author">{authorName}</p>

        {publishedYear && (
          <p className="book-card-year">Published: {publishedYear}</p>
        )}

        {book.status && <p>Status: {book.status}</p>}

        {showViewDetails && (
        <button className="view-details-button" onClick={handleViewDetails}>
          View Details
        </button>
      )}

        {showActions && (
          <div className="book-card-actions">
            <button onClick={() => onAdd(book, "Want To Read")}>Want To Read</button>
            <button onClick={() => onAdd(book, "Reading")}>Reading</button>
            <button onClick={() => onAdd(book, "Read")}>Read</button>
          </div>
        )}

        {showShelfActions && (
          <div className="book-card-actions">
            <button onClick={() => onStatusChange(book.id, "Want To Read")}>Want To Read</button>
            <button onClick={() => onStatusChange(book.id, "Reading")}>Reading</button>
            <button onClick={() => onStatusChange(book.id, "Read")}>Read</button>
            <button onClick={() => onDelete(book.id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}