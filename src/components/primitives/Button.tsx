"use client";
import { forwardRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/lib/useMagnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

const baseStyles =
  "relative inline-flex items-center justify-center gap-2 font-medium rounded-pill transition-colors duration-300 cursor-pointer";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg hover:brightness-110 shadow-[0_0_0_1px_var(--accent),0_8px_24px_rgba(198,255,61,0.25)]",
  secondary:
    "bg-transparent text-fg border border-border hover:border-accent hover:text-accent",
  ghost:
    "bg-transparent text-fg-mute hover:text-fg",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

function classes(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", arrow, className, children, ...props },
  ref
) {
  const mag = useMagnetic<HTMLButtonElement>({ strength: 0.25 });
  return (
    <button
      ref={(node) => {
        mag.ref(node);
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      data-cursor="cta"
      className={classes(variant, size, className)}
      style={mag.style}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      {...props}
    >
      {children}
      {arrow && <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </button>
  );
});

export function LinkButton({
  variant = "primary",
  size = "md",
  arrow,
  className,
  children,
  href,
  external,
  ...rest
}: LinkProps) {
  const mag = useMagnetic<HTMLAnchorElement>({ strength: 0.25 });
  const isExternal = external ?? href.startsWith("http");
  const Component = isExternal ? "a" : Link;
  const extraProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Component
      href={href}
      ref={mag.ref}
      data-cursor="cta"
      className={classes(variant, size, className)}
      style={mag.style}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
      {...extraProps}
      {...rest}
    >
      {children}
      {arrow && <ArrowUpRight size={16} />}
    </Component>
  );
}
