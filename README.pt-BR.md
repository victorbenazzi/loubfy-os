# Loubfy OS

🇺🇸 [English version](README.md)

O Loubfy OS é um sistema operacional de conteúdo reutilizável para produção de social media e blog com agentes de IA.

Ele armazena contexto de marca, pesquisa de público, regras editoriais, referências visuais, rascunhos de conteúdo, assets renderizáveis, documentação de workflow e skills reutilizáveis para qualquer empresa, criador, página ou cliente configurado no onboarding.

Loubfy OS é o nome do projeto/produto reutilizável — o onboarding define a empresa ou o perfil social que será gerenciado de fato.

## Para Quem É

- Criadores e times que querem um fluxo de conteúdo repetível.
- Agências que querem um modelo operacional por cliente ou marca.
- Usuários de agentes de IA que querem contexto estruturado, skills reutilizáveis e limites de arquivo previsíveis.
- Desenvolvedores que querem assets sociais renderizáveis a partir de arquivos de conteúdo versionados.

## Requisitos

- Git
- Node.js 20+
- npm
- Uma interface de agente/coding AI como Claude Code, Codex, Gemini CLI, OpenCode ou outro agente capaz de ler instruções do repositório.

## Início Rápido

```bash
git clone https://github.com/victorbenazzi/loubfy-os my-content-os
cd my-content-os
npm install
npm run typecheck
```

