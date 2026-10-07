import type { Metadata } from "next";
import { ArchivesExplorer } from "@/components/ArchivesExplorer";
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

  return <ArchivesExplorer archives={ARCHIVES} initialIndex={initialIndex} />;
}
