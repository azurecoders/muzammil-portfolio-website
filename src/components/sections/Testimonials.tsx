"use client";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const [idx, setIdx] = useState(0);

  const go = useCallback((next: number) => {
    const n = (next + testimonials.length) % testimonials.length;
    setIdx(n);
  }, []);

  const prev = useCallback(() => go(idx - 1), [idx, go]);
  const next = useCallback(() => go(idx + 1), [idx, go]);

  // Keyboard nav when section is in view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.getElementById("testimonials");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.7 &&
        rect.bottom > window.innerHeight * 0.3;
      if (!inView) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <Section
      id="testimonials"
      eyebrow="Words"
      title={
        <>
          What people <em className="italic text-accent">say</em>.
        </>
      }
      description="A few short notes from people I've worked with."
    >
      {/* Quote stage — fixed min-height so swaps don't reflow the page */}
      <div className="relative min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]">
        {testimonials.map((t, i) => (
          <figure
            key={t.id}
            aria-hidden={i !== idx}
            className={cn(
              "absolute inset-0 flex flex-col items-start",
              "transition-opacity duration-700 ease-out",
              i === idx ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <blockquote
              className={cn(
                "font-display tracking-tight text-fg text-balance",
                "text-2xl sm:text-3xl lg:text-[2.5rem] leading-[1.2]",
                "max-w-4xl"
              )}
            >
              {t.quote}
            </blockquote>

            <figcaption className="mt-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-fg-mute">
              <span className="text-fg">{t.name}</span>
              <span className="h-px w-6 bg-border" />
              <span>
                {t.role}, {t.company}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Controls — quiet, aligned right */}
      <div
        data-reveal
        className="mt-10 sm:mt-12 flex items-center justify-between gap-6 border-t border-border pt-6"
      >
        {/* Counter + dots */}
        <div className="flex items-center gap-5">
          <span className="font-mono text-xs tabular-nums text-fg-mute">
            <span className="text-fg">{String(idx + 1).padStart(2, "0")}</span>
            <span className="mx-1.5 text-fg-mute/50">/</span>
            {String(testimonials.length).padStart(2, "0")}
          </span>

          <div className="hidden sm:flex items-center gap-1.5">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => go(i)}
                aria-label={`Testimonial ${i + 1}`}
                data-cursor="link"
                className={cn(
                  "h-1 rounded-full transition-all duration-500 ease-out",
                  i === idx ? "w-6 bg-fg" : "w-1 bg-border hover:bg-fg-mute"
                )}
              />
            ))}
          </div>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            data-cursor="link"
            aria-label="Previous"
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center",
              "text-fg-mute transition-colors duration-300",
              "hover:text-fg"
            )}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            data-cursor="link"
            aria-label="Next"
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center",
              "text-fg-mute transition-colors duration-300",
              "hover:text-fg"
            )}
          >
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </Section>
  );
}

export default Testimonials;
