"use client";
import { heroData } from "@/data/hero";
import { importantLinksData } from "@/data/importantLinks";
import { ArrowUpRight, Briefcase, Mail, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationSpeed, setAnimationSpeed] = useState(
    heroData?.silderAnimationSpeed
  ); // seconds to complete one cycle

  const sliderItemsData = heroData.sliderItems;

  // Create enough clones to fill the screen width plus some extra
  const items = sliderItemsData.map((item) => {
    const Icon = item.icon;
    return (
      <div
        key={item.id}
        className="flex items-center gap-2 mx-4 whitespace-nowrap"
      >
        <Icon size={24} className="text-primary" />
        <p className="text-lg sm:text-2xl md:text-3xl font-semibold uppercase text-foreground">
          {item.text}
        </p>
      </div>
    );
  });

  const duplicatedItems = [...items, ...items];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Calculate the width of one item
    const firstItem = container.firstChild as HTMLElement;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth;

    // Set animation duration based on content width
    const totalContentWidth = itemWidth * items.length;
    const newSpeed = (totalContentWidth / 100) * 2; // Adjust speed based on width
    setAnimationSpeed(newSpeed);

    container.style.animationDuration = `${newSpeed}s`;

    // Recalculate on resize
    const handleResize = () => {
      const updatedItemWidth = firstItem.offsetWidth;
      const updatedTotalWidth = updatedItemWidth * items.length;
      const updatedSpeed = (updatedTotalWidth / 100) * 2;
      setAnimationSpeed(updatedSpeed);
      container.style.animationDuration = `${updatedSpeed}s`;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items.length]);

  return (
    <section id="#">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-28">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm sm:text-base font-medium">
                {heroData.label}
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="block">{heroData.topSection.heading}</span>
              </h1>
              <div className="h-[2px] w-[60px] sm:w-[80px] bg-gradient-to-r from-primary to-blue-500" />

              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text">
                {heroData.topSection.subHeading}
              </h2>
            </div>

            <p className="text-neutral-600 text-base sm:text-lg max-w-xl leading-relaxed">
              {heroData.description}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {heroData.socialLinks.map((socialLink, index) => (
                <Link
                  href={socialLink.href}
                  key={index}
                  target="_blank"
                  className="text-neutral-600 border-2 border-neutral-200 rounded-full h-[35px] w-[35px] sm:h-[45px] sm:w-[45px] flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 cursor-pointer"
                >
                  <socialLink.icon size={18} />
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
              <Link
                href={importantLinksData.cvDownloadLink}
                className="flex items-center justify-center gap-2 bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 font-semibold group cursor-pointer text-sm sm:text-base"
              >
                Download CV
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              <Link
                href="#contact"
                className="flex items-center justify-center gap-2 border-2 border-neutral-200 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:border-primary hover:text-primary transition-all duration-300 font-semibold cursor-pointer text-sm sm:text-base"
              >
                <Mail size={18} />
                Contact Us
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-4 sm:pt-8 flex flex-col lg:flex-row items-start xs:items-center gap-3 xs:gap-6">
              <div className="flex -space-x-3 sm:-space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  <Image
                    src="https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full h-full w-full"
                  />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full h-full w-full"
                  />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                  <Image
                    src="https://images.unsplash.com/photo-1678286742832-26543bb49959?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full h-full w-full"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Star size={12} className="text-yellow-400" />
                  <Star size={12} className="text-yellow-400" />
                  <Star size={12} className="text-yellow-400" />
                  <Star size={12} className="text-yellow-400" />
                  <Star size={12} className="text-yellow-400" />
                </div>
                <p className="text-sm sm:text-base text-neutral-600">
                  Trusted by{" "}
                  <span className="font-semibold text-primary">
                    {heroData.reviewCount}+ clients
                  </span>{" "}
                  worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mt-8 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full blur-3xl opacity-30"></div>
            <div className="relative w-60 h-60 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[400px] lg:h-[400px] rounded-full border-4 sm:border-8 border-primary overflow-hidden">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-blue-300/10"></div>
              <Image
                src="/hero.webp"
                alt="Amjad Hussain"
                width={400}
                height={400}
                className="absolute inset-0 w-full h-full rounded-full object-cover object-top z-10"
              />
            </div>

            {/* Floating badges - hidden on very small screens */}
            <div className="hidden lg:flex absolute -bottom-3 sm:-bottom-4 left-1/4 bg-white/90 rounded-full shadow-lg p-2 sm:p-3 items-center gap-1 sm:gap-2 z-50 text-xs sm:text-sm">
              <Briefcase className="text-primary" size={14} />
              <span className="font-medium">{heroData.badges.badge3}</span>
            </div>
            <div className="hidden lg:flex absolute top-10 sm:top-20 -right-4 sm:-right-8 bg-white/90 rounded-full shadow-lg p-2 sm:p-3 items-center gap-1 sm:gap-2 z-30 text-xs sm:text-sm">
              <Briefcase className="text-primary" size={14} />
              <span className="font-medium">{heroData.badges.badge1}</span>
            </div>
            <div className="hidden lg:flex absolute top-32 sm:top-44 -left-2 sm:-left-8 bg-white/90 rounded-full shadow-lg p-2 sm:p-3 items-center gap-1 sm:gap-2 z-30 text-xs sm:text-sm">
              <Briefcase className="text-primary" size={14} />
              <span className="font-medium">{heroData.badges.badge2}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Text Banner */}
      <div className="h-14 sm:h-20 w-full bg-secondary overflow-hidden relative">
        <div
          ref={containerRef}
          className="flex absolute top-0 left-0 h-full items-center"
          style={{
            animation: `scroll ${animationSpeed}s linear infinite`,
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div key={index} className="mx-4 sm:mx-8">
              {item}
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          @media (max-width: 640px) {
            @keyframes scroll {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-100%);
              }
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero;
