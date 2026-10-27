# BRAND.md — Levantamento da marca Café com Zákia

Datas de acesso: **27/10/2026** (UTC). Cópias do que foi lido estão em `research/`.

- **Versão 1:** site no ar, páginas públicas do YouTube e do Instagram.
- **Versão 2 (atual):** levantamento ampliado com a skill **Agent-Reach** (canais web, YouTube e Instagram) e troca de todas as imagens por **quadros reais das gravações**. A versão 1 usava thumbnails cujo cenário (tijolo, neon, estante) é arte e não o estúdio real.

> **Pasta local:** não existe uma pasta `cafecomzakia` com materiais de marca. O código do site neste repositório está desatualizado e, por orientação do cliente, **não foi usado como fonte**. O único arquivo entregue pelo cliente nesta conversa é a imagem do logo dourado (`research/cliente/logo-dourado-enviado-pelo-cliente.jpg`).

## 1. Fontes consultadas

| Fonte | Como | Cópia local | Resultado |
| --- | --- | --- | --- |
| Site oficial https://www.cafecomzakia.com.br/ (+ páginas internas e CSS) | curl | `research/site/` | 200 OK |
| YouTube @cafecomzakia: vídeos, Shorts, lives, sobre | yt-dlp (instalado pelo Agent-Reach), listagem pública | `research/agent-reach/yt-videos.json`, `yt-shorts.json`, `yt-streams.json`, `yt-top.txt`, `research/youtube/` | 187 vídeos, 1.876 Shorts, 1 live |
| YouTube: busca e descrição de episódio | `agent-reach youtube search/read` | `research/agent-reach/yt-search.json`, `yt-read-W3ucISsxZfQ.json` | OK; depois **bloqueado pelo YouTube** ("Sign in to confirm you're not a bot"), sem nova tentativa |
| YouTube: quadros reais das gravações | imagens automáticas públicas `i.ytimg.com/vi/<id>/maxres1|2|3.jpg` | 123 quadros de 41 vídeos analisados; em `research/youtube/frames/` ficam os 12 usados ou citados e as folhas de contato de todos | OK |
| Web: busca "Café com Zákia" | `agent-reach web search` | `research/agent-reach/web-search.json` | OK |
| TV BOA: programa, episódios, trailer, "sobre nós" | `agent-reach web read` | `research/agent-reach/tvboa-*.txt` | OK |
| Jornal O Regional: matéria de estreia | `agent-reach web read` | `research/agent-reach/oregional-estreia.txt` | OK |
| Página do Facebook "Café Com Zákia, Catanduva" (espelho público medioq.com) | `agent-reach web read` | `research/agent-reach/medioq-facebook.txt` | OK (espelho de terceiros) |
| Instagram: busca e perfil | `agent-reach instagram search/profile` | `research/agent-reach/ig-*.json` | **Falhou**: o conector de Instagram do Agent-Reach não instalou ("OpenCLI extension release: HTTP 403"); perfil e posts exigem login |
| Instagram: perfil (curl) | curl | — | 302 → login |
| Instagram: reel DX4Vzw8FV9a citado pelo site | curl (metadados públicos) | `research/instagram/` | 142 mil curtidas, 2.304 comentários, 3/mai/2026 |
| Logo dourado | enviado pelo cliente nesta conversa | `research/cliente/` | usado |

## 2. Informações verificadas

| Informação | Valor | Fonte |
| --- | --- | --- |
| Nome | Café com Zákia | site, YouTube, TV BOA |
| Posicionamento | "Falando de Negócios" | site |
| Posicionamento do canal | "o canal onde falamos de **NEGÓCIOS, DIREITO e POLÍTICA** com clareza, profundidade e sem enrolação" | descrição do trailer oficial (1PwokG81CGU), espelhada em tvboa.com.br |
| Quadros do programa | aberturas "Falando de Negócios", "Falando de Direito", "Falando de Política"; "Falando de Negócios" é o quadro sobre marketing, vendas e estratégia (piloto com Émerson Serandin) | quadros reais das aberturas; TV BOA |
| Apresentador | Daniel Zákia / Daniel Devitto Zákia | site, YouTube, O Regional |
| Perfil dos convidados | "empresários, líderes e especialistas" | site |
| Temporada atual | **14ª temporada**, estreia em 24/10/2026 com Camilo Calandreli | TV BOA (espelho da descrição do YouTube) e busca no YouTube |
| Volume publicado | 2.074 vídeos; 1.098.684 visualizações; 4,3 mil inscritos | YouTube → sobre |
| Distribuição | YouTube, Spotify, Instagram e **TV BOA** (empresa de mídia digital de Catanduva/SP que lista o Café com Zákia entre seus "Programas" e publica os episódios) | site; tvboa.com.br/programas/cafe-com-zakia e /sobre-nos |
| Região | Catanduva/SP e região | página do Facebook (espelho), O Regional, TV BOA |
| Origem do nome | homenagem ao pai de Daniel, Amil Zákia ("este espaço que carrega o seu nome") | post de 10/08/2026 da página do Facebook (espelho) |
| Frase da página do Facebook | "E ai está preparado? depende da conversa será doce ou amargo." | espelho medioq.com |
| Periodicidade | Na estreia, "O bate-papo será semanal" (O Regional) e "Será algo semanal" (descrição padrão do YouTube). As datas recentes na TV BOA são 24/10, 15/10 e 06/10, ou seja, não exatamente semanais | O Regional, YouTube, TV BOA → **não usada no vídeo** |
| Patrocínio | **Nenhuma informação oficial sobre patrocínio.** `/pacote` é uma oferta para convidados | site |

