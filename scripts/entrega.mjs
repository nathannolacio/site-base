#!/usr/bin/env node
/**
 * Gera o repositório de ENTREGA do cliente: uma cópia limpa, só com o site.
 *
 *   npm run entrega              → cria ../site-<nome-do-cliente>
 *   npm run entrega ../outra-pasta → cria na pasta indicada
 *   npm run entrega -- --manter-demo → mantém o modo demo ligado (noindex + selo de prévia)
 *
 * Remove tudo que é do template: prancha /identidade, catálogo /variacoes, variações não usadas,
 * instruções para IA (CLAUDE.md, AGENTS.md, .claude/), este script, prints do Instagram,
 * pendências e trechos marcados com // @template ... // @fim-template.
 * A cópia sai com histórico novo (git init), sem nenhum commit do template.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const RAIZ = process.cwd();
const args = process.argv.slice(2);
const manterDemo = args.includes("--manter-demo");
const destinoArg = args.find((a) => !a.startsWith("--"));

const cliente = JSON.parse(fs.readFileSync(path.join(RAIZ, "src/content/cliente.json"), "utf8"));
const slug = cliente.negocio.nome
  .normalize("NFD")
  .replace(/[̀-ͯ]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
const DESTINO = path.resolve(RAIZ, destinoArg ?? `../site-${slug}`);

if (fs.existsSync(DESTINO) && fs.readdirSync(DESTINO).length > 0) {
  console.error(`A pasta ${DESTINO} já existe e não está vazia. Escolha outra ou apague-a antes.`);
  process.exit(1);
}

/* ---------- 1. Quais componentes o cliente usa ---------- */
const COMPONENTES = {
  navbar: { 1: "NavbarClassica", 2: "NavbarCentralizada", 3: "NavbarPilula" },
  hero: { 1: "HeroDividida", 2: "HeroVitrine", 3: "HeroImersiva" },
  sobre: { 1: "SobreFoto", 2: "SobreNumeros", 3: "SobreManifesto" },
  servicos: { 1: "ServicosGrade", 2: "ServicosLista", 3: "ServicosCarrossel" },
  galeria: { 1: "GaleriaMosaico", 2: "GaleriaFaixa", 3: "GaleriaFeed" },
  avaliacoes: { 1: "AvaliacoesGrade", 2: "AvaliacoesDestaque", 3: "AvaliacoesFaixa" },
  localizacao: { 1: "LocalizacaoMapa", 2: "LocalizacaoColunas", 3: "LocalizacaoBloco" },
  cta: { 1: "CtaFaixa", 2: "CtaFoto", 3: "CtaCartao" },
  rodape: { 1: "RodapeCompleto", 2: "RodapeMinimo", 3: "RodapeGigante" },
  abordagem: { 1: "AbordagemEditorial", 2: "AbordagemCitacao", 3: "AbordagemPilares" },
  processo: { 1: "ProcessoLinha", 2: "ProcessoLateral", 3: "ProcessoCartoes" },
  pacotes: { 1: "PacotesCartoes", 2: "PacotesLista", 3: "PacotesFormatos" },
  faq: { 1: "FaqAcordeao", 2: "FaqLateral", 3: "FaqGrade" },
};
const { layout } = cliente;
const navbar = COMPONENTES.navbar[layout.navbar];
const secoes = layout.secoes.map((s) => ({ ...s, nome: COMPONENTES[s.tipo][s.variacao] }));
const rodape = COMPONENTES.rodape[layout.rodape.variacao];
if (!navbar || !rodape || secoes.some((s) => !s.nome)) {
  console.error("layout inválido no cliente.json (navbar, seção ou rodapé com variação inexistente).");
  process.exit(1);
}

