import { CheckCircle2, ListChecks } from "lucide-react";
import { projectOverviewContent } from "@/features/landing/data/landing-content";
import { Reveal } from "@/shared/components/motion/reveal";

export function ProjectOverviewSection() {
  return (
    <section
      aria-labelledby="project-overview-title"
      className="border-b-2 border-border-strong bg-background px-6 py-16 md:py-24"
      id="project-overview"
    >
      <div className="mx-auto max-w-screen-xl">
        <Reveal className="grid gap-8 border-b-2 border-border-strong pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.44fr)] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase text-accent">
              {projectOverviewContent.eyebrow}
            </p>
            <h2
              className="mt-4 max-w-5xl break-words font-display text-4xl uppercase leading-none md:text-6xl xl:text-7xl"
              id="project-overview-title"
            >
              {projectOverviewContent.title}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-text-secondary md:text-lg">
              {projectOverviewContent.description}
            </p>
          </div>

          <div className="border-2 border-border-strong bg-primary p-6 text-background">
            <p className="font-mono text-xs uppercase text-text-tertiary">Target relation</p>
            <p className="mt-5 break-words font-mono text-2xl font-black uppercase leading-tight md:text-3xl">
              D = P^-1 A P
            </p>
            <p className="mt-5 border-t-2 border-background pt-5 text-sm font-semibold leading-6 text-surface-raised">
              The interface is organized around this relation: A is the input, P is the eigenvector
              basis, and D is the diagonal result when the basis is valid.
            </p>
          </div>
        </Reveal>

        <div className="mt-10">
          <Reveal
            className="mb-4 flex flex-wrap items-center justify-between gap-4 border-2 border-border-strong bg-background px-5 py-4"
            delay={0.04}
            variant="line"
          >
            <div className="flex items-center gap-3">
              <ListChecks aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={2.5} />
              <h3 className="font-display text-2xl uppercase">What the system proves</h3>
            </div>
            <p className="font-mono text-xs uppercase text-text-tertiary">5-step tour</p>
          </Reveal>

          <ol className="grid gap-4">
            {projectOverviewContent.requirements.map((requirement, index) => (
              <li key={requirement.id}>
                <Reveal delay={0.06 + index * 0.04} variant="press">
                  <article className="grid border-2 border-border-strong bg-background lg:grid-cols-[22rem_minmax(0,1fr)]">
                    <div className="flex flex-col justify-center border-b-2 border-border-strong bg-primary p-5 text-background lg:border-b-0 lg:border-r-2">
                      <p className="font-mono text-xs uppercase text-text-tertiary">
                        Step {requirement.order.toString().padStart(2, "0")}
                      </p>
                      <h4 className="mt-4 whitespace-nowrap font-display text-3xl uppercase leading-none">
                        {requirement.shortLabel}
                      </h4>
                    </div>

                    <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                      <div>
                        <p className="font-mono text-xs uppercase text-accent">Meaning</p>
                        <h5 className="mt-2 font-display text-2xl uppercase leading-tight">
                          {requirement.title}
                        </h5>
                        <p className="mt-3 text-sm leading-6 text-text-secondary">
                          {requirement.definition}
                        </p>
                      </div>

                      <div className="grid gap-3">
                        <div>
                          <p className="font-mono text-xs uppercase text-text-tertiary">Formula</p>
                          <code className="mt-2 block border-2 border-border-strong bg-surface px-4 py-3 font-mono text-sm font-black text-primary">
                            {requirement.formula}
                          </code>
                        </div>
                        <div className="flex items-start gap-3 border-t-2 border-border-strong pt-3">
                          <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 text-accent" />
                          <p className="text-sm font-semibold leading-6">{requirement.output}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
