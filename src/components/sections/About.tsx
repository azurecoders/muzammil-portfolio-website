import { Section } from "@/components/primitives/Section";
import { CountUp } from "@/components/primitives/CountUp";
import { site } from "@/data/site";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          A bit <em className="italic text-accent">about</em> me.
        </>
      }
      description={site.bio}
      containerClassName="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
    >
      <div className="lg:col-span-5 lg:order-2 space-y-4">
        {site.stats.map((stat) => (
          <div
            key={stat.label}
            data-reveal
            className="border-t border-border pt-6 flex items-baseline justify-between gap-4"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-fg-mute">
              {stat.label}
            </span>
            <span className="font-display text-4xl sm:text-5xl tracking-tight text-fg">
              <CountUp to={stat.value} />
              {stat.suffix ?? ""}
            </span>
          </div>
        ))}
      </div>

      <div className="lg:col-span-7 lg:order-1">
        <p
          data-reveal
          className="font-display text-2xl sm:text-3xl lg:text-4xl leading-snug text-fg"
        >
          I care about the small things most people skip —{" "}
          <em className="italic text-fg-mute">
            typography, motion, accessibility
          </em>
          , and the seam between design and engineering.
        </p>
        <p
          data-reveal
          className="mt-8 font-mono text-sm text-fg-mute border-l border-border pl-4"
        >
          Currently — {site.currently}
        </p>
      </div>
    </Section>
  );
}

export default About;
