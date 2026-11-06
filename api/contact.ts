import { submitContact } from "../src/lib/contact-submit";

/**
 * The contact form's endpoint: a Vercel Function beside the static site.
 * In `next dev`, `src/app/api/contact/route.dev.ts` answers for it.
 */
export async function POST(request: Request): Promise<Response> {
  const state = await submitContact(await request.formData(), Object.fromEntries(request.headers));
  return Response.json(state);
}
