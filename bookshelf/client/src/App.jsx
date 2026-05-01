import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import BookSearchPage from "./pages/BookSearchPage";
import BookshelfPage from "./pages/BookshelfPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import LoginPage from "./pages/LoginPage";
import logo from "./assets/bookshelf.png";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <img src={logo} alt="Bookshelf logo" className="header-logo" />

          <nav className="header-nav">
            <NavLink to="/" className="nav-link">
              Bookshelf
            </NavLink>

            <NavLink to="/search" className="nav-link">
              Search
            </NavLink>
          </nav>

          <div className="header-user">
            {user ? (
              <>
                <span>Welcome, {user.username}</span>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<BookshelfPage />} />
            <Route path="/search" element={<BookSearchPage />} />
            <Route path="/books/:workId" element={<BookDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}