import { Icone } from "@/components/ui/Icone";
import { Detalhe } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";

/**
 * Texto da abordagem à esquerda, com os temas atendidos em etiquetas;
 * à direita, os pilares do método em lista com ícones.
 */
export function AbordagemEditorial({ c, tom }: SecaoProps) {
  const a = c.abordagem;
  if (!a) return null;
  return (
    <Secao id={ANCORAS.abordagem} tom={tom}>
      <div className="container-site grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <Detalhe estilo={c.identidade.estilo} className="mb-6 size-11" />
          <p className="font-semibold text-acento">{a.nome}</p>
          <h2 className="titulo t-2 mt-3 max-w-[18ch]">{a.titulo}</h2>
          <p className="t-lead medida mt-7 text-texto-suave">{a.texto}</p>
          {a.temas.length > 0 && (
            <div className="mt-10">
              <h3 className="font-semibold">Atendo pessoas que buscam ajuda com</h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {a.temas.map((t) => (
                  <li key={t} className="rounded-botao border border-linha bg-cartao px-4 py-2 text-[0.95rem]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ul className="flex flex-col self-center border-t border-texto">
          {a.pilares.map((p) => (
            <li key={p.titulo} className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 border-b border-linha py-7">
              <span className="row-span-2 grid size-12 place-items-center rounded-full bg-cartao text-acento">
                <Icone nome={p.icone} className="size-6" />
              </span>
              <h3 className="titulo t-3">{p.titulo}</h3>
              <p className="text-texto-suave">{p.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
