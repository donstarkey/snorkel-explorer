// src/utils/imageValidation.ts
import { IMAGE_DEBUG } from "../utils/imageConfig";

export type RawImagePath = string; // relative or full, pre‑resolver

export function isFullUrl(path: string): boolean {
  return path.startsWith("http://") || path.startsWith("https://");
}

// Ensure we only store relative paths in state when possible
export function normalizeRelativePath(path: string | null | undefined): string | null {
  if (!path || typeof path !== "string") return null;

  // If full URL, strip protocol+host and keep path only
  try {
    if (isFullUrl(path)) {
      const url = new URL(path);
      if (IMAGE_DEBUG) console.log("[image] normalizeRelativePath stripped host:", {
        input: path,
        output: url.pathname,
      });
      return url.pathname;
    }
  } catch {
    if (IMAGE_DEBUG) console.warn("[image] invalid URL in normalizeRelativePath:", path);
    return null;
  }

  // Ensure leading slash
  if (!path.startsWith("/")) path = "/" + path;
  return path;
}
