import { Heart, Palette, Users } from "lucide-react";

export const Acchivement = () => {
  const statsData = [
    { icon: Palette, number: "500+", text: "Original Artworks" },
    { icon: Users, number: "200+", text: "Talented Artists" },
    { icon: Heart, number: "$85K+", text: "Raised for Programs" },
  ];
  return (
    <section className="bg-gray-50 py-16">
      <div className="grid md:grid-cols-3 gap-12">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-2"
            >
              <div className="w-20 h-20  flex items-center justify-center">
                <Icon size={40} className="text-primary" />
              </div>
              <h3 className="text-4xl font-semibold text-gray-900">
                {stat.number}
              </h3>
              <p className="text-lg text-gray-600">{stat.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
