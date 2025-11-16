import Router from "express";
import { readersController } from "../controllers/readers.js";
import { readerValidator } from "../models/reader.js";
import { validate } from "../middleware/validation.js";

export const readersRouter = Router();

readersRouter.get("/", readersController.getAll);

readersRouter.get("/:id", readersController.getSingle);

readersRouter.post("/", readerValidator(), validate,readersController.createReader);

readersRouter.put("/:id", readerValidator(), validate,readersController.updateReader);

readersRouter.delete("/:id", readersController.deleteReader);
