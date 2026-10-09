import { formatDonationAmount } from "@/lib/data/donations";

interface DonationCardProps {
  date: string;
  handle: string;
  amount: number;
  description: string;
  variant?: "default" | "compact";
}

export function DonationCard({
  date,
  handle,
  amount,
  description,
  variant = "default",
}: DonationCardProps) {
  const badges = (
    <div className="flex items-center gap-2 text-xs">
      <span className="rounded-full bg-black px-3 py-1 text-white">{date}</span>
      <span className="rounded-full bg-black/5 px-3 py-1 text-black/70">{handle}</span>
    </div>
  );

  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-4 border border-black/10 p-5">
        {badges}
        <p className="text-2xl font-bold">{formatDonationAmount(amount)}</p>
        <p className="text-[13px] leading-[1.4] text-black/60">{description}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {badges}
      <p className="text-2xl font-bold sm:text-3xl">{formatDonationAmount(amount)}</p>
      <p className="text-sm leading-relaxed text-black/60">{description}</p>
    </div>
  );
}
