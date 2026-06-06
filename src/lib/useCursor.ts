"use client";
import { useEffect } from "react";

type CursorState = "link" | "cta" | "drag" | "text" | null;

export function useCursor(state: CursorState) {
  useEffect(() => {
    if (!state) return;
    document.documentElement.dataset.cursor = state;
    return () => {
      delete document.documentElement.dataset.cursor;
    };
  }, [state]);
}
