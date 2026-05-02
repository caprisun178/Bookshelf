import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";
import userBookRoutes from "./routes/userBookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

app.use("/api/books", bookRoutes);
app.use("/api/user-books", userBookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});