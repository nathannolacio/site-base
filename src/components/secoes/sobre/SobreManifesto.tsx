import { Assinatura } from "@/components/ui/Assinatura";
import { Icone } from "@/components/ui/Icone";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";

/**
 * Uma frase grande e centralizada que resume a marca, com três pilares embaixo.
 */
export function SobreManifesto({ c, tom }: SecaoProps) {
  const { sobre, identidade } = c;
  return (
    <Secao id={ANCORAS.sobre} tom={tom}>
      <div className="container-site">
        <div className="relative mx-auto max-w-5xl text-center">
          <Assinatura tipo={identidade.assinatura} className="mx-auto mb-10 w-20 md:w-24" />
          <h2 className="sr-only">{sobre.titulo}</h2>
          <p className="titulo t-1 mx-auto max-w-[22ch]">{sobre.manifesto}</p>
          <p className="t-lead mx-auto mt-8 max-w-[56ch] text-texto-suave">{sobre.texto}</p>
        </div>

        <ul className="mt-20 grid gap-12 border-t border-linha pt-12 md:grid-cols-3 md:gap-10">
          {sobre.pilares.map((p) => (
            <li key={p.titulo}>
              <Icone nome={p.icone} className="size-9 text-acento" />
              <h3 className="titulo t-3 mt-5">{p.titulo}</h3>
              <p className="mt-2.5 text-texto-suave">{p.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
