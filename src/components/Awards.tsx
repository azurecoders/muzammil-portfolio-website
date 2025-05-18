import { Award, Sparkles, Star, Trophy } from "lucide-react";
import { useState } from "react";

const Awards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  type AwardType = {
    id: number;
    title: string;
    date: string;
    icon: string;
    color: string;
    iconColor: string;
    trophyColor: string;
  };

  const awards: AwardType[] = [
    {
      id: 1,
      title: "Design Leadership Award",
      date: "March 26, 2024",
      icon: "award",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-500",
      trophyColor: "text-blue-400",
    },
    {
      id: 2,
      title: "UX Excellence Recognition",
      date: "January 14, 2024",
      icon: "star",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-500",
      trophyColor: "text-purple-400",
    },
    {
      id: 3,
      title: "Creative Portfolio Showcase",
      date: "November 8, 2023",
      icon: "sparkles",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-500",
      trophyColor: "text-amber-400",
    },
    {
      id: 4,
      title: "Digital Innovation Prize",
      date: "August 30, 2023",
      icon: "trophy",
      color: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-500",
      trophyColor: "text-emerald-400",
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "award":
        return <Award className="w-8 h-8 sm:w-10 sm:h-10 stroke-2" />;
      case "star":
        return <Star className="w-8 h-8 sm:w-10 sm:h-10 stroke-2" />;
      case "sparkles":
        return <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 stroke-2" />;
      default:
        return <Trophy className="w-8 h-8 sm:w-10 sm:h-10 stroke-2" />;
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background decorations with responsive positioning */}
      <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-blue-50 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-purple-50 rounded-full filter blur-3xl opacity-20 -z-10"></div>

      {/* Header section with responsive typography */}
      <div className="max-w-3xl text-center sm:text-left mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 rounded-full">
          <Sparkles size={16} className="text-primary" />
          <span className="text-xs sm:text-sm font-semibold text-primary tracking-wide uppercase">
            Recognition & Awards
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-3 sm:mb-4 leading-tight">
          Award-Winning <span className="text-primary">Excellence</span>
        </h2>

        <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto sm:mx-0">
          Recognition from industry leaders highlighting my commitment to
          innovation, creativity, and exceptional design standards.
        </p>
      </div>

      {/* Awards grid with fully responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl">
        {awards &&
          awards.length > 0 &&
          awards.map((award) => (
            <div
              key={award.id}
              className={`${award.color} border rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer`}
              onMouseEnter={() => setHoveredCard(award.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <div
                    className={`p-2 sm:p-3 rounded-xl ${award.iconColor} bg-white/80 shadow-sm flex-shrink-0`}
                  >
                    {getIcon(award.icon)}
                  </div>

                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2">
                      {award.title}
                    </h3>
                    <p className="text-neutral-500 text-xs sm:text-sm flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                      {award.date}
                    </p>
                  </div>
                </div>

                <div
                  className={`hidden sm:block transition-all duration-300 ${
                    hoveredCard === award.id ? "scale-110 rotate-12" : ""
                  }`}
                >
                  <Trophy
                    className={`w-8 h-8 md:w-10 md:h-10 ${award.trophyColor}`}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Awards;
