import type { Cliente } from "@/content/conteudo";
import type { Tom } from "@/content/tipos";

export type SecaoProps = { c: Cliente; tom: Tom };

/** Espaço no topo do hero para não ficar embaixo da navbar fixa (a navbar 2 não é fixa). */
export function espacoNavbar(c: Cliente) {
  return c.layout.navbar === 2 ? "pt-14 md:pt-20" : "pt-32 md:pt-40";
}
