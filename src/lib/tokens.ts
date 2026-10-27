import fs from "node:fs";
import path from "node:path";

/** Lê src/styles/tokens.css para a prancha mostrar exatamente os valores que o site usa. */
export type CorToken = { nome: string; hex: string; descricao: string };

const ARQUIVO = path.join(process.cwd(), "src", "styles", "tokens.css");

export function lerTokens() {
  const css = fs.readFileSync(ARQUIVO, "utf8");
  const cores: CorToken[] = [];
  const reCor = /--cor-([\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;\s*(?:\/\*\s*(.*?)\s*\*\/)?/g;
  for (const m of css.matchAll(reCor)) cores.push({ nome: m[1], hex: m[2].toLowerCase(), descricao: m[3] ?? "" });

  const fonte = (nome: string) => {
    const m = css.match(new RegExp(`--fonte-${nome}:\\s*"([^"]+)"`));
    return (m?.[1] ?? "").replace(/ Variable$/, "");
  };
  const valor = (nome: string) => css.match(new RegExp(`--${nome}:\\s*([^;]+);`))?.[1].trim() ?? "";

  return {
    cores,
    hex: Object.fromEntries(cores.map((c) => [c.nome, c.hex])) as Record<string, string>,
    fonteTitulo: fonte("titulo"),
    fonteTexto: fonte("texto"),
    raio: valor("raio"),
    raioBotao: valor("raio-botao"),
  };
}

/* Contraste WCAG */
function canal(v: number) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
function luminancia(hex: string) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((x) => x + x).join("");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}
export function contraste(a: string, b: string) {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
