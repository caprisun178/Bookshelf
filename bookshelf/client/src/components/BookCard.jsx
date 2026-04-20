import "./BookCard.css";

export default function BookCard({ book, onAdd, showActions = false }) {
  return (
    <div className="book-card">
      <div className="book-card-image-wrapper">
        {book.coverId ? (
          <img
            className="book-card-image"
            src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
            alt={book.title}
          />
        ) : (
          <div className="book-card-no-image">No Cover</div>
        )}
      </div>

      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.authorName}</p>
        {book.publishedYear && (
          <p className="book-card-year">Published: {book.publishedYear}</p>
        )}

        {showActions && (
          <div className="book-card-actions">
            <button onClick={() => onAdd(book, "Want To Read")}>To Read</button>
            <button onClick={() => onAdd(book, "Read")}>Have Read</button>
          </div>
        )}
      </div>
    </div>
  );
}