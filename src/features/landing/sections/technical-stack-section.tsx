import { Reveal } from "@/shared/components/motion/reveal";

const stackItems = [
  "Next.js App Router",
  "TypeScript",
  "Tailwind CSS",
  "MUI Theme",
  "Framer Motion",
  "Bun",
] as const;

export function TechnicalStackSection() {
  return (
    <section
      className="border-b-2 border-border-strong bg-surface px-6 py-16 md:py-24"
      id="technical-stack"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <Reveal>
            <p className="font-mono text-xs uppercase text-accent">Technical Stack</p>
            <h2 className="mt-4 max-w-[10ch] break-words font-display text-5xl uppercase leading-none md:text-6xl">
              Sharp Frontend. Typed Core.
            </h2>
          </Reveal>
          <div className="grid border-2 border-border-strong bg-background sm:grid-cols-2 lg:grid-cols-3">
            {stackItems.map((item, index) => (
              <Reveal
                className="min-h-32 border-b-2 border-border-strong p-5 sm:odd:border-r-2 lg:border-r-2 lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
                delay={0.03 + index * 0.025}
                key={item}
                variant="press"
              >
                <p className="font-mono text-xs uppercase text-text-tertiary">
                  {(index + 1).toString().padStart(2, "0")}
                </p>
                <p className="mt-5 text-lg font-black uppercase leading-tight">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
