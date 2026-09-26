"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

import { YantraMark } from "@/components/ornament";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/shlokas", label: "Shlokas", match: ["/shlokas", "/shloka"] },
  { href: "/practice", label: "Practice", match: ["/practice"] },
  { href: "/namas", label: "Names", match: ["/namas"] },
  { href: "/learn", label: "Learn", match: ["/learn"] },
];

export function SiteHeader() {
  const pathname = usePathname();

  // Read from the DOM rather than React state: the pre-paint script owns the
  // initial theme, and CSS picks the icon from the same attribute.
  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  return (
    <header className="relative z-50 border-b border-line">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 max-[359px]:gap-2 max-[359px]:px-3 sm:h-[4.5rem] sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <YantraMark
            size={30}
            className="text-sindura transition-transform duration-500 group-hover:rotate-[60deg] max-[359px]:size-7"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="display text-[1.3rem] tracking-wide text-ink">Lalitā Sahasranāma</span>
            <span className="eyebrow mt-1 text-[0.6rem] text-ink-faint">A study of the thousand names</span>
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-0.5 font-sans sm:gap-1">
          {LINKS.map(({ href, label, match }) => {
            const active = match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-2.5 py-2 text-[13px] font-medium tracking-wide transition-colors max-[359px]:px-1.5 max-[359px]:text-xs sm:px-3 sm:text-sm",
                  active ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-2.5 -bottom-px h-px bg-sindura transition-opacity max-[359px]:inset-x-1.5 sm:inset-x-3",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            className="ml-1 grid h-9 w-9 place-items-center rounded-full max-[359px]:ml-0 max-[359px]:h-8 max-[359px]:w-8 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <Sun size={16} className="hidden dark:block" />
            <Moon size={16} className="block dark:hidden" />
          </button>
        </nav>
      </div>
    </header>
  );
}
