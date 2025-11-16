import Router from "express";
import { booksController } from "../controllers/books.js";
import { bookValidator } from "../models/book.js";
import { validate } from "../middleware/validation.js";

export const booksRouter = Router();

// ✅ Place la route isbn AVANT /:id
booksRouter.get("/isbn/:isbn", booksController.getByIsbn);

// CRUD
booksRouter.get("/", booksController.getAll);

booksRouter.get("/:id", booksController.getSingle);

booksRouter.post("/", bookValidator(), validate, booksController.createBook);

booksRouter.put("/:id", bookValidator(), validate, booksController.updateBook);

booksRouter.delete("/:id", booksController.deleteBook);
