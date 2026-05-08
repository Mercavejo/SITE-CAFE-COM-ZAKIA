export const siteUrl = "https://www.cafecomzakia.com.br";
export const whatsappUrl =
  "https://wa.me/5517996233327?text=Ol%C3%A1%2C%20vim%20pelo%20site%20Caf%C3%A9%20com%20Z%C3%A1kia.%20Quero%20entender%20como%20participar%20do%20programa%20e%20posicionar%20minha%20marca.";
export const channelUrl = "https://www.youtube.com/@cafecomzakia";
export const instagramUrl = "https://www.instagram.com/cafecomzakia/";
export const instagramReelUrl =
  "https://www.instagram.com/reel/DX4Vzw8FV9a/?igsh=MzdpaDRtazhpNXQ0";
export const mercavejoUrl = "https://www.mercavejo.com.br/";

export type SeoTopic = {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  headline: string;
  lead: string;
  keywords: string[];
  proof: string;
  sections: Array<{
    title: string;
    text: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const seoTopicList: SeoTopic[] = [
  {
    slug: "participar-de-podcast",
    title: "Participar de Podcast de Negócios com Daniel Zákia",
    description:
      "Entenda como participar de um podcast de negócios premium, fortalecer autoridade e apresentar sua trajetória no Café com Zákia.",
    kicker: "Participar de podcast",
    headline: "A sua história pode virar autoridade quando é apresentada no palco certo.",
    lead:
      "Participar do Café com Zákia é entrar em uma experiência de entrevista pensada para empresários, líderes, especialistas e marcas que desejam ampliar reputação com elegância, estratégia e presença digital.",
    keywords: [
      "participar de podcast",
      "participar de podcast de negócios",
      "como participar de podcast",
      "entrevista em podcast",
      "Café com Zákia",
      "YouTube @cafecomzakia",
      "Instagram @cafecomzakia",
    ],
    proof: "+5 milhões em corte viral no Instagram @cafecomzakia e +1 milhão de visualizações no YouTube.",
    sections: [
      {
        title: "Por que participar",
        text:
          "Uma entrevista bem conduzida permite que o convidado explique sua visão, sua trajetória e seus diferenciais com profundidade. O objetivo é transformar presença em percepção de valor.",
      },
      {
        title: "Para quem é indicado",
        text:
          "Empresários, profissionais liberais, especialistas, consultores, líderes comerciais e marcas que precisam ser vistos com mais autoridade no mercado.",
      },
      {
        title: "Como funciona",
        text:
          "A equipe da Mercavejo Consultoria orienta o processo, avalia disponibilidade e direciona o melhor formato para a participação no programa.",
      },
    ],
    faqs: [
      {
        question: "Como participar do Café com Zákia?",
        answer:
          "O primeiro passo é falar com a equipe pelo WhatsApp para verificar agenda, formato da entrevista e alinhamento da história que será apresentada.",
      },
      {
        question: "A entrevista ajuda no posicionamento da marca?",
        answer:
          "Sim. A entrevista é construída para apresentar autoridade, reputação e diferenciais do convidado com linguagem profissional.",
      },
    ],
  },
  {
    slug: "podcast-de-negocios",
    title: "Podcast de Negócios | Café com Zákia Falando de Negócios",
    description:
      "Café com Zákia é um podcast de negócios com entrevistas premium sobre empreendedorismo, estratégia, liderança e posicionamento.",
    kicker: "Podcast de negócios",
    headline: "Conversas sobre negócios com estética, reputação e visão de mercado.",
    lead:
      "O Café com Zákia reúne empresários, especialistas e líderes para conversas que conectam trajetória, estratégia, marketing, vendas, gestão e construção de autoridade.",
    keywords: [
      "podcast de negócios",
      "podcast empresarial",
      "podcast sobre empreendedorismo",
      "falando de negócios",
      "Daniel Zákia",
      "YouTube @cafecomzakia",
      "Instagram @cafecomzakia",
    ],
    proof: "Um programa criado para quem deseja ser visto com seriedade no ambiente de negócios, com presença no YouTube e Instagram @cafecomzakia.",
    sections: [
      {
        title: "Negócios com profundidade",
        text:
          "O programa valoriza histórias reais, decisões importantes, aprendizados de mercado e visão estratégica para empresários e profissionais que querem crescer.",
      },
      {
        title: "Autoridade para o convidado",
        text:
          "Cada conversa é planejada para destacar a experiência do convidado e apresentar sua mensagem de forma clara, elegante e memorável.",
      },
      {
        title: "Conteúdo para redes e buscadores",
        text:
          "Além do episódio completo, a presença no programa fortalece o ecossistema digital da marca com conteúdos que podem ser encontrados e compartilhados.",
      },
    ],
    faqs: [
      {
        question: "O Café com Zákia fala sobre quais temas?",
        answer:
          "O programa aborda negócios, empreendedorismo, marketing, liderança, vendas, gestão, carreira e posicionamento de marca.",
      },
      {
        question: "Quem apresenta o Café com Zákia?",
        answer:
          "O programa é conduzido por Daniel Zákia, com produção e estratégia da Mercavejo Consultoria.",
      },
    ],
  },
  {
    slug: "entrevistas-com-empresarios",
    title: "Entrevistas com Empresários | Café com Zákia",
    description:
      "Entrevistas com empresários, líderes e especialistas que desejam apresentar trajetória, reputação e visão de negócios com autoridade.",
    kicker: "Entrevistas com empresários",
    headline: "Empresários precisam de uma conversa que apresente valor, não apenas exposição.",
    lead:
      "O Café com Zákia cria entrevistas com empresários para mostrar história, posicionamento, diferenciais e visão de futuro em um ambiente premium.",
    keywords: [
      "entrevistas com empresários",
      "entrevista empresarial",
      "programa com empresários",
      "podcast com empresários",
      "Café com Zákia entrevistas",
      "Instagram @cafecomzakia",
    ],
    proof: "A entrevista funciona como vitrine de confiança, apoiada por canal no YouTube, Instagram @cafecomzakia e cortes com grande alcance.",
    sections: [
      {
        title: "Trajetória com valor",
        text:
          "A conversa revela escolhas, desafios, bastidores e diferenciais que ajudam o público a entender quem está por trás da marca.",
      },
      {
        title: "Imagem profissional",
        text:
          "O cenário, a direção e a condução reforçam uma percepção de cuidado, sofisticação e preparo.",
      },
      {
        title: "Presença digital",
        text:
          "A entrevista pode ser usada como ativo de reputação em canais digitais, apresentações comerciais, redes sociais e relacionamento com clientes.",
      },
    ],
    faqs: [
      {
        question: "Empresários podem participar do Café com Zákia?",
        answer:
          "Sim. O programa é voltado para empresários, líderes, especialistas e marcas que possuem história e mensagem relevante para apresentar.",
      },
      {
        question: "A entrevista é comercial ou institucional?",
        answer:
          "A proposta é apresentar autoridade e reputação. A conversa é conduzida com elegância para gerar percepção de valor sem parecer propaganda comum.",
      },
    ],
  },
  {
    slug: "programa-de-negocios",
    title: "Programa de Negócios com Entrevistas Premium",
    description:
      "Conheça o Café com Zákia, programa de negócios com entrevistas premium, conteúdo estratégico e produção da Mercavejo Consultoria.",
    kicker: "Programa de negócios",
    headline: "Um programa para transformar boas histórias em posicionamento percebido.",
    lead:
      "O Café com Zákia é um programa de negócios criado para valorizar trajetórias, marcas e especialistas por meio de entrevistas com estética premium e direção estratégica.",
    keywords: [
      "programa de negócios",
      "programa de entrevistas",
      "programa empresarial",
      "Café com Zákia programa",
      "negócios e empreendedorismo",
      "corte viral 5 milhões",
    ],
    proof: "A força do programa está em unir imagem, conversa, distribuição, YouTube, Instagram e posicionamento.",
    sections: [
      {
        title: "Formato premium",
        text:
          "O programa combina conversa, imagem, narrativa e presença digital para fortalecer a percepção de autoridade do convidado.",
      },
      {
        title: "Conteúdo memorável",
        text:
          "As entrevistas são conduzidas para que o público entenda a história e reconheça o valor por trás da marca ou do profissional.",
      },
      {
        title: "Estratégia de posicionamento",
        text:
          "A Mercavejo Consultoria atua na gestão e produção para conectar a participação ao objetivo de comunicação do convidado.",
      },
    ],
    faqs: [
      {
        question: "O Café com Zákia é um programa de entrevistas?",
        answer:
          "Sim. É um programa de entrevistas com foco em negócios, autoridade, trajetória, reputação e posicionamento.",
      },
      {
        question: "O conteúdo pode ajudar na visibilidade?",
        answer:
          "Sim. Uma entrevista bem posicionada ajuda a aumentar confiança, reconhecimento e presença digital.",
      },
    ],
  },
  {
    slug: "videos-de-negocios",
    title: "Vídeos de Negócios e Entrevistas no YouTube",
    description:
      "Assista vídeos de negócios, entrevistas e cortes do Café com Zákia no YouTube, com conversas sobre marketing, liderança e empreendedorismo.",
    kicker: "Vídeos de negócios",
    headline: "Vídeos que posicionam histórias, marcas e especialistas diante do público certo.",
    lead:
      "O Café com Zákia transforma conversas de negócios em conteúdo audiovisual para YouTube, redes sociais e canais digitais de autoridade.",
    keywords: [
      "vídeos de negócios",
      "vídeos sobre marketing",
      "entrevistas no YouTube",
      "podcast no YouTube",
      "Café com Zákia YouTube",
      "Instagram @cafecomzakia",
    ],
    proof: "O canal oficial no YouTube e o Instagram @cafecomzakia reúnem episódios, cortes e conteúdos voltados para negócios e autoridade.",
    sections: [
      {
        title: "YouTube como vitrine",
        text:
          "O episódio completo permite que o público conheça a história do convidado com contexto, profundidade e credibilidade.",
      },
      {
        title: "Cortes com força social",
        text:
          "Trechos bem escolhidos podem ampliar alcance, gerar interesse e levar novas pessoas para conhecer o convidado e o programa.",
      },
      {
        title: "Conteúdo para longo prazo",
        text:
          "Vídeos publicados no YouTube e no site ajudam a construir presença orgânica com buscas por nome, tema, mercado e assunto.",
      },
    ],
    faqs: [
      {
        question: "Onde assistir ao Café com Zákia?",
        answer:
          "Os episódios e conteúdos do Café com Zákia estão no canal oficial do YouTube.",
      },
      {
        question: "O site pode destacar o próximo vídeo?",
        answer:
          "Sim. A vitrine do site pode ser atualizada com o link do YouTube do próximo convidado, trailer ou episódio em destaque.",
      },
    ],
  },
  {
    slug: "marketing-e-negocios",
    title: "Marketing e Negócios | Autoridade para Empresários",
    description:
      "Conteúdo sobre marketing, negócios, posicionamento, autoridade e entrevistas premium para empresários no Café com Zákia.",
    kicker: "Marketing e negócios",
    headline: "Marketing forte começa quando o público entende o valor de quem está falando.",
    lead:
      "O Café com Zákia conecta marketing, negócios e reputação ao apresentar empresários e especialistas com narrativa profissional, imagem premium e estratégia digital.",
    keywords: [
      "marketing e negócios",
      "marketing para empresários",
      "posicionamento de marca",
      "autoridade digital",
      "Mercavejo Consultoria",
      "Instagram @cafecomzakia",
    ],
    proof: "Uma presença bem construída pode gerar desejo, confiança e memória de marca.",
    sections: [
      {
        title: "Posicionamento antes da venda",
        text:
          "O conteúdo apresenta a história e o valor do convidado para que o público perceba competência, visão e diferenciais antes de qualquer proposta comercial.",
      },
      {
        title: "Reputação como ativo",
        text:
          "A entrevista cria um material institucional vivo, útil para relacionamento, vendas, redes sociais e autoridade pública.",
      },
      {
        title: "Estratégia com estética",
        text:
          "O visual premium do programa reforça a mensagem: o convidado está em um ambiente de negócios sério, elegante e preparado.",
      },
    ],
    faqs: [
      {
        question: "Podcast ajuda no marketing de uma empresa?",
        answer:
          "Sim. Um podcast bem produzido pode fortalecer autoridade, gerar conteúdo de valor e melhorar a percepção pública da marca.",
      },
      {
        question: "Qual é o papel da Mercavejo Consultoria?",
        answer:
          "A Mercavejo Consultoria atua na produção, gestão e estratégia digital do Café com Zákia.",
      },
    ],
  },
];

export function getSeoTopic(slug: string) {
  return seoTopicList.find((topic) => topic.slug === slug);
}
