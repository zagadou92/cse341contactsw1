// ------------------------------
// 📦 IMPORTS
// ------------------------------
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// ------------------------------
// ⚙️ CONFIGURATION ENVIRONNEMENT
// ------------------------------
dotenv.config();

// ------------------------------
// 🔌 VARIABLES
// ------------------------------
let _db;
const uri = process.env.MONGO_URI; // ⚠️ doit correspondre au nom dans ton .env

// ------------------------------
// 🚀 INITIALISATION DE LA CONNEXION
// ------------------------------
const initDb = async (callback) => {
  if (_db) {
    console.log("✅ Database already initialized!");
    return callback(null, _db);
  }

  if (!uri) {
    return callback(new Error("❌ MONGO_URI is undefined. Vérifie ton fichier .env!"));
  }

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    _db = client.db(); // Tu peux mettre "contactsdb" ici si tu veux explicitement
    console.log("✅ MongoDB connected successfully!");
    callback(null, _db);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    callback(err);
  }
};

// ------------------------------
// 📤 OBTENIR LA BASE DE DONNÉES
// ------------------------------
const getDatabase = () => {
  if (!_db) throw Error("❌ Database not initialized yet!");
  return _db;
};

// ------------------------------
// 📦 EXPORTS
// ------------------------------
module.exports = { initDb, getDatabase };
