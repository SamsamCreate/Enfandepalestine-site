"use client";

import { useState, type ReactNode } from "react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  /** Controlled mode — pass both to let a parent enforce "one open at a time". */
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  isOpen: controlledOpen,
  onToggle,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  function handleClick() {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalOpen((open) => !open);
    }
  }

  return (
    <div className="border-t border-black/10 py-4">
      <button
        type="button"
        onClick={handleClick}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 text-left text-xs uppercase tracking-widest"
      >
        <span>{title}</span>
        <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen ? (
        <div className="mt-3 text-sm leading-relaxed text-black/60">{children}</div>
      ) : null}
    </div>
  );
}
