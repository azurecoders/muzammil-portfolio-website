import { experienceData } from "@/data/experience";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);

    // Trigger sequential animations for experience items
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval: ReturnType<typeof setInterval> = setInterval(() => {
        if (currentIndex >= 3) {
          clearInterval(interval);
          setAnimationComplete(true);
          return;
        }
        setActiveIndex(currentIndex);
        currentIndex += 1;
      }, 300);

      return () => clearInterval(interval);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="w-full bg-secondary text-foreground py-12 sm:py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header with Animation */}
        <div
          className={`space-y-4 sm:space-y-6 mb-10 sm:mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Service Label */}
          <div className="flex items-center gap-2 justify-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-primary/10 rounded-full shadow-sm">
              <Sparkles size={16} className="text-primary animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-primary tracking-wider uppercase">
                {experienceData.label}
              </span>
            </div>
          </div>

          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            {experienceData.headings.headingNormal}{" "}
            <span className="text-primary relative">
              {experienceData.headings.headingHighlighted}
              <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6 sm:space-y-8 w-full max-w-4xl mx-auto mb-12 sm:mb-16">
          {experienceData &&
            experienceData.experiences &&
            experienceData.experiences.map((exp, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 sm:gap-0 border-b border-neutral-700/70 pb-6 transition-all duration-700 cursor-pointer ${
                  animationComplete
                    ? "opacity-100 translate-x-0"
                    : activeIndex !== null && index <= activeIndex
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                } ${
                  hoveredIndex === index
                    ? "rounded-lg transform scale-100 sm:scale-105"
                    : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`px-3 sm:px-4 py-1 sm:py-2 bg-primary/5 rounded-lg border border-primary/10 transition-colors duration-300 ${
                    hoveredIndex === index
                      ? "bg-primary/20 border-primary/30"
                      : ""
                  }`}
                >
                  <p className="font-semibold text-base sm:text-lg text-primary">
                    {exp.year}
                  </p>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold">
                  {exp.position}
                </h4>
                <h5
                  className={`text-base sm:text-lg font-medium px-3 sm:px-4 py-1 sm:py-2 bg-neutral-800/50 rounded-md transition-colors duration-300 ${
                    hoveredIndex === index ? "bg-primary/20 text-primary" : ""
                  }`}
                >
                  {exp.company}
                </h5>
              </div>
            ))}
        </div>

        {/* Skills Section */}
        <div
          className={`w-full border border-neutral-700/80 p-4 sm:p-6 rounded-xl grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 my-8 sm:my-12 bg-neutral-900/30 backdrop-blur-sm shadow-lg transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {experienceData &&
            experienceData.skills &&
            experienceData.skills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 sm:gap-4 text-center p-3 sm:p-4 rounded-lg hover:bg-neutral-800/50 transition-all duration-300"
              >
                <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
                  <Image
                    src={skill.icon}
                    alt={`${skill.name}-icon`}
                    width={100}
                    height={100}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  />
                </div>

                <div className="w-full">
                  <div className="mb-2 w-full bg-neutral-800 rounded-full h-2 sm:h-2.5">
                    <div
                      className="bg-primary h-2 sm:h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: skill.percentage }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <h3 className="text-lg sm:text-xl text-primary font-bold">
                      {skill.percentage}
                    </h3>
                    <h4 className="text-base sm:text-lg font-medium">
                      {skill.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
