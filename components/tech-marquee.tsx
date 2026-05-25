"use client";

import { motion } from "motion/react";

/**
 * Strip horizontal infinito de tecnologias. Animação CSS pura via Framer Motion.
 * Os items são duplicados pra criar o loop infinito perfeito.
 *
 * Pausa no hover pra usuário conseguir ler.
 */

const TECHS = [
  "TypeScript",
  "JavaScript",
  "Node.js",
  "React",
  "Next.js",
  "React Native",
  "Expo",
  "Vite",
  "Tailwind CSS",
  "Express",
  "MySQL",
  "Python",
  "Git",
  "Radix UI",
  "Framer Motion",
  "Zustand",
];

export function TechMarquee() {
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
      aria-label="Tecnologias que utilizo"
    >
      <motion.ul
        className="flex w-max gap-12 py-4 font-mono text-sm text-muted"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ animationPlayState: "running" }}
      >
        {/* renderiza 2x pra loop infinito */}
        {[...TECHS, ...TECHS].map((tech, i) => (
          <li
            key={`${tech}-${i}`}
            className="flex flex-shrink-0 items-center gap-2 whitespace-nowrap"
          >
            <span className="text-accent" aria-hidden="true">
              ▸
            </span>
            <span className="transition-colors group-hover:text-fg">{tech}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
