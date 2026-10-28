import { Botao } from "@/components/ui/Botao";
import { Forma } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";
import type { SecaoProps } from "../tipos";
import { Pergunta } from "./Pergunta";

/** Título e convite para o WhatsApp fixos à esquerda; perguntas que abrem e fecham à direita. */
export function FaqLateral({ c, tom }: SecaoProps) {
  const f = c.faq;
  if (!f) return null;
  return (
    <Secao id={ANCORAS.faq} tom={tom}>
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Forma estilo={c.identidade.estilo} className="mb-8 w-24" />
          <h2 className="titulo t-2 max-w-[12ch]">{f.titulo}</h2>
          <p className="mt-5 text-texto-suave">Não encontrou sua dúvida? Pergunte direto pelo WhatsApp.</p>
          <div className="mt-8">
            <Botao href={linkWhatsapp(c.contato.whatsapp, c.contato.mensagemWhatsapp)} whatsapp estilo="contorno">
              Perguntar no WhatsApp
            </Botao>
          </div>
        </div>
        <div className="border-t border-texto">
          {f.itens.map((i) => (
            <Pergunta key={i.pergunta} pergunta={i.pergunta} resposta={i.resposta} />
          ))}
        </div>
      </div>
    </Secao>
  );
}
