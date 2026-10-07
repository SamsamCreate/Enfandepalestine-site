import Image from "next/image";
import Link from "next/link";

interface HeroBlockProps {
  color?: string;
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  href?: string;
  linkLabel?: string;
}

export function HeroBlock({
  color = "#7A6666",
  imageSrc,
  imageAlt = "",
  videoSrc,
  href = "/collections",
  linkLabel = "Voir toute la collection +",
}: HeroBlockProps) {
  return (
    <section className="flex flex-col gap-3 lg:gap-4">
      <div
        className="relative aspect-[3/4] w-full sm:aspect-[16/9] lg:aspect-auto lg:min-h-[calc(55vh+150px)]"
        style={{ backgroundColor: color }}
      >
        {videoSrc ? (
          <video
            src={videoSrc}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : imageSrc ? (
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
        ) : null}
      </div>

      <Link
        href={href}
        className="w-fit px-6 text-sm underline underline-offset-4 hover:opacity-60 lg:px-16"
      >
        {linkLabel}
      </Link>
    </section>
  );
}
