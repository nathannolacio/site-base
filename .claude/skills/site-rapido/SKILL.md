---
name: site-rapido
description: Use para gerar rápido a prévia de site one-page de um negócio prospectado, a partir do nome, Instagram e Google Maps, personalizando este template (site-base) com a identidade da marca e uma prancha visual para aprovar.
---

# Site rápido (prévia para prospecção)

Objetivo: em 1h30–2h, transformar este template numa one-page com a identidade da marca tirada do Instagram, pronta para mostrar ao dono do negócio. **Não escreva o site do zero**: o template já tem todas as seções prontas. O trabalho é preencher conteúdo, definir a identidade e escolher a combinação de variações.

## O que muda de um cliente para outro (e só isso)

| Arquivo | O quê |
|---|---|
| `src/content/cliente.json` | textos, contatos, horários, avaliações, fotos, identidade (recorte, assinatura, origem), pendências e **layout** (variação e tom de cada seção) |
| `src/styles/tokens.css` | cores, fontes, personalidade dos títulos, raios, sombra |
| `src/styles/fontes.ts` + `package.json` | as duas fontes (pacotes `@fontsource-variable/*`) |
| `public/cliente/` | logo, fotos do site e prints do Instagram (`public/cliente/instagram/`) |
| `src/app/favicon.ico` | ícone da marca, se houver logo |

Não edite componentes em `src/components/` para atender um cliente. Se algo realmente não couber nas variações, avise o usuário e sugira criar uma nova variação no template base (vale para todos os clientes).

## Entradas

Espere: nome do negócio, cidade, link do Instagram, link do Google Maps. Opcional: prints do perfil e das avaliações, logo e fotos já em `public/cliente/`.
Não faça perguntas antes de começar. Faltou algo: siga e registre em `pendencias` no cliente.json.

## Passo 1 — Coleta (até 15 min)

- Leia os links e faça 1–3 buscas pelo nome + cidade.
- Instagram e Maps costumam bloquear leitura automática: use os prints e fotos que o usuário mandou. Se não houver, peça em uma linha e continue com o resto.
- Extraia: o que vende, para quem, serviços/produtos, WhatsApp/telefone, endereço, horários, diferenciais, nota média e total de avaliações, 3–6 avaliações boas (primeiro nome, nota, trecho, quando), tom de voz.
- **Nunca invente** telefone, endereço, preço, nota, número de avaliações, depoimento, ano de fundação ou qualquer número. O que faltar vai para `pendencias` e, se o campo for obrigatório, fica com um valor claramente provisório.

## Passo 2 — Identidade a partir do Instagram

Abra de fato a logo, os prints e as fotos (Read nas imagens).

