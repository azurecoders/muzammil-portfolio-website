"use client";
import { Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import React, { useState } from "react";

const ContactUs = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-28">
      {/* Container with background decoration */}
      <div className="relative rounded-xl overflow-hidden bg-white">
        {/* Background decoration */}
        <div
          className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          aria-hidden="true"
        ></div>
        <div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between py-6 md:p-10">
          {/* Left side - Heading and contact info */}
          <div className="text-center lg:text-left w-full lg:w-2/5 mb-12 lg:mb-0">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4 md:mb-6">
              Get in touch
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-4 md:mb-6">
              {"Let's "}
              <span className="text-primary">Connect</span>
            </h2>

            <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
              {
                "Have questions or want to discuss a project? We're here to help bring your ideas to life."
              }
            </p>

            {/* Contact info */}
            <div className="mt-8 md:mt-12 space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-600">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm md:text-base overflow-hidden text-ellipsis">
                  amjadhussainshadow@gmail.com
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-600">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm md:text-base">+92 355 5085804</span>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white px-4 py-6 md:p-8 rounded-2xl border border-gray-200 shadow-lg">
              <form
                action="https://formsubmit.co/amjadhussainshadow@gmail.com"
                method="post"
                className="space-y-5"
              >
                <h3 className="text-lg md:text-xl font-medium mb-4 md:mb-6 text-primary">
                  Send us a message
                </h3>

                <div className="space-y-4 md:space-y-6">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        id="name"
                        required
                        className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-primary border border-gray-200 transition-all duration-300 text-gray-800"
                      />
                      <User
                        size={16}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        id="email"
                        required
                        className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-primary border border-gray-200 transition-all duration-300 text-gray-800"
                      />
                      <Mail
                        size={16}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        id="message"
                        placeholder="Tell us about your project or question..."
                        required
                        className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-primary border border-gray-200 transition-all duration-300 text-gray-800 min-h-32 sm:min-h-40 resize-none"
                      ></textarea>
                      <MessageSquare
                        size={16}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group w-full mt-6 py-3 px-6 font-medium cursor-pointer bg-primary text-white rounded-lg hover:brightness-110 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>

                <p className="text-xs text-center text-gray-500 mt-2">
                  By submitting this form, you agree to our privacy policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
