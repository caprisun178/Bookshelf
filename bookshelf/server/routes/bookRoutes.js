import express from "express";
import { searchBooks, getBookDetails } from "../controllers/bookController.js";

const router = express.Router();

router.get("/search", searchBooks);
router.get("/details/:workId", getBookDetails);

export default router;