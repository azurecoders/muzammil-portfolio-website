"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Filter, Search, Sparkles, X } from "lucide-react";
import { projectDetailsData } from "@/data/projectDetail";
import { Section } from "@/components/primitives/Section";
import { cn } from "@/lib/cn";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const projects = projectDetailsData.projects;
  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filtered = projects.filter((p) => {
    const matchesFilter = activeFilter === "All" || p.category === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <section className="relative pt-40 sm:pt-48 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p
            data-reveal
            className="font-mono text-xs uppercase tracking-wider text-fg-mute mb-6 inline-flex items-center gap-2"
          >
            <Sparkles size={14} className="text-accent" />
            {projectDetailsData.label}
          </p>
          <h1
            data-reveal
            className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight text-fg leading-[1.05] max-w-4xl"
          >
            {projectDetailsData.headings.headingNormal}{" "}
            <em className="italic text-accent">
              {projectDetailsData.headings.headingHighlighted}
            </em>
          </h1>
          <p
            data-reveal
            className="mt-8 text-lg sm:text-xl text-fg-mute max-w-2xl leading-relaxed"
          >
            {projectDetailsData.description}
          </p>
        </div>
      </section>

      <div className="sticky top-24 z-30 border-y border-border bg-bg/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-mute"
              size={14}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-soft pl-9 pr-4 py-2.5 rounded-pill border border-border focus:outline-none focus:border-accent font-mono text-sm text-fg placeholder:text-fg-mute transition-colors duration-300"
            />
          </div>

          <div className="hidden md:flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveFilter(c)}
                data-cursor="link"
                className={cn(
                  "px-4 py-1.5 rounded-pill text-xs font-mono uppercase tracking-wider transition-all duration-300 whitespace-nowrap",
                  activeFilter === c
                    ? "bg-accent text-accent-fg"
                    : "text-fg-mute hover:text-fg border border-border hover:border-fg"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters((s) => !s)}
            className="md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-pill border border-border font-mono text-xs uppercase tracking-wider text-fg-mute"
          >
            <Filter size={14} /> Filter
          </button>
        </div>

        {showFilters && (
          <div className="md:hidden border-t border-border px-5 py-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setActiveFilter(c);
                  setShowFilters(false);
                }}
                className={cn(
                  "px-3 py-1 rounded-pill text-xs font-mono uppercase tracking-wider",
                  activeFilter === c
                    ? "bg-accent text-accent-fg"
                    : "text-fg-mute border border-border"
                )}
              >
                {c}
              </button>
            ))}
            <button
              onClick={() => setShowFilters(false)}
              className="ml-auto text-fg-mute"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <Section
        containerClassName="max-w-7xl mx-auto"
        className="py-16 sm:py-24"
      >
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="font-display text-3xl tracking-tight text-fg-mute">
              No projects found
            </h3>
            <p className="mt-3 font-mono text-sm text-fg-mute">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <Link
                key={project.id}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="group block border border-border rounded-md overflow-hidden hover:border-accent transition-all duration-500"
              >
                <div className="relative aspect-video overflow-hidden bg-bg-soft">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                    {project.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl tracking-tight text-fg group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-mute line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-fg-mute">
                      {project.client}
                    </span>
                    <div className="w-8 h-8 rounded-pill border border-border flex items-center justify-center text-fg-mute group-hover:bg-accent group-hover:text-accent-fg group-hover:border-accent transition-all duration-300">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-fg-mute mb-3">
            Have a project in mind?
          </p>
          <Link
            href="/#contact"
            data-cursor="cta"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-pill bg-accent text-accent-fg font-medium text-sm hover:brightness-110 transition-all duration-300"
          >
            Let&apos;s work together <ArrowUpRight size={14} />
          </Link>
        </div>
      </Section>
    </>
  );
}
