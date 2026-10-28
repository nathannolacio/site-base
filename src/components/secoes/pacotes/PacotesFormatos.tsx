import { Botao } from "@/components/ui/Botao";
import { Icone } from "@/components/ui/Icone";
import { Detalhe } from "@/components/ui/Ornamentos";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";
import type { SecaoProps } from "../tipos";
import { ListaInclui } from "./partes";

/**
 * Formatos de atendimento (individual, casal, online...) sem destacar preço:
 * o valor, quando houver, aparece discreto, e o convite é para combinar no contato.
 */
export function PacotesFormatos({ c, tom }: SecaoProps) {
  const p = c.pacotes;
  if (!p) return null;
  return (
    <Secao id={ANCORAS.pacotes} tom={tom}>
      <div className="container-site grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Detalhe estilo={c.identidade.estilo} className="mb-6 size-11" />
          <h2 className="titulo t-2 max-w-[14ch]">{p.titulo}</h2>
          <p className="t-lead mt-6 text-texto-suave">{p.intro}</p>
          {p.observacao && <p className="mt-6 text-texto-suave">{p.observacao}</p>}
          <div className="mt-9">
            <Botao href={linkWhatsapp(c.contato.whatsapp, c.contato.mensagemWhatsapp)} whatsapp>
              Agendar uma conversa
            </Botao>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {p.itens.map((item, i) => (
            <li
              key={item.nome}
              className={`flex flex-col rounded-grande border border-linha p-7 ${
                p.itens.length % 2 === 1 && i === p.itens.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <span className="grid size-12 place-items-center rounded-full bg-cartao text-acento">
                <Icone nome={item.icone ?? "HeartHandshake"} className="size-6" />
              </span>
              <h3 className="titulo t-3 mt-6">{item.nome}</h3>
              <p className="mt-2 text-texto-suave">{item.descricao}</p>
              <ListaInclui itens={item.inclui} className="mt-5 text-[0.95rem]" />
              {item.preco && (
                <p className="mt-auto pt-6 text-sm text-texto-suave">
                  {item.preco}
                  {item.periodo && ` ${item.periodo}`}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
