"use client";

import { motion } from "motion/react";
import { ProjectCard } from "@/components/ProjectCard";

type ProjectData = React.ComponentProps<typeof ProjectCard>;

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function StaggerProjects({ projects }: { projects: ProjectData[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        show: { transition: { staggerChildren: 0.12 } },
      }}
      className="grid gap-6"
    >
      {projects.map((p) => (
        <motion.div key={p.title} variants={item}>
          <ProjectCard {...p} />
        </motion.div>
      ))}
    </motion.div>
  );
}
