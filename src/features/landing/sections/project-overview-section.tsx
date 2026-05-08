import { CheckCircle2, ListChecks, Rows3, SquareStack } from "lucide-react";
import { projectOverviewContent } from "@/features/landing/data/landing-content";
import type { MatrixPreviewMode } from "@/features/landing/types/landing.types";

const matrixCellValues: Record<MatrixPreviewMode, readonly string[]> = {
  2: ["a11", "a12", "a21", "a22"],
  3: ["a11", "a12", "a13", "a21", "a22", "a23", "a31", "a32", "a33"],
};

export function ProjectOverviewSection() {
  return (
    <section
      aria-labelledby="project-overview-title"
      className="border-b-2 border-border-strong bg-background px-6 py-16 md:py-24"
      id="project-overview"
    >
      <div className="mx-auto grid max-w-screen-xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div className="flex flex-col justify-between border-2 border-border-strong bg-surface p-6 md:p-8">
          <div>
            <p className="font-mono text-xs uppercase text-accent">
              {projectOverviewContent.eyebrow}
            </p>
            <h2
              className="mt-4 max-w-3xl font-display text-4xl uppercase leading-none md:text-6xl"
              id="project-overview-title"
            >
              {projectOverviewContent.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-text-secondary md:text-lg">
              {projectOverviewContent.description}
            </p>
          </div>

          <dl className="mt-10 grid gap-0 border-2 border-border-strong bg-background sm:grid-cols-2">
            {projectOverviewContent.deliveryFacts.map((fact) => (
              <div className="border-border-strong p-4 odd:border-b sm:odd:border-r" key={fact}>
                <dt className="font-mono text-[0.7rem] uppercase text-text-tertiary">Brief</dt>
                <dd className="mt-1 text-sm font-bold uppercase">{fact}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-6">
          <div className="border-2 border-border-strong">
            <div className="flex items-center justify-between border-b-2 border-border-strong bg-primary px-5 py-4 text-background">
              <div>
                <p className="font-mono text-xs uppercase text-text-tertiary">Input Boundary</p>
                <h3 className="font-display text-2xl uppercase">Matrix Preview</h3>
              </div>
              <SquareStack aria-hidden="true" className="h-6 w-6" strokeWidth={2.5} />
            </div>

            <div className="grid gap-4 p-5 md:p-6">
              {projectOverviewContent.matrixOptions.map((option, index) => (
                <details
                  className="group border-2 border-border-strong bg-background"
                  key={option.size}
                  name="matrix-preview"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold uppercase transition-colors marker:content-none group-open:bg-primary group-open:text-background hover:bg-surface-raised [&::-webkit-details-marker]:hidden">
                    <span>{option.label}</span>
                    <span className="font-mono text-xs">
                      {option.size}x{option.size}
                    </span>
                  </summary>
                  <div className="grid gap-5 border-t-2 border-border-strong p-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
                    <p className="text-sm leading-6 text-text-secondary">{option.description}</p>
                    <MatrixPreview size={option.size} />
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="border-2 border-border-strong">
              <div className="flex items-center gap-3 border-b-2 border-border-strong px-5 py-4">
                <ListChecks aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={2.5} />
                <h3 className="font-display text-xl uppercase">Required Outcomes</h3>
              </div>
              <div className="divide-y-2 divide-border-strong">
                {projectOverviewContent.requirements.map((requirement) => (
                  <details
                    className="group bg-background"
                    key={requirement.id}
                    name="project-requirement"
                    open={requirement.order === 1}
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 text-left transition-colors marker:content-none group-open:bg-primary group-open:text-background hover:bg-surface [&::-webkit-details-marker]:hidden">
                      <span className="font-mono text-xs">
                        {requirement.order.toString().padStart(2, "0")}
                      </span>
                      <span className="text-sm font-bold uppercase">{requirement.shortLabel}</span>
                    </summary>
                    <div className="border-t-2 border-border-strong bg-surface p-5">
                      <p className="font-mono text-xs uppercase text-accent">
                        Requirement {requirement.order}
                      </p>
                      <h4 className="mt-3 font-display text-2xl uppercase leading-tight">
                        {requirement.title}
                      </h4>
                      <p className="mt-4 text-sm leading-6 text-text-secondary">
                        {requirement.detail}
                      </p>
                      <div className="mt-5 flex items-start gap-3 border-t-2 border-border-strong pt-4">
                        <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 text-accent" />
                        <p className="text-sm font-semibold leading-6">{requirement.acceptance}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <aside className="border-2 border-border-strong bg-surface p-6">
              <p className="font-mono text-xs uppercase text-accent">Interaction Contract</p>
              <h3 className="mt-3 font-display text-3xl uppercase leading-tight">
                Scope first. Calculator later.
              </h3>
              <p className="mt-5 text-base leading-7 text-text-secondary">
                This overview makes the assignment brief explorable before the matrix engine exists.
                Each disclosure maps a future user-facing result to an acceptance checkpoint.
              </p>
            </aside>
          </div>

          <div className="flex items-center gap-3 border-2 border-border-strong bg-background px-5 py-4">
            <Rows3 aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={2.5} />
            <p className="text-sm font-semibold uppercase">
              This section defines scope only. Calculation logic stays in the future matrix feature.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MatrixPreview({ size }: Readonly<{ size: MatrixPreviewMode }>) {
  return (
    <div
      aria-label={`${size} by ${size} matrix preview`}
      className="grid min-h-48 items-center border-2 border-border-strong bg-surface p-4"
    >
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {matrixCellValues[size].map((cell) => (
          <div
            className="flex aspect-square items-center justify-center border-2 border-border-medium bg-background font-mono text-sm uppercase text-text-secondary"
            key={cell}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}
