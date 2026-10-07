export interface NavLink {
  label: string;
  href: string;
  /** Permanent sub-links rendered under this entry (not a dropdown). */
  children?: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export type CurrencyCode = "EUR" | "USD" | "GBP" | (string & {});
