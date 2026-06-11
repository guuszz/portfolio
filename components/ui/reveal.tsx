"use client";

import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** atraso em segundos */
  delay?: number;
  /** deslocamento vertical inicial em px */
  y?: number;
  /** blur inicial em px — 0 desativa (mais barato em áreas grandes) */
  blur?: number;
  once?: boolean;
  margin?: string;
};

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Reveal de scroll: fade + slide-up + blur que se desfaz.
 *
 * Estrutura idêntica em SSR e cliente (sempre motion.div com o mesmo initial)
 * pra não quebrar a hidratação — `useReducedMotion()` difere entre servidor
 * (false) e cliente, então ele só ajusta a transição (JS, fora do HTML do SSR).
 * O reduced motion é garantido pelo CSS (bloco prefers-reduced-motion via
 * [data-reveal]), que força o estado final visível independente de scroll/JS.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  blur = 6,
  once = true,
  margin = "-80px",
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      data-reveal=""
      initial={{ opacity: 0, y, ...(blur > 0 && { filter: `blur(${blur}px)` }) }}
      whileInView={{ opacity: 1, y: 0, ...(blur > 0 && { filter: "blur(0px)" }) }}
      viewport={{ once, margin: margin as `${number}px` }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
