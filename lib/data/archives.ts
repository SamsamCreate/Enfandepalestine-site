export interface Archive {
  slug: string;
  title: string;
  /** Display label, e.g. "MAI 2025". */
  date: string;
  context?: string;
  /** Photo URL, or a hex colour used as a placeholder until the real photo exists. */
  image: string;
}

export const ARCHIVES: Archive[] = [
  {
    slug: "not-about-us-but-about-humanity",
    title: "NOT ABOUT US BUT ABOUT HUMANITY",
    date: "MAI 2025",
    image: "#7A6666",
  },
  {
    slug: "red-jacket-its-not-about-us",
    title: "RED JACKET ITS NOT ABOUT US",
    date: "DATE À VENIR",
    image: "#4D4949",
  },
  {
    slug: "jogging-handala",
    title: "JOGGING HANDALA",
    date: "DATE À VENIR",
    image: "#6B5E5B",
  },
  {
    slug: "longsleeve-mascotte-black",
    title: "LONGSLEEVE MASCOTTE BLACK",
    date: "DATE À VENIR",
    image: "#3F3B38",
  },
  {
    slug: "longsleeve-mascotte-red",
    title: "LONGSLEEVE MASCOTTE RED",
    date: "DATE À VENIR",
    image: "#85706C",
  },
  {
    slug: "longsleeve-mascotte-green",
    title: "LONGSLEEVE MASCOTTE GREEN",
    date: "DATE À VENIR",
    image: "#5A5454",
  },
  {
    slug: "red-handala-tee",
    title: "RED HANDALA TEE",
    date: "DATE À VENIR",
    image: "#6E6262",
  },
];
