export interface Archive {
  slug: string;
  number: string;
  title: string;
  type: string;
  color?: string;
  description?: string;
  image: string;
  collectionSlug?: string;
}

export const ARCHIVES: Archive[] = [
  {
    slug: "green-jacket-its-not-about-us",
    number: "01",
    title: "GREEN JACKET ITS NOT ABOUT US",
    type: "Veste",
    color: "Vert",
    description: "It's not about us, it's about Humanity.",
    image: "#7A6666",
  },
  {
    slug: "red-jacket-its-not-about-us",
    number: "02",
    title: "RED JACKET ITS NOT ABOUT US",
    type: "Veste",
    color: "Rouge",
    description: "It's not about us, it's about Humanity.",
    image: "#4D4949",
  },
  {
    slug: "jogging-handala",
    number: "03",
    title: "JOGGING HANDALA",
    type: "Jogging",
    image: "#B7ACA3",
  },
  {
    slug: "longsleeve-mascotte-black",
    number: "04",
    title: "LONGSLEEVE MASCOTTE BLACK",
    type: "Longsleeve",
    color: "Noir",
    image: "#C9C2B8",
  },
  {
    slug: "longsleeve-mascotte-red",
    number: "05",
    title: "LONGSLEEVE MASCOTTE RED",
    type: "Longsleeve",
    color: "Rouge",
    image: "#7A6666",
  },
  {
    slug: "longsleeve-mascotte-green",
    number: "06",
    title: "LONGSLEEVE MASCOTTE GREEN",
    type: "Longsleeve",
    color: "Vert",
    image: "#4D4949",
  },
  {
    slug: "red-handala-tee",
    number: "07",
    title: "RED HANDALA TEE",
    type: "T-shirt",
    color: "Rouge",
    image: "#B7ACA3",
  },
];

export function getArchiveBySlug(slug: string | null | undefined) {
  return ARCHIVES.find((archive) => archive.slug === slug);
}
