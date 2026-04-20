const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userBookRoutes = require("./routes/userBookRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/user-books", userBookRoutes);
app.use("/api/notes", noteRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});