import type { ReactNode } from "react";

export function ProductGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-6 px-3 md:grid-cols-3 md:gap-x-[clamp(6px,0.55vw,12px)] md:gap-y-8 md:px-[clamp(12px,1vw,20px)] lg:grid-cols-4">
      {children}
    </div>
  );
}
