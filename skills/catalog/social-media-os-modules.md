# Catalogo de modulos do Loubfy OS

Este arquivo lista os assuntos que o Loubfy OS deve conseguir rodar sob demanda.

Use como roteador: quando uma tarefa aparecer, identifique o modulo, leia o contexto do conteudo e entregue no formato esperado.

## Status de interoperabilidade

Os modulos abaixo ja existem como skills convencionais em `skills/{nome}/SKILL.md`.

Para verificar discovery local:

```bash
npx skills add . --list
```

Para instalar todas em um agente compativel:

```bash
npx skills add . --all --copy
```

Para instalar uma skill especifica:

```bash
npx skills add . --skill social-copywriting --agent codex --copy -y
```

## 0. onboarding

Use quando:

- o projeto estiver sendo configurado pela primeira vez;
- um novo negocio/cliente/marca for onboardado;
- o usuario pedir `/onboarding`, onboarding, setup, configuracao inicial ou aliases antigos como `/marketing-os-init` e `/init-marketing-os`;
- o projeto ja tiver setup e o usuario quiser ajustar ou refazer a configuracao.

Inputs:

- respostas do usuario em turnos;
- links, referencias, concorrentes, redes sociais e preferencias;
- arquivos existentes em `context/`, `brand/`, `guidelines/`, `memory/`.

Entregaveis:

- arquivos de contexto preenchidos;
- brand/design system inicial;
- guidelines e guardrails;
- handles e canais sociais;
- memoria persistente;
- status de inicializacao em `memory/project-state.yml`.

## 1. audience-research

Use quando:

- precisar entender o publico;
- analisar comentarios, reviews, entrevistas, tickets ou pesquisas;
- buscar dores, objeções, linguagem do cliente ou ideias de pauta;
- montar ICP, persona ou JTBD.

Inputs:

- produto/marca;
- publico-alvo;
- fontes disponiveis;
- objetivo da pesquisa;
- segmento ou recorte.

Entregaveis:

- temas recorrentes;
- quotes;
- mapa de dores;
- triggers;
- outcomes desejados;
- objeções;
- vocabulario do publico;
- ideias de conteudo;
- nivel de confianca.

## 2. content-strategy

Use quando:

- precisar decidir o que postar;
- montar pilares;
- planejar calendario;
- transformar pesquisa em pauta;
- organizar blogposts, social posts e series.

Inputs:

- objetivo de negocio;
- publico;
- brand guidelines;
- pesquisa de cliente;
- canais prioritarios;
- cadencia desejada.

Entregaveis:

- pilares editoriais;
- clusters;
- backlog priorizado;
- score de ideias;
- calendario;
- formato recomendado por plataforma.

## 3. social-copywriting

Use quando:

- precisar escrever ou melhorar texto de post;
- criar hooks;
- escrever legenda;
- criar CTA;
- escrever textos de carrossel;
- adaptar um blogpost para social.

Inputs:

- ideia central;
- publico;
- plataforma;
- tom de voz;
- objetivo do post;
- formato.

Entregaveis:

- hook;
- corpo do post;
- CTA;
- variações;
- texto curto/medio/longo;
- textos para imagem ou slides.

## 4. visual-briefing

Use quando:

- precisar criar uma imagem;
- definir direcao visual;
- preparar prompt para imagem;
- gerar capa, thumb, hero, background ou asset visual;
- decidir se o visual deve ser IA, template, screenshot ou design manual.

Inputs:

- formato;
- dimensoes;
- rede social;
- mensagem central;
- brand guidelines;
- referencias;
- restricoes.

Entregaveis:

- briefing visual;
- prompt de imagem;
- composicao;
- paleta/direcao;
- elementos a evitar;
- nome de arquivo;
- recomendacao de fluxo.

## 5. carousel-builder

Use quando:

- quiser transformar uma ideia em carrossel;
- criar estrutura slide a slide;
- adaptar blogpost para carrossel;
- criar texto para arte;
- definir narrativa visual.

Inputs:

- tema;
- tese;
- publico;
- plataforma;
- numero de slides;
- objetivo;
- CTA.

Entregaveis:

- titulo de capa;
- slides numerados;
- texto de cada slide;
- notas visuais por slide;
- legenda do post;
- CTA;
- prompt/brief para imagem de apoio.

## 6. creative-angles

Use quando:

- quiser varias abordagens para o mesmo tema;
- gerar hooks em massa;
- testar formatos;
- criar variações de campanha;
- iterar com dados de performance.

Inputs:

- oferta/tema;
- publico;
- plataforma;
- resultado desejado;
- dados de performance, se houver;
- restricoes de marca.

Entregaveis:

- matriz de angulos;
- hooks por angulo;
- variações de copy;
- hipoteses de teste;
- plano de proxima iteracao.

## 7. social-distribution

Use quando:

- adaptar um conteudo para varias redes;
- transformar blogpost em posts;
- criar calendario semanal;
- planejar distribuicao;
- definir cadencia por canal.

Inputs:

- conteudo base;
- redes sociais;
- objetivo;
- datas;
- restricoes;
- assets disponiveis.

Entregaveis:

- versao LinkedIn;
- versao Instagram;
- versao X/Threads;
- roteiro TikTok/Reels/Shorts;
- calendario;
- checklist de publicacao.

## 8. collab-campaigns

Use quando:

- buscar parceiros;
- planejar collab;
- criar campanha conjunta;
- montar social takeover, live, webinar, post coassinado ou newsletter swap.

Inputs:

- objetivo da parceria;
- publico;
- possiveis parceiros;
- assets disponiveis;
- canais;
- proposta de valor.

Entregaveis:

- lista de parceiros;
- score de fit;
- ideias de campanha;
- mensagem de abordagem;
- plano de execucao;
- metricas.

## 9. performance-review

Use quando:

- revisar o que funcionou;
- analisar metricas;
- decidir o que repetir;
- transformar aprendizados em novas pautas.

Inputs:

- posts publicados;
- metricas;
- plataforma;
- periodo;
- objetivo original.

Entregaveis:

- top posts;
- padroes vencedores;
- padroes fracos;
- aprendizados;
- proximas hipoteses;
- backlog atualizado.

## Fluxo recomendado por tipo de tarefa

### Criar conteudo do zero

1. `audience-research`
2. `content-strategy`
3. `creative-angles`
4. `social-copywriting`
5. `visual-briefing`
6. `social-distribution`

### Criar carrossel

1. `content-strategy`
2. `creative-angles`
3. `carousel-builder`
4. `visual-briefing`
5. `social-copywriting`

### Transformar blogpost em social

1. `content-strategy`
2. `social-distribution`
3. `social-copywriting`
4. `carousel-builder`, se for carrossel
5. `visual-briefing`, se precisar de imagem

### Rodar collab

1. `audience-research`
2. `collab-campaigns`
3. `content-strategy`
4. `social-copywriting`
5. `social-distribution`

### Melhorar performance

1. `performance-review`
2. `creative-angles`
3. `social-copywriting`
4. `content-strategy`
