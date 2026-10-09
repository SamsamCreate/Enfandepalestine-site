import type { Metadata } from "next";
import { LegalPageContent } from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Mentions légales — Enfan de Palestine",
};

export default function MentionsLegalesPage() {
  return <LegalPageContent title="Mentions légales" />;
}
