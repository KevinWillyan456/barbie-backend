import { Request, Response } from "express";
import { UpdateWithAggregationPipeline } from "mongoose";
import { v4 as uuid } from "uuid";
import Filme from "../models/Filme";

async function indexFilme(req: Request, res: Response) {
    try {
        const filmes = await Filme.find()
            .sort({ title: 1 })
            .collation({ locale: "pt", strength: 2 });
        return res.status(200).json({ filmes });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

async function indexFilmeById(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { id } = req.params;

    try {
        const filme = await Filme.findById(id);
        return res.status(200).json({ filme });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

async function storeFilme(req: Request, res: Response) {
    const { titulo, descricao, foto } = req.body;

    if (!titulo || !descricao || !foto) {
        return res.status(400).json({ error: "data is missing" });
    }

    const filme = new Filme({
        _id: uuid(),
        titulo,
        descricao,
        foto,
    });

    try {
        await filme.save();

        return res
            .status(201)
            .json({ message: "Filme adicionado com sucesso!" });
    } catch (err) {
        res.status(400).json({ error: err });
    }
}

async function updateFilme(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { titulo, descricao, foto } = req.body;
    const { id } = req.params;

    if (!titulo && !descricao && !foto) {
        return res.status(400).json({ error: "You must enter a new data" });
    }

    const filter = { _id: id };
    const updateDoc = {
        $set: {
            titulo,
            descricao,
            foto,
        },
    };

    try {
        const filme = await Filme.updateOne(filter, updateDoc);
        if (filme.matchedCount < 1) {
            return res.status(404).json({ message: "Filme não encontrado" });
        }
        return res
            .status(200)
            .json({ message: "Filme atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

async function deleteFilme(
    req: Request<{ id?: UpdateWithAggregationPipeline }>,
    res: Response
) {
    const { id } = req.params;
    const filter = { _id: id };

    try {
        const filme = await Filme.deleteOne(filter);
        if (filme.deletedCount < 1) {
            return res.status(404).json({ message: "Filme não encontrado" });
        }
        return res.status(200).json({ message: "Filme removido com sucesso!" });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

export { indexFilme, indexFilmeById, storeFilme, updateFilme, deleteFilme };
