import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { IconeInstagram, IconeWhatsapp } from "@/components/ui/IconesRedes";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkMapa, linkTelefone, linkWhatsapp, enderecoCompleto } from "@/lib/links";
import type { SecaoProps } from "../tipos";
import { Horarios, Mapa } from "./partes";

/**
 * Localização 3 — Bloco de contatos grandes
 * Os canais de contato viram links enormes e clicáveis; o mapa fica menor, ao lado.
 * Boa para negócios que atendem mais por WhatsApp/telefone do que no local.
 * Use com tom "marca" ou "escuro" para virar um bloco de cor.
 */
export function LocalizacaoBloco({ c, tom }: SecaoProps) {
  const { contato, redes } = c;
  const end = enderecoCompleto(contato.endereco, contato.bairroCidade);

  return (
    <Secao id={ANCORAS.localizacao} tom={tom}>
      <div className="container-site">
        <h2 className="titulo t-2 max-w-[16ch]">Fale com a gente</h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <ul className="border-t border-linha">
            <Canal href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} icone={<IconeWhatsapp className="size-7" />} rotulo="WhatsApp">
              {contato.telefone}
            </Canal>
            <Canal href={linkTelefone(contato.telefone)} icone={<Phone className="size-7" aria-hidden />} rotulo="Ligar">
              {contato.telefone}
            </Canal>
            {redes.instagram && (
              <Canal href={redes.instagram.url} icone={<IconeInstagram className="size-7" />} rotulo="Instagram">
                @{redes.instagram.usuario}
              </Canal>
            )}
            <Canal href={linkMapa(end, contato.mapsUrl)} icone={<MapPin className="size-7" aria-hidden />} rotulo="Endereço">
              {contato.endereco}
            </Canal>
          </ul>

          <div className="flex flex-col gap-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-grande">
              <Mapa c={c} className="absolute inset-0 h-full w-full" />
            </div>
            <Horarios c={c} />
          </div>
        </div>
      </div>
    </Secao>
  );
}

function Canal({ href, icone, rotulo, children }: { href: string; icone: ReactNode; rotulo: string; children: ReactNode }) {
  const fora = /^https?:/.test(href);
  return (
    <li className="border-b border-linha">
      <a
        href={href}
        {...(fora ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-center gap-5 py-6 md:py-7"
      >
        <span className="text-acento">{icone}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-texto-suave">{rotulo}</span>
          <span className="titulo block truncate text-[clamp(1.375rem,3vw,2.25rem)]">{children}</span>
        </span>
        <ArrowUpRight className="size-7 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
      </a>
    </li>
  );
}
