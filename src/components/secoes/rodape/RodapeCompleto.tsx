import { Logo } from "@/components/ui/Logo";
import { ANO, itensDoMenu } from "@/content/conteudo";
import { linkTelefone } from "@/lib/links";
import type { SecaoProps } from "../tipos";
import { Redes } from "./Redes";

/**
 * Quatro colunas: marca, navegação, contato e horários.
 */
export function RodapeCompleto({ c, tom }: SecaoProps) {
  const { negocio, contato, identidade } = c;
  return (
    <footer data-tom={tom} className="pt-20 pb-10">
      <div className="container-site">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo nome={negocio.nome} logo={identidade.logo} tamanho="text-3xl" />
            <p className="mt-5 max-w-[34ch] text-texto-suave">{negocio.descricao}</p>
            {negocio.registro && <p className="mt-3 font-medium">{negocio.registro}</p>}
            <Redes c={c} className="mt-6" />
          </div>
          <nav aria-label="Rodapé">
            <h2 className="font-semibold">Navegue</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-texto-suave">
              {itensDoMenu(c).map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="hover:text-texto">{i.rotulo}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-semibold">Contato</h2>
            <address className="mt-4 flex flex-col gap-2.5 text-texto-suave not-italic">
              <a href={linkTelefone(contato.telefone)} className="hover:text-texto">{contato.telefone}</a>
              {contato.email && <a href={`mailto:${contato.email}`} className="hover:text-texto">{contato.email}</a>}
              <span>
                {contato.endereco}
                <br />
                {contato.bairroCidade}
              </span>
            </address>
          </div>
          <div>
            <h2 className="font-semibold">Horários</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-texto-suave">
              {contato.horarios.map((h) => (
                <li key={h.dias}>
                  {h.dias}: <span className="text-texto">{h.horas}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-16 border-t border-linha pt-6 text-sm text-texto-suave">
          © {ANO} {negocio.nome}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
