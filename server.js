import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dbInit } from "./data/database.js";
import { router } from "./routes/index.js";

const port = process.env.PORT || 5500;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Headers CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "origin, X-Request-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// --------------------------------------------------
// 🚀 INITIALISATION DE LA DB AVANT D'UTILISER LES ROUTES
// --------------------------------------------------
await dbInit();

// Routes
app.use("/", router);

// Lancement du serveur
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
