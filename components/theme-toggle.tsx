"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "system", label: "Sistema", icon: Monitor },
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Escuro", icon: Moon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // evita hydration mismatch
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-8 w-[108px]" aria-hidden="true" />;
  }

  return (
    <div
      role="radiogroup"
      aria-label="Selecionar tema"
      className="flex h-8 items-center gap-0.5 rounded-full border border-border bg-surface/60 p-0.5"
    >
      {themes.map(({ value, label, icon: Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            role="radio"
            aria-checked={active}
            aria-label={`Tema ${label}`}
            onClick={() => setTheme(value)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
              active
                ? "bg-accent text-bg"
                : "text-muted hover:text-fg"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
