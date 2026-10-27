import { Assinatura } from "@/components/ui/Assinatura";
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
        <div data-tom="marca" className="relative overflow-hidden rounded-grande px-6 pt-24 pb-16 text-center sm:px-12 md:py-24">
          <Assinatura tipo={identidade.assinatura} className="absolute -top-8 -left-8 w-28 opacity-90 md:-top-10 md:-left-10 md:w-56" />
          <Assinatura
            tipo={identidade.assinatura === "pontos" ? "arcos" : "pontos"}
            cor="var(--cor-marca-contraste)"
            className="absolute -right-8 -bottom-8 w-36 opacity-20 md:w-48"
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
