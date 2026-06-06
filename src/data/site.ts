import type { Site } from "@/types/content";

export const site: Site = {
  name: "Muzammil Ahmed Khan",
  shortName: "Muzammil",
  role: "Full-stack developer",
  tagline: "React · Node · Next.js",
  bio: "I build full-stack web apps with React, Node, and Next.js. I run them on a VPS I manage with Docker, and I'm in my first year of college. I like building things I can actually use.",
  location: "Karachi, PK",
  email: "muzammilakdev@gmail.com",
  socials: [
    {
      platform: "github",
      href: "https://github.com/azurecoders",
      handle: "azurecoders",
    },
    {
      platform: "linkedin",
      href: "https://www.linkedin.com/in/muzammil-ahmed-96ab09396/",
      handle: "muzammil-ahmed-96ab09396",
    },
  ],
  stats: [
    { label: "Years writing code", value: 7 },
    { label: "Projects shipped", value: 20, suffix: "+" },
    { label: "Years on Next.js", value: 4 },
    { label: "Technologies", value: 15, suffix: "+" },
  ],
  resumeUrl: "",
  currently: "Building on the web from Karachi.",
  timezone: "Asia/Karachi",
};
