import { MatrixCalculator } from "@/features/matrix/components/matrix-calculator";
import { Reveal } from "@/shared/components/motion/reveal";

export function MatrixCalculatorSection() {
  return (
    <section
      aria-labelledby="matrix-calculator-title"
      className="border-b-2 border-border-strong bg-background px-6 py-16 md:py-24"
      id="calculator"
    >
      <div className="mx-auto max-w-screen-xl">
        <Reveal className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,0.55fr)]">
          <div>
            <p className="font-mono text-xs uppercase text-accent">Live Workbench</p>
            <h2
              className="mt-4 max-w-4xl font-display text-5xl uppercase leading-none md:text-7xl"
              id="matrix-calculator-title"
            >
              Matrix Input That Calculates.
            </h2>
          </div>
          <p className="self-end text-base leading-7 text-text-secondary md:text-lg">
            The assignment flow is now usable: create a 2x2 or 3x3 matrix, calculate eigenvalues,
            eigenvectors, the diagonalization verdict, and the P, P^-1, D matrices when available.
          </p>
        </Reveal>

        <Reveal transition={{ delay: 0.08 }}>
          <MatrixCalculator />
        </Reveal>
      </div>
    </section>
  );
}
