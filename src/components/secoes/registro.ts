import type { TipoSecao, Variacao } from "@/content/tipos";
import type { SecaoProps } from "./tipos";
import { HEROS } from "./hero";
import { SOBRES } from "./sobre";
import { SERVICOS } from "./servicos";
import { GALERIAS } from "./galeria";
import { AVALIACOES } from "./avaliacoes";
import { LOCALIZACOES } from "./localizacao";
import { CTAS } from "./cta";
import { RODAPES } from "./rodape";

export type Entrada = { nome: string; Componente: (p: SecaoProps) => React.ReactNode };

/** Seções e variações disponíveis. */
export const SECOES: Partial<Record<TipoSecao, Partial<Record<Variacao, Entrada>>>> = {
  hero: HEROS,
  sobre: SOBRES,
  servicos: SERVICOS,
  galeria: GALERIAS,
  avaliacoes: AVALIACOES,
  localizacao: LOCALIZACOES,
  cta: CTAS,
};

export const ROTULO_SECAO: Record<TipoSecao, string> = {
  hero: "Hero",
  sobre: "Sobre",
  servicos: "Serviços",
  galeria: "Galeria",
  avaliacoes: "Avaliações",
  localizacao: "Localização e contato",
  cta: "Chamada final",
};

export { RODAPES };
