"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { getLenis } from "@/components/providers/smooth-scroll-provider";
import {
  Briefcase,
  Code2,
  Copy,
  ExternalLink,
  Globe,
  Home,
  Mail,
  Monitor,
  Moon,
  Search,
  Sun,
  User,
} from "lucide-react";

type Action = {
  id: string;
  group: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string[];
  perform: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const { setTheme } = useTheme();

  // ⌘K / Ctrl+K abre
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // fecha após executar uma ação
  const runAndClose = React.useCallback((fn: () => void) => {
    fn();
    setOpen(false);
  }, []);

  const scrollTo = (id: string) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -16 });
    } else {
      // reduced motion / Lenis off — fallback nativo
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("gustavosaraiva2504@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const actions: Action[] = [
    // Navegação
    { id: "nav-top", group: "Navegação", label: "Início", icon: Home, perform: () => scrollTo("main-content") },
    { id: "nav-about", group: "Navegação", label: "Sobre", icon: User, perform: () => scrollTo("about") },
    { id: "nav-projects", group: "Navegação", label: "Projetos", icon: Briefcase, perform: () => scrollTo("projects") },
    { id: "nav-contact", group: "Navegação", label: "Contato", icon: Mail, perform: () => scrollTo("contact") },

    // Projetos
    {
      id: "proj-gfocus",
      group: "Projetos",
      label: "Gfocus",
      description: "App de produtividade",
      icon: ExternalLink,
      perform: () => window.open("https://gfocus-zeta.vercel.app", "_blank"),
    },
    {
      id: "proj-oficina",
      group: "Projetos",
      label: "Oficina Mecânica",
      description: "Sistema full-stack",
      icon: ExternalLink,
      perform: () => window.open("https://oficina-swart.vercel.app", "_blank"),
    },
    {
      id: "proj-fithome",
      group: "Projetos",
      label: "FitHome",
      description: "App mobile de treinos",
      icon: ExternalLink,
      perform: () => window.open("https://fithome-alpha.vercel.app", "_blank"),
    },

    // Contato
    {
      id: "contact-email",
      group: "Contato",
      label: copied ? "Email copiado!" : "Copiar email",
      description: "gustavosaraiva2504@gmail.com",
      icon: Copy,
      perform: copyEmail,
    },
    {
      id: "contact-github",
      group: "Contato",
      label: "GitHub @guuszz",
      icon: Globe,
      perform: () => window.open("https://github.com/guuszz", "_blank"),
    },
    {
      id: "contact-source",
      group: "Contato",
      label: "Código fonte deste site",
      icon: Code2,
      perform: () => window.open("https://github.com/guuszz/portfolio", "_blank"),
    },

    // Tema
    { id: "theme-light", group: "Tema", label: "Tema claro", icon: Sun, perform: () => setTheme("light") },
    { id: "theme-dark", group: "Tema", label: "Tema escuro", icon: Moon, perform: () => setTheme("dark") },
    { id: "theme-system", group: "Tema", label: "Seguir sistema", icon: Monitor, perform: () => setTheme("system") },
  ];

  const groups = Array.from(new Set(actions.map((a) => a.group)));

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Paleta de comandos"
        className="fixed inset-0 z-[70]"
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-bg/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Modal */}
        <div className="fixed left-1/2 top-[20%] z-10 w-[min(640px,90vw)] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 text-muted" aria-hidden="true" />
            <Command.Input
              placeholder="Buscar ação ou projeto..."
              className="h-12 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
            />
            <kbd className="hidden rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-muted sm:inline">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[380px] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-muted">
              Nenhum resultado encontrado.
            </Command.Empty>

            {groups.map((group) => (
              <Command.Group
                key={group}
                heading={group}
                className="px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-muted/70 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
              >
                {actions
                  .filter((a) => a.group === group)
                  .map((action) => {
                    const Icon = action.icon;
                    return (
                      <Command.Item
                        key={action.id}
                        value={`${action.group} ${action.label} ${action.description ?? ""}`}
                        onSelect={() => runAndClose(action.perform)}
                        className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-fg aria-selected:bg-border/60 aria-selected:text-fg"
                      >
                        <Icon className="h-4 w-4 text-muted" />
                        <span className="flex-1">{action.label}</span>
                        {action.description && (
                          <span className="text-xs text-muted">{action.description}</span>
                        )}
                      </Command.Item>
                    );
                  })}
              </Command.Group>
            ))}
          </Command.List>

          <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted">
            <span>Navegue com ↑↓ · Selecione com ↵</span>
            <span className="font-mono">⌘K</span>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}
