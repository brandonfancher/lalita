import { cn } from "@/lib/utils";

/**
 * The innermost enclosure of the Śrī Cakra: a downward triangle around the
 * bindu, inside a circle. It is the seat of Lalitā herself.
 */
export function YantraMark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="16" cy="16" r="14.5" />
      <circle cx="16" cy="16" r="11.75" strokeWidth={0.75} opacity={0.6} />
      <path d="M6.2 10.4h19.6L16 27.2z" />
      <circle cx="16" cy="15.6" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A small lotus bud, used as a section ornament. */
export function Lotus({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 14"
      width={size}
      height={(size * 14) / 24}
      fill="currentColor"
      className={className}
    >
      <path d="M12 .8c-2.7 3.1-2.9 7.6 0 11.9 2.9-4.3 2.7-8.8 0-11.9Z" />
      <path d="M11.2 12.9C7 12.6 3.4 9.8 1.8 5.6c4 .5 7.6 3.4 9.4 7.3Z" opacity={0.75} />
      <path d="M12.8 12.9c4.2-.3 7.8-3.1 9.4-7.3-4 .5-7.6 3.4-9.4 7.3Z" opacity={0.75} />
    </svg>
  );
}

/** A centred hairline rule with a lotus at its middle. */
export function Divider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-3 text-gold", className)}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line-strong" />
      <Lotus />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line-strong" />
    </div>
  );
}

/** Eyebrow label over a section heading, with a short vermilion rule. */
export function SectionHeading({
  eyebrow,
  children,
  count,
  id,
}: {
  eyebrow: string;
  children: React.ReactNode;
  count?: number;
  id?: string;
}) {
  return (
    <header className="mb-5">
      <p className="eyebrow mb-2 flex items-center gap-2 text-sindura">
        <span aria-hidden className="h-px w-6 bg-sindura/60" />
        {eyebrow}
      </p>
      <h2 id={id} className="display text-[1.75rem] leading-tight text-ink sm:text-[2rem]">
        {children}
        {count !== undefined && (
          <span className="numerals ml-2 align-middle text-lg text-ink-faint">({count})</span>
        )}
      </h2>
    </header>
  );
}
