"use client";
import About from "@/components/About";
import Awards from "@/components/Awards";
import ContactUs from "@/components/ContactUs";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Project from "@/components/Project";
import Service from "@/components/Service";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Service />
      <Project />
      <Experience />
      <Awards />
      <Testimonials />
      <ContactUs />
      <Footer />
    </>
  );
}
