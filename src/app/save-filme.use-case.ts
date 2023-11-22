import { FilmeDoc } from "../models/Filme";
import FilmeRepositorioInterface from "./types/filme-repositorio-interface";

class SalvaFilme {
    constructor(private bancoInterface: FilmeRepositorioInterface) {}
    public async execute(input: FilmeDoc): Promise<Output | boolean> {
        const { titulo, sinopse, foto, anoLancamento, trailer } = input;
        //Salvar no Banco
        const resultado = await this.bancoInterface.salvar({
            titulo,
            sinopse,
            foto,
            anoLancamento,
            trailer,
        });
        //Retornar o resultado
        if (!resultado) return false;
        return { status: true };
    }
}
export default SalvaFilme;

type Output = {
    status: boolean;
};
