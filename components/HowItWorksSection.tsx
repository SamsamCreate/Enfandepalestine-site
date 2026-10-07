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
    <section className="border-t border-black/10 px-6 py-16 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-24">
      <h2 className="font-tight text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
        {heading}
      </h2>

      <div className="mt-10 lg:mt-0">
        <div className="relative flex flex-col gap-6 sm:flex-row">
          {[first, second].map((step) => (
            <div
              key={step.label}
              className="relative flex-1 overflow-hidden rounded-2xl"
              style={{ aspectRatio: "3 / 4", backgroundColor: step.image ? undefined : (step.color ?? "#7A6666") }}
            >
              {step.image ? (
                <Image
                  src={step.image}
                  alt={step.label}
                  fill
                  sizes="(min-width: 640px) 25vw, 90vw"
                  className="object-cover"
                />
              ) : null}
              <span className="absolute left-4 top-4 text-sm font-medium text-white">
                {step.label}
              </span>
            </div>
          ))}

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 rotate-90 items-center justify-center rounded-full bg-white text-black shadow-lg sm:rotate-0"
          >
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-6 text-sm text-black/60 sm:flex-row sm:gap-6">
          <p className="flex-1">{first.caption}</p>
          <p className="flex-1">{second.caption}</p>
        </div>
      </div>
    </section>
  );
}
