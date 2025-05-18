"use client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-[8vh]">
          {/* Logo */}
          <div>
            <Link href="/">
              <h1 className="text-2xl md:text-3xl font-semibold">Xiomi</h1>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {!isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-4 lg:gap-7">
              <li>
                <Link
                  href="/"
                  className="font-medium hover:text-primary cursor-pointer transition-all duration-300 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="font-medium hover:text-primary cursor-pointer transition-all duration-300 ease-in-out"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="font-medium hover:text-primary cursor-pointer transition-all duration-300 ease-in-out"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="font-medium hover:text-primary cursor-pointer transition-all duration-300 ease-in-out"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="font-medium hover:text-primary cursor-pointer transition-all duration-300 ease-in-out"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Button - Hidden on small screens */}
          <div className="hidden md:block">
            <button className="bg-black/90 text-white px-5 py-2 lg:px-8 rounded-full hover:bg-primary cursor-pointer border-none outline-none transition-all duration-300 ease-in-out">
              Hire Me
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-3 bg-white">
              <Link
                href="/"
                className="block px-3 py-2 font-medium hover:text-primary transition-all duration-300 ease-in-out"
              >
                Home
              </Link>
              <Link
                href="/"
                className="block px-3 py-2 font-medium hover:text-primary transition-all duration-300 ease-in-out"
              >
                About
              </Link>
              <Link
                href="/"
                className="block px-3 py-2 font-medium hover:text-primary transition-all duration-300 ease-in-out"
              >
                Services
              </Link>
              <Link
                href="/"
                className="block px-3 py-2 font-medium hover:text-primary transition-all duration-300 ease-in-out"
              >
                Portfolio
              </Link>
              <Link
                href="/"
                className="block px-3 py-2 font-medium hover:text-primary transition-all duration-300 ease-in-out"
              >
                Contact
              </Link>

              {/* CTA Button for mobile */}
              <div className="mt-4 mb-2">
                <button className="w-full bg-black/90 text-white px-4 py-2 rounded-full hover:bg-primary cursor-pointer border-none outline-none transition-all duration-300 ease-in-out">
                  Hire Me
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
