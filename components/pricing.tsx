"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    description: "Para quem está começando a construir autoridade digital.",
    features: [
      { text: "1h de Gravação em Estúdio", included: true },
      { text: "Edição Completa do Episódio", included: true },
      { text: "3 Cortes para Redes Sociais", included: true },
      { text: "Fotos de Making Of", included: true },
      { text: "Gestão de Tráfego", included: false },
    ],
    ctaText: "Quero o Essencial",
    whatsappMessage: "Olá! Vi o site e tenho interesse no Pacote Essencial do Café com Zakia.",
    featured: false,
  },
  {
    name: "Autoridade",
    description: "O combo completo para dominar seu nicho de mercado.",
    features: [
      { text: "1h de Gravação em Estúdio", included: true },
      { text: "Edição Premium (Cinema)", included: true },
      { text: "10 Cortes Estratégicos", included: true },
      { text: "Fotos Profissionais (Ensaio)", included: true },
      { text: "Campanha de Tráfego Inclusa", included: true },
    ],
    ctaText: "Quero o Autoridade",
    whatsappMessage: "Olá! Vi o site e tenho interesse no Pacote Autoridade do Café com Zakia.",
    featured: true,
  },
  {
    name: "Experience",
    description: "Personalização total para marcas e projetos especiais.",
    features: [
      { text: "Tempo de Gravação Estendido", included: true },
      { text: "Cenografia Personalizada", included: true },
      { text: "Cortes Ilimitados (30 dias)", included: true },
      { text: "Consultoria de Posicionamento", included: true },
      { text: "Estratégia de Lançamento", included: true },
    ],
    ctaText: "Quero o Experience",
    whatsappMessage: "Olá! Vi o site e tenho interesse no Pacote Experience do Café com Zakia.",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pacotes" className="py-20 sm:py-32 bg-bg-secondary">
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
            Investimento
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Escolha seu{" "}
            <span className="bg-gradient-to-r from-zakia-maroon to-zakia-maroon-light bg-clip-text text-transparent">
              posicionamento
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Planos desenhados para diferentes momentos da sua jornada de autoridade.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-bg-primary rounded-2xl p-8 ${
                plan.featured
                  ? "ring-2 ring-zakia-maroon shadow-xl shadow-zakia-maroon/20"
                  : "border border-border-color"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-zakia-maroon to-zakia-maroon-light text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Procurado
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-zakia-maroon mb-3">Consulte</div>
                <p className="text-text-secondary">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-text-secondary flex-shrink-0" />
                    )}
                    <span className={feature.included ? "" : "text-text-secondary line-through"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/5517996240418?text=${encodeURIComponent(plan.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 rounded-full text-center font-semibold transition-all duration-300 ${
                  plan.featured
                    ? "bg-gradient-to-r from-zakia-maroon to-zakia-maroon-light text-white hover:shadow-lg hover:shadow-zakia-maroon/25"
                    : "border-2 border-border-color hover:border-zakia-maroon"
                }`}
              >
                {plan.ctaText}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
