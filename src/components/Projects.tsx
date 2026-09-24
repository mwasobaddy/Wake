"use client";

import { useMemo, useState } from "react";
import { categories, projects, repoUrl, type Category } from "@/data/projects";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/icons";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <article className="group relative flex flex-col border border-line bg-coal/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-wake/70 hover:bg-coal">
      <span className="absolute left-0 top-0 h-0.5 w-0 bg-wake transition-all duration-300 group-hover:w-full" />

      <div className="mb-5 flex items-start justify-between">
        <span className="font-mono text-xs text-white/30 group-hover:text-wake">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <span className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
            {project.year}
          </span>
          <span className="border border-wake/30 bg-wake/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ember">
            {project.categories[0]}
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-bold tracking-tight group-hover:text-white">
        {project.name}
      </h3>
      <p className="mt-1 text-sm text-white/50">{project.tagline}</p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/45">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50 transition-colors group-hover:border-white/15 group-hover:text-white/70"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-line pt-4">
        <a
          href={repoUrl(project.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="group/ghost inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-wake"
        >
          <GitHubIcon className="h-3.5 w-3.5" />
          Code
        </a>
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/demo inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-wake"
          >
            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5" />
            Live
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState<"All" | Category>("All");

  const list = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(active)),
    [active],
  );

  return (
    <section id="projects" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="01"
          eyebrow="The Catalogue"
          title={
            <>
              Every build, <span className="rise">catalogued.</span>
            </>
          }
        >
          A working history of everything I&apos;ve shipped — from enterprise
          platforms and SaaS to mobile apps and AI tools. Filter by discipline,
          or just scroll.
        </SectionHeading>

        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = active === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={isActive}
                  className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                    isActive
                      ? "border-wake bg-wake text-ink"
                      : "border-line text-white/55 hover:border-wake/60 hover:text-wake"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 70} className="h-full">
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>

        <p className="mt-12 font-mono text-xs uppercase tracking-[0.22em] text-white/35">
          [{list.length} / {projects.length}] builds shown —{" "}
          <a
            href="https://github.com/mwasobaddy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 transition-colors hover:text-wake"
          >
            more on GitHub
          </a>
        </p>
      </div>
    </section>
  );
}