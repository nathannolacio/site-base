import type { ItemMenu } from "@/content/conteudo";

export type NavbarProps = {
  nome: string;
  logo?: string;
  itens: ItemMenu[];
  whatsappHref: string;
  telefone: string;
  telefoneHref: string;
  horario: string;
  /** primeira seção é uma foto em tela cheia: texto claro enquanto estiver no topo */
  sobreFoto?: boolean;
  /** usado em /variacoes: não fixa no topo da janela */
  preview?: boolean;
};
