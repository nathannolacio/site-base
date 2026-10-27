import type { ReactNode } from "react";
import { IconeWhatsapp } from "./IconesRedes";

type Estilo = "primario" | "secundario" | "contorno" | "texto";

const estilos: Record<Estilo, string> = {
  primario: "bg-acento text-sobre-acento hover:brightness-110",
  secundario: "bg-texto text-fundo hover:opacity-90",
  contorno: "border-[1.5px] border-current text-texto hover:bg-texto hover:text-fundo",
  texto: "text-texto underline decoration-acento decoration-2 underline-offset-[6px] hover:decoration-[3px] px-0!",
};

type Props = {
  href: string;
  children: ReactNode;
  estilo?: Estilo;
  whatsapp?: boolean;
  externo?: boolean;
  className?: string;
  grande?: boolean;
};

export function Botao({ href, children, estilo = "primario", whatsapp, externo, className = "", grande }: Props) {
  const fora = externo ?? /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(fora ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2.5 rounded-botao font-semibold transition-[filter,opacity,background-color,color,text-decoration-thickness] duration-200 ${
        grande ? "px-7 py-4 text-lg" : "px-6 py-3.5 text-base"
      } ${estilos[estilo]} ${className}`}
    >
      {whatsapp && <IconeWhatsapp className="size-5 shrink-0" />}
      {children}
    </a>
  );
}
