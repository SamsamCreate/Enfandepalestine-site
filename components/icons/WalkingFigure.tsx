interface Limbs {
  arms: [number, number, number, number];
  legs: [number, number, number, number];
}

const SHOULDER = { x: 12, y: 10 };
const HIP = { x: 12, y: 15 };

// Rest = the Logo. Walk poses only change limb angles (same lengths: arm 5.83, leg 7.21),
// facing right. Planted feet land on y=21 like the logo; lifted feet sit above it.
const POSES: Record<"rest" | "a" | "b", Limbs> = {
  rest: { arms: [7, 13, 17, 13], legs: [8, 21, 16, 21] },
  // Front leg lifted forward (50°), back leg planted; opposite arm swings forward (62° / -28°).
  a: { arms: [17.15, 12.74, 9.26, 15.15], legs: [17.52, 19.64, 8, 21] },
  // Inverse: front leg planted, back leg lifted (-42°); arms swap (40° / -50°).
  b: { arms: [15.75, 14.47, 7.53, 13.75], legs: [16, 21, 7.18, 20.36] },
};

function Figure({ arms, legs }: Limbs) {
  return (
    <>
      <circle cx="12" cy="5" r="2.25" />
      <line x1="12" y1="7.25" x2="12" y2="15" />
      <line x1={SHOULDER.x} y1={SHOULDER.y} x2={arms[0]} y2={arms[1]} />
      <line x1={SHOULDER.x} y1={SHOULDER.y} x2={arms[2]} y2={arms[3]} />
      <line x1={HIP.x} y1={HIP.y} x2={legs[0]} y2={legs[1]} />
      <line x1={HIP.x} y1={HIP.y} x2={legs[2]} y2={legs[3]} />
    </>
  );
}

interface WalkingFigureProps {
  isWalking: boolean;
  className?: string;
}

/** The logo's stick figure. viewBox is cropped so the bottom edge is exactly where the planted feet end. */
export function WalkingFigure({ isWalking, className }: WalkingFigureProps) {
  return (
    <svg
      viewBox="4 1.75 16 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${isWalking ? "animate-walk-bounce" : ""} ${className ?? ""}`}
    >
      <g data-pose="rest" className={isWalking ? "opacity-0" : undefined}>
        <Figure {...POSES.rest} />
      </g>
      <g data-pose="a" className={isWalking ? "animate-walk-a" : "opacity-0"}>
        <Figure {...POSES.a} />
      </g>
      <g data-pose="b" className={isWalking ? "animate-walk-b" : "opacity-0"}>
        <Figure {...POSES.b} />
      </g>
    </svg>
  );
}
