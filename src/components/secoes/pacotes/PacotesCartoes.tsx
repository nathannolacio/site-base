import { Botao } from "@/components/ui/Botao";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import type { SecaoProps } from "../tipos";
import { linkPacote, ListaInclui, Preco } from "./partes";

const COLUNAS: Record<number, string> = {
  1: "md:grid-cols-1 max-w-md mx-auto",
  2: "md:grid-cols-2 max-w-4xl mx-auto",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};

/**
 * Planos lado a lado, com preço, o que está incluído e botão próprio.
 * O plano marcado como destaque ganha a cor da marca.
 */
export function PacotesCartoes({ c, tom }: SecaoProps) {
  const p = c.pacotes;
  if (!p) return null;
  return (
    <Secao id={ANCORAS.pacotes} tom={tom}>
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="titulo t-2">{p.titulo}</h2>
          <p className="t-lead mt-5 text-texto-suave">{p.intro}</p>
        </div>

        <ul className={`mt-14 grid items-stretch gap-5 ${COLUNAS[Math.min(p.itens.length, 4)] ?? COLUNAS[3]}`}>
          {p.itens.map((item) => (
            <li
              key={item.nome}
              data-tom={item.destaque ? "marca" : undefined}
              className={`relative flex flex-col rounded-grande p-8 ${item.destaque ? "shadow-marca" : "border border-linha bg-cartao"}`}
            >
              {item.destaque && (
                <span className="absolute -top-3.5 left-8 rounded-botao bg-destaque px-3.5 py-1 text-sm font-semibold text-sobre-destaque">
                  Mais escolhido
                </span>
              )}
              <h3 className="titulo t-3">{item.nome}</h3>
              <p className="mt-2 text-texto-suave">{item.descricao}</p>
              <div className="mt-7">
                <Preco p={item} grande />
              </div>
              <ListaInclui itens={item.inclui} className="mt-7 border-t border-linha pt-7" />
              <div className="mt-auto pt-9">
                <Botao href={linkPacote(c, item)} whatsapp estilo={item.destaque ? "primario" : "secundario"} className="w-full">
                  Quero este
                </Botao>
              </div>
            </li>
          ))}
        </ul>
        {p.observacao && <p className="mx-auto mt-10 max-w-2xl text-center text-texto-suave">{p.observacao}</p>}
      </div>
    </Secao>
  );
}
