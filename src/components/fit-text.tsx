"use client";

import { useFitText } from "@/lib/use-fit-text";
import { cn } from "@/lib/utils";

/**
 * Text that scales down rather than breaking inside a word. See `useFitText`.
 *
 * In `words` mode, mark each unbreakable word inside with `data-fit-word` and
 * `whitespace-nowrap`.
 */
export function FitText({
  as: Tag = "span",
  mode = "line",
  container = "self",
  fitKey,
  className,
  children,
  ...rest
}: {
  as?: "span" | "p" | "div";
  mode?: "line" | "words";
  container?: "self" | "marker";
  /** Changes whenever the displayed text or its base size changes. */
  fitKey?: unknown;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useFitText({
    mode,
    container,
    content: fitKey ?? (typeof children === "string" ? children : undefined),
  });
  return (
    <Tag ref={ref} className={cn(mode === "line" && "whitespace-nowrap", className)} {...rest}>
      {children}
    </Tag>
  );
}
