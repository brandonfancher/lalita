"use client";

import NextLink from "next/link";
import { useState, type ComponentProps } from "react";

/**
 * `next/link` that prefetches only once the reader shows intent: a pointer
 * over the link, keyboard focus, or a touch. By default every link that
 * scrolls into view is prefetched, and each prefetch that misses the regional
 * CDN is billed as an ISR read, so the header, the footer, and long lists
 * (all thousand names, every shloka) cost far more than the pages people open.
 *
 * Passing `prefetch` explicitly restores `next/link`'s own behaviour, for the
 * few links that are very likely to be followed, such as previous and next.
 */
export default function Link({
  prefetch,
  onMouseEnter,
  onTouchStart,
  onFocus,
  ...props
}: ComponentProps<typeof NextLink>) {
  const [intent, setIntent] = useState(false);

  if (prefetch !== undefined) {
    return (
      <NextLink
        prefetch={prefetch}
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouchStart}
        onFocus={onFocus}
        {...props}
      />
    );
  }

  return (
    <NextLink
      prefetch={intent ? null : false}
      onMouseEnter={(e) => {
        setIntent(true);
        onMouseEnter?.(e);
      }}
      onTouchStart={(e) => {
        setIntent(true);
        onTouchStart?.(e);
      }}
      onFocus={(e) => {
        setIntent(true);
        onFocus?.(e);
      }}
      {...props}
    />
  );
}
