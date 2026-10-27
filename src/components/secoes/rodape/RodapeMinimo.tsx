import { Logo } from "@/components/ui/Logo";
import { ANO } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";
import { Redes } from "./Redes";

/**
 * Rodapé 2 — Minimalista
 * Uma linha só: marca, redes e direitos. Para páginas que já fecham com um CTA forte.
 */
export function RodapeMinimo({ c, tom }: SecaoProps) {
  const { negocio, identidade, contato } = c;
  return (
    <footer data-tom={tom} className="border-t border-linha py-8">
      <div className="container-site flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-5">
          <Logo nome={negocio.nome} logo={identidade.logo} tamanho="text-xl" />
          <span className="text-sm text-texto-suave">
            {contato.endereco}, {contato.bairroCidade}
          </span>
        </div>
        <Redes c={c} />
        <p className="text-sm text-texto-suave">© {ANO} {negocio.nome}</p>
      </div>
    </footer>
  );
}
