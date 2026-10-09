export interface HeroSlide {
  id: string;
  /** Photo URL, or a hex colour used as a placeholder until the real photo exists. */
  image: string;
  /** Optional portrait photo used below 768px. */
  mobileImage?: string;
  alt?: string;
  caption?: string;
  /** Defaults to "Voir les produits"; set to "" to hide the button. */
  ctaLabel?: string;
  /** Defaults to "/produits". */
  ctaHref?: string;
  /** Hidden unless a label is set. */
  secondaryLabel?: string;
  secondaryHref?: string;
}

export const HERO_SETTINGS = {
  autoplay: true,
  slideDurationMs: 6000,
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "photo-de-classe",
    image: "/images/IMGm427.jpg",
    mobileImage: "/images/IMGm427-portrait.jpg",
    alt: "Enfan de Palestine",
  },
  { id: "aplat-taupe", image: "#7A6666" },
  { id: "aplat-gris", image: "#4D4949" },
];
