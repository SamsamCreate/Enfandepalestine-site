export interface ProductCategory {
  slug: string;
  label: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { slug: "tshirt", label: "T-shirt" },
  { slug: "longsleeve", label: "Longsleeve" },
  { slug: "maillots", label: "Maillots" },
  { slug: "accessoires", label: "Accessoires" },
];

export interface Product {
  slug: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  inStock: boolean;
  sizes: string[];
  /** Sizes listed but out of stock: shown greyed and struck through, not selectable. */
  unavailableSizes?: string[];
  formatsLabel: string;
  description: string;
  /** Accordion content — left undefined to fall back to a placeholder until written per product. */
  detail?: string;
  sizeGuide?: string;
  images: string[];
  /** Swatch colour shown on the product card, top-right. Omit to hide the swatch. */
  color?: string;
  /** Human-readable name for `color`, used as the swatch's aria-label. */
  colorLabel?: string;
  /** Card label, top-left. Defaults to "NEW IN" in ProductCard; pass "" to hide it. */
  label?: string;
}

const COLOR_NAMES: Record<string, string> = {
  "#7A6666": "Brun rosé",
  "#3F3B38": "Anthracite",
  "#A8998C": "Beige taupe",
  "#C9C2B8": "Beige clair",
  "#B7ACA3": "Taupe",
};

export const PRODUCTS: Product[] = [
  {
    slug: "demain-tout-ira-mieux",
    name: "T-shirt - Demain tout ira mieux",
    category: "tshirt",
    price: 40,
    currency: " €",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    formatsLabel: "S / M / L / XL",
    description:
      "T-shirt en coton biologique épais, sérigraphie artisanale sur la poitrine. Une pièce du quotidien pensée pour porter un message d'espoir.",
    images: ["#7A6666", "#3F3B38", "#A8998C"],
    color: "#7A6666",
    colorLabel: COLOR_NAMES["#7A6666"],
  },
  {
    slug: "kids-have-dreams-too",
    name: "Marinière - Kids have dreams too",
    category: "longsleeve",
    price: 55,
    currency: " €",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    formatsLabel: "S / M / L / XL",
    description:
      "Marinière en jersey épais rayé, brodée sur le devant. Un clin d'œil au vestiaire intemporel, réinterprété pour porter la cause palestinienne.",
    images: ["#3F3B38", "#A8998C", "#C9C2B8"],
    color: "#3F3B38",
    colorLabel: COLOR_NAMES["#3F3B38"],
  },
  {
    slug: "on-ne-part-pas",
    name: "T-shirt - On ne part pas",
    category: "tshirt",
    price: 40,
    currency: " €",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    formatsLabel: "S / M / L / XL",
    description:
      "T-shirt en coton biologique épais, sérigraphie artisanale dans le dos. Une déclaration d'attachement à la terre et à la mémoire.",
    images: ["#A8998C", "#C9C2B8", "#7A6666"],
    color: "#A8998C",
    colorLabel: COLOR_NAMES["#A8998C"],
  },
  {
    slug: "terre-et-memoire",
    name: "Hoodie - Terre et mémoire",
    category: "longsleeve",
    price: 75,
    currency: " €",
    inStock: false,
    sizes: ["S", "M", "L", "XL"],
    formatsLabel: "S / M / L / XL",
    description:
      "Hoodie épais en molleton gratté, brodé sur la poitrine. Une pièce chaude conçue pour durer, pensée comme un objet de transmission.",
    images: ["#C9C2B8", "#7A6666", "#3F3B38"],
    color: "#C9C2B8",
    colorLabel: COLOR_NAMES["#C9C2B8"],
  },
  {
    slug: "racines",
    name: "T-shirt - Racines",
    category: "tshirt",
    price: 40,
    currency: " €",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    formatsLabel: "S / M / L / XL",
    description:
      "T-shirt en coton biologique épais, illustration inspirée des motifs traditionnels palestiniens brodés au tatreez.",
    images: ["#B7ACA3", "#3F3B38", "#A8998C"],
    color: "#B7ACA3",
    colorLabel: COLOR_NAMES["#B7ACA3"],
  },
  {
    slug: "memoire-vivante",
    name: "Sweat - Mémoire vivante",
    category: "longsleeve",
    price: 65,
    currency: " €",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    formatsLabel: "S / M / L / XL",
    description:
      "Sweat en molleton léger, sérigraphie sur la poitrine. Confortable au quotidien, pensé pour accompagner et transmettre une histoire.",
    images: ["#7A6666", "#C9C2B8", "#B7ACA3"],
    color: "#7A6666",
    colorLabel: COLOR_NAMES["#7A6666"],
  },
  {
    slug: "olivier",
    name: "Casquette - Olivier",
    category: "accessoires",
    price: 30,
    currency: " €",
    inStock: true,
    sizes: ["Taille unique"],
    formatsLabel: "Taille unique",
    description:
      "Casquette brodée d'une branche d'olivier, symbole de paix et d'enracinement. Visière incurvée, fermeture ajustable à l'arrière.",
    images: ["#3F3B38", "#A8998C", "#7A6666"],
    color: "#3F3B38",
    colorLabel: COLOR_NAMES["#3F3B38"],
  },
  {
    slug: "liberte",
    name: "T-shirt - Liberté",
    category: "tshirt",
    price: 40,
    currency: " €",
    inStock: false,
    sizes: ["S", "M", "L", "XL"],
    formatsLabel: "S / M / L / XL",
    description:
      "T-shirt en coton biologique épais, sérigraphie artisanale sur la poitrine. Une pièce simple pour porter un mot fort.",
    images: ["#A8998C", "#7A6666", "#C9C2B8"],
    color: "#A8998C",
    colorLabel: COLOR_NAMES["#A8998C"],
  },
  {
    slug: "enfance",
    name: "Marinière - Enfance",
    category: "longsleeve",
    price: 55,
    currency: " €",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    formatsLabel: "S / M / L / XL",
    description:
      "Marinière en jersey épais rayé, brodée sur le devant. Un hommage à l'enfance palestinienne, entre douceur et résistance.",
    images: ["#C9C2B8", "#B7ACA3", "#3F3B38"],
    color: "#C9C2B8",
    colorLabel: COLOR_NAMES["#C9C2B8"],
  },
  {
    slug: "retour",
    name: "Hoodie - Retour",
    category: "longsleeve",
    price: 75,
    currency: " €",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    formatsLabel: "S / M / L / XL",
    description:
      "Hoodie épais en molleton gratté, brodé sur la poitrine. Une pièce chaude qui porte l'idée du droit au retour.",
    images: ["#7A6666", "#3F3B38", "#C9C2B8"],
    color: "#7A6666",
    colorLabel: COLOR_NAMES["#7A6666"],
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}
