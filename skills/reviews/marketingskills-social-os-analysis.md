# Analise das skills de marketing para o Loubfy OS

Fonte analisada: `coreyhaines31/marketingskills`, commit `bd8eb1a`, licenca MIT.

## Veredito geral

Vale muito trazer esse tipo de conhecimento para o projeto, mas eu nao instalaria tudo sem adaptar.

Essas skills foram escritas para marketing amplo, especialmente SaaS/B2B, pages, ads, SEO e growth. Nosso projeto e mais especifico: um sistema operacional para social media e criacao de conteudo guiada por agentes. Entao o melhor caminho e absorver os frameworks, transformar em modulos internos e reduzir o que nao serve.

Prioridade para o Loubfy OS:

1. `customer-research` como base de voz do cliente e pauta.
2. `content-strategy` como motor de pilares, ideias e calendario.
3. `social` como modulo obrigatorio complementar, mesmo nao estando na lista inicial.
4. `copywriting` como modulo de escrita persuasiva.
5. `image` como modulo visual e briefing de imagem.
6. `ad-creative` como modulo de performance criativa, adaptado para hooks e variantes organicas.
7. `co-marketing` como modulo secundario para collabs, parcerias e distribuicao.

## 1. image

### O que ela traz

Skill forte para briefing e producao de imagens de marketing: blog hero, social graphic, mockup, banner, OG image, perfil e otimizacao de imagem.

Pontos bons:

- separa quando usar geracao de imagem, edicao, design tool, screenshot real ou stock;
- tem checklist de briefing visual;
- reforca que UI de produto deve vir de screenshot real, nao de IA inventando interface;
- inclui dimensoes por plataforma;
- tem guia de prompt com estrutura: assunto, contexto, estilo, luz, composicao e specs tecnicas;
- inclui otimizacao web: WebP, tamanho, alt text, lazy loading.

### O que trazer

Trazer como modulo `visual-briefing`.

Entradas que o modulo deve pedir:

- tipo de asset: blog hero, carrossel, post unico, capa, thumbnail, banner, OG;
- plataforma e dimensao;
- objetivo do conteudo;
- brand guidelines;
- estilo visual desejado;
- referencias visuais;
- onde o texto entra: dentro da imagem ou como overlay posterior.

Entregaveis:

- prompt de imagem;
- prompt negativo ou restricoes;
- dimensoes;
- lista de elementos visuais;
- orientacao de composicao;
- nome de arquivo sugerido;
- recomendacao se deve gerar imagem, usar template ou capturar screenshot real.

### Adaptação necessaria

Para social media, essa skill precisa deixar claro que texto longo nao deve ser embutido na imagem por IA. Para carrossel, a imagem gerada deve ser fundo, conceito visual, ilustração ou asset de apoio; texto e layout devem ficar em template.

## 2. ad-creative

### O que ela traz

Skill de performance criativa para gerar variações de anuncios por plataforma. Tem bons frameworks de angulos, limites de caracteres e iteracao com dados.

Pontos bons:

- separa gerar do zero vs iterar com dados de performance;
- cria angulos antes de escrever variacoes;
- valida limites por plataforma;
- trabalha com lotes;
- estrutura relatorio de iteracao: vencedores, perdedores, novos testes.

### O que trazer

Trazer como modulo `creative-angles`.

Mesmo para social organico, o raciocinio de performance e excelente:

- 3 a 5 angulos por ideia;
- 5 a 10 hooks por angulo;
- variacoes por tom: direto, contrarian, historia, prova, tutorial;
- filtro de qualidade;
- log de iteracao com aprendizados.

Entregaveis:

- matriz de angulos;
- hooks por plataforma;
- CTAs;
- variações de legenda;
- briefing para criativo visual;
- plano de teste.

### Adaptação necessaria

Remover foco excessivo em Google Ads/RSAs quando o pedido for social organico. Usar a mesma disciplina para LinkedIn, Instagram, TikTok, Shorts e X.

## 3. co-marketing

### O que ela traz

Skill de parcerias: identifica parceiros com audiencia sobreposta, estrutura campanhas conjuntas e define responsabilidades.

Pontos bons:

- criterios claros de fit de parceiro;
- matriz de campanha: blog, webinar, newsletter swap, case study, giveaway, AMA, social takeover;
- perguntas para descobrir valor combinado;
- checklist de execucao;
- sucesso quantitativo e qualitativo.

### O que trazer

Trazer como modulo `collab-campaigns`.

Uso dentro do OS:

- planejar collabs de LinkedIn;
- criar posts coassinados;
- construir series com convidados;
- mapear perfis e marcas para parcerias;
- transformar um tema em live, webinar, carrossel compartilhado ou newsletter swap.

Entregaveis:

- lista de parceiros potenciais;
- score de fit;
- ideias de campanha;
- roteiro de abordagem;
- plano de publicacao conjunto;
- responsabilidades e metricas.

### Adaptação necessaria

Adicionar uma camada de creator-led social: collabs com pessoas, nao apenas empresas SaaS. Para social media, muitas parcerias serao com creators, especialistas, fundadores e comunidades.

## 4. content-strategy

### O que ela traz

