import type { APIRoute } from 'astro';
import { assetUrl } from '../data/profile';
// On project Pages this is below the origin root; page-level robots remain authoritative.
export const GET: APIRoute = ({ site }) => new Response(
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL(assetUrl('sitemap.xml'), site)}\n`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
