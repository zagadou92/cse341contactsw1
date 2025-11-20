import { Router } from "express";
import { dbInit, getDb } from "../data/database.js";
import { ObjectId } from "mongodb";

await dbInit();
const db = getDb();
const readersCollection = db.collection("readers");

export const readersRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Readers
 *   description: Gestion des lecteurs
 */

// ----------------------------
// GET all readers
// ----------------------------
/**
 * @swagger
 * /readers:
 *   get:
 *     summary: Récupère tous les lecteurs
 *     tags: [Readers]
 *     responses:
 *       200:
 *         description: Liste des lecteurs
 */
readersRouter.get("/", async (req, res) => {
  try {
    const readers = await readersCollection.find().toArray();
    res.status(200).json(readers);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des lecteurs", error });
  }
});

// ----------------------------
// GET reader by ID
// ----------------------------
/**
 * @swagger
 * /readers/{id}:
 *   get:
 *     summary: Récupère un lecteur par ID
 *     tags: [Readers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du lecteur
 *     responses:
 *       200:
 *         description: Lecteur trouvé
 *       404:
 *         description: Lecteur non trouvé
 */
readersRouter.get("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const reader = await readersCollection.findOne({ _id: id });
    if (!reader) return res.status(404).json({ message: "Lecteur non trouvé" });
    res.status(200).json(reader);
  } catch (error) {
    res.status(500).json({ message: "ID invalide", error });
  }
});

// ----------------------------
// POST new reader
// ----------------------------
/**
 * @swagger
 * /readers:
 *   post:
 *     summary: Crée un nouveau lecteur
 *     tags: [Readers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reader'
 *     responses:
 *       201:
 *         description: Lecteur créé
 */
readersRouter.post("/", async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;
    if (!firstname || !lastname || !email) {
      return res.status(400).json({ message: "firstname, lastname et email sont requis" });
    }

    const reader = { firstname, lastname, email };
    const response = await readersCollection.insertOne(reader);
    res.status(201).json({ message: "Lecteur créé", id: response.insertedId, reader });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'insertion du lecteur", error });
  }
});

// ----------------------------
// PUT update reader
// ----------------------------
/**
 * @swagger
 * /readers/{id}:
 *   put:
 *     summary: Met à jour un lecteur
 *     tags: [Readers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du lecteur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reader'
 *     responses:
 *       200:
 *         description: Lecteur mis à jour
 *       404:
 *         description: Lecteur non trouvé
 */
readersRouter.put("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const updateData = req.body;

    const response = await readersCollection.updateOne({ _id: id }, { $set: updateData });
    if (response.matchedCount === 0) return res.status(404).json({ message: "Lecteur non trouvé" });

    res.status(200).json({ message: "Lecteur mis à jour" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du lecteur", error });
  }
});

// ----------------------------
// DELETE reader
// ----------------------------
/**
 * @swagger
 * /readers/{id}:
 *   delete:
 *     summary: Supprime un lecteur
 *     tags: [Readers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du lecteur
 *     responses:
 *       200:
 *         description: Lecteur supprimé
 *       404:
 *         description: Lecteur non trouvé
 */
readersRouter.delete("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const response = await readersCollection.deleteOne({ _id: id });
    if (response.deletedCount === 0) return res.status(404).json({ message: "Lecteur non trouvé" });

    res.status(200).json({ message: "Lecteur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du lecteur", error });
  }
});
