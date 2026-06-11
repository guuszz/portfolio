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
 * Sob prefers-reduced-motion renderiza um div estático —
 * nunca depende de transição pra ficar visível.
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

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, ...(blur > 0 && { filter: `blur(${blur}px)` }) }}
      whileInView={{ opacity: 1, y: 0, ...(blur > 0 && { filter: "blur(0px)" }) }}
      viewport={{ once, margin: margin as `${number}px` }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
