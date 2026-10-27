import { ArrowUpRight } from "lucide-react";
import { Foto } from "@/components/ui/Foto";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";
import type { SecaoProps } from "../tipos";

/**
 * Serviços 2 — Lista editorial
 * Linhas largas com nome grande e descrição. No computador, a foto do serviço
 * aparece ao passar o mouse; no celular, uma miniatura fica ao lado do nome.
 * Boa para cardápios curtos, tratamentos, especialidades.
 */
export function ServicosLista({ c, tom }: SecaoProps) {
  const { servicos, contato } = c;
  return (
    <Secao id={ANCORAS.servicos} tom={tom}>
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
          <h2 className="titulo t-2 max-w-[18ch]">{servicos.titulo}</h2>
          <p className="medida text-texto-suave">{servicos.intro}</p>
        </div>

        <ul className="mt-14 border-t border-texto">
          {servicos.itens.map((s) => {
            const mensagem = `Olá! Queria saber mais sobre ${s.nome.toLowerCase()}.`;
            return (
              <li key={s.nome} className="group relative border-b border-linha">
                <a
                  href={linkWhatsapp(contato.whatsapp, mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 py-7 md:grid-cols-[1fr_1fr_auto] md:gap-x-10 md:py-9"
                >
                  {s.foto && (
                    <span className="relative block size-16 shrink-0 overflow-hidden rounded-base md:hidden">
                      <Foto foto={s.foto} sizes="64px" />
                    </span>
                  )}
                  <h3 className="titulo t-3 text-[clamp(1.375rem,2.6vw,2.25rem)]! transition-transform duration-300 group-hover:translate-x-2">
                    {s.nome}
                    {s.preco && <span className="mt-1 block font-texto text-base font-semibold tracking-normal text-acento normal-case">{s.preco}</span>}
                  </h3>
                  <p className="col-span-3 text-texto-suave md:col-span-1 lg:pr-56">{s.descricao}</p>
                  <ArrowUpRight
                    aria-hidden
                    className="col-start-3 row-start-1 size-7 justify-self-end text-acento transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
                {s.foto && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-16 z-10 hidden aspect-[4/3] w-48 -translate-y-1/2 scale-90 rotate-3 overflow-hidden rounded-base opacity-0 shadow-marca transition duration-300 group-hover:scale-100 group-hover:opacity-100 lg:block"
                  >
                    <Foto foto={s.foto} sizes="192px" />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Secao>
  );
}
