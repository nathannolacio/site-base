import { Assinatura } from "@/components/ui/Assinatura";
import { Foto } from "@/components/ui/Foto";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";

/**
 * Foto com o recorte da marca ao lado do texto da história.
 */
export function SobreFoto({ c, tom }: SecaoProps) {
  const { sobre, identidade } = c;
  return (
    <Secao id={ANCORAS.sobre} tom={tom}>
      <div className="container-site grid items-center gap-14 md:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="relative mx-auto w-full max-w-md md:order-none">
          <div className="relative aspect-[4/5]">
            <Foto foto={c.fotos.sobre} recorte={identidade.recorte} sizes="(min-width: 768px) 28rem, 92vw" />
          </div>
          <Assinatura tipo={identidade.assinatura} cor="var(--cor-destaque)" className="absolute -bottom-8 -left-8 w-32 md:w-40" />
        </div>
        <div>
          <h2 className="titulo t-2 max-w-[18ch]">{sobre.titulo}</h2>
          <p className="t-lead medida mt-7 text-texto-suave">{sobre.texto}</p>
          {sobre.pilares.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {sobre.pilares.map((p) => (
                <li key={p.titulo} className="rounded-botao border border-linha px-4 py-2 text-[0.95rem] font-medium">
                  {p.titulo}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Secao>
  );
}
