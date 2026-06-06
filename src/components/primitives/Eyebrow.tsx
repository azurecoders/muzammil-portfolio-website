import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      data-reveal
      className={cn(
        "font-mono text-xs uppercase tracking-wider text-fg-mute",
        className
      )}
    >
      {children}
    </p>
  );
}
