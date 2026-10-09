import type { Metadata } from "next";
import { ArchivesCarousel } from "@/components/ArchivesCarousel";
import { ARCHIVES } from "@/lib/data/archives";

export const metadata: Metadata = {
  title: "Archives — Enfan de Palestine",
};

interface ArchivesPageProps {
  searchParams: Promise<{ archive?: string }>;
}

export default async function ArchivesPage({ searchParams }: ArchivesPageProps) {
  const { archive } = await searchParams;
  const initialIndex = Math.max(
    0,
    ARCHIVES.findIndex((item) => item.slug === archive),
  );

  return <ArchivesCarousel archives={ARCHIVES} initialIndex={initialIndex} />;
}
