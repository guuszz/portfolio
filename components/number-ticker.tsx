"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

type Props = {
  value: number;
  decimals?: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
};

/**
 * NumberTicker — anima um número de 0 até `value` (ou inverso) quando entra no viewport.
 * Inspirado no Magic UI mas implementação própria (sem dep extra).
 * Respeita prefers-reduced-motion via Framer Motion (spring vira instantâneo).
 */
export function NumberTicker({
  value,
  decimals = 0,
  direction = "up",
  delay = 0,
  className,
  prefix,
  suffix,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const inView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      motionValue.set(direction === "down" ? 0 : value);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [motionValue, inView, delay, value, direction]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted = Intl.NumberFormat("pt-BR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(Number(latest.toFixed(decimals)));
        ref.current.textContent = `${prefix ?? ""}${formatted}${suffix ?? ""}`;
      }
    });
    return unsubscribe;
  }, [springValue, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix ?? ""}0{suffix ?? ""}
    </span>
  );
}
