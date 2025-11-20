import { Router } from "express";
import { dbInit, getDb } from "../data/database.js";
import { ObjectId } from "mongodb";

await dbInit();
const db = getDb();
const booksCollection = db.collection("books");

export const booksRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Gestion des livres
 */

// ----------------------------
// GET all books
// ----------------------------
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Récupère tous les livres
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Liste des livres
 */
booksRouter.get("/", async (req, res) => {
  try {
    const books = await booksCollection.find().toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des livres", error });
  }
});

// ----------------------------
// GET book by ID
// ----------------------------
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Récupère un livre par ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du livre
 *     responses:
 *       200:
 *         description: Livre trouvé
 *       404:
 *         description: Livre non trouvé
 */
booksRouter.get("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const book = await booksCollection.findOne({ _id: id });
    if (!book) return res.status(404).json({ message: "Livre non trouvé" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "ID invalide", error });
  }
});

// ----------------------------
// POST new book
// ----------------------------
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Crée un nouveau livre
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Livre créé
 */
booksRouter.post("/", async (req, res) => {
  try {
    const { isbn, title, author, publisher, year, edition, format } = req.body;
    if (!isbn || !title || !author) {
      return res.status(400).json({ message: "ISBN, title et author sont requis" });
    }

    const book = { isbn, title, author, publisher, year, edition, format };
    const response = await booksCollection.insertOne(book);
    res.status(201).json({ message: "Livre créé", id: response.insertedId, book });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'insertion du livre", error });
  }
});

// ----------------------------
// PUT update book
// ----------------------------
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Met à jour un livre
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du livre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Livre mis à jour
 *       404:
 *         description: Livre non trouvé
 */
booksRouter.put("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const updateData = req.body;

    const response = await booksCollection.updateOne({ _id: id }, { $set: updateData });
    if (response.matchedCount === 0) return res.status(404).json({ message: "Livre non trouvé" });

    res.status(200).json({ message: "Livre mis à jour" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du livre", error });
  }
});

// ----------------------------
// DELETE book
// ----------------------------
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Supprime un livre
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du livre
 *     responses:
 *       200:
 *         description: Livre supprimé
 *       404:
 *         description: Livre non trouvé
 */
booksRouter.delete("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const response = await booksCollection.deleteOne({ _id: id });
    if (response.deletedCount === 0) return res.status(404).json({ message: "Livre non trouvé" });

    res.status(200).json({ message: "Livre supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du livre", error });
  }
});
