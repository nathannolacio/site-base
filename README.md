# site-base

Template para gerar prévias de site one-page para negócios locais, rápido e com a identidade de cada marca.

Next.js 16 + Tailwind CSS 4, fontes auto-hospedadas (Fontsource), ícones Lucide. Sem banco de dados, sem CMS.

## Como usar com um cliente novo

1. No GitHub, clique em **Use this template** → crie `demo-nome-do-cliente` (privado).
2. Clone, instale e abra o Claude Code na pasta:
   ```bash
   git clone https://github.com/<seu-usuario>/demo-nome-do-cliente
   cd demo-nome-do-cliente
   pnpm install
   claude
   ```
3. Coloque prints do Instagram e as fotos do cliente em `public/cliente/` (veja abaixo).
4. Rode a skill `/site-rapido` (instalada na sua conta, fora deste repositório):
   ```text
   /site-rapido Nome do Negócio, Cidade-UF — instagram.com/... — maps: ...
   ```
5. Aprove a identidade em `http://localhost:3000/identidade` e deixe a skill terminar.

O repositório `demo-…` é interno. O cliente recebe a **entrega limpa** (abaixo).

## Entregar o código ao cliente

```bash
pnpm entrega            # cria ../site-<nome-do-cliente>
```

Gera uma pasta nova, com histórico git próprio, contendo só o site: as seções escolhidas, o conteúdo, as fotos e um README do cliente. Ficam de fora a prancha `/identidade`, o catálogo `/variacoes`, as variações não usadas, `CLAUDE.md`, `AGENTS.md`, este script, os prints do Instagram e as pendências. O modo demo é desligado (use `--manter-demo` para mantê-lo).

## Páginas

| Rota | Para quê |
|---|---|
| `/` | o site do cliente |
| `/identidade` | prancha de identidade visual para aprovar (cores, fontes, componentes, prévia) |
| `/variacoes` | catálogo com as 3 variações de cada seção |

As duas últimas ficam fora do Google (noindex).

## O que muda por cliente

| Arquivo | Conteúdo |
|---|---|
| `src/content/cliente.json` | textos, contatos, horários, avaliações, fotos, identidade e layout |
| `src/styles/tokens.css` | cores, fontes, formas |
| `src/styles/fontes.ts` | quais fontes carregar |
| `public/cliente/` | logo, fotos, prints do Instagram |

Componentes em `src/components/` não mudam por cliente.

### Layout no `cliente.json`

```json
"layout": {
  "navbar": 1,
  "secoes": [
    { "tipo": "hero", "variacao": 1, "tom": "claro" },
    { "tipo": "sobre", "variacao": 3, "tom": "claro" },
    { "tipo": "servicos", "variacao": 2, "tom": "suave" }
  ],
  "rodape": { "variacao": 3, "tom": "escuro" },
  "whatsappFlutuante": true
}
```

- `tipo`: `hero`, `sobre`, `servicos`, `galeria`, `avaliacoes`, `localizacao`, `cta`
- `variacao`: `1`, `2` ou `3` (veja em `/variacoes`)
- `tom`: `claro`, `suave`, `marca` ou `escuro` (fundo da seção)

### Fotos

```
public/cliente/
  logo.svg (ou .png)           → "identidade.logo": "/cliente/logo.svg"
  hero.jpg, sobre.jpg, cta.jpg
  servico-1.jpg ...
  galeria-1.jpg ...
  instagram/post-1.jpg ...     → prints usados na prancha
```

Enquanto uma foto não existe, o site mostra um espaço reservado nas cores da marca com a descrição da foto que deve entrar ali.

## Catálogo de variações

| Seção | 1 | 2 | 3 |
|---|---|---|---|
| Navbar | Clássica | Centralizada (faixa com telefone) | Pílula flutuante (links na pílula; menu em tela cheia no celular) |
| Hero | Dividida (composição com fotos) | Vitrine (fileira de fotos) | Imersiva (foto em tela cheia) |
| Sobre | Colagem com fotos | Números | Manifesto + pilares |
| Serviços | Grade de cards | Lista editorial | Carrossel com fotos |
| Galeria | Mosaico | Faixa contínua | Feed do Instagram |
| Avaliações | Grade (mural) | Destaque único | Faixa + nota grande |
| Localização | Mapa grande + card | Duas colunas | Bloco de contatos |
| Chamada final | Faixa larga | Foto de fundo | Cartão com assinatura |
| Rodapé | Completo | Minimalista | Nome gigante |

Para criar uma 4ª variação: crie o componente na pasta da seção, registre no `index.ts` da pasta, no tipo `Variacao` (`src/content/tipos.ts`) e na tabela `COMPONENTES` de `scripts/entrega.mjs`.

## Elementos gráficos

`identidade.estilo` no `cliente.json` define o desenho dos detalhes soltos (forma de fundo, detalhe, selo girando e etiquetas sobre fotos):

| Estilo | Desenho | Combina com |
|---|---|---|
| `organico` | formas arredondadas, folhas | cafés, padarias, floriculturas, pet shops |
| `geometrico` | círculos, meias-luas, blocos sólidos | escolas, academias, lojas infantis, eventos |
| `linear` | traço fino, arcos, brilhos | clínicas, estética, odontologia, advocacia |
| `artesanal` | carimbo, pontilhado, traço à mão | confeitarias, cervejarias, ateliês, restaurantes |
| `moderno` | grade técnica, cantos retos | barbearias, tatuagem, oficinas, tecnologia |

`identidade.icone` é o ícone Lucide do negócio (vai no selo e nas etiquetas) e `identidade.seloTexto` é a frase que gira no selo (vazia = sem selo).

## Modo demo

`"modoDemo": true` no `cliente.json` tira o site do Google (noindex) e mostra o selo "Prévia de proposta para …". Desligue quando o cliente fechar.

## Comandos

```bash
pnpm dev       # desenvolvimento em http://localhost:3000
pnpm build     # build de produção
pnpm lint
pnpm entrega   # cópia limpa para o cliente
```

Trechos de código que só fazem sentido no template ficam entre `// @template` e `// @fim-template`; a entrega remove esses trechos.

O conteúdo de exemplo (Alecrim, Campinas) é fictício.
