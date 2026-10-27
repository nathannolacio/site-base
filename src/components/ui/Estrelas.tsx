export function Estrelas({ nota, className = "size-4" }: { nota: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-destaque" role="img" aria-label={`${nota} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={className} aria-hidden>
          <path
            d="M10 1.6l2.6 5.3 5.8.85-4.2 4.1 1 5.8L10 14.9l-5.2 2.75 1-5.8L1.6 7.75l5.8-.85L10 1.6Z"
            fill={i < Math.round(nota) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      ))}
    </span>
  );
}
