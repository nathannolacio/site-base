import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { Chip, Detalhe, Forma, SeloCircular } from "@/components/ui/Ornamentos";
import { Botao } from "@/components/ui/Botao";
import { Estrelas } from "@/components/ui/Estrelas";
import { Foto } from "@/components/ui/Foto";
import { Icone } from "@/components/ui/Icone";
import { IconeInstagram, IconeWhatsapp } from "@/components/ui/IconesRedes";
import { ROTULO_SECAO, SECOES, RODAPES } from "@/components/secoes/registro";
import { NAVBARS } from "@/components/secoes/navbar";
import { cliente as c, verificarFoto } from "@/content/conteudo";
import type { Tom } from "@/content/tipos";
import { contraste, lerTokens } from "@/lib/tokens";
import { PreviaCelular, PreviaDesktop } from "./Previa";

export const metadata: Metadata = {
  title: `Identidade visual | ${c.negocio.nome}`,
  robots: { index: false, follow: false },
};

const NOMES_COR: Record<string, string> = {
  marca: "Principal",
  fundo: "Fundo",
  superficie: "Superfície",
  tinta: "Texto",
  "tinta-suave": "Texto secundário",
  destaque: "Destaque",
};

const RECORTES: Record<string, string> = {
  reto: "cantos arredondados",
  arco: "arco",
  circulo: "círculo",
  pilula: "pílula",
  blob: "forma orgânica",
  inclinado: "corte inclinado",
  folha: "folha",
};

const ESTILOS: Record<string, string> = {
  organico: "orgânico (formas arredondadas e folhas)",
  geometrico: "geométrico (círculos, meias-luas e blocos sólidos)",
  linear: "linear (traço fino, arcos e brilhos)",
  artesanal: "artesanal (carimbo e traço desenhado à mão)",
  moderno: "moderno (grade técnica e cantos retos)",
};

