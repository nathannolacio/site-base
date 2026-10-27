import { icons, type LucideProps } from "lucide-react";

/**
 * Ícone Lucide pelo nome (ex.: "Coffee", "Scissors", "Stethoscope").
 * Lista completa: https://lucide.dev/icons — use o nome em PascalCase.
 * Somente em componentes de servidor (o mapa de ícones é grande).
 */
export function Icone({ nome, ...props }: { nome: string } & LucideProps) {
  const Componente = icons[nome as keyof typeof icons] ?? icons.Sparkles;
  return <Componente aria-hidden strokeWidth={1.6} {...props} />;
}
