import { Icone } from "@/components/ui/Icone";
import { Detalhe, Forma } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";

/**
 * Abertura centralizada com o nome do método, pilares em cartões grandes
 * e, embaixo, os temas atendidos como uma frase corrida em letras grandes.
 */
export function AbordagemPilares({ c, tom }: SecaoProps) {
  const a = c.abordagem;
  if (!a) return null;
  return (
    <Secao id={ANCORAS.abordagem} tom={tom}>
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <Detalhe estilo={c.identidade.estilo} className="mx-auto mb-6 size-12" />
          <p className="font-semibold text-acento">{a.nome}</p>
          <h2 className="titulo t-2 mt-3">{a.titulo}</h2>
          <p className="t-lead mx-auto mt-6 max-w-[58ch] text-texto-suave">{a.texto}</p>
        </div>

        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {a.pilares.slice(0, 3).map((p, i) => (
            <li key={p.titulo} className="relative overflow-hidden rounded-grande bg-cartao p-8 md:p-10">
              {i === 1 && (
                <Forma estilo={c.identidade.estilo} className="absolute -right-12 -bottom-14 w-48 opacity-20" />
              )}
              <span className="relative grid size-14 place-items-center rounded-base bg-acento text-sobre-acento">
                <Icone nome={p.icone} className="size-7" />
              </span>
              <h3 className="titulo t-3 relative mt-10">{p.titulo}</h3>
              <p className="relative mt-3 text-texto-suave">{p.texto}</p>
            </li>
          ))}
        </ul>

        {a.temas.length > 0 && (
          <div className="mt-20 text-center">
            <h3 className="font-semibold text-texto-suave">Para quem é</h3>
            <ul className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-3">
              {a.temas.map((t, i) => (
                <li key={t} className="titulo flex items-center gap-5 text-[clamp(1.35rem,2.6vw,2.1rem)] leading-tight">
                  {i > 0 && <span aria-hidden className="size-2.5 rounded-full bg-acento" />}
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Secao>
  );
}