export default function PaginaIdentidade() {
  const t = lerTokens();
  const principais = t.cores.filter((cor) => NOMES_COR[cor.nome]);
  const pares = [
    { rotulo: "Texto sobre o fundo", frente: t.hex["tinta"], fundo: t.hex["fundo"] },
    { rotulo: "Texto secundário sobre o fundo", frente: t.hex["tinta-suave"], fundo: t.hex["fundo"] },
    { rotulo: "Texto sobre a cor principal", frente: t.hex["marca-contraste"], fundo: t.hex["marca"] },
    { rotulo: "Texto sobre o destaque", frente: t.hex["sobre-destaque"], fundo: t.hex["destaque"] },
  ].filter((p) => p.frente && p.fundo);

  const origem = (c.identidade.origem ?? []).map((o) => ({ ...o, foto: verificarFoto({ src: o.src, alt: "" }) }));
  const pendencias = c.pendencias ?? [];
  const icones = Array.from(new Set([...c.servicos.itens.map((s) => s.icone), ...c.sobre.pilares.map((p) => p.icone)]));
  const servico = c.servicos.itens[0];
  const avaliacao = c.avaliacoes.itens[0];

  return (
    <main data-tom="claro" className="min-h-dvh pb-24">
      {/* Abertura */}
      <header data-tom="marca" className="relative overflow-hidden">
        <Forma estilo={c.identidade.estilo} cor="var(--cor-marca-contraste)" className="absolute -right-16 -bottom-20 w-64 opacity-15 md:w-96" />
        <SeloCircular estilo={c.identidade.estilo} texto={c.identidade.seloTexto} icone={c.identidade.icone} className="absolute top-10 right-6 hidden w-32 md:block lg:right-16 lg:w-40" />
        <div className="container-site relative py-16 md:py-24">
          <p className="text-texto-suave">Proposta de identidade visual para o site</p>
          <h1 className="titulo t-gigante mt-3">{c.negocio.nome}</h1>
          <p className="t-lead mt-6 max-w-[52ch] text-texto-suave">
            {c.negocio.segmento} em {c.negocio.cidade}.
            {c.redes.instagram && <> Identidade tirada do Instagram @{c.redes.instagram.usuario}.</>}
          </p>
        </div>
      </header>

      {/* Origem */}
      {origem.length > 0 && (
        <Bloco titulo="De onde veio" texto="Os posts e fotos da marca que guiaram as escolhas abaixo.">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {origem.map((o, i) => (
              <li key={i}>
                <div className="relative aspect-square overflow-hidden rounded-base">
                  <Foto foto={{ src: o.foto.src, alt: `Post ${i + 1} do Instagram` }} sizes="20rem" />
                </div>
                <p className="mt-3 text-[0.95rem] text-texto-suave">{o.nota}</p>
              </li>
            ))}
          </ul>
        </Bloco>
      )}

      {/* Cores */}
      <Bloco titulo="Cores" texto="Seis cores, cada uma com um papel fixo no site.">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-7">
          {principais.map((cor, i) => (
            <li key={cor.nome} className={i === 0 ? "col-span-2 md:col-span-1 lg:col-span-2" : ""}>
              <div className="h-36 rounded-base border border-linha md:h-44" style={{ background: cor.hex }} />
              <p className="mt-3 font-semibold">{NOMES_COR[cor.nome]}</p>
              <p className="font-mono text-sm text-texto-suave uppercase">{cor.hex}</p>
              {cor.descricao && <p className="mt-1 text-sm text-texto-suave">{cor.descricao}</p>}
            </li>
          ))}
        </ul>

        <h3 className="titulo t-3 mt-14">Leitura</h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {pares.map((p) => {
            const r = contraste(p.frente, p.fundo);
            const ok = r >= 4.5;
            return (
              <li key={p.rotulo} className="flex items-center gap-4 rounded-base border border-linha p-3">
                <span className="grid h-14 w-20 shrink-0 place-items-center rounded-pequeno text-xl font-semibold" style={{ background: p.fundo, color: p.frente }}>
                  Aa
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{p.rotulo}</span>
                  <span className="text-sm text-texto-suave">
                    Contraste {r.toFixed(1).replace(".", ",")}:1
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded-botao px-3 py-1 text-sm font-semibold ${ok ? "bg-acento text-sobre-acento" : "bg-[#b42318] text-white"}`}
                >
                  {ok ? "Legível" : r >= 3 ? "Só em títulos" : "Ilegível"}
                </span>
              </li>
            );
          })}
        </ul>
      </Bloco>

      {/* Tipografia */}
      <Bloco titulo="Tipografia" texto="Uma fonte para títulos e outra para textos, escritas com frases do próprio site.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-grande bg-cartao p-8">
            <p className="text-sm text-texto-suave">Títulos</p>
            <p className="titulo mt-2 text-7xl">Aa</p>
            <p className="mt-4 text-xl font-semibold">{t.fonteTitulo}</p>
            <p className="titulo mt-3 text-lg break-all text-texto-suave">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
          </div>
          <div className="rounded-grande bg-cartao p-8">
            <p className="text-sm text-texto-suave">Textos</p>
            <p className="mt-2 text-7xl leading-none font-normal">Aa</p>
            <p className="mt-4 text-xl font-semibold">{t.fonteTexto}</p>
            <p className="mt-3 text-lg break-all text-texto-suave">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
          </div>
        </div>

        <dl className="mt-10 divide-y divide-linha border-y border-linha">
          <Escala rotulo="Título principal">
            <span className="titulo t-1 block">{c.negocio.frase}</span>
          </Escala>
          <Escala rotulo="Título de seção">
            <span className="titulo t-2 block">{c.sobre.titulo}</span>
          </Escala>
          <Escala rotulo="Subtítulo">
            <span className="titulo t-3 block">{servico?.nome}</span>
          </Escala>
          <Escala rotulo="Texto de destaque">
            <span className="t-lead medida block text-texto-suave">{c.negocio.descricao}</span>
          </Escala>
          <Escala rotulo="Texto">
            <span className="medida block">{c.sobre.texto}</span>
          </Escala>
        </dl>
      </Bloco>

      {/* Componentes */}
      <Bloco titulo="Componentes" texto="As peças que se repetem pelo site.">
        <div className="flex flex-wrap items-center gap-4">
          <Botao href="#" whatsapp>Chamar no WhatsApp</Botao>
          <Botao href="#" estilo="secundario">Ver serviços</Botao>
          <Botao href="#" estilo="contorno">Abrir no Google Maps</Botao>
          <Botao href="#" estilo="texto">Ver o que fazemos</Botao>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {servico && (
            <div className="rounded-grande bg-cartao p-7">
              <span className="grid size-14 place-items-center rounded-base bg-fundo text-acento">
                <Icone nome={servico.icone} className="size-7" />
              </span>
              <p className="titulo t-3 mt-8">{servico.nome}</p>
              <p className="mt-2.5 text-texto-suave">{servico.descricao}</p>
            </div>
          )}
          {avaliacao && (
            <div className="rounded-grande bg-cartao p-7">
              <Estrelas nota={avaliacao.nota} />
              <p className="mt-4 leading-relaxed">{avaliacao.texto}</p>
              <p className="mt-5 text-sm text-texto-suave">
                <strong className="font-semibold text-texto">{avaliacao.nome}</strong>
                {avaliacao.quando && <>, {avaliacao.quando}</>}
              </p>
            </div>
          )}
          <div className="flex flex-col items-start gap-4 rounded-grande border border-linha p-7">
            {c.negocio.selo && (
              <span className="rounded-base bg-destaque px-4 py-3 font-semibold text-sobre-destaque">{c.negocio.selo}</span>
            )}
            {c.sobre.pilares.slice(0, 3).map((p) => (
              <span key={p.titulo} className="rounded-botao border border-linha px-4 py-2 text-[0.95rem] font-medium">
                {p.titulo}
              </span>
            ))}
          </div>
        </div>

        <h3 className="titulo t-3 mt-14">Tons de seção</h3>
        <p className="mt-2 text-texto-suave">As seções alternam entre estes quatro fundos para dar ritmo à página.</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(["claro", "suave", "marca", "escuro"] as Tom[]).map((tom) => (
            <li key={tom} data-tom={tom} className="rounded-grande border border-linha p-6">
              <p className="titulo t-3">{{ claro: "Claro", suave: "Suave", marca: "Marca", escuro: "Escuro" }[tom]}</p>
              <p className="mt-2 text-texto-suave">Texto secundário neste fundo.</p>
              <span className="mt-5 inline-block rounded-botao bg-acento px-4 py-2 text-sm font-semibold text-sobre-acento">Botão</span>
            </li>
          ))}
        </ul>
      </Bloco>

      {/* Ícones */}
      <Bloco titulo="Ícones" texto="Traço fino, na cor principal. Os mesmos em todo o site.">
        <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-12">
          {icones.map((nome) => (
            <li key={nome} className="grid aspect-square place-items-center rounded-base bg-cartao text-acento">
              <Icone nome={nome} className="size-8" />
            </li>
          ))}
          {[Phone, MapPin, Clock].map((I, i) => (
            <li key={i} className="grid aspect-square place-items-center rounded-base bg-cartao text-acento">
              <I className="size-8" strokeWidth={1.6} aria-hidden />
            </li>
          ))}
          <li className="grid aspect-square place-items-center rounded-base bg-cartao text-acento">
            <IconeWhatsapp className="size-8" />
          </li>
          <li className="grid aspect-square place-items-center rounded-base bg-cartao text-acento">
            <IconeInstagram className="size-8" />
          </li>
        </ul>
      </Bloco>

      {/* Elementos gráficos */}
      <Bloco
        titulo="Elementos gráficos"
        texto={`Estilo ${ESTILOS[c.identidade.estilo]}, com fotos em recorte de ${RECORTES[c.identidade.recorte]}. São os detalhes soltos que aparecem por cima e em volta das fotos.`}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Peca rotulo="Forma de fundo">
            <Forma estilo={c.identidade.estilo} className="w-40" />
          </Peca>
          <Peca rotulo="Detalhe">
            <Detalhe estilo={c.identidade.estilo} className="size-20" />
          </Peca>
          <Peca rotulo="Selo girando">
            {c.identidade.seloTexto ? (
              <SeloCircular estilo={c.identidade.estilo} texto={c.identidade.seloTexto} icone={c.identidade.icone} className="w-40" />
            ) : (
              <span className="text-texto-suave">Sem selo</span>
            )}
          </Peca>
          <Peca rotulo="Etiqueta sobre foto">
            <div className="flex flex-col items-start gap-4">
              <Chip estilo={c.identidade.estilo} icone="Star" titulo="4,9 no Google" texto="312 avaliações" />
              {c.negocio.selo && <Chip estilo={c.identidade.estilo} icone={c.identidade.icone} titulo={c.negocio.selo} />}
            </div>
          </Peca>
        </div>

        <h3 className="titulo t-3 mt-14">Tudo junto</h3>
        <div className="mt-6 grid items-center gap-10 md:grid-cols-2">
          <div className="relative mx-auto w-full max-w-sm pb-10">
            <Forma estilo={c.identidade.estilo} className="absolute -bottom-6 -left-10 w-[60%]" />
            <div className="relative ml-auto aspect-[4/5] w-[85%]">
              <Foto foto={c.fotos.hero} recorte={c.identidade.recorte} sizes="20rem" />
            </div>
            <SeloCircular estilo={c.identidade.estilo} texto={c.identidade.seloTexto} icone={c.identidade.icone} className="absolute -top-6 right-0 w-28" />
            {c.negocio.selo && <Chip estilo={c.identidade.estilo} icone={c.identidade.icone} titulo={c.negocio.selo} className="absolute bottom-16 left-0" />}
          </div>
          <div data-tom="marca" className="relative grid min-h-72 place-items-center overflow-hidden rounded-grande p-10">
            <Forma estilo={c.identidade.estilo} cor="var(--cor-marca-contraste)" className="absolute -right-12 -bottom-16 w-64 opacity-15" />
            <Detalhe estilo={c.identidade.estilo} className="absolute top-6 left-6 size-12" />
            <p className="titulo t-3 relative max-w-[20ch] text-center">{c.cta.titulo}</p>
          </div>
        </div>
      </Bloco>

      {/* Prévia */}
      <Bloco titulo="Como fica o site" texto="O topo do site real, já com esta identidade aplicada.">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_300px]">
          <PreviaDesktop />
          <PreviaCelular />
        </div>
      </Bloco>

      {/* Resumo */}
      <Bloco titulo="Resumo para aprovar">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-grande bg-cartao p-7">
            <h3 className="font-semibold">O negócio</h3>
            <p className="mt-3 text-texto-suave">{c.negocio.descricao}</p>
          </div>
          <div className="rounded-grande bg-cartao p-7">
            <h3 className="font-semibold">Estrutura da página</h3>
            <ol className="mt-3 flex flex-col gap-1.5 text-texto-suave">
              <li>Menu: {NAVBARS[c.layout.navbar].nome}</li>
              {c.layout.secoes.map((s, i) => (
                <li key={i}>
                  {ROTULO_SECAO[s.tipo]}: {SECOES[s.tipo]?.[s.variacao]?.nome}
                </li>
              ))}
              <li>Rodapé: {RODAPES[c.layout.rodape.variacao].nome}</li>
            </ol>
          </div>
          <div className="rounded-grande border-2 border-destaque p-7">
            <h3 className="font-semibold">A confirmar com o cliente</h3>
            {pendencias.length ? (
              <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-texto-suave">
                {pendencias.map((p) => <li key={p}>{p}</li>)}
              </ul>
            ) : (
              <p className="mt-3 text-texto-suave">Nada pendente.</p>
            )}
          </div>
        </div>
      </Bloco>
    </main>
  );
}

function Bloco({ titulo, texto, children }: { titulo: string; texto?: string; children: ReactNode }) {
  return (
    <section className="container-site border-b border-linha py-16 md:py-20">
      <div className="mb-10 max-w-2xl">
        <h2 className="titulo t-2">{titulo}</h2>
        {texto && <p className="t-lead mt-3 text-texto-suave">{texto}</p>}
      </div>
      {children}
    </section>
  );
}

function Peca({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-grande border border-linha">
      <div className="grid min-h-56 flex-1 place-items-center bg-cartao p-8">{children}</div>
      <p className="px-5 py-3 text-sm font-medium">{rotulo}</p>
    </div>
  );
}

function Escala({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 py-6 md:grid-cols-[12rem_1fr] md:gap-8">
      <dt className="pt-1 text-sm text-texto-suave">{rotulo}</dt>
      <dd>{children}</dd>
    </div>
  );
}
