import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectToDatabase } from "./database";

config();
connectToDatabase();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Olá, mundo!");
});

app.post("/filmes", (req, res) => {
    return res.status(201).json({
        titulo: "Vingadores",
        descricao: "Filme dos Vingadores",
        foto: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/06/Homura-akemi-Cropped.jpg",
    });
});

app.listen(port, () => {
    console.log(
        `Servidor iniciado na porta: ${port} - http://localhost:${port}`
    );
});
