/**
 * Centralised allowlist of the YouTube / Google domains required to embed
 * YouTube videos and load their thumbnails.
 *
 * Each domain is grouped by the Content-Security-Policy directive it belongs
 * to, so the policy we ship stays in sync with what the YouTube IFrame player
 * actually requests at runtime:
 *
 *   - youtube.com / www.youtube.com / m.youtube.com  → the player document (frame)
 *   - www.youtube.com                                → the player scripts
 *   - i.ytimg.com                                    → video thumbnails / static images
 *   - youtubei.googleapis.com                        → the player's internal API calls
 *   - *.googlevideo.com                              → the actual video/audio streams
 *
 * This is the single source of truth: `next.config.ts` derives both the CSP
 * header and the `next/image` remote patterns from the exports below.
 */

/** Origins that serve the embeddable player document (CSP `frame-src`). */
export const YOUTUBE_FRAME_DOMAINS = [
  "https://youtube.com",
  "https://www.youtube.com",
  "https://m.youtube.com",
] as const;

/** Origins that serve the player's scripts (CSP `script-src`). */
export const YOUTUBE_SCRIPT_DOMAINS = ["https://www.youtube.com"] as const;

/** Origins that serve thumbnails and other static images (CSP `img-src`). */
export const YOUTUBE_IMAGE_DOMAINS = ["https://i.ytimg.com"] as const;

/** Origins the player streams video/audio media from (CSP `media-src`). */
export const YOUTUBE_MEDIA_DOMAINS = ["https://*.googlevideo.com"] as const;

/** Origins the player calls via fetch / XHR (CSP `connect-src`). */
export const YOUTUBE_CONNECT_DOMAINS = [
  "https://youtubei.googleapis.com",
  "https://*.googlevideo.com",
  "https://i.ytimg.com",
] as const;

/** Bare hostnames (no scheme) allowed as `next/image` remote sources. */
export const YOUTUBE_IMAGE_HOSTS = ["i.ytimg.com"] as const;

/** Flat, de-duplicated list of every allowlisted YouTube origin. */
export const YOUTUBE_ALLOWLIST: readonly string[] = Array.from(
  new Set<string>([
    ...YOUTUBE_FRAME_DOMAINS,
    ...YOUTUBE_SCRIPT_DOMAINS,
    ...YOUTUBE_IMAGE_DOMAINS,
    ...YOUTUBE_MEDIA_DOMAINS,
    ...YOUTUBE_CONNECT_DOMAINS,
  ]),
);

/**
 * Build the Content-Security-Policy string.
 *
 * The base directives stay deliberately permissive for the app's own assets
 * (self-hosted scripts/styles, inline styles from framer-motion, blob workers
 * from three.js, etc.) so adding the allowlist does not regress the existing
 * landing page — the YouTube origins are layered on top of each directive.
 */
export function buildContentSecurityPolicy(): string {
  const SELF = "'self'";

  const directives: Record<string, readonly string[]> = {
    "default-src": [SELF],
    "base-uri": [SELF],
    "object-src": ["'none'"],
    "frame-ancestors": [SELF],
    "script-src": [SELF, "'unsafe-inline'", "'unsafe-eval'", ...YOUTUBE_SCRIPT_DOMAINS],
    "style-src": [SELF, "'unsafe-inline'"],
    "img-src": [SELF, "data:", "blob:", ...YOUTUBE_IMAGE_DOMAINS],
    "font-src": [SELF, "data:"],
    "media-src": [SELF, "blob:", ...YOUTUBE_MEDIA_DOMAINS],
    "worker-src": [SELF, "blob:"],
    "frame-src": [SELF, ...YOUTUBE_FRAME_DOMAINS],
    "connect-src": [SELF, ...YOUTUBE_CONNECT_DOMAINS],
  };

  return Object.entries(directives)
    .map(([directive, values]) => `${directive} ${values.join(" ")}`)
    .join("; ");
}
