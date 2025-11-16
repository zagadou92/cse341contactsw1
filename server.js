import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import "dotenv/config.js";
import bodyParser from "body-parser";

const port = process.env.PORT || 5500;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "origin, X-Request-With, Content-Type, Accept, Z-Key",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on port ${5500}`);
});
