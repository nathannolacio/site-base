@AGENTS.md

# Projeto: prévia de site para prospecção (template site-base)

- Para montar o site de um cliente, use a skill pessoal `/site-rapido`. Para entregar o código ao cliente, `npm run entrega` (nunca entregue este repositório).
- Por cliente, altere só: `src/content/cliente.json`, `src/styles/tokens.css`, `src/styles/fontes.ts` (+ pacotes de fonte), `public/cliente/` e o favicon.
- Não edite componentes em `src/components/` para atender um cliente específico. Se faltar algo, avise e proponha uma nova variação para o template base.
- Componentes usam só as cores semânticas (`fundo`, `texto`, `texto-suave`, `cartao`, `acento`, `sobre-acento`, `linha`), que mudam conforme o `data-tom` da seção. Nunca use cores fixas nos componentes.
- Nunca invente dados do cliente (telefone, endereço, nota, avaliações, números). O que faltar vai em `pendencias` no cliente.json.
- Rode `npm run lint` e `npm run build` antes de dizer que terminou.
- Não publique (Vercel, domínio) sem autorização explícita do usuário.
