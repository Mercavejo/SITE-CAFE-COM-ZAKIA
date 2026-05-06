"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { icon: "📺", value: "+1.249.000", label: "visualizações" },
  { icon: "👥", value: "520.000", label: "contas alcançadas" },
  { icon: "🎯", value: "", label: "Direção Criativa Mercavejo", highlight: true },
];

const platforms = [
  {
    name: "Mercavejo",
    href: "https://www.mercavejo.com.br",
    src: "https://iijzjfokryulldsukhpj.supabase.co/storage/v1/object/public/logos/mercavejov2.png",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@cafecomzakia",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/5HEziKX3xOOfV7eryMZ91v",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/cafecomzakia",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@cafecomzakia",
    src: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/3840px-TikTok_logo.svg.png",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-bg-primary/90 to-bg-primary" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-bg-tertiary/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
        >
          <span>🎬</span>
          <span className="text-sm font-medium">Gravado nos Estúdios Mercavejo</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Sua{" "}
          <span className="bg-gradient-to-r from-zakia-maroon to-zakia-maroon-light bg-clip-text text-transparent">
            autoridade digital
          </span>
          <br />
          começa aqui.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-text-secondary mb-10 max-w-3xl mx-auto"
        >
          Transformamos sua história em estratégia de posicionamento.
          <br />
          Cortes virais, tráfego pago e liderança de mercado — tudo em uma entrevista.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="#contato"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-zakia-maroon to-zakia-maroon-light px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-zakia-maroon/25 transition-all duration-300 hover:scale-105"
          >
            <span>🎬</span>
            <span>Agendar Minha Entrevista</span>
          </Link>
          <Link
            href="#pacotes"
            className="inline-flex items-center space-x-2 border-2 border-border-color px-8 py-4 rounded-full font-semibold hover:border-zakia-maroon transition-all duration-300"
          >
            <span>Ver Pacotes e Preços</span>
            <span>→</span>
          </Link>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8"
        >
          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                {stat.value && (
                  <div className="text-2xl sm:text-3xl font-bold text-zakia-maroon-light">
                    {stat.value}
                  </div>
                )}
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Platform Logos */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-border-color">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-text-secondary hover:text-zakia-maroon-light transition-colors"
              >
                <Image
                  src={platform.src}
                  alt={platform.name}
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
                <span className="hidden sm:inline text-sm font-medium">
                  {platform.name}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
