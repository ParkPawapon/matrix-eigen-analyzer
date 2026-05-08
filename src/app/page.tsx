import { CtaSection } from "@/features/landing/sections/cta-section";
import { FeaturesSection } from "@/features/landing/sections/features-section";
import { HeroSection } from "@/features/landing/sections/hero-section";
import { ProjectOverviewSection } from "@/features/landing/sections/project-overview-section";
import { TechnicalStackSection } from "@/features/landing/sections/technical-stack-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectOverviewSection />
      <FeaturesSection />
      <TechnicalStackSection />
      <CtaSection />
    </>
  );
}
