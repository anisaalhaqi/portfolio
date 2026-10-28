import type { Metadata } from "next";

// Where the static export is hosted; preview image and page URLs resolve
// against it. Paths below already include the /portfolio base path.
export const SITE_URL = new URL("https://anisaalhaqi.github.io");

const SITE_NAME = "Anisa Aulia";
const PROFILE_IMAGE = { url: "/portfolio/icons/profile-picture.png", width: 400, height: 400 };

// Title, description, and link preview (LinkedIn, WhatsApp, X) for one page.
// Next replaces openGraph wholesale per page, so every page sets all of it.
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description?: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [image ? { url: image, alt: title } : { ...PROFILE_IMAGE, alt: SITE_NAME }],
    },
    twitter: { card: image ? "summary_large_image" : "summary" },
  };
}
