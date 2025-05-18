"use client";
import {
  ArrowUpRight,
  Sparkles,
  Award,
  Users,
  Briefcase,
  Globe,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts for animations
    setIsVisible(true);

    // Optional: Add intersection observer for better scroll-based animations
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("about-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      id="about-section"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-12 lg:gap-16">
        {/* Image Section with Animated Entrance */}
        <div
          className={`relative w-full lg:w-1/2 mb-10 lg:mb-0 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-12"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-400/30 rounded-2xl blur-3xl opacity-40"></div>

          {/* Image Frame - Responsive sizing */}
          <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[460px] xl:h-[500px]">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-t-4 border-l-4 border-primary opacity-70"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-b-4 border-r-4 border-primary opacity-70"></div>

            {/* Main image container */}
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 sm:border-6 md:border-8 border-white">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/10 to-blue-300/10"></div>

              {/* Image itself */}
              <div className="absolute inset-0 w-full h-full rounded-md object-cover object-top z-10 bg-[url('/hero.webp')] bg-cover bg-center bg-top" />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Content Section with Animated Entrance */}
        <div
          className={`w-full lg:w-1/2 space-y-6 md:space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
        >
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full">
            <Sparkles size={16} className="text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-primary tracking-wide uppercase">
              About Me
            </span>
          </div>

          {/* Headings - Responsive font sizes */}
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              Solving Problems With
            </h3>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Intuitive Design
            </h3>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
            {
              "I'm a passionate designer and developer creating thoughtful digital experiences that connect brands with their audience. With a focus on clean aesthetics and user-centered design, I transform complex problems into elegant solutions."
            }
          </p>

          {/* Stats - Grid responsive adjustments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-2 sm:pt-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                <Briefcase size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  10+
                </h3>
                <p className="text-sm sm:text-md font-medium text-gray-500">
                  Years of Experience
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                <Users size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  14+
                </h3>
                <p className="text-sm sm:text-md font-medium text-gray-500">
                  Satisfied Clients
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                <Award size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  8
                </h3>
                <p className="text-sm sm:text-md font-medium text-gray-500">
                  Design Awards
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                <Globe size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  20+
                </h3>
                <p className="text-sm sm:text-md font-medium text-gray-500">
                  Countries Served
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button - Responsive padding and sizing */}
          <div className="pt-4 sm:pt-6">
            <button className="group flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-sm sm:text-base">Learn More About Me</span>
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
