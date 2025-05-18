import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Project = () => {
  // Sample project data to avoid repetition
  const projects = [
    {
      id: 1,
      category: "App / Development",
      title: "Mobile App for Task Management",
      imageUrl: "https://ex-coders.com/html/xiomi/assets/img/project/1.jpg", // Using placeholder images since external links aren't allowed
    },
    {
      id: 2,
      category: "Web / Design",
      title: "E-commerce Website Redesign",
      imageUrl: "https://ex-coders.com/html/xiomi/assets/img/project/2.jpg",
    },
    {
      id: 3,
      category: "UI / UX",
      title: "Financial Dashboard Interface",
      imageUrl: "https://ex-coders.com/html/xiomi/assets/img/project/3.jpg",
    },
    {
      id: 4,
      category: "App / Development",
      title: "Social Media Analytics Platform",
      imageUrl: "https://ex-coders.com/html/xiomi/assets/img/project/4.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-primary" />
        <span className="text-base sm:text-lg font-semibold tracking-wide uppercase">
          Project
        </span>
      </div>

      {/* Responsive Heading and Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-2 sm:mt-4 gap-4 sm:gap-0">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
          My Featured <span className="text-primary">Portfolio</span>
        </h3>
        <Link
          href="/projects"
          className="flex items-center justify-center gap-2 bg-primary text-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 font-semibold group cursor-pointer whitespace-nowrap"
        >
          View All Projects
          <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>

      {/* Projects Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 my-8 sm:my-12 md:my-16 gap-6 md:gap-8">
        {projects.map((project) => (
          <div key={project.id} className="project-card group">
            <div className="overflow-hidden rounded-xl">
              <Image
                src={project.imageUrl}
                alt={`Project - ${project.title}`}
                width={800}
                height={600}
                className="w-full aspect-video object-cover rounded-xl border border-neutral-200 group-hover:border-primary transition-all duration-300 ease-in-out cursor-pointer group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <p className="text-lg sm:text-xl text-neutral-600 font-medium mb-1">
                {project.category}
              </p>
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-semibold text-secondary pr-4">
                  {project.title}
                </h3>
                <div className="border border-primary p-2 rounded-full flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowUpRight />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
