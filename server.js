import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import "dotenv/config.js";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const port = process.env.PORT || 5500;
const app = express();

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());

// --- Headers CORS ---
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

// --- Swagger configuration ---
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "Documentation de l'API CSE341 Contacts",
    },
  },
  apis: ["./routes/*.js"], // Ajoute ici les fichiers contenant tes routes
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// --- Route Swagger ---
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// --- Routes API ---
app.use("/", router);

// --- Lancement ---
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📘 Swagger Docs available at http://localhost:${port}/api-docs`);
});
