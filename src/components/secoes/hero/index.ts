import { HeroDividida } from "./HeroDividida";
import { HeroTipografica } from "./HeroTipografica";
import { HeroImersiva } from "./HeroImersiva";

export const HEROS = {
  1: { nome: "Dividida", Componente: HeroDividida },
  2: { nome: "Tipográfica", Componente: HeroTipografica },
  3: { nome: "Imersiva", Componente: HeroImersiva },
} as const;
