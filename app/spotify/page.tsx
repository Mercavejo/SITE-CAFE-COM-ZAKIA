import type { Metadata } from "next";
import {
  channelUrl,
  instagramUrl,
  mercavejoUrl,
  presenterUrl,
  siteUrl,
  spotifyUrl,
  whatsappUrl,
} from "../seo-data";

const spotifyEmbedUrl =
  "https://open.spotify.com/embed/show/5HEziKX3xOOfV7eryMZ91v?utm_source=generator&theme=0";

export const metadata: Metadata = {
  title: "Café com Zákia no Spotify",
  description:
    "Ouça o Café com Zákia no Spotify. Podcast de negócios com Daniel Zákia, entrevistas premium, empresários, especialistas e conversas sobre autoridade.",
  keywords: [
    "Café com Zákia Spotify",
    "podcast Café com Zákia",
    "ouvir Café com Zákia",
    "Spotify Café com Zákia",
    "podcast de negócios Spotify",
    "Daniel Zákia",
  ],
  alternates: {
    canonical: "/spotify",
  },
  openGraph: {
    title: "Café com Zákia no Spotify",
    description:
      "Ouça episódios do Café com Zákia no Spotify e acompanhe conversas premium sobre negócios, autoridade e trajetória.",
    url: `${siteUrl}/spotify`,
    type: "website",
    siteName: "Café com Zákia",
    locale: "pt_BR",
    images: [
      {
        url: "/assets/hero-cafe-zakia-final.jpg",
        alt: "Café com Zákia no Spotify",
        width: 1920,
        height: 1080,
      },
    ],
  },
};

export default function SpotifyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/spotify#webpage`,
        url: `${siteUrl}/spotify`,
        name: "Café com Zákia no Spotify",
        description:
          "Página oficial para ouvir o Café com Zákia no Spotify, com episódios e entrevistas de negócios conduzidas por Daniel Zákia.",
        inLanguage: "pt-BR",
      },
      {
        "@type": "PodcastSeries",
        "@id": `${siteUrl}/#podcast`,
        name: "Café com Zákia",
        alternateName: "Café com Zákia Falando de Negócios",
        url: siteUrl,
        inLanguage: "pt-BR",
        genre: ["Negócios", "Empreendedorismo", "Entrevistas"],
        sameAs: [channelUrl, spotifyUrl, instagramUrl],
        author: {
          "@type": "Person",
          name: "Daniel Zákia",
          url: presenterUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "Café com Zákia",
          url: siteUrl,
        },
      },
    ],
  };

  return (
    <main className="spotify-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="topbar">
        <a className="brand" href="/" aria-label="Café com Zákia">
          <img src="/assets/logo-white.png" alt="Café com Zákia" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="/#autoridade">Autoridade</a>
          <a href="/#programa">Programa</a>
          <a href="/pacote">Pacote</a>
          <a href="/spotify">Spotify</a>
          <a href="/jogos">Jogos</a>
          <a href="/#episodios">Episódios</a>
          <a href="/#participar">Participar</a>
        </nav>
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noopener">
          Quero participar
        </a>
      </header>

      <section className="spotify-hero">
        <div className="spotify-hero-bg" />
        <div className="spotify-shell spotify-hero-grid">
          <div className="spotify-copy">
            <p className="eyebrow">Café com Zákia no Spotify</p>
            <h1>Ouça o Café com Zákia em qualquer lugar.</h1>
            <p>
              Acompanhe as conversas do podcast também no Spotify. Uma forma direta de ouvir
              entrevistas, histórias, negócios e trajetória com Daniel Zákia.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={spotifyUrl} target="_blank" rel="noopener">
                Abrir no Spotify
              </a>
              <a className="button secondary" href={channelUrl} target="_blank" rel="noopener">
                Assistir no YouTube
              </a>
            </div>
          </div>

          <aside className="spotify-card">
            <span className="panel-label">Player oficial</span>
            <iframe
              title="Café com Zákia no Spotify"
              src={spotifyEmbedUrl}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </aside>
        </div>
      </section>

      <section className="spotify-content">
        <div className="spotify-shell spotify-content-grid">
          <article>
            <span>01</span>
            <h2>Podcast de negócios para ouvir com profundidade.</h2>
            <p>
              O Spotify facilita acompanhar os episódios completos, revisitar entrevistas e consumir
              o conteúdo do Café com Zákia no seu ritmo.
            </p>
          </article>
          <article>
            <span>02</span>
            <h2>YouTube e Spotify trabalhando juntos.</h2>
            <p>
              O YouTube fortalece imagem e presença visual. O Spotify amplia alcance em áudio,
              criando mais caminhos para o público encontrar o programa.
            </p>
          </article>
          <article>
            <span>03</span>
            <h2>Mais uma vitrine para convidados e histórias.</h2>
            <p>
              Cada plataforma amplia a visibilidade do Café com Zákia e reforça a autoridade de quem
              participa de uma conversa aprovada pela nossa equipe.
            </p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <img src="/assets/logo-white.png" alt="Café com Zákia" />
        <p>
          <strong>Café com Zákia</strong>
          <span>Falando de Negócios • Produção Mercavejo Consultoria</span>
          <span>Ouça também no Spotify</span>
          <span className="site-credit">
            Site desenvolvido por{" "}
            <a href={mercavejoUrl} target="_blank" rel="noopener">
              Mercavejo Consultoria
            </a>
          </span>
        </p>
        <div className="footer-links">
          <a href={channelUrl} target="_blank" rel="noopener">
            YouTube
          </a>
          <a href={spotifyUrl} target="_blank" rel="noopener">
            Spotify
          </a>
          <a href="/jogos">Jogos</a>
          <a href={instagramUrl} target="_blank" rel="noopener">
            Instagram
          </a>
          <a href={presenterUrl} target="_blank" rel="noopener">
            Daniel Zákia
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener">
            WhatsApp
          </a>
        </div>
      </footer>
    </main>
  );
}
