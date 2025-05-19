import { Smartphone, Globe, Code, PenTool } from "lucide-react";

export const serviceData = {
  label: "Our Services",
  headings: {
    headingsPart1: "The Ease-",
    headingsPart2: "Service",
    headingsPart3: "Process",
  },
  description:
    "We deliver end-to-end solutions that transform ideas into reality through our proven process designed for efficiency and excellence.",
  services: [
    {
      id: 1,
      number: "01",
      title: "Mobile App Design",
      description:
        "Creating intuitive and engaging mobile experiences that drive user satisfaction and business growth. We focus on both aesthetics and functionality.",
      icon: Smartphone,
    },
    {
      id: 2,
      number: "02",
      title: "Web Development",
      description:
        "Building responsive, fast-loading websites and web applications that deliver exceptional user experiences across all devices and platforms.",
      icon: Globe,
    },
    {
      id: 3,
      number: "03",
      title: "Custom Software Solutions",
      description:
        "Developing tailored software solutions that address your specific business challenges and help streamline operations and boost productivity.",
      icon: Code,
    },
    {
      id: 4,
      number: "04",
      title: "Brand Identity Design",
      description:
        "Crafting distinctive visual identities that communicate your brand values and resonate with your target audience, ensuring memorable market presence.",
      icon: PenTool,
    },
  ],
};
