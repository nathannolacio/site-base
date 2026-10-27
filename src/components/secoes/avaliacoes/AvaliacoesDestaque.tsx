import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";
import { Alternador } from "./Alternador";
import { ResumoNota } from "./Cabecalho";

/**
 * Uma avaliação grande por vez, como citação, com setas para passar.
 */
export function AvaliacoesDestaque({ c, tom }: SecaoProps) {
  const { avaliacoes } = c;
  return (
    <Secao id={ANCORAS.avaliacoes} tom={tom}>
      <div className="container-site grid gap-12 lg:grid-cols-[0.75fr_2fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <h2 className="titulo t-3 max-w-[14ch]">{avaliacoes.titulo}</h2>
          <ResumoNota c={c} />
        </div>
        <Alternador itens={avaliacoes.itens} />
      </div>
    </Secao>
  );
}
