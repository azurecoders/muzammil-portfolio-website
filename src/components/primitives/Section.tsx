"use client";
import { useRef, useEffect, useId } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
  as?: "section" | "div" | "article" | "footer";
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

export function Section({
  id,
  className,
  containerClassName,
  children,
  as: Tag = "section",
  eyebrow,
  title,
  description,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const reactId = useId();
  const titleId = `${reactId}-title`;

  useEffect(() => {
    if (!ref.current || reduced) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(
        "[data-reveal]",
        ref.current
      );
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      id={id}
      aria-labelledby={title ? titleId : undefined}
      className={cn(
        "relative w-full overflow-x-clip",
        "px-5 sm:px-8 lg:px-12",
        "py-24 sm:py-32 lg:py-40",
        className
      )}
    >
      {/* Inner container — full width up to max, min-w-0 prevents grid overflow */}
      <div
        className={cn("mx-auto w-full min-w-0 max-w-7xl", containerClassName)}
      >
        {(eyebrow || title || description) && (
          <header className="mb-14 sm:mb-20 lg:mb-24 col-span-full">
            <div className="max-w-3xl">
              {eyebrow && (
                <p
                  data-reveal
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-mute mb-5 flex items-center gap-3 before:h-px before:w-8 before:bg-border"
                >
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2
                  id={titleId}
                  data-reveal
                  className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-fg leading-[1.04] text-balance"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  data-reveal
                  className="mt-6 text-base sm:text-lg text-fg-mute leading-relaxed max-w-2xl text-pretty"
                >
                  {description}
                </p>
              )}
            </div>
          </header>
        )}
        {children}
      </div>
    </Tag>
  );
}
