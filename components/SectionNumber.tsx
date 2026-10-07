interface SectionNumberProps {
  number: string;
  title: string;
  className?: string;
}

export function SectionNumber({ number, title, className = "" }: SectionNumberProps) {
  return (
    <div className={className}>
      <span className="block text-xs text-black/50">{number}</span>
      <span className="block font-tight text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
        {title}
      </span>
    </div>
  );
}
