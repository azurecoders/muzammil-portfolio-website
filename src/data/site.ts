import type { Site } from "@/types/content";

export const site: Site = {
  name: "Muzammil",
  shortName: "Muzammil",
  role: "Full-stack engineer",
  tagline: "Next.js · Node · Postgres",
  bio: "I build thoughtful, performant web products end-to-end — from system design and data modeling down to the last animation frame. I care about the small things most people skip: typography, motion, accessibility, and the seam between design and engineering.",
  location: "Karachi, PK",
  timezone: "Asia/Karachi", // valid IANA timezone
  email: "hello@muzammil.dev",
  socials: [
    {
      platform: "github",
      href: "https://github.com/muzammil",
      handle: "@muzammil",
    },
    {
      platform: "linkedin",
      href: "https://linkedin.com/in/muzammil",
      handle: "in/muzammil",
    },
    { platform: "x", href: "https://x.com/muzammil", handle: "@muzammil" },
  ],
  stats: [
    { label: "Years building", value: 5 },
    { label: "Shipped projects", value: 24 },
    { label: "Open-source", value: 12 },
    { label: "Happy clients", value: 18 },
  ],
  resumeUrl: "",
  currently:
    "Building an AI-powered analytics tool, contributing to a Next.js UI library.",
};
