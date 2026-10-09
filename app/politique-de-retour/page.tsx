import type { Metadata } from "next";
import { LegalPageContent } from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Politique de retour — Enfan de Palestine",
};

export default function PolitiqueDeRetourPage() {
  return <LegalPageContent title="Politique de retour" />;
}
