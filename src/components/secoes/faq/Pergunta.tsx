import { Plus } from "lucide-react";

/** Pergunta que abre e fecha (details/summary nativo: funciona sem JavaScript e com teclado). */
export function Pergunta({ pergunta, resposta, aberta }: { pergunta: string; resposta: string; aberta?: boolean }) {
  return (
    <details className="group border-b border-linha" open={aberta}>
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
        <span className="titulo text-[clamp(1.125rem,1.8vw,1.375rem)] leading-snug">{pergunta}</span>
        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-linha transition-transform duration-300 group-open:rotate-45">
          <Plus className="size-4" aria-hidden />
        </span>
      </summary>
      <p className="medida pb-7 text-texto-suave">{resposta}</p>
    </details>
  );
}
