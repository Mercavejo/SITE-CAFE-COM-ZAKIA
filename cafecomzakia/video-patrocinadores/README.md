# Café com Zákia — Vídeo para patrocinadores (15 s, 9:16)

Vídeo de motion graphics feito com [HyperFrames](https://hyperframes.heygen.com) (HTML + GSAP renderizado quadro a quadro).

- **Arquivo final:** `cafe-com-zakia-patrocinadores-15s.mp4` (1080×1920, 60 fps, 15,0 s, H.264 + AAC)
- **Levantamento e fontes:** `BRAND.md`
- **Brief, decisões e o que ficou de fora:** `BRIEF.md`
- **Roteiro quadro a quadro:** `STORYBOARD.md`
- **Revisão e relatório:** `REVIEW.md`, `build/check-report.json`, `snapshots/`

## Estrutura

```
index.html                    composição raiz: monta as cenas, a atmosfera, o grão e a trilha
compositions/
  s1-gancho.html              cena 1 (0,0–1,5 s)
  s2-identidade.html          cena 2 (1,5–4,0 s)
  s3-convidados.html          cena 3 (4,0–7,0 s)
  s4-metricas.html            cena 4 (7,0–10,0 s)   ← métricas
  s5-oportunidade.html        cena 5 (10,0–12,5 s)
  s6-cta.html                 cena 6 (12,5–15,0 s)  ← site e Instagram
  atmosfera.html              fundo contínuo (estúdio desfocado)
  grao.html                   grão de filme (adaptado do componente de registro grain-overlay)
  components/                 componentes de registro instalados (grain-overlay, number-wheel)
assets/
  img/                        quadros reais das gravações e logo dourado (origem em BRAND.md)
  fonts/                      Gelasio e Inter (.woff2, licença OFL)
  audio/                      trilha original (master + stems)
  vendor/gsap.min.js          GSAP 3.14.2 local
build/
  prep_images.py              recortes dos quadros reais e do logo dourado
  trilha.py                   trilha e design de som gerados por código (semente 20261027)
  master.sh                   masterização em -14 LUFS
  env.sh                      variáveis de ambiente (navegador headless, telemetria)
research/                     site, YouTube, Instagram, Agent-Reach, quadros reais e arquivo do cliente
snapshots/                    quadros de revisão
```

## Instalar as dependências

Requer Node.js 22+, `ffmpeg`/`ffprobe` e Python 3 com `numpy` e `Pillow`. Não há `npm install`: o CLI roda com `npx` na versão fixada.

```bash
cd cafecomzakia/video-patrocinadores
npx --yes hyperframes@0.8.209 --version     # baixa o CLI fixado
source build/env.sh                         # opcional: usa o Chromium do Playwright, se existir
```

Se o HyperFrames não encontrar o Chrome, aponte o headless shell:

```bash
export PRODUCER_HEADLESS_SHELL_PATH=/caminho/para/chrome-headless-shell
export HYPERFRAMES_BROWSER_PATH=$PRODUCER_HEADLESS_SHELL_PATH
```

## Visualizar

```bash
npx --yes hyperframes@0.8.209 preview --background   # abre o Studio no navegador
npx --yes hyperframes@0.8.209 preview --status
npx --yes hyperframes@0.8.209 preview --stop
```

Também dá para editar no app desktop do HyperFrames.

## Pesquisa com o Agent-Reach

O levantamento da versão 2 usou a skill [Agent-Reach](https://github.com/Panniantong/Agent-Reach) (somente leitura). Os resultados brutos estão em `research/agent-reach/`.

```bash
uv tool install https://github.com/Panniantong/Agent-Reach/releases/latest/download/agent-reach.zip
agent-reach setup
agent-reach web search "Café com Zákia podcast" --limit 10
agent-reach web read "https://tvboa.com.br/programas/cafe-com-zakia/"
agent-reach youtube search "Café com Zákia" --limit 10
agent-reach instagram profile cafecomzakia      # exige login próprio (agent-reach login instagram)
```

Em ambiente de nuvem, o YouTube pode pedir verificação anti-bot. Quando isso acontece, a skill manda parar as consultas, e o Instagram exige login feito pelo próprio usuário.

## Validar e gerar snapshots

```bash
npx --yes hyperframes@0.8.209 check                  # deve terminar com 0 erros
npx --yes hyperframes@0.8.209 snapshot --review --output snapshots/review
npx --yes hyperframes@0.8.209 snapshot --at 0,1.5,4,7.7,9,11.6,13,14.98 --output snapshots/frames
```

## Renderizar novamente

```bash
npx --yes hyperframes@0.8.209 render --fps 60 --quality delivery --keyframe-interval 2 \
  --format mp4 --strict -o cafe-com-zakia-patrocinadores-15s.mp4
ffprobe -v error -show_entries stream=codec_name,profile,width,height,r_frame_rate,pix_fmt,sample_rate,channels \
  -show_entries format=duration -of default=nw=1 cafe-com-zakia-patrocinadores-15s.mp4
```

## Regerar a trilha

```bash
python3 -I build/trilha.py     # gera os stems (mesmo resultado sempre: semente fixa)
bash build/master.sh           # cria assets/audio/trilha-original-master.wav em -14 LUFS
```

Os acertos de som (impactos, whooshes, cliques, xícara) estão na seção "SFX sincronizados" de `build/trilha.py`, com o tempo de cada um em segundos. Se uma cena mudar de tempo, ajuste ali.

## Substituir mídias

1. Coloque o novo arquivo em `assets/img/` (ou `assets/audio/`).
2. Troque o `src`/`url(...)` correspondente:
   - logo dourado: `#s2-logo` em `compositions/s2-identidade.html` e `#s6-logo` em `compositions/s6-cta.html`;
   - plano aberto do gancho: `#s1-img` em `s1-gancho.html`;
   - Daniel no estúdio: `#s2-foto` em `s2-identidade.html`;
   - convidados: `#s3-img1` a `#s3-img6` em `s3-convidados.html`;
   - telão (patrocínio conceitual): `#s5-foto` em `s5-oportunidade.html`. Se o novo quadro tiver o telão em outra posição, ajuste `left`/`top`/`width`/`height` de `#s5-tv` e `#s5-tv-flash`, a inclinação em `gsap.set(..., { rotation })` e o `transform-origin` de `#s5-cena` (centro do telão);
   - fundo: `real-bg-estudio.jpg` em `atmosfera.html` e `s4-metricas.html`;
   - trilha: `src` do `<audio id="trilha">` em `index.html`.
3. Para gerar recortes de outros quadros reais, baixe `https://i.ytimg.com/vi/<id>/maxres1.jpg` (ou `maxres2`/`maxres3`) para `research/youtube/frames/`, ajuste `build/prep_images.py` e rode `python3 -I build/prep_images.py`. Melhor ainda: use arquivos originais da gravação, se a equipe enviar.
4. Registre a origem do novo arquivo em `BRAND.md` (URL, publicação, data de acesso, cena).
5. Rode `check` e gere snapshots antes de renderizar.

## Como alterar as métricas

Todas as métricas estão em `compositions/s4-metricas.html`:

| O que | Elemento | Valor atual |
| --- | --- | --- |
| Prefixo da métrica 1 | `#s4-pre1` | `+ de` |
| Número rolando da métrica 1 | `data-value` de `#s4-n1` | `6` |
| Unidade da métrica 1 | `#s4-u1` | `milhões` |
| Legenda da métrica 1 | `#s4-l1` | `de visualizações em um corte no Instagram` |
| Número da métrica 2 | `#s4-n2` | `+1` |
| Unidade da métrica 2 | `#s4-u2` | `milhão` |
| Legenda da métrica 2 | `#s4-l2` | `de visualizações no YouTube` |
| Fonte | `#s4-fonte` | `Fonte: dados publicados pelo Café com Zákia` |

Regras: use só números publicados nas fontes oficiais, sem arredondar para cima e sem somar métricas. Atualize a tabela de métricas em `BRAND.md` com a nova fonte e a data. O contador rola de 0 até cada dígito de `data-value`: um valor de dois dígitos (ex.: `10`) funciona, mas confira o snapshot em 7,7 s para ver se a linha cabe na largura. Depois rode `check` e renderize de novo.