### Shorts e vídeos de maior destaque (YouTube, contagem pública aproximada)

| Visualizações | Vídeo |
| --- | --- |
| 185 mil | "A mulher acha maneiras diferente de esperar o marido" (Short de comédia, fora do formato entrevista) |
| 94 mil | "Mercado Livre scam arrives with charging cable" (mesmo tema do reel viral do Instagram) |
| 30 mil | "QUANTO CUSTA UMA ACADEMIA?" |
| 20 mil | "Padre Carlos Humberto sentou à mesa do Café com Zákia e abriu o coração" |
| 12 mil | "Brasil: Agronegócio pode Dobrar com Tecnologia Sustentável!" |
| 8,7 mil | Luciana Deboni e Thiago Alves Galli, da clínica Inspirat (episódio) |

Lista completa em `research/agent-reach/yt-top.txt`.

### Espaços de marca observados no estúdio real

Nos quadros reais das gravações, além da mesa com o logo, aparecem:

- **telão** atrás da mesa, que exibe a marca do programa (vários episódios) e, em alguns episódios, outras marcas: "EMPÓRIO ABADESCO" (episódio da Octano Brewpub, W3ucISsxZfQ) e "VOX" (episódio da clínica Inspirat, TDrw4ylzOh8);
- **placas de mesa** em 3D dourado com o logo "CAFÉ COM ZÁKIA"; no episódio da Inspirat há uma segunda placa, "VOX", ao lado;
- **canecas** com o logo dourado;
- **telas laterais** com o logo da Mercavejo Consultoria (produtora, citada no site).

**Não foi possível confirmar** se Empório Abadesco e VOX eram patrocinadores: a descrição do episódio da Octano, lida pelo Agent-Reach, não fala em patrocínio, e a do episódio da Inspirat não pôde ser lida (bloqueio do YouTube). Por isso **nenhuma dessas marcas aparece no vídeo**, e o vídeo não afirma que o programa já teve patrocinadores.

## 3. Métricas

| Métrica | Texto na fonte | Onde | No vídeo |
| --- | --- | --- | --- |
| + de 6 milhões | "+ de 6 milhões em corte viral no Instagram @cafecomzakia" | site (`/participar-de-podcast`, home) | Sim, como dado publicado pelo Café com Zákia: "+ DE 6 MILHÕES — de visualizações em um corte no Instagram" |
| +1 milhão | "+1 milhão de visualizações no YouTube do Café com Zákia." | site; confirmado no YouTube (1.098.684) | Sim |
| 14ª temporada | "O Café com Zákia estreia sua 14ª temporada…" | TV BOA / YouTube | Sim (selo na cena 2) |
| Canais | YouTube, Spotify, Instagram, TV BOA | site, TV BOA | Sim (linha na cena 4) |
| Inscritos, total de vídeos, curtidas do reel | 4,3 mil; 2.074; 142 mil | YouTube, Instagram | Não usadas |

As métricas não foram somadas nem arredondadas para cima, e nenhuma foi apresentada como auditada.

## 4. Identidade visual

- **Logo usado no vídeo:** o logo **dourado 3D** "CAFÉ COM ZÁKIA", enviado pelo cliente. É a mesma marca das placas de mesa do estúdio e das aberturas recentes. As letras foram recortadas do fundo de mármore (`build/prep_images.py`), sem alteração de forma ou cor.
- **Estúdio real:** cortinas pretas e azul-marinho, luz âmbar e azul, mesa escura com o logo dourado, cadeiras pretas, microfones em braço articulado, canecas brancas com logo dourado e telão ao fundo.
- **Cores do site (CSS no ar):** `#030303` (fundo), `#FFFFFF`, `#FFE79A` (dourado-claro), `#D4AF37` (dourado), `#A9ABB0`. Combinam com o dourado do logo e com o escuro do estúdio.
- **Fontes:** o site declara Georgia (títulos) e Inter (texto). No vídeo: Gelasio (métricas iguais às da Georgia, licença OFL) e Inter, em `.woff2` local.
- O logo branco/marrom com textura do site também aparece no telão do estúdio em alguns episódios; no vídeo ele só aparece dentro dos quadros reais.

## 5. Tom de voz