/* ---------- 2. Copiar só os arquivos do site ---------- */
const FORA = [
  /^CLAUDE\.md$/,
  /^AGENTS\.md$/,
  /^README\.md$/,
  /^\.claude\//,
  /^scripts\//,
  /^src\/app\/identidade\//,
  /^src\/app\/variacoes\//,
  /^src\/app\/exemplo-terapeuta\//,
  /^src\/content\/exemplos\//,
  /^src\/lib\/tokens\.ts$/,
  /^public\/cliente\/instagram\//,
  /\.gitkeep$/,
];
const arquivos = execSync("git ls-files --cached --others --exclude-standard", { cwd: RAIZ, encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .filter((f) => fs.existsSync(path.join(RAIZ, f)))
  .filter((f) => !FORA.some((re) => re.test(f)));

for (const f of arquivos) {
  const alvo = path.join(DESTINO, f);
  fs.mkdirSync(path.dirname(alvo), { recursive: true });
  fs.copyFileSync(path.join(RAIZ, f), alvo);
}

/* ---------- 3. Site.tsx explícito, só com as seções escolhidas ---------- */
function pastaDe(nome) {
  for (const [tipo, mapa] of Object.entries(COMPONENTES)) if (Object.values(mapa).includes(nome)) return tipo;
}
const usados = [navbar, ...secoes.map((s) => s.nome), rodape];
const imports = [...new Set(usados)]
  .map((n) => `import { ${n} } from "./secoes/${pastaDe(n)}/${n}";`)
  .join("\n");
const sobreFoto = secoes[0]?.nome === "HeroImersiva";
const corpo = secoes.map((s) => `        <${s.nome} c={c} tom="${s.tom}" />`).join("\n");

const site = `import type { Cliente } from "@/content/conteudo";
import { itensDoMenu } from "@/content/conteudo";
import { linkTelefone, linkWhatsapp } from "@/lib/links";
${imports}
import { BannerDemo } from "./extras/BannerDemo";
import { WhatsappFlutuante } from "./extras/WhatsappFlutuante";

export function Site({ c }: { c: Cliente }) {
  const { contato } = c;
  const whatsapp = linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp);
  const horario =
    contato.horarios
      .filter((h) => !/fechado/i.test(h.horas))
      .map((h) => \`\${h.dias}, \${h.horas}\`)[0] ?? "";

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-base focus:bg-fundo focus:px-4 focus:py-2">
        Pular para o conteúdo
      </a>
      <${navbar}
        nome={c.negocio.nome}
        logo={c.identidade.logo}
        itens={itensDoMenu(c)}
        whatsappHref={whatsapp}
        telefone={contato.telefone}
        telefoneHref={linkTelefone(contato.telefone)}
        horario={horario}${sobreFoto ? "\n        sobreFoto" : ""}
      />
      <main id="conteudo">
${corpo}
      </main>
      <${rodape} c={c} tom="${layout.rodape.tom}" />
      {c.layout.whatsappFlutuante && <WhatsappFlutuante href={whatsapp} />}
      {c.modoDemo && <BannerDemo nome={c.negocio.nome} />}
    </>
  );
}
`;
fs.writeFileSync(path.join(DESTINO, "src/components/Site.tsx"), site);

/* ---------- 4. Limpar trechos de template e o conteúdo ---------- */
function arquivosDe(dir, filtro) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((d) => d.isFile() && filtro(d.name))
    .map((d) => path.join(d.parentPath ?? d.path, d.name));
}
for (const f of arquivosDe(path.join(DESTINO, "src"), (n) => /\.(tsx?|css)$/.test(n))) {
  const s = fs.readFileSync(f, "utf8");
  const limpo = s.replace(/^[ \t]*(\/\/|\/\*) @template[\s\S]*?@fim-template.*\n/gm, "");
  if (limpo !== s) fs.writeFileSync(f, limpo);
}

const json = structuredClone(cliente);
delete json.pendencias;
delete json.identidade.origem;
if (!manterDemo) json.modoDemo = false;
fs.writeFileSync(path.join(DESTINO, "src/content/cliente.json"), JSON.stringify(json, null, 2) + "\n");

/* ---------- 5. Apagar código que o site não usa ---------- */
const SRC = path.join(DESTINO, "src");
const fontes = arquivosDe(SRC, (n) => /\.tsx?$/.test(n));
const EXT = ["", ".ts", ".tsx", ".json", "/index.ts", "/index.tsx"];
function resolver(de, esp) {
  let base;
  if (esp.startsWith("@/")) base = path.join(SRC, esp.slice(2));
  else if (esp.startsWith(".")) base = path.resolve(path.dirname(de), esp);
  else return null;
  for (const e of EXT) if (fs.existsSync(base + e) && fs.statSync(base + e).isFile()) return base + e;
  return null;
}
const alcancados = new Set();
const fila = fontes.filter((f) => f.startsWith(path.join(SRC, "app") + path.sep));
while (fila.length) {
  const f = fila.pop();
  if (alcancados.has(f)) continue;
  alcancados.add(f);
  if (!/\.tsx?$/.test(f)) continue;
  const s = fs.readFileSync(f, "utf8");
  for (const m of s.matchAll(/(?:import|export)\s[^'"]*?from\s*["']([^"']+)["']|import\s*["']([^"']+)["']/g)) {
    const r = resolver(f, m[1] ?? m[2]);
    if (r) fila.push(r);
  }
}
const removidos = fontes.filter((f) => !alcancados.has(f));
for (const f of removidos) fs.rmSync(f);
// pastas vazias
for (const d of fs.readdirSync(SRC, { recursive: true, withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => path.join(d.parentPath ?? d.path, d.name)).sort((a, b) => b.length - a.length)) {
  if (fs.readdirSync(d).length === 0) fs.rmdirSync(d);
}

/* ---------- 6. next.config, package.json e README do cliente ---------- */
// o Next.js cria um AGENTS.md (instruções para IA) ao rodar `next dev`; no projeto do cliente, não
const configCaminho = path.join(DESTINO, "next.config.ts");
const config = fs.readFileSync(configCaminho, "utf8");
if (!config.includes("agentRules")) {
  fs.writeFileSync(configCaminho, config.replace("const nextConfig: NextConfig = {", "const nextConfig: NextConfig = {\n  agentRules: false,"));
}

const pkgCaminho = path.join(DESTINO, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgCaminho, "utf8"));
pkg.name = `site-${slug}`;
delete pkg.scripts.entrega;
fs.writeFileSync(pkgCaminho, JSON.stringify(pkg, null, 2) + "\n");
const lockCaminho = path.join(DESTINO, "package-lock.json");
if (fs.existsSync(lockCaminho)) {
  const lock = JSON.parse(fs.readFileSync(lockCaminho, "utf8"));
  lock.name = pkg.name;
  if (lock.packages?.[""]) lock.packages[""].name = pkg.name;
  fs.writeFileSync(lockCaminho, JSON.stringify(lock, null, 2) + "\n");
}

const { negocio } = cliente;
fs.writeFileSync(
  path.join(DESTINO, "README.md"),
  `# ${negocio.nome}

Site de ${negocio.nome}, ${negocio.segmento.toLowerCase()} em ${negocio.cidade}.

Feito com Next.js e Tailwind CSS.

## Rodar no computador

\`\`\`bash
npm install
npm run dev
\`\`\`

O site abre em http://localhost:3000.

## Onde editar

| O quê | Arquivo |
|---|---|
| Textos, contatos, horários, serviços, avaliações e fotos | \`src/content/cliente.json\` |
| Cores, fontes e formas | \`src/styles/tokens.css\` |
| Imagens | \`public/cliente/\` |

## Publicar

\`\`\`bash
npm run build
\`\`\`

Pronto para hospedar na Vercel ou em qualquer serviço compatível com Next.js.
`,
);

/* ---------- 7. Histórico novo ---------- */
execSync("git init -q -b main", { cwd: DESTINO });
execSync("git add -A", { cwd: DESTINO });
execSync(`git commit -q -m ${JSON.stringify(`Site ${negocio.nome}`)}`, { cwd: DESTINO });

console.log(`\nEntrega criada em ${DESTINO}`);
console.log(`  seções: ${[navbar, ...secoes.map((s) => s.nome), rodape].join(", ")}`);
console.log(`  arquivos de código removidos por não serem usados: ${removidos.length}`);
console.log(`  modo demo: ${json.modoDemo ? "ligado" : "desligado"}`);
console.log(`\nPróximos passos: cd ${path.relative(RAIZ, DESTINO)} && npm install && npm run build`);
