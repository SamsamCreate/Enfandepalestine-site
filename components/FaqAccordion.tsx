"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className = "" }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`border-t border-white/15 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={`${item.question}-${index}`} className="border-b border-white/15">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-white"
            >
              <span className="text-base sm:text-lg">{item.question}</span>
              <ChevronDown
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen ? (
              <p className="pb-5 text-sm leading-relaxed text-white/60">{item.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
