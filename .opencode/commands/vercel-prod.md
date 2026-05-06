---
description: Prepara deploy production na Vercel com confirmação
agent: vercel-ops
---

Prepare um deploy production da aplicação atual.

Antes de executar qualquer deploy production, peça confirmação explícita.

Quando confirmado, use:
- Vercel MCP, se disponível
- ou `vercel deploy --prod --logs`

Depois informe:
1. URL production
2. Status do build
3. Warnings/erros relevantes
4. Comandos de validação pós-deploy

Argumentos do usuário: $ARGUMENTS