O `npm install` também vincula a camada nativa de skills do Claude Code (veja [Como os Agentes Usam Este Repositório](#como-os-agentes-usam-este-repositório)).

Depois, peça ao seu agente:

```text
Leia AGENTS.md e execute o onboarding para configurar este projeto.
```

Se você usa Claude Code, peça para ele ler o `CLAUDE.md`. Se usa agentes no estilo Gemini, peça para lerem o `GEMINI.md`.

Para rodar o Loubfy OS para mais de uma marca ou cliente, clone o repositório uma vez por marca, em uma pasta raiz separada — não misture dois negócios no mesmo repositório.

## Como os Agentes Usam Este Repositório

O Loubfy OS é **agnóstico de agente** e **skill-first**. Ele funciona da mesma forma no Claude Code, Codex, Gemini CLI, OpenCode, Hermes e outras interfaces de agente.

### Fontes autoritativas

Estes arquivos são a fonte única de verdade e funcionam em qualquer agente — não precisam de instalação, o agente apenas os lê:

- `AGENTS.md` — regras do projeto, estrutura e modelo operacional.
- `skills/{nome-da-skill}/SKILL.md` — o processo durável de cada capacidade.
- `agents/roster/` — definições de papéis portáteis para trabalho delegado.

### Camadas nativas por agente

Algumas interfaces suportam skills nativas, subagentes, slash commands e hooks. Este repositório traz camadas por agente que são **puramente aditivas** — um agente que não suporta uma camada simplesmente a ignora. As camadas só apontam de volta para as fontes autoritativas; elas nunca as bifurcam.

**Claude Code** — a camada `.claude/` fica pronta após o `npm install`, no macOS, Linux e Windows:

| Caminho | O que entrega |
|---|---|
| `.claude/skills/` | Um vínculo para `skills/` para que as skills disparem nativamente. Gerado pelo `npm install` (symlink no macOS/Linux, junction no Windows) — não é commitado. Reconstrua a qualquer momento com `npm run setup:claude`. |
| `.claude/agents/` | Os papéis de `agents/roster/` como subagentes reais para subtarefas independentes e paralelas. |
| `.claude/commands/onboarding.md` | Registra o slash command `/onboarding`. |
| `.claude/settings.json` | Uma allowlist de permissões para os scripts npm do projeto, mais um hook `PreToolUse` que pede confirmação antes de qualquer edição dentro de `references/templates/` (templates protegidos, fonte de verdade). |

Nunca edite arquivos dentro de `.claude/skills/` — edite `skills/`.

**Outros agentes** — instale as skills nativamente com:

```bash
npx skills add . --agent <codex|gemini|...> --copy
```

### Modelo operacional

- Use o menor modelo de execução que produz um resultado de alta qualidade: uma skill para tarefa pontual, skills encadeadas para trabalho multi-etapa, subagentes apenas para fluxos independentes e paralelos.
- O agente principal age como editor-chefe: roteia o trabalho, consolida saídas, protege os limites de arquivo e faz o passe final de qualidade.
- Nenhum runtime de swarm externo é necessário.

Veja `workflows/agent-orchestration.md` para o protocolo completo de orquestração.

## Inicialização

Antes de trabalho estratégico de conteúdo, os agentes checam:

```text
memory/project-state.yml
```

Se `loubfy_os_initialized` não for `true`, execute a skill de onboarding (ou `/onboarding` no Claude Code) antes de produzir conteúdo estratégico. O onboarding entrevista o usuário e preenche `context/`, `brand/`, `guidelines/`, `hooks/` e `memory/`.

## Modelo do Repositório

```text
context/          Contexto de empresa, público, oferta, canal e página.
brand/            Design system, branding, cores, tipografia, logos, regras visuais.
guidelines/       Voz, tom, regras de conteúdo e guardrails.
images/           Assets de imagem gerados, captados, em produção e exportados.
references/       Inspiração externa, screenshots, notas de fonte e templates.
content/          Rascunhos e conteúdo final de social media, blogs e newsletters.
memory/           Decisões, estado, variáveis e contexto recorrente persistentes.
agents/           Agent cards portáteis, templates de handoff e definições de papel.
skills/           Skills reutilizáveis de agente, cada uma com seu SKILL.md.
workflows/        Modelos operacionais e documentação de workflow.
scripts/          Chamadas de API, automações e utilitários repetíveis.
hooks/            Fórmulas de hook social, hooks testados e padrões de hook.
.claude/          Camada nativa do Claude Code (aditiva — outros agentes ignoram).
```

## Skills

Cada skill é uma capacidade autocontida em `skills/{nome-da-skill}/SKILL.md`:

| Skill | Use para |
|---|---|
| `onboarding` | Configurar ou reconfigurar o projeto para uma empresa, criador ou cliente. |
| `audience-research` | Mapear ICP, dores, objeções, JTBD e voz do cliente. |
| `content-strategy` | Definir pilares, clusters de tema, calendários e backlog. |
| `creative-angles` | Gerar hooks, matrizes de ângulo e hipóteses de teste. |
| `social-copywriting` | Escrever posts, legendas, hooks, CTAs e textos de imagem nativos da plataforma. |
| `carousel-builder` | Montar estrutura e texto de carrossel slide a slide. |
| `visual-briefing` | Planejar direção de imagem, prompts e specs visuais. |
| `social-distribution` | Repurposar um asset entre plataformas e planejar a publicação. |
| `collab-campaigns` | Planejar co-marketing e colaborações com criadores. |
| `performance-review` | Interpretar métricas e decidir o que repetir ou testar. |

Listar skills detectáveis:

```bash
npm run skills:list
```

## Caminhos de Conteúdo

Conteúdo social:

```text
content/social-media/{platform}/{accountId}/{slug}/
```

Arquivos recomendados:

```text
brief.md
research.md
copy.md
carousel.md
image-brief.md
assets/
final/
performance.md
```

Blogposts:

```text
content/blogposts/{slug}/
```

Arquivos recomendados:

```text
brief.md
research.md
outline.md
draft.md
social-distribution.md
assets/
final/
```

Use slugs em kebab-case (`comparativo-ferramentas-ia`). Sempre use um `accountId` explícito, mesmo quando a plataforma tem só um perfil.

## Configuração Rápida de Conta

Crie a pasta de uma conta social gerenciada e seu arquivo de contexto:

```bash
npm run account:create -- \
  --platform linkedin \
  --account-id principal \
  --display-name "Perfil Principal" \
  --notes "Conta principal da marca"
```

Isso cria:

```text
content/social-media/linkedin/principal/
context/accounts/linkedin-principal.md
```

## Renderização

Este repositório template não traz posts dentro de `content/`. Crie um post em uma nova pasta `content/social-media/{platform}/{accountId}/{slug}/` e então:

```bash
# Validar um arquivo de post
npm run validate:post -- --input content/social-media/linkedin/principal/example/post.json

# Renderizar uma imagem
npm run render:image -- --input content/social-media/linkedin/principal/example/post.json

# Renderizar um vídeo
npm run render:video -- --input content/social-media/linkedin/principal/example/post.json
```

## Arquivos de Instrução por Agente

| Arquivo | Lido por |
|---|---|
| `AGENTS.md` | Codex, OpenCode, Hermes e agentes genéricos — a fonte de verdade. |
| `CLAUDE.md` | Claude Code — aponta de volta para `AGENTS.md` e documenta a camada `.claude/`. |
| `GEMINI.md` | Gemini CLI e agentes no estilo Gemini — apontam de volta para `AGENTS.md`. |

Quando as instruções conflitam, siga esta ordem: pedido atual do usuário → `AGENTS.md` → skill relevante → arquivos de contexto da pasta.

## Desenvolvimento

```bash
npm install        # instala dependências e vincula a camada de skills do .claude/
npm run typecheck  # checa os tipos do pipeline de post/render
```

Scripts úteis:

```bash
npm run account:create   # criar uma conta social gerenciada
npm run validate:post    # validar um arquivo post.json
npm run render:image     # renderizar um post como imagem
npm run render:video     # renderizar um post como vídeo
npm run skills:list      # listar skills detectáveis
npm run setup:claude     # reconstruir o vínculo .claude/skills (rode se as skills sumirem)
```

## Tornando Seguro Para Publicar

Antes de compartilhar o repositório publicamente ou transformá-lo em template:

- Remova dados privados de cliente/empresa de `context/`, `brand/` e `memory/`.
- Mantenha `content/` vazio, exceto pelos arquivos `.gitkeep`; os templates visuais canônicos ficam em `references/templates/`.
- Remova segredos, chaves de API, cookies e arquivos de ambiente locais.
- Mantenha assets finais gerados apenas quando forem parte da demo pública.
- Escolha e adicione uma licença se outras pessoas puderem usar, modificar ou redistribuir o projeto.
- Confirme que toda imagem, fonte ou referência de terceiros pode ser compartilhada.

Veja [docs/reuse-checklist.md](docs/reuse-checklist.md) para um checklist de release mais detalhado.

## Licença

Nenhuma licença foi escolhida ainda. Adicione um arquivo `LICENSE` antes de publicar este repositório para reuso público.
