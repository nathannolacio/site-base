import type { Metadata } from "next";
import { NAVBARS } from "@/components/secoes/navbar";
import { HEROS } from "@/components/secoes/hero";
import { Chip, Detalhe, Forma, SeloCircular } from "@/components/ui/Ornamentos";
import { RODAPES, ROTULO_SECAO, SECOES } from "@/components/secoes/registro";
import { cliente as c, itensDoMenu, prepararCliente, type Cliente } from "@/content/conteudo";
import exemploTerapeuta from "@/content/exemplos/terapeuta.json";
import type { EstiloGrafico, TipoSecao, Tom, Variacao } from "@/content/tipos";
import { linkTelefone, linkWhatsapp } from "@/lib/links";

export const metadata: Metadata = {
  title: "Catálogo de variações",
  robots: { index: false, follow: false },
};

const VARIACOES: Variacao[] = [1, 2, 3];

/* Tom usado para exibir cada variação no catálogo (o site real usa o tom do cliente.json). */
const TOM_PADRAO: Record<TipoSecao, Record<Variacao, Tom>> = {
  hero: { 1: "claro", 2: "claro", 3: "escuro" },
  sobre: { 1: "claro", 2: "suave", 3: "claro" },
  servicos: { 1: "claro", 2: "suave", 3: "claro" },
  galeria: { 1: "claro", 2: "suave", 3: "claro" },
  avaliacoes: { 1: "suave", 2: "claro", 3: "marca" },
  localizacao: { 1: "claro", 2: "claro", 3: "marca" },
  cta: { 1: "marca", 2: "escuro", 3: "suave" },
  abordagem: { 1: "claro", 2: "suave", 3: "claro" },
  processo: { 1: "claro", 2: "claro", 3: "marca" },
  pacotes: { 1: "claro", 2: "suave", 3: "claro" },
  faq: { 1: "claro", 2: "suave", 3: "claro" },
};

/* Seções de terapeuta usam o exemplo de terapeuta. Os planos 1 e 2 ganham preços de exemplo
   (preços só valem para terapeutas que não são psicólogas). */
const TERAPEUTA = new Set<TipoSecao>(["abordagem", "processo", "pacotes", "faq"]);
const ct = prepararCliente(exemploTerapeuta);
const PRECOS = [
  { preco: "R$ 180", periodo: "por sessão" },
  { preco: "R$ 640", periodo: "4 sessões por mês", destaque: true },
  { preco: "R$ 1.200", periodo: "8 sessões" },
];
const ctComPrecos: Cliente = {
  ...ct,
  pacotes: ct.pacotes && {
    ...ct.pacotes,
    titulo: "Pacotes",
    intro: "Escolha o formato que cabe melhor na sua rotina.",
    observacao: "Pacotes válidos por 60 dias. Emito recibo para reembolso do plano de saúde.",
    itens: ["Sessão avulsa", "Pacote mensal", "Pacote bimestral"].map((nome, i) => ({
      nome,
      descricao: ["Para conhecer o trabalho.", "O formato mais procurado.", "Para quem quer constância."][i],
      inclui: ["Sessões de 50 minutos", "Online ou presencial"],
      ...PRECOS[i],
    })),
  },
};
function conteudoDe(tipo: TipoSecao, v: Variacao): Cliente {
  if (!TERAPEUTA.has(tipo)) return c;
  return tipo === "pacotes" && v !== 3 ? ctComPrecos : ct;
}
const ESTILOS: { id: EstiloGrafico; nome: string; nichos: string }[] = [
  { id: "organico", nome: "Orgânico", nichos: "cafés, padarias, floriculturas, pet shops, produtos naturais" },
  { id: "geometrico", nome: "Geométrico", nichos: "escolas, academias, lojas infantis, agências, eventos" },
  { id: "linear", nome: "Linear", nichos: "clínicas, estética, odontologia, joalherias, advocacia" },
  { id: "artesanal", nome: "Artesanal", nichos: "confeitarias, cervejarias, ateliês, restaurantes de bairro" },
  { id: "moderno", nome: "Moderno", nichos: "barbearias, estúdios de tatuagem, oficinas, tecnologia, arquitetura" },
];

const TOM_RODAPE: Record<Variacao, Tom> = { 1: "suave", 2: "claro", 3: "escuro" };

