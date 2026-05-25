"use client";

import * as React from "react";
import { Search } from "lucide-react";

export function CommandTrigger() {
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/i.test(navigator.platform || navigator.userAgent));
  }, []);

  const open = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true })
    );
  };

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Abrir paleta de comandos"
      className="hidden h-8 items-center gap-2 rounded-full border border-border bg-surface/60 px-3 text-xs text-muted transition-colors hover:text-fg sm:inline-flex"
    >
      <Search className="h-3 w-3" aria-hidden="true" />
      <span>Buscar</span>
      <kbd className="ml-1 font-mono text-[10px]">{isMac ? "⌘" : "Ctrl"}K</kbd>
    </button>
  );
}
