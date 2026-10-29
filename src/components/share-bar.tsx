"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";
import { Check, Link as LinkIcon, Mail, Share2 } from "lucide-react";

import { BRAND_PATHS } from "@/components/brand-paths";
import { cn } from "@/lib/utils";

/** What a page offers to whoever it is sent to; built on the server by `lib/share`. */
export type ShareContent = {
  /** What is being shared, for analytics: "shloka", "nama", or a page name. */
  kind: string;
  url: string;
  title: string;
  /** The full message: for chat apps, email, and the system share sheet. */
  text: string;
  /** A version short enough for X. */
  shortText: string;
};

type Channel = "native" | "whatsapp" | "telegram" | "x" | "facebook" | "email" | "copy";

/** WhatsApp shows *asterisks* as bold; nowhere else does. */
const plain = (text: string) => text.replace(/\*([^*\n]+)\*/g, "$1");

const withUrl = (text: string, url: string) => `${text}\n\n${url}`;

function href(channel: Channel, s: ShareContent): string | null {
  const e = encodeURIComponent;
  switch (channel) {
    case "whatsapp":
      return `https://wa.me/?text=${e(withUrl(s.text, s.url))}`;
    case "telegram":
      return `https://t.me/share/url?url=${e(s.url)}&text=${e(plain(s.text))}`;
    case "x":
      return `https://x.com/intent/post?text=${e(s.shortText)}&url=${e(s.url)}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${e(s.url)}`;
    case "email":
      return `mailto:?subject=${e(s.title)}&body=${e(withUrl(plain(s.text), s.url))}`;
    default:
      return null;
  }
}

function Brand({ name }: { name: keyof typeof BRAND_PATHS }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
      <path d={BRAND_PATHS[name]} />
    </svg>
  );
}

const ICON_LINKS: { channel: Exclude<Channel, "native" | "copy" | "whatsapp">; label: string; icon: React.ReactNode }[] = [
  { channel: "telegram", label: "Telegram", icon: <Brand name="telegram" /> },
  { channel: "x", label: "X", icon: <Brand name="x" /> },
  { channel: "facebook", label: "Facebook", icon: <Brand name="facebook" /> },
  { channel: "email", label: "Email", icon: <Mail size={15} aria-hidden /> },
];

/**
 * Ways to pass a page on. WhatsApp comes first because that is where most of
 * these links travel; on phones the system share sheet covers everything else.
 */
export function ShareBar({ share, label, className }: { share: ShareContent; label?: string; className?: string }) {
  const [canNative, setCanNative] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Only touch devices: desktop share sheets are sparse, and the buttons below do better there.
    const touch = matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the share sheet only exists in the browser
    setCanNative(touch && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const sent = (channel: Channel) => track("Share", { channel, kind: share.kind });

  const nativeShare = async () => {
    try {
      await navigator.share({ title: share.title, text: plain(share.text), url: share.url });
      sent("native");
    } catch {
      // Dismissed.
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(share.url);
      setCopied(true);
      sent("copy");
    } catch {
      window.prompt("Copy this link", share.url);
    }
  };

  const pill =
    "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium tracking-wide transition-colors";
  const round =
    "grid h-9 w-9 place-items-center rounded-full border border-line-strong text-ink-muted transition-colors hover:border-sindura/60 hover:bg-surface-1 hover:text-ink";

  return (
    <div className={cn("flex flex-wrap items-center gap-2 font-sans", className)}>
      {label && <span className="eyebrow mr-1 text-ink-faint">{label}</span>}
      {canNative && (
        <button type="button" onClick={nativeShare} className={cn(pill, "border-sindura bg-sindura text-on-sindura hover:bg-sindura-soft")}>
          <Share2 size={15} aria-hidden />
          Share
        </button>
      )}
      <a
        href={href("whatsapp", share)!}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sent("whatsapp")}
        className={cn(
          pill,
          canNative
            ? "border-line-strong text-ink hover:bg-surface-1"
            : "border-sindura bg-sindura text-on-sindura hover:bg-sindura-soft",
        )}
      >
        <Brand name="whatsapp" />
        WhatsApp
      </a>
      {ICON_LINKS.map(({ channel, label: name, icon }) => (
        <a
          key={channel}
          href={href(channel, share)!}
          target={channel === "email" ? undefined : "_blank"}
          rel="noopener noreferrer"
          onClick={() => sent(channel)}
          aria-label={channel === "email" ? "Send by email" : `Share on ${name}`}
          title={name}
          className={round}
        >
          {icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className={cn(pill, "border-line-strong text-ink-muted hover:bg-surface-1 hover:text-ink")}
        aria-live="polite"
      >
        {copied ? <Check size={15} aria-hidden className="text-leaf" /> : <LinkIcon size={15} aria-hidden />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
