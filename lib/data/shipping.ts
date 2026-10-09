/** Réglages "Livraison" — équivalent du groupe de réglages du thème. */
export const SHIPPING_SETTINGS = {
  /** Seuil de livraison offerte en point relais, en euros. */
  // ⚠ Doit rester identique à Shopify > Paramètres > Expédition.
  freeShippingThreshold: 100,

  /** Frais de livraison en point relais, en euros. */
  // ⚠ Doit rester identique à Shopify > Paramètres > Expédition.
  relayPointFee: 4.5,

  /** Frais de livraison à domicile (Colissimo), texte affiché tel quel. */
  // ⚠ Doit rester identique à Shopify > Paramètres > Expédition.
  homeDeliveryFeeLabel: "dès 8,99 €",

  /** Texte de réassurance sur les délais. */
  deliveryTimesText:
    "Préparation sous 24 à 72 h ouvrées (hors précommande), livraison en 2 à 5 jours ouvrés en France",

  /** Délai de précommande affiché sur les lignes en précommande. Vide : "Précommande" seul, jamais de délai deviné. */
  preorderDelay: "",

  /** Affiché quand le panier mélange précommandes et articles en stock. Vide : masqué. */
  splitShipmentText: "",
};

export function formatEuros(amount: number) {
  const rounded = Math.round(amount * 100) / 100;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(rounded) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}
