import Link from "next/link";
import { routes } from "@/shared/constants/routes";

const navItems = [
  { href: routes.assignmentOverview, label: "Assignment" },
  { href: routes.features, label: "Features" },
  { href: routes.technicalStack, label: "Stack" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b-2 border-border-strong bg-background">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4">
        <Link className="font-display text-xl uppercase" href={routes.home}>
          CSS114
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              className="text-sm font-bold uppercase tracking-[0.06em]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
