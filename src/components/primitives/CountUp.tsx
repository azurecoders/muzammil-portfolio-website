"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CountUpProps = {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
};

export function CountUp({
  to,
  duration = 1.6,
  className,
  suffix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(to);
      return;
    }
    if (!ref.current) return;
    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: to,
          duration,
          ease: "power2.out",
          onUpdate: () => setDisplay(Math.floor(obj.val)),
          onComplete: () => setDisplay(to),
        });
      },
    });
    return () => trigger.kill();
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
