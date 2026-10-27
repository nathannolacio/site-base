import { Botao } from "@/components/ui/Botao";
import { Foto } from "@/components/ui/Foto";
import { Chip, Detalhe, Forma, SeloCircular } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { Foto as FotoT } from "@/content/tipos";
import { linkWhatsapp, nota } from "@/lib/links";
import { espacoNavbar, type SecaoProps } from "../tipos";

/* Alturas da vitrine: a foto do meio é a maior e as das pontas descem, como uma fileira de vitrines. */
const ALTURAS = ["lg:h-[20rem]", "lg:h-[25rem]", "lg:h-[30rem]", "lg:h-[25rem]", "lg:h-[20rem]"];

/**
 * Título centralizado e, embaixo, uma fileira de fotos em alturas diferentes
 * (a do meio com o recorte da marca), com o selo girando e etiquetas soltas.
 * No celular, a fileira vira uma faixa que desliza para o lado.
 */
export function HeroVitrine({ c, tom }: SecaoProps) {
  const { negocio, identidade, avaliacoes, contato } = c;
  const extras = c.galeria.fotos.slice(0, 4);
  // a foto principal fica no meio da fileira
  const fotos: FotoT[] = [extras[0], extras[1], c.fotos.hero, extras[2], extras[3]].filter(Boolean) as FotoT[];
  const meio = fotos.indexOf(c.fotos.hero);

  return (
    <Secao id={ANCORAS.hero} tom={tom} espaco={false} className={`${espacoNavbar(c)} pb-16 md:pb-24`}>
      <Forma estilo={identidade.estilo} className="absolute top-24 -left-24 hidden w-96 opacity-25 md:block" />
      <Forma estilo={identidade.estilo} className="absolute -right-24 bottom-24 hidden w-80 rotate-180 opacity-25 md:block" />

      <div className="container-site relative text-center">
        <div className="entrada mx-auto flex max-w-4xl flex-col items-center">
          <Detalhe estilo={identidade.estilo} className="mb-6 size-12" />
          <h1 className="titulo t-1">{negocio.frase}</h1>
          <p className="t-lead mt-6 max-w-[54ch] text-texto-suave">{negocio.descricao}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Botao href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} whatsapp grande>
              Chamar no WhatsApp
            </Botao>
            <Botao href={`#${ANCORAS.servicos}`} estilo="texto">
              Ver o que fazemos
            </Botao>
          </div>
        </div>
      </div>

      <div className="relative mt-2 md:mt-6">
        <ul className="sem-barra flex snap-x snap-mandatory items-end gap-3 overflow-x-auto pt-14 px-[max(clamp(1rem,4vw,2.5rem),calc((100vw_-_78rem)/2_+_2.5rem))] pb-6 md:gap-4 lg:overflow-visible">
          {fotos.map((f, i) => (
            <li
              key={`${f.alt}-${i}`}
              className={`relative w-[62vw] shrink-0 snap-center sm:w-[38vw] lg:w-auto lg:flex-1 ${i === meio ? "order-first h-[26rem] lg:order-none" : "h-[20rem]"} ${ALTURAS[i] ?? ""}`}
            >
              <div className="relative size-full">
                <Foto
                  foto={f}
                  recorte={i === meio ? identidade.recorte : "reto"}
                  prioridade={i === meio}
                  sizes="(min-width: 1024px) 20vw, 62vw"
                />
              </div>
              {i === meio && (
                <SeloCircular
                  estilo={identidade.estilo}
                  texto={identidade.seloTexto}
                  icone={identidade.icone}
                  className="absolute -top-14 -right-2 z-10 w-28 drop-shadow-xl md:w-36 lg:-right-10"
                />
              )}
              {i === meio - 1 && avaliacoes.itens.length > 0 && (
                <div className="absolute bottom-5 left-1/2 z-10 w-max max-w-[92%] -translate-x-1/2 lg:left-4 lg:translate-x-0">
                  <Chip
                    estilo={identidade.estilo}
                    icone="Star"
                    titulo={`${nota(avaliacoes.nota)} no Google`}
                    texto={`${avaliacoes.total} avaliações`}
                  />
                </div>
              )}
              {i === meio + 1 && negocio.selo && (
                <div className="absolute top-5 left-1/2 z-10 w-max max-w-[90%] -translate-x-1/2 lg:right-4 lg:left-auto lg:translate-x-0">
                  <Chip estilo={identidade.estilo} icone={identidade.icone} titulo={negocio.selo} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
