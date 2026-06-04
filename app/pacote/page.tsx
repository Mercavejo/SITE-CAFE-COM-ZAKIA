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

const packageValueItems = [
  {
    item: "Gravação em estúdio",
    value: "R$ 400,00",
  },
  {
    item: "Edição e gravação do programa",
    value: "R$ 100,00",
  },
  {
    item: "Entrevista com Daniel Zákia",
    value: "R$ 800,00",
  },
  {
    item: "20 cortes extras para redes sociais",
    value: "R$ 1.000,00",
    note: "Referência de R$ 50,00 por corte, com mínimo de 10 cortes. Neste pacote, serão criados 20 cortes escolhidos pela nossa equipe para compartilhar em nossas plataformas.",
  },
];

const searchIntentBlocks = [
  {
    title: "Participar de podcast com autoridade",
    text: "Uma estrutura profissional para empresários, especialistas, candidatos, líderes e marcas que desejam ser entrevistados em um podcast de negócios com imagem forte, conversa séria e presença digital.",
  },
  {
    title: "Seja entrevistado e fique em evidência",
    text: "A entrevista posiciona sua história com elegância, fortalece reputação e cria conteúdo para quem precisa aparecer com credibilidade, sem perder sofisticação.",
  },
  {
    title: "Ganhe autoridade com mídia própria",
    text: "O Café com Zákia transforma trajetória em entrevista completa, cortes estratégicos e presença em plataformas como YouTube, Spotify e redes sociais.",
  },
  {
    title: "Seja mídia, tenha mídia e construa reputação",
    text: "O programa ajuda a apresentar sua mensagem em um ambiente premium, com estética de alto valor e linguagem voltada para negócios, marketing, liderança e posicionamento.",
  },
  {
    title: "Entrevista para candidatos e lideranças",
    text: "Para quem tem vida pública, atuação empresarial ou uma história relevante, a entrevista pode ampliar clareza, presença e conexão com o público certo.",
  },
  {
    title: "Podcast referência para negócios",
    text: "Uma vitrine para quem procura grandes podcasts, programas de entrevistas e canais sérios para mostrar experiência, visão e contribuição para a região.",
  },
];

const packageFaqs = [
  {
    question: "Como participar de podcast no Café com Zákia?",
    answer:
      "O primeiro passo é chamar nossa equipe no WhatsApp e contar brevemente sua história. Depois, a Mercavejo Consultoria faz uma análise para entender se a entrevista combina com o nível, o propósito e o público do Café com Zákia.",
  },
  {
    question: "Quem pode ser entrevistado no podcast?",
    answer:
      "Empresários, especialistas, profissionais liberais, candidatos, lideranças, criadores, marcas e pessoas com uma trajetória que possa inspirar, orientar ou agregar valor real para quem acompanha o programa.",
  },
  {
    question: "A entrevista ajuda a ganhar autoridade?",
    answer:
      "Sim. Uma entrevista bem conduzida pode fortalecer reputação, gerar conteúdo para redes sociais, posicionar sua história e aumentar sua presença como referência em negócios, marketing, liderança ou área de atuação.",
  },
  {
    question: "O pacote garante aprovação da entrevista?",
    answer:
      "Não. Mesmo desejando participar, sua história precisa passar por curadoria. A equipe avalia relevância, mensagem, posicionamento e potencial de contribuição antes de aprovar a participação.",
  },
  {
    question: "O Café com Zákia é indicado para quem quer ficar em evidência?",
    answer:
      "Sim, desde que a evidência venha acompanhada de verdade, conteúdo e propósito. O objetivo é apresentar histórias fortes com imagem premium, conversa profunda e distribuição estratégica.",
  },
];

