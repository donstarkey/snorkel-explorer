// src/utils/imageResolver.ts
import { DEV_API, PROD_API, IMAGE_DEBUG, isTrustedFullUrl } from "./imageConfig";

export function resolveImage(path: string | null | undefined): string {
  if (!path || typeof path !== "string") {
    if (IMAGE_DEBUG) console.warn("[image] empty or invalid path → placeholder");
    return `${DEV_API}/images/placeholder.jpg`;
  }

  // ⭐ If DB gives full URL or full server path → TRUST IT
  if (path.startsWith("http://") || path.startsWith("https://")) {
    if (isTrustedFullUrl(path)) {
      if (IMAGE_DEBUG) console.log("[image] trusted full URL:", path);
      return path;
    }

    if (IMAGE_DEBUG) console.warn("[image] BLOCKED untrusted full URL:", path);
    return `${DEV_API}/images/placeholder.jpg`;
  }

  // ⭐ If DB gives a full server path like "/images/roatan/hero1.jpg"
  if (path.startsWith("/images/")) {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    const base = isLocal ? DEV_API : PROD_API;
    const finalUrl = `${base}${path}`;

    if (IMAGE_DEBUG) console.log("[image] resolved full server path:", finalUrl);
    return finalUrl;
  }

  // ⭐ Fallback: DB gave a bare filename like "hero1.jpg"
  // (rare in your system now, but safe)
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const base = isLocal ? DEV_API : PROD_API;
  const finalUrl = `${base}/images/${path}`;

  if (IMAGE_DEBUG) console.log("[image] resolved bare filename:", finalUrl);
  return finalUrl;
}
