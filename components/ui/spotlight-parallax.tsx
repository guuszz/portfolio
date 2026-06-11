"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type SpotlightParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** alcance máximo do deslocamento em px */
  range?: number;
};

/**
 * Parallax sutil pros spotlights do hero: o glow desliza de leve
 * acompanhando o mouse (spring suave). Inerte em touch e reduced motion.
 */
export function SpotlightParallax({ children, className, range = 24 }: SpotlightParallaxProps) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 50, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 50, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      // normaliza pra [-1, 1] a partir do centro do viewport
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      x.set(nx * range);
      y.set(ny * range);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, range, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
    >
      {children}
    </motion.div>
  );
}
