import { FilmeDoc } from "../../models/Filme";

export default interface FilmeRepositorioInterface {
    salvar(filme: Omit<FilmeDoc, "_id" | "dataCriacao">): Promise<boolean>;
    listar(): Promise<FilmeDoc[]>;
    listarPorId(id: string): Promise<FilmeDoc>;
    atualizar(
        id: string,
        filme: Omit<FilmeDoc, "_id" | "dataCriacao">
    ): Promise<boolean>;
    deletar(id: string): Promise<boolean>;
}
