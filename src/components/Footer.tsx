import { footerData } from "@/data/footer";
import { ArrowRight, Copyright, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const FooterLink = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link
      href={href}
      className="text-neutral-300 group flex items-center gap-2 hover:text-primary cursor-pointer transition-all duration-300 ease-in-out text-sm md:text-base font-medium"
    >
      <span className="transition-all duration-300 group-hover:translate-x-1">
        {children}
      </span>
      <ArrowRight
        size={16}
        className="opacity-0 group-hover:opacity-100 transition-all duration-300"
      />
    </Link>
  );
};

const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-neutral-600 hover:border-primary hover:text-primary hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out p-2 md:p-3 rounded-full bg-background/5 flex items-center justify-center"
      aria-label="Social media link"
    >
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-secondary text-foreground pt-12 sm:pt-16 md:pt-24 pb-6 relative overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary.DEFAULT)_1px,transparent_0)] bg-[size:24px_24px]"></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col lg:flex-row justify-between border-b border-neutral-700/70 pb-8 md:pb-12">
          {/* Company Information */}
          <div className="w-full lg:w-1/2 border-0 lg:border-r border-neutral-700/70 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-neutral-700/70 pb-8 md:pb-12">
              <div className="space-y-4 md:space-y-6 mb-8 sm:mb-0">
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                  Our Location
                </h3>
                <div className="flex items-start space-x-3">
                  <MapPin
                    size={20}
                    className="mt-1 text-primary flex-shrink-0"
                  />
                  <p className="text-neutral-300 text-sm md:text-base whitespace-pre-line">
                    {footerData.location.split(",").map((part, index) => (
                      <span key={index}>
                        {part.trim()}
                        {index < footerData.location.split(",").length - 1 && (
                          <br />
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                  Get in Touch
                </h3>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3 group">
                    <Mail
                      size={20}
                      className="text-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0"
                    />
                    <a
                      href="mailto:amjadhussainshadow@gmail.com"
                      className="text-neutral-300 hover:text-primary transition-all duration-300 ease-in-out text-sm md:text-base truncate"
                    >
                      {footerData.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <Phone
                      size={20}
                      className="text-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0"
                    />
                    <p className="text-neutral-300 hover:text-primary transition-all duration-300 ease-in-out text-sm md:text-base">
                      {footerData.contact.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 md:pt-12 flex flex-col space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {footerData &&
                  footerData.connectWithUs &&
                  footerData.connectWithUs.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <SocialIcon key={index} href={item.href}>
                        <Icon size={18} />
                      </SocialIcon>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 pl-0 lg:pl-8 gap-8 mt-8 lg:mt-0">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                Useful Links
              </h3>
              <div className="flex flex-col space-y-3 md:space-y-4">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/services">Services</FooterLink>
                <FooterLink href="/portfolio">Portfolio</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                Our Services
              </h3>
              <div className="flex flex-col space-y-3 md:space-y-4">
                {footerData &&
                  footerData.services &&
                  footerData.services.map((item, index) => (
                    <p
                      className="text-neutral-300 group flex items-center gap-2 hover:text-primary cursor-pointer transition-all duration-300 ease-in-out text-sm md:text-base font-medium"
                      key={index}
                    >
                      {item}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-neutral-300 text-sm md:text-base font-medium flex flex-wrap items-center justify-center sm:justify-start gap-1 mb-4 sm:mb-0">
            <Copyright size={16} className="text-primary" />
            <span className="mx-1">2025</span>
            <span className="text-primary font-semibold">Amjad</span>
            <span className="mx-1">• All rights reserved</span>
          </p>

          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
            <Link
              href="/terms"
              className="text-neutral-300 text-xs md:text-sm font-medium hover:text-primary cursor-pointer transition-all duration-300 ease-in-out px-2 py-1 rounded hover:bg-primary/5"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="text-neutral-300 text-xs md:text-sm font-medium hover:text-primary cursor-pointer transition-all duration-300 ease-in-out px-2 py-1 rounded hover:bg-primary/5"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Footer divider line with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;
