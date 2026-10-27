import { Botao } from "@/components/ui/Botao";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";
import type { SecaoProps } from "../tipos";

/**
 * CTA 1 — Faixa larga
 * Faixa de ponta a ponta com título grande e o botão do WhatsApp. Direta e objetiva.
 * Use com tom "marca" (padrão) ou "escuro".
 */
export function CtaFaixa({ c, tom }: SecaoProps) {
  const { cta, contato } = c;
  return (
    <Secao id={ANCORAS.cta} tom={tom} espaco={false} className="py-16 md:py-24">
      <div className="container-site flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="titulo t-1 max-w-[18ch]">{cta.titulo}</h2>
          <p className="t-lead mt-5 text-texto-suave">{cta.texto}</p>
        </div>
        <Botao href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} whatsapp grande className="shrink-0">
          {cta.botao}
        </Botao>
      </div>
    </Secao>
  );
}
