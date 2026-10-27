import Image from "next/image";
import { Foto } from "@/components/ui/Foto";
import { IconeInstagram } from "@/components/ui/IconesRedes";
import { Secao } from "@/components/ui/Secao";
import { Botao } from "@/components/ui/Botao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";

/**
 * Galeria 3 — Feed do Instagram
 * Grade quadrada como o perfil do Instagram, com o @ e botão para seguir.
 * Boa para negócios que vivem do Instagram (moda, beleza, confeitaria, tatuagem).
 * As fotos são as da galeria (não é integração ao vivo com o Instagram).
 */
export function GaleriaFeed({ c, tom }: SecaoProps) {
  const ig = c.redes.instagram;
  const fotos = c.galeria.fotos.slice(0, c.galeria.fotos.length >= 9 ? 9 : 6);
  const href = ig?.url || "#";

  return (
    <Secao id={ANCORAS.galeria} tom={tom}>
      <div className="container-site max-w-5xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <span className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-acento p-[3px] md:size-24">
              <span className="grid size-full place-items-center overflow-hidden rounded-full border-[3px] border-fundo bg-cartao">
                {c.identidade.logo ? (
                  <Image src={c.identidade.logo} alt="" width={96} height={96} className="size-full object-contain p-2" />
                ) : (
                  <span className="titulo text-3xl text-acento">{c.negocio.nome.charAt(0)}</span>
                )}
              </span>
            </span>
            <div>
              <h2 className="titulo t-3">{c.galeria.titulo}</h2>
              {ig && <p className="mt-1 text-texto-suave">@{ig.usuario}</p>}
            </div>
          </div>
          {ig && (
            <Botao href={href} estilo="secundario">
              <IconeInstagram className="size-5" /> Seguir no Instagram
            </Botao>
          )}
        </div>

        <ul className="mt-10 grid grid-cols-3 gap-1 md:gap-2">
          {fotos.map((f, i) => (
            <li key={`${f.alt}-${i}`} className="group relative aspect-square overflow-hidden">
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${f.alt} (abre o Instagram)`} className="block size-full">
                <Foto foto={f} sizes="(min-width: 1024px) 20rem, 33vw" />
                <span className="absolute inset-0 grid place-items-center bg-tinta/0 text-white opacity-0 transition group-hover:bg-tinta/40 group-hover:opacity-100">
                  <IconeInstagram className="size-8" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
