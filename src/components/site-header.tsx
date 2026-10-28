"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

import { YantraMark } from "@/components/ornament";
import { cn } from "@/lib/utils";

const LINKS = [
  {
    href: "/shlokas",
    label: "Shlokas",
    sanskrit: "Sūcī",
    blurb: "All 182 verses, each with its own study page",
    match: ["/shlokas", "/shloka"],
  },
  {
    href: "/chant",
    label: "Chant",
    sanskrit: "Pārāyaṇa",
    blurb: "Chant a range of shlokas on loop",
    match: ["/chant"],
  },
  {
    href: "/namas/list",
    label: "Names",
    sanskrit: "Nāmāvalī",
    blurb: "The thousand names, in order",
    match: ["/namas"],
  },
  {
    href: "/learn",
    label: "Learn",
    sanskrit: "Vyākaraṇa",
    blurb: "The letters, their sounds, and the grammar",
    match: ["/learn"],
  },
  {
    href: "/jam",
    label: "Jam",
    sanskrit: "Kīrtana",
    blurb: "Sing the names along with a kīrtan",
    match: ["/jam"],
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (match: string[]) =>
    match.some((m) => pathname === m || pathname.startsWith(`${m}/`));

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
          <span className="flex flex-col leading-none">
            <span className="display text-[1.2rem] tracking-wide text-ink sm:text-[1.3rem]">
              Lalitā Sahasranāma
            </span>
            <span className="eyebrow mt-1 hidden text-[0.6rem] text-ink-faint sm:block">
              A study of the thousand names
            </span>
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-1 font-sans">
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map(({ href, label, match }) => {
              const active = isActive(match);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium tracking-wide transition-colors",
                    active ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px bg-sindura transition-opacity",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink md:ml-1"
          >
            <Sun size={16} className="hidden dark:block" />
            <Moon size={16} className="block dark:hidden" />
          </button>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink md:hidden"
            >
              <Menu size={18} />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="nav-overlay fixed inset-0 z-50 bg-[rgb(20_12_7/0.45)] backdrop-blur-[2px] md:hidden" />
              <Dialog.Content
                aria-describedby={undefined}
                className="nav-drawer fixed inset-y-0 right-0 z-50 flex w-[min(21rem,88vw)] flex-col border-l border-line-strong bg-surface-0 shadow-[-20px_0_60px_-20px_rgba(40,20,10,0.5)] outline-none md:hidden"
              >
                <div className="flex h-16 items-center gap-3 border-b border-line px-5">
                  <YantraMark size={26} className="text-sindura" />
                  <Dialog.Title className="display text-[1.2rem] tracking-wide text-ink">
                    Lalitā Sahasranāma
                  </Dialog.Title>
                  <Dialog.Close
                    aria-label="Close menu"
                    className="ml-auto grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
                  >
                    <X size={18} />
                  </Dialog.Close>
                </div>

                <ul className="flex-1 overflow-y-auto px-3 py-3">
                  {LINKS.map(({ href, label, sanskrit, blurb, match }) => {
                    const active = isActive(match);
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "relative block rounded-sm py-3 pl-5 pr-3 transition-colors hover:bg-surface-1",
                            active && "bg-surface-1/70",
                          )}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "absolute inset-y-3 left-1.5 w-0.5 rounded-full bg-sindura transition-opacity",
                              active ? "opacity-100" : "opacity-0",
                            )}
                          />
                          <span className="eyebrow block text-sindura">{sanskrit}</span>
                          <span className="display mt-0.5 block text-[1.55rem] leading-tight text-ink">
                            {label}
                          </span>
                          <span className="mt-0.5 block text-[15px] italic leading-snug text-ink-faint">
                            {blurb}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <p className="deva border-t border-line px-5 py-4 text-center text-lg text-sindura">
                  ॥ श्रीमात्रे नमः ॥
                </p>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </nav>
      </div>
    </header>
  );
}
