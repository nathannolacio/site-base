import { Foto } from "@/components/ui/Foto";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { Foto as FotoT } from "@/content/tipos";
import type { SecaoProps } from "../tipos";

const LARGURAS = ["w-56 md:w-72", "w-72 md:w-[26rem]", "w-48 md:w-64", "w-64 md:w-80"];

/**
 * Galeria 2 — Faixa contínua
 * Duas faixas de fotos deslizando sozinhas em sentidos opostos (para ao passar o mouse,
 * e fica parada para quem prefere menos movimento). Dá vida à página sem ocupar espaço.
 */
export function GaleriaFaixa({ c, tom }: SecaoProps) {
  const fotos = c.galeria.fotos;
  const metade = Math.ceil(fotos.length / 2);
  const linhas = fotos.length >= 6 ? [fotos.slice(0, metade), fotos.slice(metade)] : [fotos];

  return (
    <Secao id={ANCORAS.galeria} tom={tom}>
      <div className="container-site">
        <h2 className="titulo t-2 max-w-[18ch]">{c.galeria.titulo}</h2>
      </div>
      <div className="mt-12 flex flex-col gap-4" aria-label={c.galeria.titulo} role="group">
        {linhas.map((linha, l) => (
          <Linha key={l} fotos={linha} reverso={l === 1} />
        ))}
      </div>
    </Secao>
  );
}

function Linha({ fotos, reverso }: { fotos: FotoT[]; reverso: boolean }) {
  // a lista é repetida para a animação emendar sem corte; a cópia fica escondida de leitores de tela
  const repetidas = [...fotos, ...fotos, ...fotos, ...fotos];
  return (
    <div className="overflow-hidden">
      <ul
        className="faixa-continua flex w-max"
        style={{ animationDirection: reverso ? "reverse" : "normal", ["--duracao" as string]: `${fotos.length * 9}s` }}
      >
        {repetidas.map((f, i) => (
          <li
            key={i}
            aria-hidden={i >= fotos.length}
            className={`mr-4 h-56 shrink-0 overflow-hidden rounded-base md:h-72 ${LARGURAS[((i % fotos.length) + (reverso ? 2 : 0)) % LARGURAS.length]}`}
          >
            <Foto foto={f} sizes="26rem" />
          </li>
        ))}
      </ul>
    </div>
  );
}
