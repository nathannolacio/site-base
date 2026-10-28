import { FaqAcordeao } from "./FaqAcordeao";
import { FaqLateral } from "./FaqLateral";
import { FaqGrade } from "./FaqGrade";

export const FAQS = {
  1: { nome: "Acordeão centralizado", Componente: FaqAcordeao },
  2: { nome: "Acordeão com lateral fixa", Componente: FaqLateral },
  3: { nome: "Respostas abertas em grade", Componente: FaqGrade },
} as const;
