import { FilmeDoc } from "../models/Filme";
import FilmeRepositorioInterface from "./types/filme-repositorio-interface";

export default class ListarFilmePorId {
    constructor(private filmeRepositorio: FilmeRepositorioInterface) {}
    public async execute(id: string): Promise<FilmeDoc> {
        return this.filmeRepositorio.listarPorId(id);
    }
}
