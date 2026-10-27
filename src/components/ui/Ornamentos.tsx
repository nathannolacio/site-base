import { useId } from "react";
import type { EstiloGrafico } from "@/content/tipos";
import { Icone } from "./Icone";

/*
 * Elementos gráficos soltos da marca. Todos mudam de desenho conforme o estilo
 * (identidade.estilo no cliente.json):
 *   organico   → formas arredondadas, folhas, traço solto
 *   geometrico → círculos, meias-luas, quadrados sólidos
 *   linear     → traço fino, arcos e brilhos delicados
 *   artesanal  → carimbo, traço tremido, asteriscos desenhados à mão
 *   moderno    → grade técnica, sinais de mais, cantos retos
 */

type Base = { estilo: EstiloGrafico; className?: string; cor?: string };

const DESTAQUE = "var(--cor-destaque)";
const TINTA = "var(--cor-tinta)";

/** Forma grande de fundo, atrás de fotos e cartões. */
export function Forma({ estilo, className = "", cor = "var(--acento)" }: Base) {
  const comum = { viewBox: "0 0 240 240", "aria-hidden": true, className: `pointer-events-none ${className}`, style: { color: cor } } as const;
  switch (estilo) {
    case "organico":
      return (
        <svg {...comum}>
          <path
            fill="currentColor"
            d="M168 34c34 20 54 60 46 100-8 42-44 84-90 90-48 6-94-24-106-66C6 116 30 66 66 42c30-20 70-26 102-8Z"
          />
          <path fill={DESTAQUE} d="M206 168c12 10 14 30 2 42s-32 12-42 0-8-30 4-40 26-12 36-2Z" />
          <path d="M18 214c40-30 70-34 112-22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".55" />
        </svg>
      );
    case "geometrico":
      return (
        <svg {...comum}>
          <circle cx="98" cy="142" r="82" fill="currentColor" />
          <path d="M124 92a58 58 0 0 1 116 0Z" fill={DESTAQUE} />
          <rect x="30" y="18" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="7" transform="rotate(12 50 38)" />
          <circle cx="212" cy="204" r="12" fill={TINTA} />
        </svg>
      );
    case "linear":
      return (
        <svg {...comum} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M34 238V122a86 86 0 0 1 172 0v116" />
          <path d="M56 238V124a64 64 0 0 1 128 0v114" />
          <path d="M78 238V126a42 42 0 0 1 84 0v112" />
          <path d="M214 18c1.6 9.4 4.6 12.4 14 14-9.4 1.6-12.4 4.6-14 14-1.6-9.4-4.6-12.4-14-14 9.4-1.6 12.4-4.6 14-14Z" fill={DESTAQUE} stroke="none" />
          <circle cx="20" cy="40" r="3.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "artesanal":
      return (
        <svg {...comum}>
          <path
            fill="currentColor"
            d="M121 26c48-2 88 32 92 80 4 50-30 94-82 100-52 6-100-30-104-80-4-50 40-98 94-100Z"
          />
          <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="1 9" strokeLinecap="round" />
          <g stroke={DESTAQUE} strokeWidth="6" strokeLinecap="round" transform="translate(206 38)">
            <path d="M0-16v32M-14-8l28 16M-14 9l27-17" />
          </g>
        </svg>
      );
    case "moderno":
      return (
        <svg {...comum}>
          <g stroke="currentColor" strokeWidth="1" opacity=".35">
            {[40, 80, 120, 160, 200].map((v) => (
              <g key={v}>
                <line x1={v} y1="0" x2={v} y2="240" />
                <line x1="0" y1={v} x2="240" y2={v} />
              </g>
            ))}
          </g>
          <path d="M240 240V112A128 128 0 0 0 112 240Z" fill="currentColor" />
          <rect x="40" y="40" width="40" height="40" fill={DESTAQUE} />
          <g stroke={TINTA} strokeWidth="3">
            <path d="M160 34v12M154 40h12M200 74v12M194 80h12" />
          </g>
        </svg>
      );
  }
}

/** Detalhe pequeno: acompanha títulos, cartões e cantos. */
export function Detalhe({ estilo, className = "", cor = "var(--acento)" }: Base) {
  const comum = { viewBox: "0 0 64 64", "aria-hidden": true, className: `pointer-events-none ${className}`, style: { color: cor } } as const;
  switch (estilo) {
    case "organico":
      return (
        <svg {...comum}>
          <path d="M12 56C24 42 34 26 52 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22 44c-9-1-13-8-11-15 8 1 12 7 11 15Z" fill="currentColor" />
          <path d="M26 39c2-9 9-12 16-9-2 8-8 11-16 9Z" fill={DESTAQUE} />
          <path d="M33 29c-8-3-10-11-6-17 7 3 9 10 6 17Z" fill="currentColor" />
          <path d="M39 22c3-8 11-10 17-6-3 7-10 9-17 6Z" fill="currentColor" />
        </svg>
      );
    case "geometrico":
      return (
        <svg {...comum}>
          <circle cx="16" cy="46" r="11" fill={DESTAQUE} />
          <path d="M30 57h24L42 36Z" fill="currentColor" />
          <rect x="34" y="6" width="18" height="18" fill="currentColor" transform="rotate(15 43 15)" />
        </svg>
      );
    case "linear":
      return (
        <svg {...comum} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M28 6c2.4 14 7 18.6 21 21-14 2.4-18.6 7-21 21-2.4-14-7-18.6-21-21 14-2.4 18.6-7 21-21Z" />
          <path d="M51 40c1 5.6 2.8 7.4 8.4 8.4-5.6 1-7.4 2.8-8.4 8.4-1-5.6-2.8-7.4-8.4-8.4 5.6-1 7.4-2.8 8.4-8.4Z" fill={DESTAQUE} stroke="none" />
        </svg>
      );
    case "artesanal":
      return (
        <svg {...comum} fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
          <path d="M31 8c1 16 0 30 2 48" />
          <path d="M10 20c14 6 30 16 44 22" />
          <path d="M12 44c13-9 27-16 42-25" />
          <path d="M44 56c3-2 7-2 9 1" stroke={DESTAQUE} strokeWidth="3.5" />
        </svg>
      );
    case "moderno":
      return (
        <svg {...comum} fill="none" stroke="currentColor" strokeWidth="3.5">
          <path d="M8 8h18v18" />
          <path d="M26 8 8 26" />
          <path d="M44 34v20M34 44h20" stroke={DESTAQUE} />
        </svg>
      );
  }
}

/* Aparência do selo circular por estilo: fundo, cor do texto, aro e miolo */
const SELO: Record<EstiloGrafico, { fundo: string; texto: string; aro?: { cor: string; traco?: string }; miolo: string; corIcone: string; caixa: boolean }> = {
  organico: { fundo: DESTAQUE, texto: "var(--cor-sobre-destaque)", miolo: "var(--cor-marca)", corIcone: "var(--cor-marca-contraste)", caixa: false },
  geometrico: { fundo: "var(--cor-marca)", texto: "var(--cor-marca-contraste)", miolo: DESTAQUE, corIcone: "var(--cor-sobre-destaque)", caixa: true },
  linear: { fundo: "var(--cor-fundo)", texto: TINTA, aro: { cor: TINTA }, miolo: "var(--cor-fundo)", corIcone: "var(--cor-marca)", caixa: false },
  artesanal: { fundo: "var(--cor-fundo)", texto: TINTA, aro: { cor: TINTA, traco: "2 5" }, miolo: DESTAQUE, corIcone: "var(--cor-sobre-destaque)", caixa: true },
  moderno: { fundo: TINTA, texto: "var(--cor-fundo)", miolo: "var(--cor-marca)", corIcone: "var(--cor-marca-contraste)", caixa: true },
};

/**
 * Selo redondo com uma frase girando em volta do ícone do negócio.
 * Fica por cima de fotos e cantos de seção. Para de girar para quem prefere menos movimento.
 */
export function SeloCircular({ estilo, texto, icone, className = "" }: { estilo: EstiloGrafico; texto: string; icone: string; className?: string }) {
  const id = `selo${useId().replace(/:/g, "")}`;
  if (!texto) return null;
  const s = SELO[estilo];
  const r = 70;
  const volta = 2 * Math.PI * r;
  const frase = s.caixa ? texto.toUpperCase() : texto;
  const repeticoes = Math.max(1, Math.round(volta / (frase.length * (s.caixa ? 9.6 : 8.6))));
  const linha = Array.from({ length: repeticoes }, () => frase).join(" ");
  return (
    <div className={className} role="img" aria-label={texto.replace(/✦/g, ",")}>
      <div className="relative aspect-square w-full">
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <defs>
          <path id={id} d={`M100,100 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`} />
        </defs>
        <circle cx="100" cy="100" r="98" fill={s.fundo} />
        {s.aro && <circle cx="100" cy="100" r="93" fill="none" stroke={s.aro.cor} strokeWidth="1.2" strokeDasharray={s.aro.traco} />}
        {s.aro && <circle cx="100" cy="100" r="49" fill="none" stroke={s.aro.cor} strokeWidth="1.2" strokeDasharray={s.aro.traco} />}
        <g className="girar" style={{ transformOrigin: "100px 100px" }}>
          <text
            fill={s.texto}
            fontSize={s.caixa ? 13.5 : 15}
            fontWeight={600}
            letterSpacing={s.caixa ? 2 : 0.5}
            style={{ fontFamily: "var(--fonte-texto)" }}
          >
            <textPath href={`#${id}`} textLength={volta - 6} lengthAdjust="spacing">
              {linha}
            </textPath>
          </text>
        </g>
        <circle cx="100" cy="100" r="42" fill={s.miolo} />
      </svg>
      <span className="absolute inset-0 grid place-items-center" style={{ color: s.corIcone }}>
        <Icone nome={icone} className="size-[24%]" strokeWidth={1.8} />
      </span>
      </div>
    </div>
  );
}

const CHIP: Record<EstiloGrafico, string> = {
  organico: "rounded-full bg-[var(--cor-fundo)] text-[var(--cor-tinta)] shadow-[0_14px_30px_-12px_rgb(0_0_0/0.35)] px-4 py-2.5",
  geometrico: "rounded-none bg-[var(--cor-destaque)] text-[var(--cor-sobre-destaque)] shadow-[5px_5px_0_var(--cor-tinta)] px-4 py-3",
  linear: "rounded-[var(--raio)] border border-[color-mix(in_oklab,var(--cor-tinta)_25%,transparent)] bg-[color-mix(in_oklab,var(--cor-fundo)_86%,transparent)] text-[var(--cor-tinta)] backdrop-blur-md px-4 py-2.5",
  artesanal: "rounded-[6px] border-[1.5px] border-dashed border-[var(--cor-tinta)] bg-[var(--cor-fundo)] text-[var(--cor-tinta)] -rotate-2 px-4 py-2.5",
  moderno: "rounded-[2px] bg-[var(--cor-tinta)] text-[var(--cor-fundo)] px-4 py-3",
};

/** Etiqueta solta que fica por cima de fotos (nota no Google, horário do forno, especialidade). */
export function Chip({ estilo, icone, titulo, texto, className = "" }: { estilo: EstiloGrafico; icone?: string; titulo: string; texto?: string; className?: string }) {
  return (
    <div className={`inline-flex max-w-[16rem] items-center gap-3 text-left ${CHIP[estilo]} ${className}`}>
      {icone && (
        <span
          className={`grid size-9 shrink-0 place-items-center ${estilo === "geometrico" || estilo === "moderno" ? "rounded-none" : "rounded-full"}`}
          style={{
            background: estilo === "geometrico" ? "var(--cor-tinta)" : estilo === "moderno" ? "var(--cor-destaque)" : "var(--cor-marca)",
            color: estilo === "geometrico" ? "var(--cor-fundo)" : estilo === "moderno" ? "var(--cor-sobre-destaque)" : "var(--cor-marca-contraste)",
          }}
        >
          <Icone nome={icone} className="size-[18px]" strokeWidth={2} />
        </span>
      )}
      <span className="min-w-0 leading-tight">
        <span className="block text-[0.95rem] font-semibold">{titulo}</span>
        {texto && <span className="mt-0.5 block text-[0.8rem] opacity-75">{texto}</span>}
      </span>
    </div>
  );
}
