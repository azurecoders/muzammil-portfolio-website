import { serviceData } from "@/data/service";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const Service = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="services"
      className="w-full bg-secondary text-foreground py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Animation */}
        <div
          className={`space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Service Label */}
          <div className="flex items-center gap-2 justify-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full">
              <Sparkles size={16} className="text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary tracking-wide uppercase">
                {serviceData.label}
              </span>
            </div>
          </div>

          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            {serviceData.headings.headingsPart1}
            <span className="text-primary">
              {serviceData.headings.headingsPart2}
            </span>{" "}
            {serviceData.headings.headingsPart3}
          </h2>

          {/* Section Description */}
          <p className="text-base sm:text-lg text-center max-w-2xl mx-auto text-gray-300">
            {serviceData.description}
          </p>
        </div>

        {/* Service Cards with Animation */}
        <div className="space-y-4 sm:space-y-6">
          {serviceData.services &&
            serviceData.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                  className={`group relative border border-neutral-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8
                transition-all duration-500 hover:border-primary/60 hover:bg-neutral-800/30 cursor-pointer
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }
              `}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Before overlay for hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                    {/* Service Number and Title */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 lg:gap-10">
                      <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-800 group-hover:bg-primary/20 transition-colors duration-300">
                        <p className="font-semibold text-xl sm:text-2xl text-primary">
                          {service.number}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                        <div className="p-2 rounded-lg bg-neutral-800 group-hover:bg-primary/10 transition-colors duration-300">
                          <Icon size={24} className="text-primary" />
                        </div>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold">
                          {service.title}
                        </h4>
                      </div>
                    </div>

                    {/* Service Description */}
                    <div className="mt-3 sm:mt-4 lg:mt-0 lg:max-w-xl">
                      <p className="text-sm sm:text-base md:text-lg text-gray-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Service;
