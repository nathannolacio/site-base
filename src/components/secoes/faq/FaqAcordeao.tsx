import { Detalhe } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";
import { Pergunta } from "./Pergunta";

/** Título centralizado e perguntas que abrem e fecham numa coluna estreita. */
export function FaqAcordeao({ c, tom }: SecaoProps) {
  const f = c.faq;
  if (!f) return null;
  return (
    <Secao id={ANCORAS.faq} tom={tom}>
      <div className="container-site max-w-3xl">
        <div className="text-center">
          <Detalhe estilo={c.identidade.estilo} className="mx-auto mb-6 size-11" />
          <h2 className="titulo t-2">{f.titulo}</h2>
        </div>
        <div className="mt-12 border-t border-texto">
          {f.itens.map((i, n) => (
            <Pergunta key={i.pergunta} pergunta={i.pergunta} resposta={i.resposta} aberta={n === 0} />
          ))}
        </div>
      </div>
    </Secao>
  );
}
