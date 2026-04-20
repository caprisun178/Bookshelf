const API_BASE = "http://localhost:5000/api";

export async function searchBooks(query) {
  const res = await fetch(`${API_BASE}/books/search?q=${encodeURIComponent(query)}`);
  return res.json();
}

export async function addUserBook(bookData) {
  const res = await fetch(`${API_BASE}/user-books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });
  return res.json();
}

export async function getUserBooks(profileId) {
  const res = await fetch(`${API_BASE}/user-books/${profileId}`);
  return res.json();
}

export async function updateUserBook(id, updates) {
  const res = await fetch(`${API_BASE}/user-books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return res.json();
}

export async function deleteUserBook(id) {
  const res = await fetch(`${API_BASE}/user-books/${id}`, {
    method: "DELETE",
  });
  return res.json();
}