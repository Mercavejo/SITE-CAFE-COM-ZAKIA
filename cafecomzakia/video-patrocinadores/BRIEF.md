# BRIEF.md — Café com Zákia | Vídeo para patrocinadores (15 s, 9:16)

## Objetivo comercial

Convidar empresas a **iniciar uma conversa comercial** para patrocinar o Café com Zákia. Cada cena responde a "por que a sua marca deveria estar aqui", e o vídeo termina num convite claro, compreensível sem áudio.

## Público

Empresários, gestores de marketing, diretores comerciais, agências, marcas interessadas em conteúdo, empresas que buscam autoridade e relacionamento, e parceiros institucionais, em especial de Catanduva e região. Assistem no celular, muitas vezes sem som.

## Mensagem principal (proposta da campanha, não é slogan oficial)

> Associe sua marca a conversas relevantes sobre negócios, liderança e comunicação.

No vídeo ela aparece como "E se a sua marca estivesse nesta conversa?" (cena 1) e "Sua marca nessa conversa." (cena 5), sobre provas reais: estúdio, convidados, alcance e o telão do estúdio.

## O que mudou na versão 2 (feedback do cliente)

O cliente achou a versão 1 genérica e pediu que a simulação de marca não usasse imagem gerada artificialmente. Mudanças:

1. **Só material real.** Todas as fotos vêm de quadros reais das gravações (imagens automáticas que o YouTube extrai do próprio vídeo). O cenário de tijolo e neon das thumbnails, usado na v1, não é o estúdio real e saiu.
2. **Simulação de patrocínio no telão real.** Na cena 5, um plano aberto real de um episódio mostra o telão do estúdio, que nos episódios exibe a marca do programa. O telão "troca de canal" para "SUA MARCA" e a câmera aproxima. O espaço existe de fato no estúdio. A troca é rotulada "SIMULAÇÃO".
3. **Identidade real.** O logo dourado 3D (enviado pelo cliente, igual às placas de mesa do estúdio) substitui o logo branco do site.
4. **Fatos específicos no lugar de frases genéricas:** o posicionamento oficial "Negócios · Direito · Política" e as palavras do trailer oficial "clareza, profundidade e sem enrolação"; o selo "14ª temporada"; e os canais "YouTube · Spotify · Instagram · TV BOA".
5. **Pesquisa ampliada com o Agent-Reach** (web, YouTube, Instagram). Ver BRAND.md.

## Decisões criativas

- **Ritmo:** trilha original a 120 BPM. Trocas de cena em 1,5 / 4,0 / 7,0 / 10,0 / 12,5 s. Na cena 3, seis convidados reais em cortes de 0,5 s (uma batida dupla cada).
- **Gancho no quadro 0:** "E SE A / SUA MARCA" já está na tela sobre o plano real da mesa e do telão; "ESTIVESSE NESTA CONVERSA?" entra na primeira batida.
- **Transições:** onda de áudio dourada que vira o fio do logo (1→2); zoom através do quadro do estúdio (2→3); chicote a cada convidado; escurecimento antes do corte (3→4); troca por desfoque (4→5); o telão cresce até virar o fundo do CTA (5→6).
- **Áreas seguras:** texto entre y≈236 e y≈1300; margens laterais de 100 px; títulos ≥ 96 px; textos secundários ≥ 34 px. Abaixo de y≈1330 só há imagem.
- **Som:** trilha e design de som originais gerados por código (`build/trilha.py`). O clique em 10,62 s marca o telão trocando para "SUA MARCA". Master em −14 LUFS.

## Frases criadas para a campanha (não são slogans oficiais)

- "E SE A SUA MARCA ESTIVESSE NESTA CONVERSA?" (cena 1)
- "SUA MARCA NESSA CONVERSA." (cena 5)
- "Conteúdo. Autoridade. Relacionamento." (cena 5)
- "SUA MARCA" no telão e o rótulo "SIMULAÇÃO" (cena 5)
- "SEJA UM PATROCINADOR" / "FALE COM A EQUIPE" (cena 6)

Textos oficiais usados literalmente: "Café com Zákia" (logo), "Negócios · Direito · Política" e "clareza / profundidade / sem enrolação" (trailer oficial), "com Daniel Zákia", "14ª temporada", "empresários, líderes e especialistas", "+ de 6 milhões", "+1 milhão de visualizações no YouTube", "cafecomzakia.com.br" e "@cafecomzakia".

## Informações que ficaram de fora

- **Periodicidade semanal:** prometida na estreia, mas as datas recentes não são exatamente semanais.
- **Marcas vistas no estúdio** (Empório Abadesco, VOX): não foi possível confirmar se eram patrocínios; não aparecem nem são citadas.
- **Nomes e cargos dos convidados:** verificados nas fontes, mas fora da tela. O vídeo mostra pessoas reais sem atribuir falas ou endosso.
- **Inscritos (4,3 mil), total de vídeos (2.074), curtidas do reel (142 mil), Shorts mais vistos:** verificáveis, mas fora do recorte do roteiro.
- **Formatos, preços, exclusividade ou exposição garantida:** não há material oficial de patrocínio. A `/pacote` é para convidados.
- **WhatsApp (+55 17 99624-0418):** oficial, mas a mensagem pré-preenchida é para quem quer participar como convidado.
- **Frase do Facebook** ("depende da conversa será doce ou amargo"): lida num espelho de terceiros. Fica registrada, mas não foi usada.

## Limitações de acesso

- **Instagram pelo Agent-Reach:** o conector de Instagram não instalou ("OpenCLI extension release: HTTP 403"), e perfil e posts exigem login. A skill proíbe login em nome do usuário, então o Instagram ficou limitado aos metadados públicos do reel citado pelo site.
- **Instagram por curl:** o perfil redireciona para o login.
- **YouTube:** a listagem pública do canal e uma descrição de episódio foram lidas. Depois o YouTube passou a pedir verificação anti-bot ("Sign in to confirm you're not a bot"). Pela regra da skill, as consultas pararam aí. Não foi possível baixar trechos de vídeo nem legendas. As descrições restantes foram lidas na TV BOA, que espelha o canal.
- **Quadros reais:** vêm das imagens automáticas `maxres1/2/3.jpg` do YouTube (1280×720), que são frames do próprio vídeo. São fotos paradas, não trechos em movimento.

## Suposições adotadas

1. O projeto fica em `cafecomzakia/video-patrocinadores/`, na raiz do repositório.
2. O logo dourado enviado pelo cliente é material oficial e pode ser usado no vídeo.
3. As imagens automáticas do YouTube dos vídeos oficiais do canal são material do próprio Café com Zákia.
4. "+ de 6 milhões" é um único corte no Instagram, como o site descreve em três lugares.
5. A simulação no telão é só ilustrativa: não promete exibição no telão, menção, formato ou exposição.
