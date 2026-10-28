import { ArrowUpRight } from "lucide-react";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";
import { linkPacote, Preco } from "./partes";

/**
 * Planos em linhas largas: nome e descrição, o que inclui e, à direita, preço e link.
 */
export function PacotesLista({ c, tom }: SecaoProps) {
  const p = c.pacotes;
  if (!p) return null;
  return (
    <Secao id={ANCORAS.pacotes} tom={tom}>
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-end">
          <h2 className="titulo t-2 max-w-[16ch]">{p.titulo}</h2>
          <p className="medida text-texto-suave">{p.intro}</p>
        </div>

        <ul className="mt-14 border-t border-texto">
          {p.itens.map((item) => (
            <li key={item.nome} className="border-b border-linha">
              <a
                href={linkPacote(c, item)}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-x-10 gap-y-4 py-8 md:grid-cols-[1.2fr_1fr_auto] md:items-center"
              >
                <div>
                  <h3 className="titulo t-3 flex flex-wrap items-center gap-3">
                    {item.nome}
                    {item.destaque && (
                      <span className="rounded-botao bg-destaque px-3 py-0.5 font-texto text-sm font-semibold tracking-normal text-sobre-destaque normal-case">
                        Mais escolhido
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-texto-suave">{item.descricao}</p>
                </div>
                <p className="text-[0.95rem] text-texto-suave">{item.inclui.join(" · ")}</p>
                <div className="flex items-center justify-between gap-6 md:justify-end">
                  <Preco p={item} />
                  <ArrowUpRight
                    aria-hidden
                    className="size-7 shrink-0 text-acento transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>
        {p.observacao && <p className="mt-8 text-texto-suave">{p.observacao}</p>}
      </div>
    </Secao>
  );
}
