"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function ContactCTA() {
  return (
    <section id="contato" className="py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Pronto para{" "}
            <span className="bg-gradient-to-r from-zakia-maroon to-zakia-maroon-light bg-clip-text text-transparent">
              começar
            </span>
            ?
          </h2>
          <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
            Agende sua entrevista e transforme sua autoridade digital.
          </p>

          <a
            href="https://wa.me/5517996240418?text=Olá! Gostaria de agendar uma entrevista no Café com Zakia."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/25"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Agendar Agora no WhatsApp</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
