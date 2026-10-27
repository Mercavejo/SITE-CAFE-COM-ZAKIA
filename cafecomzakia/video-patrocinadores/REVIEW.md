# REVIEW.md — Revisão e relatório de entrega (versão 2)

## O que mudou em relação à versão 1

| Versão 1 | Versão 2 |
| --- | --- |
| Fotos recortadas das thumbnails (cenário de tijolo e neon, que é arte) | Quadros reais das gravações: estúdio real, Daniel e seis convidados |
| Simulação de marca numa placa desenhada sobre uma mesa da thumbnail | O **telão real do estúdio** troca para "SUA MARCA" num plano aberto real, com zoom e o rótulo "SIMULAÇÃO" |
| Logo branco do site | Logo dourado 3D (enviado pelo cliente, igual às placas de mesa do estúdio) |
| Temas genéricos (negócios / liderança / comunicação) | Posicionamento oficial "Negócios · Direito · Política" e "clareza / profundidade / sem enrolação" (trailer oficial) |
| — | Selo "14ª temporada" e canais "YouTube · Spotify · Instagram · TV BOA" |
| Gancho "Sua marca merece estar onde os negócios acontecem." | "E se a sua marca estivesse nesta conversa?", sobre o plano real da mesa |

## Validação do HyperFrames (`npx hyperframes check`)

Relatório em `build/check-report.json`.

| Etapa | Erros | Avisos |
| --- | --- | --- |
| lint | 0 | 0 |
| runtime | 0 | 0 |
| layout | 0 | 0 |
| motion | 0 | 0 |
| contraste (WCAG) | 0 | 0 |
| craft | 0 | 2 |
| áudio | 0 | 0 |

**Avisos mantidos de propósito:** `line_unread` em "3" e "4" (7,07 s e 7,10 s). São dígitos que passam pelo contador enquanto ele rola de 0 a 6. O "6" final fica parado de 7,6 s a 9,78 s.

## Arquivo final (ffprobe)

`cafe-com-zakia-patrocinadores-15s.mp4`. Saída completa em `build/ffprobe.txt`.

| Item | Valor |
| --- | --- |
| Vídeo | H.264 High, nível 5.0, `yuv420p`, 1080×1920, SAR 1:1, DAR 9:16 |
| Frame rate | 60/1, 900 quadros |
| Duração | 15,000000 s (vídeo, áudio e contêiner) |
| Bitrate | ≈ 12,4 Mb/s de vídeo; keyframe a cada 2 s; 22,6 MB |
| Áudio | AAC-LC, 48 kHz, estéreo, ≈ 207 kb/s |
| Loudness | −14,7 LUFS integrados, LRA 2,7 LU, pico verdadeiro −1,6 dBFS (sem clipping). `build/loudness-final.txt` |

## Revisão dos snapshots

`snapshots/frames/` (quadros exatos), `snapshots/review/` (início e meio de cada cena, transições, versão de celular a 360 px) e `snapshots/render/` (quadros extraídos do próprio MP4).

Problemas encontrados e corrigidos nesta versão:

| Prioridade | Tempo · onde | Problema | Correção |
| --- | --- | --- | --- |
| P0 | 0,6 s · gancho | "NESTA CONVERSA?" caía sobre o telão da foto e o texto quebrava mal | Cinco linhas curtas; a foto desceu para y=740 |
| P0 | 3,2 s · selo | "14ª TEMPORADA" quebrava em duas linhas e encostava na moldura | Selo mais largo, numa linha só |
| P1 | 0–1,5 s · foto do gancho | Borda reta visível entre a foto e o fundo | Máscara de transparência no topo e na base |
| P1 | 0–1,45 s · gancho | Primeira linha 0,05 s abaixo do mínimo de leitura | Saída do texto atrasada para 1,34 s |

Conferido: nenhuma palavra cortada; todo o texto entre y≈236 e y≈1300; títulos ≥ 96 px; textos secundários ≥ 34 px; telão "SUA MARCA" encaixado na posição e na inclinação do telão real; site e Instagram corretos; site legível de 12,85 s a 15 s.

## O que foi medido e o que não foi

- **Medido:** layout, contraste, tempos de leitura, legibilidade a 360 px, loudness, pico, duração, resolução, fps e codecs.
- **Não ouvido:** a trilha foi medida, não escutada por uma pessoa.
- **Limitações de fonte:** Instagram sem acesso (o conector do Agent-Reach falhou e o perfil exige login); YouTube bloqueou downloads e legendas (verificação anti-bot). Os quadros reais são imagens paradas de 1280×720, não trechos em movimento.

## Ponto mais fraco e próximos passos

- **Ponto mais fraco:** as cenas usam fotos reais paradas, com movimento de câmera feito na edição. O resultado ficaria muito mais forte com **trechos de vídeo reais**: 3 a 5 cortes de 2 a 3 s de convidados reagindo, Daniel perguntando e um plano aberto com o telão. Com os arquivos originais da gravação, basta trocar as imagens por `<video>` nas mesmas posições.
- **Para o telão:** se a equipe tiver um episódio em que o telão exibiu um parceiro confirmado (com autorização), esse quadro real seria a prova mais forte para a cena 5.
- **Contato:** se existir um e-mail ou WhatsApp exclusivo para patrocínio, ele pode entrar no CTA no lugar de "Fale com a equipe".
