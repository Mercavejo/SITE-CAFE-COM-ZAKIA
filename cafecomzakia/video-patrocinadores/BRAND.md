# BRAND.md — Levantamento da marca Café com Zákia

Data de acesso a todas as fontes: **27/10/2026** (UTC). Cópias brutas do que foi lido estão em `research/`.

> **Sobre a "pasta local":** não existe uma pasta `cafecomzakia` com materiais de marca no repositório. O repositório onde este projeto vive é o código do site, mas, por orientação do cliente, ele está **desatualizado e não foi usado como fonte**. Toda informação e toda mídia abaixo vêm do **site no ar**, do **canal oficial do YouTube** ou da **página pública de um reel do Instagram**. Nenhum arquivo da pasta local foi usado no vídeo.

## 1. Fontes consultadas

| Fonte | URL | Cópia local | Status |
| --- | --- | --- | --- |
| Site oficial (home) | https://www.cafecomzakia.com.br/ | `research/site/index.html`, `visible-text.txt` | 200 OK |
| CSS do site no ar | https://www.cafecomzakia.com.br/_next/static/chunks/0mp_8yjdml~l1.css | `research/site/site.css` | 200 OK |
| Páginas internas | `/pacote`, `/spotify`, `/participar-de-podcast`, `/podcast-de-negocios`, `/entrevistas-com-empresarios`, `/programa-de-negocios`, `/videos-de-negocios`, `/marketing-e-negocios` | `research/site/pages/*.html` + `.txt` | 200 OK |
| YouTube — vídeos | https://www.youtube.com/@cafecomzakia/videos | `research/youtube/channel-videos.html`, `videos.txt` | 200 OK |
| YouTube — sobre | https://www.youtube.com/@cafecomzakia/about | `research/youtube/channel-about.html` | 200 OK |
| YouTube — Shorts | https://www.youtube.com/@cafecomzakia/shorts | `research/youtube/shorts.html`, `shorts.txt` | 200 OK |
| YouTube — 12ª temporada | https://www.youtube.com/playlist?list=PLq1xuEiBAG6rOxr07nMdGEwYwRk-4BNun | `research/youtube/season12.html`, `season12.txt` | 200 OK |
| Instagram — perfil | https://www.instagram.com/cafecomzakia/ | — | **302 → login** (não acessível sem login; não contornado) |
| Instagram — reel citado pelo site | https://www.instagram.com/reel/DX4Vzw8FV9a/ | `research/instagram/reel.html` | 200 OK (apenas metadados públicos) |

## 2. Informações verificadas

| Informação | Valor encontrado | Onde |
| --- | --- | --- |
| Nome | "Café com Zákia" | site (title, h1, og:site_name) |
| Posicionamento | "Falando de Negócios" | site (subtítulo do hero; rodapé "Falando de Negócios • Produção Mercavejo Consultoria") |
| Categoria | "Podcast de negócios • Conversas premium" | site (eyebrow do hero) |
| Apresentador | "Daniel Zákia" (site); "Daniel Devitto Zákia" (site, link para danieldevittozakia.com.br); "DANIEL DEVITTO ZAKIA — EMPRESÁRIO" (thumbnails do YouTube) | site, YouTube |
| Descrição | "Café com Zákia é o podcast de negócios conduzido por Daniel Zákia, com entrevistas premium para empresários, líderes e especialistas que desejam construir autoridade, visibilidade e posicionamento." | site (meta description) |
| Perfil dos convidados | "empresários, líderes e especialistas" | site (hero, meta description, og:description) |
| Temas | negócios, entrevistas, vídeos de negócios, marketing e negócios; `/pacote`: "negócios, marketing, liderança e posicionamento" | site |
| Produção | "Produção e estratégia da Mercavejo Consultoria" | site |
| Temporadas | Site lista 9ª a 12ª ("Últimas Temporadas"); YouTube já mostra a "Décima Terceira" e thumbnails "13° TEMPORADA" | site, YouTube |
| Periodicidade | **Não encontrada.** "Novos episódios semanalmente" não aparece no site nem no YouTube. | — |
| Plataformas | YouTube @cafecomzakia, Spotify (show 5HEziKX3xOOfV7eryMZ91v), Instagram @cafecomzakia | site |
| Contato | WhatsApp https://wa.me/5517996240418 (mensagem pré-preenchida "gostaria de saber como participar?"); cadastro em `/jogos/sorteio/preencher` | site |
| Patrocínio | **Nenhuma informação sobre patrocínio encontrada.** A página `/pacote` é uma oferta para **convidados participarem** (entrevista, edição, cortes), não para patrocinadores. | site |
| Descrição do canal (YouTube) | "O Café com Zákia surgiu de uma vontade de espalhar a opinião de pessoas com mentes fortes e personalidades únicas que têm vontade de mostrar suas ideias e pensamentos ao público…" | YouTube (sobre) |

