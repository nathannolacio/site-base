import type { Assinatura as AssinaturaT } from "@/content/tipos";

type Props = {
  tipo: AssinaturaT;
  className?: string;
  /** cor do elemento; padrão = acento do tom da seção */
  cor?: string;
};

/**
 * Elemento gráfico de assinatura da marca. Usado em 2–3 lugares do site
 * (hero, sobre, chamada final) para o site ser reconhecível como da marca.
 */
export function Assinatura({ tipo, className = "", cor = "var(--acento)" }: Props) {
  if (tipo === "nenhuma") return null;
  const comum = { "aria-hidden": true, className: `pointer-events-none ${className}`, style: { color: cor } } as const;

  switch (tipo) {
    case "pontos":
      return (
        <svg viewBox="0 0 120 120" {...comum}>
          {Array.from({ length: 36 }, (_, i) => (
            <circle key={i} cx={10 + (i % 6) * 20} cy={10 + Math.floor(i / 6) * 20} r="3.2" fill="currentColor" />
          ))}
        </svg>
      );
    case "ondas":
      return (
        <svg viewBox="0 0 200 80" fill="none" {...comum}>
          {[14, 40, 66].map((y) => (
            <path
              key={y}
              d={`M0 ${y} q 12.5 -12 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0 t 25 0`}
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}
        </svg>
      );
    case "arcos":
      return (
        <svg viewBox="0 0 200 110" fill="none" {...comum}>
          {[95, 72, 49, 26].map((r) => (
            <path key={r} d={`M${100 - r} 105 a ${r} ${r} 0 0 1 ${r * 2} 0`} stroke="currentColor" strokeWidth="6" />
          ))}
        </svg>
      );
    case "blob":
      return (
        <svg viewBox="0 0 200 200" {...comum}>
          <path
            fill="currentColor"
            d="M43.6,-58.9C55.4,-49.4,62.5,-34.7,67.2,-18.9C71.9,-3.1,74.2,13.7,68.5,27.4C62.8,41.1,49.1,51.6,34.1,58.9C19.1,66.2,2.8,70.3,-14.6,69.4C-32,68.4,-50.5,62.4,-61.5,49.6C-72.5,36.8,-76,17.2,-73.3,-0.9C-70.6,-19,-61.7,-35.6,-48.6,-45.2C-35.5,-54.8,-17.7,-57.4,-0.6,-56.6C16.5,-55.8,31.8,-68.4,43.6,-58.9Z"
            transform="translate(100 100)"
          />
        </svg>
      );
    case "selo":
      return (
        <svg viewBox="0 0 200 200" {...comum}>
          <path fill="currentColor" d={seloPath(100, 100, 96, 84, 18)} />
        </svg>
      );
  }
}

/** Círculo recortado (selo de carimbo) com n pontas. */
function seloPath(cx: number, cy: number, rFora: number, rDentro: number, pontas: number) {
  const pts: string[] = [];
  for (let i = 0; i < pontas * 2; i++) {
    const r = i % 2 === 0 ? rFora : rDentro;
    const a = (Math.PI * i) / pontas - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join(" L")} Z`;
}
