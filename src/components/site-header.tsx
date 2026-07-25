"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, List, Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/shlokas", label: "Shlokas", icon: List },
  { href: "/namas", label: "Names", icon: BookOpen },
  { href: "/learn", label: "Learn", icon: BookOpen },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Read the theme the pre-paint script already applied, so the button's first
  // press always moves away from what is actually on screen.
  useEffect(() => {
    const applied = document.documentElement.dataset.theme as "dark" | "light" | undefined;
    const stored = (localStorage.getItem("theme") as "dark" | "light" | null) ?? undefined;
    const current = applied ?? stored ?? "dark";
    document.documentElement.dataset.theme = current;
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-surface-0/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-sindura to-lotus text-[13px] font-semibold text-white shadow-sm"
          >
            श्री
          </span>
          <span className="display hidden text-lg font-medium tracking-wide text-ink sm:inline">
            Lalitā Sahasranāma
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-surface-2 text-ink"
                    : "text-ink-muted hover:bg-surface-1 hover:text-ink",
                )}
              >
                {label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle colour theme"
            className="ml-1 grid h-8 w-8 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-1 hover:text-ink"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
