# Portfolio · guuszz

<p>
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/shadcn/ui-black?style=flat-square&logo=shadcnui&logoColor=white"/>
  <a href="https://portfolio-gusz-s-projects7.vercel.app"><img src="https://img.shields.io/github/deployments/guuszz/portfolio/production?label=vercel&logo=vercel&style=flat-square" alt="Vercel deploy"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/guuszz/portfolio?style=flat-square" alt="MIT License"/></a>
</p>

Site pessoal construído com Next.js 14, TypeScript, Tailwind CSS, shadcn/ui e Aceternity UI. Tema minimal dark.

**Demo:** [portfolio-gusz-s-projects7.vercel.app](https://portfolio-gusz-s-projects7.vercel.app)

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- next/font (Inter + JetBrains Mono)

## Rodar local

```bash
npm install
npm run dev
```

Acessar em <http://localhost:3000>.

## Estrutura

```
app/
├── layout.tsx     # html shell + fontes
├── page.tsx       # home: hero, about, projects, contact
└── globals.css    # tailwind + reset
components/
└── ProjectCard.tsx
public/screenshots/  # capturas dos projetos
```

## Customizar

- Editar os projetos em `app/page.tsx` (array `PROJECTS`)
- Trocar cores em `tailwind.config.ts` (tokens: `bg`, `fg`, `muted`, `accent`)
- Trocar fonte em `app/layout.tsx`
