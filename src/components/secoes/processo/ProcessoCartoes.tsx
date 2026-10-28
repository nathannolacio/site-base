import { Icone } from "@/components/ui/Icone";
import { Forma } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";

/**
 * Etapas em cartões com o número vazado e grande; o último cartão,
 * na cor de destaque, reúne as informações práticas.
 */
/* O cartão de informações ocupa o espaço que sobra na última linha, para a grade fechar. */
const SPAN_LG: Record<number, string> = { 1: "", 2: "lg:col-span-2", 3: "lg:col-span-3" };

export function ProcessoCartoes({ c, tom }: SecaoProps) {
  const p = c.processo;
  if (!p) return null;
  const total = p.etapas.length + 1;
  const spanLg = SPAN_LG[total % 3 === 0 ? 1 : 3 - (total % 3) + 1];
  const spanSm = total % 2 === 1 ? "sm:col-span-2" : "";
  return (
    <Secao id={ANCORAS.processo} tom={tom}>
      <Forma estilo={c.identidade.estilo} cor="var(--texto)" className="absolute -top-20 -right-24 w-80 opacity-[0.06] md:w-[30rem]" />
      <div className="container-site relative">
        <div className="max-w-2xl">
          <h2 className="titulo t-2">{p.titulo}</h2>
          <p className="t-lead mt-5 text-texto-suave">{p.intro}</p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.etapas.map((e, i) => (
            <li key={e.titulo} className="flex flex-col rounded-grande bg-cartao p-7 md:p-8">
              <span
                className="titulo text-[4.5rem] leading-none text-transparent"
                style={{ WebkitTextStroke: "1.5px var(--acento)" }}
                aria-label={`Etapa ${i + 1}`}
              >
                {i + 1}
              </span>
              <h3 className="titulo t-3 mt-6">{e.titulo}</h3>
              <p className="mt-2.5 text-texto-suave">{e.texto}</p>
            </li>
          ))}
          {p.detalhes.length > 0 && (
            <li className={`grid content-center gap-5 rounded-grande bg-acento p-7 text-sobre-acento sm:grid-cols-2 md:p-8 ${spanSm} ${spanLg}`}>
              {p.detalhes.map((d) => (
                <div key={d.rotulo} className="flex items-center gap-4">
                  <Icone nome={d.icone} className="size-6 shrink-0" />
                  <p>
                    <span className="block text-sm opacity-80">{d.rotulo}</span>
                    <span className="font-semibold">{d.valor}</span>
                  </p>
                </div>
              ))}
            </li>
          )}
        </ol>
      </div>
    </Secao>
  );
}
