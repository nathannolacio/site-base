import { MapPin, Phone } from "lucide-react";
import { Botao } from "@/components/ui/Botao";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkMapa, linkTelefone, linkWhatsapp, enderecoCompleto } from "@/lib/links";
import type { SecaoProps } from "../tipos";
import { Horarios, Mapa } from "./partes";

/**
 * Localização 1 — Mapa grande + card flutuante
 * O mapa ocupa a largura toda; endereço, horários e botões ficam num card por cima
 * (no celular, o card vem logo abaixo do mapa). Boa para quem recebe clientes no local.
 */
export function LocalizacaoMapa({ c, tom }: SecaoProps) {
  const { contato } = c;
  const end = enderecoCompleto(contato.endereco, contato.bairroCidade);
  return (
    <Secao id={ANCORAS.localizacao} tom={tom} espaco={false} className="lg:py-0">
      <div className="relative flex flex-col-reverse lg:block">
        <div className="container-site relative z-10 -mt-10 lg:absolute lg:inset-y-0 lg:left-1/2 lg:mt-0 lg:flex lg:-translate-x-1/2 lg:items-center lg:pointer-events-none">
          <div className="rounded-grande bg-fundo p-7 shadow-marca md:p-9 lg:pointer-events-auto lg:w-[26rem]">
            <h2 className="titulo t-2">Como chegar</h2>
            <p className="mt-5 flex gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-acento" aria-hidden />
              <span>
                {contato.endereco}
                <br />
                <span className="text-texto-suave">{contato.bairroCidade}</span>
              </span>
            </p>
            <a href={linkTelefone(contato.telefone)} className="mt-3 flex items-center gap-3 hover:text-acento">
              <Phone className="size-5 shrink-0 text-acento" aria-hidden />
              {contato.telefone}
            </a>
            <Horarios c={c} className="mt-6 border-t border-linha" />
            <div className="mt-7 grid gap-3">
              <Botao href={linkMapa(end, contato.mapsUrl)}>Abrir no Google Maps</Botao>
              <Botao href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} whatsapp estilo="contorno">
                WhatsApp
              </Botao>
            </div>
          </div>
        </div>
        <Mapa c={c} className="h-[22rem] w-full grayscale-[0.35] md:h-[28rem] lg:h-[44rem]" />
      </div>
      <div className="h-16 lg:hidden" />
    </Secao>
  );
}
