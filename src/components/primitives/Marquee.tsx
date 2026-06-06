"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number; // pixels per second, default 50
  reverse?: boolean;
  pauseOnHover?: boolean;
};

export function Marquee({
  children,
  className,
  speed = 50,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    let raf: number;
    let pos = 0;
    let paused = false;

    const onEnter = () => {
      if (pauseOnHover) paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    const tick = () => {
      if (!paused) {
        pos += (reverse ? -1 : 1) * (speed / 60); // 60fps normalized
      }

      // Get the width of one set of items (first child)
      const firstChild = inner.firstElementChild as HTMLElement;
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth;

        // Seamlessly loop by resetting position when one full set has scrolled
        if (reverse) {
          if (pos <= -itemWidth) {
            pos += itemWidth;
          }
        } else {
          if (pos >= itemWidth) {
            pos -= itemWidth;
          }
        }
      }

      inner.style.transform = `translateX(${-pos}px)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [speed, reverse, pauseOnHover, reduced]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full", className)}
      aria-hidden={reduced ? undefined : "true"}
    >
      <div ref={innerRef} className="flex w-max will-change-transform">
        {/* Render multiple copies for seamless infinite scroll */}
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}
