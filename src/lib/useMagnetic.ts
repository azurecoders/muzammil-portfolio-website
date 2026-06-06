"use client";
import { useRef, useState, useCallback, MouseEvent } from "react";
import { useReducedMotion } from "./useReducedMotion";

type MagneticOptions = {
  strength?: number; // 0..1, default 0.2
  radius?: number; // px, default 60
};

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  options: MagneticOptions = {}
) {
  const { strength = 0.2, radius = 60 } = options;
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const [transform, setTransform] = useState("translate(0px, 0px)");

  const handleMouseMove = useCallback(
    (e: MouseEvent<T>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > radius) {
        setTransform("translate(0px, 0px)");
        return;
      }
      const factor = 1 - distance / radius;
      setTransform(`translate(${dx * strength * factor}px, ${dy * strength * factor}px)`);
    },
    [reduced, strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("translate(0px, 0px)");
  }, []);

  return {
    ref: (node: T | null) => {
      ref.current = node;
    },
    style: { transform, transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
