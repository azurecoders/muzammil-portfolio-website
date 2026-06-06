"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    const ghost = ghostRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".work-card", track);
      if (!cards.length) return;

      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = totalWidth - viewportWidth;

      // Main horizontal scroll
      const mainTl = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + 200}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) {
              progress.style.transform = `scaleX(${self.progress})`;
            }
            const idx = Math.round(self.progress * (cards.length - 1));
            setActiveIdx((prev) => (prev !== idx ? idx : prev));
          },
        },
      });

      // Ghost number — moves slower than the cards for parallax depth
      if (ghost) {
        gsap.to(ghost, {
          x: -distance * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance + 200}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // Per-card scale + lift — each card animates as it crosses the viewport center
      cards.forEach((card) => {
        const inner = card.querySelector(".card-inner") as HTMLElement | null;
        const meta = card.querySelector(".card-meta") as HTMLElement | null;
        if (!inner) return;

        // Use containerAnimation so the trigger fires relative to the horizontal scroll
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: mainTl,
          start: "left right", // when card's left enters the right edge
          end: "right left", // when card's right leaves the left edge
          scrub: 0.5,
          onUpdate: (self) => {
            // Bell-curve scale: smallest at edges, largest in center
            const p = self.progress; // 0 -> 1 as card crosses viewport
            const dist = Math.abs(p - 0.5) * 2; // 1 at edges, 0 at center
            const ease = 1 - dist; // inverted: 0 at edges, 1 at center
            const scale = 0.88 + ease * 0.12; // 0.88 -> 1.0
            const y = dist * 28; // up to 28px down at edges
            const rotate = (p - 0.5) * 4; // ±2deg tilt across the pass
            inner.style.transform = `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`;

            // Meta strip fades in as card centers
            if (meta) meta.style.opacity = String(ease);
          },
        });
      });

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return <MobileFallback />;
  }

  return (
    <>
      {/* Desktop horizontal scroll showcase */}
      <section
        ref={sectionRef}
        id="work"
        className="relative hidden md:block h-dvh w-full overflow-hidden"
      >
        {/* HEADER BAND — fixed top region, clear visual separation from card stage */}
        <header className="absolute top-0 inset-x-0 z-30 pointer-events-none">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 pt-20 lg:pt-24 pb-4">
            <div className="flex items-end justify-between gap-8">
              <div className="pointer-events-auto">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-mute mb-3 flex items-center gap-3 before:h-px before:w-8 before:bg-border">
                  Selected work
                </p>
                <h2 className="font-display text-3xl lg:text-4xl tracking-tight text-fg leading-[1.04]">
                  Things I&apos;ve{" "}
                  <em className="italic text-accent">shipped</em>.
                </h2>
              </div>

              <div className="pointer-events-auto text-right shrink-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-mute/60 mb-1">
                  Showcase
                </p>
                <p className="font-mono text-sm tabular-nums">
                  <span className="text-fg">
                    {String(activeIdx + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-1.5 text-fg-mute/40">/</span>
                  <span className="text-fg-mute">
                    {String(projects.length).padStart(2, "0")}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* Hairline divider — visually separates header from stage */}
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="h-px bg-border/60" />
          </div>
        </header>

        {/* GHOST NUMBER — parallax background typography */}
        <div
          ref={ghostRef}
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none flex items-center"
          style={{ willChange: "transform" }}
        >
          <div className="flex items-center gap-[35vw] pl-[20vw]">
            {projects.map((p, idx) => (
              <span
                key={p.id}
                className={cn(
                  "shrink-0 font-display italic leading-none select-none",
                  "text-[clamp(20rem,40vw,40rem)] tracking-[-0.06em]",
                  "text-transparent",
                  "[-webkit-text-stroke:1px_var(--border)]"
                )}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>

        {/* CARD STAGE — clear top/bottom margins prevent overlap with header & progress */}
        <div className="absolute inset-0 z-10 flex items-center pt-32 pb-20 lg:pt-40 lg:pb-24">
          <div
            ref={trackRef}
            className="flex items-center gap-10 lg:gap-16 px-8 lg:px-12 will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {/* Intro card */}
            <div className="shrink-0 w-[42vw] flex flex-col justify-center pl-8 lg:pl-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-mute/60 mb-4">
                Index
              </p>
              <p className="font-display text-2xl lg:text-[1.875rem] xl:text-4xl leading-[1.15] tracking-tight text-fg-mute max-w-md text-balance">
                A handful of products from the last couple of years.{" "}
                <span className="text-fg">Scroll</span> to explore, or jump to
                the archive at the end.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <ArrowUpRight
                  size={16}
                  className="rotate-90 text-fg-mute"
                  strokeWidth={1.5}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-mute">
                  Scroll right
                </span>
              </div>
            </div>

            {projects.map((p, idx) => (
              <article
                key={p.id}
                className={cn(
                  "work-card shrink-0",
                  "w-[64vw] lg:w-[50vw] xl:w-[44vw] max-w-[820px]",
                  "h-[62vh] max-h-[600px]",
                  "relative group/card"
                )}
              >
                {/* Card inner — gets scale/rotate/translate from ScrollTrigger */}
                <div
                  className={cn(
                    "card-inner relative h-full w-full rounded-xl overflow-hidden",
                    "border border-border bg-bg-soft",
                    "shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
                  )}
                  style={{
                    willChange: "transform",
                    transform: "translateY(28px) scale(0.88) rotate(0deg)",
                  }}
                >
                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    className="absolute inset-0 z-30"
                    aria-label={`Open ${p.title}`}
                  />

                  {/* Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 64vw, 50vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover/card:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-bg via-bg/80 to-transparent pointer-events-none" />
                  </div>

                  {/* Top — index + year */}
                  <div className="absolute top-5 inset-x-5 z-10 flex items-start justify-between pointer-events-none">
                    <span className="font-mono text-xs tabular-nums text-fg bg-bg/50 backdrop-blur-md px-3 py-1.5 rounded-full uppercase tracking-[0.18em]">
                      {String(idx + 1).padStart(2, "0")} /{" "}
                      {String(projects.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-fg bg-bg/50 backdrop-blur-md px-3 py-1.5 rounded-full uppercase tracking-[0.18em]">
                      {p.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 z-10 pointer-events-none">
                    {/* Meta — fades in as card centers */}
                    <div
                      className="card-meta flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-mute mb-4"
                      style={{ opacity: 0, willChange: "opacity" }}
                    >
                      <span className="text-fg">{p.role}</span>
                      <span className="h-px w-3 bg-border" />
                      <span className="truncate max-w-[60ch]">
                        {p.stack.slice(0, 4).join(" · ")}
                      </span>
                    </div>

                    <h3 className="font-display tracking-tight text-fg leading-[1.05] mb-3 text-3xl lg:text-4xl xl:text-5xl">
                      {p.title}
                    </h3>

                    <p className="text-sm lg:text-base text-fg-mute leading-relaxed max-w-md line-clamp-2 mb-5">
                      {p.description}
                    </p>

                    <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg">
                      <span className="relative">
                        View case
                        <span className="absolute -bottom-0.5 left-0 h-px w-full bg-fg origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500" />
                      </span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Outro card */}
            <div className="shrink-0 w-[42vw] flex flex-col justify-center pr-8 lg:pr-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-mute/60 mb-4">
                End of showcase
              </p>
              <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl tracking-tight text-fg leading-[1.05] mb-6">
                The full archive lives at{" "}
                <Link
                  href="/projects"
                  data-cursor="view"
                  className="italic text-accent inline-flex items-baseline gap-2 hover:underline underline-offset-[6px] decoration-1"
                >
                  /projects
                  <ArrowUpRight
                    size={28}
                    strokeWidth={1.5}
                    className="inline-block self-center"
                  />
                </Link>
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-mute">
                {String(projects.length).padStart(2, "0")} shown here · many
                more there
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM PROGRESS — sits below the stage with breathing room */}
        <footer className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 pb-8">
            <div className="flex items-center gap-4 pointer-events-auto">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-mute/60 shrink-0">
                Scroll
              </span>
              <div className="relative h-px flex-1 bg-border overflow-hidden">
                <div
                  ref={progressRef}
                  className="absolute inset-y-0 left-0 right-0 bg-fg origin-left"
                  style={{ transform: "scaleX(0)", willChange: "transform" }}
                />
              </div>
              <span className="font-mono text-[10px] tabular-nums text-fg-mute/60 shrink-0">
                {String(activeIdx + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </footer>
      </section>

      {/* Mobile fallback */}
      <div className="md:hidden">
        <MobileFallback />
      </div>
    </>
  );
}

/* Mobile fallback unchanged */
function MobileFallback() {
  return (
    <section id="work" className="relative px-5 py-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-mute mb-3 flex items-center gap-3 before:h-px before:w-8 before:bg-border">
            Selected work
          </p>
          <h2 className="font-display text-4xl tracking-tight text-fg leading-[1.04] mb-4">
            Things I&apos;ve <em className="italic text-accent">shipped</em>.
          </h2>
          <p className="text-base text-fg-mute leading-relaxed">
            A few projects from the last couple of years.
          </p>
        </header>

        <ul className="space-y-12">
          {projects.map((p, idx) => (
            <li key={p.id}>
              <Link
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                className="block group"
              >
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <span className="font-mono text-[10px] tabular-nums text-fg-mute/70 uppercase tracking-[0.18em]">
                    {String(idx + 1).padStart(2, "0")} /{" "}
                    {String(projects.length).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-fg-mute uppercase tracking-[0.18em]">
                    {p.year}
                  </span>
                </div>

                <div className="aspect-[16/10] relative overflow-hidden rounded-lg bg-bg-soft mb-4">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                <h3 className="font-display text-3xl tracking-tight text-fg leading-[1.05] mb-3">
                  {p.title}
                </h3>

                <p className="text-sm text-fg-mute leading-relaxed mb-3">
                  {p.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-mute">
                  <span className="text-fg">{p.role}</span>
                  <span className="h-px w-3 bg-border" />
                  <span>{p.stack.slice(0, 3).join(" · ")}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/projects"
            data-cursor="link"
            className="group inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.18em] text-fg"
          >
            <span className="relative">
              View archive
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
            </span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SelectedWork;
