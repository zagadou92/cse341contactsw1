import Router from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-out.json" with { type: "json" };

export const swaggerRouter = Router();

swaggerRouter.use("/api-docs", swaggerUi.serve);
swaggerRouter.get("/api-docs", swaggerUi.setup(swaggerDocument));
