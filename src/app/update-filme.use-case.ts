import { FilmeDoc } from "../models/Filme";
import FilmeRepositorioInterface from "./types/filme-repositorio-interface";

export default class AtualizaFilme {
    constructor(private filmeRepositorio: FilmeRepositorioInterface) {}
    public async execute(
        id: string,
        filme: Omit<FilmeDoc, "_id" | "dataCriacao">
    ): Promise<boolean> {
        const { titulo, sinopse, foto, anoLancamento, trailer } = filme;
        const resultado = await this.filmeRepositorio.atualizar(id, {
            titulo,
            sinopse,
            foto,
            anoLancamento,
            trailer,
        });
        if (!resultado) return false;
        return true;
    }
}
