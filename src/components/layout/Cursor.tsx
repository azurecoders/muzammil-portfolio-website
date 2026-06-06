"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type StateKey = "default" | "link" | "cta" | "text" | "drag" | "media" | "view";

type StateConfig = {
  label?: string;
  ring: string;
  dot: string;
  showLabel: boolean;
};

const STATE_CONFIGS: Record<StateKey, StateConfig> = {
  default: {
    ring: "w-9 h-9 border-fg/40 bg-transparent",
    dot: "w-1 h-1 bg-fg opacity-100",
    showLabel: false,
  },
  link: {
    ring: "w-12 h-12 border-fg/0 bg-fg/15 backdrop-blur-[2px]",
    dot: "w-1.5 h-1.5 bg-fg opacity-100",
    showLabel: false,
  },
  cta: {
    label: "Click",
    ring: "w-20 h-20 border-accent/0 bg-accent/90 backdrop-blur-0",
    dot: "opacity-0",
    showLabel: true,
  },
  view: {
    label: "View",
    ring: "w-16 h-16 border-fg/0 bg-fg/95",
    dot: "opacity-0",
    showLabel: true,
  },
  media: {
    label: "Open",
    ring: "w-20 h-20 border-fg/0 bg-fg/95",
    dot: "opacity-0",
    showLabel: true,
  },
  text: {
    ring: "w-[2px] h-7 rounded-[1px] border-accent/0 bg-accent",
    dot: "opacity-0",
    showLabel: false,
  },
  drag: {
    label: "Drag",
    ring: "w-24 h-12 border-fg/0 bg-fg/90",
    dot: "opacity-0",
    showLabel: true,
  },
};

/* Detect current theme by reading the data attribute or class on <html> */
function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    const read = (): "dark" | "light" => {
      const attr = root.getAttribute("data-theme");
      if (attr === "light" || attr === "dark") return attr;
      if (root.classList.contains("light")) return "light";
      if (root.classList.contains("dark")) return "dark";
      // Fallback to media query
      return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    };

    setTheme(read());

    // Observe theme changes via attribute/class mutations on <html>
    const observer = new MutationObserver(() => setTheme(read()));
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const reduced = useReducedMotion();
  const theme = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<StateKey>("default");

  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const lastMouse = useRef({ x: -200, y: -200, t: performance.now() });
  const velocity = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const idleSince = useRef(performance.now());
  const pressed = useRef(false);
  const pressScale = useRef(1);
  const rafId = useRef<number | null>(null);

  // Detect fine-pointer device
  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduced]);

  useEffect(() => {
    if (!enabled || reduced) return;
    const ringEl = ringRef.current;
    const dotEl = dotRef.current;
    if (!ringEl || !dotEl) return;

    const SMOOTHING = 0.2;
    const IDLE_MS = 4000;

    const setVisibility = (v: boolean) => {
      if (visible.current === v) return;
      visible.current = v;
      ringEl.style.opacity = v ? "1" : "0";
      dotEl.style.opacity = v ? "1" : "0";
    };

    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const now = performance.now();
      const dt = Math.max(1, now - lastMouse.current.t);
      velocity.current.x = (e.clientX - lastMouse.current.x) / dt;
      velocity.current.y = (e.clientY - lastMouse.current.y) / dt;
      lastMouse.current = { x: e.clientX, y: e.clientY, t: now };

      idleSince.current = now;
      setVisibility(true);
    };

    const onLeave = () => setVisibility(false);
    const onEnter = () => setVisibility(true);
    const onDown = () => {
      pressed.current = true;
    };
    const onUp = () => {
      pressed.current = false;
    };

    let lastState: StateKey = "default";
    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      const next =
        (target?.getAttribute("data-cursor") as StateKey) ?? "default";
      if (next !== lastState) {
        lastState = next;
        setState(next in STATE_CONFIGS ? next : "default");
      }
    };

    const tick = () => {
      dotEl.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;

      ring.current.x += (mouse.current.x - ring.current.x) * SMOOTHING;
      ring.current.y += (mouse.current.y - ring.current.y) * SMOOTHING;

      const vx = velocity.current.x;
      const vy = velocity.current.y;
      const speed = Math.min(2.5, Math.hypot(vx, vy));
      const angle = Math.atan2(vy, vx);
      const skew = speed * 4;
      velocity.current.x *= 0.85;
      velocity.current.y *= 0.85;

      const targetScale = pressed.current ? 0.88 : 1;
      pressScale.current += (targetScale - pressScale.current) * 0.25;

      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) rotate(${angle}rad) skewX(${skew}deg) scale(${pressScale.current})`;
      ringEl.style.setProperty("--cursor-angle", `${-angle}rad`);

      if (performance.now() - idleSince.current > IDLE_MS) {
        setVisibility(false);
      }

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, reduced]);

  useEffect(() => {
    if (!enabled || reduced) return;
    const original = document.documentElement.style.cursor;
    document.documentElement.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = original;
    };
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;

  const config = STATE_CONFIGS[state];

  /* The key fix: blend mode swaps per theme.
     - Dark theme: mix-blend-difference makes light cursor invert dark bg → light shows
     - Light theme: mix-blend-multiply makes dark cursor darken light bg → dark shows
     Both result in a high-contrast cursor that adapts to whatever it's hovering. */
  const blendMode = theme === "light" ? "multiply" : "difference";

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          transform: "translate3d(-200px, -200px, 0) translate(-50%, -50%)",
          mixBlendMode: blendMode,
          willChange:
            "transform, opacity, width, height, background-color, border-color",
        }}
        className={[
          "pointer-events-none fixed top-0 left-0 z-[9998]",
          "rounded-full border opacity-0",
          "flex items-center justify-center",
          "transition-[width,height,background-color,border-color,border-radius,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          config.ring,
        ].join(" ")}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          transform: "translate3d(-200px, -200px, 0) translate(-50%, -50%)",
          mixBlendMode: blendMode,
          willChange: "transform, opacity, width, height",
        }}
        className={[
          "pointer-events-none fixed top-0 left-0 z-[9999]",
          "rounded-full opacity-0",
          "transition-[width,height,background-color,opacity] duration-300 ease-out",
          config.dot,
        ].join(" ")}
      />
    </>
  );
}
