"use client";

export default function Error({
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <section className="mx-auto max-w-screen-xl px-6 py-24">
      <p className="font-mono text-sm uppercase text-text-secondary">Runtime boundary</p>
      <h1 className="mt-4 font-display text-4xl uppercase">Something went wrong</h1>
      <button
        className="mt-8 border-2 border-border-strong px-5 py-3 font-bold uppercase"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </section>
  );
}
