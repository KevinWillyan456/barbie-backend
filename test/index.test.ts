import { describe, it, expect } from "vitest";
import axios from "axios";

describe("Primeiro teste da aplicação", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });
});

describe("Cadastro Filme", () => {
    it("Deve cadastrar um filme com sucesso", async () => {
        const filme = {
            titulo: "Vingadores",
            descricao: "Filme dos Vingadores",
            foto: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/06/Homura-akemi-Cropped.jpg",
        };
        const resposta = await axios.post(
            "http://localhost:3000/filmes",
            filme
        );

        expect(resposta.status).toBe(201);
        expect(resposta.data).toEqual(filme);
    });
});
