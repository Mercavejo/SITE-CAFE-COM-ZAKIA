---
format: 1080x1920
duration: 15s
fps: 60
message: Associe sua marca a conversas relevantes sobre negócios, liderança e comunicação.
arc: Gancho → Identidade → Prova humana → Prova de alcance → Oportunidade → CTA
audience: empresários, gestores de marketing, diretores comerciais, agências e marcas
mode: autonomous
bpm: 120 (1 batida = 0,5 s = 30 quadros)
safe_area: texto entre y=240 e y=1330; margens laterais de 100 px
---

# STORYBOARD — Café com Zákia | Patrocinadores (15 s, 9:16)

Paleta: fundo `#030303`, texto `#FFFFFF`, destaque `#FFE79A`, linhas `#D4AF37`, notas `#A9ABB0`.
Fontes: Gelasio 700 (títulos, caixa alta) e Inter 600/800 (métricas e chamadas).
Camadas fixas: grão de filme discreto (componente de registro `grain-overlay`, 6%) e trilha `assets/audio/trilha-original-master.wav` do 0 ao 15 s.

## Frame 1 — Gancho

- status: animated
- src: compositions/s1-gancho.html
- duration: 1.5s (0,0 → 1,5)
- transition_in: — (quadro 0 já com texto)
- scene: estúdio desfocado em âmbar; "SUA MARCA MERECE ESTAR ONDE OS NEGÓCIOS ACONTECEM."
- poster: 1.2
- reads: "SUA MARCA / MERECE ESTAR" já na tela (0,0); "ONDE OS / NEGÓCIOS / ACONTECEM." entra palavra a palavra (0,20–0,55); leitura até 1,30
- sound: impacto grave + acorde de piano elétrico (Am9) em 0,0; hi-hats contidos; whoosh com pico em 1,5

**Imagens:** `bg-estudio-desfocado.jpg` (cenário real, desfocado) com vinheta radial.
**Animação:** as duas primeiras linhas estão no quadro 0 (é a miniatura); cada palavra seguinte entra com desfoque de 6 px→0 e opacidade 0→1 em 0,13 s, com 0,067 s entre palavras; "NEGÓCIOS" em dourado-claro, maior. Uma linha fina dourada atravessa a tela por baixo do texto (0,0–0,6 s).
**Transição de saída (1,20–1,50):** o texto sai com desfoque (0,2 s) enquanto a linha dourada vira uma **onda de áudio** que se abre no centro. A onda continua na cena 2.
**Objetivo:** parar o scroll com uma promessa dirigida a quem decide por uma marca.

## Frame 2 — Identidade

- status: animated
- src: compositions/s2-identidade.html
- duration: 2.5s (1,5 → 4,0)
- transition_in: carry-across (a onda dourada se recolhe no sublinhado do logo)
- scene: logo oficial branco, "FALANDO DE NEGÓCIOS", "com Daniel Zákia", quadro do estúdio real com movimento de câmera
- poster: 3.0
- reads: logo (1,55–4,0); "FALANDO DE NEGÓCIOS" (1,85–4,0); "com Daniel Zákia" (2,05–4,0)
- sound: bumbo quatro-no-chão e baixo entram em 1,5; colher na xícara em 1,52; whoosh com pico em 4,0

**Imagens:** `logo-cafe-com-zakia-branco.png` (site) e `s2-estudio-daniel.jpg` (thumbnail oficial: Daniel Devitto Zákia na mesa, microfone, caneca "CAFÉ COM ZÁKIA").
**Animação:** a onda se achata numa linha dourada que vira o sublinhado do logo. O logo se revela da esquerda para a direita por máscara (`clip-path`, 0,45 s, `expo.out`) e fica parado. Os subtítulos entram por desfoque. O quadro do estúdio (moldura dourada de 2 px com cantoneiras) abre de baixo para cima com máscara; dentro dele, a câmera faz um movimento lento (escala 1,14→1,02, deslocamento lateral) por 2 s.
**Transição de saída (3,62–4,0):** **zoom através do quadro**: a foto cresce até passar dos limites da tela (0,38 s, `power3.in`), e logo e textos desfocam e somem.
**Objetivo:** apresentar a marca com legibilidade total e mostrar que existe um estúdio real e bem produzido.

## Frame 3 — Conversas reais

- status: animated
- src: compositions/s3-convidados.html
- duration: 3.0s (4,0 → 7,0)
- transition_in: cut (no pico do zoom)
- scene: três cortes de convidados reais; temas NEGÓCIOS / LIDERANÇA / COMUNICAÇÃO
- poster: 4.5
- reads: "NEGÓCIOS" (4,0–5,0); "LIDERANÇA" (5,0–6,0); "COMUNICAÇÃO" (6,0–6,9); "Conversas com empresários, líderes e especialistas" fixa de 4,15 a 6,9
- sound: palmas nos tempos 2 e 4; clique a cada corte (5,0 e 6,0); virada de caixa 6,5→7,0

**Imagens:** `s3-negocios.jpg`, `s3-lideranca.jpg`, `s3-comunicacao.jpg` (thumbnails oficiais; sem nomes na tela).
**Animação:** cada foto entra com **chicote** horizontal (desfoque de 14 px→0 em 0,16 s), alternando a direção. A palavra-tema troca com rolagem vertical mascarada (estilo caça-níquel, 0,18 s). Contador editorial "01 / 02 / 03" em dourado. Dentro de cada corte há um empurrão leve de câmera.
**Transição de saída (6,85–7,0):** **escurecimento antes do corte**: o quadro escurece cerca de 45% e corta seco na batida 7,0.
**Objetivo:** provar que o programa reúne pessoas reais de negócios e associar o podcast aos três temas da mensagem central.

