import type { Metadata } from "next";
import { LegalPageContent } from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "CGV — Enfan de Palestine",
};

export default function CgvPage() {
  return <LegalPageContent title="Conditions générales de vente" />;
}
