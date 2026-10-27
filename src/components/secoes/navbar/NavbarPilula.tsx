"use client";
import { useCallback, useState } from "react";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { IconeWhatsapp } from "@/components/ui/IconesRedes";
import type { NavbarProps } from "./tipos";
import { useMenuAberto } from "./useRolagem";

/**
 * Barra arredondada solta do topo, com logo, WhatsApp e botão "Menu".
 * O menu abre em tela cheia, na cor da marca, em qualquer tamanho de tela.
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
          className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 rounded-botao border border-linha bg-[color-mix(in_oklab,var(--fundo)_86%,transparent)]! pr-2 pl-6 shadow-marca backdrop-blur-md"
        >
          <a href="#inicio">
            <Logo nome={nome} logo={logo} tamanho="text-xl" />
          </a>
          <div className="flex items-center gap-1.5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chamar no WhatsApp"
              className="grid size-12 place-items-center rounded-botao text-acento transition hover:bg-cartao"
            >
              <IconeWhatsapp className="size-[22px]" />
            </a>
            <button
              type="button"
              onClick={() => setAberto(true)}
              aria-expanded={aberto}
              aria-controls="menu-pilula"
              className="h-12 rounded-botao bg-acento px-6 font-semibold text-sobre-acento transition hover:brightness-110"
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
        className="fixed inset-0 z-[60] overflow-y-auto"
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
