import { ProcessoLinha } from "./ProcessoLinha";
import { ProcessoLateral } from "./ProcessoLateral";
import { ProcessoCartoes } from "./ProcessoCartoes";

export const PROCESSOS = {
  1: { nome: "Linha de etapas", Componente: ProcessoLinha },
  2: { nome: "Etapas com lateral fixa", Componente: ProcessoLateral },
  3: { nome: "Cartões numerados", Componente: ProcessoCartoes },
} as const;
