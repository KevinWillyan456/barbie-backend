import express from "express";
import ListarFilme from "./app/get-filmes.use-case";
import BancoMongoDB from "./infra/database/mongodb";
import ListarFilmePorId from "./app/get-by-id-filme.use-case";
import SalvarFilme from "./app/save-filme.use-case";
import AtualizaFilme from "./app/update-filme.use-case";
import DeletaFilme from "./app/delete-filme.use-case";

export const routes = express.Router();
const bancoMongoDB = new BancoMongoDB();

routes.get("/filme", async (req, res) => {
    const listarFilme = new ListarFilme(bancoMongoDB);
    const filmes = await listarFilme.execute();
    res.status(200).send(filmes);
});

routes.get("/filme/:id", async (req, res) => {
    const { id } = req.params;
    const listarFilmePorId = new ListarFilmePorId(bancoMongoDB);
    const filme = await listarFilmePorId.execute(id);
    if (!filme) {
        return res.status(404).json({ error: "Filme não encontrado" });
    }
    res.status(200).send(filme);
});

routes.post("/filme", async (req, res) => {
    const { titulo, sinopse, foto, anoLancamento, trailer } = req.body;
    if (!titulo || !sinopse || !foto || !anoLancamento) {
        return res.status(400).json({ error: "Preencha todos os dados" });
    }
    const filme = {
        titulo,
        sinopse,
        foto,
        anoLancamento,
        trailer,
    };
    const salvarFilme = new SalvarFilme(bancoMongoDB);
    const filmeSalvo = await salvarFilme.execute(filme);
    if (filmeSalvo) {
        res.status(201).json({ message: "Filme adicionado com sucesso!" });
    } else {
        res.status(400).json({ error: "Erro ao salvar o filme" });
    }
});

routes.put("/filme/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, sinopse, foto, anoLancamento, trailer } = req.body;
    if (!titulo && !sinopse && !foto && !anoLancamento && !trailer) {
        return res.status(400).json({ error: "Você deve enviar um dado" });
    }
    const filme = {
        titulo,
        sinopse,
        foto,
        anoLancamento,
        trailer,
    };
    const atualizaFilme = new AtualizaFilme(bancoMongoDB);
    const filmeAtualizado = await atualizaFilme.execute(id, filme);
    if (filmeAtualizado) {
        res.status(200).json({ message: "Filme atualizado com sucesso!" });
    } else {
        res.status(400).json({ error: "Erro ao atualizar o filme" });
    }
});

routes.delete("/filme/:id", async (req, res) => {
    const { id } = req.params;
    const deletaFilme = new DeletaFilme(bancoMongoDB);
    const filmeDeletado = await deletaFilme.execute(id);
    if (filmeDeletado) {
        res.status(200).json({ message: "Filme deletado com sucesso!" });
    } else {
        res.status(400).json({ error: "Erro ao deletar o filme" });
    }
});
