import { ArrowRight } from "lucide-react";

export const Difference = () => {
  return (
    <section className="py-16 bg-[#C5A882] text-white">
      <div className="container mx-auto px-6 text-center space-y-6">
        <h2 className="text-4xl font-semibold">Make a Difference Through Art</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Join our community of collectors who believe in second chances and the
          transformative power of creative expression.
        </p>
        <button className="bg-white text-primary p-2.5 rounded-lg inline-flex items-center gap-2 transition-colors text-lg">
          Meet Our Artists
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};
