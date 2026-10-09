import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface HowItWorksStep {
  label: string;
  caption: string;
  color?: string;
  image?: string;
}

interface HowItWorksSectionProps {
  heading: ReactNode;
  steps: [HowItWorksStep, HowItWorksStep];
}

export function HowItWorksSection({ heading, steps }: HowItWorksSectionProps) {
  const [first, second] = steps;

  return (
    <section className="border-t border-black/10 px-6 py-6 md:px-16 md:py-16 lg:grid lg:grid-cols-2 lg:gap-16 lg:py-24">
      <h2 className="font-tight text-[28px] font-bold leading-[1.1] tracking-[-0.02em] md:text-4xl lg:text-5xl">
        {heading}
      </h2>

      <div className="mt-4 md:mt-10 lg:mt-0">
        <div className="relative flex gap-3 md:gap-6">
          {[first, second].map((step) => (
            <div
              key={step.label}
              className="relative aspect-[4/5] flex-1 overflow-hidden rounded-xl md:aspect-[3/4] md:rounded-2xl"
              style={{ backgroundColor: step.image ? undefined : (step.color ?? "#7A6666") }}
            >
              {step.image ? (
                <Image
                  src={step.image}
                  alt={step.label}
                  fill
                  sizes="(min-width: 768px) 25vw, 45vw"
                  className="object-cover"
                />
              ) : null}
              <span className="absolute left-2 top-2 text-xs font-medium text-white md:left-4 md:top-4 md:text-sm">
                {step.label}
              </span>
            </div>
          ))}

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg md:h-12 md:w-12"
          >
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </span>
        </div>

        <div className="mt-3 flex flex-row gap-3 text-[13px] leading-snug text-black/60 md:mt-4 md:gap-6 md:text-sm md:leading-relaxed">
          <p className="flex-1">{first.caption}</p>
          <p className="flex-1">{second.caption}</p>
        </div>
      </div>
    </section>
  );
}
