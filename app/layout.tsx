import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CommandPalette } from "@/components/command-palette";
import { ReadingProgress } from "@/components/reading-progress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const SITE_URL = "https://portfolio-amber-omega-3kyqfla4q7.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gustavo Oliveira · Desenvolvimento seguro e AppSec",
    template: "%s · Gustavo Oliveira",
  },
  description:
    "Estudante de Sistemas de Informação em busca da primeira oportunidade em desenvolvimento seguro, AppSec e segurança Web/API.",
  keywords: [
    "Gustavo Oliveira",
    "guuszz",
    "AppSec",
    "desenvolvimento seguro",
    "TypeScript",
    "Node.js",
    "React",
    "Next.js",
    "desenvolvedor",
    "Vitória da Conquista",
    "Bahia",
  ],
  authors: [{ name: "Gustavo Oliveira", url: "https://github.com/guuszz" }],
  creator: "Gustavo Oliveira",
  openGraph: {
    title: "Gustavo Oliveira · Desenvolvimento seguro e AppSec",
    description: "Portfólio de estudante · Python, TypeScript, APIs e testes",
    type: "website",
    locale: "pt_BR",
    siteName: "gusz",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Oliveira · Desenvolvimento seguro e AppSec",
    description: "Portfólio de estudante · Python, TypeScript, APIs e testes",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gustavo Avelino Saraiva Oliveira",
  alternateName: "guuszz",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  sameAs: ["https://github.com/guuszz", "https://www.linkedin.com/in/gustavo-saraiva-054807358/"],
  jobTitle: "Estudante de Sistemas de Informação",
  description:
    "Estudante de Sistemas de Informação com foco em desenvolvimento seguro e segurança Web/API.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vitória da Conquista",
    addressRegion: "BA",
    addressCountry: "BR",
  },
  knowsAbout: [
    "TypeScript",
    "JavaScript",
    "Node.js",
    "React",
    "Next.js",
    "Tailwind CSS",
    "PostgreSQL",
    "Python",
  ],
  email: "mailto:gustavosaraiva2504@gmail.com",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-medium focus:text-bg"
          >
            Pular para o conteúdo
          </a>
          <ReadingProgress />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
