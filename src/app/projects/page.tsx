"use client";
import { projectDetailsData } from "@/data/projectDetail";
import { ArrowUpRight, Filter, Search, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ProjectsPage = () => {
  // State for filters and search
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Sample project data - replace with your actual projects
  const projects = projectDetailsData.projects;

  // Get unique categories for filter
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  // Filter projects based on active filter and search query
  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      activeFilter === "All" || project.category === activeFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen projects-container">
      {/* Hero Section */}
      <section className="bg-white pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            <span className="text-lg font-semibold tracking-wide uppercase">
              {projectDetailsData.label}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6 text-gray-800">
            {projectDetailsData.headings.headingNormal}{" "}
            <span className="text-primary">
              {projectDetailsData.headings.headingHighlighted}
            </span>
          </h1>
          <p className="text-xl max-w-3xl text-gray-600">
            {projectDetailsData.description}
          </p>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-10 px-4 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
            </div>

            {/* Filter Toggle - Mobile */}
            <button
              className="md:hidden flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-gray-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              <span>Filter</span>
            </button>

            {/* Filters - Desktop */}
            <div className="hidden md:flex items-center gap-4 overflow-x-auto filters-scroll pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeFilter === category
                      ? "bg-primary text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {showFilters && (
            <div className="md:hidden mt-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Filter by Category</h3>
                <X
                  size={18}
                  onClick={() => setShowFilters(false)}
                  className="cursor-pointer text-gray-500"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveFilter(category);
                      setShowFilters(false);
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeFilter === category
                        ? "bg-primary text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 projects-grid">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium text-gray-700">
              No projects found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={project.href}
                target="_blank"
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative overflow-hidden h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex gap-2 mb-3">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-sm font-medium text-primary">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">
                        Client: {project.client}
                      </span>
                    </div>
                    <div className="flex items-center justify-center border border-primary text-primary p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-primary/5 py-20 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Have a project in mind?{" "}
            <span className="text-primary">{"Let's work together"}</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {
              "We're always looking for new challenges and exciting projects. Get in touch to discuss how we can bring your ideas to life."
            }
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 font-semibold">
            Contact Us
          </button>
        </div>
      </section>

      <style jsx global>{`
        /* Project page specific scrollbar */
        .projects-container::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .projects-container::-webkit-scrollbar-track {
          background: rgba(40, 233, 140, 0.05);
          border-radius: 4px;
        }

        .projects-container::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #28e98c, #28e98c);
          border-radius: 4px;
          border: none;
          transition: all 0.3s ease;
        }

        .projects-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #1dcf7a, #1dcf7a);
        }

        /* Horizontal filters scrollbar styling */
        .filters-scroll::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }

        .filters-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .filters-scroll::-webkit-scrollbar-thumb {
          background: #28e98c;
          border-radius: 10px;
          transition: background 0.2s ease;
        }

        .filters-scroll::-webkit-scrollbar-thumb:hover {
          background: #1dcf7a;
        }

        /* Projects grid area scrollbar */
        .projects-grid::-webkit-scrollbar {
          width: 6px;
        }

        .projects-grid::-webkit-scrollbar-track {
          background: #f9f9f9;
          border-radius: 3px;
        }

        .projects-grid::-webkit-scrollbar-thumb {
          background: #28e98c;
          border-radius: 3px;
          border-right: 1px solid #f9f9f9;
          border-left: 1px solid #f9f9f9;
        }

        .projects-grid::-webkit-scrollbar-thumb:hover {
          background: #1dcf7a;
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
