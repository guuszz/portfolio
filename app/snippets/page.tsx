import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Code2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandTrigger } from "@/components/command-trigger";

export const metadata: Metadata = {
  title: "Snippets · código reutilizável",
  description:
    "Utility hooks e patterns que extraí dos meus projetos. Pega, cola, usa. MIT.",
  openGraph: {
    title: "Snippets · Gustavo Oliveira",
    description: "Hooks e patterns reutilizáveis em TypeScript/React.",
  },
};

interface Snippet {
  title: string;
  description: string;
  language: string;
  source: string;
  sourceRepo: string;
  code: string;
}

const SNIPPETS: Snippet[] = [
  {
    title: "useNumberTicker",
    description:
      "Anima um número de 0 até `value` durante `duration` ms. Respeita prefers-reduced-motion. Ease-out cubic.",
    language: "ts",
    source: "OFICINA · src/lib/useNumberTicker.ts",
    sourceRepo: "https://github.com/guuszz/OFICINA/blob/main/src/lib/useNumberTicker.ts",
    code: `import { useEffect, useState } from 'react';

export function useNumberTicker(value: number, duration = 600): number {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setDisplay(value);
      return;
    }

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced || value === 0) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const startValue = display;
    const delta = value - startValue;
    let frame = 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(Math.round(startValue + delta * eased));
      if (t < 1) frame = requestAnimationFrame(step);
      else setDisplay(value);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
}`,
  },
  {
    title: "useTheme",
    description:
      "Theme hook com 3 estados (light/dark/system) + persistência em localStorage + sincronização com mudança do SO quando system.",
    language: "ts",
    source: "OFICINA · src/lib/useTheme.ts",
    sourceRepo: "https://github.com/guuszz/OFICINA/blob/main/src/lib/useTheme.ts",
    code: `import { useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'app-theme';

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return theme;
}

function applyTheme(resolved: 'light' | 'dark') {
  const root = document.documentElement;
  root.classList.toggle('dark', resolved === 'dark');
  root.style.colorScheme = resolved;
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored === 'light' || stored === 'dark' || stored === 'system')
      ? stored
      : 'system';
  });

  useEffect(() => {
    applyTheme(resolveTheme(theme));
  }, [theme]);

  // Reage a mudança do SO quando theme === 'system'
  useEffect(() => {
    if (theme !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme(mql.matches ? 'dark' : 'light');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  return { theme, setTheme, resolvedTheme: resolveTheme(theme) };
}`,
  },
  {
    title: "fetch interceptor (auth global)",
    description:
      "Patcha o window.fetch pra injetar Authorization header em todo /api/* + captura 401 dispatching event. Permite multi-tenancy sem refatorar 30 components.",
    language: "ts",
    source: "OFICINA · src/lib/api.ts",
    sourceRepo: "https://github.com/guuszz/OFICINA/blob/main/src/lib/api.ts",
    code: `const TOKEN_KEY = 'app:token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function installFetchInterceptor() {
  if (typeof window === 'undefined') return;
  const original = window.fetch.bind(window);

  window.fetch = async (input, init) => {
    const url = typeof input === 'string'
      ? input
      : input instanceof Request ? input.url : input.toString();

    const isApi = url.includes('/api/');
    const isAuthEndpoint = url.endsWith('/api/auth/login')
      || url.endsWith('/api/auth/register');

    if (isApi) {
      const token = getToken();
      const headers = new Headers(init?.headers);
      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', \`Bearer \${token}\`);
      }
      init = { ...init, headers };
    }

    const response = await original(input, init);

    if (response.status === 401 && isApi && !isAuthEndpoint) {
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }

    return response;
  };
}`,
  },
  {
    title: "NDJSON streaming reader (frontend)",
    description:
      "Lê uma response em streaming linha-a-linha (1 JSON por linha). Alternativa ao EventSource quando você precisa de POST com body.",
    language: "ts",
    source: "pr-reviewer · app/page.tsx",
    sourceRepo: "https://github.com/guuszz/pr-reviewer/blob/main/app/page.tsx",
    code: `async function readNDJSON<T>(
  response: Response,
  onEvent: (event: T) => void
) {
  if (!response.body) throw new Error('No body to stream');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    let newlineIdx = buffer.indexOf('\\n');
    while (newlineIdx !== -1) {
      const line = buffer.slice(0, newlineIdx).trim();
      buffer = buffer.slice(newlineIdx + 1);
      if (line) {
        try {
          onEvent(JSON.parse(line) as T);
        } catch (e) {
          console.error('Invalid NDJSON line:', line);
        }
      }
      newlineIdx = buffer.indexOf('\\n');
    }
  }
}`,
  },
  {
    title: "NDJSON streaming response (backend)",
    description:
      "Cria um ReadableStream que escreve eventos NDJSON. Útil pra route handlers do Next.js quando você quer streaming progressivo.",
    language: "ts",
    source: "pr-reviewer · app/api/analyze/stream/route.ts",
    sourceRepo: "https://github.com/guuszz/pr-reviewer/blob/main/app/api/analyze/stream/route.ts",
    code: `export async function POST(req: Request) {
  const encoder = new TextEncoder();
  const event = (data: Record<string, unknown>) =>
    encoder.encode(JSON.stringify(data) + '\\n');

  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(event({ type: 'meta', /* ... */ }));

        // Stream do LLM / processo longo
        for await (const chunk of someAsyncIterable) {
          controller.enqueue(event({ type: 'chunk', text: chunk }));
        }

        controller.enqueue(event({ type: 'done' }));
        controller.close();
      } catch (err) {
        controller.enqueue(event({
          type: 'error',
          message: err instanceof Error ? err.message : 'unknown',
        }));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}`,
  },
  {
    title: "shortIdFromUrl (deterministic share IDs)",
    description:
      "Gera ID curto e estável a partir de uma URL via SHA-256. Mesmo input = mesmo ID. Útil pra share links que se beneficiam de cache compartilhado.",
    language: "ts",
    source: "pr-reviewer · lib/redis.ts",
    sourceRepo: "https://github.com/guuszz/pr-reviewer/blob/main/lib/redis.ts",
    code: `import crypto from 'node:crypto';

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    return \`\${u.host}\${u.pathname}\`.toLowerCase().replace(/\\/$/, '');
  } catch {
    return url.toLowerCase().trim();
  }
}

export function shortIdFromUrl(url: string): string {
  const normalized = normalizeUrl(url);
  const hash = crypto.createHash('sha256').update(normalized).digest('hex');
  return hash.slice(0, 10);
  // 10 chars hex = 40 bits = ~1 trilhão de IDs únicos.
  // Validate no consumo: /^[a-f0-9]{10}$/.test(id)
}`,
  },
  {
    title: "verifySignature (GitHub webhook HMAC)",
    description:
      "Valida assinatura HMAC SHA-256 de webhook do GitHub usando crypto.timingSafeEqual (previne timing attacks). Use no telegram-commits-mirror e qualquer integração com webhooks.",
    language: "ts",
    source: "telegram-commits-mirror · api/webhook.ts",
    sourceRepo: "https://github.com/guuszz/telegram-commits-mirror/blob/main/api/webhook.ts",
    code: `import crypto from 'node:crypto';

export function verifySignature(
  payload: string,
  signatureHeader: string | undefined,
  secret: string
): boolean {
  if (!signatureHeader) return false;

  const expected =
    'sha256=' +
    crypto.createHmac('sha256', secret).update(payload).digest('hex');

  const a = Buffer.from(signatureHeader);
  const b = Buffer.from(expected);

  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}`,
  },
];

