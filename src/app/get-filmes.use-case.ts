import { FilmeDoc } from "../models/Filme";
import FilmeRepositorioInterface from "./types/filme-repositorio-interface";

export default class ListarFilme {
    constructor(private filmeRepositorio: FilmeRepositorioInterface) {}
    public async execute(): Promise<FilmeDoc[]> {
        return this.filmeRepositorio.listar();
    }
}
