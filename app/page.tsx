import { seoTopicList } from "./seo-data";

const whatsappUrl =
  "https://wa.me/5517996240418?text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20%40cafecomzakia%2C%20gostaria%20de%20saber%20como%20participar%3F";
const channelUrl = "https://www.youtube.com/@cafecomzakia";
const instagramUrl = "https://www.instagram.com/cafecomzakia/";
const presenterUrl = "https://www.danieldevittozakia.com.br/";
const mercavejoUrl = "https://www.mercavejo.com.br/";
const instagramReelUrl =
  "https://www.instagram.com/reel/DX4Vzw8FV9a/?igsh=MzdpaDRtazhpNXQ0";
const siteUrl = "https://www.cafecomzakia.com.br";
const youtubeTestimonials = [
  {
    src: "/assets/depoimentos-youtube/youtube-comment-01.png",
    alt: "Depoimento no YouTube parabenizando o canal pela entrevista importante.",
  },
  {
    src: "/assets/depoimentos-youtube/youtube-comment-02.png",
    alt: "Depoimento no YouTube parabenizando Daniel Zákia pela escolha dos temas.",
  },
  {
    src: "/assets/depoimentos-youtube/youtube-comment-03.png",
    alt: "Depoimento no YouTube elogiando a entrevista do Café com Zákia.",
  },
  {
    src: "/assets/depoimentos-youtube/youtube-comment-04.png",
    alt: "Depoimento no YouTube dizendo ser fã do canal Café com Zákia.",
  },
  {
    src: "/assets/depoimentos-youtube/youtube-comment-05.png",
    alt: "Depoimento no YouTube agradecendo a oportunidade e a condução da entrevista.",
  },
  {
    src: "/assets/depoimentos-youtube/youtube-comment-06.png",
    alt: "Depoimentos no YouTube parabenizando Daniel Zákia pela entrevista.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Café com Zákia",
      alternateName: "Café com Zákia Falando de Negócios",
      url: siteUrl,
      inLanguage: "pt-BR",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Café com Zákia | Podcast de Negócios com Daniel Zákia",
      description:
        "Podcast de negócios com entrevistas premium para empresários, líderes e especialistas que desejam construir autoridade, visibilidade e posicionamento.",
      inLanguage: "pt-BR",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#podcast`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/hero-cafe-zakia-final.jpg`,
        width: 1920,
        height: 1080,
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Café com Zákia",
      url: siteUrl,
      logo: `${siteUrl}/assets/logo-white.png`,
      sameAs: [channelUrl, instagramUrl, instagramReelUrl, presenterUrl, mercavejoUrl],
      founder: {
        "@id": `${siteUrl}/#daniel-zakia`,
      },
      parentOrganization: {
        "@type": "Organization",
        name: "Mercavejo Consultoria",
        url: mercavejoUrl,
      },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#daniel-zakia`,
      name: "Daniel Zákia",
      alternateName: "Daniel Devitto Zákia",
      url: presenterUrl,
      jobTitle: "Apresentador do Café com Zákia",
      worksFor: {
        "@id": `${siteUrl}/#organization`,
      },
      sameAs: [presenterUrl, channelUrl],
      mainEntityOfPage: presenterUrl,
    },
    {
      "@type": "PodcastSeries",
      "@id": `${siteUrl}/#podcast`,
      name: "Café com Zákia",
      alternateName: "Café com Zákia Falando de Negócios",
      url: siteUrl,
      inLanguage: "pt-BR",
      genre: ["Negócios", "Empreendedorismo", "Entrevistas"],
      description:
        "Podcast de negócios conduzido por Daniel Zákia, com conversas premium para empresários, líderes e especialistas.",
      image: `${siteUrl}/assets/hero-cafe-zakia-final.jpg`,
      author: {
        "@id": `${siteUrl}/#daniel-zakia`,
      },
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      sameAs: [channelUrl, instagramUrl],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Episódios",
          item: `${siteUrl}/#episodios`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Participar",
          item: `${siteUrl}/#participar`,
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <main id="inicio">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Café com Zákia">
          <img src="/assets/logo-white.png" alt="Café com Zákia" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#autoridade">Autoridade</a>
          <a href="#programa">Programa</a>
          <a href="/pacote">Pacote</a>
          <a href="#episodios">Episódios</a>
          <a href="#participar">Participar</a>
        </nav>
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noopener">
          Quero participar
        </a>
      </header>

      <section className="hero" aria-label="Capa do Café com Zákia">
        <div className="hero-bg" />
        <div className="hero-shade" />
        <div className="hero-gold-line" />
        <div className="hero-inner">
          <div className="hero-copy-block">
            <p className="eyebrow">Podcast de negócios • Conversas premium</p>
            <h1>Café com Zákia</h1>
            <p className="subtitle">Falando de Negócios</p>
            <p className="presenter">
              com <strong>Daniel Zákia</strong>
            </p>
            <p className="hero-copy">
              Um encontro sofisticado para empresários, líderes e especialistas que desejam
              apresentar história, presença e reputação com autoridade. Produção e estratégia da{" "}
              <strong>Mercavejo Consultoria</strong>.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={whatsappUrl} target="_blank" rel="noopener">
                Quero participar do podcast
              </a>
              <a className="button secondary" href="/pacote">
                Ver pacote especial
              </a>
              <a className="button secondary" href="#episodios">
                Assistir episódios
              </a>
            </div>
          </div>
          <aside className="hero-panel" aria-label="Indicadores do Café com Zákia">
            <span className="panel-label">Vitrine de autoridade</span>
            <strong>+ de 6 milhões</strong>
            <p>em cortes de alta performance nas redes sociais.</p>
            <div className="panel-line" />
            <strong>+1 milhão</strong>
            <p>de visualizações no YouTube do Café com Zákia.</p>
          </aside>
        </div>
      </section>

      <section className="authority" id="autoridade">
        <div className="section-heading">
          <p className="eyebrow">Autoridade</p>
          <h2>Imagem, conversa e reputação no mesmo palco.</h2>
          <p>
            O Café com Zákia posiciona o convidado em um ambiente de prestígio, com estética
            refinada, condução estratégica e comunicação pensada para gerar confiança, desejo
            e valor de mercado.
          </p>
        </div>
        <div className="metric-grid">
          <article>
            <span>01</span>
            <h3>Presença premium</h3>
            <p>Um ambiente visual de alto nível para reforçar sofisticação, preparo e credibilidade.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Narrativa estratégica</h3>
            <p>Perguntas e condução para destacar trajetória, posicionamento, diferenciais e visão.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Distribuição digital</h3>
            <p>Conteúdo pensado para episódios, cortes, redes sociais e construção de reputação.</p>
          </article>
        </div>
      </section>

      <section className="search-topics" aria-label="Temas estratégicos para buscas">
        <div className="section-heading centered">
          <p className="eyebrow">Buscas estratégicas</p>
          <h2>O Café com Zákia também é referência para quem procura negócios, entrevistas, vídeos e marketing.</h2>
          <p>
            O site trabalha junto com o YouTube <strong>@cafecomzakia</strong> e o Instagram{" "}
            <strong>@cafecomzakia</strong>, incluindo prova social com corte acima de 6 milhões
            de visualizações.
          </p>
        </div>
        <div className="topic-links">
          {seoTopicList.map((topic) => (
            <a key={topic.slug} href={`/${topic.slug}`}>
              {topic.kicker}
            </a>
          ))}
        </div>
      </section>

      <section className="presenter-section" aria-label="Quem é o apresentador do Café com Zákia">
        <div className="presenter-inner">
          <div>
            <p className="eyebrow">Apresentador e entrevistador</p>
            <h2>Daniel Zákia conduz o Café com Zákia com visão de negócios, presença e autoridade.</h2>
            <p>
              Para quem busca entender quem é o entrevistador do Café com Zákia, o site oficial de
              Daniel Devitto Zákia apresenta sua trajetória, posicionamento e presença profissional.
              Essa conexão fortalece o programa, o apresentador e a autoridade da marca nos buscadores.
            </p>
          </div>
          <a className="button primary" href={presenterUrl} target="_blank" rel="noopener">
            Conhecer Daniel Devitto Zákia
          </a>
        </div>
      </section>

      <section className="youtube-testimonials" aria-label="O que estão dizendo sobre o Café com Zákia">
        <div className="youtube-testimonials-inner">
          <div className="youtube-testimonials-heading">
            <p className="eyebrow">Prova social no YouTube</p>
            <h2>O que estão dizendo sobre o Café com Zákia</h2>
            <p>Depoimentos reais do nosso público no YouTube</p>
          </div>
          <div className="youtube-testimonials-grid">
            {youtubeTestimonials.map((testimonial) => (
              <article className="youtube-testimonial-card" key={testimonial.src}>
                <img src={testimonial.src} alt={testimonial.alt} loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="social-proof" aria-label="Autoridade digital do Café com Zákia">
        <div className="social-proof-inner">
          <div>
            <p className="eyebrow">Autoridade digital</p>
            <h2>Instagram e YouTube como vitrines de alcance real.</h2>
            <p>
              O Café com Zákia fortalece presença nas redes com episódios, cortes, conversas de
              negócios e conteúdos que ampliam reputação para convidados e marcas.
            </p>
          </div>
          <div className="social-proof-cards">
            <a href={channelUrl} target="_blank" rel="noopener">
              <span>YouTube</span>
              <strong>@cafecomzakia</strong>
              <small>Canal oficial com episódios e entrevistas</small>
            </a>
            <a href={instagramReelUrl} target="_blank" rel="noopener">
              <span>Instagram</span>
              <strong>+ de 6 milhões</strong>
              <small>corte viral no @cafecomzakia</small>
            </a>
          </div>
        </div>
      </section>

      <section className="program-section" id="programa">
        <div className="program-grid">
          <div className="program-media">
            <img src="/assets/estudio.jpg" alt="Estúdio Café com Zákia" />
          </div>
          <div className="program-content">
            <p className="eyebrow">Conversas com elegância e profundidade</p>
            <h2>Conversas com elegância, profundidade e leitura de negócios.</h2>
            <p className="program-description">
              Cada entrevista é construída para revelar o valor do convidado com seriedade e
              autoridade. Uma experiência premium para quem deseja posicionar sua marca e trajetória.
            </p>
            <div className="features">
              <div>Condução com foco em autoridade e reputação</div>
              <div>Estética alinhada ao mundo dos negócios</div>
              <div>Direcionamento comercial pela Mercavejo Consultoria</div>
            </div>
            <div className="seasons">
              <h3>Últimas Temporadas</h3>
              <div className="season-links">
                <a href="https://www.youtube.com/watch?v=_OMB2fwzfPk&list=PLq1xuEiBAG6o_pgqouUMZaKiTp8N0WoCA" target="_blank" rel="noopener" className="season-btn">
                  11ª Temporada <span>→</span>
                </a>
                <a href="https://www.youtube.com/watch?v=qP6y_zoP2Q4&list=PLq1xuEiBAG6pva_7PCjUrLQUyfYa66uim" target="_blank" rel="noopener" className="season-btn">
                  10ª Temporada <span>→</span>
                </a>
                <a href="https://www.youtube.com/watch?v=YMwb8LTZHjg&list=PLq1xuEiBAG6oMcd2vsVUI8PbD1b322dKL" target="_blank" rel="noopener" className="season-btn">
                  9ª Temporada <span>→</span>
                </a>
              </div>
            </div>
            <a href={channelUrl} target="_blank" rel="noopener" className="button primary large">
              Saiba mais • Ver todas as entrevistas
            </a>
          </div>
        </div>
      </section>

      <section className="episodes" id="episodios">
        <div className="section-heading centered">
          <p className="eyebrow">Episódios</p>
          <h2>Assista ao canal e veja o padrão de conversa antes de entrar na mesa.</h2>
          <p>Este bloco destaca o canal oficial, os episódios passados e a qualidade da produção para quem deseja participar.</p>
        </div>
        <div className="episode-showcase">
          <div className="video-frame">
            <a className="youtube-fallback" href={channelUrl} target="_blank" rel="noopener">
              <span>Canal oficial</span>
              <strong>Assistir no YouTube</strong>
              <em>Café com Zákia</em>
            </a>
          </div>
          <aside className="episode-card">
            <span className="panel-label">Próximo destaque</span>
            <h3>Trailer, próximo convidado ou episódio em evidência.</h3>
            <p>Uma vitrine para mostrar a força do programa, os episódios passados e a qualidade da produção para quem deseja participar.</p>
            <a className="button primary full" href={channelUrl} target="_blank" rel="noopener">
              Abrir canal no YouTube
            </a>
            <a className="button outline full" href={instagramReelUrl} target="_blank" rel="noopener">
              Ver corte com + de 6 milhões
            </a>
          </aside>
        </div>
      </section>

      <section className="participate" id="participar">
        <div className="participate-copy">
          <p className="eyebrow">Participar</p>
          <h2>Se a sua história merece palco, ela precisa ser apresentada com valor.</h2>
          <p>
            Fale com a equipe da Mercavejo Consultoria e entenda como levar sua marca,
            sua trajetória ou sua empresa para o Café com Zákia.
          </p>
        </div>
        <div className="participate-card">
          <h3>Solicite disponibilidade</h3>
          <p>Atendimento direto pelo WhatsApp para agenda, formato e próximos passos.</p>
          <a className="button primary full" href={whatsappUrl} target="_blank" rel="noopener">
            Entrar pelo WhatsApp
          </a>
          <small>Mercavejo Consultoria • Gestão e produção</small>
        </div>
      </section>

      <footer className="footer">
        <img src="/assets/logo-white.png" alt="Café com Zákia" />
        <p>
          <strong>Café com Zákia</strong>
          <span>Falando de Negócios • Produção Mercavejo Consultoria</span>
          <span>Canal oficial: YouTube e Instagram @cafecomzakia</span>
          <span className="site-credit">
            Site desenvolvido por{" "}
            <a href={mercavejoUrl} target="_blank" rel="noopener">
              Mercavejo Consultoria
            </a>
          </span>
        </p>
        <div className="footer-links">
          <a href={channelUrl} target="_blank" rel="noopener">YouTube</a>
          <a href={instagramUrl} target="_blank" rel="noopener">Instagram</a>
          <a href={presenterUrl} target="_blank" rel="noopener">Daniel Zákia</a>
          <a href={mercavejoUrl} target="_blank" rel="noopener">Mercavejo Consultoria</a>
          <a href={whatsappUrl} target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </footer>
    </main>
  );
}
