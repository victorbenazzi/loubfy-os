# HTML Rendering Pipeline

Este workflow transforma dados estruturados de post em imagens e vídeos finais.

## Entrada

Cada post renderizável deve ter um `post.json` dentro de:

```text
content/social-media/{platform}/{accountId}/{slug}/
```

O arquivo define:

- `platform`: canal de publicação;
- `accountId`: identificador da conta/perfil em kebab-case, como `instagram-institucional`, `instagram-founder` ou `cliente-x`;
- `format`: `single-image`, `static-carousel`, `video-carousel`, `hybrid-carousel` ou `video`;
- `template`: família visual;
- `dimensions`: tamanho final em pixels;
- `slides`: textos e mídia por cena/slide;
- `source`: metadados de origem, licença e permissão de cada mídia externa.

## Saída

Os exports ficam em:

```text
content/social-media/{platform}/{accountId}/{slug}/final/
```

Comandos:

```bash
npm run validate:post -- --input content/social-media/{platform}/{accountId}/{slug}/post.json
npm run render:image -- --input content/social-media/{platform}/{accountId}/{slug}/post.json
npm run render:video -- --input content/social-media/{platform}/{accountId}/{slug}/post.json
```

## Contas e Perfis

Use uma pasta por conta administrada dentro de cada plataforma:

```text
content/social-media/instagram/empresa-institucional/{slug}/
content/social-media/instagram/fundador/{slug}/
content/social-media/linkedin/ceo/{slug}/
```

`accountId` deve bater com a pasta. O validador avisa quando o `post.json` está fora da convenção.

Use a mesma raiz de projeto para contas que compartilham empresa, contexto, branding base e aprendizados. Use outra raiz de projeto quando a marca, público, oferta ou operação editorial forem realmente independentes.

## Rotas de Produção

- Imagem única e carrossel estático: Playwright renderiza HTML/CSS no tamanho exato e exporta PNG.
- Carrossel em vídeo, híbrido e vídeo: Remotion monta timeline React e exporta MP4 H.264.
- FFmpeg deve ser usado para cortes destrutivos, normalização, concatenação e conversão quando necessário.

## Regras de Mídia Real

- Não baixar/republicar vídeos de YouTube, X, Reels, TikTok ou outras plataformas sem permissão clara.
- `embed-only` e `unknown` não passam na validação de export.
- Mídia exportável precisa ser `owned`, `licensed`, `permission-granted` ou `public-domain`.
- Guarde URL original, criador, plataforma, permissão, observação de licença e crédito.

## Templates

Templates devem ser parametrizados por estrutura editorial, não por marca fixa:

- `authority-card`;
- `authority-carousel`;
- `checklist-carousel`;
- `instagram-comparison`;
- `instagram-editorial`;
- `video-briefing`.

As cores, fonte e nome vêm de `post.brand` e futuramente podem ser preenchidos a partir de `brand/design-system.md`.

Para Instagram, a família `instagram-editorial` usa `dimensions` de 1080 x 1350 px e permite escolher o layout por slide:

- `ig-cover-overlay`: imagem full-bleed com filtro escuro, perfil central, título grande e apoio;
- `ig-editorial-media`: fundo sólido, headline grande, imagem em frame e texto inferior;
- `ig-photo-essay`: imagem full-bleed com gradiente inferior, marcador circular e texto editorial.

A análise visual completa fica em `references/styles/instagram-editorial-templates.md`.

Os exemplos canônicos do template ficam em `references/templates/instagram-editorial/`. Trate essa pasta como fonte da verdade: use apenas como referência visual/layout e não altere seus arquivos sem pedido explícito do usuário. Novos posts devem ser criados e renderizados em `content/social-media/instagram/{accountId}/{slug}/`.

Para comparativos em Instagram, use a família `instagram-comparison` com o layout `ig-comparison-split`. Ela serve para comparar ferramentas, IAs, soluções, linguagens, serviços ou produtos físicos em dois lados. O conteúdo comparativo deve entrar no campo estruturado `slide.comparison.left` e `slide.comparison.right`, não como texto solto. Os exemplos canônicos ficam em `references/templates/instagram-comparison/` e seguem a mesma regra de fonte da verdade protegida.
