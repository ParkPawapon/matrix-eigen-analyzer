import { landingContent } from "@/features/landing/data/landing-content";
import { DisplayHeading } from "@/shared/components/typography/display-heading";

export function HeroSection() {
  return (
    <section className="border-b-2 border-border-strong px-6 py-16 md:py-24">
      <div className="mx-auto max-w-screen-xl">
        <p className="mb-4 font-mono text-xs uppercase text-text-secondary">
          Architecture scaffold
        </p>
        <DisplayHeading>{landingContent.title}</DisplayHeading>
      </div>
    </section>
  );
}
