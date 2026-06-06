import { Section } from "@/components/primitives/Section";
import { Marquee } from "@/components/primitives/Marquee";
import { skills } from "@/data/skills";
import { cn } from "@/lib/cn";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Stack"
      title={
        <>
          Tools I <em className="italic text-accent">reach for</em>.
        </>
      }
      description="Languages, frameworks, infra, and tools I work with day-to-day."
      containerClassName="space-y-0"
    >
      <div className="border-t border-border mt-8 sm:mt-12">
        {skills.map((cat, idx) => (
          <div
            key={cat.label}
            data-reveal
            className={cn(
              "group/row grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center",
              "border-b border-border py-8 sm:py-12 lg:py-14",
              "transition-all duration-500 hover:bg-bg-soft/40"
            )}
          >
            {/* Label column */}
            <div className="md:col-span-3 flex items-center gap-4 md:sticky md:top-24 self-start z-10">
              <span className="font-mono text-[11px] text-fg-mute/40 tabular-nums group-hover/row:text-accent transition-colors">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="h-px w-6 bg-border group-hover/row:bg-accent group-hover/row:w-8 transition-all duration-300" />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-mute group-hover/row:text-fg transition-colors">
                {cat.label}
              </p>
            </div>

            {/* Marquee column */}
            <div className="md:col-span-9 min-w-0 -mx-5 sm:-mx-8 md:mx-0">
              <Marquee
                speed={idx % 2 === 0 ? 50 : 45}
                reverse={idx % 2 === 1}
                pauseOnHover
                className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
              >
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={`${item}-${itemIdx}`}
                    className="inline-flex items-center gap-6 sm:gap-8"
                  >
                    <span
                      data-cursor="text"
                      className={cn(
                        "font-display text-3xl sm:text-4xl lg:text-[3.5rem] tracking-tight leading-none",
                        "text-fg-mute whitespace-nowrap",
                        "transition-colors duration-300 hover:text-fg cursor-default"
                      )}
                    >
                      {item}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-border shrink-0" />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Skills;
