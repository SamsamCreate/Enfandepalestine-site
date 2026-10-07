import Image from "next/image";

interface ArchiveMediaProps {
  image: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}

export function isArchiveColor(image: string) {
  return image.startsWith("#");
}

export function ArchiveMedia({ image, alt, sizes, priority }: ArchiveMediaProps) {
  if (isArchiveColor(image)) {
    return <div className="absolute inset-0" style={{ backgroundColor: image }} />;
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  );
}
