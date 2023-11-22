import FilmeRepositorioInterface from "./types/filme-repositorio-interface";

export default class DeletaFilme {
    constructor(private filmeRepositorio: FilmeRepositorioInterface) {}
    public async execute(id: string): Promise<boolean> {
        const resultado = await this.filmeRepositorio.deletar(id);
        if (!resultado) return false;
        return true;
    }
}
