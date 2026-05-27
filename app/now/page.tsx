import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandTrigger } from "@/components/command-trigger";

export const metadata: Metadata = {
  title: "Now · em que tô trabalhando",
  description:
    "O que tô construindo, estudando e lendo agora. Atualizada mensalmente. Inspirada em nownownow.com.",
  openGraph: {
    title: "Now · Gustavo Oliveira",
    description: "Atualização mensal sobre o que tô construindo, estudando e lendo.",
  },
};

// ─── Edite este arquivo no início de cada mês ──────────────────────
const LAST_UPDATED = "27 de maio de 2026";
const FROM_LOCATION = "Vitória da Conquista, BA";

interface Section {
  emoji: string;
  title: string;
  items: Array<{
    label: string;
    description: string;
    link?: string;
  }>;
}

const SECTIONS: Section[] = [
  {
    emoji: "🛠️",
    title: "Construindo",
    items: [
      {
        label: "OFICINA",
        description:
          "SaaS multi-tenant pra gestão de oficinas mecânicas. Migrando pra produto de verdade — próximo passo é validar com 1 oficina real em Vitória da Conquista.",
        link: "https://oficina-swart.vercel.app",
      },
      {
        label: "pr-reviewer",
        description:
          "Code review automático com IA pra Pull Requests do GitHub. Acabei de adicionar URLs compartilháveis via Upstash Redis + streaming NDJSON.",
        link: "https://pr-reviewer-lemon.vercel.app",
      },
      {
        label: "telegram-commits-mirror",
        description:
          "Bot que reposta meus commits do GitHub num canal Telegram pessoal. Setup ainda precisa do webhook em cada repo.",
        link: "https://github.com/guuszz/telegram-commits-mirror",
      },
    ],
  },
  {
    emoji: "📚",
    title: "Estudando",
    items: [
      {
        label: "E2E testing com Playwright",
        description:
          "Próximo grande passo pra elevar a cobertura do OFICINA de 20% pra 60%+. Vitest tá redondo pros unit tests, agora preciso dos fluxos completos.",
      },
      {
        label: "Multi-tenancy patterns",
        description:
          "Construir OFICINA me ensinou mais que qualquer curso. Próximo: row-level security no Postgres + scoping de queries automatizado.",
      },
      {
        label: "Design systems",
        description:
          "Apliquei a skill ui-ux-pro-max no OFICINA e o resultado mudou completamente. Estudando como empacotar isso como tema do shadcn/ui.",
      },
    ],
  },
  {
    emoji: "📖",
    title: "Lendo",
    items: [
      {
        label: "Designing Data-Intensive Applications (Kleppmann)",
        description:
          "Capítulo atual: replicação. Livro denso, vou devagar — 1 capítulo por semana é meu limite real.",
      },
      {
        label: "Patterns of Enterprise Application Architecture (Fowler)",
        description:
          "Refresh dos patterns clássicos. Útil pra estruturar OFICINA quando crescer.",
      },
    ],
  },
  {
    emoji: "🎯",
    title: "Próximas metas (~30 dias)",
    items: [
      {
        label: "Publicar 1º post técnico",
        description:
          "História da migração Anthropic → Google Gemini, com todos os bugs de mundo real. Draft já existe.",
      },
      {
        label: "1º PR open-source mergeado",
        description:
          "Rota A: submeter exemplo de streaming NDJSON no vercel/examples.",
      },
      {
        label: "OFICINA com 1 usuário real",
        description:
          "Ir numa oficina em VC, demonstrar o sistema, instalar gratuitamente, coletar feedback semanal.",
      },
      {
        label: "Domínio próprio + portfolio.com",
        description: "Pra deixar de ser portfolio-amber-omega-3kyqfla4q7.vercel.app.",
      },
    ],
  },
  {
    emoji: "🎵",
    title: "Soundtrack",
    items: [
      {
        label: "Pra focar",
        description: "Lo-fi (Spotify) + brown noise. Sertanejo aleatório quando tá fluindo.",
      },
      {
        label: "Última descoberta",
        description: "Code Radio (musicforprogramming.net). Som ambiente que casa com noite codando.",
      },
    ],
  },
];

export default function NowPage() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <div className="relative z-10">
        {/* Header */}
        <header className="mb-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>voltar</span>
          </Link>
          <div className="flex items-center gap-3">
            <CommandTrigger />
            <ThemeToggle />
          </div>
        </header>

        {/* Hero */}
        <section className="mb-16">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">/now</p>
          <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Em que estou agora
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
            O que tô construindo, estudando e lendo neste momento. Atualizada mensalmente —
            anti-perfeição. Se você curte ver no que devs estão metidos hoje, esta é a página.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted/80">
            <span>📍 {FROM_LOCATION}</span>
            <span>·</span>
            <span>🗓️ Atualizada em {LAST_UPDATED}</span>
            <span>·</span>
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline-offset-2 transition-colors hover:text-fg hover:underline"
            >
              tradição /now
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Seções */}
        <div className="space-y-12">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="mb-5 text-lg font-semibold tracking-tight text-fg">
                <span aria-hidden="true">{section.emoji}</span> {section.title}
              </h2>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <div className="flex items-baseline gap-2">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-fg underline-offset-4 transition-colors hover:text-accent hover:underline"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="font-medium text-fg">{item.label}</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <footer className="mt-20 border-t border-border pt-8">
          <p className="text-sm text-muted">
            Se tá numa fase parecida ou tem dica do que eu deveria estudar, me chama no{" "}
            <a
              href="https://github.com/guuszz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            . Ou abre uma issue em qualquer um dos meus repos.
          </p>
        </footer>
      </div>
    </main>
  );
}
