import type { Metadata } from "next";
import {
  channelUrl,
  instagramUrl,
  mercavejoUrl,
  presenterUrl,
  siteUrl,
  whatsappUrl,
} from "../seo-data";

const packageWhatsAppUrl =
  "https://wa.me/5517996240418?text=Ol%C3%A1%2C%20quero%20participar%20do%20Podcast%20Caf%C3%A9%20com%20Z%C3%A1kia%20e%20aproveitar%20a%20promo%C3%A7%C3%A3o%20de%20R%24%20799%2C90.%20Pode%20me%20falar%20como%3F";

const packageItems = [
  "1 entrevista completa de até 1 hora",
  "1 hora de estúdio para a gravação",
  "1 edição completa do programa",
  "1 link para você baixar e ter sua entrevista completa",
  "Sua entrevista em nossa plataforma YouTube e Spotify",
  "+ de 20 cortes esparramados em todas as nossas redes sociais",
];

export const metadata: Metadata = {
  title: "Pacote Especial para Participar do Podcast",
  description:
    "Aproveite o pacote especial até julho de 2026 para participar do Café com Zákia, com entrevista completa, estúdio, edição, publicação e cortes nas redes sociais.",
  keywords: [
    "pacote podcast",
    "participar do Café com Zákia",
    "promoção podcast",
    "entrevista podcast",
    "podcast de negócios",
    "Café com Zákia",
  ],
  alternates: {
    canonical: "/pacote",
  },
  openGraph: {
    title: "Pacote Especial Café com Zákia",
    description:
      "Entrevista completa, estúdio, edição, publicação no YouTube e Spotify e + de 20 cortes para redes sociais.",
    url: `${siteUrl}/pacote`,
    type: "website",
    siteName: "Café com Zákia",
    locale: "pt_BR",
    images: [
      {
        url: "/assets/hero-cafe-zakia-final.jpg",
        alt: "Pacote especial Café com Zákia",
        width: 1920,
        height: 1080,
      },
    ],
  },
};

export default function PackagePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Offer",
        name: "Pacote Especial Café com Zákia",
        url: `${siteUrl}/pacote`,
        price: "799.90",
        priceCurrency: "BRL",
        availabilityEnds: "2026-07-31",
        itemOffered: {
          "@type": "Service",
          name: "Participação no Podcast Café com Zákia",
          serviceType: "Entrevista em podcast de negócios",
          provider: {
            "@type": "Organization",
            name: "Café com Zákia",
            url: siteUrl,
          },
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/pacote#webpage`,
        url: `${siteUrl}/pacote`,
        name: "Pacote Especial Café com Zákia",
        description:
          "Pacote promocional para entrevista completa no Café com Zákia, sujeito à curadoria e aprovação da equipe.",
        inLanguage: "pt-BR",
      },
    ],
  };

  return (
    <main className="package-page">
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
          <a href="/#episodios">Episódios</a>
          <a href="/#participar">Participar</a>
        </nav>
        <a className="nav-cta" href={packageWhatsAppUrl} target="_blank" rel="noopener">
          Aproveitar promoção
        </a>
      </header>

      <section className="package-hero">
        <div className="package-hero-bg" />
        <div className="package-shell package-hero-grid">
          <div className="package-hero-copy">
            <p className="eyebrow">Pacote especial até julho de 2026</p>
            <h1>Aproveite a promoção para apresentar sua história no Café com Zákia.</h1>
            <p>
              Uma experiência premium para quem deseja transformar trajetória, presença e reputação
              em conteúdo de autoridade. A participação é exclusiva e passa por curadoria da nossa
              equipe antes da aprovação.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={packageWhatsAppUrl} target="_blank" rel="noopener">
                Fale conosco agora
              </a>
              <a className="button secondary" href="#criterio">
                Entenda a curadoria
              </a>
            </div>
          </div>

          <aside className="package-price-card" aria-label="Valores do pacote especial">
            <span className="panel-label">Oferta especial</span>
            <strong>R$ 799,90</strong>
            <p>à vista</p>
            <div className="panel-line" />
            <strong className="installments">2x de R$ 450,00</strong>
            <p>condição promocional até julho de 2026</p>
            <a className="button primary full" href={packageWhatsAppUrl} target="_blank" rel="noopener">
              Aproveitar promoção
            </a>
          </aside>
        </div>
      </section>

      <section className="package-includes">
        <div className="package-shell">
          <div className="section-heading centered">
            <p className="eyebrow">O que está incluso</p>
            <h2>Um pacote completo para gravar, editar, publicar e distribuir sua entrevista.</h2>
            <p>
              A estrutura foi pensada para entregar presença profissional e conteúdo real para quem
              tem uma história capaz de somar com a vida de outras pessoas.
            </p>
          </div>
          <div className="package-items-grid">
            {packageItems.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="package-filter" id="criterio">
        <div className="package-shell package-filter-grid">
          <div>
            <p className="eyebrow">Curadoria obrigatória</p>
            <h2>Sua história precisa ser aprovada antes de entrar na mesa.</h2>
            <p>
              Mesmo desejando participar e aproveitando a promoção, a entrevista não é aprovada de
              forma automática. Nossa equipe faz um estudo detalhado da sua história, da sua mensagem,
              do seu posicionamento e do quanto essa conversa pode agregar para o público.
            </p>
          </div>
          <aside>
            <strong>Critério de aprovação</strong>
            <p>
              A participação acontece quando entendemos que a história tem verdade, relevância e
              potencial para somar com a vida de muita gente. O Café com Zákia é uma vitrine de
              autoridade, por isso preservamos o nível do programa e a experiência do público.
            </p>
          </aside>
        </div>
      </section>

      <section className="package-cta">
        <div className="package-shell">
          <p className="eyebrow">Próximo passo</p>
          <h2>Fale conosco agora e aproveite a promoção.</h2>
          <p>
            Envie sua mensagem pelo WhatsApp. A equipe da Mercavejo Consultoria vai orientar os
            próximos passos e iniciar a análise da sua história para o Café com Zákia.
          </p>
          <a className="button primary" href={packageWhatsAppUrl} target="_blank" rel="noopener">
            Quero participar do Podcast Café com Zákia
          </a>
        </div>
      </section>

      <footer className="footer">
        <img src="/assets/logo-white.png" alt="Café com Zákia" />
        <p>
          <strong>Café com Zákia</strong>
          <span>Falando de Negócios • Produção Mercavejo Consultoria</span>
          <span>Pacote especial sujeito à curadoria e aprovação da equipe</span>
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
