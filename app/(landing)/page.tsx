import { LandingContent } from "./_components/landing-content";
import { LandingHero } from "./_components/landing-hero";
import { LandingNavBar } from "./_components/landing-nav-bar";

function LandingPage() {
  return (
    <div className="h-full">
      <LandingNavBar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}

export default LandingPage;
