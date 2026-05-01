import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BookSearchPage from "./pages/BookSearchPage";
import BookshelfPage from "./pages/BookshelfPage";
import BookDetailsPage from "./pages/BookDetailsPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Bookshelf</Link>
        <Link to="/search">Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BookshelfPage />} />
        <Route path="/search" element={<BookSearchPage />} />
        <Route path="/books/:workId" element={<BookDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}