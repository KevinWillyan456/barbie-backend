import express from "express";

export const routes = express.Router();

routes.get("/", (req, res) => {
    res.send("Olá, mundo!");
});
routes.post("/filmes", (req, res) => {
    return res.status(201).json({
        titulo: "Vingadores",
        descricao: "Filme dos Vingadores",
        foto: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/06/Homura-akemi-Cropped.jpg",
    });
});
