"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Ricardo Mendes",
    title: "Cirurgião Plástico",
    quote:
      "A autoridade que o podcast me trouxe foi imediata. O posicionamento premium do estúdio reflete a qualidade do meu trabalho.",
  },
  {
    name: "Fernanda Oliveira",
    title: "CEO - Investimentos",
    quote:
      "Os cortes virais geraram um alcance que eu não imaginava. É a ferramenta de marketing mais eficiente que já utilizei.",
  },
  {
    name: "Marcos Assunção",
    title: "Empresário",
    quote:
      "Gravar com o Zakia nos estúdios Mercavejo é uma experiência de cinema. O resultado final é impecável.",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="depoimentos" className="py-20 sm:py-32 bg-bg-secondary">
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
            Quem já passou pela nossa mesa
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Histórias que{" "}
            <span className="bg-gradient-to-r from-zakia-maroon to-zakia-maroon-light bg-clip-text text-transparent">
              inspiram
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Líderes e especialistas que escolheram o Café com Zakia para amplificar sua voz.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-bg-primary rounded-2xl p-8 sm:p-12 shadow-xl"
          >
            {/* Quote */}
            <motion.blockquote
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-xl sm:text-2xl text-foreground mb-8 leading-relaxed"
            >
              "{testimonials[currentIndex].quote}"
            </motion.blockquote>

            {/* Author */}
            <div>
              <div className="text-lg font-semibold">{testimonials[currentIndex].name}</div>
              <div className="text-text-secondary">{testimonials[currentIndex].title}</div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-bg-tertiary hover:bg-zakia-maroon/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-zakia-maroon"
                      : "bg-border-color"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full bg-bg-tertiary hover:bg-zakia-maroon/20 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
