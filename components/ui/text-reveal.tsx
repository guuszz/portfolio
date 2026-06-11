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
 *
 * Estrutura idêntica em SSR e cliente (sempre spans) — não ramifica o DOM
 * por reduced motion, senão o `useReducedMotion()` (false no servidor, true
 * no cliente) causaria hydration mismatch. O reduced motion é tratado:
 *   1) no JS, zerando a duração da transição;
 *   2) no CSS (bloco prefers-reduced-motion via [data-text-reveal]), que força
 *      o estado final visível mesmo antes do JS hidratar.
 * SEO/leitor de tela: h1/p real com o texto completo + aria-label.
 */
export function TextReveal({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  stagger = 0.045,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text} data-text-reveal="">
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.5, ease: EASE, delay: delay + i * stagger }
          }
        >
          {/* nbsp explícito: espaço comum no fim de inline-block colapsa */}
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
