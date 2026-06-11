"use client";

import { useEffect } from "react";
import { frame, cancelFrame } from "motion/react";
import Lenis from "lenis";

// Singleton acessível fora da árvore React (ex.: command palette)
let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/**
 * Smooth scroll com Lenis, dirigido pelo RAF do motion —
 * um único loop de frame pra todo o site.
 * Sob prefers-reduced-motion o Lenis nem inicializa (scroll nativo).
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: false, // o RAF é do motion (frame.update abaixo)
      anchors: true, // intercepta <a href="#..."> do header
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisInstance = lenis;

    const update = (data: { timestamp: number }) => lenis.raf(data.timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
