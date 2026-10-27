import type { ReactNode } from "react";
import type { Tom } from "@/content/tipos";

type Props = {
  id?: string;
  tom: Tom;
  children: ReactNode;
  className?: string;
  /** false = sem padding vertical padrão (seções de tela cheia) */
  espaco?: boolean;
  rotulo?: string;
};

export function Secao({ id, tom, children, className = "", espaco = true, rotulo }: Props) {
  return (
    <section
      id={id}
      data-tom={tom}
      aria-label={rotulo}
      className={`relative overflow-clip ${espaco ? "secao" : ""} ${className}`}
    >
      {children}
    </section>
  );
}
