import { Acchivement } from "./Achivement";
import { ArtToReform } from "./ArtToReform";
import { CoreValues } from "./CoreValues";
import { Difference } from "./Difference";
import { FeaturedArtwork } from "./FeaturedArtwork";
import { HeroMain } from "./hero";
import { OurImpact } from "./OurImpact";
import { WhySection } from "./WhySection";

export const Home = () => {
  return (
    <div className="h-full ">
      <HeroMain />
      <Acchivement />
      <FeaturedArtwork />
      <ArtToReform />
      <WhySection />
      <CoreValues />
      <OurImpact />
      <Difference />
    </div>
  );
};
