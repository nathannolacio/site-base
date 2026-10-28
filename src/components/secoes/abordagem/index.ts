import { AbordagemEditorial } from "./AbordagemEditorial";
import { AbordagemCitacao } from "./AbordagemCitacao";
import { AbordagemPilares } from "./AbordagemPilares";

export const ABORDAGENS = {
  1: { nome: "Editorial + pilares", Componente: AbordagemEditorial },
  2: { nome: "Foto + frase da profissional", Componente: AbordagemCitacao },
  3: { nome: "Pilares em cartões", Componente: AbordagemPilares },
} as const;
