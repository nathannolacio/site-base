import fs from "node:fs";
import path from "node:path";
import dados from "./cliente.json";
import type { ClienteJson, Foto, TipoSecao } from "./tipos";

/** Fotos que ainda não estão em /public viram espaço reservado em vez de quebrar o site. */
export function verificarFoto(foto: Foto): Foto {
  if (!foto?.src) return { src: null, alt: foto?.alt ?? "" };
  if (/^https?:\/\//.test(foto.src)) return foto;
  const existe = fs.existsSync(path.join(process.cwd(), "public", foto.src));
  return { src: existe ? foto.src : null, alt: foto.alt };
}

function carregar(): ClienteJson {
  const c = structuredClone(dados) as ClienteJson;
  c.fotos.hero = verificarFoto(c.fotos.hero);
  c.fotos.sobre = verificarFoto(c.fotos.sobre);
  c.fotos.cta = verificarFoto(c.fotos.cta);
  c.galeria.fotos = c.galeria.fotos.map(verificarFoto);
  c.servicos.itens = c.servicos.itens.map((s) => (s.foto ? { ...s, foto: verificarFoto(s.foto) } : s));
  if (c.identidade.logo) {
    const logo = verificarFoto({ src: c.identidade.logo, alt: "" });
    c.identidade.logo = logo.src ?? "";
  }
  return c;
}

export const cliente = carregar();
export const ANO = new Date().getFullYear();
export type Cliente = ClienteJson;

/* Âncoras e nomes no menu */
export const ANCORAS: Record<TipoSecao, string> = {
  hero: "inicio",
  sobre: "sobre",
  servicos: "servicos",
  galeria: "fotos",
  avaliacoes: "avaliacoes",
  localizacao: "contato",
  cta: "encomende",
};

const ROTULOS: Partial<Record<TipoSecao, string>> = {
  sobre: "Sobre",
  servicos: "Serviços",
  galeria: "Fotos",
  avaliacoes: "Avaliações",
  localizacao: "Como chegar",
};

export type ItemMenu = { rotulo: string; href: string };

export function itensDoMenu(c: Cliente = cliente): ItemMenu[] {
  return c.layout.secoes
    .filter((s) => ROTULOS[s.tipo])
    .map((s) => ({ rotulo: ROTULOS[s.tipo]!, href: `#${ANCORAS[s.tipo]}` }));
}
