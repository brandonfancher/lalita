This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## How the site is built

Everything is generated at build time into static files (`output: "export"` in `next.config.ts`, written to `out/`), so pages are served straight from Vercel's CDN as plain files rather than from the ISR cache. `vercel.json` sets the project up as a static site ("Other" framework), with clean URLs, the redirects, and BotID's proxy rewrites. That means no page can read cookies, headers, or the query string on the server; anything per-visitor happens in the browser, as `/chant` does with its range.

## Contact form

The form at `/contact` posts to `/api/contact`, a Vercel Function (`api/contact.ts`) beside the static site. It checks [Vercel BotID](https://vercel.com/docs/botid), a hidden honeypot field, and the inputs (`src/lib/contact-submit.ts`), then emails the message through [Resend](https://resend.com) with the sender as reply-to. Under `pnpm dev`, `src/app/api/contact/route.dev.ts` answers for the function. BotID's client side is set up in `src/instrumentation-client.ts`; any new protected path has to be listed there as well as checked on the server.

Set these in the Vercel project (and in `.env.local` to send real email locally):

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | An API key from Resend, or added by the Resend integration in the Vercel Marketplace |
| `CONTACT_TO_EMAIL` | Where messages go; several addresses can be separated by commas |
| `CONTACT_FROM_EMAIL` | The sender, on a domain verified in Resend, e.g. `Lalitā Sahasranāma <contact@lalita.study>` |

Resend only sends from a domain you have verified, by adding the DNS records it lists under **Domains** to `lalita.study`.

Without these variables, `pnpm dev` logs each message to the terminal instead of sending it. In development BotID treats every visitor as human; run `BOTID_DEV_BYPASS=BAD-BOT pnpm dev` to see how a bot is turned away. On Vercel, test from the page itself: requests made with `curl` carry no BotID headers and are rejected. For stronger detection on a Pro or Enterprise plan, turn on **BotID Deep Analysis** under the project's **Firewall > Rules**.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
