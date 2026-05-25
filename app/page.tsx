import { Spotlight } from "@/components/ui/spotlight";
import { ProjectCard } from "@/components/ProjectCard";

const PROJECTS = [
  {
    title: "Gfocus",
    description:
      "Lista de tarefas otimizada para foco e produtividade pessoal.",
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
    description:
      "Sistema full-stack de gestão para oficina — API REST + interface web.",
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
    description:
      "App mobile para treinos em casa com peso do corpo.",
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
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-20" fill="#a3e635" />
      <Spotlight className="left-full top-10 hidden md:block" fill="#a3e635" />
      {/* Header */}
      <header className="mb-20 flex items-center justify-between">
        <a
          href="#main-content"
          aria-label="Voltar ao topo"
          className="font-mono text-sm text-muted py-2 transition-colors hover:text-fg"
        >
          gusz
        </a>
        <nav aria-label="Principal" className="flex gap-5 text-sm text-muted">
          <a href="#about" className="py-2 transition-colors hover:text-fg">about</a>
          <a href="#projects" className="py-2 transition-colors hover:text-fg">projects</a>
          <a href="#contact" className="py-2 transition-colors hover:text-fg">contact</a>
        </nav>
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
          consigam ler sem sofrer. Atualmente estudando arquitetura de APIs e padrões
          aplicados a Node.js.
        </p>
        <p className="mt-3 hidden max-w-prose text-sm text-muted md:block" lang="en">
          Information Systems student and full-stack developer in training. Focused on
          clean APIs, polished interfaces, and readable code.
        </p>
      </section>

      {/* About */}
      <section id="about" className="mb-24">
        <h2 className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">
          <span className="text-accent" aria-hidden="true">01.</span> Sobre
        </h2>
        <div className="space-y-4 text-muted">
          <p>
            Comecei a programar pela curiosidade de entender o que tinha por trás
            das telas. Hoje construo aplicações web e mobile usando principalmente
            <span className="text-fg"> TypeScript</span>,
            <span className="text-fg"> Node.js</span> e
            <span className="text-fg"> React</span>.
          </p>
          <p>
            Estou em Vitória da Conquista, Bahia, e procuro oportunidades para
            colaborar em projetos onde possa aprender com pessoas mais experientes
            e contribuir com código de qualidade.
          </p>
        </div>

        <div className="mt-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted/80">
            stack atual
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm text-muted sm:grid-cols-3">
            {["TypeScript", "JavaScript", "Node.js", "Express", "React", "React Native", "Expo", "Vite", "Tailwind CSS", "MySQL", "Git", "Python"].map((tech) => (
              <li key={tech} className="flex items-center gap-2">
                <span className="text-accent" aria-hidden="true">▸</span>
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mb-24">
        <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-muted">
          <span className="text-accent" aria-hidden="true">02.</span> Projetos
        </h2>
        <div className="grid gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
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
        </p>
      </footer>
    </main>
  );
}
