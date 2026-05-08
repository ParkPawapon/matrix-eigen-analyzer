import { AssignmentOverviewSection } from "@/features/landing/sections/assignment-overview-section";
import { CtaSection } from "@/features/landing/sections/cta-section";
import { FeaturesSection } from "@/features/landing/sections/features-section";
import { HeroSection } from "@/features/landing/sections/hero-section";
import { TechnicalStackSection } from "@/features/landing/sections/technical-stack-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AssignmentOverviewSection />
      <FeaturesSection />
      <TechnicalStackSection />
      <CtaSection />
    </>
  );
}
