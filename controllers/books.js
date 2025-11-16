import { dbInit, getDb } from "../data/database.js";
import { ObjectId } from "mongodb";

await dbInit();  // Initialise la connexion
const db = getDb();  // Récupère la DB
const books = db.collection("books");  // Collection "books"

export const booksController = {
  
  // -------------------------------------------------------
  // GET ALL BOOKS
  // -------------------------------------------------------
  getAll: async (req, res) => {
    try {
      const result = await books.find().toArray();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error fetching books", error });
    }
  },

  // -------------------------------------------------------
  // GET ONE BOOK BY ID
  // -------------------------------------------------------
  getSingle: async (req, res) => {
    try {
      const id = new ObjectId(req.params.id);
      const book = await books.findOne({ _id: id });

      if (!book) return res.status(404).json({ message: "Book not found" });

      res.status(200).json(book);

    } catch (error) {
      res.status(500).json({ message: "Invalid ID", error });
    }
  },

  // -------------------------------------------------------
  // GET BOOK BY ISBN
  // -------------------------------------------------------
  getByIsbn: async (req, res) => {
    try {
      const isbn = req.params.isbn;
      const book = await books.findOne({ isbn });

      if (!book) return res.status(404).json({ message: "Book not found" });

      res.status(200).json(book);

    } catch (error) {
      res.status(500).json({ message: "Error fetching book", error });
    }
  },

  // -------------------------------------------------------
  // CREATE A BOOK
  // -------------------------------------------------------
  createBook: async (req, res) => {
    try {
      const book = {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        year: req.body.year,
        edition: req.body.edition,
        format: req.body.format,
      };

      const response = await books.insertOne(book);

      res.status(201).json({
        message: "Book created successfully",
        id: response.insertedId,
        book
      });

    } catch (error) {
      res.status(500).json({ message: "Error inserting book", error });
    }
  },

  // -------------------------------------------------------
  // UPDATE A BOOK
  // -------------------------------------------------------
  updateBook: async (req, res) => {
    try {
      const id = new ObjectId(req.params.id);

      const updatedBook = {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        year: req.body.year,
        edition: req.body.edition,
        format: req.body.format,
      };

      const response = await books.replaceOne({ _id: id }, updatedBook);

      if (response.modifiedCount === 0) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json({ message: "Book updated successfully" });

    } catch (error) {
      res.status(500).json({ message: "Error updating book", error });
    }
  },

  // -------------------------------------------------------
  // DELETE A BOOK
  // -------------------------------------------------------
  deleteBook: async (req, res) => {
    try {
      const id = new ObjectId(req.params.id);

      const response = await books.deleteOne({ _id: id });

      if (response.deletedCount === 0) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json({ message: "Book deleted successfully" });

    } catch (error) {
      res.status(500).json({ message: "Error deleting book", error });
    }
  },
};
