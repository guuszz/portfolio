import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandTrigger } from "@/components/command-trigger";

export const metadata: Metadata = {
  title: "Uses · meu setup",
  description:
    "Hardware, software, fontes, extensões e ferramentas que eu uso pra construir. Atualizado conforme troco de gear.",
  openGraph: {
    title: "Uses · Gustavo Oliveira",
    description: "Hardware, software e ferramentas que eu uso pra construir.",
  },
};

interface Item {
  name: string;
  desc: string;
  link?: string;
  highlight?: boolean;
}

interface Section {
  title: string;
  items: Item[];
}

const SECTIONS: Section[] = [
  {
    title: "💻 Hardware",
    items: [
      {
        name: "Notebook · Windows 11",
        desc: "Ainda no setup do estudante — vai trocar quando o primeiro freela pagar.",
      },
      {
        name: "Monitor externo",
        desc: "Quando codo em casa. O notebook fica empilhado pra ganhar altura ergonômica.",
      },
      {
        name: "Teclado padrão",
        desc: "Não sou mecânico-fanboy ainda. Próximo upgrade: Keychron K2.",
      },
    ],
  },
  {
    title: "🖥️ Editor & Terminal",
    items: [
      {
        name: "Visual Studio Code",
        desc: "Theme: Night Owl (no claro fica ruim de ler). Font: JetBrains Mono.",
        link: "https://code.visualstudio.com/",
        highlight: true,
      },
      {
        name: "Git Bash",
        desc: "Vindo do mundo Windows mas com syntax Unix. Surpreendentemente bom.",
      },
      {
        name: "GitHub CLI (gh)",
        desc: "Vida muda quando você nunca mais abre browser pra criar repo, PR ou release.",
        link: "https://cli.github.com/",
        highlight: true,
      },
    ],
  },
  {
    title: "🛠️ Stack do dia-a-dia",
    items: [
      {
        name: "TypeScript",
        desc: "Strict mode habilitado, sem `any`. Compile-time errors > production errors.",
        link: "https://www.typescriptlang.org/",
        highlight: true,
      },
      {
        name: "Next.js 14 (App Router)",
        desc: "Framework principal pra apps web. Server components mudaram o jogo.",
        link: "https://nextjs.org/",
      },
      {
        name: "Tailwind CSS",
        desc: "Não escrevo CSS tradicional há ~1 ano. `cn()` helper resolve qualquer override.",
        link: "https://tailwindcss.com/",
      },
      {
        name: "shadcn/ui",
        desc: "Copy-paste components > install dependencies. Controle total da UI.",
        link: "https://ui.shadcn.com/",
        highlight: true,
      },
      {
        name: "Prisma",
        desc: "Type-safe ORM. Schema-first dev é a vibe.",
        link: "https://www.prisma.io/",
      },
      {
        name: "Expo (React Native)",
        desc: "Pra mobile. EAS Build resolve toda chatice de iOS/Android.",
        link: "https://expo.dev/",
      },
    ],
  },
  {
    title: "☁️ Infraestrutura",
    items: [
      {
        name: "Vercel",
        desc: "Deploy contínuo, edge functions, OG dinâmico, tudo num clique. Fica caro escalando, mas pra MVP é imbatível.",
        link: "https://vercel.com/",
        highlight: true,
      },
      {
        name: "Neon Postgres",
        desc: "Postgres serverless com branching. Connection pooling automático.",
        link: "https://neon.tech/",
      },
      {
        name: "Upstash Redis",
        desc: "Pra cache e share URLs. Free tier dá pra um lote bom de tráfego.",
        link: "https://upstash.com/",
      },
      {
        name: "Vercel Blob",
        desc: "Pra upload de imagens. Substituiu meu primeiro impulso de usar S3 (overkill pra MVP).",
        link: "https://vercel.com/storage/blob",
      },
    ],
  },
  {
    title: "🤖 IA na rotina",
    items: [
      {
        name: "Claude (Anthropic)",
        desc: "Modelo principal pra pair programming. Sonnet 4.x é absurdo de bom em refactor.",
        link: "https://claude.ai/",
        highlight: true,
      },
      {
        name: "Google Gemini",
        desc: "Alternativa quando preciso de free tier ou contexto longo. 2.5 Flash é o flagship atual.",
        link: "https://ai.google.dev/",
      },
      {
        name: "Cursor",
        desc: "Editor VS Code-fork com AI integrada. Uso pra projetos longos.",
        link: "https://cursor.sh/",
      },
    ],
  },
  {
    title: "📐 Design & visuais",
    items: [
      {
        name: "Plus Jakarta Sans",
        desc: "Font padrão dos meus projetos. Amigável + profissional ao mesmo tempo.",
        link: "https://fonts.google.com/specimen/Plus+Jakarta+Sans",
      },
      {
        name: "JetBrains Mono",
        desc: "Font mono pra UI tipo input de URL, badges, código inline.",
        link: "https://www.jetbrains.com/lp/mono/",
      },
      {
        name: "Lucide Icons",
        desc: "Ícones SVG limpos. Fork do Feather, mais mantido.",
        link: "https://lucide.dev/",
      },
      {
        name: "Aceternity UI",
        desc: "Componentes prontos com motion. Uso pra Spotlight e Marquee.",
        link: "https://ui.aceternity.com/",
      },
    ],
  },
  {
    title: "🌐 Browser & Productivity",
    items: [
      {
        name: "Edge / Chrome",
        desc: "DevTools integrado, perfil isolado pra trabalho vs pessoal.",
      },
      {
        name: "GitHub",
        desc: "Onde toda a história fica registrada. Heatmap verde é meu objetivo.",
        link: "https://github.com/guuszz",
      },
      {
        name: "Spotify",
        desc: "Lo-fi pra focus, sertanejo universitário quando o código tá vindo fácil.",
      },
    ],
  },
  {
    title: "📚 Aprendendo agora",
    items: [
      {
        name: "Multi-tenancy patterns",
        desc: "Construindo OFICINA me ensinou mais que qualquer curso. JWT + Prisma + middleware foi o triângulo.",
      },
      {
        name: "End-to-end testing",
        desc: "Playwright. Próximo grande passo pra subir cobertura do OFICINA de 20% pra 60%+.",
        link: "https://playwright.dev/",
      },
      {
        name: "Design systems",
        desc: "Estudei a fundo construindo o sistema visual do OFICINA. Tokens > hardcoded.",
      },
    ],
  },
];

