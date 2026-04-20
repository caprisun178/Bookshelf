import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

app.use("/api/books", bookRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});