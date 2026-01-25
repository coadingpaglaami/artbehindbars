"use client";
import { useRouter } from "next/navigation";

export const HeroLeft = () => {
  const {push}= useRouter();
  return (
    <div className="md:w-1/2 p-4 w-full flex flex-col gap-6">
      <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
        Discover Authentic
        <br />
        Art Created Behind
        <br />
        Bars
      </h2>
      <p className="text-lg text-gray-300 leading-relaxed">
        Support incarcerated artists by bidding on original artwork. Every
        purchase helps fund rehabilitation programs and prepares artists for
        successful reintegration.
      </p>
      <div className="flex gap-4">
        <button onClick={() => push("/shop_art")} className="bg-[#FFA66A] hover:bg-[#ff9555] text-white px-8 py-3 rounded-lg font-medium transition-colors">
          Browse Artwork
        </button>
        <button className="border-2 bg-[#FFFFFF1A] border-gray-300 hover:border-gray-400 text-white px-8 py-3 rounded-lg  transition-colors" onClick={() => push("/our_story")} >
          Our Story
        </button>
      </div>
    </div>
  );
};
