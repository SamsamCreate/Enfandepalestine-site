import Link from "next/link";

interface SplitColorBlockProps {
  leftColor?: string;
  rightColor?: string;
  caption?: string;
  linkLabel?: string;
  href?: string;
}

export function SplitColorBlock({
  leftColor = "#7A6666",
  rightColor = "#1A1A1A",
  caption = "Image issue des différents projets",
  linkLabel = "voir toutes les archives",
  href = "/archives",
}: SplitColorBlockProps) {
  return (
    <section>
      <div className="flex h-[400px] w-full lg:h-[500px]">
        <div className="h-full w-1/2" style={{ backgroundColor: leftColor }} />
        <div className="h-full w-1/2" style={{ backgroundColor: rightColor }} />
      </div>

      <div className="flex flex-col items-end gap-1 px-6 py-4 text-right lg:px-16">
        <p className="text-sm italic">{caption}</p>
        <Link
          href={href}
          className="text-sm underline underline-offset-4 hover:opacity-60"
        >
          {linkLabel}
        </Link>
      </div>
    </section>
  );
}
