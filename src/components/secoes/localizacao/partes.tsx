import type { Cliente } from "@/content/conteudo";
import { embedMapa, enderecoCompleto } from "@/lib/links";

export function Mapa({ c, className = "" }: { c: Cliente; className?: string }) {
  const end = enderecoCompleto(c.contato.endereco, c.contato.bairroCidade);
  return (
    <iframe
      title={`Mapa: ${c.negocio.nome}, ${end}`}
      src={embedMapa(end)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`block border-0 bg-cartao ${className}`}
    />
  );
}

export function Horarios({ c, className = "" }: { c: Cliente; className?: string }) {
  return (
    <dl className={`divide-y divide-linha ${className}`}>
      {c.contato.horarios.map((h) => (
        <div key={h.dias} className="flex items-baseline justify-between gap-6 py-3">
          <dt>{h.dias}</dt>
          <dd className={`tabular-nums ${/fechado/i.test(h.horas) ? "text-texto-suave" : "font-semibold"}`}>{h.horas}</dd>
        </div>
      ))}
    </dl>
  );
}
