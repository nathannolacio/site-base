"use client";
import { useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** Trilho com rolagem horizontal (arrastar no celular) e setas no computador. */
export function Trilho({ children, rotulo }: { children: ReactNode; rotulo: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const mover = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const item = el.querySelector("li");
    const passo = item ? item.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * passo, behavior: "smooth" });
  };

  return (
    <div>
      <div className="container-site flex justify-end gap-2">
        <BotaoSeta onClick={() => mover(-1)} rotulo="Anterior">
          <ArrowLeft className="size-5" />
        </BotaoSeta>
        <BotaoSeta onClick={() => mover(1)} rotulo="Próximo">
          <ArrowRight className="size-5" />
        </BotaoSeta>
      </div>
      <ul
        ref={ref}
        aria-label={rotulo}
        className="sem-barra mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-[max(clamp(1rem,4vw,2.5rem),calc((100vw_-_78rem)/2_+_2.5rem))] px-[max(clamp(1rem,4vw,2.5rem),calc((100vw_-_78rem)/2_+_2.5rem))] pb-2"
      >
        {children}
      </ul>
    </div>
  );
}

function BotaoSeta({ onClick, rotulo, children }: { onClick: () => void; rotulo: string; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={rotulo}
      className="grid size-12 place-items-center rounded-botao border border-linha transition hover:bg-texto hover:text-fundo"
    >
      {children}
    </button>
  );
}
