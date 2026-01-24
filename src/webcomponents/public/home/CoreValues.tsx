import { Heart, Target, TrendingUp, Users } from "lucide-react";

export const CoreValues = () => {
  const coreValues = [
    {
      icon: Heart,
      title: "Dignity",
      description:
        "We treat every artist and artwork with respect and professionalism.",
    },
    {
      icon: Target,
      title: "Transparency",
      description:
        "Clear auction mechanics and honest representation of each piece.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building connections between artists, collectors, and supporters.",
    },
    {
      icon: TrendingUp,
      title: "Impact",
      description:
        "Measuring success by the lives transformed and communities strengthened.",
    },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
