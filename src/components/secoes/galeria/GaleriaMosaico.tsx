import { Foto } from "@/components/ui/Foto";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";

/* Desenhos do mosaico (grade de 4 colunas no computador), um para cada quantidade de fotos,
   sempre fechando o retângulo sem buracos. G = grande 2x2, A = alta 1x2, L = larga 2x1, · = normal. */
const DESENHOS: Record<number, string[]> = {
  4: ["G", "·", "·", "L"],
  5: ["G", "·", "·", "·", "·"],
  6: ["G", "A", "·", "·", "L", "L"],
  7: ["G", "·", "·", "·", "·", "L", "L"],
  8: ["G", "·", "·", "·", "·", "·", "·", "L"],
};
const CLASSE: Record<string, string> = {
  G: "md:col-span-2 md:row-span-2",
  A: "md:row-span-2",
  L: "md:col-span-2",
  "·": "",
};

function classes(total: number, i: number) {
  // celular (2 colunas): a 1ª ocupa a largura toda; a última também, se sobrar uma sozinha
  const celular = i === 0 || (i === total - 1 && (total - 1) % 2 === 1) ? "col-span-2" : "";
  const desenho = DESENHOS[total];
  return `${celular} ${desenho ? CLASSE[desenho[i]] : ""}`;
}

/**
 * Fotos de tamanhos diferentes num grid irregular.
 */
export function GaleriaMosaico({ c, tom }: SecaoProps) {
  const fotos = c.galeria.fotos.slice(0, 8);
  const total = fotos.length;
  return (
    <Secao id={ANCORAS.galeria} tom={tom}>
      <div className="container-site">
        <h2 className="titulo t-2 max-w-[18ch]">{c.galeria.titulo}</h2>
        <ul className="mt-12 grid auto-rows-[9.5rem] grid-flow-row-dense grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[14rem]">
          {fotos.map((f, i) => (
            <li key={`${f.alt}-${i}`} className={`overflow-hidden rounded-base ${classes(total, i)}`}>
              <Foto foto={f} sizes="(min-width: 768px) 25vw, 50vw" />
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
