import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";
import { Detalhes } from "./Detalhes";

/**
 * Etapas numeradas ligadas por uma linha: na horizontal no computador,
 * na vertical no celular. As informações práticas ficam numa faixa embaixo.
 */
export function ProcessoLinha({ c, tom }: SecaoProps) {
  const p = c.processo;
  if (!p) return null;
  const colunas = Math.min(Math.max(p.etapas.length, 2), 5);
  return (
    <Secao id={ANCORAS.processo} tom={tom}>
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="titulo t-2 max-w-[16ch]">{p.titulo}</h2>
          <p className="medida text-texto-suave">{p.intro}</p>
        </div>

        <div className="relative mt-16">
          {/* linha que liga as etapas */}
          <span aria-hidden className="absolute top-0 bottom-0 left-6 w-px bg-linha lg:hidden" />
          <span
            aria-hidden
            className="absolute top-6 left-6 hidden h-px bg-linha lg:block"
            style={{ right: `calc((100% - ${colunas - 1} * 2rem) / ${colunas} - 1.5rem)` }}
          />
          <ol
            className="relative grid gap-10 lg:grid-cols-[repeat(var(--colunas),minmax(0,1fr))] lg:gap-8"
            style={{ ["--colunas" as string]: colunas }}
          >
            {p.etapas.map((e, i) => (
              <li key={e.titulo} className="grid grid-cols-[auto_1fr] gap-x-6 lg:block">
                <span className="titulo relative z-10 grid size-12 place-items-center rounded-full bg-acento text-xl text-sobre-acento ring-8 ring-fundo">
                  {i + 1}
                </span>
                <div className="lg:mt-7">
                  <h3 className="titulo t-3 pt-2 lg:pt-0">{e.titulo}</h3>
                  <p className="mt-2.5 text-texto-suave">{e.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 rounded-grande border border-linha p-7 md:p-9">
          <Detalhes c={c} />
        </div>
      </div>
    </Secao>
  );
}
