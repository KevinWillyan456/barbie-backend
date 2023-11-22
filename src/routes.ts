import express from "express";
import {
    deleteFilme,
    indexFilme,
    indexFilmeById,
    storeFilme,
    updateFilme,
} from "./app/FilmeController";

export const routes = express.Router();

routes.get("/filme", indexFilme);
routes.get("/filme/:id", indexFilmeById);
routes.post("/filme", storeFilme);
routes.put("/filme/:id", updateFilme);
routes.delete("/filme/:id", deleteFilme);
