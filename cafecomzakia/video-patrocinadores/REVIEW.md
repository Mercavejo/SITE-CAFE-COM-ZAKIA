# REVIEW.md — Revisão e relatório de entrega

## Validação do HyperFrames (`npx hyperframes check`)

Relatório completo em `build/check-report.json`.

| Etapa | Erros | Avisos |
| --- | --- | --- |
| lint | 0 | 0 |
| runtime | 0 | 0 |
| layout | 0 | 0 |
| motion | 0 | 0 |
| contraste (WCAG) | 0 (32/32 amostras aprovadas) | 0 |
| craft | 0 | 2 |
| áudio | 0 | 0 |

**Avisos mantidos de propósito:** `line_unread` em "3" e "4" (7,07 s e 7,10 s). São dígitos que passam pelo contador enquanto ele rola de 0 a 6; não são para ser lidos. O número final ("6") fica parado de 7,6 s a 9,78 s.

**Marcações de layout intencionais:** `data-layout-allow-overlap` na máscara das palavras-tema da cena 3 (três palavras empilhadas, uma visível por vez); `data-layout-allow-occlusion` nos dígitos ocultos do contador da cena 4 e na placa "SUA MARCA" da cena 5.

## Revisão dos snapshots

Sheets em `snapshots/review/` (início e meio de cada cena, cada transição de −0,2 s a +0,2 s, e versão de celular a 360 px), quadros exatos em `snapshots/frames/` e recortes ampliados em `snapshots/zoom/`.

Problemas encontrados e corrigidos:

| Prioridade | Tempo · onde | Problema | Correção |
| --- | --- | --- | --- |
| P0 | 7,7–10,0 s · "MILHÕES" / "MILHÃO" | A máscara de entrada cortava o til ("MILHÖES") | Folga de 0,42 em no topo da máscara (`snapshots/zoom/zoom-fix-frame-03-at-9s.jpg`) |
| P0 | 4,0–6,0 s · palavra-tema | Acentos e tis das próximas palavras espiavam pela borda da máscara | Palavras estacionadas ficam invisíveis e mais abaixo até a vez delas |
| P0 | 7,3 s · métrica 2 | O til de "MILHÃO" aparecia solto antes da entrada | Unidade oculta até entrar |
| P0 | 10,8–12,2 s · placa "SUA MARCA" | O texto quebrava em duas linhas | 40 px, sem quebra de linha |
| P0 | 1,8–4,0 s · "FALANDO DE NEGÓCIOS" | Quebrava em duas linhas e encostava em "com Daniel Zákia" | 56 px, sem quebra de linha |
| P1 | todas · metade inferior | Preto chapado, sem profundidade | Camada contínua com o cenário real desfocado (`compositions/atmosfera.html`) |

Conferido nos quadros: nenhuma palavra cortada; todo texto entre y≈240 e y≈1330 (faixa segura do Reels/TikTok); títulos ≥ 96 px; textos secundários ≥ 34 px; logo sem distorção; "cafecomzakia.com.br" e "@cafecomzakia" com a grafia correta; placa conceitual alinhada à placa de couro da mesa real.

## Arquivo final (ffprobe)

`cafe-com-zakia-patrocinadores-15s.mp4`. Saída completa em `build/ffprobe.txt`.

| Item | Valor |
| --- | --- |
| Contêiner | MP4 (`isom`, compatível `isomiso2avc1mp41`), 20,7 MB |
| Vídeo | H.264 High, nível 5.0, `yuv420p`, 1080×1920, SAR 1:1, DAR 9:16 |
| Frame rate | 60/1 (constante), 900 quadros |
| Duração | 15,000000 s (vídeo, áudio e contêiner) |
| Bitrate de vídeo | ≈ 11,4 Mb/s; keyframe a cada 2 s |
| Áudio | AAC-LC, 48 kHz, estéreo, ≈ 207 kb/s |
| Loudness (EBU R128, arquivo final) | −14,7 LUFS integrados, LRA 2,7 LU, pico verdadeiro −1,6 dBFS (sem clipping). Ver `build/loudness-final.txt` |
| Trilha antes do encode AAC | −14,0 LUFS, pico verdadeiro −1,3 dBFS |

Configuração compatível com Instagram Reels, Stories e TikTok (H.264 + AAC, 9:16, até 60 fps). Quadros extraídos do próprio MP4 em `snapshots/render/` conferem com o preview.

## Decisões criativas

- Seis cenas nos tempos do briefing, com todas as trocas exatamente nas batidas da trilha (120 BPM).
- Transições: onda de áudio dourada que vira o fio do logo, zoom através do quadro do estúdio, cortes com chicote, escurecimento antes do corte, troca por desfoque, e a placa "SUA MARCA" que atravessa a tela e vira a cartela final.
- Imagens só de material oficial (logo do site, thumbnails do YouTube). Sem nomes de convidados na tela.
- Gancho alternativo ("E SE A PRÓXIMA GRANDE CONVERSA TIVESSE A SUA MARCA?") **não usado**: é mais longo e não cabe para leitura em 1,5 s.

## O que foi medido e o que não foi

- **Medido:** layout, contraste, tempos de leitura, legibilidade a 360 px, loudness, pico verdadeiro, duração, resolução, fps e codecs (ffprobe, acima). O relatório de áudio do HyperFrames (`build/audio-report.json`) classifica o arquivo como música, com ataques regulares nas batidas e pico de energia em 13,0 s (CTA).
- **Não ouvido:** a trilha foi medida, não escutada por uma pessoa. Recomenda-se ouvir antes de publicar, principalmente a xícara (1,52 s e 12,55 s) e o riser (12,0–12,5 s).
- **Não verificado no Instagram:** a contagem de visualizações do reel "+6 milhões" não é pública sem login. O número vem do site oficial e está rotulado como "dados publicados pelo Café com Zákia".

## Ponto mais fraco e o que mudaria com mais tempo

- **Ponto mais fraco:** as imagens são thumbnails de 1280×720 ampliadas cerca de 1,7×. Em tela cheia de celular ficam boas, mas não perfeitas. Com acesso aos arquivos originais de gravação (ou aos vídeos do canal, com autorização), a cena 3 poderia usar cortes em movimento em vez de fotos.
- **Com mais tempo:** um corte real do episódio com mais visualizações na cena 4, e uma versão de 30 s com espaço para o contato comercial direto, caso a equipe defina um e-mail ou WhatsApp exclusivo para patrocínio.

## Preview no Studio

Este projeto foi feito num container de nuvem, sem navegador para o cliente. Para revisar e editar visualmente, rode `npx --yes hyperframes@0.8.209 preview` na pasta do projeto, ou abra no app desktop do HyperFrames.
