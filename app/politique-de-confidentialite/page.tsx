import type { Metadata } from "next";
import { LegalPageContent } from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Enfan de Palestine",
};

export default function PolitiqueDeConfidentialitePage() {
  return <LegalPageContent title="Politique de confidentialité" />;
}
