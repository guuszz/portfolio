"use client";

import { motion } from "motion/react";
import { Coffee, MapPin, Code2, GitCommit, Calendar, Zap } from "lucide-react";
import * as React from "react";
import { NumberTicker } from "./number-ticker";

const STACK_GROUPS = {
  Front: ["TypeScript", "React", "Next.js", "Tailwind", "Vite"],
  Back: ["Node.js", "Express", "Python"],
  Mobile: ["React Native", "Expo"],
  Data: ["MySQL", "Git"],
};

function LocalTime() {
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Bahia",
      });
      setTime(now);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono text-sm">{time || "--:--"}</span>;
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function AboutBento() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {/* Sobre — span 2 */}
      <motion.div
        variants={item}
        className="col-span-1 rounded-xl border border-border bg-surface/40 p-5 sm:col-span-2"
      >
        <p className="text-muted leading-relaxed">
          Comecei a programar pela curiosidade de entender o que tinha por trás
          das telas. Hoje construo aplicações web e mobile usando principalmente{" "}
          <span className="text-fg">TypeScript</span>,{" "}
          <span className="text-fg">Node.js</span> e{" "}
          <span className="text-fg">React</span>.
        </p>
      </motion.div>

      {/* Localização */}
      <motion.div
        variants={item}
        className="rounded-xl border border-border bg-surface/40 p-5"
      >
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-mono text-xs uppercase tracking-widest text-muted/80">
              Localização
            </p>
            <p className="mt-1 text-fg">Vitória da Conquista</p>
            <p className="text-sm text-muted">Bahia, Brasil 🇧🇷</p>
            <p className="mt-3 text-xs text-muted">
              Agora: <LocalTime />
            </p>
          </div>
        </div>
      </motion.div>

      {/* Status disponível */}
      <motion.div
        variants={item}
        className="rounded-xl border border-border bg-surface/40 p-5"
      >
        <div className="flex items-start gap-3">
          <span className="relative mt-1 flex h-2.5 w-2.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <div className="flex-1">
            <p className="font-mono text-xs uppercase tracking-widest text-muted/80">
              Status
            </p>
            <p className="mt-1 text-fg">Disponível pra oportunidades</p>
            <p className="text-sm text-muted">Estágio, freela ou colaboração open-source</p>
          </div>
        </div>
      </motion.div>

      {/* Stack atual — span 2 */}
      <motion.div
        variants={item}
        className="col-span-1 rounded-xl border border-border bg-surface/40 p-5 sm:col-span-2"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted/80">
          stack atual
        </p>
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 md:grid-cols-4">
          {Object.entries(STACK_GROUPS).map(([group, items]) => (
            <div key={group}>
              <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                {group}
              </p>
              <ul className="space-y-1 font-mono text-sm text-muted">
                {items.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Em números — NumberTicker */}
      <motion.div
        variants={item}
        className="col-span-1 rounded-xl border border-border bg-surface/40 p-5 sm:col-span-2"
      >
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted/80">
          Em números
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
          <Stat icon={Code2} value={6} label="repos públicos" />
          <Stat icon={GitCommit} value={54} label="commits" />
          <Stat icon={Zap} value={4} label="apps no ar" />
          <Stat icon={Calendar} value={3} label="anos codando" />
        </div>
      </motion.div>

      {/* Now — o que tô estudando */}
      <motion.div
        variants={item}
        className="col-span-1 rounded-xl border border-border bg-surface/40 p-5 sm:col-span-2"
      >
        <div className="flex items-start gap-3">
          <Coffee className="h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-mono text-xs uppercase tracking-widest text-muted/80">
              No que estou trabalhando
            </p>
            <p className="mt-1 text-muted leading-relaxed">
              Estudando <span className="text-fg">arquitetura de APIs</span> e{" "}
              <span className="text-fg">padrões aplicados a Node.js</span>.
              Procurando oportunidades pra colaborar e aprender com devs mais experientes.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  suffix,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-accent">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        <NumberTicker
          value={value}
          suffix={suffix}
          className="font-mono text-2xl font-semibold tabular-nums text-fg"
        />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
      </p>
    </div>
  );
}
