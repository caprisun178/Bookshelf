import "./SearchBar.css";

export default function SearchBar({ query, setQuery, onSearch, placeholder }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <button className="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}