import { ArchiveMedia } from "./ArchiveMedia";
import type { Archive } from "@/lib/data/archives";

interface ArchivesSelectorProps {
  archives: Archive[];
  selectedSlug: string;
  onSelect: (index: number) => void;
}

export function ArchivesSelector({ archives, selectedSlug, onSelect }: ArchivesSelectorProps) {
  return (
    <div className="flex gap-px overflow-x-auto bg-white lg:h-full lg:grid-cols-3 lg:grid lg:overflow-x-visible lg:overflow-y-auto">
      {archives.map((archive, index) => {
        const isSelected = archive.slug === selectedSlug;

        return (
          <button
            key={archive.slug}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={isSelected}
            className="group relative aspect-square w-24 shrink-0 overflow-hidden bg-white text-left lg:w-auto lg:shrink"
          >
            <ArchiveMedia image={archive.image} alt={archive.title} sizes="200px" />

            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent" />

            {!isSelected ? (
              <div className="absolute inset-0 bg-white/55 transition-colors group-hover:bg-white/30" />
            ) : null}

            <p className="relative z-10 flex min-w-0 gap-1 p-2 text-[10px] uppercase tracking-wider text-white">
              {isSelected ? (
                <span className="min-w-0 truncate">[ {archive.title} ]</span>
              ) : (
                <>
                  <span className="shrink-0">{archive.number} —</span>
                  <span className="min-w-0 truncate">{archive.title}</span>
                </>
              )}
            </p>
          </button>
        );
      })}
    </div>
  );
}
