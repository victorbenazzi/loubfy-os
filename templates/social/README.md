# Social Templates

Templates renderizáveis vivem em código, alimentados por `post.json`.

Cada `post.json` deve declarar `accountId` para separar contas dentro da mesma plataforma. O caminho recomendado é:

```text
content/social-media/{platform}/{accountId}/{slug}/post.json
```

## V1 Templates

| Template | Uso |
|---|---|
| `authority-card` | imagem única com tese ou POV |
| `authority-carousel` | narrativa em slides para LinkedIn/Instagram |
| `checklist-carousel` | lista prática ou framework |
| `video-briefing` | vídeo curto ou híbrido com mídia real licenciada |

## Dimensões Recomendadas

| Nome | Tamanho |
|---|---:|
| quadrado | 1080x1080 |
| carrossel vertical | 1080x1350 |
| vídeo vertical | 1080x1920 |
| OG/horizontal | 1200x630 |
| thumbnail YouTube | 1280x720 |

## Convenções

- O layout final vem do template, não de texto solto dentro de imagens geradas por IA.
- Imagens e vídeos reais devem ter metadados de fonte e permissão.
- Backgrounds e imagens geradas por IA continuam separados de copy, assets e exports finais.
