import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandTrigger } from "@/components/command-trigger";

export const metadata: Metadata = {
  title: "Now · em que tô trabalhando",
  description:
    "O que tô construindo, estudando e lendo agora. Atualizada conforme a evolução dos projetos. Inspirada em nownownow.com.",
  openGraph: {
    title: "Now · Gustavo Oliveira",
    description: "Revisões de engenharia e estudos em desenvolvimento seguro.",
  },
};

// ─── Edite este arquivo no início de cada mês ──────────────────────
const LAST_UPDATED = "6 de setembro de 2026";
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
    emoji: "🛠️", title: "Revisões em andamento — não foram incorporadas à main",
    items: [
      { label: "OFICINA", description: "Revogação de sessões e concorrência testadas em ambiente local. PR em rascunho: auditoria de dependências e implantação ainda exigem revisão.", link: "https://github.com/guuszz/OFICINA/pull/8" },
      { label: "API Attack Surface Mapper", description: "Referências locais e parâmetros sobrescritos. A matriz de compatibilidade explicita o suporte parcial a OpenAPI.", link: "https://github.com/guuszz/api-attack-surface/pull/3" },
      { label: "ScopeGuard", description: "Regressões para redes parcialmente fora do escopo e interseções com regras negadas.", link: "https://github.com/guuszz/scopeguard/pull/3" },
    ],
  },
  {
    emoji: "📚", title: "Aprofundamento atual",
    items: [
      { label: "AppSec e APIs", description: "Autenticação, autorização por organização, HTTP, modelagem de ameaças e reteste de correções." },
      { label: "Evidência antes de métricas", description: "Testes unitários, integração e navegador medem coisas diferentes. Percentuais de um subconjunto não são cobertura de toda a aplicação." },
    ],
  },
  {
    emoji: "🎯", title: "Próximos passos",
    items: [
      { label: "Primeira oportunidade", description: "Candidaturas a estágio em Segurança/AppSec e backend júnior, sem esperar o portfólio ficar perfeito." },
      { label: "Defender as decisões", description: "Reproduzir os testes e explicar as mudanças assistidas pelo Codex. Uso de IA não substitui revisão e domínio do código." },
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
            Um registro de revisões e estudos. Os links apontam para propostas em revisão, não para funcionalidades já implantadas.
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
