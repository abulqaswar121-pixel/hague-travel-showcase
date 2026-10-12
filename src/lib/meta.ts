interface MetaOptions {
  title: string;
  description: string;
  ogType?: "website" | "article";
  image?: string;
  /** e.g. "noindex" for demo or missing-record pages. */
  robots?: string;
}

/**
 * Every route calls head() with a unique title + description. The root title
 * template is not used because TanStack Start writes the literal <title>.
 */
export function meta({ title, description, ogType = "website", image, robots }: MetaOptions) {
  const fullTitle = `${title} | Hague Travel`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:site_name", content: "Hague Travel" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      ...(image
        ? [
            { property: "og:image", content: image },
            { name: "twitter:image", content: image },
          ]
        : []),
      { name: "theme-color", content: "#0d2233" },
      ...(robots ? [{ name: "robots", content: robots }] : []),
    ],
    links: image ? [{ rel: "image_src", href: image }] : [],
  };
}

/** Convenience wrapper so route files stay short: `head: pageMeta({...})`. */
export function pageMeta(
  title: string,
  description: string,
  extra: Omit<Partial<MetaOptions>, "title" | "description"> = {},
) {
  return () => meta({ title, description, ...extra });
}
