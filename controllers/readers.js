import { dbInit, getDbClient } from "../data/database.js";
import { ObjectId } from "mongodb";

await dbInit();
const mongo = getDbClient();

export const readersController = {
  getAll: async (req, res) => {
    //#swagger.tags=['Readers']
    const result = await mongo.db("contactsdb").collection("readers").find();
    result.toArray().then((readers) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(readers);
    });
  },

  getSingle: async (req, res) => {
    //#swagger.tags=['Readers']
    const readerId = new ObjectId(req.params.id);
    const result = await mongo
      .db("contactsdb")
      .collection("readers")
      .find({ _id: readerId });
    result.toArray().then((readers) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(readers[0]);
    });
  },

  createReader: async (req, res) => {
    //#swagger.tags=['Readers']
    const reader = {
      username:req.body.username,
      books:req.body.books
    };

    const response = await mongo
      .db("cse341")
      .collection("readers")
      .insertOne(reader);

    //Check database response
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "An error occurred while inserting the reader.",
        );
    }
  },

  updateReader: async (req, res) => {
    //#swagger.tags=['Readers']
    const readerId = new ObjectId(req.params.id);
    const reader = {
      username:req.body.username,
      books:req.body.books
    };

    const response = await mongo
      .db("cse341")
      .collection("readers")
      .replaceOne({ _id: readerId }, reader);

    //Check database response
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "An error occurred while updating the reader.",
        );
    }
  },

  deleteReader: async (req, res) => {
    //#swagger.tags=['Readers']
    const readerId = new ObjectId(req.params.id);

    const response = await mongo
      .db("cse341")
      .collection("readers")
      .deleteOne({ _id: readerId });

    //check mongo respose
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "An error occurred while deleting the reader.",
        );
    }
  },
};
