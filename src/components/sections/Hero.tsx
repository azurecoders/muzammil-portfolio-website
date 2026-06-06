"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";
import { LinkButton } from "@/components/primitives/Button";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useLocalTime(timeZone = "Asia/Karachi") {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () => {
      const f = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone,
        hour12: false,
      });
      setTime(f.format(new Date()));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

function SplitChars({
  text,
  className,
  delay = 0,
  charClassName,
}: {
  text: string;
  className?: string;
  delay?: number;
  charClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const chars = ref.current.querySelectorAll("[data-char]");
    gsap.fromTo(
      chars,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        stagger: { each: 0.025, from: "start" },
        delay,
      }
    );
  }, [delay, reduced, text]);

  return (
    <span ref={ref} className={cn("inline-block", className)} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top"
          aria-hidden
        >
          <span
            data-char
            className={cn("inline-block will-change-transform", charClassName)}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

function AmbientBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-bg" />

      {/* Accent orb — top right. Opacity reduced in light mode via mix-blend-multiply */}
      <div
        className={cn(
          "absolute top-[-30%] right-[-15%]",
          "w-[80vw] h-[80vw] max-w-[1100px] max-h-[1100px]",
          "rounded-full blur-[140px]",
          // Dark mode: glow with screen blend. Light mode: tint with multiply blend.
          "opacity-[0.18] mix-blend-screen",
          "dark:opacity-[0.18]",
          "[html[data-theme=light]_&]:opacity-[0.12] [html[data-theme=light]_&]:mix-blend-multiply"
        )}
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
        }}
      />

      {/* FG orb — bottom left. In light mode it becomes a warm shadow zone */}
      <div
        className={cn(
          "absolute bottom-[-40%] left-[-10%]",
          "w-[70vw] h-[70vw] max-w-[900px] max-h-[900px]",
          "rounded-full blur-[140px]",
          "opacity-[0.08] mix-blend-screen",
          "[html[data-theme=light]_&]:opacity-[0.04] [html[data-theme=light]_&]:mix-blend-multiply"
        )}
        style={{
          background: "radial-gradient(circle, var(--fg) 0%, transparent 65%)",
        }}
      />

      {/* Grid — extra subtle in light mode (less contrast available) */}
      <div
        className="absolute inset-0 opacity-[0.025] [html[data-theme=light]_&]:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const time = useLocalTime(site.timezone);

  useEffect(() => {
    if (reduced || !heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(headlineRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to("[data-hero-fade]", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "60% top",
          scrub: 0.6,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-reveal]",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  const [firstName, ...rest] = site.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="top"
      ref={heroRef}
      // h-dvh forces a single viewport; overflow-hidden clips any stray
      className="relative h-dvh min-h-[640px] w-full overflow-hidden"
    >
      <AmbientBackdrop />

      {/* Tighter padding — was pt-28→36 / pb-20, now pt-24→28 / pb-12→16 */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-12 sm:pb-16">
        {/* Eyebrow */}
        <div
          data-hero-reveal
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute"
        >
          <span className="h-px w-8 bg-border" />
          <span>Portfolio</span>
          <span className="text-fg-mute/40">·</span>
          <span className="tabular-nums">
            {new Date().getFullYear()} edition
          </span>
        </div>

        {/* MAIN BLOCK — no longer stretches to fill; uses natural height + auto margin */}
        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-12 gap-x-6 lg:gap-x-10 items-end">
          {/* Headline column */}
          <div
            ref={headlineRef}
            className="col-span-12 lg:col-span-9 will-change-transform"
          >
            <h1
              aria-label={`${site.name}. ${site.role}`}
              className={cn(
                "font-display tracking-[-0.04em] leading-[0.85]",
                // Slightly tighter clamp to fit single viewport on shorter laptops
                "text-[clamp(3rem,11.5vw,9.5rem)]"
              )}
            >
              <span className="block text-fg">
                <SplitChars text={firstName} />
              </span>
              <span
                className={cn(
                  "block italic text-transparent",
                  "[-webkit-text-stroke:1px_var(--fg-mute)]"
                )}
              >
                <SplitChars text={lastName} delay={0.15} />
              </span>

              {/* Tightened gap — was mt-6 sm:mt-8, now mt-3 sm:mt-4 */}
              <span
                data-hero-reveal
                className="mt-3 sm:mt-4 block font-sans not-italic text-base sm:text-lg lg:text-xl tracking-normal leading-snug text-fg-mute max-w-xl"
              >
                <span className="text-fg">{site.role}</span> building products
                that feel as good as they perform — Next.js, Node, Postgres,
                end-to-end.
              </span>
            </h1>
          </div>

          {/* Rail */}
          <aside
            data-hero-fade
            className="hidden lg:flex col-span-3 flex-col items-end gap-6 self-end pb-2"
          >
            <div data-hero-reveal className="flex flex-col items-end gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-mute/60">
                Status
              </span>
              <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-fg">
                <span
                  aria-hidden
                  className="relative inline-flex h-2 w-2 items-center justify-center"
                >
                  <span className="absolute inset-0 rounded-full border border-emerald-400/80 animate-[pulse-ring_2.4s_ease-out_infinite]" />
                  <span className="absolute inset-[3px] rounded-full bg-emerald-400" />
                </span>
                Available · Now
              </span>
            </div>

            <div data-hero-reveal className="flex flex-col items-end gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-mute/60">
                Based in
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-fg">
                {site.location}
              </span>
              <span className="font-mono text-xs tabular-nums text-fg-mute">
                {time || "00:00:00"}
              </span>
            </div>

            <div data-hero-reveal className="flex flex-col items-end gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-mute/60">
                Now
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-fg text-right max-w-[14rem]">
                {site.currently.split(",")[0]}
              </span>
            </div>
          </aside>
        </div>

        {/* BOTTOM ROW — pushed to the bottom via mt-auto, replaces the old flex-1 trick */}
        <div className="mt-auto flex flex-col gap-5 sm:gap-6">
          <div
            data-hero-reveal
            className="flex lg:hidden flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-mute"
          >
            <span className="inline-flex items-center gap-2 text-fg">
              <span
                aria-hidden
                className="relative inline-flex h-1.5 w-1.5 items-center justify-center"
              >
                <span className="absolute inset-0 rounded-full border border-emerald-400/80 animate-[pulse-ring_2.4s_ease-out_infinite]" />
                <span className="absolute inset-[2px] rounded-full bg-emerald-400" />
              </span>
              Available · Q4
            </span>
            <span className="text-fg-mute/40">·</span>
            <span>{site.location}</span>
            <span className="text-fg-mute/40">·</span>
            <span className="tabular-nums">{time}</span>
          </div>

          <div
            data-hero-reveal
            className="flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <LinkButton href="#work" variant="primary" size="lg" arrow>
              See the work
            </LinkButton>

            <a
              href={`mailto:${site.email}`}
              data-cursor="link"
              className="group/email inline-flex items-center gap-3"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute/60">
                Or write
              </span>
              <span className="relative font-sans text-base text-fg">
                {site.email}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-fg transition-transform duration-500 group-hover/email:origin-left group-hover/email:scale-x-100" />
              </span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.75}
                className="text-fg-mute transition-transform duration-300 group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5 group-hover/email:text-fg"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator — repositioned slightly higher so it doesn't overlap CTAs on short screens */}
      <button
        data-hero-fade
        onClick={() =>
          document
            .querySelector("#work")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll to work"
        className="group absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-fg-mute/60 transition-colors group-hover:text-fg">
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-border/40">
          <span className="absolute inset-x-0 top-0 h-1/3 bg-fg animate-[scroll-line_2s_ease-in-out_infinite]" />
        </span>
      </button>
    </section>
  );
}

export default Hero;
