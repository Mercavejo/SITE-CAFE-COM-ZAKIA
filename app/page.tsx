const whatsappUrl =
  "https://wa.me/5517996233327?text=Ol%C3%A1%2C%20vim%20pelo%20site%20Caf%C3%A9%20com%20Z%C3%A1kia.%20Quero%20entender%20como%20participar%20do%20programa%20e%20posicionar%20minha%20marca.";
const channelUrl = "https://www.youtube.com/@cafecomzakia";
const presenterUrl = "https://www.danieldevittozakia.com.br/";
const mercavejoUrl = "https://www.mercavejo.com.br/";
const instagramReelUrl =
  "https://www.instagram.com/reel/DX4Vzw8FV9a/?igsh=MzdpaDRtazhpNXQ0";

export default function Home() {
  return (
    <main id="inicio">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Café com Zákia">
          <img src="/assets/logo-white.png" alt="Café com Zákia" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#autoridade">Autoridade</a>
          <a href="#programa">Programa</a>
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
              <a className="button secondary" href="#episodios">
                Assistir episódios
              </a>
            </div>
          </div>
          <aside className="hero-panel" aria-label="Indicadores do Café com Zákia">
            <span className="panel-label">Vitrine de autoridade</span>
            <strong>+5 milhões</strong>
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
              Ver corte com 5M+
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
          <span className="site-credit">
            Site desenvolvido por{" "}
            <a href={mercavejoUrl} target="_blank" rel="noopener">
              Mercavejo Consultoria
            </a>
          </span>
        </p>
        <div className="footer-links">
          <a href={channelUrl} target="_blank" rel="noopener">YouTube</a>
          <a href={mercavejoUrl} target="_blank" rel="noopener">Mercavejo Consultoria</a>
          <a href={whatsappUrl} target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </footer>
    </main>
  );
}
