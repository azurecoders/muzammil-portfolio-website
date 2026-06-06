import { site } from "@/data/site";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Copyright } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-fg-mute">
          <Copyright size={12} className="text-accent" />
          <span>{year}</span>
          <span className="text-fg">{site.name}</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs uppercase tracking-wider text-fg-mute">
          <span>Built with Next.js · Three.js · GSAP</span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