## Frame 4 — Alcance

- status: animated
- src: compositions/s4-metricas.html
- duration: 3.0s (7,0 → 10,0)
- transition_in: cut (impacto)
- scene: "+ DE 6 MILHÕES de visualizações em um corte no Instagram"; "+1 MILHÃO de visualizações no YouTube"; nota de fonte
- poster: 9.0
- reads: "+ DE 6 MILHÕES" (7,05–10,0, o 6 rola até 7,6); legenda 1 (7,35–10,0); "+1 MILHÃO" (8,0–10,0); legenda 2 (8,3–10,0); fonte (8,6–10,0)
- sound: impacto em 7,0; batida de madeira quando o "6" aterrissa (7,62) e quando o "+1 MILHÃO" aterrissa (8,36); groove completo

**Imagens:** fundo `bg-estudio-desfocado.jpg` a 30% e grade editorial de linhas douradas finas.
**Animação:** o "6" rola de 0 a 6 (componente de registro `number-wheel`, 0,6 s, `power3.out`) e para. "MILHÕES" entra por máscara de baixo para cima. Linha dourada separa as duas métricas. "+1 MILHÃO" entra com desfoque e leve redução de escala (1,08→1). Os números ficam parados depois de aterrissar.
**Transição de saída (9,78–10,0):** **troca por desfoque**: tudo desfoca 8 px e some (0,2 s); o fundo não corta.
**Objetivo:** prova de alcance com os números exatamente como o Café com Zákia os publica.

## Frame 5 — Oportunidade

- status: animated
- src: compositions/s5-oportunidade.html
- duration: 2.5s (10,0 → 12,5)
- transition_in: blur swap
- scene: "SUA MARCA NESSA CONVERSA."; mesa real do estúdio com placa conceitual "SUA MARCA"; "SIMULAÇÃO CONCEITUAL"; "Conteúdo. Autoridade. Relacionamento."
- poster: 11.6
- reads: "SUA MARCA / NESSA CONVERSA." (10,05–12,3); placa "SUA MARCA" (10,6–12,3); "SIMULAÇÃO CONCEITUAL" (10,7–12,3); "Conteúdo. Autoridade. Relacionamento." (11,0–12,3)
- sound: respiro (sai o bumbo, ficam piano, baixo e hi-hats); clique quando a placa encaixa (10,62); riser 12,0→12,5

**Imagens:** `s5-mesa.jpg` (mesa real com canecas "CAFÉ COM ZÁKIA", microfones e a placa de couro central).
**Animação:** título por palavra (cinza→branco, 0,08 s entre palavras), com "SUA MARCA" em dourado-claro. O quadro da mesa abre por máscara horizontal. A placa conceitual desce e encaixa sobre a placa de couro, com um brilho dourado que passa uma vez. A linha de valores entra palavra por palavra.
**Transição de saída (12,22–12,5):** **o objeto vira o mundo**: a placa "SUA MARCA" cresce até cobrir a tela (0,28 s, `power3.in`) e o resto desfoca. A cena 6 começa sobre esse dourado escuro.
**Objetivo:** transformar audiência e conteúdo em oportunidade, mostrando onde a marca entraria sem prometer formato nenhum.

## Frame 6 — CTA

- status: animated
- src: compositions/s6-cta.html
- duration: 2.5s (12,5 → 15,0)
- transition_in: color flood (dourado escuro → preto)
- scene: logo oficial; "SEJA UM PATROCINADOR"; "FALE COM A EQUIPE"; "cafecomzakia.com.br"; "@cafecomzakia"
- poster: 14.5
- reads: logo (12,55–15,0); "SEJA UM PATROCINADOR" (12,6–15,0); "FALE COM A EQUIPE" (12,75–15,0); "cafecomzakia.com.br" (12,8–15,0 = 2,2 s legível); "@cafecomzakia" (12,9–15,0)
- sound: impacto + acorde final (Am9) em 12,5; colher na xícara em 12,55; bateria final até 14,75; fade 14,7–15,0

**Imagens:** logo oficial branco; brilho radial dourado.
**Animação:** o dourado escuro da placa escurece até o preto (0,3 s, `power2.inOut`) enquanto o logo entra com desfoque. As linhas do CTA entram uma após a outra (0,1 s de intervalo) e ficam paradas. Um único brilho dourado atravessa "SEJA UM PATROCINADOR" (13,6–14,3). Nada se mexe depois disso.
**Objetivo:** pedido claro de contato, legível sem som, com o endereço do site na tela por mais de 2 s.

## Batidas da trilha (120 BPM)

| Tempo | Evento musical | Evento visual |
| --- | --- | --- |
| 0,0 | impacto + acorde Am9 | gancho na tela |
| 1,5 | entra o bumbo e o baixo; colher na xícara | logo |
| 4,0 | entram as palmas; whoosh | primeiro convidado |
| 5,0 / 6,0 | clique | cortes de convidados |
| 6,5–7,0 | virada de caixa | escurecimento |
| 7,0 | impacto, groove completo | métricas |
| 7,62 / 8,36 | batida de madeira | "6" e "+1 MILHÃO" aterrissam |
| 10,0 | respiro (sai o bumbo) | oportunidade |
| 10,62 | clique | placa "SUA MARCA" encaixa |
| 12,0–12,5 | riser | placa cresce |
| 12,5 | impacto + Am9 + xícara | CTA |
| 14,7–15,0 | fade | fim |