export default function UsesPage() {
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
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">/uses</p>
          <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Meu setup
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
            Hardware, software, fontes e ferramentas que eu uso pra construir. Lista honesta —
            inclui as coisas modestas (sou estudante) e o que tô estudando agora. Atualizada
            conforme troco de gear ou descubro coisa nova.
          </p>
          <p className="mt-3 text-xs text-muted/80">
            Inspirado por{" "}
            <a
              href="https://leerob.com/uses"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 transition-colors hover:text-fg hover:underline"
            >
              leerob.com/uses
            </a>{" "}
            e a tradição{" "}
            <a
              href="https://uses.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 transition-colors hover:text-fg hover:underline"
            >
              uses.tech
            </a>
            .
          </p>
        </section>

        {/* Seções */}
        <div className="space-y-12">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="mb-5 text-lg font-semibold tracking-tight text-fg">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.name} className="group">
                    <div className="flex items-baseline gap-2">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-medium transition-colors ${
                            item.highlight ? "text-accent" : "text-fg"
                          } underline-offset-4 hover:underline`}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <span
                          className={`font-medium ${
                            item.highlight ? "text-accent" : "text-fg"
                          }`}
                        >
                          {item.name}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <footer className="mt-20 border-t border-border pt-8">
          <p className="text-sm text-muted">
            Lista atualizada em maio/2026. Se você mudou de stack ou tá começando algo novo,
            me conta —{" "}
            <a
              href="https://github.com/guuszz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              @guuszz
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
