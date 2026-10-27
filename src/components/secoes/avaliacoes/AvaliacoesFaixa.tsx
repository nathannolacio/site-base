import { Estrelas } from "@/components/ui/Estrelas";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { nota } from "@/lib/links";
import type { SecaoProps } from "../tipos";

/**
 * Avaliações 3 — Faixa rolando + nota em destaque
 * A nota média enorme abre a seção; os comentários passam numa faixa contínua embaixo.
 * Boa quando a nota é alta e há muitas avaliações (prova social forte).
 */
export function AvaliacoesFaixa({ c, tom }: SecaoProps) {
  const { avaliacoes } = c;
  const repetidas = [...avaliacoes.itens, ...avaliacoes.itens];

  return (
    <Secao id={ANCORAS.avaliacoes} tom={tom}>
      <div className="container-site grid items-end gap-8 md:grid-cols-[auto_1fr] md:gap-14">
        <p className="titulo text-[clamp(6rem,17vw,13rem)] leading-[0.8] text-acento" aria-label={`Nota ${nota(avaliacoes.nota)} de 5`}>
          {nota(avaliacoes.nota)}
        </p>
        <div className="pb-2">
          <Estrelas nota={avaliacoes.nota} className="size-6" />
          <h2 className="titulo t-2 mt-4 max-w-[18ch]">{avaliacoes.titulo}</h2>
          <p className="mt-3 text-texto-suave">
            Média de {avaliacoes.total} avaliações no Google.
            {avaliacoes.fonteUrl && (
              <>
                {" "}
                <a href={avaliacoes.fonteUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-texto">
                  Ver todas
                </a>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="mt-16 overflow-hidden md:mt-20">
        <ul className="faixa-continua flex w-max items-start" style={{ ["--duracao" as string]: `${avaliacoes.itens.length * 11}s` }}>
          {repetidas.map((a, i) => (
            <li key={i} aria-hidden={i >= avaliacoes.itens.length} className="mr-5 w-[min(82vw,24rem)] shrink-0 rounded-grande bg-cartao p-7">
              <Estrelas nota={a.nota} />
              <blockquote className="mt-4 leading-relaxed">{a.texto}</blockquote>
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
