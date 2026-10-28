import { Check } from "lucide-react";
import type { Cliente } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";

export type Pacote = NonNullable<Cliente["pacotes"]>["itens"][number];

export function linkPacote(c: Cliente, p: Pacote) {
  return linkWhatsapp(c.contato.whatsapp, `Olá! Queria saber mais sobre ${p.nome.toLowerCase()}.`);
}

export function ListaInclui({ itens, className = "" }: { itens: string[]; className?: string }) {
  if (!itens.length) return null;
  return (
    <ul className={`flex flex-col gap-2.5 ${className}`}>
      {itens.map((i) => (
        <li key={i} className="flex gap-3">
          <Check className="mt-1 size-4 shrink-0 text-acento" strokeWidth={2.5} aria-hidden />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

/** Preço em destaque; sem preço, mostra que o valor é combinado no contato. */
export function Preco({ p, grande }: { p: Pacote; grande?: boolean }) {
  if (!p.preco) return <p className="text-texto-suave">Valor combinado no primeiro contato</p>;
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className={`titulo ${grande ? "text-[clamp(2.4rem,4vw,3.25rem)]" : "text-3xl"} leading-none`}>{p.preco}</span>
      {p.periodo && <span className="text-texto-suave">{p.periodo}</span>}
    </p>
  );
}
