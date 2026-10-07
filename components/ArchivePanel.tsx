import Link from "next/link";
import type { Archive } from "@/lib/data/archives";

interface ArchivePanelProps {
  archive: Archive;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <span className="text-xs uppercase tracking-wider text-black/40">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

export function ArchivePanel({ archive }: ArchivePanelProps) {
  return (
    <div className="flex flex-col justify-between gap-10 overflow-y-auto bg-[#FAFAF8] px-6 py-10 lg:h-full lg:gap-0 lg:border-l lg:border-black/10 lg:px-10">
      <div key={archive.slug} className="animate-archive-fade flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <InfoRow label="Type" value={archive.type} />
          {archive.color ? <InfoRow label="Couleur" value={archive.color} /> : null}
        </div>

        {archive.description ? (
          <div>
            <p className="text-xs uppercase tracking-wider text-black/40">Histoire</p>
            <p className="mt-3 text-sm leading-relaxed text-black/70">{archive.description}</p>
          </div>
        ) : null}
      </div>

      {archive.collectionSlug ? (
        <Link
          href={`/produits?collection=${archive.collectionSlug}`}
          className="flex min-h-11 w-fit items-center self-end border border-black/20 px-5 text-xs uppercase tracking-widest hover:bg-black hover:text-white lg:mt-10"
        >
          Voir la collection
        </Link>
      ) : null}
    </div>
  );
}
