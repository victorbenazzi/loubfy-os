# Modelo operacional do Loubfy OS

## Principio

Todo conteudo deve nascer de uma destas quatro fontes:

1. pesquisa de audiencia;
2. tese editorial;
3. oportunidade de distribuicao;
4. dado de performance.

Se uma ideia nao vem de nenhuma delas, ela precisa ser validada antes de virar producao.

## Inicializacao

Antes de usar o Loubfy OS em um novo negocio, rode a skill `onboarding`.

Ela entrevista o usuario em fases, popula `context/`, `brand/`, `guidelines/`, `references/`, `hooks/` e `memory/`, e marca o setup em:

```text
memory/project-state.yml
```

Se o init ja tiver sido rodado, o agente deve perguntar se o usuario quer ajustar um topico, refazer preservando o contexto antigo, ou sobrescrever a configuracao.

## Estrutura de pasta por conteudo

Modelo recomendado:

```text
content/social-media/{rede}/{slug-do-conteudo}/
  brief.md
  research.md
  copy.md
  carousel.md
  image-brief.md
  assets/
  final/
  performance.md
```

Para blogposts:

```text
content/blogposts/{slug-do-post}/
  brief.md
  research.md
  outline.md
  draft.md
  social-distribution.md
  assets/
  final/
```

## Checklist de conteudo

Antes de produzir:

- objetivo claro;
- publico definido;
- plataforma definida;
- tese em uma frase;
- formato escolhido;
- CTA definido;
- brand guidelines aplicadas.

Antes de publicar:

- hook forte;
- texto revisado;
- visual coerente;
- CTA claro;
- nome de arquivo padronizado;
- legenda e texto da imagem separados;
- fonte/referencia registrada quando houver.

Depois de publicar:

- metricas registradas;
- aprendizados anotados;
- proximas variações sugeridas;
- asset final salvo.

## Handoffs entre modulos

O protocolo detalhado de orquestracao vive em `workflows/agent-orchestration.md`.

Use este resumo como mapa editorial:

`audience-research` gera linguagem e dores para `content-strategy`.

`content-strategy` gera tese e pauta para `creative-angles`.

`creative-angles` gera abordagens para `social-copywriting`.

`social-copywriting` gera texto para `carousel-builder` e `social-distribution`.

`visual-briefing` gera prompt e direcao visual para imagem.

`performance-review` retroalimenta `creative-angles` e `content-strategy`.

Quando a interface suportar subagentes, esses handoffs podem rodar com os agent cards em `agents/roster/`. Quando nao suportar, o agente principal deve simular os mesmos papeis em sequencia usando as skills correspondentes.

## Padrao de nome

Use slugs em ingles ou portugues sem acento, sempre em kebab-case.

Exemplo:

```text
claude-ai-vs-cowork-vs-code
```

## Proxima etapa

Os modulos principais ja foram convertidos em skills internas com `SKILL.md`.

A orquestracao agent-native foi separada em:

- `workflows/agent-orchestration.md`
- `agents/README.md`
- `agents/roster/`
- `agents/templates/`
- `skills/catalog/agent-role-map.md`

Validar discovery local com:

```bash
npx skills add . --list
```

Skills disponiveis:

1. `onboarding`
2. `audience-research`
3. `content-strategy`
4. `social-copywriting`
5. `carousel-builder`
6. `visual-briefing`
7. `creative-angles`
8. `social-distribution`
9. `collab-campaigns`
10. `performance-review`
