import { Router } from "express";
import { booksRouter } from "./books.js";
import { readersRouter } from "./readers.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swagger.js"; // ton swaggerSpec généré

export const router = Router();

// --- Swagger (Documentation API) ---
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Route de test ---
router.get("/", (req, res) => {
  //#swagger.tags=['Home']
  res.send("Hello Readers & Books API!");
});

// --- Routes API ---
router.use("/books", booksRouter);
router.use("/readers", readersRouter);
