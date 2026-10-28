import { Botao } from "@/components/ui/Botao";
import { Estrelas } from "@/components/ui/Estrelas";
import { Foto } from "@/components/ui/Foto";
import { SeloCircular } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS, linkSecundario, temNotaGoogle } from "@/content/conteudo";
import { linkWhatsapp, nota } from "@/lib/links";
import type { SecaoProps } from "../tipos";

/**
 * Foto ocupando a tela inteira, com véu na cor da marca e texto claro embaixo.
 * Sempre usa tom escuro para o texto ficar legível sobre a foto.
 */
export function HeroImersiva({ c }: SecaoProps) {
  const { negocio, avaliacoes, contato, identidade } = c;
  return (
    <Secao id={ANCORAS.hero} tom="escuro" espaco={false} className="flex min-h-[100svh] items-end">
      <div className="absolute inset-0">
        <Foto foto={c.fotos.hero} prioridade rotulo={false} />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--cor-tinta) 92%, transparent) 0%, color-mix(in oklab, var(--cor-tinta) 55%, transparent) 38%, transparent 72%)," +
              "color-mix(in oklab, var(--cor-marca) 28%, transparent)",
          }}
        />
      </div>

      <div className="container-site relative grid gap-10 pt-40 pb-12 md:pb-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="entrada">
          <h1 className="titulo t-1 max-w-[16ch] text-white">{negocio.frase}</h1>
          <p className="t-lead medida mt-6 text-white/85">{negocio.descricao}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Botao href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} whatsapp grande>
              Chamar no WhatsApp
            </Botao>
            <Botao href={linkSecundario(c).href} estilo="contorno" grande className="text-white! hover:bg-white! hover:text-tinta!">
              {linkSecundario(c).rotulo}
            </Botao>
          </div>
          {negocio.registro && <p className="mt-6 text-[0.95rem] text-white/80">{negocio.registro}</p>}
        </div>

        <div className="flex items-end gap-5 lg:flex-col lg:items-end">
        <SeloCircular
          estilo={identidade.estilo}
          texto={identidade.seloTexto}
          icone={identidade.icone}
          className="order-2 w-24 shrink-0 drop-shadow-xl md:w-32 lg:order-none"
        />
        {temNotaGoogle(c) && (
          <a
            href={`#${ANCORAS.avaliacoes}`}
            className="flex items-center gap-4 self-end rounded-grande border border-white/20 bg-white/10 px-6 py-5 text-white backdrop-blur-md transition hover:bg-white/15 lg:flex-col lg:items-start lg:gap-1"
          >
            <span className="titulo text-5xl">{nota(avaliacoes.nota)}</span>
            <span className="flex flex-col gap-1">
              <Estrelas nota={avaliacoes.nota} />
              <span className="text-sm text-white/80">{avaliacoes.total} avaliações no Google</span>
            </span>
          </a>
        )}
        </div>
      </div>
    </Secao>
  );
}
