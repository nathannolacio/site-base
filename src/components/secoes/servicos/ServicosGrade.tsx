import { Botao } from "@/components/ui/Botao";
import { Icone } from "@/components/ui/Icone";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";
import type { SecaoProps } from "../tipos";

/**
 * Serviços 1 — Grade de cards
 * Cards com ícone, nome e descrição. O primeiro card ocupa duas colunas para quebrar a monotonia.
 * Boa para 3 a 8 serviços sem fotos próprias.
 */
export function ServicosGrade({ c, tom }: SecaoProps) {
  const { servicos, contato } = c;
  return (
    <Secao id={ANCORAS.servicos} tom={tom}>
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="titulo t-2 max-w-[16ch]">{servicos.titulo}</h2>
          <p className="medida max-w-[44ch] text-texto-suave">{servicos.intro}</p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.itens.map((s, i) => (
            <li
              key={s.nome}
              className={`flex flex-col rounded-grande bg-cartao p-7 md:p-8 ${
                i === 0 && servicos.itens.length % 3 !== 0 ? "lg:col-span-2" : ""
              } ${i === 0 ? "bg-acento! text-sobre-acento" : ""}`}
            >
              <span
                className={`grid size-14 place-items-center rounded-base ${
                  i === 0 ? "bg-[color-mix(in_oklab,var(--sobre-acento)_14%,transparent)]" : "bg-fundo text-acento"
                }`}
              >
                <Icone nome={s.icone} className="size-7" />
              </span>
              <h3 className="titulo t-3 mt-8">{s.nome}</h3>
              <p className={`mt-2.5 ${i === 0 ? "opacity-85" : "text-texto-suave"}`}>{s.descricao}</p>
              {s.preco && <p className="mt-auto pt-6 font-semibold">{s.preco}</p>}
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Botao href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} whatsapp estilo="secundario">
            Pedir orçamento no WhatsApp
          </Botao>
        </div>
      </div>
    </Secao>
  );
}