- **Cores:** extraia os hex com um script (Pillow, quantização em 6–8 cores) da logo primeiro, depois do feed. Monte os 8 tokens `--cor-*`. Regras:
  - `--cor-marca` é a cor mais característica da marca, não necessariamente a mais frequente.
  - `--cor-fundo` quase nunca é branco puro: um tom muito claro puxado para a paleta da marca. Evite o creme genérico (#F4F1EA e vizinhos) se a marca não for creme.
  - `--cor-destaque` contrasta com a marca (estrelas, selos, botões sobre fundo da marca).
  - Contraste mínimo 4,5:1 em texto/fundo, marca-contraste/marca e sobre-destaque/destaque. A prancha mostra o contraste; corrija o que der "Só em títulos" ou "Ilegível".
- **Fontes:** identifique o estilo da logo e dos posts (serifada, script, geométrica, condensada, arredondada, grotesca) e escolha o par mais próximo no Fontsource (prefira versões variáveis). Fonte de título com personalidade; fonte de texto muito legível. Instale com pnpm, troque os imports em `fontes.ts` e os nomes em `tokens.css`. Ajuste `--titulo-peso`, `--titulo-espacamento` e `--titulo-caixa` para imitar os posts.
- **Formas:** `--raio`, `--raio-grande` e `--raio-botao` seguem a marca (marca orgânica = raios grandes e botão pílula; marca técnica/jurídica = raios pequenos ou zero).
- **Recorte de foto** (`identidade.recorte`): `reto`, `arco`, `circulo`, `pilula`, `blob`, `inclinado`, `folha`. Escolha por algo real da marca (portas em arco do salão, logo redonda, folha no logo...).
- **Assinatura** (`identidade.assinatura`): `pontos`, `ondas`, `arcos`, `blob`, `selo`, `nenhuma`. Escolha pelo grafismo que aparece nos posts.
- **Origem** (`identidade.origem`): 4 prints/fotos do Instagram em `public/cliente/instagram/`, cada um com uma frase dizendo o que foi tirado dele.
- Se a marca não tem identidade clara, proponha uma coerente com o segmento e as fotos, e diga que é proposta.

## Passo 3 — Conteúdo e combinação de variações

Preencha o `cliente.json` inteiro. Textos em português do Brasil, no tom do negócio, curtos:
- `negocio.frase` (título do hero): até 9 palavras.
- `negocio.selo`: um fato curto e verdadeiro (ou vazio).
- `sobre.numeros`: só números confirmados. Se não houver 3, não use a variação Sobre 2.

Abra `/variacoes` para ver todas as opções. Escolha **uma combinação por cliente** com estas regras:

| Seção | Use a variação… | quando… |
|---|---|---|
| Navbar | 1 Clássica | padrão, serve para quase tudo |
| | 2 Centralizada | marcas tradicionais/elegantes, ou horário e telefone importam muito |
| | 3 Pílula | marcas jovens, de moda, beleza, estúdio |
| Hero | 1 Dividida | há uma boa foto de produto, pessoa ou ambiente |
| | 2 Tipográfica | fotos fracas ou nome forte (profissionais liberais, escritórios, estúdios) |
| | 3 Imersiva | há uma foto horizontal excelente do ambiente (restaurante, salão, pousada) |
| Sobre | 1 Foto com moldura | há foto do dono/equipe/processo |
| | 2 Números | há 3–4 números reais e bons |
| | 3 Manifesto | marca com propósito ou jeito próprio de trabalhar |
| Serviços | 1 Grade | 3–8 serviços sem foto própria |
| | 2 Lista editorial | cardápio curto, tratamentos, especialidades |
| | 3 Carrossel | cada serviço/produto tem foto bonita |
| Galeria | 1 Mosaico | 4–8 fotos variadas |
| | 2 Faixa contínua | muitas fotos parecidas; dá movimento |
| | 3 Feed do Instagram | negócio que vive do Instagram |
| Avaliações | 1 Grade | 4–9 avaliações de tamanhos variados |
| | 2 Destaque único | poucas avaliações, muito boas |
| | 3 Faixa + nota | nota alta e muitas avaliações |
| Localização | 1 Mapa + card | cliente vai até o local |
| | 2 Duas colunas | horários complicados |
| | 3 Bloco de contatos | atende mais por WhatsApp/telefone |
| CTA | 1 Faixa | fechamento direto |
| | 2 Foto de fundo | há foto emocional (comida, resultado) |
| | 3 Cartão | fechamento com mais personalidade |
| Rodapé | 1 Completo | muita informação |
| | 2 Minimalista | página já fecha com CTA forte |
| | 3 Nome gigante | nomes curtos (até ~10 letras) |

Combinação:
- **Hero Imersiva (3) e CTA Foto (2) já são escuros**; não coloque uma seção de tom `escuro` ou `marca` logo depois de cada uma.
- **Alterne os tons**: nunca duas seções seguidas no mesmo tom (exceto `claro`). Use `marca` ou `escuro` em 1–2 seções para dar ritmo.
- Evite repetir o mesmo "formato" em seções vizinhas (ex.: Serviços Grade logo antes de Avaliações Grade).
- Não repita a combinação do cliente anterior. Varie pelo menos hero, serviços e avaliações.
- A ordem padrão é hero → sobre → serviços → galeria → avaliações → localização → cta. Pode mudar se fizer sentido (ex.: avaliações logo após o hero quando a nota é o maior trunfo).

## Passo 4 — Prancha de identidade (ÚNICO ponto de aprovação)

1. Rode `pnpm build` e corrija erros. Rode `pnpm dev` (ou peça ao usuário) e abra `/identidade`, se tiver navegador.
2. A prancha `/identidade` já existe e lê tudo de `tokens.css` e `cliente.json`: origem, cores com contraste, fontes, componentes, tons de seção, ícones, forma e assinatura, prévia do site real (computador e celular) e resumo com a estrutura e as pendências. Não precisa criá-la.
3. Confira na prancha: contrastes "Legível", fontes carregando, nada estourando no celular.
4. Diga ao usuário, em poucas linhas: as cores e fontes escolhidas e de onde vieram, a combinação de seções e as pendências. Termine com: "Abra http://localhost:3000/identidade. Posso seguir assim?"
5. **Pare e espere o ok.** Ajustes ("principal mais escura", "título menos sério", "troca o hero") são feitos nos tokens ou no cliente.json; a prancha atualiza sozinha. Se o usuário pediu para não parar, siga e diga que seguiu.

## Passo 5 — Finalização

- Fotos: otimize as de `public/cliente/` (máx. ~1600px no lado maior, JPG qualidade ~80).
- `"modoDemo": true` (noindex + selo "Prévia de proposta").
- `pnpm lint` e `pnpm build` sem erros.
- Checklist:
  - [ ] Nenhum espaço reservado "Foto: ..." visível no site (todas as fotos existem) — ou o usuário sabe quais faltam
  - [ ] Nome, telefone, endereço, horários e nota batem com as fontes
  - [ ] Links de WhatsApp e telefone corretos
  - [ ] Sem rolagem horizontal em 375px
  - [ ] Contrastes legíveis na prancha
- Só diga que verificou visualmente se abriu a página num navegador; senão, diga que verificou build e código.

## Passo 6 — Entrega

Responda curto:
- Como ver: `pnpm dev` → http://localhost:3000 (site), /identidade (prancha), /variacoes (catálogo)
- Pendências a confirmar
- Mensagem de abordagem pronta (WhatsApp/Direct, 4–6 linhas): quem é o usuário, que montou uma prévia do site do negócio, convite para ver o link e conversar 10 minutos. Sem preço.

Não publique na Vercel nem configure domínio sem autorização explícita. A prévia usa a marca do cliente: deve ser mostrada só a ele e tirada do ar se ele não fechar.

## Não fazer

Escrever componentes do zero, pesquisar referências externas, documentos longos, relatórios, várias páginas, formulário, blog, CMS, inventar dados.
