import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BookSearchPage from "./pages/BookSearchPage";
import BookshelfPage from "./pages/BookshelfPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/">Bookshelf</Link>
        <Link to="/search">Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BookshelfPage />} />
        <Route path="/search" element={<BookSearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}