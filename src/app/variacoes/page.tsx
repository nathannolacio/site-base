import type { Metadata } from "next";
import { NAVBARS } from "@/components/secoes/navbar";
import { RODAPES, ROTULO_SECAO, SECOES } from "@/components/secoes/registro";
import { cliente as c, itensDoMenu } from "@/content/conteudo";
import type { TipoSecao, Tom, Variacao } from "@/content/tipos";
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
};
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
            {["navbar", ...tipos, "rodape"].map((t) => (
              <a key={t} href={`#cat-${t}`} className="rounded-botao border border-linha px-4 py-2 text-sm font-medium hover:bg-cartao">
                {t === "navbar" ? "Navbar" : t === "rodape" ? "Rodapé" : ROTULO_SECAO[t as TipoSecao]}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <Grupo id="navbar" titulo="Navbar">
        {VARIACOES.map((v) => {
          const { nome, Componente } = NAVBARS[v];
          return (
            <Item key={v} rotulo={`Navbar ${v}: ${nome}`} config={`"navbar": ${v}`}>
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
            const { nome, Componente } = SECOES[tipo][v];
            const tom = TOM_PADRAO[tipo][v];
            return (
              <Item key={v} rotulo={`${ROTULO_SECAO[tipo]} ${v}: ${nome}`} config={`{ "tipo": "${tipo}", "variacao": ${v}, "tom": "${tom}" }`}>
                <div className="relative">
                  <Componente c={{ ...c, layout: { ...c.layout, navbar: 2 } }} tom={tom} />
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
            <Item key={v} rotulo={`Rodapé ${v}: ${nome}`} config={`"rodape": { "variacao": ${v}, "tom": "${TOM_RODAPE[v]}" }`}>
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

function Item({ rotulo, config, children }: { rotulo: string; config: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-linha">
      <div data-tom="escuro" className="sticky top-0 z-[70]">
        <div className="container-site flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3 text-sm">
          <strong className="font-semibold">{rotulo}</strong>
          <code className="text-texto-suave">{config}</code>
        </div>
      </div>
      {children}
    </div>
  );
}
