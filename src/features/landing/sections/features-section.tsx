import { CheckCircle2, Sigma, SquareStack } from "lucide-react";
import { Reveal } from "@/shared/components/motion/reveal";

const featureRows = [
  {
    icon: Sigma,
    title: "Eigen Analysis",
    detail: "Computes eigenvalues and eigenvector bases for 2x2 and 3x3 matrices.",
  },
  {
    icon: CheckCircle2,
    title: "Diagonalization Verdict",
    detail: "Checks whether enough independent eigenvectors exist to construct P.",
  },
  {
    icon: SquareStack,
    title: "Matrix Output",
    detail: "Shows P, P^-1, and D when the matrix is diagonalizable.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section
      className="border-b-2 border-border-strong bg-primary px-6 py-16 text-background md:py-24"
      id="features"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal>
            <p className="font-mono text-xs uppercase text-accent">Feature Outline</p>
            <h2 className="mt-4 max-w-[10ch] break-words font-display text-5xl uppercase leading-none md:text-7xl">
              Built For The Assignment Flow.
            </h2>
          </Reveal>
          <div className="grid border-2 border-background">
            {featureRows.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Reveal
                  className="grid gap-4 border-b-2 border-background p-5 last:border-b-0 md:grid-cols-[3rem_minmax(0,1fr)] md:p-6"
                  delay={0.04 + index * 0.04}
                  key={feature.title}
                  variant="press"
                >
                  <Icon aria-hidden="true" className="h-8 w-8 text-accent" strokeWidth={2.5} />
                  <div>
                    <h3 className="font-display text-2xl uppercase leading-none">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-surface-raised">{feature.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
