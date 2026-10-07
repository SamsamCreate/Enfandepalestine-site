import type { Metadata } from "next";
import Link from "next/link";
import { DonationsGrid } from "@/components/DonationsGrid";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { getDonationStats, getSortedDonations, formatDonationAmount } from "@/lib/data/donations";

export const metadata: Metadata = {
  title: "Donations — Enfan de Palestine",
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-tight text-lg font-bold leading-none tracking-[-0.02em] sm:text-xl">
        {value}
      </span>
      <span className="text-xs text-black/50">{label}</span>
    </div>
  );
}

export default function DonationsPage() {
  const stats = getDonationStats();
  const donations = getSortedDonations();

  return (
    <>
      <div className="flex flex-col gap-6 px-6 pt-8 pb-6 sm:flex-row sm:items-end sm:justify-between lg:px-16 lg:pt-10">
        <h1 className="font-tight text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
          Donations
        </h1>

        <div className="flex gap-8">
          <Stat label="Total reversé" value={formatDonationAmount(stats.total)} />
          <Stat label="Dons" value={String(stats.count)} />
          <Stat label="Organisations" value={String(stats.organizationCount)} />
        </div>
      </div>

      <div className="px-6 pb-16 lg:px-16 lg:pb-20">
        <DonationsGrid donations={donations} />
      </div>

      <HowItWorksSection
        heading={
          <>
            <span className="lg:hidden">Chaque achat devient un don.</span>
            <span className="hidden lg:inline">
              Chaque achat
              <br />
              devient
              <br />
              un don.
            </span>
          </>
        }
        steps={[
          {
            label: "Vous achetez",
            color: "#7A6666",
            caption:
              "Vous achetez un vêtement Enfan de Palestine, pensé pour raconter et transmettre la Palestine, son histoire, sa culture et ses symboles.",
          },
          {
            label: "L'association agit",
            color: "#3F3B38",
            caption:
              "Les bénéfices des ventes sont reversés à des associations partenaires qui agissent directement sur le terrain. Chaque don est publié ci-dessus, avec sa date et son montant.",
          },
        ]}
      />

      <section className="border-t border-black/10 px-6 py-16 text-center lg:px-16 lg:py-20">
        <p className="text-lg font-medium">Chaque achat finance ces actions.</p>
        <Link
          href="/produits"
          className="mt-6 inline-block bg-black px-6 py-3 text-xs uppercase tracking-widest text-white hover:opacity-85"
        >
          Voir les produits
        </Link>
      </section>
    </>
  );
}
