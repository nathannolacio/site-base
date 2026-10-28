import { ANO, itensDoMenu } from "@/content/conteudo";
import { linkTelefone } from "@/lib/links";
import type { SecaoProps } from "../tipos";
import { Redes } from "./Redes";

/**
 * Links e contatos em cima; o nome da marca enorme ocupa a largura toda, como assinatura final.
 */
export function RodapeGigante({ c, tom }: SecaoProps) {
  const { negocio, contato } = c;
  // tamanho calculado para o nome caber na largura, de ponta a ponta
  const letras = Math.max(negocio.nome.length, 4);
  const tamanho = `min(${(165 / letras).toFixed(2)}vw, ${(132 / letras).toFixed(2)}rem)`;

  return (
    <footer data-tom={tom} className="overflow-hidden pt-16">
      <div className="container-site">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {itensDoMenu(c).map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="font-medium hover:text-acento">{i.rotulo}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-5 md:items-end md:text-right">
            <address className="text-texto-suave not-italic">
              {contato.endereco}, {contato.bairroCidade}
              <br />
              <a href={linkTelefone(contato.telefone)} className="text-texto hover:text-acento">{contato.telefone}</a>
            </address>
            <Redes c={c} />
          </div>
        </div>

        <p
          aria-hidden
          className="titulo mt-16 text-center whitespace-nowrap text-acento select-none"
          style={{ fontSize: tamanho, lineHeight: 0.78 }}
        >
          {negocio.nome}
        </p>
        <p className="flex flex-col justify-between gap-2 border-t border-linha py-6 text-sm text-texto-suave sm:flex-row">
          <span>
            © {ANO} {negocio.nome}
            {negocio.registro && <> · {negocio.registro}</>}
          </span>
          <span>{negocio.segmento} em {negocio.cidade}</span>
        </p>
      </div>
    </footer>
  );
}
