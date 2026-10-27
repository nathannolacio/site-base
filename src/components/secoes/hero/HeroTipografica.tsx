import { Clock, MapPin } from "lucide-react";
import { Assinatura } from "@/components/ui/Assinatura";
import { Botao } from "@/components/ui/Botao";
import { Secao } from "@/components/ui/Secao";
import { ANCORAS } from "@/content/conteudo";
import { linkWhatsapp } from "@/lib/links";
import { espacoNavbar, type SecaoProps } from "../tipos";

/**
 * Hero 2 — Tipográfica
 * Sem foto. O nome da marca enorme é a imagem, composto com os elementos de assinatura.
 * Boa para marcas com fotos fracas ou de nome forte (escritórios, estúdios, profissionais).
 */
export function HeroTipografica({ c, tom }: SecaoProps) {
  const { negocio, identidade, contato } = c;
  const hoje = contato.horarios[0];
  // nome o maior possível sem estourar a largura (nomes longos quebram em linhas)
  const letras = Math.min(Math.max(...negocio.nome.split(" ").map((p) => p.length), 5), 14);
  const tamanho = `min(${(150 / letras).toFixed(1)}vw, ${(118 / letras).toFixed(2)}rem)`;
  return (
    <Secao id={ANCORAS.hero} tom={tom} espaco={false} className={`${espacoNavbar(c)} pb-14 md:pb-20`}>
      <Assinatura
        tipo={identidade.assinatura}
        className="absolute top-24 right-[-4%] w-[min(34vw,22rem)] opacity-95 md:top-28"
      />
      <Assinatura
        tipo={identidade.assinatura === "pontos" ? "blob" : "pontos"}
        cor="var(--cor-destaque)"
        className="absolute bottom-[-4rem] left-[-3rem] w-40 opacity-80 md:w-56"
      />

      <div className="container-site relative">
        <p className="t-lead max-w-[34ch] text-texto-suave">{negocio.segmento} em {negocio.cidade}</p>
        <h1 className="titulo relative mt-4 leading-[0.9]! break-words" style={{ fontSize: tamanho }}>
          {negocio.nome}
        </h1>

        <div className="relative mt-12 grid gap-10 border-t-2 border-texto bg-fundo pt-8 md:mt-16 md:grid-cols-[1.4fr_1fr] md:items-end">
          <p className="titulo t-3 max-w-[30ch] text-[clamp(1.375rem,2.4vw,2rem)]! leading-[1.2]!">{negocio.frase}</p>
          <div className="flex flex-col gap-6 md:items-end">
            <ul className="flex flex-col gap-2 text-[0.95rem] text-texto-suave md:items-end">
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-acento" aria-hidden />
                {contato.endereco}, {contato.bairroCidade}
              </li>
              {hoje && (
                <li className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-acento" aria-hidden />
                  {hoje.dias}, {hoje.horas}
                </li>
              )}
            </ul>
            <Botao href={linkWhatsapp(contato.whatsapp, contato.mensagemWhatsapp)} whatsapp grande>
              Chamar no WhatsApp
            </Botao>
          </div>
        </div>
      </div>
    </Secao>
  );
}
