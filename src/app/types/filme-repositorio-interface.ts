import { FilmeDoc } from "../../models/Filme";

export default interface FilmeRepositorioInterface {
    salvar(filme: FilmeDoc): Promise<boolean>;
    listar(): Promise<FilmeDoc[]>;
}
