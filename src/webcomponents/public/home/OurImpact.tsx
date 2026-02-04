export const OurImpact = () => {
  const impactData = [
    { number: "150+", text: "Artworks Sold" },
    { number: "45", text: "Artists Supported" },
    { number: "$85K+", text: "Raised for Programs" },
  ];

  return (
    <section className="py-16 bg-linear-to-r from-[#C5A882] to-[#B8996E]">
      <div className="px-6">
        <h2 className="text-4xl font-semibold text-center mb-12 text-white">
          Our Impact
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {impactData.map((impact, index) => (
            <div key={index} className="text-center space-y-3">
              <h3 className="text-4xl  text-white">{impact.number}</h3>
              <p className="text-lg text-white">{impact.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
