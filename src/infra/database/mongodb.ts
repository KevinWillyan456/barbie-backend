import mongoose from "mongoose";
import FilmeRepositorioInterface from "../../app/types/filme-repositorio-interface";
import Filme, { FilmeDoc } from "../../models/Filme";
import { v4 as uuid } from "uuid";

export default class BancoMongoDB implements FilmeRepositorioInterface {
    public async listar(): Promise<FilmeDoc[]> {
        const filmes = await Filme.find()
            .sort({ titulo: 1 })
            .collation({ locale: "pt", strength: 2 });
        return filmes;
    }

    public async listarPorId(id: string): Promise<FilmeDoc> {
        const filme = await Filme.findById(id);
        return filme as FilmeDoc;
    }

    public async salvar(filme: FilmeDoc): Promise<boolean> {
        const filmeDTO = {
            _id: uuid(),
            titulo: filme.titulo,
            sinopse: filme.sinopse,
            foto: filme.foto,
            anoLancamento: filme.anoLancamento,
            trailer: filme.trailer,
        };
        try {
            const filmeModelo = new Filme({ ...filmeDTO });
            const result = await filmeModelo.save();
            return !!result;
        } catch (erro) {
            console.log(erro);
            return false;
        }
    }

    public async atualizar(id: string, filme: FilmeDoc): Promise<boolean> {
        const filmeDTO = {
            $set: {
                titulo: filme.titulo,
                sinopse: filme.sinopse,
                foto: filme.foto,
                anoLancamento: filme.anoLancamento,
                trailer: filme.trailer,
            },
        };
        try {
            const result = await Filme.findByIdAndUpdate(id, filmeDTO);
            return !!result;
        } catch (erro) {
            console.log(erro);
            return false;
        }
    }

    public async deletar(id: string): Promise<boolean> {
        try {
            const result = await Filme.findByIdAndDelete(id);
            return !!result;
        } catch (erro) {
            console.log(erro);
            return false;
        }
    }

    public desconectar(): void {
        mongoose.disconnect();
    }
}
