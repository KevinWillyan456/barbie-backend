import { Schema, model } from "mongoose";

export interface FilmeDoc {
    _id: string;
    titulo: string;
    sinopse: string;
    dataCriacao: Date;
    foto: string;
    anoLancamento: number;
    trailer: string;
}

const filmeSchema = new Schema<FilmeDoc>({
    _id: { type: String, required: true },
    titulo: { type: String, required: true },
    sinopse: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now },
    foto: { type: String, required: true },
    anoLancamento: { type: Number, required: true },
    trailer: { type: String, default: null },
});

export default model<FilmeDoc>("Filme", filmeSchema);
