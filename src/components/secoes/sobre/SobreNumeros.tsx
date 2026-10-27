import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";

/**
 * Sobre 2 — Números
 * Três ou quatro números grandes (só números reais e confirmados!) com um texto curto.
 * Boa para negócios com tempo de mercado, volume de clientes ou nota alta no Google.
 */
export function SobreNumeros({ c, tom }: SecaoProps) {
  const { sobre } = c;
  return (
    <Secao id={ANCORAS.sobre} tom={tom}>
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <h2 className="titulo t-2 max-w-[16ch]">{sobre.titulo}</h2>
          <p className="t-lead medida text-texto-suave md:pt-2">{sobre.texto}</p>
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-grande bg-linha sm:grid-cols-2 lg:mt-24 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {sobre.numeros.map((n) => (
            <div key={n.rotulo} className="flex flex-col-reverse gap-3 bg-fundo p-8 md:p-10">
              <dt className="max-w-[22ch] text-texto-suave">{n.rotulo}</dt>
              <dd className="titulo text-[clamp(3.5rem,7vw,6rem)] leading-[0.9] text-acento">{n.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Secao>
  );
}
