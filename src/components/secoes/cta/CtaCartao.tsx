import { Detalhe, Forma, SeloCircular } from "@/components/ui/Ornamentos";
import { Botao } from "@/components/ui/Botao";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";
import type { SecaoProps } from "../tipos";

/**
 * Um cartão na cor da marca, com os elementos de assinatura saindo pelas bordas.
 */
export function CtaCartao({ c, tom }: SecaoProps) {
  const { cta, contato, identidade } = c;
  return (
    <Secao id={ANCORAS.cta} tom={tom}>
      <div className="container-site">
        <div data-tom="marca" className="relative overflow-hidden rounded-grande px-6 pt-28 pb-16 text-center sm:px-12 md:py-24">
          <Forma estilo={identidade.estilo} cor="var(--cor-marca-contraste)" className="absolute -right-16 -bottom-20 w-64 opacity-15 md:w-96" />
          <Detalhe estilo={identidade.estilo} className="absolute top-8 left-8 size-12 md:size-16" />
          <SeloCircular
            estilo={identidade.estilo}
            texto={identidade.seloTexto}
            icone={identidade.icone}
            className="absolute top-6 right-6 hidden w-28 md:block lg:w-32"
          />
          <div className="relative">
            <h2 className="titulo t-1 mx-auto max-w-[18ch]">{cta.titulo}</h2>
            <p className="t-lead mx-auto mt-5 max-w-[46ch] text-texto-suave">{cta.texto}</p>
            <div className="mt-10">
              <Botao href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} whatsapp grande>
                {cta.botao}
              </Botao>
            </div>
          </div>
        </div>
      </div>
    </Secao>
  );
}
