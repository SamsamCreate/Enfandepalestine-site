export interface Donation {
  id: string;
  isoDate: string;
  dateLabel: string;
  organization: string;
  amount: number;
  description: string;
  link?: string;
}

export const DONATIONS: Donation[] = [
  {
    id: "sa7ten-2026-08",
    isoDate: "2026-08",
    dateLabel: "Août 2026",
    organization: "@Sa7ten",
    amount: 25000,
    description:
      "Association qui distribue des repas chauds aux familles déplacées et soutient des cuisines communautaires sur le terrain.",
    link: "",
  },
  {
    id: "pcrf-2026-07",
    isoDate: "2026-07",
    dateLabel: "Juillet 2026",
    organization: "@PCRF_France",
    amount: 25000,
    description:
      "Le Palestine Children's Relief Fund finance l'accès aux soins médicaux et aux traitements d'urgence pour les enfants blessés.",
    link: "",
  },
  {
    id: "skatepal-2026-06",
    isoDate: "2026-06",
    dateLabel: "Juin 2026",
    organization: "@Skate Pal",
    amount: 10000,
    description:
      "Association qui construit et anime des skateparks en Cisjordanie pour offrir aux enfants un espace de jeu et de liberté au quotidien.",
    link: "",
  },
  {
    id: "sa7ten-2026-05",
    isoDate: "2026-05",
    dateLabel: "Mai 2026",
    organization: "@Sa7ten",
    amount: 24000,
    description:
      "Association qui distribue des repas chauds aux familles déplacées et soutient des cuisines communautaires sur le terrain.",
    link: "",
  },
  {
    id: "medglobal-2026-04",
    isoDate: "2026-04",
    dateLabel: "Avril 2026",
    organization: "@MedGlobal_FR",
    amount: 18000,
    description:
      "Organisation médicale qui déploie des équipes soignantes et du matériel sur le terrain pour renforcer les hôpitaux locaux.",
    link: "",
  },
  {
    id: "sa7ten-2026-02",
    isoDate: "2026-02",
    dateLabel: "Février 2026",
    organization: "@Sa7ten",
    amount: 23000,
    description:
      "Association qui distribue des repas chauds aux familles déplacées et soutient des cuisines communautaires sur le terrain.",
    link: "",
  },
  {
    id: "redcrescent-2026-01",
    isoDate: "2026-01",
    dateLabel: "Janvier 2026",
    organization: "@PalestineRedCrescent",
    amount: 14000,
    description:
      "Le Croissant-Rouge palestinien assure les premiers secours et le transport médical d'urgence dans les zones les plus touchées.",
    link: "",
  },
  {
    id: "pcrf-2025-12",
    isoDate: "2025-12",
    dateLabel: "Décembre 2025",
    organization: "@PCRF_France",
    amount: 15000,
    description:
      "Le Palestine Children's Relief Fund finance l'accès aux soins médicaux et aux traitements d'urgence pour les enfants blessés.",
    link: "",
  },
  {
    id: "sa7ten-2025-10",
    isoDate: "2025-10",
    dateLabel: "Octobre 2025",
    organization: "@Sa7ten",
    amount: 22000,
    description:
      "Association qui distribue des repas chauds aux familles déplacées et soutient des cuisines communautaires sur le terrain.",
    link: "",
  },
  {
    id: "olivetree-2025-09",
    isoDate: "2025-09",
    dateLabel: "Septembre 2025",
    organization: "@OliveTreeFund",
    amount: 8000,
    description:
      "Programme de replantation d'oliviers pour les familles agricoles palestiniennes dont les terres ont été détruites.",
    link: "",
  },
  {
    id: "sa7ten-2025-06",
    isoDate: "2025-06",
    dateLabel: "Juin 2025",
    organization: "@Sa7ten",
    amount: 20000,
    description:
      "Association qui distribue des repas chauds aux familles déplacées et soutient des cuisines communautaires sur le terrain.",
    link: "",
  },
  {
    id: "gazasunbirds-2025-03",
    isoDate: "2025-03",
    dateLabel: "Mars 2025",
    organization: "@GazaSunbirds",
    amount: 12000,
    description:
      "Équipe cycliste qui accompagne des athlètes en situation de handicap et sensibilise à leur cause à travers le sport.",
    link: "",
  },
  {
    id: "redcrescent-2024-11",
    isoDate: "2024-11",
    dateLabel: "Novembre 2024",
    organization: "@PalestineRedCrescent",
    amount: 12500,
    description:
      "Le Croissant-Rouge palestinien assure les premiers secours et le transport médical d'urgence dans les zones les plus touchées.",
    link: "",
  },
];

export function getSortedDonations(): Donation[] {
  return [...DONATIONS].sort((a, b) => b.isoDate.localeCompare(a.isoDate));
}

export function getDonationStats() {
  const total = DONATIONS.reduce((sum, donation) => sum + donation.amount, 0);
  const organizations = new Set(DONATIONS.map((donation) => donation.organization));
  return {
    total,
    count: DONATIONS.length,
    organizationCount: organizations.size,
  };
}

export function getOrganizationStats(organization: string) {
  const orgDonations = DONATIONS.filter((donation) => donation.organization === organization);
  return {
    total: orgDonations.reduce((sum, donation) => sum + donation.amount, 0),
    count: orgDonations.length,
  };
}

export function formatDonationAmount(amount: number) {
  return `${amount.toLocaleString("fr-FR")} €`;
}
