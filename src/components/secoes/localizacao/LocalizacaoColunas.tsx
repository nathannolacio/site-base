import { Mail, MapPin, Phone } from "lucide-react";
import { Botao } from "@/components/ui/Botao";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkMapa, linkTelefone, linkWhatsapp, enderecoCompleto } from "@/lib/links";
import type { SecaoProps } from "../tipos";
import { Horarios, Mapa } from "./partes";

/**
 * Localização 2 — Duas colunas
 * Tabela de horários e contatos de um lado, mapa emoldurado do outro.
 * Boa para horários complicados (vários turnos, plantões, dias diferentes).
 */
export function LocalizacaoColunas({ c, tom }: SecaoProps) {
  const { contato } = c;
  const end = enderecoCompleto(contato.endereco, contato.bairroCidade);
  return (
    <Secao id={ANCORAS.localizacao} tom={tom}>
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="titulo t-2">Horários e endereço</h2>
          <Horarios c={c} className="mt-10 border-y border-texto text-lg" />

          <ul className="mt-10 flex flex-col gap-4">
            <li className="flex gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-acento" aria-hidden />
              <a href={linkMapa(end, contato.mapsUrl)} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {end}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 size-5 shrink-0 text-acento" aria-hidden />
              <a href={linkTelefone(contato.telefone)} className="hover:underline">{contato.telefone}</a>
            </li>
            {contato.email && (
              <li className="flex gap-3">
                <Mail className="mt-1 size-5 shrink-0 text-acento" aria-hidden />
                <a href={`mailto:${contato.email}`} className="hover:underline">{contato.email}</a>
              </li>
            )}
          </ul>
          <div className="mt-9">
            <Botao href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} whatsapp>
              Chamar no WhatsApp
            </Botao>
          </div>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden rounded-grande border border-linha lg:min-h-0">
          <Mapa c={c} className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </Secao>
  );
}
