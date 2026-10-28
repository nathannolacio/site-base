import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Site } from "@/components/Site";
import { prepararCliente } from "@/content/conteudo";
import exemplo from "@/content/exemplos/terapeuta.json";

export const metadata: Metadata = {
  title: "Exemplo: site de terapeuta",
  robots: { index: false, follow: false },
};

/* Paleta de exemplo só desta página (num cliente real, as cores vêm de tokens.css). */
const PALETA = {
  "--cor-marca": "#4a3f63",
  "--cor-marca-contraste": "#f7f4f2",
  "--cor-fundo": "#f7f4f2",
  "--cor-superficie": "#ece5ea",
  "--cor-tinta": "#221d2b",
  "--cor-tinta-suave": "#5d5566",
  "--cor-destaque": "#e9b8a2",
  "--cor-sobre-destaque": "#221d2b",
} as CSSProperties;

export default function ExemploTerapeuta() {
  const c = prepararCliente(exemplo);
  return (
    <div style={PALETA} data-tom="claro">
      <Site c={c} />
    </div>
  );
}
