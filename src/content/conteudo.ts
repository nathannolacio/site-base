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

/** Prepara um cliente.json para o site (troca fotos que ainda não existem por espaço reservado). */
export function prepararCliente(json: unknown): ClienteJson {
  const c = structuredClone(json) as ClienteJson;
  c.fotos.hero = verificarFoto(c.fotos.hero);
  c.fotos.sobre = verificarFoto(c.fotos.sobre);
  c.fotos.cta = verificarFoto(c.fotos.cta);
  c.galeria.fotos = c.galeria.fotos.map(verificarFoto);
  c.servicos.itens = c.servicos.itens.map((s) => (s.foto ? { ...s, foto: verificarFoto(s.foto) } : s));
  if (c.abordagem?.foto) c.abordagem.foto = verificarFoto(c.abordagem.foto);
  if (c.identidade.logo) {
    const logo = verificarFoto({ src: c.identidade.logo, alt: "" });
    c.identidade.logo = logo.src ?? "";
  }
  return c;
}

export const cliente = prepararCliente(dados);
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
  cta: "contato-final",
  abordagem: "abordagem",
  processo: "como-funciona",
  pacotes: "atendimento",
  faq: "duvidas",
};

const ROTULOS: Partial<Record<TipoSecao, string>> = {
  sobre: "Sobre",
  servicos: "Serviços",
  galeria: "Fotos",
  avaliacoes: "Avaliações",
  localizacao: "Como chegar",
  abordagem: "Abordagem",
  processo: "Como funciona",
  pacotes: "Atendimento",
  faq: "Dúvidas",
};

/** Há nota do Google para mostrar? (terapeutas costumam ter depoimentos sem nota) */
export function temNotaGoogle(c: Cliente) {
  return c.avaliacoes.total > 0 && c.avaliacoes.nota > 0;
}

/** Link secundário do hero: aponta para a primeira seção que explica o trabalho. */
export function linkSecundario(c: Cliente): { href: string; rotulo: string } {
  const tipos = c.layout.secoes.map((s) => s.tipo);
  if (tipos.includes("servicos")) return { href: `#${ANCORAS.servicos}`, rotulo: "Ver o que fazemos" };
  if (tipos.includes("abordagem")) return { href: `#${ANCORAS.abordagem}`, rotulo: "Conhecer a abordagem" };
  if (tipos.includes("processo")) return { href: `#${ANCORAS.processo}`, rotulo: "Como funciona" };
  return { href: `#${ANCORAS.sobre}`, rotulo: "Conhecer" };
}

export type ItemMenu = { rotulo: string; href: string };

export function itensDoMenu(c: Cliente = cliente): ItemMenu[] {
  return c.layout.secoes
    .filter((s) => ROTULOS[s.tipo])
    .map((s) => ({ rotulo: ROTULOS[s.tipo]!, href: `#${ANCORAS[s.tipo]}` }));
}
