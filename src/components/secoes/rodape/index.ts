import { RodapeCompleto } from "./RodapeCompleto";
import { RodapeMinimo } from "./RodapeMinimo";
import { RodapeGigante } from "./RodapeGigante";

export const RODAPES = {
  1: { nome: "Completo", Componente: RodapeCompleto },
  2: { nome: "Minimalista", Componente: RodapeMinimo },
  3: { nome: "Nome gigante", Componente: RodapeGigante },
} as const;
