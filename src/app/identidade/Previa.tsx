"use client";
import { useEffect, useRef, useState } from "react";

/** Mostra o site real (/) num quadro reduzido, como seria visto num computador. */
export function PreviaDesktop() {
  const caixa = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(0.5);
  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setEscala(e.contentRect.width / 1440));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="overflow-hidden rounded-base border border-linha bg-fundo shadow-marca">
      <div className="flex h-8 items-center gap-1.5 border-b border-linha bg-cartao px-3" aria-hidden>
        <span className="size-2.5 rounded-full bg-texto/20" />
        <span className="size-2.5 rounded-full bg-texto/20" />
        <span className="size-2.5 rounded-full bg-texto/20" />
      </div>
      <div ref={caixa} className="relative w-full overflow-hidden" style={{ height: 900 * escala }}>
        <iframe
          src="/"
          title="Prévia do site no computador"
          className="absolute top-0 left-0 origin-top-left border-0"
          style={{ width: 1440, height: 900, transform: `scale(${escala})` }}
        />
      </div>
    </div>
  );
}

export function PreviaCelular() {
  return (
    <div className="mx-auto w-[300px] rounded-[2.75rem] bg-tinta p-3 shadow-marca">
      <div className="relative h-[600px] overflow-hidden rounded-[2.1rem] bg-fundo">
        <iframe
          src="/"
          title="Prévia do site no celular"
          className="absolute top-0 left-0 origin-top-left border-0"
          style={{ width: 375, height: 815, transform: "scale(0.736)" }}
        />
      </div>
    </div>
  );
}
