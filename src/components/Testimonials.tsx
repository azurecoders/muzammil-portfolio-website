import { Quote, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    setIsVisible(true);

    // Optional: Auto-rotate testimonials
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [handleNext]);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Daniel Smith",
      position: "Senior Engineer at TechCorp",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      quote:
        "This digital agency completely transformed our online presence. Their expertise, creativity, and attention to detail exceeded all our expectations. We highly recommend their outstanding services!",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Marketing Director at BrandWave",
      image:
        "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      quote:
        "Working with this team has been a game-changer for our business. They consistently deliver innovative solutions that align perfectly with our brand vision and business goals.",
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "CEO at InnovateTech",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4,
      quote:
        "Their strategic approach to our digital transformation has driven remarkable results. The team's commitment to excellence and collaborative spirit makes them a trusted partner.",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      position: "Product Manager at GrowthLabs",
      image:
        "https://images.unsplash.com/photo-1678286742832-26543bb49959?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      quote:
        "The level of professionalism and technical expertise demonstrated by this agency is unmatched. They turned our complex requirements into elegant solutions.",
    },
  ];

  return (
    <section className="w-full bg-secondary text-foreground py-12 sm:py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with Animation */}
        <div
          className={`space-y-3 sm:space-y-4 mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Testimonials Label */}
          <div className="flex items-center gap-2 justify-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary tracking-wide uppercase">
                Testimonials
              </span>
            </div>
          </div>

          {/* Section Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            What Our <span className="text-primary">Clients</span> Say
          </h2>

          {/* Section Description */}
          <p className="text-base sm:text-lg text-center max-w-2xl mx-auto text-gray-300">
            {
              "Don't just take our word for it — hear from the businesses we've helped transform through our digital solutions."
            }
          </p>
        </div>

        {/* Rating Summary Card */}
        <div
          className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 p-4 sm:p-6 mx-auto max-w-xs sm:max-w-lg md:max-w-2xl border border-neutral-700 rounded-xl sm:rounded-2xl bg-neutral-800/30">
            {/* Rating Number */}
            <div className="text-center md:text-left">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">
                4.8
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                out of 5.0
              </p>
            </div>

            {/* Horizontal Divider for Mobile */}
            <div className="md:hidden w-1/2 h-px bg-neutral-700"></div>

            {/* Vertical Divider for Desktop */}
            <div className="hidden md:block w-px h-16 sm:h-20 bg-neutral-700"></div>

            {/* Stars */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-1 mb-1 sm:mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm md:text-md font-medium text-gray-300">
                Based on 1,200+ client reviews
              </p>
            </div>

            {/* Horizontal Divider for Mobile */}
            <div className="md:hidden w-1/2 h-px bg-neutral-700"></div>

            {/* Vertical Divider for Desktop */}
            <div className="hidden md:block w-px h-16 sm:h-20 bg-neutral-700"></div>

            {/* Clients */}
            <div className="text-center md:text-left">
              <h4 className="text-xl sm:text-2xl font-bold">500+</h4>
              <p className="text-xs sm:text-sm md:text-md font-medium text-gray-300">
                Projects completed
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-center">
            {/* Image Side */}
            <div className="w-full lg:w-5/12 flex justify-center lg:justify-end order-2 lg:order-1">
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -z-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-primary/10 -top-8 -left-8 sm:-top-10 sm:-left-10"></div>

                {/* Main image container */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-neutral-700 shadow-xl">
                  <div className="w-full h-full">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={`${testimonials[activeIndex].name} portrait`}
                      width={800}
                      height={800}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Decoration element */}
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary rotate-180" />
                </div>
              </div>
            </div>

            {/* Testimonial Content Side */}
            <div className="w-full lg:w-7/12 order-1 lg:order-2">
              <div className="bg-neutral-800/40 border border-neutral-700 rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 relative">
                {/* Quote icon */}
                <div className="absolute top-6 sm:top-8 left-6 sm:left-8">
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary/20" />
                </div>

                {/* Content */}
                <div className="mt-8 sm:mt-10">
                  <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-gray-100 ml-4 sm:ml-6">
                    {testimonials[activeIndex].quote}
                  </p>

                  <div className="mt-6 sm:mt-8 flex items-center">
                    <div className="flex-shrink-0 mr-3 sm:mr-4">
                      <Image
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        width={250}
                        height={250}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-white">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-300">
                        {testimonials[activeIndex].position}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                              i < testimonials[activeIndex].rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-500"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center lg:justify-end gap-3 mt-4 sm:mt-6">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-neutral-700 hover:border-primary bg-neutral-800 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-neutral-700 hover:border-primary bg-neutral-800 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div
          className={`flex justify-center gap-2 mt-6 sm:mt-8 md:mt-10 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-primary w-6 sm:w-8"
                  : "bg-neutral-700 w-2 sm:w-3"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
