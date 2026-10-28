"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Item = { nome: string; nota?: number; texto: string; quando?: string };

/** Uma avaliação por vez, com setas. Sem troca automática (quem lê controla). */
export function Alternador({ itens }: { itens: Item[] }) {
  const [i, setI] = useState(0);
  const atual = itens[i];
  const ir = (d: number) => setI((v) => (v + d + itens.length) % itens.length);
  if (!atual) return null;

  return (
    <div>
      <figure aria-live="polite" className="min-h-[16rem] md:min-h-[18rem]">
        <span aria-hidden className="titulo block h-16 text-[7rem] leading-none text-acento md:h-20 md:text-[9rem]">
          “
        </span>
        <blockquote key={i} className="titulo animate-[surgir_0.5s_ease_both] text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.18]">
          {atual.texto}
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-3 text-texto-suave">
          {atual.nota ? (
            <span className="text-destaque" aria-label={`${atual.nota} de 5 estrelas`}>
              {"★".repeat(Math.round(atual.nota))}
            </span>
          ) : null}
          <span>
            <strong className="font-semibold text-texto">{atual.nome}</strong>
            {atual.quando && <>, {atual.quando}</>}
          </span>
        </figcaption>
      </figure>

      {itens.length > 1 && (
        <div className="mt-10 flex items-center gap-4">
          <button type="button" onClick={() => ir(-1)} aria-label="Avaliação anterior" className="grid size-12 place-items-center rounded-botao border border-linha transition hover:bg-texto hover:text-fundo">
            <ArrowLeft className="size-5" />
          </button>
          <button type="button" onClick={() => ir(1)} aria-label="Próxima avaliação" className="grid size-12 place-items-center rounded-botao border border-linha transition hover:bg-texto hover:text-fundo">
            <ArrowRight className="size-5" />
          </button>
          <span className="ml-2 text-sm text-texto-suave tabular-nums">
            {i + 1} de {itens.length}
          </span>
        </div>
      )}
    </div>
  );
}
