import { Schema, model, Document } from "mongoose";

export interface FilmeDoc extends Document {
    _id: string;
    titulo: string;
    sinopse: string;
    dataCriacao: Date;
    foto: string;
    anoLancamento: number;
}

const filmeSchema = new Schema<FilmeDoc>({
    _id: { type: String, required: true },
    titulo: { type: String, required: true },
    sinopse: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now },
    foto: { type: String, required: true },
    anoLancamento: { type: Number, required: true },
});

export default model<FilmeDoc>("Filme", filmeSchema);
