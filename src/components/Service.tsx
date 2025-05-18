import {
  ArrowUpRight,
  Sparkles,
  Smartphone,
  Globe,
  Code,
  PenTool,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const Service = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  interface ServiceType {
    id: number | null;
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }

  // Service data with proper content and icons
  const services: ServiceType[] = [
    {
      id: 1,
      number: "01",
      title: "Mobile App Design",
      description:
        "Creating intuitive and engaging mobile experiences that drive user satisfaction and business growth. We focus on both aesthetics and functionality.",
      icon: <Smartphone size={24} className="text-primary" />,
    },
    {
      id: 2,
      number: "02",
      title: "Web Development",
      description:
        "Building responsive, fast-loading websites and web applications that deliver exceptional user experiences across all devices and platforms.",
      icon: <Globe size={24} className="text-primary" />,
    },
    {
      id: 3,
      number: "03",
      title: "Custom Software Solutions",
      description:
        "Developing tailored software solutions that address your specific business challenges and help streamline operations and boost productivity.",
      icon: <Code size={24} className="text-primary" />,
    },
    {
      id: 4,
      number: "04",
      title: "Brand Identity Design",
      description:
        "Crafting distinctive visual identities that communicate your brand values and resonate with your target audience, ensuring memorable market presence.",
      icon: <PenTool size={24} className="text-primary" />,
    },
  ];

  return (
    <section className="w-full bg-secondary text-foreground py-12 sm:py-16 md:py-20 lg:py-24">
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
                Our Services
              </span>
            </div>
          </div>

          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            The Ease-<span className="text-primary">Service</span> Process
          </h2>

          {/* Section Description */}
          <p className="text-base sm:text-lg text-center max-w-2xl mx-auto text-gray-300">
            We deliver end-to-end solutions that transform ideas into reality
            through our proven process designed for efficiency and excellence.
          </p>
        </div>

        {/* Service Cards with Animation */}
        <div className="space-y-4 sm:space-y-6">
          {services &&
            services.map((service: ServiceType, index) => (
              <div
                key={service.id}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                className={`group relative border border-neutral-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8
                transition-all duration-500 hover:border-primary/60 hover:bg-neutral-800/30
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
                        {service.icon}
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

                  {/* Arrow Button */}
                  <div
                    className={`hidden sm:flex flex-shrink-0 border border-primary rounded-full p-2 sm:p-3 cursor-pointer mt-4 lg:mt-0
                  transition-all duration-300 group-hover:bg-primary
                  ${
                    activeService === service.id
                      ? "bg-primary"
                      : "bg-transparent"
                  }`}
                  >
                    <ArrowUpRight
                      size={18}
                      className={`transition-colors duration-300
                    ${
                      activeService === service.id
                        ? "text-white"
                        : "text-primary"
                    }`}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Call to Action */}
        <div
          className={`mt-10 sm:mt-12 md:mt-16 flex justify-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <button className="flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary/90 text-white font-medium px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base">
            Explore All Services
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Service;
