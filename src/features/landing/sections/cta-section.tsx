import Link from "next/link";
import { routes } from "@/shared/constants/routes";

export function CtaSection() {
  return (
    <section className="bg-background px-6 py-16 md:py-24" id="cta">
      <div className="mx-auto grid max-w-screen-xl gap-6 border-2 border-border-strong bg-primary p-6 text-background md:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase text-accent">Ready To Test</p>
          <h2 className="mt-4 max-w-3xl break-words font-display text-4xl uppercase leading-none md:text-7xl">
            Run The Matrix Workbench.
          </h2>
        </div>
        <Link
          className="inline-flex items-center justify-center border-2 border-background bg-background px-7 py-3.5 text-sm font-black uppercase tracking-[0.06em] text-primary transition-colors hover:border-accent hover:bg-accent hover:text-background"
          href={routes.calculator}
        >
          Start Calculating
        </Link>
      </div>
    </section>
  );
}