export default function PaginaVariacoes() {
  const tipos = Object.keys(SECOES) as TipoSecao[];
  const navProps = {
    nome: c.negocio.nome,
    logo: c.identidade.logo,
    itens: itensDoMenu(c),
    whatsappHref: linkWhatsapp(c.contato.whatsapp, c.contato.mensagemWhatsapp),
    telefone: c.contato.telefone,
    telefoneHref: linkTelefone(c.contato.telefone),
    horario: `${c.contato.horarios[0]?.dias ?? ""}, ${c.contato.horarios[0]?.horas ?? ""}`,
  };

  return (
    <div data-tom="claro">
      <header className="border-b border-linha">
        <div className="container-site py-12">
          <h1 className="titulo t-2">Catálogo de variações</h1>
          <p className="t-lead medida mt-3 text-texto-suave">
            Todas as seções do template, com as 3 variações de cada uma, usando os dados e a identidade atuais do cliente.json.
            Para usar uma variação, informe o número em <code className="rounded-pequeno bg-cartao px-1.5 py-0.5 text-[0.9em]">layout</code> no cliente.json.
          </p>
          <nav aria-label="Seções do catálogo" className="mt-8 flex flex-wrap gap-2">
            {["estilos", "navbar", ...tipos, "rodape"].map((t) => (
              <a key={t} href={`#cat-${t}`} className="rounded-botao border border-linha px-4 py-2 text-sm font-medium hover:bg-cartao">
                {t === "estilos" ? "Elementos gráficos" : t === "navbar" ? "Navbar" : t === "rodape" ? "Rodapé" : ROTULO_SECAO[t as TipoSecao]}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <Grupo id="estilos" titulo="Elementos gráficos (identidade.estilo)">
        {ESTILOS.map((e) => {
          const ce = { ...c, identidade: { ...c.identidade, estilo: e.id }, layout: { ...c.layout, navbar: 2 as Variacao } };
          const Hero = HEROS[1].Componente;
          return (
            <Item key={e.id} id={`estilo-${e.id}`} rotulo={`${e.nome}: ${e.nichos}`} config={`"estilo": "${e.id}"`}>
              <div data-tom="suave" className="border-b border-linha">
                <div className="container-site grid grid-cols-2 items-center gap-6 py-10 md:grid-cols-4">
                  <div className="grid place-items-center"><Forma estilo={e.id} className="w-32" /></div>
                  <div className="grid place-items-center"><Detalhe estilo={e.id} className="size-16" /></div>
                  <div className="grid place-items-center">
                    <SeloCircular estilo={e.id} texto={c.identidade.seloTexto} icone={c.identidade.icone} className="w-32" />
                  </div>
                  <div className="grid place-items-center">
                    <Chip estilo={e.id} icone="Star" titulo="4,9 no Google" texto="312 avaliações" />
                  </div>
                </div>
              </div>
              <Hero c={ce} tom="claro" />
            </Item>
          );
        })}
      </Grupo>

      <Grupo id="navbar" titulo="Navbar">
        {VARIACOES.map((v) => {
          const { nome, Componente } = NAVBARS[v];
          return (
            <Item key={v} id={`navbar-${v}`} rotulo={`Navbar ${v}: ${nome}`} config={`"navbar": ${v}`}>
              <div className="relative h-40 overflow-hidden bg-cartao">
                <Componente {...navProps} preview />
              </div>
            </Item>
          );
        })}
      </Grupo>

      {tipos.map((tipo) => (
        <Grupo key={tipo} id={tipo} titulo={ROTULO_SECAO[tipo]}>
          {VARIACOES.map((v) => {
            const { nome, Componente } = SECOES[tipo]![v]!;
            const tom = TOM_PADRAO[tipo][v];
            return (
              <Item key={v} id={`${tipo}-${v}`} rotulo={`${ROTULO_SECAO[tipo]} ${v}: ${nome}`} config={`{ "tipo": "${tipo}", "variacao": ${v}, "tom": "${tom}" }`}>
                <div className="relative">
                  <Componente c={{ ...conteudoDe(tipo, v), layout: { ...c.layout, navbar: 2 } }} tom={tom} />
                </div>
              </Item>
            );
          })}
        </Grupo>
      ))}

      <Grupo id="rodape" titulo="Rodapé">
        {VARIACOES.map((v) => {
          const { nome, Componente } = RODAPES[v];
          return (
            <Item key={v} id={`rodape-${v}`} rotulo={`Rodapé ${v}: ${nome}`} config={`"rodape": { "variacao": ${v}, "tom": "${TOM_RODAPE[v]}" }`}>
              <Componente c={c} tom={TOM_RODAPE[v]} />
            </Item>
          );
        })}
      </Grupo>
    </div>
  );
}

function Grupo({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={`cat-${id}`} className="border-b-8 border-texto">
      <h2 className="titulo t-3 container-site pt-14 pb-4">{titulo}</h2>
      {children}
    </section>
  );
}

function Item({ id, rotulo, config, children }: { id: string; rotulo: string; config: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-linha">
      <div data-tom="escuro" className="sticky top-0 z-[70]">
        <div className="container-site flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3 text-sm">
          <strong className="font-semibold">{rotulo}</strong>
          <code className="text-texto-suave">{config}</code>
        </div>
      </div>
      <div data-captura={id}>{children}</div>
    </div>
  );
}
