"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const TABS = [
  { href: "/namas/list", label: "List" },
  { href: "/namas/recite", label: "Recite" },
];

/** Switches between looking the names up and reciting them. */
export function NamaTabs() {
  const pathname = usePathname();

  return (
    <nav aria-label="Names" className="flex gap-1 border-b border-line font-sans">
      {TABS.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative px-3 py-2.5 text-sm font-medium tracking-wide transition-colors",
              active ? "text-ink" : "text-ink-muted hover:text-ink",
            )}
          >
            {label}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-3 -bottom-px h-0.5 bg-sindura transition-opacity",
                active ? "opacity-100" : "opacity-0",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
