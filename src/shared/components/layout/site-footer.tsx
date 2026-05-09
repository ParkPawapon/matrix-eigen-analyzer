export function SiteFooter() {
  return (
    <footer className="border-t-2 border-border-strong bg-background">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-2 px-6 py-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs uppercase text-text-secondary">EigenScope</p>
        <p className="font-mono text-xs text-text-tertiary">
          © 2026 EigenScope. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
