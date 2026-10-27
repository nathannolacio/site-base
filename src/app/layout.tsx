import type { Metadata } from "next";
import "@/styles/fontes";
import "./globals.css";
import { cliente } from "@/content/conteudo";

export const metadata: Metadata = {
  title: `${cliente.negocio.nome} | ${cliente.negocio.segmento} em ${cliente.negocio.cidade}`,
  description: cliente.negocio.descricao,
  // Modo demo: a prévia não aparece no Google.
  robots: cliente.modoDemo ? { index: false, follow: false } : undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body data-tom="claro" className="min-h-dvh">
        {children}
      </body>
    </html>
  );
}
