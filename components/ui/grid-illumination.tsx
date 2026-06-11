"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * "Acende" o dot-grid do fundo perto do cursor: um overlay fixed com o
 * mesmo grid do body (em lime), revelado por uma máscara radial que
 * segue o mouse. Faz fade out ao rolar — efeito confinado ao 1º fold,
 * o que também esconde o desalinhamento entre overlay fixed e grid que rola.
 * Não renderiza nada em touch, reduced motion ou SSR.
 */
export function GridIllumination() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  // começa fora da tela — invisível até o 1º movimento do mouse
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const sx = useSpring(mx, { stiffness: 120, damping: 25 });
  const sy = useSpring(my, { stiffness: 120, damping: 25 });

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const mask = useMotionTemplate`radial-gradient(220px circle at ${sx}px ${sy}px, black 0%, transparent 80%)`;

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mx, my]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        opacity,
        WebkitMaskImage: mask,
        maskImage: mask,
        // mesmo grid do body (32px, origem no canto), aceso em accent
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgb(var(--accent) / 0.35) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}
