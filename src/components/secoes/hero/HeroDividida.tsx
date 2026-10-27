import { Assinatura } from "@/components/ui/Assinatura";
import { Botao } from "@/components/ui/Botao";
import { Estrelas } from "@/components/ui/Estrelas";
import { Foto } from "@/components/ui/Foto";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp, nota } from "@/lib/links";
import { espacoNavbar, type SecaoProps } from "../tipos";

/**
 * Texto à esquerda; foto grande recortada à direita, com o elemento de assinatura atrás.
 */
export function HeroDividida({ c, tom }: SecaoProps) {
  const { negocio, identidade, avaliacoes, contato } = c;
  return (
    <Secao id={ANCORAS.hero} tom={tom} espaco={false} className={`${espacoNavbar(c)} pb-16 md:pb-24`}>
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
        <div className="entrada">
          <h1 className="titulo t-1">{negocio.frase}</h1>
          <p className="t-lead medida mt-6 text-texto-suave">{negocio.descricao}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Botao href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} whatsapp grande>
              Chamar no WhatsApp
            </Botao>
            <Botao href={`#${ANCORAS.servicos}`} estilo="texto">
              Ver {c.servicos.itens.length > 1 ? "o que fazemos" : "serviço"}
            </Botao>
          </div>
          {avaliacoes.itens.length > 0 && (
            <a href={`#${ANCORAS.avaliacoes}`} className="mt-10 inline-flex items-center gap-3 text-[0.95rem] text-texto-suave hover:text-texto">
              <Estrelas nota={avaliacoes.nota} />
              <span>
                <strong className="font-semibold text-texto">{nota(avaliacoes.nota)}</strong> no Google, com {avaliacoes.total} avaliações
              </span>
            </a>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-[34rem]">
          <Assinatura tipo={identidade.assinatura} className="absolute -top-8 -right-6 w-[46%] opacity-90 sm:-right-10" />
          <div className="relative aspect-[4/5]">
            <Foto foto={c.fotos.hero} recorte={identidade.recorte} prioridade sizes="(min-width: 1024px) 34rem, 92vw" />
          </div>
          {negocio.selo && (
            <p className="absolute -bottom-5 left-4 max-w-[17rem] rounded-base bg-destaque px-5 py-3.5 text-[0.95rem] leading-snug font-semibold text-sobre-destaque shadow-marca sm:-left-8">
              {negocio.selo}
            </p>
          )}
        </div>
      </div>
    </Secao>
  );
}
