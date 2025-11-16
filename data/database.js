import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

let _client = null; // Client MongoDB global
let _db = null;     // Référence à la DB spécifique

/**
 * Initialise la connexion à MongoDB
 */
export async function dbInit() {
  if (_client && _db) {
    console.log("✅ Database already initialized");
    return _db;
  }

  const uri = process.env.MONGO_URI;

  if (!uri || typeof uri !== "string") {
    throw new Error(
      "❌ DB_CONNECTION_URI is not defined or invalid. Please check your .env file."
    );
  }

  try {
    console.log("🔄 Connecting to MongoDB...");
    _client = new MongoClient(uri);
    await _client.connect();

    // Nom de la DB, ici on utilise "contactsdb" par défaut
    _db = _client.db(process.env.DB_NAME || "contactsdb");

    console.log("✅ Successfully connected to MongoDB!");
    return _db;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
}

/**
 * Récupère l'objet MongoClient
 */
export function getDbClient() {
  if (!_client) throw new Error("❌ Database not initialized.");
  return _client;
}

/**
 * Récupère la DB spécifique
 */
export function getDb() {
  if (!_db) throw new Error("❌ Database not initialized.");
  return _db;
}
