const API_BASE = "http://localhost:5000/api";

export async function searchBooks(query) {
  const res = await fetch(`${API_BASE}/books/search?q=${encodeURIComponent(query)}`);
  return res.json();
}

export async function addUserBook(bookData) {
  const response = await fetch(`${API_BASE}/user-books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error("Failed to add user book");
  }

  return response.json();
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

export async function getBookDetails(workId) {
  const cleanedWorkId = workId.replace("/works/", "");

  const res = await fetch(`${API_BASE}/books/details/${cleanedWorkId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch book details");
  }

  return res.json();
}

export async function addNote(noteData) {
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  if (!res.ok) {
    throw new Error("Failed to add note");
  }

  return res.json();
}

export async function getNotes(userBookId) {
  const res = await fetch(`${API_BASE}/notes/${userBookId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
}

export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid username or password");
  }

  return res.json();
}