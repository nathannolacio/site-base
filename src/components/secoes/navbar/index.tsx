import type { Variacao } from "@/content/tipos";
import { NavbarClassica } from "./NavbarClassica";
import { NavbarCentralizada } from "./NavbarCentralizada";
import { NavbarPilula } from "./NavbarPilula";
import type { NavbarProps } from "./tipos";

export const NAVBARS = {
  1: { nome: "Clássica", Componente: NavbarClassica },
  2: { nome: "Centralizada", Componente: NavbarCentralizada },
  3: { nome: "Pílula flutuante", Componente: NavbarPilula },
} as const;

export function Navbar({ variacao, ...props }: NavbarProps & { variacao: Variacao }) {
  const { Componente } = NAVBARS[variacao];
  return <Componente {...props} />;
}