Skill muito importante para decidir o que criar. Ela separa conteudo searchable e shareable, pilares, clusters, buyer stage, fontes de ideacao e scoring.

Pontos bons:

- obriga a conectar conteudo a objetivo de negocio;
- usa pesquisa de cliente, concorrentes, sales/support e forum mining;
- prioriza ideias com scoring;
- separa search demand de demand creation;
- cria pilares e clusters.

### O que trazer

Trazer como modulo `content-strategy`.

No nosso OS, esse modulo deve ser o primeiro passo de quase todo fluxo editorial.

Entregaveis:

- pilares editoriais;
- clusters de temas;
- backlog de ideias;
- classificacao por funil;
- score de prioridade;
- calendario editorial;
- recomendacao de formato por rede social.

### Adaptação necessaria

Adicionar uma ponte obrigatoria para social:

- um blogpost deve virar LinkedIn post, carrossel, short video, thread e newsletter snippet;
- cada pilar precisa ter formatos nativos por plataforma;
- cada ideia deve ter uma tese clara antes de virar post.

## 5. copywriting

### O que ela traz

Skill de copy persuasiva para landing pages e paginas de marketing. Embora nao seja social por natureza, os principios servem muito bem para hooks, legendas, CTAs e headlines de carrossel.

Pontos bons:

- clareza antes de criatividade;
- beneficios antes de features;
- especificidade antes de promessas vagas;
- linguagem do cliente antes de linguagem interna;
- frameworks de headline;
- estrutura de pagina persuasiva.

### O que trazer

Trazer como modulo `social-copywriting`.

Entregaveis:

- hook principal;
- legenda;
- CTA;
- texto de capa;
- headlines de slides;
- variações de tom;
- versao curta, media e longa;
- explicacao rapida da escolha quando util.

### Adaptação necessaria

Reduzir foco em homepage/landing page e adaptar para:

- LinkedIn post;
- carrossel;
- tweet/thread;
- roteiro curto;
- caption de Instagram;
- texto para thumbnail;
- texto para imagem.

## 6. customer-research

### O que ela traz

Essa e uma das skills mais importantes do conjunto. Ela transforma entrevistas, reviews, comentarios, tickets, Reddit, G2, YouTube e comunidades em insights, quotes, personas e jobs-to-be-done.

Pontos bons:

- separa analisar material existente vs buscar pesquisa online;
- captura pains, triggers, outcomes, vocabulario e alternativas;
- trabalha com confidence score;
- evita inventar personas sem base;
- cria banco de voz do cliente;
- inclui guias por fonte.

### O que trazer

Trazer como modulo `audience-research`.

Esse deve ser o modulo raiz do OS quando estivermos criando conteudo com profundidade.

Entregaveis:

- banco de quotes;
- temas recorrentes;
- mapa de dores;
- jobs-to-be-done;
- objeções;
- vocabulário do publico;
- ideias de conteudo derivadas da pesquisa;
- confianca de cada insight.

### Adaptação necessaria

Adicionar campos especificos para social:

- frases que viram hooks;
- perguntas que viram posts;
- comentarios que viram carrosseis;
- controversias que viram posts opinativos;
- objeções que viram conteudo educativo;
- exemplos reais que viram storytelling.

## 7. social (recomendacao complementar)

### Por que incluir

Apesar de nao estar na lista inicial, essa skill e central para o que estamos construindo. Ela cobre criação, repurposing, calendario, plataformas, hooks, engajamento e videos curtos.

### O que trazer

Trazer como modulo `social-distribution`.

Entregaveis:

- adaptacao por plataforma;
- calendario semanal;
- posts atomizados a partir de blogpost;
- roteiro de short video;
- carrossel;
- thread;
- plano de engajamento;
- revisao semanal de performance.

### Adaptação necessaria

Ela deve virar o orquestrador final: depois de pesquisa, estrategia, copy e imagem, o modulo social empacota tudo para cada rede.

## O que nao copiar diretamente

Nao recomendo copiar as skills inteiras sem curadoria. Motivos:

- muitas instrucoes sao SaaS/B2B genericas;
- algumas referencias citam ferramentas e precos que mudam;
- ha overlap entre social, ad-creative, copywriting e content-strategy;
- o nosso projeto precisa de uma taxonomia propria;
- skills muito grandes carregam contexto demais quando acionadas.

## Arquitetura recomendada

Em vez de instalar tudo bruto, criar skills internas menores:

1. `audience-research`
2. `content-strategy`
3. `social-copywriting`
4. `visual-briefing`
5. `carousel-builder`
6. `creative-angles`
7. `social-distribution`
8. `collab-campaigns`
9. `performance-review`

Cada skill interna deve ter:

- gatilhos claros;
- inputs minimos;
- workflow;
- formato de saida;
- links para referencias;
- pasta de outputs por conteudo.

## Proxima decisao

Minha recomendacao: criar primeiro o catalogo operacional e depois transformar os modulos mais usados em skills reais (`SKILL.md`). O primeiro pacote deveria ser:

1. `audience-research`
2. `content-strategy`
3. `social-copywriting`
4. `visual-briefing`
5. `carousel-builder`
6. `social-distribution`
