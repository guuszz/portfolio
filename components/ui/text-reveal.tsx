"use client";

import { motion, useReducedMotion } from "motion/react";

type TextRevealProps = {
  text: string;
  as?: "h1" | "p" | "span";
  className?: string;
  /** atraso inicial em segundos */
  delay?: number;
  /** intervalo entre palavras */
  stagger?: number;
};

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Entrada do texto palavra por palavra: sobe + desfoca pro lugar.
 * O elemento real (h1/p) fica no DOM do SSR com o texto completo —
 * SEO intacto; leitores de tela leem a frase inteira via aria-label.
 * Sob prefers-reduced-motion renderiza texto puro.
 */
export function TextReveal({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  stagger = 0.045,
}: TextRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: EASE, delay: delay + i * stagger }}
        >
          {/* nbsp dentro do span: espaço comum no fim de inline-block colapsa */}
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
