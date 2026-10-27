import { Foto } from "@/components/ui/Foto";
import { Secao } from "@/components/ui/Secao";
import { Trilho } from "@/components/ui/Trilho";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";
import type { SecaoProps } from "../tipos";

/**
 * Cards altos com foto, rolando na horizontal. Arrasta no celular, setas no computador.
 */
export function ServicosCarrossel({ c, tom }: SecaoProps) {
  const { servicos, contato, identidade } = c;
  return (
    <Secao id={ANCORAS.servicos} tom={tom}>
      <div className="container-site">
        <h2 className="titulo t-2 max-w-[18ch]">{servicos.titulo}</h2>
        <p className="t-lead medida mt-5 text-texto-suave">{servicos.intro}</p>
      </div>

      <div className="mt-6">
        <Trilho rotulo={servicos.titulo}>
          {servicos.itens.map((s) => (
            <li key={s.nome} className="w-[min(78vw,22rem)] shrink-0 snap-start">
              <a
                href={linkWhatsapp(contato.whatsapp, `Olá! Queria saber mais sobre ${s.nome.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Foto
                    foto={s.foto ?? { src: null, alt: s.nome }}
                    recorte={identidade.recorte === "inclinado" ? "reto" : identidade.recorte}
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="22rem"
                  />
                </div>
                <h3 className="titulo t-3 mt-5">{s.nome}</h3>
                <p className="mt-2 text-texto-suave">{s.descricao}</p>
                {s.preco && <p className="mt-3 font-semibold text-acento">{s.preco}</p>}
              </a>
            </li>
          ))}
        </Trilho>
      </div>
    </Secao>
  );
}
