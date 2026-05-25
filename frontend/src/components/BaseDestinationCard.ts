// src/components/BaseDestinationCard.ts

export interface ImageObject {
  url?: string;
}

export interface Destination {
  id: number | string;
  name: string;
  country: string;
  primaryImage?: string | ImageObject | null;
  heroImages?: Array<string | ImageObject> | null;
}

export interface ResolvedDestinationImages {
  primary: string | null;
  heroImages: string[];
}

export default function BaseDestinationCard(
  destination: Destination
): ResolvedDestinationImages {
  const resolveImage = (img: string | ImageObject | null | undefined): string | null => {
    if (!img) return null;
    if (typeof img === "string") return img;
    if (typeof img === "object") return img.url ?? null;
    return null;
  };

  const primary = resolveImage(destination?.primaryImage);

  const heroImages = Array.isArray(destination?.heroImages)
    ? destination.heroImages
        .map(resolveImage)
        .filter((x): x is string => typeof x === "string")
    : [];

  return { primary, heroImages };
}
