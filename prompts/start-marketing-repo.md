# Prompt para Iniciar um Repositório de Marketing

Copie e cole este prompt no agente que vai configurar o projeto.

```text
Vamos iniciar o repositório de marketing: <LINK_DO_REPOSITORIO>.

Objetivo:
- Baixe ou clone o repositório.
- Leia AGENTS.md antes de alterar qualquer arquivo.
- Instale as dependências do projeto.
- Verifique se o pipeline de posts por HTML/React está funcionando.
- Configure as contas sociais usando accountId.

Contas iniciais:
- Plataforma: <instagram|linkedin|tiktok|youtube|x-twitter|threads|facebook>
- Account ID: <account-id-em-kebab-case>
- Nome público: <nome-da-conta>
- Papel da conta: <institucional|fundador|produto|comunidade|outro>

Regras:
- Salve posts em content/social-media/{platform}/{accountId}/{slug}/.
- Cada post.json deve declarar o mesmo accountId da pasta.
- Não misture contexto, assets, performance ou calendário de contas diferentes.
- Se houver várias contas da mesma empresa, crie uma pasta por accountId.
- Se for outra marca/cliente, prefira outro clone/projeto raiz.

Comandos esperados:
- npm install
- npm run typecheck
- npm run validate:post -- --input content/social-media/linkedin/loubfy-os/html-render-pipeline-demo/post.json
- npm run account:create -- --platform <platform> --account-id <account-id> --display-name "<nome-da-conta>" --notes "<papel-da-conta>"
```
