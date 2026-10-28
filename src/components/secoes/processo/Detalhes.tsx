import { Icone } from "@/components/ui/Icone";
import type { Cliente } from "@/content/conteudo";

/** Informações práticas do atendimento (duração, frequência, formato...). */
export function Detalhes({ c, className = "", vertical }: { c: Cliente; className?: string; vertical?: boolean }) {
  const detalhes = c.processo?.detalhes ?? [];
  if (!detalhes.length) return null;
  return (
    <dl className={`grid gap-6 ${vertical ? "" : "sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]"} ${className}`}>
      {detalhes.map((d) => (
        <div key={d.rotulo} className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cartao text-acento">
            <Icone nome={d.icone} className="size-5" />
          </span>
          <div>
            <dt className="text-sm text-texto-suave">{d.rotulo}</dt>
            <dd className="font-semibold">{d.valor}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
