import Image from "next/image";
import type { CSSProperties } from "react";

// The boy with the balloon, drawn in 3 frames (public/images/walk). The files share one viewBox:
// feet on the bottom edge, torsos aligned, so they stack without shifting. Walk cycle:
// 03 → 04 → 05 → 04; 04 (both feet on the ground) is also the rest pose.
const FRAMES = [
  { name: "03", walkingClass: "animate-walk-03", restClass: "opacity-0" },
  { name: "04", walkingClass: "animate-walk-04", restClass: "" },
  { name: "05", walkingClass: "animate-walk-05", restClass: "opacity-0" },
] as const;

/** Width / height of the shared viewBox (530.75 × 516.35). */
export const WALKER_ASPECT = 1.028;
/** Centre of the feet in the rest frame, as a fraction of the width: the point that walks along the frieze. */
export const WALKER_ANCHOR_X = 0.7565;

interface WalkingFigureProps {
  isWalking: boolean;
  className?: string;
  style?: CSSProperties;
}

export function WalkingFigure({ isWalking, className, style }: WalkingFigureProps) {
  return (
    <div aria-hidden="true" className={`relative ${className ?? ""}`} style={style}>
      {FRAMES.map((frame) => (
        <Image
          key={frame.name}
          src={`/images/walk/walk-${frame.name}.svg`}
          alt=""
          width={531}
          height={516}
          unoptimized
          draggable={false}
          className={`absolute inset-0 h-full w-full ${isWalking ? frame.walkingClass : frame.restClass}`}
        />
      ))}
    </div>
  );
}
