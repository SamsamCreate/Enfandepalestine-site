interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  return (
    <div className="flex flex-1 flex-col">
      {images.map((color, index) => (
        <div
          key={index}
          className="aspect-[4/5] w-full"
          style={{ backgroundColor: color }}
          role="img"
          aria-label={`${name} — photo ${index + 1}`}
        />
      ))}
    </div>
  );
}
