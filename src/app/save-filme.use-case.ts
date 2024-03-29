import { FilmeDoc } from "../models/Filme";
import FilmeRepositorioInterface from "./types/filme-repositorio-interface";

export default class SalvaFilme {
    constructor(private bancoInterface: FilmeRepositorioInterface) {}
    public async execute(
        input: Omit<FilmeDoc, "_id" | "dataCriacao">
    ): Promise<boolean> {
        const { titulo, sinopse, foto, anoLancamento, trailer } = input;
        const resultado = await this.bancoInterface.salvar({
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
