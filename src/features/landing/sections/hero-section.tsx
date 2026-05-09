import Image from "next/image";
import Link from "next/link";
import { landingContent } from "@/features/landing/data/landing-content";
import { DisplayHeading } from "@/shared/components/typography/display-heading";
import { routes } from "@/shared/constants/routes";

export function HeroSection() {
  return (
    <section className="flex min-h-[calc(100vh-4.375rem)] items-center border-b-2 border-border-strong bg-background px-6 py-12 md:py-20">
      <div className="mx-auto grid max-w-screen-xl gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-stretch">
        <div className="flex min-h-[32rem] flex-col justify-between border-2 border-border-strong bg-primary p-6 text-background md:p-8">
          <div className="flex items-center justify-between gap-6 border-b-2 border-background pb-5">
            <p className="font-mono text-xs uppercase text-text-tertiary">
              CSS114 / Matrix Diagonalization
            </p>
            <Image
              alt=""
              aria-hidden="true"
              className="h-12 w-12 rounded-full border-2 border-background object-cover"
              height={48}
              priority
              src="/brand/site-logo.png"
              width={48}
            />
          </div>

          <div className="py-10">
            <DisplayHeading className="text-background">{landingContent.title}</DisplayHeading>
            <p className="mt-6 max-w-3xl text-xl font-semibold leading-8 text-surface-raised md:text-2xl">
              {landingContent.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t-2 border-background pt-5">
            <Link
              className="inline-flex items-center justify-center border-2 border-background bg-background px-6 py-3 text-sm font-black uppercase tracking-[0.06em] text-primary transition-colors hover:border-accent hover:bg-accent hover:text-background"
              href={routes.calculator}
            >
              Open Calculator
            </Link>
            <Link
              className="inline-flex items-center justify-center border-2 border-background px-6 py-3 text-sm font-black uppercase tracking-[0.06em] text-background transition-colors hover:bg-background hover:text-primary"
              href={routes.projectOverview}
            >
              Read Brief
            </Link>
          </div>
        </div>

        <aside className="grid border-2 border-border-strong bg-surface">
          <div className="border-b-2 border-border-strong p-6">
            <p className="font-mono text-xs uppercase text-accent">Now Interactive</p>
            <p className="mt-4 font-display text-4xl uppercase leading-none">2x2 / 3x3</p>
          </div>
          <div className="grid content-between gap-8 p-6">
            <div className="grid grid-cols-3 gap-2">
              {["a11", "a12", "a13", "a21", "a22", "a23", "a31", "a32", "a33"].map((cell) => (
                <div
                  className="flex aspect-square items-center justify-center border-2 border-border-strong bg-background font-mono text-xs font-bold uppercase text-text-secondary"
                  key={cell}
                >
                  {cell}
                </div>
              ))}
            </div>
            <div className="border-t-2 border-border-strong pt-5">
              <p className="font-mono text-xs uppercase text-text-secondary">Outputs</p>
              <p className="mt-3 text-lg font-black uppercase leading-7">
                eigenvalues / eigenvectors / diagonalizable verdict / P^-1 A P
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
