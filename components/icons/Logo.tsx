interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="2.25" />
      <line x1="12" y1="7.25" x2="12" y2="15" />
      <line x1="12" y1="10" x2="7" y2="13" />
      <line x1="12" y1="10" x2="17" y2="13" />
      <line x1="12" y1="15" x2="8" y2="21" />
      <line x1="12" y1="15" x2="16" y2="21" />
    </svg>
  );
}
