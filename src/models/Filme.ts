import { Schema, model, Document } from "mongoose";

export interface FilmeDoc extends Document {
    _id: string;
    titulo: string;
    descricao: string;
    dataCriacao: Date;
    foto: string;
}

const filmeSchema = new Schema<FilmeDoc>({
    _id: { type: String, required: true },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now },
    foto: { type: String, required: true },
});

export default model<FilmeDoc>("Filme", filmeSchema);