## 3. Métricas

| Métrica | Texto exato na fonte | Onde | Status no vídeo |
| --- | --- | --- | --- |
| Corte com mais de 6 milhões | "+ de 6 milhões em corte viral no Instagram @cafecomzakia" (`/participar-de-podcast`); "prova social com corte acima de 6 milhões de visualizações" (home); "Ver corte com + de 6 milhões" (home, link para o reel DX4Vzw8FV9a) | site | **Usada**, como dado publicado pelo Café com Zákia: "+ DE 6 MILHÕES — de visualizações em um corte no Instagram" |
| +1 milhão no YouTube | "+1 milhão de visualizações no YouTube do Café com Zákia." | site (home) | **Usada** |
| Visualizações totais do canal | "1.098.684 visualizações" | YouTube → sobre | Confirma o "+1 milhão" (não arredondado para cima) |
| Inscritos / vídeos | "4,3 mil inscritos", "2.074 vídeos" | YouTube → sobre | **Não usadas** (fora do roteiro; não acrescentam ao argumento) |
| Reel DX4Vzw8FV9a | "142K likes, 2,304 comments", publicado em 3/mai/2026 | Instagram (meta pública) | **Não usadas**. A contagem de visualizações do reel não é pública sem login; o "+6 milhões" vem só do site |

Nenhuma métrica foi combinada, somada ou arredondada para cima. Nenhuma foi apresentada como auditada por terceiros.

## 4. Identidade visual

### Cores (CSS do site no ar, `:root`)

| Token | Hex | Uso no vídeo |
| --- | --- | --- |
| `--black` | `#030303` | fundo |
| `--graphite` | `#141416` | superfícies |
| `--silver` | `#E4E4E4` | texto secundário |
| `--silver-soft` | `#A9ABB0` | notas e fonte das métricas |
| `--gold` | `#D4AF37` | linhas finas e ondas de áudio |
| `--gold-light` | `#FFE79A` | destaques e palavras-chave |
| `--gold-dark` | `#8F6714` | brilhos e sombra dourada |
| `--white` | `#FFFFFF` | texto principal |
| `--line` | `#FFE79A42` | linhas editoriais |

O cenário real do estúdio (thumbnails do YouTube) é quente: madeira, tijolo, couro marrom, luz âmbar, neon "CAFÉ COM ZAKIA / PODCAST AO VIVO", cortinas azul-marinho e canecas com o logo. O vídeo combina o preto e dourado do site com esse âmbar das fotos.

### Fontes

- O site declara **Georgia** (títulos, 19 regras) e **Inter** (texto corrido, 4 regras), sem arquivos `@font-face`: a Georgia é fonte de sistema e não pode ser embarcada.
- No vídeo: **Gelasio** (Google Fonts, OFL), desenhada com métricas compatíveis com a Georgia, para os títulos; **Inter** (Google Fonts, OFL) para métricas e chamadas. Os arquivos `.woff2` e as licenças estão em `assets/fonts/`.
- Títulos em caixa alta e dourado-claro, como o `h1` do site (`text-transform: uppercase; color: var(--gold-light)`).

### Logos

- **`/assets/logo-white.png`** (800×800, branco sobre transparente): é o logo usado no topo e no rodapé do site. **Usado no vídeo**, recortado ao conteúdo (433×309), sem nenhuma alteração de forma ou cor.
- `/assets/logo.png` (marrom + preto) está no servidor, mas não é referenciado pelo site atual e não aparece sobre fundo escuro. Não usado.
- `/assets/favicon-z.png` (selo "Z" com aro dourado): não usado.
- Nas thumbnails há um selo branco "CAFÉ COM ZÁKIA | Falando de Negócios — Marketing · Vendas · Estratégia". Ele foi cortado das imagens e não foi usado.

## 5. Tom de voz encontrado

Premium, institucional e confiante: "Conversas premium", "Imagem, conversa e reputação no mesmo palco", "Conversas com elegância, profundidade e leitura de negócios", "vitrine de autoridade". O vocabulário gira em torno de autoridade, reputação, presença e posicionamento. O canal do YouTube usa títulos em caixa alta, mais populares, com temas de negócios, política, saúde, esporte e espiritualidade.

## 6. Origem de cada mídia usada no vídeo

Todos os arquivos estão em `assets/`. As imagens foram recortadas e ampliadas por `build/prep_images.py` (Lanczos + nitidez leve). Nenhuma veio da pasta local.

