'use client';
import Image from "next/image";
import { WhySection } from "../home/WhySection";
import { CoreValues } from "../home/CoreValues";
import { OurImpact } from "../home/OurImpact";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const OurStory = () => {
  const {push} = useRouter();
  return (
    <>
      <div className="relative h-80 w-auto">
        <Image
          src="/our story/ourstorybredcumb.webp"
          alt="Our Story Banner"
          fill
        />
        <div className="absolute bg-black/40 flex flex-col items-center justify-center inset-0 gap-3">
          <h1 className="text-white md:text-4xl text-2xl">Our Story</h1>
          <span className="text-gray-300">
            Transforming lives through art, one auction at a time.
          </span>
        </div>
      </div>

      <WhySection />
      <CoreValues />
      <OurImpact />
      <div className="flex flex-col justify-center items-center gap-5 py-16">
        <h2 className="md:text-4xl text-2xl font-semibold">Join Our Mission</h2>
        <span className="text-lg text-gray-800">
          Every purchase makes a difference. Browse our collection and find a
          piece that speaks to you.
        </span>
        <Button className="" onClick={() => push("/shop_art")}>Browse Artwork</Button>
      </div>
    </>
  );
};
