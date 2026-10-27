"use client";
import { useEffect, useState } from "react";

/** true depois que a página rolou alguns pixels. */
export function useRolou(limite = 24) {
  const [rolou, setRolou] = useState(false);
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > limite);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [limite]);
  return rolou;
}

/** Trava a rolagem do body enquanto um menu de tela cheia está aberto e fecha com Esc. */
export function useMenuAberto(aberto: boolean, fechar: () => void) {
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && fechar();
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, fechar]);
}
