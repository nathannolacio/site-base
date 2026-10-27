import { Botao } from "@/components/ui/Botao";
import { Estrelas } from "@/components/ui/Estrelas";
import { Foto } from "@/components/ui/Foto";
import { Chip, Detalhe, Forma, SeloCircular } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp, nota } from "@/lib/links";
import { espacoNavbar, type SecaoProps } from "../tipos";

/**
 * Texto à esquerda; à direita, uma composição com a foto principal recortada,
 * uma segunda foto sobreposta, a forma da marca ao fundo, o selo girando e uma etiqueta.
 */
export function HeroDividida({ c, tom }: SecaoProps) {
  const { negocio, identidade, avaliacoes, contato } = c;
  const segunda = c.galeria.fotos[0];
  return (
    <Secao id={ANCORAS.hero} tom={tom} espaco={false} className={`${espacoNavbar(c)} pb-20 md:pb-28`}>
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
        <div className="entrada relative">
          <Detalhe estilo={identidade.estilo} className="mb-6 size-12" />
          <h1 className="titulo t-1">{negocio.frase}</h1>
          <p className="t-lead medida mt-6 text-texto-suave">{negocio.descricao}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Botao href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} whatsapp grande>
              Chamar no WhatsApp
            </Botao>
            <Botao href={`#${ANCORAS.servicos}`} estilo="texto">
              Ver o que fazemos
            </Botao>
          </div>
          {avaliacoes.itens.length > 0 && (
            <a
              href={`#${ANCORAS.avaliacoes}`}
              className="mt-12 flex w-fit items-center gap-4 border-t border-linha pt-6 text-[0.95rem] text-texto-suave hover:text-texto"
            >
              <span className="titulo text-4xl text-texto">{nota(avaliacoes.nota)}</span>
              <span className="flex flex-col gap-1">
                <Estrelas nota={avaliacoes.nota} />
                <span>{avaliacoes.total} avaliações no Google</span>
              </span>
            </a>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-[33rem] pb-10 sm:pb-0 lg:mr-0">
          <Forma estilo={identidade.estilo} className="absolute -bottom-10 -left-12 w-[62%] opacity-95 sm:-left-20" />
          <div className="relative ml-auto aspect-[4/5] w-[86%]">
            <Foto foto={c.fotos.hero} recorte={identidade.recorte} prioridade sizes="(min-width: 1024px) 28rem, 80vw" />
          </div>
          {segunda && (
            <div className="absolute bottom-0 left-0 aspect-square w-[38%] overflow-hidden rounded-grande border-[6px] border-fundo shadow-marca sm:-bottom-8">
              <Foto foto={segunda} sizes="13rem" />
            </div>
          )}
          <SeloCircular
            estilo={identidade.estilo}
            texto={identidade.seloTexto}
            icone={identidade.icone}
            className="absolute -top-10 right-[-0.5rem] w-28 drop-shadow-xl sm:w-36 lg:-right-8 lg:w-40"
          />
          {negocio.selo && (
            <Chip
              estilo={identidade.estilo}
              icone={identidade.icone}
              titulo={negocio.selo}
              className="absolute top-[46%] -left-2 sm:-left-10"
            />
          )}
        </div>
      </div>
    </Secao>
  );
}
