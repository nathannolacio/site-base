import Image from "next/image";
import { useId } from "react";
import type { Foto as FotoT, Recorte } from "@/content/tipos";

type Props = {
  foto: FotoT;
  recorte?: Recorte | "nenhum";
  className?: string;
  sizes?: string;
  prioridade?: boolean;
  /** false = espaço reservado sem a etiqueta "Foto: ..." (fotos de fundo com texto por cima) */
  rotulo?: boolean;
};

/**
 * Foto do cliente. Ocupa 100% do contêiner (defina proporção/altura no pai).
 * Sem arquivo em /public, mostra um espaço reservado nas cores da marca,
 * com a descrição da foto que deve entrar ali.
 */
export function Foto({ foto, recorte = "nenhum", className = "", sizes = "100vw", prioridade, rotulo = true }: Props) {
  const classeRecorte = recorte === "nenhum" ? "" : `recorte-${recorte}`;
  return (
    <div className={`@container relative h-full w-full overflow-hidden ${classeRecorte} ${className}`}>
      {foto.src ? (
        <Image src={foto.src} alt={foto.alt} fill sizes={sizes} priority={prioridade} className="object-cover" />
      ) : (
        <EspacoReservado alt={foto.alt} rotulo={rotulo} />
      )}
    </div>
  );
}

function EspacoReservado({ alt, rotulo }: { alt: string; rotulo: boolean }) {
  const id = `grao${useId().replace(/:/g, "")}`;
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 flex items-center justify-center p-4 text-center"
      style={{
        background:
          "radial-gradient(120% 90% at 20% 10%, color-mix(in oklab, var(--cor-destaque) 38%, transparent), transparent 60%)," +
          "radial-gradient(90% 80% at 90% 100%, color-mix(in oklab, var(--cor-marca) 55%, transparent), transparent 70%)," +
          "color-mix(in oklab, var(--cor-marca) 22%, var(--cor-superficie))",
      }}
    >
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.18]" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="var(--cor-tinta)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      {rotulo && (
      <span className="relative hidden max-w-[28ch] rounded-pequeno @min-[9rem]:block bg-[color-mix(in_oklab,var(--cor-fundo)_82%,transparent)] px-2.5 py-1.5 text-xs leading-snug text-tinta backdrop-blur-sm">
        Foto: {alt}
      </span>
      )}
    </div>
  );
}
