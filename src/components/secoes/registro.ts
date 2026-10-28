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
import { ABORDAGENS } from "./abordagem";
import { PROCESSOS } from "./processo";
import { PACOTES } from "./pacotes";
import { FAQS } from "./faq";

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
  abordagem: ABORDAGENS,
  processo: PROCESSOS,
  pacotes: PACOTES,
  faq: FAQS,
};

export const ROTULO_SECAO: Record<TipoSecao, string> = {
  hero: "Hero",
  sobre: "Sobre",
  servicos: "Serviços",
  galeria: "Galeria",
  avaliacoes: "Avaliações",
  localizacao: "Localização e contato",
  cta: "Chamada final",
  abordagem: "Abordagem",
  processo: "Como funciona",
  pacotes: "Pacotes e atendimento",
  faq: "Dúvidas frequentes",
};

export { RODAPES };
