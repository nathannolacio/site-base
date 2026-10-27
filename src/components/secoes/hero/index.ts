import { HeroDividida } from "./HeroDividida";
import { HeroVitrine } from "./HeroVitrine";
import { HeroImersiva } from "./HeroImersiva";

export const HEROS = {
  1: { nome: "Dividida", Componente: HeroDividida },
  2: { nome: "Vitrine", Componente: HeroVitrine },
  3: { nome: "Imersiva", Componente: HeroImersiva },
} as const;
