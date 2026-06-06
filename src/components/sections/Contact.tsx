"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { gsap } from "gsap";
import { Section } from "@/components/primitives/Section";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Contact() {
  const emailRef = useRef<HTMLAnchorElement>(null);
  const emailWrapRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const reduced = useReducedMotion();
  const [time, setTime] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Live local time
  useEffect(() => {
    const update = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: site.timezone ?? "UTC",
      });
      setTime(formatter.format(new Date()));
    };
    update();
    const t = setInterval(update, 30_000);
    return () => clearInterval(t);
  }, []);

  // Magnetic pull + halo tracking inside the email area
  useEffect(() => {
    if (reduced) return;
    const wrap = emailWrapRef.current;
    const email = emailRef.current;
    const halo = haloRef.current;
    if (!wrap || !email || !halo) return;

    const xToEmail = gsap.quickTo(email, "x", {
      duration: 0.6,
      ease: "power3.out",
    });
    const yToEmail = gsap.quickTo(email, "y", {
      duration: 0.6,
      ease: "power3.out",
    });
    const xToHalo = gsap.quickTo(halo, "x", {
      duration: 0.3,
      ease: "power3.out",
    });
    const yToHalo = gsap.quickTo(halo, "y", {
      duration: 0.3,
      ease: "power3.out",
    });
    const opacityToHalo = gsap.quickTo(halo, "opacity", {
      duration: 0.4,
      ease: "power2.out",
    });

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      // Halo tracks cursor exactly
      xToHalo(cx);
      yToHalo(cy);

      // Email pulls ~12% toward cursor relative to its center — feels magnetic, not jumpy
      const ex = e.clientX - (rect.left + rect.width / 2);
      const ey = e.clientY - (rect.top + rect.height / 2);
      xToEmail(ex * 0.12);
      yToEmail(ey * 0.18);
    };

    const onEnter = () => opacityToHalo(1);
    const onLeave = () => {
      opacityToHalo(0);
      xToEmail(0);
      yToEmail(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  // Character stagger
  const handleEnter = () => {
    if (reduced) return;
    gsap.to(charsRef.current, {
      y: -8,
      duration: 0.5,
      ease: "power3.out",
      stagger: { each: 0.018, from: "start" },
    });
  };
  const handleLeave = () => {
    if (reduced) return;
    gsap.to(charsRef.current, {
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: { each: 0.012, from: "end" },
    });
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const emailChars = site.email.split("");

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let&apos;s build <em className="italic text-accent">something</em>.
        </>
      }
      description="Open to senior full-stack roles, advisory, and conversations about craft."
    >
      {/* Editorial status line — reads like a sentence, not a badge */}
      <p
        data-reveal
        className="mb-14 sm:mb-20 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-fg-mute flex flex-wrap items-center gap-x-3 gap-y-2"
      >
        {/* Animated indicator — concentric pulse, not a generic ping dot */}
        <span
          aria-hidden
          className="relative inline-flex h-2.5 w-2.5 items-center justify-center shrink-0"
        >
          <span className="absolute inset-0 rounded-full border border-emerald-400/80 animate-[pulse-ring_2.4s_ease-out_infinite]" />
          <span className="absolute inset-[3px] rounded-full bg-emerald-400" />
        </span>

        <span className="text-fg">Currently taking on work</span>
        <span className="text-fg-mute/40">—</span>
        <span>
          writing this from{" "}
          <span className="text-fg">{site.location ?? "remote"}</span>
        </span>
        <span className="text-fg-mute/40">·</span>
        <span className="tabular-nums">
          <span className="text-fg">{time || "--:--"}</span> local
        </span>
        <span className="text-fg-mute/40">·</span>
        <span>replies within 24h</span>
      </p>

      {/* Mega email with magnetic field */}
      <div
        ref={emailWrapRef}
        className="relative"
        // Padding extends the magnetic hover area beyond the text itself
        style={{ padding: "1rem 0" }}
      >
        {/* Cursor-following halo — sits behind the text */}
        <div
          ref={haloRef}
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="h-[300px] w-[300px] rounded-full bg-accent/20 blur-[80px]" />
        </div>

        <div data-reveal>
          <a
            ref={emailRef}
            href={`mailto:${site.email}`}
            data-cursor="cta"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            aria-label={`Email ${site.email}`}
            className={cn(
              "relative inline-flex flex-wrap items-baseline",
              "font-display tracking-tight leading-[1.05]",
              "text-[clamp(1.5rem,7vw,6rem)]",
              "text-fg transition-colors duration-500",
              "hover:text-accent",
              "break-all will-change-transform",
            )}
          >
            {emailChars.map((ch, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) charsRef.current[i] = el;
                }}
                className="inline-block will-change-transform"
                aria-hidden
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
            <span className="sr-only">{site.email}</span>
          </a>
        </div>

        {/* Copy affordance */}
        <div data-reveal className="mt-8 flex items-center gap-3 relative">
          <button
            onClick={handleCopy}
            data-cursor="link"
            aria-label="Copy email address"
            className={cn(
              "inline-flex items-center gap-2.5",
              "rounded-full border border-border px-4 py-2",
              "font-mono text-[11px] uppercase tracking-[0.18em] text-fg-mute",
              "transition-all duration-300",
              "hover:border-fg hover:text-fg",
            )}
          >
            {copied ? (
              <>
                <Check size={13} strokeWidth={1.75} className="text-accent" />
                <span className="text-accent">Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy size={13} strokeWidth={1.75} />
                <span>Copy</span>
              </>
            )}
          </button>
          <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.18em] text-fg-mute/50">
            or tap above to compose
          </span>
        </div>
      </div>

      {/* Socials + meta footer */}
      <div
        data-reveal
        className="mt-20 sm:mt-28 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-mute/60 mb-4">
            Elsewhere
          </p>
          <ul className="space-y-2.5">
            {site.socials.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group/social inline-flex items-center gap-3 font-sans text-base text-fg"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-mute w-20 shrink-0">
                    {s.platform}
                  </span>
                  <span className="relative">
                    {s.handle}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-fg transition-transform duration-500 group-hover/social:origin-left group-hover/social:scale-x-100" />
                  </span>
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.75}
                    className="text-fg-mute opacity-0 -translate-x-1 transition-all duration-300 group-hover/social:opacity-100 group-hover/social:translate-x-0"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-mute/60 mb-4">
            Best for
          </p>
          <p className="font-sans text-base text-fg leading-relaxed">
            Senior product work, design-engineering roles, and{" "}
            <span className="text-accent">interesting</span> advisory.
          </p>
        </div>
      </div>
    </Section>
  );
}

export default Contact;
