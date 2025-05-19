import { Linkedin, Dribbble, Instagram, Github, Sparkles } from "lucide-react";

export const heroData = {
  label: "Design Professional",
  topSection: {
    heading: "I'm Amjad Hussain",
    subHeading: "Graphics & Web Designer",
  },
  description:
    "Working globally with leading brands to create strategic visual solutions. I believe that progress comes to those who dare to push creative boundaries.",
  socialLinks: [
    {
      icon: Github,
      href: "",
    },
    {
      icon: Instagram,
      href: "",
    },
    {
      icon: Linkedin,
      href: "",
    },
    {
      icon: Dribbble,
      href: "",
    },
  ],
  reviewCount: 20,
  userImage: "/hero.webp",
  badges: {
    badge1: "7+ Years Experience",
    badge2: "10+ Projects Completed",
    badge3: "5+ Awards Won",
  },
  silderAnimationSpeed: 60, //seconds
  sliderItems: [
    {
      id: 1,
      text: "THE BEST SOLUTION",
      icon: Sparkles,
    },
    {
      id: 2,
      text: "EXPERIENCE THE DIFFERENCE",
      icon: Sparkles,
    },
    {
      id: 3,
      text: "INNOVATION AT ITS BEST",
      icon: Sparkles,
    },
  ],
};
