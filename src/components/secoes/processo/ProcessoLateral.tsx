import { Botao } from "@/components/ui/Botao";
import { Detalhe } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";
import type { SecaoProps } from "../tipos";
import { Detalhes } from "./Detalhes";

/**
 * Título, introdução e informações práticas fixos à esquerda enquanto
 * as etapas, com números grandes, descem à direita.
 */
export function ProcessoLateral({ c, tom }: SecaoProps) {
  const p = c.processo;
  if (!p) return null;
  return (
    <Secao id={ANCORAS.processo} tom={tom}>
      <div className="container-site grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Detalhe estilo={c.identidade.estilo} className="mb-6 size-11" />
          <h2 className="titulo t-2 max-w-[14ch]">{p.titulo}</h2>
          <p className="t-lead mt-6 text-texto-suave">{p.intro}</p>
          <Detalhes c={c} vertical className="mt-10 border-t border-linha pt-8" />
          <div className="mt-10">
            <Botao href={linkWhatsapp(c.contato.whatsapp, c.contato.mensagemWhatsapp)} whatsapp>
              Tirar dúvidas no WhatsApp
            </Botao>
          </div>
        </div>

        <ol className="border-t border-texto">
          {p.etapas.map((e, i) => (
            <li key={e.titulo} className="grid grid-cols-[4.5rem_1fr] gap-x-4 border-b border-linha py-9 md:grid-cols-[6rem_1fr]">
              <span className="titulo text-[clamp(2.75rem,5vw,4rem)] leading-none text-acento">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="titulo t-3">{e.titulo}</h3>
                <p className="mt-3 text-texto-suave">{e.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Secao>
  );
}
