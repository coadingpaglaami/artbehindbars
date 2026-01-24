import { HeroLeft } from "./HeroLeft";
import { HeroRight } from "./HeroRight";

export const HeroMain = () => {
  return (
    <section className="flex flex-col md:flex-row items-center bg-linear-to-r from-[#171717] to-[#262626] py-16">
      <HeroLeft />
      <HeroRight />
    </section>
  );
};
