# Analise da skill gpt-image-2

## Veredito

Podemos usar a ideia da skill no projeto, mas ela deve entrar como ferramenta opcional para geracao e edicao de imagens, nao como base principal do workflow editorial.

Importante: neste ambiente do Codex app, o agente ja consegue gerar imagens. A ressalva desta analise e sobre a skill externa `gpt-image-2` especificamente, porque o script dela depende do `codex` CLI instalado no shell.

Ela e boa para:

- gerar imagens de apoio para blogposts;
- criar referencias visuais para carrosseis;
- transformar uma imagem de referencia em outra estetica;
- criar variações rapidas para testes de direcao visual;
- compor imagens a partir de multiplas referencias.

Ela nao e ideal para:

- layouts finais de carrossel com tipografia precisa;
- templates consistentes de marca;
- automacoes reproduziveis em equipe;
- pipelines que precisam funcionar sem uma sessao local do Codex/ChatGPT;
- producao via API com controle de custo, logs e versionamento.

## Como ela funciona

A skill instala um `SKILL.md` e dois scripts:

- `scripts/gen.sh`: chama `codex exec --enable image_generation`;
- `scripts/extract_image.py`: extrai a imagem em base64 dos arquivos de sessao do Codex e salva como PNG/JPG/WebP.

Ou seja: ela nao chama diretamente a OpenAI API. Ela usa o Codex CLI local, aproveitando a sessao ChatGPT do usuario.

## Dependencias

Para funcionar, precisa de:

- `npx`;
- `python3`;
- `codex` CLI instalado e funcionando;
- login ativo no Codex;
- permissao de gerar imagens na conta usada pelo Codex.

No ambiente atual:

- `npx` esta OK;
- `python3` esta OK;
- o pacote `skills` reconhece a skill corretamente;
- o agente dentro do Codex app tem acesso a geracao de imagens;
- o `codex` global chamado pelo terminal esta quebrado no shell, porque o wrapper existe, mas o binario interno esperado nao foi encontrado.

Enquanto o `codex` global nao for corrigido, a skill externa provavelmente falhara ao chamar `codex exec`. Isso nao impede que imagens sejam geradas nesta conversa pelo recurso nativo do Codex app.

## Risco principal

O maior risco e fragilidade operacional.

A skill depende de detalhes internos do Codex CLI, principalmente os arquivos `~/.codex/sessions/.../rollout-*.jsonl`. Se o formato desses arquivos mudar, ou se o Codex deixar de persistir o payload da imagem do mesmo jeito, o script pode parar de extrair a imagem.

Tambem ha uma diferenca importante de nomenclatura:

- a skill fala em "GPT Image 2 / ChatGPT Images 2.0";
- a documentacao oficial da OpenAI API lista modelos como `gpt-image-1.5`, `gpt-image-1` e `gpt-image-1-mini`;
- portanto, esta skill deve ser entendida como um atalho para gerar imagens via ChatGPT/Codex, nao como uma integracao oficial com um modelo de API chamado `gpt-image-2`.

## Recomendacao para este repositorio

Usar sim, mas com regras claras:

1. Usar o recurso nativo de imagem do Codex app para producao assistida nesta conversa.
2. Instalar a skill `gpt-image-2` apenas se quisermos um fluxo portavel via CLI.
3. Manter essa skill como auxiliar, nao como dependencia central.
4. Guardar prompts, referencias e outputs por conteudo.
5. Para carrosseis, usar geracao de imagem para arte de apoio, e manter layout final em um fluxo separado.
6. Criar uma skill propria do projeto para aplicar brand guidelines antes de gerar imagens.
7. Documentar no README que a rota `gpt-image-2` depende de Codex CLI local e login.

## Comando de instalacao sugerido

Para instalar no projeto:

```bash
npx skills add https://github.com/agentspace-so/agent-skills --skill gpt-image-2 --agent codex --copy -y
```

Para instalar globalmente no usuario:

```bash
npx skills add https://github.com/agentspace-so/agent-skills --skill gpt-image-2 --agent codex --copy -g -y
```

Eu prefiro com `--copy` para este projeto, porque deixa a skill versionavel e auditavel dentro do workspace, em vez de depender de symlink.

## Fontes

- Repositorio da skill: https://github.com/agentspace-so/agent-skills/tree/main/gpt-image-2
- OpenAI API - image generation: https://platform.openai.com/docs/guides/image-generation
- OpenAI API - image generation tool: https://platform.openai.com/docs/guides/tools-image-generation
- OpenAI Help - Images in ChatGPT: https://help.openai.com/en/articles/11084440-images-in-chatgpt