export default function SnippetsPage() {
  return (
    <main className="relative mx-auto max-w-3xl px-6 py-20 sm:py-28">
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
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">/snippets</p>
          <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            Snippets reutilizáveis
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
            Hooks e patterns que extraí dos meus projetos open-source. Pega, cola, usa em produção.
            Todos sob MIT — sem precisar atribuir, mas se ajudar, manda um ⭐ no repo de origem.
          </p>
        </section>

        {/* Snippets */}
        <div className="space-y-16">
          {SNIPPETS.map((snippet) => (
            <article key={snippet.title} className="group">
              <header className="mb-4">
                <h2 className="text-xl font-semibold tracking-tight text-fg">{snippet.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{snippet.description}</p>
                <a
                  href={snippet.sourceRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
                >
                  <Code2 className="h-3 w-3" aria-hidden="true" />
                  <span>{snippet.source}</span>
                </a>
              </header>

              <pre className="overflow-x-auto rounded-lg border border-border bg-surface/40 p-4 text-xs leading-relaxed">
                <code className="font-mono text-fg/90">{snippet.code}</code>
              </pre>
            </article>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-border pt-8">
          <p className="text-sm text-muted">
            Quer ver mais? Todo código tá nos repos:{" "}
            <a
              href="https://github.com/guuszz?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              @guuszz
            </a>
            . Sugestões? Abre uma issue.
          </p>
        </footer>
      </div>
    </main>
  );
}
