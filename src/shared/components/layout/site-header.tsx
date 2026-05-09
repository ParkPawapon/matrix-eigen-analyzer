import Image from "next/image";
import Link from "next/link";
import { routes } from "@/shared/constants/routes";

const navItems = [
  { href: routes.calculator, label: "Calculator" },
  { href: routes.projectOverview, label: "Overview" },
  { href: routes.features, label: "Features" },
  { href: routes.technicalStack, label: "Stack" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b-2 border-border-strong bg-background">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4">
        <Link
          className="inline-flex items-center gap-3 font-display text-xl uppercase"
          href={routes.home}
        >
          <Image
            alt=""
            aria-hidden="true"
            className="h-9 w-9 rounded-full border-2 border-border-strong object-cover"
            height={36}
            priority
            src="/brand/site-logo.png"
            width={36}
          />
          EigenScope
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              className="relative inline-flex items-center py-2 text-sm font-black uppercase tracking-[0.06em] text-primary transition-colors duration-200 after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 after:ease-out hover:text-accent hover:after:scale-x-100 focus-visible:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:after:scale-x-100"
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
