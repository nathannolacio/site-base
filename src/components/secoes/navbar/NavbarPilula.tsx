"use client";
import { useCallback, useState } from "react";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { IconeWhatsapp } from "@/components/ui/IconesRedes";
import type { NavbarProps } from "./tipos";
import { useMenuAberto } from "./useRolagem";

/**
 * Barra arredondada solta do topo. No computador, os links ficam dentro da pílula;
 * no celular, o botão "Menu" abre a navegação em tela cheia, na cor da marca.
 */
export function NavbarPilula({ nome, logo, itens, whatsappHref, telefone, telefoneHref, horario, preview }: NavbarProps) {
  const [aberto, setAberto] = useState(false);
  const fechar = useCallback(() => setAberto(false), []);
  useMenuAberto(aberto, fechar);

  return (
    <>
      <header className={`${preview ? "absolute" : "fixed"} inset-x-0 top-3 z-50 px-3 sm:top-5`}>
        <nav
          data-tom="claro"
          aria-label="Principal"
          className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 rounded-botao border border-linha bg-[color-mix(in_oklab,var(--fundo)_86%,transparent)]! pr-2 pl-6 shadow-marca backdrop-blur-md lg:max-w-5xl"
        >
          <a href="#inicio" className="shrink-0">
            <Logo nome={nome} logo={logo} tamanho="text-xl" />
          </a>

          {/* computador: os links ficam dentro da pílula */}
          <ul className="hidden items-center gap-1 lg:flex">
            {itens.map((i) => (
              <li key={i.href}>
                <a href={i.href} className="block rounded-botao px-4 py-2 text-[0.95rem] font-medium transition hover:bg-cartao">
                  {i.rotulo}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chamar no WhatsApp"
              className="grid size-12 place-items-center rounded-botao text-acento transition hover:bg-cartao lg:hidden"
            >
              <IconeWhatsapp className="size-[22px]" />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-12 items-center gap-2 rounded-botao bg-acento px-5 font-semibold text-sobre-acento transition hover:brightness-110 lg:inline-flex"
            >
              <IconeWhatsapp className="size-5" /> WhatsApp
            </a>
            {/* celular: botão Menu abre a navegação em tela cheia */}
            <button
              type="button"
              onClick={() => setAberto(true)}
              aria-expanded={aberto}
              aria-controls="menu-pilula"
              className="h-12 rounded-botao bg-acento px-6 font-semibold text-sobre-acento transition hover:brightness-110 lg:hidden"
            >
              Menu
            </button>
          </div>
        </nav>
      </header>

      <div
        id="menu-pilula"
        data-tom="marca"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!aberto}
        className="fixed inset-0 z-[60] overflow-y-auto lg:hidden"
      >
        <div className="container-site flex min-h-full flex-col py-6">
          <div className="flex items-center justify-between">
            <Logo nome={nome} logo={logo} tamanho="text-xl" />
            <button
              type="button"
              onClick={fechar}
              className="grid size-12 place-items-center rounded-botao border border-linha"
              aria-label="Fechar menu"
              autoFocus
            >
              <X className="size-6" />
            </button>
          </div>

          <ul className="my-auto flex flex-col gap-1 py-12">
            {itens.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  onClick={fechar}
                  className="titulo t-1 block py-1 transition-[color,padding] duration-300 hover:pl-3 hover:text-acento"
                >
                  {i.rotulo}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 border-t border-linha pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-texto-suave">
              <a href={telefoneHref} className="block text-lg text-texto">{telefone}</a>
              {horario}
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-botao bg-acento px-6 py-3.5 font-semibold text-sobre-acento"
            >
              <IconeWhatsapp className="size-5" /> Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
