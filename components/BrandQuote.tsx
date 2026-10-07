export interface BrandQuotePart {
  text: string;
  emphasis?: "bold" | "underline";
}

interface BrandQuoteProps {
  parts: BrandQuotePart[];
  className?: string;
}

const EMPHASIS_CLASSES: Record<NonNullable<BrandQuotePart["emphasis"]>, string> = {
  bold: "font-bold",
  underline: "underline underline-offset-4",
};

export function BrandQuote({ parts, className = "" }: BrandQuoteProps) {
  return (
    <section className={`px-6 py-10 lg:px-16 lg:py-8 ${className}`}>
      <p className="mx-auto max-w-3xl text-center font-tight text-[19.2px] leading-[1.15] tracking-[-0.02em] sm:text-[24px] lg:text-[19.2px] xl:text-[24px]">
        {parts.map((part, index) => (
          <span
            key={index}
            className={part.emphasis ? EMPHASIS_CLASSES[part.emphasis] : undefined}
          >
            {part.text}
          </span>
        ))}
      </p>
    </section>
  );
}
