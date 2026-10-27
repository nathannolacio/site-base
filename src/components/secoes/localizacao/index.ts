import { LocalizacaoMapa } from "./LocalizacaoMapa";
import { LocalizacaoColunas } from "./LocalizacaoColunas";
import { LocalizacaoBloco } from "./LocalizacaoBloco";

export const LOCALIZACOES = {
  1: { nome: "Mapa grande + card", Componente: LocalizacaoMapa },
  2: { nome: "Duas colunas", Componente: LocalizacaoColunas },
  3: { nome: "Bloco de contatos", Componente: LocalizacaoBloco },
} as const;
