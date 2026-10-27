import { Estrelas } from "@/components/ui/Estrelas";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";
import { ResumoNota } from "./Cabecalho";

/**
 * Avaliações 1 — Grade
 * Cards em colunas de alturas livres (como um mural), com estrelas, texto e nome.
 * Boa com 4 a 9 avaliações de tamanhos variados.
 */
export function AvaliacoesGrade({ c, tom }: SecaoProps) {
  const { avaliacoes } = c;
  return (
    <Secao id={ANCORAS.avaliacoes} tom={tom}>
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="titulo t-2 max-w-[16ch]">{avaliacoes.titulo}</h2>
          <ResumoNota c={c} />
        </div>

        <ul className="mt-14 gap-4 sm:columns-2 lg:columns-3">
          {avaliacoes.itens.map((a) => (
            <li key={a.nome + a.texto.slice(0, 12)} className="mb-4 break-inside-avoid rounded-grande bg-cartao p-7">
              <Estrelas nota={a.nota} />
              <blockquote className="mt-4 text-[1.0625rem] leading-relaxed">{a.texto}</blockquote>
              <p className="mt-5 text-sm text-texto-suave">
                <strong className="font-semibold text-texto">{a.nome}</strong>
                {a.quando && <>, {a.quando}</>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
