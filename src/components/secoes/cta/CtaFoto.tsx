import { Botao } from "@/components/ui/Botao";
import { Foto } from "@/components/ui/Foto";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";
import type { SecaoProps } from "../tipos";

/**
 * Foto do cliente com véu escuro e o convite centralizado por cima.
 * Sempre usa tom escuro.
 */
export function CtaFoto({ c }: SecaoProps) {
  const { cta, contato } = c;
  return (
    <Secao id={ANCORAS.cta} tom="escuro" espaco={false} className="grid min-h-[34rem] place-items-center py-24 md:min-h-[40rem]">
      <div className="absolute inset-0">
        <Foto foto={c.fotos.cta} rotulo={false} />
        <div aria-hidden className="absolute inset-0 bg-[color-mix(in_oklab,var(--cor-tinta)_62%,transparent)]" />
      </div>
      <div className="container-site relative text-center">
        <h2 className="titulo t-1 mx-auto max-w-[18ch] text-white">{cta.titulo}</h2>
        <p className="t-lead mx-auto mt-5 max-w-[48ch] text-white/85">{cta.texto}</p>
        <div className="mt-10">
          <Botao href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} whatsapp grande>
            {cta.botao}
          </Botao>
        </div>
      </div>
    </Secao>
  );
}
