import { Foto } from "@/components/ui/Foto";
import { Icone } from "@/components/ui/Icone";
import { Chip, Detalhe, Forma } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";

/**
 * Colagem com duas fotos (a principal com o recorte da marca) e a forma ao fundo,
 * ao lado da história e dos pilares do negócio.
 */
export function SobreFoto({ c, tom }: SecaoProps) {
  const { sobre, identidade } = c;
  const segunda = c.galeria.fotos[1];
  const numero = sobre.numeros[0];
  return (
    <Secao id={ANCORAS.sobre} tom={tom}>
      <div className="container-site grid items-center gap-16 md:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        <div className="relative mx-auto w-full max-w-md pb-12 sm:pb-16">
          <Forma estilo={identidade.estilo} cor="var(--cor-destaque)" className="absolute -top-10 -right-10 w-[55%] opacity-90" />
          <div className="relative aspect-[4/5] w-[82%]">
            <Foto foto={c.fotos.sobre} recorte={identidade.recorte} sizes="(min-width: 768px) 23rem, 76vw" />
          </div>
          {segunda && (
            <div className="absolute right-0 bottom-0 aspect-[4/5] w-[44%] overflow-hidden rounded-base border-[6px] border-fundo shadow-marca">
              <Foto foto={segunda} sizes="12rem" />
            </div>
          )}
          {numero && (
            <Chip estilo={identidade.estilo} titulo={numero.valor} texto={numero.rotulo} className="absolute top-8 -left-3 sm:-left-8" />
          )}
        </div>

        <div>
          <Detalhe estilo={identidade.estilo} className="mb-6 size-11" />
          <h2 className="titulo t-2 max-w-[18ch]">{sobre.titulo}</h2>
          <p className="t-lead medida mt-7 text-texto-suave">{sobre.texto}</p>
          {sobre.pilares.length > 0 && (
            <ul className="mt-10 grid gap-5 border-t border-linha pt-8 sm:grid-cols-3">
              {sobre.pilares.map((p) => (
                <li key={p.titulo} className="flex flex-col gap-3">
                  <Icone nome={p.icone} className="size-7 text-acento" />
                  <span className="font-semibold leading-snug">{p.titulo}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Secao>
  );
}
