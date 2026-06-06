"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMagnetic } from "@/lib/useMagnetic";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#testimonials", label: "Words" },
];

function useLocalTime(timeZone = "Asia/Karachi") {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () => {
      const f = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
        hour12: false,
      });
      setTime(f.format(new Date()));
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

function MagneticCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const mag = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });
  return (
    <Link
      href={href}
      ref={mag.ref}
      data-cursor="cta"
      style={mag.style}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      className={cn(
        "group/cta relative inline-flex items-center gap-1.5 h-9 pl-4 pr-3.5",
        "rounded-pill bg-accent text-accent-fg",
        "font-medium text-[13px] tracking-tight",
        "transition-all duration-300",
        "hover:brightness-110 hover:shadow-[0_8px_20px_-6px_var(--accent)]"
      )}
    >
      <span>{children}</span>
      <ArrowUpRight
        size={13}
        strokeWidth={2}
        className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
      />
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#top");
  const reduced = useReducedMotion();
  const time = useLocalTime(site.timezone);

  const linksContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const drawerLinksRef = useRef<HTMLDivElement>(null);

  // Scroll state for nav background
  useEffect(() => {
    if (reduced) return;
    const trigger = ScrollTrigger.create({
      start: 100,
      end: "max",
      onUpdate: (self) => setScrolled(self.scroll() > 100),
    });
    return () => trigger.kill();
  }, [reduced]);

  // Active section detection — one ScrollTrigger per section
  useEffect(() => {
    if (reduced) return;
    const triggers: ScrollTrigger[] = [];

    LINKS.forEach((l) => {
      const id = l.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveHref(l.href);
          },
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, [reduced]);

  // Move the indicator pill behind the active link
  const positionIndicator = useCallback(() => {
    const container = linksContainerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    const activeLink = linkRefs.current[activeHref];
    if (!activeLink) {
      indicator.style.opacity = "0";
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const x = linkRect.left - containerRect.left;
    const w = linkRect.width;

    indicator.style.transform = `translate3d(${x}px, 0, 0)`;
    indicator.style.width = `${w}px`;
    indicator.style.opacity = "1";
  }, [activeHref]);

  useEffect(() => {
    positionIndicator();
    window.addEventListener("resize", positionIndicator);
    return () => window.removeEventListener("resize", positionIndicator);
  }, [positionIndicator]);

  // Drawer lock + stagger animation
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      if (!reduced && drawerLinksRef.current) {
        gsap.fromTo(
          drawerLinksRef.current.querySelectorAll("[data-drawer-item]"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.06,
            delay: 0.1,
          }
        );
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, reduced]);

  return (
    <>
      <header
        className={cn(
          "fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50",
          "transition-all duration-500"
        )}
      >
        <nav
          className={cn(
            "flex items-center gap-1 sm:gap-2",
            "h-12 sm:h-14 pl-2 pr-1 sm:pl-3 sm:pr-1.5",
            "rounded-pill border border-border",
            "backdrop-blur-xl backdrop-saturate-150",
            "transition-all duration-500"
          )}
          style={{
            background: scrolled
              ? "color-mix(in srgb, var(--bg) 75%, transparent)"
              : "color-mix(in srgb, var(--bg) 40%, transparent)",
            boxShadow: scrolled
              ? "0 8px 24px -8px rgba(0,0,0,0.3)"
              : "0 0 0 transparent",
          }}
        >
          {/* Logo + live indicator pill */}
          <Link
            href="#top"
            data-cursor="link"
            className="group/logo flex items-center gap-2.5 pl-2 pr-3 sm:pl-3 sm:pr-4 h-full"
          >
            {/* Live status dot — only shown on sm+ */}
            <span className="font-display text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300 group-hover/logo:text-accent">
              {site.shortName}
            </span>
          </Link>

          {/* Divider — visible only on desktop */}
          <span aria-hidden className="hidden md:block h-5 w-px bg-border/60" />

          {/* Links + sliding indicator */}
          <div
            ref={linksContainerRef}
            className="hidden md:flex relative items-center gap-0 px-1"
          >
            {/* Sliding indicator pill behind active link */}
            <div
              ref={indicatorRef}
              aria-hidden
              className={cn(
                "absolute top-1/2 left-0 -translate-y-1/2 h-7 rounded-pill",
                "bg-fg/10 opacity-0",
                "transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              )}
              style={{ width: "0px", willChange: "transform, width" }}
            />

            {LINKS.map((l) => {
              const isActive = activeHref === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  ref={(el) => {
                    linkRefs.current[l.href] = el;
                  }}
                  data-cursor="link"
                  className={cn(
                    "relative z-10 font-mono text-[11px] uppercase tracking-[0.16em]",
                    "px-3 py-1.5 transition-colors duration-300",
                    isActive ? "text-fg" : "text-fg-mute hover:text-fg"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Right side — time + CTA */}
          <div className="hidden md:flex items-center gap-3 ml-1 sm:ml-2">
            {/* Live time — tiny, monospace */}
            <span
              aria-hidden
              className="font-mono text-[10px] tabular-nums uppercase tracking-[0.16em] text-fg-mute/70 pr-1 hidden lg:block"
            >
              {time || "--:--"}
            </span>
            <MagneticCta href="#contact">Get in touch</MagneticCta>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((s) => !s)}
            className={cn(
              "md:hidden ml-1 w-9 h-9 rounded-pill",
              "flex items-center justify-center",
              "border border-border bg-bg/40 text-fg",
              "hover:border-fg-mute transition-all duration-300"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-cursor="cta"
          >
            <span className="relative w-4 h-4">
              <Menu
                size={16}
                strokeWidth={1.75}
                className={cn(
                  "absolute inset-0 transition-all duration-300",
                  open
                    ? "opacity-0 rotate-90 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                )}
              />
              <X
                size={16}
                strokeWidth={1.75}
                className={cn(
                  "absolute inset-0 transition-all duration-300",
                  open
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40",
          "transition-all duration-500 ease-out",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-bg/95 backdrop-blur-2xl",
            "transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />

        {/* Content */}
        <div
          ref={drawerLinksRef}
          className="relative h-full flex flex-col px-6 pt-28 pb-12"
        >
          {/* Eyebrow */}
          <p
            data-drawer-item
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-mute/60 mb-8 flex items-center gap-3 before:h-px before:w-8 before:bg-border"
          >
            Menu
          </p>

          {/* Links */}
          <nav className="flex-1 flex flex-col gap-1">
            {LINKS.map((l, idx) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-cursor="view"
                data-drawer-item
                className="group/link flex items-baseline justify-between gap-4 py-3 border-b border-border/40"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs tabular-nums text-fg-mute/60">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-4xl tracking-tight text-fg leading-none">
                    {l.label}
                  </span>
                </span>
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.5}
                  className="text-fg-mute opacity-50 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-hover/link:text-accent"
                />
              </Link>
            ))}
          </nav>

          {/* Bottom — CTA + meta */}
          <div className="mt-8 space-y-6">
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              data-cursor="cta"
              data-drawer-item
              className="inline-flex items-center justify-between gap-3 w-full h-14 px-6 rounded-pill bg-accent text-accent-fg font-medium"
            >
              <span className="font-sans text-base">Get in touch</span>
              <ArrowUpRight size={18} strokeWidth={2} />
            </Link>

            <div
              data-drawer-item
              className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-fg-mute/60"
            >
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="relative inline-flex h-1.5 w-1.5 items-center justify-center"
                >
                  <span className="absolute inset-0 rounded-full border border-emerald-400/80 animate-[pulse-ring_2.4s_ease-out_infinite]" />
                  <span className="absolute inset-[2px] rounded-full bg-emerald-400" />
                </span>
                Available
              </span>
              <span className="tabular-nums">
                {time} {site.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
