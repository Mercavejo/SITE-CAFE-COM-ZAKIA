---
description: Faz ou prepara deploy preview na Vercel
agent: vercel-ops
---

Prepare um deploy preview da aplicação atual.

Preferência:
1. Use Vercel MCP, se disponível.
2. Se MCP não estiver disponível, use Vercel CLI.

Pode rodar:
- `vercel link`, se o projeto ainda não estiver linkado
- `vercel env pull .env.local`, se necessário
- `vercel deploy --logs`

Não faça deploy production.

Depois informe:
1. URL do preview
2. Status do build
3. Warnings/erros relevantes
4. Próximo passo recomendado

Argumentos do usuário: $ARGUMENTS
