import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";

/** Todas as respostas visíveis, em duas colunas. */
export function FaqGrade({ c, tom }: SecaoProps) {
  const f = c.faq;
  if (!f) return null;
  return (
    <Secao id={ANCORAS.faq} tom={tom}>
      <div className="container-site">
        <h2 className="titulo t-2 max-w-[16ch]">{f.titulo}</h2>
        <dl className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {f.itens.map((i) => (
            <div key={i.pergunta} className="border-t border-texto pt-6">
              <dt className="titulo t-3">{i.pergunta}</dt>
              <dd className="mt-3 text-texto-suave">{i.resposta}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Secao>
  );
}
