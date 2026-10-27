import { GaleriaMosaico } from "./GaleriaMosaico";
import { GaleriaFaixa } from "./GaleriaFaixa";
import { GaleriaFeed } from "./GaleriaFeed";

export const GALERIAS = {
  1: { nome: "Mosaico", Componente: GaleriaMosaico },
  2: { nome: "Faixa contínua", Componente: GaleriaFaixa },
  3: { nome: "Feed do Instagram", Componente: GaleriaFeed },
} as const;
