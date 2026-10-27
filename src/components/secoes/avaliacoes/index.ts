import { AvaliacoesGrade } from "./AvaliacoesGrade";
import { AvaliacoesDestaque } from "./AvaliacoesDestaque";
import { AvaliacoesFaixa } from "./AvaliacoesFaixa";

export const AVALIACOES = {
  1: { nome: "Grade (mural)", Componente: AvaliacoesGrade },
  2: { nome: "Destaque único", Componente: AvaliacoesDestaque },
  3: { nome: "Faixa + nota em destaque", Componente: AvaliacoesFaixa },
} as const;
