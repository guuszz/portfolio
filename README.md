# Portfolio · guuszz

Site pessoal construído com Next.js 14 e Tailwind CSS. Tema minimal dark.

**Deploy:** Vercel — em https://github.com/guuszz/portfolio importe na [vercel.com](https://vercel.com/new), é zero config.

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
