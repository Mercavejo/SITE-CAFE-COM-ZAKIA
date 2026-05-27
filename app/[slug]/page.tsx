import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  channelUrl,
  getSeoTopic,
  instagramReelUrl,
  instagramUrl,
  mercavejoUrl,
  presenterUrl,
  seoTopicList,
  siteUrl,
  whatsappUrl,
} from "../seo-data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return seoTopicList.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getSeoTopic(slug);

  if (!topic) {
    return {};
  }

  return {
    title: topic.title,
    description: topic.description,
    keywords: topic.keywords,
    alternates: {
      canonical: `/${topic.slug}`,
    },
    openGraph: {
      title: `${topic.title} | Café com Zákia`,
      description: topic.description,
      url: `${siteUrl}/${topic.slug}`,
      type: "article",
      siteName: "Café com Zákia",
      locale: "pt_BR",
      images: [
        {
          url: "/assets/hero-cafe-zakia-final.jpg",
          alt: "Café com Zákia",
          width: 1920,
          height: 1080,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: topic.title,
      description: topic.description,
      images: ["/assets/hero-cafe-zakia-final.jpg"],
    },
  };
}

export default async function SeoTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getSeoTopic(slug);

  if (!topic) {
    notFound();
  }

  const relatedTopics = seoTopicList.filter((item) => item.slug !== topic.slug).slice(0, 3);
  const pageUrl = `${siteUrl}/${topic.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: topic.title,
        description: topic.description,
        inLanguage: "pt-BR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: "Café com Zákia",
          url: siteUrl,
        },
        about: {
          "@type": "PodcastSeries",
          name: "Café com Zákia",
          url: siteUrl,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}/assets/hero-cafe-zakia-final.jpg`,
          width: 1920,
          height: 1080,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
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
            name: topic.kicker,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: topic.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="seo-page">
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
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noopener">
          Quero participar
        </a>
      </header>

      <section className="seo-hero">
        <div className="seo-hero-bg" />
        <div className="seo-shell">
          <p className="eyebrow">{topic.kicker}</p>
          <h1>{topic.headline}</h1>
          <p className="seo-lead">{topic.lead}</p>
          <div className="hero-actions">
            <a className="button primary" href={whatsappUrl} target="_blank" rel="noopener">
              Falar com a Mercavejo
            </a>
            <a className="button secondary" href={channelUrl} target="_blank" rel="noopener">
              Ver canal no YouTube
            </a>
            <a className="button secondary" href={instagramUrl} target="_blank" rel="noopener">
              Ver Instagram @cafecomzakia
            </a>
          </div>
        </div>
      </section>

      <section className="seo-content">
        <div className="seo-shell seo-grid">
          <article className="seo-main-card">
            <p className="eyebrow">Café com Zákia</p>
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <strong>{topic.proof}</strong>
          </article>
          <aside className="seo-side-card">
            <span className="panel-label">Direção</span>
            <h3>Daniel Zákia</h3>
            <p>
              Conversas premium sobre negócios, autoridade, marketing, reputação e trajetória.
              Presença conectada ao YouTube e Instagram @cafecomzakia.
            </p>
            <a className="text-link" href={presenterUrl} target="_blank" rel="noopener">
              Conhecer Daniel Devitto Zákia
            </a>
          </aside>
        </div>

        <div className="seo-shell seo-card-grid">
          {topic.sections.map((section) => (
            <article key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </article>
          ))}
        </div>

        <div className="seo-shell seo-faq">
          <p className="eyebrow">Perguntas frequentes</p>
          <h2>O que o público procura antes de participar.</h2>
          <div className="faq-list">
            {topic.faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="seo-shell seo-related">
          <p className="eyebrow">Temas relacionados</p>
          <div>
            {relatedTopics.map((item) => (
              <a key={item.slug} href={`/${item.slug}`}>
                {item.kicker}
              </a>
            ))}
          </div>
        </div>

        <div className="seo-shell seo-footer-cta">
          <h2>Quer transformar presença em autoridade?</h2>
          <p>
            Fale com a Mercavejo Consultoria e entenda como sua marca pode participar do
            Café com Zákia com uma apresentação elegante, estratégica e profissional,
            somando site, YouTube e Instagram.
          </p>
          <a className="button primary" href={whatsappUrl} target="_blank" rel="noopener">
            Solicitar disponibilidade
          </a>
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
          <a href={channelUrl} target="_blank" rel="noopener">
            YouTube
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener">
            Instagram
          </a>
          <a href={presenterUrl} target="_blank" rel="noopener">
            Daniel Zákia
          </a>
          <a href={instagramReelUrl} target="_blank" rel="noopener">
            Corte com + de 6 milhões
          </a>
          <a href={mercavejoUrl} target="_blank" rel="noopener">
            Mercavejo Consultoria
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener">
            WhatsApp
          </a>
        </div>
      </footer>
    </main>
  );
}
