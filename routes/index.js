import { Router } from "express";   // ❗ Correct import
import { booksRouter } from "./books.js";
import { swaggerRouter } from "./swagger.js";
import { readersRouter } from "./readers.js";

export const router = Router();

// Route Swagger (Documentation)
router.use("/docs", swaggerRouter);

// Route de test
router.get("/", (req, res) => {
  //#swagger.tags=['Hello Readers']
  res.send("Hello Readers");
});

// Routes API
router.use("/books", booksRouter);
router.use("/readers", readersRouter);
