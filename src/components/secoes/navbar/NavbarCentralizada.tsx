"use client";
import { useCallback, useState } from "react";
import { Clock, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { IconeWhatsapp } from "@/components/ui/IconesRedes";
import type { NavbarProps } from "./tipos";
import { useMenuAberto } from "./useRolagem";

/**
 * Faixa fina no topo com telefone e horário; logo no centro e links divididos dos dois lados.
 * A faixa rola junto com a página; a barra principal gruda no topo.
 */
export function NavbarCentralizada({ nome, logo, itens, whatsappHref, telefone, telefoneHref, horario, preview }: NavbarProps) {
  const [aberto, setAberto] = useState(false);
  const fechar = useCallback(() => setAberto(false), []);
  useMenuAberto(aberto, fechar);

  const meio = Math.ceil(itens.length / 2);
  const esquerda = itens.slice(0, meio);
  const direita = itens.slice(meio);

  return (
    <>
      <div data-tom="marca" className="text-[0.8125rem]">
        <div className="container-site flex h-9 items-center justify-center gap-6 sm:justify-between">
          <span className="hidden items-center gap-2 sm:inline-flex">
            <Clock className="size-3.5" aria-hidden />
            {horario}
          </span>
          <a href={telefoneHref} className="inline-flex items-center gap-2 hover:underline">
            <Phone className="size-3.5" aria-hidden />
            {telefone}
          </a>
        </div>
      </div>

      <header data-tom="claro" className={`${preview ? "relative" : "sticky"} top-0 z-50 border-b border-linha`}>
        <nav className="container-site grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4" aria-label="Principal">
          <div className="flex items-center">
            <button
              type="button"
              className="-ml-2 grid size-11 place-items-center lg:hidden"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={aberto}
              aria-controls="menu-centralizado"
              onClick={() => setAberto((v) => !v)}
            >
              {aberto ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
            <ul className="hidden gap-8 lg:flex">
              {esquerda.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="text-[0.975rem] font-medium hover:text-acento">{i.rotulo}</a>
                </li>
              ))}
            </ul>
          </div>

          <a href="#inicio" className="justify-self-center text-center" onClick={fechar}>
            <Logo nome={nome} logo={logo} tamanho="text-[1.75rem]" />
          </a>

          <div className="flex items-center justify-end gap-8">
            <ul className="hidden gap-8 lg:flex">
              {direita.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="text-[0.975rem] font-medium hover:text-acento">{i.rotulo}</a>
                </li>
              ))}
            </ul>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chamar no WhatsApp"
              className="grid size-11 place-items-center rounded-botao bg-acento text-sobre-acento transition hover:brightness-110"
            >
              <IconeWhatsapp className="size-5" />
            </a>
          </div>
        </nav>

        <div id="menu-centralizado" hidden={!aberto} className="border-t border-linha lg:hidden">
          <ul className="container-site grid grid-cols-2 gap-x-6 py-4">
            {itens.map((i) => (
              <li key={i.href}>
                <a href={i.href} onClick={fechar} className="block py-3 text-lg font-medium">
                  {i.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
