import type { Metadata } from "next";
import { CartPageContent } from "@/components/CartPageContent";

export const metadata: Metadata = {
  title: "Votre panier — Enfan de Palestine",
};

export default function PanierPage() {
  return <CartPageContent />;
}
