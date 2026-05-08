import Link from "next/link";
import { routes } from "@/shared/constants/routes";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 py-24">
      <p className="font-mono text-sm uppercase text-text-secondary">404</p>
      <h1 className="mt-4 font-display text-4xl uppercase">Page not found</h1>
      <Link
        className="mt-8 inline-block border-2 border-border-strong px-5 py-3 font-bold uppercase"
        href={routes.home}
      >
        Return home
      </Link>
    </section>
  );
}
