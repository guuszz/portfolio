import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
