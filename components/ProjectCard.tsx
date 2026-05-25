import Image from "next/image";
import { CardGlow } from "@/components/ui/card-glow";

type Layout = "desktop" | "mobile";

type Props = {
  title: string;
  description: string;
  descriptionEn: string;
  stack: string[];
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  layout?: Layout;
  demoUrl?: string;
  repoUrl: string;
};

export function ProjectCard({
  title,
  description,
  descriptionEn,
  stack,
  image,
  imageAlt,
  imageWidth = 1440,
  imageHeight = 900,
  layout = "desktop",
  demoUrl,
  repoUrl,
}: Props) {
  return (
    <CardGlow>
      <article className="relative rounded-xl border border-border bg-surface/40 p-5 transition-colors hover:border-muted/30 sm:p-6">
        {layout === "mobile" ? (
          <div className="flex justify-center overflow-hidden rounded-lg border border-border bg-bg py-6">
            <Image
              src={image}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="h-auto w-[220px] rounded-md shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-border bg-bg">
            <Image
              src={image}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        )}

        <div className="mt-5">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-muted">{description}</p>
          <p className="mt-1 text-sm text-muted/80" lang="en">{descriptionEn}</p>

          <ul className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-muted">
            {stack.map((s) => (
              <li key={s} className="rounded-md border border-border px-2 py-1">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-x-4 text-sm">
            {demoUrl ? (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1 py-2 text-accent transition-opacity hover:opacity-80"
              >
                Demo ao vivo <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="inline-flex min-h-[44px] items-center gap-1 py-2 text-muted/80">
                Demo em breve
              </span>
            )}
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1 py-2 text-fg transition-opacity hover:opacity-80"
            >
              Código <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </article>
    </CardGlow>
  );
}
