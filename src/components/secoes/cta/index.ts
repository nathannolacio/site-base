import { CtaFaixa } from "./CtaFaixa";
import { CtaFoto } from "./CtaFoto";
import { CtaCartao } from "./CtaCartao";

export const CTAS = {
  1: { nome: "Faixa larga", Componente: CtaFaixa },
  2: { nome: "Foto de fundo", Componente: CtaFoto },
  3: { nome: "Cartão centralizado", Componente: CtaCartao },
} as const;
