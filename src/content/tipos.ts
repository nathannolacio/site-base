/* Formato do cliente.json (todo o conteúdo do site). */

export type Tom = "claro" | "suave" | "marca" | "escuro";
export type Variacao = 1 | 2 | 3;

export type TipoSecao =
  | "hero"
  | "sobre"
  | "servicos"
  | "galeria"
  | "avaliacoes"
  | "localizacao"
  | "cta"
  // seções pensadas para terapeutas (servem a qualquer serviço de atendimento)
  | "abordagem"
  | "processo"
  | "pacotes"
  | "faq";

export type Recorte = "reto" | "arco" | "circulo" | "pilula" | "blob" | "inclinado" | "folha";
/** Linguagem dos elementos gráficos soltos (formas, detalhes, selo, etiquetas sobre fotos). */
export type EstiloGrafico = "organico" | "geometrico" | "linear" | "artesanal" | "moderno";

/** src = null quando o arquivo ainda não existe em /public (o site mostra um espaço reservado). */
export type Foto = { src: string | null; alt: string };

export type SecaoLayout = { tipo: TipoSecao; variacao: Variacao; tom: Tom };

export type ClienteJson = {
  modoDemo: boolean;
  // @template
  pendencias?: string[];
  // @fim-template
  negocio: {
    nome: string;
    segmento: string;
    cidade: string;
    frase: string;
    descricao: string;
    selo?: string;
    /** registro profissional exibido no site, ex.: "Psicóloga · CRP 06/123456" (obrigatório para psicólogos) */
    registro?: string;
  };
  identidade: {
    logo?: string;
    recorte: Recorte;
    estilo: EstiloGrafico;
    /** ícone Lucide que representa o negócio (ex.: "Croissant", "Scissors", "Stethoscope") */
    icone: string;
    /** frase curta que gira no selo circular; vazia = sem selo */
    seloTexto: string;
    // @template
    origem?: { src: string; nota: string }[];
    // @fim-template
  };
  contato: {
    whatsapp: string;
    mensagemWhatsapp: string;
    telefone: string;
    email?: string;
    endereco: string;
    bairroCidade: string;
    mapsUrl?: string;
    horarios: { dias: string; horas: string }[];
  };
  redes: {
    instagram?: { usuario: string; url: string };
    facebook?: string;
    tiktok?: string;
  };
  fotos: {
    hero: Foto;
    sobre: Foto;
    cta: Foto;
  };
  sobre: {
    titulo: string;
    texto: string;
    manifesto: string;
    pilares: { icone: string; titulo: string; texto: string }[];
    numeros: { valor: string; rotulo: string }[];
  };
  servicos: {
    titulo: string;
    intro: string;
    itens: { icone: string; nome: string; descricao: string; preco?: string; foto?: Foto }[];
  };
  galeria: { titulo: string; fotos: Foto[] };
  avaliacoes: {
    titulo: string;
    /** nota média no Google; 0 = não mostrar nota (depoimentos sem Google) */
    nota: number;
    total: number;
    fonteUrl?: string;
    itens: { nome: string; nota?: number; texto: string; quando?: string }[];
  };
  abordagem?: {
    titulo: string;
    /** nome do método, ex.: "Terapia Cognitivo-Comportamental" */
    nome: string;
    texto: string;
    /** frase da profissional sobre o jeito de trabalhar */
    citacao?: string;
    pilares: { icone: string; titulo: string; texto: string }[];
    /** demandas e públicos atendidos, ex.: "Ansiedade", "Adolescentes" */
    temas: string[];
    foto?: Foto;
  };
  processo?: {
    titulo: string;
    intro: string;
    etapas: { titulo: string; texto: string }[];
    /** informações práticas, ex.: { icone: "Clock", rotulo: "Duração", valor: "50 minutos" } */
    detalhes: { icone: string; rotulo: string; valor: string }[];
  };
  pacotes?: {
    titulo: string;
    intro: string;
    itens: {
      nome: string;
      /** vazio = sem preço no site (obrigatório para psicólogos, salvo atendimento só online) */
      preco?: string;
      periodo?: string;
      descricao: string;
      inclui: string[];
      destaque?: boolean;
      /** ícone Lucide do formato, ex.: "Video", "Users", "MapPin" */
      icone?: string;
    }[];
    /** nota abaixo dos planos, ex.: "Emitimos recibo para reembolso do plano de saúde." */
    observacao?: string;
  };
  faq?: {
    titulo: string;
    itens: { pergunta: string; resposta: string }[];
  };
  cta: { titulo: string; texto: string; botao: string };
  layout: {
    navbar: Variacao;
    secoes: SecaoLayout[];
    rodape: { variacao: Variacao; tom: Tom };
    whatsappFlutuante: boolean;
  };
};
