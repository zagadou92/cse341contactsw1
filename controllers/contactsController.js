// ------------------------------
// 📦 IMPORTS
// ------------------------------
const { getDatabase } = require('../data/database');
const { ObjectId } = require('mongodb');

// ------------------------------
// 📇 GET ALL CONTACTS
// ------------------------------
const getAllContacts = async (req, res) => {
  try {
    const db = getDatabase();
    const contacts = await db.collection('contacts').find({}).toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------------------
// 📇 GET CONTACT BY ID
// ------------------------------
const getContactById = async (req, res) => {
  try {
    const db = getDatabase();
    const contact = await db
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------------------
// ➕ CREATE CONTACT
// ------------------------------
const createContact = async (req, res) => {
  try {
    const db = getDatabase();
    const result = await db.collection('contacts').insertOne(req.body);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------------------
// ✏️ UPDATE CONTACT
// ------------------------------
const updateContact = async (req, res) => {
  try {
    const db = getDatabase();
    const result = await db
      .collection('contacts')
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------------------
// ❌ DELETE CONTACT
// ------------------------------
const deleteContact = async (req, res) => {
  try {
    const db = getDatabase();
    const result = await db
      .collection('contacts')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------------------
// 📤 EXPORTS
// ------------------------------
module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
