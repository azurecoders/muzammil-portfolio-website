"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { projectDetailsData } from "@/data/projectDetail";
import { cn } from "@/lib/cn";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const projects = projectDetailsData.projects;
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return projects.filter((p) => {
      const matchesFilter =
        activeFilter === "All" || p.category === activeFilter;
      if (!q) return matchesFilter;
      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [projects, activeFilter, searchQuery]);

  const total = projects.length;
  const shown = filtered.length;

  return (
    <div className="min-h-dvh">
      {/* ─────────────  HERO  ───────────── */}
      <section className="px-5 sm:px-8 lg:px-12 pt-36 sm:pt-44 lg:pt-52 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute mb-6 flex items-center gap-3 before:h-px before:w-8 before:bg-border">
            {projectDetailsData.label}
          </p>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.02em] text-fg leading-[1.02] max-w-4xl">
            {projectDetailsData.headings.headingNormal}{" "}
            <em className="italic text-accent">
              {projectDetailsData.headings.headingHighlighted}
            </em>
          </h1>

          <p className="mt-8 text-base sm:text-lg text-fg-mute max-w-2xl leading-relaxed">
            {projectDetailsData.description}
          </p>

          {/* Thin meta row */}
          <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-mute">
            <span>
              <span className="text-fg tabular-nums">
                {String(total).padStart(2, "0")}
              </span>{" "}
              Projects
            </span>
            <span className="hidden sm:inline">·</span>
            <span>
              <span className="text-fg tabular-nums">
                {String(categories.length - 1).padStart(2, "0")}
              </span>{" "}
              Categories
            </span>
            <span className="hidden sm:inline">·</span>
            <span>2022 — 2026</span>
          </div>
        </div>
      </section>

      {/* ─────────────  TOOLBAR  ───────────── */}
      <div className="z-30 border-y border-border bg-bg/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search
              size={14}
              strokeWidth={1.75}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-mute pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-9 pr-8 py-2 border-b border-border focus:border-fg focus:outline-none text-sm text-fg placeholder:text-fg-mute transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-fg-mute hover:text-fg"
                aria-label="Clear"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveFilter(c)}
                data-cursor="link"
                className={cn(
                  "px-3 py-1.5 rounded-pill text-[11px] font-mono uppercase tracking-[0.16em] whitespace-nowrap transition-colors duration-300",
                  activeFilter === c ? "text-fg" : "text-fg-mute hover:text-fg",
                )}
              >
                {c}
                {activeFilter === c && (
                  <span className="ml-2 inline-block w-1 h-1 rounded-full bg-accent align-middle" />
                )}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="font-mono text-[11px] tabular-nums uppercase tracking-[0.2em] text-fg-mute shrink-0">
            <span className="text-fg">{String(shown).padStart(2, "0")}</span>
            <span className="mx-1.5 text-fg-mute/40">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </p>
        </div>
      </div>

      {/* ─────────────  GRID  ───────────── */}
      <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto">
          {shown === 0 ? (
            <EmptyState
              onReset={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
            />
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-y-20">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </ul>
          )}

          {/* ─────────────  OUTRO  ───────────── */}
          <div className="mt-32 sm:mt-40 pt-12 border-t border-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute mb-5 flex items-center gap-3 before:h-px before:w-8 before:bg-border">
                  Get in touch
                </p>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-[-0.01em] text-fg leading-[1.05]">
                  Have something{" "}
                  <em className="italic text-accent">in motion</em>?
                  <br />
                  Let&apos;s build the next one.
                </h3>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  href="/#contact"
                  data-cursor="cta"
                  className="group inline-flex items-center gap-3 h-12 pl-6 pr-2 rounded-pill bg-fg text-bg font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-fg transition-colors duration-500"
                >
                  Start a project
                  <span className="w-9 h-9 rounded-pill bg-bg/15 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={14} strokeWidth={1.75} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────  CARD  ───────────── */

function ProjectCard({
  project,
}: {
  project: (typeof projectDetailsData.projects)[number];
}) {
  return (
    <li>
      <Link
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="view"
        className="group block"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-bg-soft border border-border group-hover:border-fg/30 transition-colors duration-500">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
        </div>

        {/* Text */}
        <div className="mt-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-mute">
              {project.category}
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-mute">
              {project.client}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl lg:text-2xl tracking-tight text-fg leading-[1.2] group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="shrink-0 mt-1 text-fg-mute transition-all duration-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>

          <p className="mt-2 text-sm text-fg-mute leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </Link>
    </li>
  );
}

/* ─────────────  EMPTY STATE  ───────────── */

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute mb-4">
        No results
      </p>
      <h3 className="font-display text-3xl sm:text-4xl tracking-tight text-fg leading-[1.05] max-w-md mx-auto">
        Nothing matches <em className="italic text-accent">that</em>.
      </h3>
      <p className="mt-3 text-sm text-fg-mute">
        Try a different search term or category.
      </p>
      <button
        onClick={onReset}
        className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-fg border-b border-border hover:border-fg pb-0.5 transition-colors"
      >
        Reset filters
      </button>
    </div>
  );
}
