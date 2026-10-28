import { Foto } from "@/components/ui/Foto";
import { Icone } from "@/components/ui/Icone";
import { Forma } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";

/**
 * Foto da profissional com a forma da marca ao fundo e, ao lado, uma frase dela
 * sobre o jeito de trabalhar, em destaque. Os pilares fecham a seção em três colunas.
 */
export function AbordagemCitacao({ c, tom }: SecaoProps) {
  const a = c.abordagem;
  if (!a) return null;
  const foto = a.foto ?? c.galeria.fotos[1] ?? c.fotos.sobre;
  return (
    <Secao id={ANCORAS.abordagem} tom={tom}>
      <div className="container-site">
        <div className="grid items-center gap-14 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-sm">
            <Forma estilo={c.identidade.estilo} className="absolute -bottom-8 -left-10 w-[70%] opacity-90" />
            <div className="relative aspect-[4/5]">
              <Foto foto={foto} recorte={c.identidade.recorte} sizes="(min-width: 768px) 24rem, 88vw" />
            </div>
          </div>

          <div>
            <p className="font-semibold text-acento">{a.nome}</p>
            <h2 className="titulo t-3 mt-2">{a.titulo}</h2>
            {a.citacao && (
              <figure className="mt-8">
                <span aria-hidden className="titulo block h-14 text-[6rem] leading-none text-acento">
                  “
                </span>
                <blockquote className="titulo text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.2]">{a.citacao}</blockquote>
                <figcaption className="mt-5 text-texto-suave">{c.negocio.nome}</figcaption>
              </figure>
            )}
            <p className="medida mt-8 text-texto-suave">{a.texto}</p>
          </div>
        </div>

        {a.pilares.length > 0 && (
          <ul className="mt-20 grid gap-10 border-t border-linha pt-12 md:grid-cols-3">
            {a.pilares.slice(0, 3).map((p) => (
              <li key={p.titulo}>
                <Icone nome={p.icone} className="size-8 text-acento" />
                <h3 className="titulo t-3 mt-5">{p.titulo}</h3>
                <p className="mt-2.5 text-texto-suave">{p.texto}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Secao>
  );
}
