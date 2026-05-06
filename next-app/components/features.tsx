"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "✂️",
    title: "Cortes Estratégicos",
    description:
      "Sua entrevista vira dezenas de vídeos curtos (Reels/TikTok) focados em retenção e viralização.",
  },
  {
    icon: "🚀",
    title: "Tráfego Pago Integrado",
    description:
      "Não apenas gravamos. Impulsionamos seus melhores momentos para o público certo.",
  },
  {
    icon: "💎",
    title: "Posicionamento Premium",
    description:
      "Ambiente de alto nível que eleva sua percepção de valor perante o mercado e clientes.",
  },
  {
    icon: "🤝",
    title: "Networking Qualificado",
    description:
      "Conecte-se com o ecossistema Mercavejo e outros líderes de destaque regional.",
  },
];

export function Features() {
  return (
    <section id="diferencial" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-zakia-maroon/20 text-zakia-maroon-light px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Por que nós?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Muito mais que{" "}
            <span className="bg-gradient-to-r from-zakia-maroon to-zakia-maroon-light bg-clip-text text-transparent">
              uma entrevista
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Unimos a profundidade do podcast com a agilidade das redes sociais.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-secondary rounded-2xl p-8 hover:bg-bg-tertiary transition-colors group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
