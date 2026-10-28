import { PacotesCartoes } from "./PacotesCartoes";
import { PacotesLista } from "./PacotesLista";
import { PacotesFormatos } from "./PacotesFormatos";

export const PACOTES = {
  1: { nome: "Planos em cartões", Componente: PacotesCartoes },
  2: { nome: "Planos em lista", Componente: PacotesLista },
  3: { nome: "Formatos sem destaque de preço", Componente: PacotesFormatos },
} as const;
