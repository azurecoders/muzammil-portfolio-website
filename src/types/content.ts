export type Project = {
  id: string;
  title: string;
  role: string;
  year: string;
  description: string;
  stack: string[];
  href: string;
  image: string;
  span: "lg" | "md" | "sm" | "wide";
  featured?: boolean;
};

export type SkillCategory = {
  label: string;
  items: string[];
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type Social = {
  platform: "github" | "linkedin" | "x" | "email";
  href: string;
  handle: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

export type Site = {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  socials: Social[];
  stats: Stat[];
  resumeUrl: string;
  currently: string;
  timezone: string;
};
