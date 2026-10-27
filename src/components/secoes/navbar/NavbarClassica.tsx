"use client";
import { useCallback, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { IconeWhatsapp } from "@/components/ui/IconesRedes";
import type { NavbarProps } from "./tipos";
import { useMenuAberto, useRolou } from "./useRolagem";

/**
 * Logo à esquerda, links no centro, WhatsApp à direita.
 * Transparente no topo; ganha fundo e sombra ao rolar. No celular, painel que desce.
 */
export function NavbarClassica({ nome, logo, itens, whatsappHref, sobreFoto, preview }: NavbarProps) {
  const rolou = useRolou();
  const [aberto, setAberto] = useState(false);
  const fechar = useCallback(() => setAberto(false), []);
  useMenuAberto(aberto, fechar);

  const solida = rolou || aberto || preview;
  const claro = sobreFoto && !solida;

  return (
    <header
      data-tom="claro"
      className={`${preview ? "absolute" : "fixed"} inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
        solida ? "shadow-[0_1px_0_var(--linha)]" : "bg-transparent!"
      } ${claro ? "text-white!" : ""}`}
    >
      <nav className="container-site flex h-[4.5rem] items-center justify-between gap-6" aria-label="Principal">
        <a href="#inicio" className="shrink-0" onClick={fechar}>
          <Logo nome={nome} logo={logo} />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {itens.map((i) => (
            <li key={i.href}>
              <a href={i.href} className="relative py-2 text-[0.975rem] font-medium opacity-85 transition-opacity hover:opacity-100">
                {i.rotulo}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-botao bg-acento px-4 py-2.5 text-sm font-semibold text-sobre-acento transition hover:brightness-110 sm:px-5"
          >
            <IconeWhatsapp className="size-[18px]" />
            <span className="hidden sm:inline">Chamar no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-botao lg:hidden"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            aria-controls="menu-classico"
            onClick={() => setAberto((v) => !v)}
          >
            {aberto ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <div
        id="menu-classico"
        hidden={!aberto}
        className="border-t border-linha bg-fundo lg:hidden"
      >
        <ul className="container-site flex flex-col py-3">
          {itens.map((i) => (
            <li key={i.href}>
              <a href={i.href} onClick={fechar} className="block border-b border-linha py-4 text-lg font-medium last:border-0">
                {i.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
