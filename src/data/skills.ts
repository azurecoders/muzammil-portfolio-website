import type { SkillCategory } from "@/types/content";

export const skills: SkillCategory[] = [
  {
    label: "LANGUAGES",
    items: ["TypeScript", "JavaScript", "Python", "Go", "SQL"],
  },
  {
    label: "FRAMEWORKS",
    items: ["Next.js", "React", "Node.js", "Express", "Hono", "tRPC"],
  },
  {
    label: "INFRA & DATA",
    items: ["PostgreSQL", "Prisma", "Redis", "AWS", "Vercel", "Docker"],
  },
  {
    label: "TOOLS",
    items: ["Figma", "Linear", "Git", "Vim", "pnpm", "Tailwind"],
  },
];
