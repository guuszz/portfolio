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
    default: "Gustavo Oliveira · Segurança da Informação e AppSec",
    template: "%s · Gustavo Oliveira",
  },
  description:
    "Estudante do 4º semestre de Sistemas de Informação (conclusão prevista em 2029), com foco em segurança Web/API e automação.",
  keywords: [
    "Gustavo Oliveira",
    "guuszz",
    "segurança da informação",
    "AppSec",
    "segurança de APIs",
    "TypeScript",
    "Node.js",
    "React",
    "Next.js",
    "Expo",
    "desenvolvedor",
    "Vitória da Conquista",
    "Bahia",
  ],
  authors: [{ name: "Gustavo Oliveira", url: "https://github.com/guuszz" }],
  creator: "Gustavo Oliveira",
  openGraph: {
    title: "Gustavo Oliveira · Segurança da Informação e AppSec",
    description: "Portfólio · Segurança Web/API, Python, Linux e automação",
    type: "website",
    locale: "pt_BR",
    siteName: "gusz",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Oliveira · Segurança da Informação e AppSec",
    description: "Portfólio · Segurança Web/API, Python, Linux e automação",
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
  sameAs: ["https://github.com/guuszz", "https://www.linkedin.com/in/gustavo-avelino-saraiva-oliveira-054807358/"],
  jobTitle: "Estudante de Sistemas de Informação",
  description:
    "Estudante do 4º semestre de Sistemas de Informação, interessado em Segurança da Informação, AppSec e segurança de APIs.",
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
    "React Native",
    "Expo",
    "Tailwind CSS",
    "MySQL",
    "Python",
    "Linux",
    "Segurança de aplicações web",
    "Segurança de APIs",
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
