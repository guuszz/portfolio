import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { ReadingProgress } from "@/components/reading-progress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Gustavo Oliveira · Full-stack developer",
  description:
    "Estudante de Sistemas de Informação · Construindo APIs e apps com TypeScript & Node.js.",
  openGraph: {
    title: "Gustavo Oliveira · Full-stack developer",
    description: "Portfolio · TypeScript, Node.js, React, Expo",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-medium focus:text-bg"
          >
            Pular para o conteúdo
          </a>
          <ReadingProgress />
          {children}
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
