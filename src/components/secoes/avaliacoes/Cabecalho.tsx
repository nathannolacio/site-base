import { Estrelas } from "@/components/ui/Estrelas";
import type { Cliente } from "@/content/conteudo";
import { nota } from "@/lib/links";

/** Linha com nota média, estrelas e link para o Google. */
export function ResumoNota({ c }: { c: Cliente }) {
  const { avaliacoes } = c;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="titulo text-4xl">{nota(avaliacoes.nota)}</span>
      <span className="flex flex-col">
        <Estrelas nota={avaliacoes.nota} />
        <span className="text-sm text-texto-suave">
          {avaliacoes.total} avaliações no{" "}
          {avaliacoes.fonteUrl ? (
            <a href={avaliacoes.fonteUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-texto">
              Google
            </a>
          ) : (
            "Google"
          )}
        </span>
      </span>
    </div>
  );
}
