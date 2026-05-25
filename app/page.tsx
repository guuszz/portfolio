import { Spotlight } from "@/components/ui/spotlight";
import { StaggerProjects } from "@/components/stagger-projects";
import { AboutBento } from "@/components/about-bento";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandTrigger } from "@/components/command-trigger";
import { TechMarquee } from "@/components/tech-marquee";

const PROJECTS = [
  {
    title: "Gfocus",
    description: "Lista de tarefas otimizada para foco e produtividade pessoal.",
    descriptionEn: "Productivity-focused todo app with drag & drop and smart filters.",
    stack: ["typescript", "react", "vite", "tailwind", "zustand"],
    image: "/screenshots/gfocus.png",
    imageAlt: "Landing page do Gfocus com hero, CTA e seção de features",
    imageWidth: 1440,
    demoUrl: "https://gfocus-zeta.vercel.app",
    repoUrl: "https://github.com/guuszz/Gfocus",
  },
  {
    title: "Oficina Mecânica",
    description: "Sistema full-stack de gestão para oficina — API REST + interface web.",
    descriptionEn: "Full-stack mechanic-shop management system.",
    stack: ["node", "express", "react", "typescript", "vite", "tailwind"],
    image: "/screenshots/oficina.png",
    imageAlt: "Dashboard da Oficina Mecânica com cards de clientes, veículos e ordens",
    imageWidth: 1440,
    demoUrl: "https://oficina-rouge.vercel.app",
    repoUrl: "https://github.com/guuszz/OFICINA",
  },
  {
    title: "FitHome",
    description: "App mobile para treinos em casa com peso do corpo.",
    descriptionEn: "Mobile app for at-home bodyweight workouts.",
    stack: ["react-native", "expo", "expo-router", "typescript", "async-storage", "reanimated", "expo-haptics"],
    image: "/screenshots/academia.png",
    imageAlt: "Tela de onboarding do FitHome com lista de benefícios",
    imageWidth: 414,
    imageHeight: 896,
    layout: "mobile" as const,
    demoUrl: "https://fithome-alpha.vercel.app",
    repoUrl: "https://github.com/guuszz/Academia-Em-Casa",
  },
];

export default function Home() {
  return (
    <main id="main-content" className="relative mx-auto max-w-2xl overflow-hidden px-6 py-20 sm:py-28">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-20" fill="rgb(163 230 53)" />
      <Spotlight className="left-full top-10 hidden md:block" fill="rgb(163 230 53)" />

      <div className="relative z-10">
        {/* Header */}
        <header className="mb-20 flex items-center justify-between gap-4">
          <a
            href="#main-content"
            aria-label="Voltar ao topo"
            className="font-mono text-sm text-muted py-2 transition-colors hover:text-fg"
          >
            gusz
          </a>
          <div className="flex items-center gap-3">
            <nav aria-label="Principal" className="hidden gap-5 text-sm text-muted sm:flex">
              <a href="#about" className="py-2 transition-colors hover:text-fg">about</a>
              <a href="#projects" className="py-2 transition-colors hover:text-fg">projects</a>
              <a href="#contact" className="py-2 transition-colors hover:text-fg">contact</a>
            </nav>
            <CommandTrigger />
            <ThemeToggle />
          </div>
        </header>

        {/* Hero */}
        <section className="mb-24">
          <p className="mb-4 font-mono text-sm text-accent">olá, eu sou</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Gustavo Oliveira.
          </h1>
          <p className="mt-4 text-xl font-medium text-muted text-pretty sm:text-3xl">
            Construo coisas para web e mobile.
          </p>
          <p className="mt-6 max-w-prose text-muted">
            Sou estudante de Sistemas de Informação e desenvolvedor full-stack em formação.
            Foco em APIs bem desenhadas, interfaces limpas e código que outras pessoas
            consigam ler sem sofrer.
          </p>
          <p className="mt-3 hidden max-w-prose text-sm text-muted md:block" lang="en">
            Information Systems student and full-stack developer in training. Focused on
            clean APIs, polished interfaces, and readable code.
          </p>
        </section>

        {/* About — Bento */}
        <section id="about" className="mb-12">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">
            <span className="text-accent" aria-hidden="true">01.</span> Sobre
          </h2>
          <AboutBento />
        </section>

        {/* Marquee — sai do container max-w pra ocupar toda largura */}
        <div className="relative -mx-6 mb-24 border-y border-border bg-surface/30 sm:-mx-[max(calc((100vw-672px)/2),1.5rem)]">
          <TechMarquee />
        </div>

        {/* Projects */}
        <section id="projects" className="mb-24">
          <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-muted">
            <span className="text-accent" aria-hidden="true">02.</span> Projetos
          </h2>
          <StaggerProjects projects={PROJECTS} />
        </section>

        {/* Contact */}
        <section id="contact" className="mb-16">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">
            <span className="text-accent" aria-hidden="true">03.</span> Contato
          </h2>
          <p className="text-muted">
            Aberto a oportunidades, colaborações ou só uma boa conversa sobre código.
            A forma mais rápida de me achar:
          </p>
          <ul className="mt-6 space-y-3 font-mono text-sm">
            <li>
              <a
                href="mailto:gustavosaraiva2504@gmail.com"
                className="group inline-flex min-h-[44px] items-center gap-3 py-2 text-fg transition-colors hover:text-accent"
              >
                <span className="text-muted">email</span>
                <span className="text-muted" aria-hidden="true">→</span>
                gustavosaraiva2504@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://github.com/guuszz"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-3 py-2 text-fg transition-colors hover:text-accent"
              >
                <span className="text-muted">github</span>
                <span className="text-muted" aria-hidden="true">→</span>
                @guuszz
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-20 border-t border-border pt-6 font-mono text-xs text-muted/80">
          <p>
            Construído com Next.js, Tailwind CSS e ☕ em Vitória da Conquista — BA ·{" "}
            <a
              href="https://github.com/guuszz/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 transition-colors hover:text-fg hover:underline"
            >
              view source
            </a>
            <span className="hidden sm:inline"> · pressione <kbd className="rounded border border-border bg-surface px-1 py-0.5 text-[10px]">⌘K</kbd> pra navegar rápido</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