| Arquivo | Origem (URL) | Publicação de origem | Origem | Acesso | Cena |
| --- | --- | --- | --- | --- | --- |
| `assets/img/logo-cafe-com-zakia-branco.png` | https://www.cafecomzakia.com.br/assets/logo-white.png | Logo do cabeçalho e rodapé do site | Site | 27/10/2026 | 2, 6 |
| `assets/img/s2-estudio-daniel.jpg` | https://i.ytimg.com/vi/kOaDJWxeW0w/maxresdefault.jpg (recorte x640–1280, y196–578) | Thumbnail oficial de "DÉBORA MARCELA: DOS SISTEMAS AOS 30 ANOS DE REVISTA STAMPA" (13ª temporada, 3º episódio), mostrando Daniel Devitto Zákia | YouTube @cafecomzakia | 27/10/2026 | 2 |
| `assets/img/s3-negocios.jpg` | mesma thumbnail kOaDJWxeW0w (recorte x0–600, y262–578) | Convidada Débora Marcela ("Proprietária da Revista Stampa", segundo a thumbnail) | YouTube | 27/10/2026 | 3 |
| `assets/img/s3-lideranca.jpg` | https://i.ytimg.com/vi/GHRLO0zxVMg/maxresdefault.jpg (recorte x0–530, y262–578) | "Falando de Negócios com Raphael Ferris" (11ª temporada, 11º episódio); thumbnail: "Dr. Raphael Ferris — Presidente da CREFITO-SP" | YouTube | 27/10/2026 | 3 |
| `assets/img/s3-comunicacao.jpg` | https://i.ytimg.com/vi/0FGdJ3bqnqk/maxresdefault.jpg (recorte x0–600, y262–578) | "Falando de Negócios com Andréa Justino" (11ª temporada, 12º episódio); thumbnail: "Prof. Andréa Justino — Professora de Português". A estampa "Gramática Desfragmentada" na camiseta é da convidada, não é patrocinador | YouTube | 27/10/2026 | 3 |
| `assets/img/s5-mesa.jpg` | https://i.ytimg.com/vi/FbfFaww9XLc/maxresdefault.jpg (recorte x335–940, y250–578) | "POLÍTICA E EMPREENDEDORISMO JUNTOS? \| Fábio Silva Carvalho" (13ª temporada, 8º episódio). Só a mesa, as canecas e os microfones | YouTube | 27/10/2026 | 5 |
| `assets/img/bg-estudio-desfocado.jpg` | thumbnail kOaDJWxeW0w (recorte x430–770, y200–578, desfocado e escurecido) | Fundo atmosférico do cenário | YouTube | 27/10/2026 | 1, 4 |
| `assets/fonts/Gelasio-VF.woff2`, `Gelasio-Italic-VF.woff2`, `Inter-VF.woff2` | fonts.gstatic.com (Google Fonts) | — | Fontes abertas (OFL) | 27/10/2026 | todas |
| `assets/audio/trilha-original-master.wav` (+ stems) | gerada por `build/trilha.py` (semente 20261027) | — | Original | 27/10/2026 | todas |
| `assets/vendor/gsap.min.js` | npm `gsap@3.14.2` | — | Biblioteca | 27/10/2026 | runtime |

Os nomes dos convidados **não aparecem na tela**. As imagens mostram momentos reais do programa e são acompanhadas por temas (negócios, liderança, comunicação), nunca por cargos ou depoimentos.

### Mídias encontradas e descartadas

| Mídia | Motivo |
| --- | --- |
| `hero-cafe-zakia-final.jpg` (imagem de capa do site) | Composição ilustrativa com painéis e rostos de "convidados" que não correspondem a episódios verificáveis ("Ep. 46 O Futuro do Marketing" etc.) e um gráfico de "Engajamento do Ouvinte" sem dados. Usá-la exibiria convidados e métricas não verificados |
| `estudio.jpg` (foto do estúdio no site) | Mostra outras marcas (logo na mesa e anúncio na TV), o que poderia ser lido como patrocínio. Além disso, é de um cenário diferente do que aparece nos episódios atuais |
| Capa do reel DX4Vzw8FV9a (Instagram) | Traz o logo do Mercado Livre em destaque (tema do corte). Num vídeo para patrocinadores, sugeriria um patrocínio inexistente. Também tem o ícone de play da interface |
| Depoimentos (`depoimentos-youtube/*.png`) | São capturas de tela de comentários com interface do YouTube; o briefing proíbe depoimentos inventados e desaconselha interface de plataforma |
