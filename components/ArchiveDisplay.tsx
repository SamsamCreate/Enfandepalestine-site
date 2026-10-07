import { ArchiveMedia } from "./ArchiveMedia";
import type { Archive } from "@/lib/data/archives";

interface ArchiveDisplayProps {
  archive: Archive;
  archives: Archive[];
  onSelect: (index: number) => void;
}

export function ArchiveDisplay({ archive, archives, onSelect }: ArchiveDisplayProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div key={archive.slug} className="animate-archive-fade absolute inset-0">
        <ArchiveMedia image={archive.image} alt={archive.title} sizes="40vw" priority />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />

      <h2
        key={`${archive.slug}-title`}
        className="animate-archive-fade absolute inset-0 flex items-center justify-center px-8 text-center font-tight font-normal uppercase leading-[1.15] tracking-[-0.02em] text-white"
        style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)" }}
      >
        {archive.title}
      </h2>

      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 text-xs text-white">
        {archives.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={item.slug === archive.slug}
            className="inline-flex min-h-11 items-center px-1.5 hover:opacity-70"
          >
            {item.slug === archive.slug ? `[${item.number}]` : item.number}
          </button>
        ))}
      </div>
    </div>
  );
}