Direto e provocativo no YouTube e no Facebook ("sem enrolação", "Ser de verdade é raro", "Se você tem ousadia, você merece sentar ao nosso lado"); premium e institucional no site ("Conversas premium", "vitrine de autoridade"). O vídeo junta os dois: frases curtas e diretas com acabamento premium.

## 6. Origem de cada mídia usada no vídeo (versão 2)

Imagens processadas por `build/prep_images.py` (recorte, Lanczos, nitidez leve). Todas são quadros reais das gravações (`maxresN.jpg` gerado pelo YouTube a partir do próprio vídeo), sem nomes de convidados na tela.

| Arquivo | Origem | Publicação de origem | Acesso | Cena |
| --- | --- | --- | --- | --- |
| `assets/img/logo-dourado.png` | `research/cliente/logo-dourado-enviado-pelo-cliente.jpg` | imagem enviada pelo cliente nesta conversa | 27/10/2026 | 2, 6 |
| `assets/img/real-s1-mesa.jpg` | https://i.ytimg.com/vi/-nZZ1ynqW2o/maxres3.jpg | "ARTE, POLÍTICA E LIBERDADE… \| Camilo Calandreli" (estreia da 14ª temporada) | 27/10/2026 | 1 |
| `assets/img/real-s2-daniel.jpg` | https://i.ytimg.com/vi/kOaDJWxeW0w/maxres1.jpg | "DÉBORA MARCELA: DOS SISTEMAS AOS 30 ANOS DE REVISTA STAMPA" (Daniel Zákia em quadro) | 27/10/2026 | 2 |
| `assets/img/real-s3-convidado1.jpg` | https://i.ytimg.com/vi/GHRLO0zxVMg/maxres2.jpg | "Falando de Negócios com Raphael Ferris" | 27/10/2026 | 3 |
| `assets/img/real-s3-convidado2.jpg` | https://i.ytimg.com/vi/KA6jJ9wIu4c/maxres1.jpg | "Dr. Marcelo Aparecido Alfinete no Café Com Zákia" | 27/10/2026 | 3 |
| `assets/img/real-s3-convidado3.jpg` | https://i.ytimg.com/vi/gxucf5CIrl8/maxres2.jpg | "LETÍCIA PEREZ: BELEZA, EMPREENDEDORISMO E OS DESAFIOS DAS REDES SOCIAIS" | 27/10/2026 | 3 |
| `assets/img/real-s3-convidado4.jpg` | https://i.ytimg.com/vi/NtkLXKjvThw/maxres1.jpg | "DO INFERNO AO CÉU: A RADICAL MUDANÇA DE VIDA DE THIAGO SOUZA" | 27/10/2026 | 3 |
| `assets/img/real-s3-convidado5.jpg` | https://i.ytimg.com/vi/_OMB2fwzfPk/maxres1.jpg | "Falando de Negócios com Cesar Hércules e Thales Simões" | 27/10/2026 | 3 |
| `assets/img/real-s3-convidado6.jpg` | https://i.ytimg.com/vi/RP2fvD_IeWE/maxres1.jpg | "IA NO DIREITO SUBSTITUI ADVOGADO? … com César Hercules e Felipe Rios" | 27/10/2026 | 3 |
| `assets/img/real-s5-telao.jpg` | https://i.ytimg.com/vi/GHRLO0zxVMg/maxres1.jpg | "Falando de Negócios com Raphael Ferris" (plano aberto com o telão) | 27/10/2026 | 5 |
| `assets/img/real-bg-estudio.jpg` | mesmo quadro de GHRLO0zxVMg, desfocado e escurecido | — | 27/10/2026 | fundo de todas |
| `assets/fonts/*.woff2` | Google Fonts (Gelasio, Inter), OFL | — | 27/10/2026 | todas |
| `assets/audio/trilha-original-master.wav` (+ stems) | `build/trilha.py`, semente 20261027 | original | 27/10/2026 | todas |

Elementos incidentais nos quadros reais: marcas das cadeiras ("dazz", "Extreme Life"), garrafas de água e, em alguns enquadramentos, um pedaço do logo da Mercavejo (produtora). São objetos do próprio estúdio, não patrocínios. Os recortes evitam o telão com marcas de terceiros.

### Descartados

| Mídia | Motivo |
| --- | --- |
| Thumbnails dos episódios (usadas na versão 1) | O cenário de tijolo, neon e estante é arte, não o estúdio real |
| Capa do site (`hero-cafe-zakia-final.jpg`) | Composição ilustrativa com rostos e números não verificáveis |
| Capa do reel viral (Instagram) | Logo do Mercado Livre em destaque e ícone de play |
| Quadros com "EMPÓRIO ABADESCO" e "VOX" | Marcas de terceiros sem confirmação de patrocínio |
| Aberturas 3D "Falando de…" | Arte gráfica, não gravação; o logo dourado já representa essa identidade |
| Trechos de vídeo dos episódios | O YouTube bloqueou o download (verificação anti-bot); não foi contornado |
