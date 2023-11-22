import mongoose from "mongoose";
import FilmeRepositorioInterface from "../../app/types/filme-repositorio-interface";
import Filme, { FilmeDoc } from "../../models/Filme";
import { v4 as uuid } from "uuid";

export default class BancoMongoDB implements FilmeRepositorioInterface {
    constructor() {
        try {
            mongoose.connect(
                process.env.MONGODB_URL || "mongodb://localhost:27017/filmes"
            );
            console.log("Conectado ao banco de dados");
        } catch (erro) {
            console.log(erro);
        }
    }
    public async listar(): Promise<FilmeDoc[]> {
        const filmes = await Filme.find();
        return filmes;
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
    public desconectar(): void {
        mongoose.disconnect();
    }
}