export const metadata: Metadata = {
  title: "Participar de Podcast e Ganhar Autoridade | Pacote Café com Zákia",
  description:
    "Pacote especial de R$ 2.300,00 por R$ 799,90 para participar de podcast, ser entrevistado, ganhar autoridade e divulgar sua história no Café com Zákia.",
  keywords: [
    "participar de podcast",
    "como participar de podcast",
    "seja entrevistado",
    "ganhe autoridade",
    "fique em evidência",
    "seja mídia",
    "tenha mídia",
    "entrevista para candidatos",
    "podcast referência",
    "grandes podcasts",
    "melhor podcast da região",
    "pacote podcast",
    "participar do Café com Zákia",
    "promoção podcast",
    "entrevista podcast",
    "podcast de negócios",
    "falando de negócios",
    "marketing e negócios",
    "Café com Zákia",
  ],
  alternates: {
    canonical: "/pacote",
  },
  openGraph: {
    title: "Participar de Podcast e Ganhar Autoridade | Café com Zákia",
    description:
      "Seja entrevistado no Café com Zákia: pacote especial de R$ 2.300,00 por R$ 799,90 com estúdio, edição, entrevista e 20 cortes para redes sociais.",
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
          serviceType:
            "Entrevista em podcast de negócios, autoridade, mídia, marketing e posicionamento",
          areaServed: {
            "@type": "Country",
            name: "Brasil",
          },
          provider: {
            "@type": "Organization",
            name: "Café com Zákia",
            url: siteUrl,
            sameAs: [channelUrl, spotifyUrl, instagramUrl],
          },
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/pacote#webpage`,
        url: `${siteUrl}/pacote`,
        name: "Participar de Podcast e Ganhar Autoridade | Café com Zákia",
        description:
          "Página para quem procura participar de podcast, ser entrevistado, ganhar autoridade, ficar em evidência e apresentar sua história no Café com Zákia.",
        inLanguage: "pt-BR",
      },
      {
        "@type": "BreadcrumbList",
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
            name: "Pacote especial",
            item: `${siteUrl}/pacote`,
          },
        ],
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
          <a href="/spotify">Spotify</a>
          <a href="/jogos">Jogos</a>
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
            <h1>Participar de podcast, ser entrevistado e ganhar autoridade no Café com Zákia.</h1>
            <p>
              Uma experiência premium para quem deseja transformar trajetória, presença e reputação
              em conteúdo de autoridade. Seja mídia, tenha mídia e fique em evidência com uma
              entrevista conduzida por Daniel Zákia, no podcast de negócios Café com Zákia.
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
            <p className="package-original-price">De R$ 2.300,00 por</p>
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

      <section className="package-value">
        <div className="package-shell package-value-grid">
          <div className="package-value-copy">
            <p className="eyebrow">Valor real da experiência</p>
            <h2>Uma estrutura de R$ 2.300,00 liberada por R$ 799,90.</h2>
            <p>
              A promoção reúne estúdio, gravação, edição, entrevista com Daniel Zákia e distribuição
              de cortes nas plataformas do Café com Zákia. É uma oportunidade para transformar sua
              história em conteúdo de autoridade com uma condição especial até julho de 2026.
            </p>
          </div>

          <div className="package-value-card" aria-label="Comparativo de valor do pacote">
            <div className="package-value-total">
              <span>Valor real estimado</span>
              <strong>R$ 2.300,00</strong>
            </div>
            <div className="package-value-list">
              {packageValueItems.map((line) => (
                <article key={line.item}>
                  <div>
                    <h3>{line.item}</h3>
                    {line.note ? <p>{line.note}</p> : null}
                  </div>
                  <strong>{line.value}</strong>
                </article>
              ))}
            </div>
            <div className="package-value-offer">
              <span>Pacote especial</span>
              <strong>R$ 799,90</strong>
              <p>ou 2x de R$ 450,00, sujeito à curadoria e aprovação da equipe.</p>
            </div>
          </div>
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

      <section className="package-search-intent">
        <div className="package-shell">
          <div className="section-heading centered">
            <p className="eyebrow">Para quem busca presença e autoridade</p>
            <h2>Para quem procura participar de podcast, ganhar autoridade e ficar em evidência.</h2>
            <p>
              Esta página foi criada para quem busca um podcast referência, um programa de entrevistas
              com empresários, um espaço para falar de negócios e uma mídia capaz de apresentar sua
              história com seriedade. O Café com Zákia não vende apenas gravação: constrói presença,
              conteúdo e percepção de valor.
            </p>
          </div>

          <div className="package-search-grid">
            {searchIntentBlocks.map((block) => (
              <article key={block.title}>
                <h3>{block.title}</h3>
                <p>{block.text}</p>
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

      <section className="package-faq">
        <div className="package-shell">
          <div className="section-heading centered">
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2>Respostas para quem quer ser entrevistado e aparecer com autoridade.</h2>
            <p>
              Antes de chamar no WhatsApp, veja os principais pontos sobre participação, curadoria,
              entrevista para candidatos, mídia, autoridade e distribuição do conteúdo.
            </p>
          </div>

          <div className="package-faq-list">
            {packageFaqs.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
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
          <a href="/spotify">Spotify</a>
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
